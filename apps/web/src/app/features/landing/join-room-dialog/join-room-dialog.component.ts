import { Component, OnInit, computed, input, output, signal } from '@angular/core';

const ROOM_CODE_PATTERN = /^[A-Z]{3}-\d{3}$/;

@Component({
  selector: 'app-join-room-dialog',
  templateUrl: './join-room-dialog.component.html',
  styleUrl: './join-room-dialog.component.css',
  host: { '(document:keydown.escape)': 'close()' },
})
export class JoinRoomDialogComponent implements OnInit {
  readonly initialCode = input('');
  readonly closed = output<void>();

  readonly roomCode = signal('');
  readonly handle = signal('');
  readonly status = signal<'idle' | 'connecting' | 'joined'>('idle');
  readonly submitted = signal(false);

  readonly isCodeValid = computed(() => ROOM_CODE_PATTERN.test(this.roomCode()));
  readonly isHandleValid = computed(() => this.handle().trim().length >= 2);

  ngOnInit(): void {
    this.roomCode.set(this.initialCode());
  }

  onCodeInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.roomCode.set(value.trim().toUpperCase());
  }

  onHandleInput(event: Event): void {
    this.handle.set((event.target as HTMLInputElement).value);
  }

  async pasteCode(): Promise<void> {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        this.roomCode.set(text.trim().toUpperCase());
      }
    } catch {
      // Clipboard access was denied; the user can still type the code.
    }
  }

  enterArena(): void {
    this.submitted.set(true);
    if (!this.isCodeValid() || !this.isHandleValid() || this.status() !== 'idle') {
      return;
    }

    // No backend yet, so simulate the connection round trip.
    this.status.set('connecting');
    setTimeout(() => {
      this.status.set('joined');
      setTimeout(() => this.status.set('idle'), 1500);
    }, 800);
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }

  close(): void {
    this.closed.emit();
  }
}
