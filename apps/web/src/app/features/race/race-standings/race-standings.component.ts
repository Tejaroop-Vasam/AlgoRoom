import { Component, input } from '@angular/core';
import { AvatarComponent, BadgeComponent, IconComponent } from '../../../shared';
import { formatDuration, RaceStanding } from '../race.utils';

@Component({
  selector: 'app-race-standings',
  imports: [AvatarComponent, BadgeComponent, IconComponent],
  templateUrl: './race-standings.component.html',
  host: {
    class: 'd-block',
  },
})
export class RaceStandingsComponent {
  readonly standings = input.required<RaceStanding[]>();
  readonly problemIds = input<number[]>([]);
  readonly problemTitles = input<Partial<Record<number, string>>>({});
  readonly participantId = input<string | null>(null);
  readonly variant = input<'compact' | 'full'>('compact');

  readonly formatDuration = formatDuration;

  titleFor(problemId: number, index: number): string {
    return this.problemTitles()[problemId] ?? `Problem ${index + 1}`;
  }
}
