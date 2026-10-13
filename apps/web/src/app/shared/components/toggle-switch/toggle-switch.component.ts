import { Component, input, model } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ToggleSwitchSize = 'sm' | 'md';

@Component({
  selector: 'app-toggle-switch',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toggle-switch.component.html',
  styleUrl: './toggle-switch.component.css',
  host: {
    class: 'd-inline-flex'
  }
})
export class ToggleSwitchComponent {
  readonly label = input<string>('');
  readonly labelPosition = input<'start' | 'end'>('end');
  readonly size = input<ToggleSwitchSize>('md');
  readonly disabled = input<boolean>(false);
  readonly ariaLabel = input<string | undefined>(undefined);

  readonly checked = model<boolean>(false);

  toggle(): void {
    if (!this.disabled()) {
      this.checked.update(v => !v);
    }
  }
}
