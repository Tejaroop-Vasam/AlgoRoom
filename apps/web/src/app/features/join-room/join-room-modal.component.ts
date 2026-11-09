import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { BadgeComponent, ButtonComponent, ChipComponent, IconComponent, InputComponent } from '../../shared';
import { Router } from '@angular/router';
import { ModalContainerComponent } from '../../shared/components/modal/modal-container.component';
import { Room, RoomPreview, RoomsApiService } from '../../services/api';
import { LoadingService } from '../../services/loading.service';
import { RoomSocketService } from '../../services/room-socket.service';

export interface JoinRoomModalData {
  code?: string;
}

const ROOM_CODE_LENGTH = 6;

@Component({
  selector: 'app-join-room-modal',
  standalone: true,
  imports: [BadgeComponent, ButtonComponent, ChipComponent, IconComponent, InputComponent],
  templateUrl: './join-room-modal.component.html',
  styleUrl: './join-room-modal.component.css',
  host: {
    class: 'd-block',
  },
})
export class JoinRoomModalComponent implements OnInit {
  private readonly container = inject(ModalContainerComponent, { optional: true });
  private readonly roomsApi = inject(RoomsApiService);
  private readonly loadingService = inject(LoadingService);
  private readonly roomSocket = inject(RoomSocketService);
  private readonly router = inject(Router);

  readonly code = signal('');
  readonly username = signal<string>(typeof localStorage !== 'undefined' ? localStorage.getItem('algoroom_username') || '' : '');
  readonly normalizedCode = computed(() => this.code().replace(/[^a-z0-9]/gi, '').toUpperCase());
  readonly codeComplete = computed(() => this.normalizedCode().length === ROOM_CODE_LENGTH);

  readonly preview = signal<RoomPreview | null>(null);
  readonly joinedRoom = signal<Room | null>(null);
  readonly activeRoom = computed(() => this.roomSocket.currentRoom() || this.joinedRoom());
  readonly loading = this.loadingService.isLoading;

  readonly roomFull = computed(() => {
    const room = this.preview();
    return !!room && room.participantCount >= room.maxParticipants;
  });

  ngOnInit(): void {
    const initialCode = (this.container?.config?.data as JoinRoomModalData | undefined)?.code;
    if (initialCode) {
      this.code.set(initialCode);
      this.lookup();
    }
  }

  onCodeChange(val: string): void {
    this.code.set(val);
    if (this.preview() && this.preview()!.code !== this.normalizedCode()) {
      this.preview.set(null);
    }
  }

  async lookup(): Promise<void> {
    if (!this.codeComplete() || this.loading()) {
      return;
    }
    try {
      const preview = await this.roomsApi.getRoomPreview(this.normalizedCode());
      this.preview.set(preview);
    } catch {
      this.preview.set(null);
    }
  }

  async join(): Promise<void> {
    const room = this.preview();
    const uname = this.username().trim();
    if (!room || this.loading() || this.roomFull() || !uname) {
      return;
    }
    try {
      const joined = await this.roomsApi.joinRoom(room.code, uname);
      this.joinedRoom.set(joined);
      const participant = joined.participants?.find(
        p => p.username?.toLowerCase() === uname.toLowerCase(),
      );
      this.roomSocket.connect(joined.code, uname, participant?.id);
    } catch {}
  }

  submit(): void {
    if (this.preview()) {
      this.join();
    } else {
      this.lookup();
    }
  }

  enterLobby(code: string): void {
    this.close();
    this.router.navigate(['/room', code]);
  }

  close(): void {
    this.container?.close(this.activeRoom() || this.joinedRoom());
  }
}
