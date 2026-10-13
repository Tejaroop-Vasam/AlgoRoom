import { Component, input, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';

export interface SegmentOption<T = string> {
  label: string;
  value: T;
  icon?: string;
  disabled?: boolean;
}

export type SegmentedControlSize = 'sm' | 'md';

@Component({
  selector: 'app-segmented-control',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './segmented-control.component.html',
  styleUrl: './segmented-control.component.css',
  host: {
    '[class.d-flex]': 'fullWidth()',
    '[class.d-inline-flex]': '!fullWidth()'
  }
})
export class SegmentedControlComponent<T = string> {
  readonly options = input<SegmentOption<T>[]>([]);
  readonly size = input<SegmentedControlSize>('md');
  readonly fullWidth = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly ariaLabel = input<string | undefined>(undefined);

  readonly value = model<T | undefined>(undefined);

  select(option: SegmentOption<T>): void {
    if (!this.disabled() && !option.disabled) {
      this.value.set(option.value);
    }
  }
}
