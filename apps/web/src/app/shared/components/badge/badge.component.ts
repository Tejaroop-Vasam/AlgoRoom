import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

export type BadgeVariant = 'secondary' | 'primary' | 'tertiary' | 'error' | 'surface';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.css',
  host: {
    class: 'd-inline-flex'
  }
})
export class BadgeComponent {
  readonly label = input<string>('');
  readonly variant = input<BadgeVariant>('secondary');
  readonly pulse = input<boolean>(false);
  readonly icon = input<string | undefined>(undefined);
}
