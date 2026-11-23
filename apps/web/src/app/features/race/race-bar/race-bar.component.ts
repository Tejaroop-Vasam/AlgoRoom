import { Component, computed, effect, inject, input, output, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Room } from '../../../services/api/api.types';
import { BadgeComponent, ButtonComponent, IconComponent, ToastService } from '../../../shared';
import { formatDuration, raceStandings } from '../race.utils';

@Component({
  selector: 'app-race-bar',
  imports: [RouterLink, BadgeComponent, ButtonComponent, IconComponent],
  templateUrl: './race-bar.component.html',
  host: {
    class: 'd-block',
  },
})
export class RaceBarComponent {
  private readonly toast = inject(ToastService);
  private warnedRoom: string | null = null;
  private confirmTimer?: ReturnType<typeof setTimeout>;

  readonly room = input.required<Room>();
  readonly participantId = input<string | null>(null);
  readonly now = input.required<number>();
  readonly currentProblemId = input<number | null>(null);
  readonly problemTitles = input<Partial<Record<number, string>>>({});
  readonly ending = input(false);
  readonly finishing = input(false);

  readonly endRace = output<void>();
  readonly finish = output<void>();

  readonly confirmingFinish = signal(false);

  readonly isRace = computed(() => this.room().mode === 'RACE');
  readonly sessionLabel = computed(() => this.isRace() ? 'Race' : 'Session');

  readonly startsInMs = computed(() => {
    const startedAt = this.room().startedAt;
    return startedAt ? Date.parse(startedAt) - this.now() : 0;
  });
  readonly countingDown = computed(() => this.room().status === 'IN_PROGRESS' && this.startsInMs() > 0);
  readonly countdownValue = computed(() => Math.ceil(this.startsInMs() / 1000));

  readonly remainingMs = computed(() => {
    const endsAt = this.room().endsAt;
    return endsAt ? Math.max(0, Date.parse(endsAt) - this.now()) : null;
  });
  readonly elapsedMs = computed(() => {
    const startedAt = this.room().startedAt;
    return startedAt ? Math.max(0, this.now() - Date.parse(startedAt)) : 0;
  });
  readonly timerLabel = computed(() => {
    if (this.room().status === 'FINISHED') return `${this.sessionLabel()} over`;
    if (this.countingDown()) return `Starts in ${this.countdownValue()}`;
    const remaining = this.remainingMs();
    return remaining === null ? formatDuration(this.elapsedMs()) : formatDuration(remaining);
  });
  readonly lowTime = computed(() => {
    const remaining = this.remainingMs();
    return remaining !== null && remaining <= 60_000 && !this.countingDown() && this.room().status === 'IN_PROGRESS';
  });

  readonly standings = computed(() => raceStandings(this.room()));
  readonly myStanding = computed(() =>
    this.isRace() ? this.standings().find(row => row.player.id === this.participantId()) ?? null : null);
  readonly isHost = computed(() => this.room().host.id === this.participantId());
  readonly selfFinished = computed(() =>
    !!this.room().participants.find(player => player.id === this.participantId())?.finishedAt);
  readonly canFinish = computed(() =>
    this.room().status === 'IN_PROGRESS' && !this.countingDown() && !this.selfFinished() && !!this.participantId());

  constructor() {
    effect(() => {
      const room = this.room();
      if (this.lowTime() && !this.selfFinished() && this.warnedRoom !== room.code) {
        this.warnedRoom = room.code;
        this.toast.warning(`1 minute left! The ${this.sessionLabel().toLowerCase()} ends when the timer hits zero.`);
      }
    });
  }

  requestFinish(): void {
    if (!this.confirmingFinish()) {
      this.confirmingFinish.set(true);
      clearTimeout(this.confirmTimer);
      this.confirmTimer = setTimeout(() => this.confirmingFinish.set(false), 4000);
      return;
    }
    clearTimeout(this.confirmTimer);
    this.confirmingFinish.set(false);
    this.finish.emit();
  }

  solvedByMe(problemId: number): boolean {
    const me = this.room().participants.find(player => player.id === this.participantId());
    return !!me?.telemetry?.[problemId]?.solvedAt;
  }

  titleFor(problemId: number, index: number): string {
    return this.problemTitles()[problemId] ?? `Problem ${index + 1}`;
  }
}
