import { Component, computed, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../../../environments/environment';
import { ProblemsApiService, Room } from '../../../services/api';
import { GuestSessionService } from '../../../services/guest-session.service';
import { BadgeComponent, ButtonComponent, IconComponent } from '../../../shared';
import { RaceClock } from '../race-clock';
import { RaceStandingsComponent } from '../race-standings/race-standings.component';
import { formatDuration, raceStandings } from '../race.utils';

@Component({
  selector: 'app-race-results',
  imports: [BadgeComponent, ButtonComponent, IconComponent, RaceStandingsComponent],
  templateUrl: './race-results.component.html',
  host: {
    class: 'd-block',
  },
})
export class RaceResultsComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly problems = inject(ProblemsApiService);
  private readonly guest = inject(GuestSessionService);
  private socket?: Socket;

  readonly code = (this.route.snapshot.paramMap.get('code') ?? '').toUpperCase();
  readonly room = signal<Room | null>(null);
  readonly participantId = signal<string | null>(null);
  readonly joinFailed = signal(false);
  readonly problemTitles = signal<Partial<Record<number, string>>>({});
  readonly clock = new RaceClock();
  readonly stillRunning = computed(() => this.room()?.status === 'IN_PROGRESS');
  readonly remainingMs = computed(() => {
    const endsAt = this.room()?.endsAt;
    return endsAt ? Math.max(0, Date.parse(endsAt) - this.clock.now()) : null;
  });
  readonly playersStillGoing = computed(() =>
    this.standings().filter(row => !row.player.finishedAt && row.solvedCount < (this.room()?.problemIds.length ?? 0)).length);

  readonly standings = computed(() => {
    const room = this.room();
    return room ? raceStandings(room) : [];
  });
  readonly me = computed(() => this.standings().find(row => row.player.id === this.participantId()) ?? null);
  readonly winner = computed(() => {
    const top = this.standings()[0];
    return top?.solvedCount ? top : null;
  });
  readonly raceLengthMs = computed(() => {
    const room = this.room();
    return room?.startedAt && room.finishedAt ? Date.parse(room.finishedAt) - Date.parse(room.startedAt) : null;
  });
  readonly endedByTime = computed(() => {
    const room = this.room();
    return !!room?.endsAt && room.finishedAt === room.endsAt;
  });

  readonly isRace = computed(() => this.room()?.mode === 'RACE');

  readonly formatDuration = formatDuration;

  ngOnInit(): void {
    const socket = io(`${environment.apiUrl}/rooms`, {
      auth: { guestToken: this.guest.token },
      transports: ['polling', 'websocket'],
    });
    this.socket = socket;
    socket.on('connect', async () => {
      try {
        const result = await socket.timeout(4000).emitWithAck('joinLobby', { code: this.code });
        if (result?.needsName) {
          await this.router.navigate(['/'], { queryParams: { join: this.code }, replaceUrl: true });
          return;
        }
        this.participantId.set(result?.participantId ?? null);
        this.joinFailed.set(!result?.participantId);
        this.followSession();
      } catch {
        this.joinFailed.set(true);
      }
    });
    socket.on('connect_error', () => this.joinFailed.set(true));
    socket.on('roomStateUpdated', (room: Room) => {
      this.clock.sync(room.serverTime);
      this.room.set(room);
      this.loadTitles(room.problemIds);
      this.followSession();
    });
  }

  ngOnDestroy(): void {
    this.socket?.disconnect();
  }

  async leave(): Promise<void> {
    try {
      await this.socket?.timeout(3000).emitWithAck('leaveRoom');
    } catch {}
    await this.router.navigate(['/']);
  }

  private followSession(): void {
    const room = this.room();
    const me = this.participantId();
    if (!room || !me) return;
    if (room.status === 'LOBBY') {
      void this.router.navigate(['/room', this.code], { replaceUrl: true });
    } else if (room.status === 'IN_PROGRESS' && !room.participants.find(player => player.id === me)?.finishedAt) {
      void this.router.navigate(['/problem', room.problemIds[0]], { queryParams: { room: this.code }, replaceUrl: true });
    }
  }

  private loadTitles(ids: number[]): void {
    for (const id of ids) {
      if (this.problemTitles()[id]) continue;
      void this.problems.getProblem(id).then(({ title }) => {
        this.problemTitles.update(titles => ({ ...titles, [id]: title }));
      }).catch(() => {});
    }
  }
}
