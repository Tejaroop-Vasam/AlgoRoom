import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { BaseInput } from '../base-input';

export interface SelectOption<T = string> {
  label: string;
  value: T;
  icon?: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
  ],
  templateUrl: './select.component.html',
  styleUrl: './select.component.css',
  host: {
    class: 'd-block w-full'
  }
})
export class SelectComponent<T = string> extends BaseInput<T | null> {
  readonly options = input<SelectOption<T>[]>([]);
  readonly multiple = input<boolean>(false);
  readonly valuePrefix = input<string>('');
  readonly size = input<'sm' | 'base'>('base');

  onSelectionChange(value: T | null): void {
    this.value.set(value);
  }

  selectedLabel(): string {
    const option = this.options().find(o => o.value === this.value());
    return option ? option.label : '';
  }

  override clearValue(event?: MouseEvent): void {
    if (event) {
      event.stopPropagation();
    }
    this.value.set(null);
  }
}
