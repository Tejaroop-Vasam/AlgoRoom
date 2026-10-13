import { Component, computed, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg';
export type AvatarVariant = 'primary' | 'secondary' | 'tertiary' | 'surface';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.css',
  host: {
    class: 'd-inline-flex'
  }
})
export class AvatarComponent {
  readonly name = input<string>('');
  readonly src = input<string | undefined>(undefined);
  readonly size = input<AvatarSize>('md');
  readonly variant = input<AvatarVariant>('primary');

  readonly imageFailed = signal<boolean>(false);

  readonly initials = computed(() => {
    const parts = this.name().trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return '?';
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  });

  readonly dimension = computed(() => {
    const sizeMap: Record<AvatarSize, string> = {
      'xs': '1.25rem',
      'sm': '1.5rem',
      'md': '2rem',
      'lg': '2.5rem'
    };
    return sizeMap[this.size()];
  });
}
