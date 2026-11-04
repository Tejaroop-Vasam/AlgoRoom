import {
  Component,
  computed,
  ElementRef,
  input,
  output,
  signal,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconComponent } from '../icon/icon.component';
import { AvatarComponent, AvatarSize, AvatarVariant } from '../avatar/avatar.component';

export interface ChatParticipant {
  id: string;
  name: string;
  initials?: string;
  avatarSrc?: string;
  avatarVariant?: AvatarVariant;
  avatarSize?: AvatarSize;
  color?: string;
  avatarBg?: string;
  avatarColor?: string;
  barColor?: string;
  isActive?: boolean;
}

export interface ChatMessage {
  id: string;
  author: string;
  authorColor?: string;
  text: string;
  timestamp: string;
  isOwn?: boolean;
}

@Component({
  selector: 'app-live-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent, AvatarComponent],
  templateUrl: './live-chat.component.html',
  styleUrl: './live-chat.component.css',
  host: {
    class: 'd-flex flex-col w-full h-full rounded-2xl border border-surface-variant bg-surface-container-lowest p-4 overflow-hidden',
  },
})
export class LiveChatComponent {
  @ViewChild('scrollContainer') private scrollContainer?: ElementRef<HTMLDivElement>;

  readonly title = input<string>('Team Discussion');
  readonly activeCount = input<number | undefined>(undefined);
  readonly voiceStreamTitle = input<string>('ROOM VOICE STREAM');
  readonly showVoiceStream = input<boolean>(true);
  readonly participants = input<ChatParticipant[]>([]);
  readonly messages = input<ChatMessage[]>([]);
  readonly typingUser = input<string | null>(null);
  readonly placeholder = input<string>('Suggest an approach or type message...');
  readonly currentUser = input<{ id?: string; name: string } | null>(null);

  readonly sendMessage = output<string>();
  readonly typing = output<boolean>();
  readonly participantClick = output<ChatParticipant>();

  readonly internalMessages = signal<ChatMessage[]>([]);
  readonly inputText = signal<string>('');

  readonly activeParticipants = computed(() => this.participants());

  readonly displayedActiveCount = computed(() => {
    const explicit = this.activeCount();
    if (explicit !== undefined) return explicit;
    return this.participants().filter((p) => p.isActive !== false).length;
  });

  readonly allMessages = computed(() => [
    ...this.messages(),
    ...this.internalMessages(),
  ]);

  getInitials(name: string): string {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return '?';
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
  }

  onInputChange(event: Event): void {
    const val = (event.target as HTMLInputElement).value;
    this.inputText.set(val);
    this.typing.emit(val.length > 0);
  }

  onSend(): void {
    const text = this.inputText().trim();
    if (!text) return;

    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const mins = String(now.getMinutes()).padStart(2, '0');
    const timestamp = `${hours}:${mins}`;

    const author = this.currentUser()?.name || 'You';
    const newMsg: ChatMessage = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      author,
      authorColor: '#6366f1',
      text,
      timestamp,
      isOwn: true,
    };

    this.internalMessages.update((list) => [...list, newMsg]);
    this.sendMessage.emit(text);
    this.inputText.set('');
    this.typing.emit(false);
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      if (this.scrollContainer?.nativeElement) {
        this.scrollContainer.nativeElement.scrollTop =
          this.scrollContainer.nativeElement.scrollHeight;
      }
    }, 50);
  }
}
