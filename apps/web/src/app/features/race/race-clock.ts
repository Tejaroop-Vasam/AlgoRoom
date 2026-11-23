import { DestroyRef, inject, signal } from '@angular/core';

export class RaceClock {
  private offsetMs = 0;
  private readonly tick = signal(Date.now());
  readonly now = this.tick.asReadonly();

  constructor() {
    const timer = setInterval(() => this.tick.set(Date.now() + this.offsetMs), 250);
    inject(DestroyRef).onDestroy(() => clearInterval(timer));
  }

  sync(serverTime: string | undefined): void {
    const server = serverTime ? Date.parse(serverTime) : NaN;
    if (!Number.isNaN(server)) {
      this.offsetMs = server - Date.now();
      this.tick.set(server);
    }
  }
}
