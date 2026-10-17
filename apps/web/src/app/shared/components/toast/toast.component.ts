import { Component, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { ToastItem } from './toast.types';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',
  host: {
    class: 'd-block',
  },
})
export class ToastComponent {
  readonly toast = input.required<ToastItem>();
  readonly dismissed = output<string>();
  readonly actionClicked = output<ToastItem>();

  readonly iconName = computed(() => {
    return this.toast().icon;
  });

  readonly iconColor = computed(() => {
    switch (this.toast().type) {
      case 'success':
        return 'var(--color-secondary)';
      case 'error':
        return 'var(--color-error)';
      case 'warning':
        return 'var(--color-tertiary)';
      case 'info':
      default:
        return 'var(--color-primary)';
    }
  });

  readonly borderAccentClass = computed(() => {
    switch (this.toast().type) {
      case 'success':
        return 'border-secondary';
      case 'error':
        return 'border-error';
      case 'warning':
        return 'border-tertiary';
      case 'info':
      default:
        return 'border-primary';
    }
  });

  onDismiss(): void {
    this.dismissed.emit(this.toast().id);
  }

  onAction(): void {
    const item = this.toast();
    if (item.action) {
      item.action.action();
      this.actionClicked.emit(item);
    }
  }
}
