import { Injectable } from '@angular/core';

const TOKEN_KEY = 'algoroom-guest-token';

function guestToken(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  const token = Array.from(bytes, byte => byte.toString(16).padStart(2, '0')).join('');

  try {
    const saved = sessionStorage.getItem(TOKEN_KEY);
    if (saved && /^[0-9a-f]{64}$/.test(saved)) return saved;
    sessionStorage.setItem(TOKEN_KEY, token);
  } catch {}
  return token;
}

@Injectable({ providedIn: 'root' })
export class GuestSessionService {
  readonly token = guestToken();
}
