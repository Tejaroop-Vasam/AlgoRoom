import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { BaseInput } from '../base-input';
import { IconComponent } from '../icon/icon.component';

export type InputType = 'text' | 'number' | 'email' | 'password' | 'tel' | 'url' | 'date';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
  host: {
    class: 'd-block w-full'
  }
})
export class InputComponent extends BaseInput {
  readonly type = input<InputType>('text');
  readonly min = input<number | string | undefined>(undefined);
  readonly max = input<number | string | undefined>(undefined);
  readonly step = input<number | string | undefined>(undefined);

  readonly showPassword = signal<boolean>(false);

  actualType(): string {
    if (this.type() === 'password') {
      return this.showPassword() ? 'text' : 'password';
    }
    return this.type();
  }

  override onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const newVal = this.type() === 'number' && target.value !== '' ? target.valueAsNumber : target.value;
    this.value.set(newVal as any);
  }

  togglePasswordVisibility(event: MouseEvent): void {
    event.stopPropagation();
    this.showPassword.update(v => !v);
  }
}
