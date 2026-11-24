import { DatePipe } from '@angular/common';
import { afterRenderEffect, Component, ElementRef, input, output, signal, viewChild } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { AvatarComponent } from '../avatar/avatar.component';
import { IconComponent } from '../icon/icon.component';
import { InputComponent } from '../input/input.component';

export interface RoomChatMessage {
  user: { id: string; username: string };
  message: string;
  timestamp: string;
}

@Component({
  selector: 'app-room-chat',
  standalone: true,
  imports: [DatePipe, ButtonComponent, AvatarComponent, IconComponent, InputComponent],
  templateUrl: './room-chat.component.html',
  styleUrl: './room-chat.component.css',
  host: { class: 'flex flex-col min-w-0 min-h-0' },
})
export class RoomChatComponent {
  private readonly chatLog = viewChild<ElementRef<HTMLDivElement>>('chatLog');
  readonly messages = input<RoomChatMessage[]>([]);
  readonly connected = input(false);
  readonly selfId = input<string | null>(null);
  readonly draft = signal('');
  readonly sent = output<string>();

  constructor() {
    afterRenderEffect(() => {
      this.messages();
      const log = this.chatLog()?.nativeElement;
      if (log) log.scrollTop = log.scrollHeight;
    });
  }

  send(event: SubmitEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const message = this.draft().trim();
    if (!message || !this.connected()) return;
    this.sent.emit(message);
    this.draft.set('');
  }
}
