import { Component, computed, input, model, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeComponent } from '../../shared/components/badge/badge.component';
import { ChipComponent } from '../../shared/components/chip/chip.component';
import { IconComponent } from '../../shared/components/icon/icon.component';
import { AccordionComponent } from '../../shared/components/accordion/accordion.component';
import { AccordionItemComponent } from '../../shared/components/accordion/accordion-item.component';
import { SegmentedControlComponent, SegmentOption } from '../../shared/components/segmented-control/segmented-control.component';

export interface ProblemExample {
  input: string;
  output: string;
  explanation?: string;
}

export interface ProblemData {
  id: number;
  title: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD' | 'easy' | 'medium' | 'hard';
  description: string;
  examples?: ProblemExample[];
  constraints?: string[];
  hints?: string[];
  topics?: string[];
  companies?: string[];
}

export type ProblemTab = 'description' | 'submissions';

export interface SubmissionRecord {
  submittedAt: string;
  language: string;
  verdict: string;
  passedCount: number;
  totalCount: number;
  runtimeMs: number | null;
}

const VERDICT_LABELS: Record<string, string> = {
  ACCEPTED: 'Accepted',
  WRONG_ANSWER: 'Wrong Answer',
  TIME_LIMIT_EXCEEDED: 'Time Limit Exceeded',
  MEMORY_LIMIT_EXCEEDED: 'Memory Limit Exceeded',
  COMPILE_ERROR: 'Compile Error',
  RUNTIME_ERROR: 'Runtime Error',
};

const LANGUAGE_LABELS: Record<string, string> = {
  python: 'Python',
  cpp: 'C++',
  java: 'Java',
};

@Component({
  selector: 'app-problem-panel',
  standalone: true,
  imports: [
    CommonModule,
    BadgeComponent,
    ChipComponent,
    IconComponent,
    AccordionComponent,
    AccordionItemComponent,
    SegmentedControlComponent,
  ],
  templateUrl: './problem-panel.component.html',
  styleUrl: './problem-panel.component.css',
  host: {
    class: 'd-flex flex-col w-full h-full bg-surface-container-lowest border border-surface-highest rounded-xl overflow-hidden',
  },
})
export class ProblemPanelComponent {
  readonly problem = input<ProblemData | null>(null);
  readonly activeTab = model<ProblemTab>('description');
  readonly submissions = input<SubmissionRecord[]>([]);

  readonly problemTabOptions: SegmentOption<ProblemTab>[] = [
    { label: 'Description', value: 'description', icon: 'description' },
    { label: 'Submissions', value: 'submissions', icon: 'history' },
  ];

  verdictLabel(verdict: string): string {
    return VERDICT_LABELS[verdict] ?? verdict;
  }

  languageLabel(language: string): string {
    return LANGUAGE_LABELS[language] ?? language;
  }

  submittedTime(submittedAt: string): string {
    return new Date(submittedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  }

  readonly showTopics = signal<boolean>(false);
  readonly showCompanies = signal<boolean>(false);

  readonly difficultyBadgeVariant = computed(() => {
    const diff = (this.problem()?.difficulty || 'easy').toLowerCase();
    if (diff === 'easy') return 'secondary';
    if (diff === 'medium') return 'tertiary';
    return 'error';
  });

  readonly formattedDifficulty = computed(() => {
    const diff = this.problem()?.difficulty || 'Easy';
    return diff.charAt(0).toUpperCase() + diff.slice(1).toLowerCase();
  });

  setTab(tab: ProblemTab): void {
    this.activeTab.set(tab);
  }

  toggleTopics(): void {
    this.showTopics.update(v => !v);
  }

  toggleCompanies(): void {
    this.showCompanies.update(v => !v);
  }
}
