import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../../environments/environment';
import { ProblemsApiService, Room } from '../../services/api';
import { GuestSessionService } from '../../services/guest-session.service';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { ToastService } from '../../shared/components/toast/toast.service';

interface ChatMessage {
  user: { id: string; username: string };
  message: string;
  timestamp: string;
}

@Component({
  selector: 'app-room-lobby',
  imports: [RouterLink, ButtonComponent],
  templateUrl: './room-lobby.component.html',
  styleUrl: './room-lobby.component.css',
})
export class RoomLobbyComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly toast = inject(ToastService);
  private readonly problems = inject(ProblemsApiService);
  private readonly guest = inject(GuestSessionService);
  private readonly participantId = signal<string | null>(null);
  private socket?: Socket;

  readonly code = (this.route.snapshot.paramMap.get('code') ?? '').toUpperCase();
  readonly room = signal<Room | null>(null);
  readonly connected = signal(false);
  readonly messages = signal<ChatMessage[]>([]);
  readonly titles = signal<Record<number, string>>({});

  ngOnInit(): void {
    const socket = io(`${environment.apiUrl}/rooms`, {
      auth: { guestToken: this.guest.token },
      transports: ['polling', 'websocket'],
    });
    this.socket = socket;
    socket.on('connect', () => {
      socket.emit('joinLobby', { code: this.code }, (result: { participantId?: string }) => {
        this.participantId.set(result.participantId ?? null);
      });
    });
    socket.on('disconnect', () => this.connected.set(false));
    socket.on('connect_error', (error: Error) => {
      this.connected.set(false);
      if (!socket.active) this.toast.error(error.message);
    });
    socket.on('error', (error: { message: string }) => this.toast.error(error.message));
    socket.on('roomStateUpdated', (room: Room) => {
      this.connected.set(true);
      this.room.set(room);
      this.loadTitles(room.problemIds);
    });
    socket.on('chatBroadcast', (message: ChatMessage) => {
      this.messages.update(messages => [...messages.slice(-99), message]);
    });
  }

  ngOnDestroy(): void {
    this.socket?.disconnect();
  }

  sendChat(event: SubmitEvent, input: HTMLInputElement): void {
    event.preventDefault();
    const message = input.value.trim();
    if (!message || !this.connected()) return;
    this.socket?.emit('chatMessage', { message });
    input.value = '';
  }

  launch(): void {
    this.socket?.emit('launchRoom');
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

  private loadTitles(ids: number[]): void {
    for (const id of ids) {
      if (this.titles()[id]) continue;
      this.titles.update(titles => ({ ...titles, [id]: `Problem #${id}` }));
      void this.problems.getProblem(id).then(problem => {
        this.titles.update(titles => ({ ...titles, [id]: problem.title }));
      }).catch(() => {});
    }
  }
}
