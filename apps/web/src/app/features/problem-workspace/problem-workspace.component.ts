import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {
  CodeEditorComponent,
  RunShortcutsDirective,
  SplitPaneComponent,
  TestCaseItem,
  TestResultData,
  TestcaseConsoleComponent,
  ToastService,
} from '../../shared';
import { ProblemPanelComponent } from '../problem-panel/problem-panel.component';
import { ProblemsApiService } from '../../services/api/problems-api.service';
import { RunnerApiService } from '../../services/api/runner-api.service';
import { ProblemDetailResponseDto } from '../../services/api/api-client';
import {
  buildRunResult,
  buildSubmitResult,
  formatPayloadInput,
  mapToProblemData,
  parseInputToParams,
} from './problem-workspace.utils';

@Component({
  selector: 'app-problem-workspace',
  standalone: true,
  imports: [
    CommonModule,
    SplitPaneComponent,
    ProblemPanelComponent,
    CodeEditorComponent,
    TestcaseConsoleComponent,
    RunShortcutsDirective,
  ],
  templateUrl: './problem-workspace.component.html',
  styleUrl: './problem-workspace.component.css',
  host: {
    class: 'd-flex flex-col w-full h-full overflow-hidden bg-surface',
  },
})
export class ProblemWorkspaceComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly problemsApi = inject(ProblemsApiService);
  private readonly runnerApi = inject(RunnerApiService);
  private readonly toast = inject(ToastService);

  readonly problemId = signal<number>(1);
  readonly problemDetail = signal<ProblemDetailResponseDto | null>(null);

  readonly language = signal<string>('python');
  readonly code = signal<string>('');
  readonly starterCodes = signal<Record<string, string>>({});

  readonly testcases = signal<TestCaseItem[]>([]);
  readonly consoleTab = signal<'testcase' | 'result'>('testcase');
  readonly testResult = signal<TestResultData | null>(null);

  readonly isRunning = signal<boolean>(false);
  readonly isSubmitting = signal<boolean>(false);

  readonly problemData = computed(() => mapToProblemData(this.problemDetail()));

  async ngOnInit(): Promise<void> {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : 1;
    this.problemId.set(id);
    await this.fetchProblem(id);
  }

  async fetchProblem(id: number): Promise<void> {
    try {
      const res = await this.problemsApi.getProblem(id);
      this.problemDetail.set(res);

      const starters: Record<string, string> = (res.starterCodes as Record<string, string>) || {};
      this.starterCodes.set(starters);

      const availableLangs = Object.keys(starters);
      this.language.set( availableLangs[0]);
      this.code.set(starters[this.language()] || '');

      const parsedCases: TestCaseItem[] = (res.sampleTestCases ?? []).map((stc, idx) => ({
        id: stc.id ?? idx + 1,
        label: `Case ${idx + 1}`,
        params: parseInputToParams(stc.input),
        expectedOutput: stc.expectedOutput,
        rawInput: stc.input,
      }));

      this.testcases.set(
        parsedCases.length > 0
          ? parsedCases
          : [{ id: 1, label: 'Case 1', params: [{ name: 'input', value: '' }] }],
      );
    } catch {
    }
  }

  onLanguageChange(newLang: string): void {
    this.language.set(newLang);
    const starter = this.starterCodes()[newLang];
    if (starter) {
      this.code.set(starter);
    }
  }

  resetCode(): void {
    const starter = this.starterCodes()[this.language()];
    if (starter) {
      this.code.set(starter);
      this.toast.info('Code reset to default problem template.');
    }
  }

  async onRun(testcase: TestCaseItem): Promise<void> {
    if (this.isRunning() || this.isSubmitting()) return;

    this.isRunning.set(true);
    this.consoleTab.set('result');
    this.testResult.set(null);

    const inputPayload = formatPayloadInput(testcase);

    try {
      const res = await this.runnerApi.run({
        problemId: this.problemId(),
        language: this.language(),
        code: this.code(),
        input: inputPayload,
      });

      const { result, toastType, toastMessage } = buildRunResult(res, testcase, inputPayload);
      this.testResult.set(result);
      this.toast[toastType](toastMessage);
    } catch {
    } finally {
      this.isRunning.set(false);
    }
  }

  async onSubmit(): Promise<void> {
    if (this.isRunning() || this.isSubmitting()) return;

    this.isSubmitting.set(true);
    this.consoleTab.set('result');
    this.testResult.set(null);

    try {
      const res = await this.runnerApi.submit({
        problemId: this.problemId(),
        language: this.language(),
        code: this.code(),
      });

      const { result, toastType, toastMessage } = buildSubmitResult(res);
      this.testResult.set(result);
      this.toast[toastType](toastMessage);
    } catch {
    } finally {
      this.isSubmitting.set(false);
    }
  }

  onShortcutRun(): void {
    if (this.isRunning() || this.isSubmitting()) return;
    const selected = this.testcases()[0];
    if (selected) {
      this.onRun(selected);
    }
  }

  onShortcutSubmit(): void {
    if (this.isRunning() || this.isSubmitting()) return;
    this.onSubmit();
  }
}
