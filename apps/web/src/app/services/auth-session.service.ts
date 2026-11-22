import { computed, Injectable, signal } from '@angular/core';
import { AuthResultDto, UserProfileDto } from './api/api-client';

const SESSION_KEY = 'algoroom-auth-session';

interface AuthSession {
  token: string;
  expiresAt: number;
  user: Pick<UserProfileDto, 'id' | 'username'>;
}

function readSession(): AuthSession | null {
  try {
    const session: AuthSession | null = JSON.parse(sessionStorage.getItem(SESSION_KEY) ?? 'null');
    return session && typeof session.token === 'string' && session.expiresAt > Date.now() ? session : null;
  } catch {
    return null;
  }
}

@Injectable({ providedIn: 'root' })
export class AuthSessionService {
  private readonly session = signal<AuthSession | null>(readSession());
  readonly user = computed(() => this.session()?.user ?? null);

  accessToken(): string | undefined {
    const current = this.session();
    return current && current.expiresAt > Date.now() ? current.token : undefined;
  }

  start(result: AuthResultDto): void {
    const payload = result.token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    const claims = JSON.parse(atob(payload));
    const session = {
      token: result.token,
      expiresAt: claims.exp * 1000,
      user: { id: result.user.id, username: result.user.username },
    };
    this.session.set(session);
    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    } catch {}
  }

  end(): void {
    this.session.set(null);
    try {
      sessionStorage.removeItem(SESSION_KEY);
    } catch {}
  }
}
