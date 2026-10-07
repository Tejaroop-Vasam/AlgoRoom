import { Directive, input, model, output } from '@angular/core';
import type { FormValueControl } from '@angular/forms/signals';
import { MatFormFieldAppearance } from '@angular/material/form-field';

@Directive()
export abstract class BaseInput<T = any> implements FormValueControl<T> {
  readonly label = input<string>('');
  readonly placeholder = input<string>('');
  readonly appearance = input<MatFormFieldAppearance>('outline');
  readonly inputId = input<string>('');
  readonly prefixIcon = input<string | undefined>(undefined);
  readonly suffixIcon = input<string | undefined>(undefined);
  readonly hint = input<string>('');
  readonly errorMessage = input<string>('');
  readonly clearable = input<boolean>(false);
  readonly required = input<boolean>(false);
  readonly readonly = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly autocomplete = input<string>('off');

  readonly value = model<T>('' as unknown as T);
  readonly touch = output<void>();

  onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value.set(target.value as unknown as T);
  }

  onBlur(): void {
    this.touch.emit();
  }

  clearValue(event?: MouseEvent): void {
    if (event) {
      event.stopPropagation();
    }
    this.value.set('' as unknown as T);
  }
}

