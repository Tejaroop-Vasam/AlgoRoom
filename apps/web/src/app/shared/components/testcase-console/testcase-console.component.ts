import { Component, computed, input, model, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BadgeComponent, BadgeVariant } from '../badge/badge.component';
import { ButtonComponent } from '../button/button.component';
import { IconComponent } from '../icon/icon.component';
import { SegmentedControlComponent, SegmentOption } from '../segmented-control/segmented-control.component';

export interface TestCaseParam {
  name: string;
  value: string;
}

export interface TestCaseItem {
  id: number;
  label: string;
  params: TestCaseParam[];
  expectedOutput?: string;
  rawInput?: string;
}

export type ConsoleTab = 'testcase' | 'result';

export type TestResultStatus =
  | 'ACCEPTED'
  | 'WRONG_ANSWER'
  | 'COMPILE_ERROR'
  | 'RUNTIME_ERROR'
  | 'TIME_LIMIT_EXCEEDED';

export interface TestResultData {
  status: TestResultStatus;
  runtimeMs?: number;
  memoryMb?: number;
  output?: string;
  expectedOutput?: string;
  input?: string;
  errorMessage?: string;
}

@Component({
  selector: 'app-testcase-console',
  standalone: true,
  imports: [CommonModule, FormsModule, BadgeComponent, ButtonComponent, IconComponent, SegmentedControlComponent],
  templateUrl: './testcase-console.component.html',
  styleUrl: './testcase-console.component.css',
  host: {
    class: 'd-flex flex-col w-full h-full bg-surface-container-lowest border border-surface-highest rounded-xl overflow-hidden',
  },
})
export class TestcaseConsoleComponent {
  readonly testcases = model<TestCaseItem[]>([
  ]);

  readonly activeTab = model<ConsoleTab>('testcase');
  readonly activeCaseIndex = model<number>(0);
  readonly testResult = input<TestResultData | null>(null);

  readonly isRunning = input<boolean>(false);
  readonly isSubmitting = input<boolean>(false);

  readonly runClicked = output<TestCaseItem>();
  readonly submitClicked = output<void>();

  readonly consoleTabOptions: SegmentOption<ConsoleTab>[] = [
    { label: 'Testcase', value: 'testcase', icon: 'check_box' },
    { label: 'Test Result', value: 'result', icon: 'terminal' },
  ];

  readonly caseOptions = computed<SegmentOption<number>[]>(() =>
    this.testcases().map((tc, index) => ({
      label: tc.label,
      value: index,
    }))
  );

  readonly activeCase = computed(() => {
    const list = this.testcases();
    const idx = this.activeCaseIndex() ?? 0;
    return list[idx] || list[0] || null;
  });

  readonly resultBadgeVariant = computed<BadgeVariant>(() => {
    const res = this.testResult();
    if (!res) return 'surface';
    if (res.status === 'ACCEPTED') return 'secondary';
    if (res.status === 'WRONG_ANSWER' || res.status === 'COMPILE_ERROR' || res.status === 'RUNTIME_ERROR') {
      return 'error';
    }
    return 'tertiary';
  });

  readonly formattedResultStatus = computed(() => {
    const res = this.testResult();
    if (!res) return 'Ready';
    switch (res.status) {
      case 'ACCEPTED':
        return 'Accepted';
      case 'WRONG_ANSWER':
        return 'Wrong Answer';
      case 'COMPILE_ERROR':
        return 'Compile Error';
      case 'RUNTIME_ERROR':
        return 'Runtime Error';
      case 'TIME_LIMIT_EXCEEDED':
        return 'Time Limit Exceeded';
      default:
        return res.status;
    }
  });

  setTab(tab: ConsoleTab): void {
    this.activeTab.set(tab);
  }

  selectCase(index: number): void {
    this.activeCaseIndex.set(index);
  }

  addCustomCase(): void {
    const current = this.testcases();
    const nextId = current.length + 1;
    const templateParams = current[0]?.params.map(p => ({ name: p.name, value: '' })) ?? [
      { name: 'input', value: '' },
    ];
    const newCase: TestCaseItem = {
      id: nextId,
      label: `Case ${nextId}`,
      params: templateParams,
    };
    this.testcases.set([...current, newCase]);
    this.activeCaseIndex.set(current.length);
  }

  onRun(): void {
    const selected = this.activeCase();
    if (selected) {
      this.runClicked.emit(selected);
    }
  }

  onSubmit(): void {
    this.submitClicked.emit();
  }
}
