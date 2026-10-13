import { Component, input, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

export type CheckboxSize = 'sm' | 'md';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.css',
  host: {
    class: 'd-inline-flex'
  }
})
export class CheckboxComponent {
  readonly label = input<string>('');
  readonly size = input<CheckboxSize>('md');
  readonly indeterminate = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly ariaLabel = input<string | undefined>(undefined);

  readonly checked = model<boolean>(false);

  toggle(event: MouseEvent): void {
    event.stopPropagation();
    if (!this.disabled()) {
      this.checked.update(v => !v);
    }
  }
}
