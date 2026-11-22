import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
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
import { LoadingService } from '../../services/loading.service';
import { RunnerApiService } from '../../services/api/runner-api.service';
import { Language, ProblemDetailResponseDto } from '../../services/api/api-client';
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
    RouterLink,
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

  readonly roomCode = this.route.snapshot.queryParamMap.get('room');
  readonly problemId = signal<number>(1);
  readonly problemDetail = signal<ProblemDetailResponseDto | null>(null);

  readonly languages: Language[] = ['python', 'cpp', 'java'];
  readonly language = signal<string>('python');
  readonly code = signal<string>('');
  readonly starterCodes = signal<Record<string, string>>({});

  readonly testcases = signal<TestCaseItem[]>([]);
  readonly consoleTab = signal<'testcase' | 'result'>('testcase');
  readonly testResult = signal<TestResultData | null>(null);

  readonly loading = inject(LoadingService).isLoading;

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

      this.language.set(this.languages.find(language => starters[language]) ?? 'python');
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
    if (this.loading()) return;

    this.consoleTab.set('result');
    this.testResult.set(null);

    const inputPayload = formatPayloadInput(testcase);

    try {
      const res = await this.runnerApi.run({
        problemId: this.problemId(),
        language: this.language() as Language,
        code: this.code(),
        input: inputPayload,
      });

      const { result, toastType, toastMessage } = buildRunResult(res, testcase, inputPayload);
      this.testResult.set(result);
      this.toast[toastType](toastMessage);
    } catch {}
  }

  async onSubmit(): Promise<void> {
    if (this.loading()) return;

    this.consoleTab.set('result');
    this.testResult.set(null);

    try {
      const res = await this.runnerApi.submit({
        problemId: this.problemId(),
        language: this.language() as Language,
        code: this.code(),
      });

      const { result, toastType, toastMessage } = buildSubmitResult(res);
      this.testResult.set(result);
      this.toast[toastType](toastMessage);
    } catch {}
  }

  onShortcutRun(): void {
    if (this.loading()) return;
    const selected = this.testcases()[0];
    if (selected) {
      this.onRun(selected);
    }
  }

  onShortcutSubmit(): void {
    if (this.loading()) return;
    this.onSubmit();
  }
}
