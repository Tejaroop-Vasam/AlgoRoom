import { moveItemInArray } from '@angular/cdk/drag-drop';
import { TitleCasePipe } from '@angular/common';
import { Component, computed, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../../environments/environment';
import { ProblemsApiService, ProblemSummary, Room } from '../../services/api';
import { GuestSessionService } from '../../services/guest-session.service';
import { AvatarComponent, BadgeComponent, ButtonComponent, IconComponent, ToastService } from '../../shared';
import { RoomChatComponent, RoomChatMessage } from '../../shared/components/room-chat/room-chat.component';

@Component({
  selector: 'app-room-lobby',
  imports: [RouterLink, TitleCasePipe, AvatarComponent, BadgeComponent, ButtonComponent, IconComponent, RoomChatComponent],
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
      this.room.set(room);
      this.loadProblems(room.problemIds);
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
