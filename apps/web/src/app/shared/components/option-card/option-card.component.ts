import { Component, input, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'app-option-card',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './option-card.component.html',
  styleUrl: './option-card.component.css',
  host: {
    class: 'd-block'
  }
})
export class OptionCardComponent {
  readonly title = input<string>('');
  readonly subtitle = input<string>('');
  readonly description = input<string>('');
  readonly icon = input<string | undefined>(undefined);
  readonly disabled = input<boolean>(false);

  readonly selected = model<boolean>(false);

  select(): void {
    if (!this.disabled()) {
      this.selected.set(true);
    }
  }
}
