import { moveItemInArray } from '@angular/cdk/drag-drop';
import { TitleCasePipe } from '@angular/common';
import { Component, computed, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../../environments/environment';
import { ProblemsApiService, ProblemSummary, Room, RoomMode } from '../../services/api';
import { GuestSessionService } from '../../services/guest-session.service';
import {
  AccordionComponent,
  AccordionItemComponent,
  AvatarComponent,
  BadgeComponent,
  ButtonComponent,
  IconComponent,
  InputComponent,
  SegmentedControlComponent,
  SegmentOption,
  ToastService,
} from '../../shared';
import { RoomChatComponent, RoomChatMessage } from '../../shared/components/room-chat/room-chat.component';

@Component({
  selector: 'app-room-lobby',
  imports: [
    RouterLink,
    TitleCasePipe,
    AccordionComponent,
    AccordionItemComponent,
    AvatarComponent,
    BadgeComponent,
    ButtonComponent,
    IconComponent,
    InputComponent,
    SegmentedControlComponent,
    RoomChatComponent,
  ],
  templateUrl: './room-lobby.component.html',
  styleUrl: './room-lobby.component.css',
})
export class RoomLobbyComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);
  private readonly problems = inject(ProblemsApiService);
  private readonly guest = inject(GuestSessionService);
  private readonly requestedProblems = new Set<number>();
  private socket?: Socket;

  readonly code = (this.route.snapshot.paramMap.get('code') ?? '').toUpperCase();
  readonly participantId = signal<string | null>(null);
  readonly room = signal<Room | null>(null);
  readonly connected = signal(false);
  readonly joinFailed = signal(false);
  readonly reordering = signal(false);
  readonly messages = signal<RoomChatMessage[]>([]);
  readonly problemDetails = signal<Partial<Record<number, Pick<ProblemSummary, 'title' | 'difficulty'>>>>({});
  readonly modeOptions: SegmentOption<RoomMode>[] = [
    { label: 'Race', value: 'RACE', icon: 'sports_score' },
    { label: 'Co-op', value: 'COOP', icon: 'handshake' },
  ];
  readonly durationOptions: SegmentOption<number>[] = [15, 30, 45, 60, 90].map(minutes => ({ label: `${minutes}m`, value: minutes }));
  readonly settingsName = signal('');
  readonly settingsMode = signal<RoomMode | undefined>('RACE');
  readonly settingsMaxPlayers = signal<number>(4);
  readonly settingsDuration = signal<number | undefined>(45);
  readonly savingSettings = signal(false);
  readonly settingsOpen = signal(false);
  readonly settingsSummary = computed(() => {
    const room = this.room();
    if (!room) return '';
    const mode = room.mode === 'RACE' ? 'Race' : 'Co-op';
    return `${mode} · ${room.settings.maxParticipants} players · ${room.settings.durationMinutes ?? 45} min`;
  });
  readonly canEditSettings = computed(() => {
    const room = this.room();
    return !!room && this.isHost(room) && room.status === 'LOBBY';
  });
  readonly settingsDirty = computed(() => {
    const room = this.room();
    if (!room) return false;
    return this.settingsName().trim() !== room.name
      || this.settingsMode() !== room.mode
      || Number(this.settingsMaxPlayers()) !== room.settings.maxParticipants
      || this.settingsDuration() !== (room.settings.durationMinutes ?? 45);
  });
  readonly settingsError = computed(() => {
    const room = this.room();
    const players = Number(this.settingsMaxPlayers());
    if (!this.settingsName().trim()) return 'Give the room a name.';
    if (!Number.isInteger(players) || players < 2 || players > 8) return 'Max players must be between 2 and 8.';
    if (room && players < room.participants.length) return `There are already ${room.participants.length} players in the room.`;
    return '';
  });
  readonly canReorder = computed(() => {
    const room = this.room();
    return !!room && this.isHost(room) && room.status === 'LOBBY' && room.problemIds.length > 1;
  });

  ngOnInit(): void {
    const socket = io(`${environment.apiUrl}/rooms`, {
      auth: { guestToken: this.guest.token },
      transports: ['polling', 'websocket'],
    });
    this.socket = socket;
    socket.on('connect', async () => {
      this.joinFailed.set(false);
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
    socket.on('disconnect', () => this.connected.set(false));
    socket.on('connect_error', (error: Error) => {
      this.connected.set(false);
      if (!socket.active) {
        this.joinFailed.set(true);
        this.toast.error(error.message);
      }
    });
    socket.on('error', (error: { message: string }) => this.toast.error(error.message));
    socket.on('roomStateUpdated', (room: Room) => {
      this.connected.set(true);
      const keepEdits = this.settingsDirty() && this.canEditSettings();
      this.room.set(room);
      if (!keepEdits) this.resetSettings();
      this.loadProblems(room.problemIds);
      this.followSession();
    });
    socket.on('chatBroadcast', (message: RoomChatMessage) => {
      this.messages.update(messages => [...messages.slice(-99), message]);
    });
  }

  ngOnDestroy(): void {
    this.socket?.disconnect();
  }

  sendChat(message: string): void {
    if (this.connected()) this.socket?.emit('chatMessage', { message });
  }

  launch(): void {
    this.socket?.emit('launchRoom');
  }

  resetSettings(): void {
    const room = this.room();
    if (!room) return;
    this.settingsName.set(room.name);
    this.settingsMode.set(room.mode);
    this.settingsMaxPlayers.set(room.settings.maxParticipants);
    this.settingsDuration.set(room.settings.durationMinutes ?? 45);
  }

  async saveSettings(): Promise<void> {
    const socket = this.socket;
    if (!socket || !this.connected() || !this.canEditSettings() || this.settingsError() || this.savingSettings()) return;
    this.savingSettings.set(true);
    try {
      const result = await socket.timeout(4000).emitWithAck('updateSettings', {
        name: this.settingsName().trim(),
        mode: this.settingsMode(),
        maxParticipants: Number(this.settingsMaxPlayers()),
        durationMinutes: this.settingsDuration() ?? 45,
      });
      if (result?.updated) {
        this.resetSettings();
        this.toast.success('Room settings saved.');
      }
    } catch {
      this.toast.error('Could not save the room settings. Try again.');
    } finally {
      this.savingSettings.set(false);
    }
  }

  async moveProblem(index: number, direction: -1 | 1): Promise<void> {
    const room = this.room();
    const socket = this.socket;
    if (!room || !socket || !this.connected() || !this.canReorder() || this.reordering()) return;
    const target = index + direction;
    if (target < 0 || target >= room.problemIds.length) return;

    const problemIds = [...room.problemIds];
    moveItemInArray(problemIds, index, target);
    this.reordering.set(true);
    try {
      await socket.timeout(4000).emitWithAck('reorderProblems', { problemIds });
    } catch {
      this.toast.error('Could not update the problem order. Try again.');
    } finally {
      this.reordering.set(false);
    }
  }

  private followSession(): void {
    const room = this.room();
    const me = this.participantId();
    if (!room || !me || room.status === 'LOBBY') return;
    const finished = room.participants.find(player => player.id === me)?.finishedAt;
    if (room.status === 'FINISHED' || finished) {
      void this.router.navigate(['/room', this.code, 'results'], { replaceUrl: true });
    } else {
      void this.router.navigate(['/problem', room.problemIds[0]], { queryParams: { room: this.code } });
    }
  }

  isHost(room: Room): boolean {
    return room.host.id === this.participantId();
  }

  async leave(): Promise<void> {
    if (this.connected() && this.socket) {
      try {
        const result = await this.socket.timeout(3000).emitWithAck('leaveRoom');
        if (!result?.left) return;
      } catch {
        this.toast.error('Could not leave the room. Try again.');
        return;
      }
    }
    await this.router.navigate(['/']);
  }

  async copyInvite(): Promise<void> {
    try {
      await navigator.clipboard.writeText(new URL(`./?join=${this.code}`, document.baseURI).href);
      this.toast.success('Invite link copied.');
    } catch {
      this.toast.error('Could not copy the invite link.');
    }
  }

  private loadProblems(ids: number[]): void {
    for (const id of ids) {
      if (this.problemDetails()[id] || this.requestedProblems.has(id)) continue;
      this.requestedProblems.add(id);
      void this.problems.getProblem(id).then(({ title, difficulty }) => {
        this.problemDetails.update(problems => ({ ...problems, [id]: { title, difficulty } }));
      }).catch(() => {}).finally(() => this.requestedProblems.delete(id));
    }
  }
}
