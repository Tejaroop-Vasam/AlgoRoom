import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AvatarComponent,
  BadgeComponent,
  BadgeVariant,
  ButtonComponent,
  IconComponent,
  KbdComponent,
  ToastService,
} from '../../shared';
import { Difficulty, ProblemsApiService, RoomParticipant } from '../../services/api';
import { RoomSocketService } from '../../services/room-socket.service';

export interface LobbyProblem {
  id: number;
  position: number;
  title: string;
  difficulty: Difficulty | null;
  publicTestCount: number | null;
  timeLimitMs: number | null;
  memoryLimitMb: number | null;
  stage: string;
  loaded: boolean;
}

export interface LobbyPlayer extends RoomParticipant {
  isSelf: boolean;
}

@Component({
  selector: 'app-room-lobby',
  standalone: true,
  imports: [AvatarComponent, BadgeComponent, ButtonComponent, IconComponent, KbdComponent],
  templateUrl: './room-lobby.component.html',
  host: {
    class: 'd-block',
  },
})
export class RoomLobbyComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly roomSocket = inject(RoomSocketService);
  private readonly problemsApi = inject(ProblemsApiService);
  private readonly toast = inject(ToastService);

  readonly roomCode = (this.route.snapshot.paramMap.get('code') ?? '').toUpperCase();
  readonly connected = this.roomSocket.connected;

  readonly room = computed(() => {
    const room = this.roomSocket.currentRoom();
    return room?.code?.toUpperCase() === this.roomCode ? room : null;
  });

  private readonly requestedProblemIds = new Set<number>();
  private readonly problemDetails = signal<
    Record<
      number,
      {
        title: string;
        difficulty: Difficulty;
        publicTestCount: number;
        timeLimitMs: number;
        memoryLimitMb: number;
      }
    >
  >({});

  readonly problems = computed<LobbyProblem[]>(() => {
    const ids = this.room()?.problemIds ?? [];
    const details = this.problemDetails();
    return ids.map((id, index) => {
      const detail = details[id];
      return {
        id,
        position: index + 1,
        title: detail?.title ?? `Problem #${id}`,
        difficulty: detail?.difficulty ?? null,
        publicTestCount: detail?.publicTestCount ?? null,
        timeLimitMs: detail?.timeLimitMs ?? null,
        memoryLimitMb: detail?.memoryLimitMb ?? null,
        stage: index === 0 ? 'Initial' : index === ids.length - 1 ? 'Final Round' : 'Queued',
        loaded: !!detail,
      };
    });
  });

  readonly players = computed<LobbyPlayer[]>(() => {
    const room = this.room();
    const session = this.roomSocket.session();
    if (!room) {
      return [];
    }
    return [...room.participants]
      .sort((a, b) => Number(b.isHost) - Number(a.isHost))
      .map((p) => ({
        ...p,
        isSelf: session?.userId
          ? p.id === session.userId
          : p.username?.toLowerCase() === session?.username.toLowerCase(),
      }));
  });

  readonly maxPlayers = computed(() => this.room()?.settings?.maxParticipants ?? 0);
  readonly openSlots = computed(() =>
    Array.from({ length: Math.max(0, this.maxPlayers() - this.players().length) }),
  );
  readonly self = computed(() => this.players().find((p) => p.isSelf) ?? null);
  readonly isHost = computed(() => !!this.self()?.isHost);
  readonly host = computed(() => this.players().find((p) => p.isHost) ?? null);

  readonly sessionRules = computed(() => {
    const room = this.room();
    if (!room) {
      return [];
    }
    const settings = room.settings;
    return [
      room.mode === 'RACE'
        ? 'Live telemetry enabled (typing velocity, compile tries)'
        : 'Shared editor with live multi-cursor sync',
      settings?.hiddenTestCases
        ? 'Hidden test cases revealed immediately post-race'
        : 'Graded on public sample test cases only',
      settings?.bufferVisibility === 'OPEN'
        ? 'Code buffers visible to all players'
        : settings?.bufferVisibility === 'HOST_ONLY'
          ? 'Code buffers visible to the host only'
          : 'Code buffers obscured until the round ends',
    ];
  });

  readonly copied = signal(false);

  constructor() {
    effect(() => {
      const room = this.room();
      const ids = room?.problemIds ?? [];
      ids.filter((id) => !this.requestedProblemIds.has(id)).forEach((id) => this.loadProblem(id));

      if (room?.status === 'IN_PROGRESS' && ids.length > 0) {
        this.router.navigate(['/problem', ids[0]], {
          queryParams: { room: room.code },
        });
      }
    });
  }

  ngOnInit(): void {
    if (this.room()) {
      return;
    }
    const session = this.roomSocket.restoreSession(this.roomCode);
    if (session) {
      this.roomSocket.connect(session.roomCode, session.username, session.userId);
    } else {
      this.router.navigate(['/'], { queryParams: { join: this.roomCode }, replaceUrl: true });
    }
  }

  difficultyVariant(difficulty: Difficulty | null): BadgeVariant {
    return difficulty === 'EASY' ? 'secondary' : difficulty === 'HARD' ? 'error' : 'tertiary';
  }

  inviteLink(): string {
    return new URL(`./?join=${this.roomCode}`, document.baseURI).href;
  }

  async copyInviteLink(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.inviteLink());
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 1500);
    } catch {
      this.toast.error('Could not copy the invite link');
    }
  }

  launchRoom(): void {
    if (!this.isHost() || this.problems().length === 0) {
      return;
    }
    this.roomSocket.launchRoom();
  }

  leaveRoom(): void {
    this.roomSocket.leave();
    this.router.navigate(['/']);
  }

  private async loadProblem(id: number): Promise<void> {
    this.requestedProblemIds.add(id);
    try {
      const problem = await this.problemsApi.getProblem(id);
      this.problemDetails.update((details) => ({
        ...details,
        [id]: {
          title: problem.title,
          difficulty: problem.difficulty as Difficulty,
          publicTestCount: problem.sampleTestCases?.length ?? 0,
          timeLimitMs: problem.timeLimitMs,
          memoryLimitMb: problem.memoryLimitMb,
        },
      }));
    } catch {}
  }
}
