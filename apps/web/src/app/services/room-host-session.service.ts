import { Injectable } from '@angular/core';
import type { GuestHostSessionDto } from './api/api-client';

interface RoomHostSession extends GuestHostSessionDto {
  hostId: string;
}

@Injectable({ providedIn: 'root' })
export class RoomHostSessionService {
  private readonly sessions = new Map<string, RoomHostSession>();

  get(code: string): RoomHostSession | undefined {
    const key = this.storageKey(code);
    let session = this.sessions.get(key);
    if (!session) {
      try {
        session = JSON.parse(sessionStorage.getItem(key) ?? 'null') ?? undefined;
      } catch {}
    }
    if (session && session.expiresAt * 1000 > Date.now()) {
      this.sessions.set(key, session);
      return session;
    }
    return undefined;
  }

  start(code: string, hostId: string, credentials: GuestHostSessionDto): void {
    const key = this.storageKey(code);
    const session = { ...credentials, hostId };
    this.sessions.set(key, session);
    try {
      sessionStorage.setItem(key, JSON.stringify(session));
    } catch {}
  }

  end(code: string): void {
    const key = this.storageKey(code);
    this.sessions.delete(key);
    try {
      sessionStorage.removeItem(key);
    } catch {}
  }

  private storageKey(code: string): string {
    return `algoroom-host:${code.toUpperCase()}`;
  }
}
