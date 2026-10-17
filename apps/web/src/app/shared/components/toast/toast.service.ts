import { Injectable, signal } from '@angular/core';
import { ToastConfig, ToastItem, ToastType } from './toast.types';

const DEFAULT_ICONS: Record<ToastType, string> = {
  success: 'check_circle',
  error: 'error',
  warning: 'warning',
  info: 'info',
};

const DEFAULT_DURATIONS: Record<ToastType, number> = {
  success: 3500,
  info: 4000,
  warning: 5000,
  error: 6000,
};

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly _toasts = signal<ToastItem[]>([]);
  readonly toasts = this._toasts.asReadonly();

  private counter = 0;

  show(config: ToastConfig | string): string {
    const normalized: ToastConfig = typeof config === 'string' ? { message: config } : config;
    const type = normalized.type || 'info';
    const id = normalized.id || `toast-${Date.now()}-${++this.counter}`;
    const duration = normalized.duration !== undefined ? normalized.duration : DEFAULT_DURATIONS[type];
    const icon = normalized.icon || DEFAULT_ICONS[type];

    const item: ToastItem = {
      id,
      type,
      title: normalized.title,
      message: normalized.message,
      duration,
      dismissible: normalized.dismissible !== false,
      action: normalized.action,
      icon,
      data: normalized.data,
      createdAt: Date.now(),
      remainingMs: duration,
    };

    if (duration > 0) {
      item.timeoutId = setTimeout(() => {
        this.dismiss(id);
      }, duration);
    }

    this._toasts.update(current => [...current, item]);
    return id;
  }

  success(message: string, options?: Partial<ToastConfig>): string {
    return this.show({ ...options, message, type: 'success' });
  }

  error(message: string, options?: Partial<ToastConfig>): string {
    return this.show({ ...options, message, type: 'error' });
  }

  warning(message: string, options?: Partial<ToastConfig>): string {
    return this.show({ ...options, message, type: 'warning' });
  }

  info(message: string, options?: Partial<ToastConfig>): string {
    return this.show({ ...options, message, type: 'info' });
  }

  dismiss(id: string): void {
    const current = this._toasts();
    const item = current.find(t => t.id === id);
    if (item?.timeoutId) {
      clearTimeout(item.timeoutId);
    }
    this._toasts.set(current.filter(t => t.id !== id));
  }

  clear(): void {
    for (const item of this._toasts()) {
      if (item.timeoutId) {
        clearTimeout(item.timeoutId);
      }
    }
    this._toasts.set([]);
  }

  pause(id: string): void {
    const current = this._toasts();
    const item = current.find(t => t.id === id);
    if (!item || item.duration <= 0 || item.pausedAt) {
      return;
    }

    if (item.timeoutId) {
      clearTimeout(item.timeoutId);
      item.timeoutId = undefined;
    }

    const elapsed = Date.now() - (item.pausedAt || item.createdAt);
    item.remainingMs = Math.max(0, item.remainingMs - elapsed);
    item.pausedAt = Date.now();
  }

  resume(id: string): void {
    const current = this._toasts();
    const item = current.find(t => t.id === id);
    if (!item || item.duration <= 0 || !item.pausedAt) {
      return;
    }

    item.pausedAt = undefined;
    if (item.remainingMs > 0) {
      item.timeoutId = setTimeout(() => {
        this.dismiss(id);
      }, item.remainingMs);
    } else {
      this.dismiss(id);
    }
  }
}
