import { Component, computed, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent } from './toast.component';
import { ToastService } from './toast.service';
import { ToastItem, ToastPosition } from './toast.types';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [CommonModule, ToastComponent],
  templateUrl: './toast-container.component.html',
  styleUrl: './toast-container.component.css',
  host: {
    class: 'd-contents',
  },
})
export class ToastContainerComponent {
  readonly toastService = inject(ToastService);
  readonly position = input<ToastPosition>('bottom-right');

  readonly toasts = this.toastService.toasts;

  readonly positionClass = computed(() => {
    switch (this.position()) {
      case 'top-left':
        return 'top-4 left-4 items-start';
      case 'bottom-left':
        return 'bottom-4 left-4 items-start';
      case 'top-right':
        return 'top-4 right-4 items-end';
      case 'bottom-right':
      default:
        return 'bottom-4 right-4 items-end';
    }
  });

  onDismiss(id: string): void {
    this.toastService.dismiss(id);
  }

  onPause(id: string): void {
    this.toastService.pause(id);
  }

  onResume(id: string): void {
    this.toastService.resume(id);
  }
}
