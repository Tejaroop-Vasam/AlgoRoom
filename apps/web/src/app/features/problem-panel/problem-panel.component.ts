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
  likes?: number;
  dislikes?: number;
  commentsCount?: number;
}

export type ProblemTab = 'description' | 'submissions';

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

  readonly problemTabOptions: SegmentOption<ProblemTab>[] = [
    { label: 'Description', value: 'description', icon: 'description' },
    { label: 'Submissions', value: 'submissions', icon: 'history' },
  ];

  readonly showTopics = signal<boolean>(false);
  readonly showCompanies = signal<boolean>(false);

  readonly isLiked = signal<boolean>(false);
  readonly isDisliked = signal<boolean>(false);
  readonly isStarred = signal<boolean>(false);

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

  readonly likeCount = computed(() => {
    const base = this.problem()?.likes ?? 70800;
    return this.isLiked() ? base + 1 : base;
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

  toggleLike(): void {
    this.isLiked.update(v => !v);
    if (this.isLiked()) {
      this.isDisliked.set(false);
    }
  }

  toggleDislike(): void {
    this.isDisliked.update(v => !v);
    if (this.isDisliked()) {
      this.isLiked.set(false);
    }
  }

  toggleStar(): void {
    this.isStarred.update(v => !v);
  }
}
