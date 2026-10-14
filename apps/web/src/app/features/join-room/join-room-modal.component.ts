import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { BadgeComponent, ButtonComponent, ChipComponent, IconComponent, InputComponent } from '../../shared';
import { ModalContainerComponent } from '../../shared/components/modal/modal-container.component';
import { ApiError, Room, RoomPreview, RoomsApiService } from '../../services/api';

export interface JoinRoomModalData {
  code?: string;
}

const ROOM_CODE_LENGTH = 6;

@Component({
  selector: 'app-join-room-modal',
  standalone: true,
  imports: [BadgeComponent, ButtonComponent, ChipComponent, IconComponent, InputComponent],
  templateUrl: './join-room-modal.component.html',
  host: {
    class: 'd-block',
  },
})
export class JoinRoomModalComponent implements OnInit {
  private readonly container = inject(ModalContainerComponent, { optional: true });
  private readonly roomsApi = inject(RoomsApiService);

  readonly code = signal('');
  readonly normalizedCode = computed(() => this.code().replace(/[^a-z0-9]/gi, '').toUpperCase());
  readonly codeComplete = computed(() => this.normalizedCode().length === ROOM_CODE_LENGTH);

  readonly preview = signal<RoomPreview | null>(null);
  readonly joinedRoom = signal<Room | null>(null);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

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

  onCodeChange(value: string): void {
    this.code.set(value);
    this.error.set(null);
    if (this.preview() && this.preview()!.code !== this.normalizedCode()) {
      this.preview.set(null);
    }
  }

  lookup(): void {
    if (!this.codeComplete() || this.loading()) {
      return;
    }
    this.loading.set(true);
    this.error.set(null);
    this.roomsApi.getRoomPreview(this.normalizedCode()).subscribe({
      next: preview => {
        this.loading.set(false);
        this.preview.set(preview);
      },
      error: (err: HttpErrorResponse) => this.fail(err, 'Could not look up that room.'),
    });
  }

  join(): void {
    const room = this.preview();
    if (!room || this.loading() || this.roomFull()) {
      return;
    }
    this.loading.set(true);
    this.error.set(null);
    this.roomsApi.joinRoom(room.code).subscribe({
      next: joined => {
        this.loading.set(false);
        this.joinedRoom.set(joined);
      },
      error: (err: HttpErrorResponse) => this.fail(err, 'Could not join this room.'),
    });
  }

  submit(): void {
    if (this.preview()) {
      this.join();
    } else {
      this.lookup();
    }
  }

  close(): void {
    this.container?.close(this.joinedRoom());
  }

  private fail(err: HttpErrorResponse, fallback: string): void {
    this.loading.set(false);
    this.error.set((err.error as ApiError | null)?.message ?? fallback);
  }
}
