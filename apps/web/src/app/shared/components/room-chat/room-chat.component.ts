import { DatePipe } from '@angular/common';
import { afterRenderEffect, Component, ElementRef, input, output, viewChild } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

export interface RoomChatMessage {
  user: { id: string; username: string };
  message: string;
  timestamp: string;
}

@Component({
  selector: 'app-room-chat',
  standalone: true,
  imports: [DatePipe, ButtonComponent],
  templateUrl: './room-chat.component.html',
  styleUrl: './room-chat.component.css',
  host: { class: 'flex flex-col gap-3 min-w-0' },
})
export class RoomChatComponent {
  private readonly chatLog = viewChild<ElementRef<HTMLDivElement>>('chatLog');
  readonly messages = input<RoomChatMessage[]>([]);
  readonly connected = input(false);
  readonly sent = output<string>();

  constructor() {
    afterRenderEffect(() => {
      this.messages();
      const log = this.chatLog()?.nativeElement;
      if (log) log.scrollTop = log.scrollHeight;
    });
  }

  send(event: SubmitEvent, input: HTMLInputElement): void {
    event.preventDefault();
    const message = input.value.trim();
    if (!message || !this.connected()) return;
    this.sent.emit(message);
    input.value = '';
  }
}
