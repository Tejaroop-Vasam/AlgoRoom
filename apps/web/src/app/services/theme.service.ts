import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly darkSignal = signal<boolean>(true);
  readonly isDark = this.darkSignal.asReadonly();

  constructor() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const saved = localStorage.getItem('algoroom-theme');
      const isDark = saved ? saved === 'dark' : true;
      this.setDark(isDark);
    }
  }

  toggleTheme(): void {
    this.setDark(!this.darkSignal());
  }

  setDark(dark: boolean): void {
    this.darkSignal.set(dark);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('algoroom-theme', dark ? 'dark' : 'light');
    }
    if (typeof document !== 'undefined') {
      if (dark) {
        document.documentElement.removeAttribute('data-theme');
        document.documentElement.classList.remove('theme-stitch-light');
      } else {
        document.documentElement.setAttribute('data-theme', 'stitch-light');
        document.documentElement.classList.add('theme-stitch-light');
      }
    }
  }
}
