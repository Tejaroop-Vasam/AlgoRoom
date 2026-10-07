import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

export interface Competitor {
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
  imports: [CommonModule, IconComponent],
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

  readonly sortedCompetitors = computed(() =>
    [...this.competitors()].sort((a, b) => a.rank - b.rank)
  );
}

