export type ToastType = 'success' | 'error' | 'warning' | 'info';

export type ToastPosition =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'
  | 'top-center'
  | 'bottom-center';

export interface ToastAction {
  label: string;
  action: () => void;
}

export interface ToastConfig {
  id?: string;
  type?: ToastType;
  title?: string;
  message: string;
  duration?: number;
  dismissible?: boolean;
  action?: ToastAction;
  icon?: string;
  data?: unknown;
}

export interface ToastItem {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
  duration: number;
  dismissible: boolean;
  action?: ToastAction;
  icon: string;
  data?: unknown;
  createdAt: number;
  remainingMs: number;
  pausedAt?: number;
  timeoutId?: ReturnType<typeof setTimeout>;
}
