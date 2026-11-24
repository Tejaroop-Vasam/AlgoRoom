import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IconComponent } from '../icon/icon.component';
import { AvatarComponent } from '../avatar/avatar.component';
import { BadgeComponent } from '../badge/badge.component';

export interface Competitor {
  id?: string;
  rank: number;
  name: string;
  isCurrentUser?: boolean;
  status: string;
  hasPassedTests?: boolean;
  time: string;
  progressPercent: number;
  runs?: number;
  submissions?: number;
  compileErrors?: number;
  runtimeErrors?: number;
}

@Component({
  selector: 'app-live-grid',
  standalone: true,
  imports: [CommonModule, MatTooltipModule, IconComponent, AvatarComponent, BadgeComponent],
  templateUrl: './live-grid.component.html',
  styleUrl: './live-grid.component.css',
  host: {
    class: 'd-block w-full',
  },
})
export class LiveGridComponent {
  readonly title = input<string>('');
  readonly remainingTime = input<string>('');
  readonly competitors = input<Competitor[]>([]);
  readonly variant = input<'card' | 'compact'>('card');

  plural(count: number | undefined, noun: string): string {
    const value = count ?? 0;
    return `${value} ${noun}${value === 1 ? '' : 's'}`;
  }

  readonly sortedCompetitors = computed(() =>
    [...this.competitors()].sort((a, b) => a.rank - b.rank)
  );
}

