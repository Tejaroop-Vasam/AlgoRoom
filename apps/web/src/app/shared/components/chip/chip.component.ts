import { Component, input, model, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

export type ChipVariant = 'surface' | 'primary' | 'outline';
export type ChipSize = 'sm' | 'md';

@Component({
  selector: 'app-chip',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './chip.component.html',
  styleUrl: './chip.component.css',
  host: {
    class: 'd-inline-flex'
  }
})
export class ChipComponent {
  readonly label = input<string>('');
  readonly prefix = input<string | undefined>(undefined);
  readonly icon = input<string | undefined>(undefined);
  readonly variant = input<ChipVariant>('surface');
  readonly size = input<ChipSize>('md');
  readonly selectable = input<boolean>(false);
  readonly removable = input<boolean>(false);
  readonly disabled = input<boolean>(false);

  readonly selected = model<boolean>(false);
  readonly removed = output<void>();

  toggle(): void {
    if (this.selectable() && !this.disabled()) {
      this.selected.update(v => !v);
    }
  }

  remove(event: MouseEvent): void {
    event.stopPropagation();
    if (!this.disabled()) {
      this.removed.emit();
    }
  }
}
