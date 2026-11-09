import { Injectable, OnDestroy, signal } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { Room } from './api';

export interface CrdtPayload {
  user: { id: string; username: string };
  changes: any;
}

export interface TelemetryPayload {
  user: { id: string; username: string };
  telemetry: any;
}

export interface RoomSession {
  roomCode: string;
  username: string;
  userId?: string;
}

const SESSION_STORAGE_KEY = 'algoroom-room-session';

@Injectable({
  providedIn: 'root',
})
export class RoomSocketService implements OnDestroy {
  private socket: Socket | null = null;
  private currentRoomCode: string | null = null;

  readonly connected = signal<boolean>(false);
  readonly socketId = signal<string | null>(null);
  readonly currentRoom = signal<Room | null>(null);
  readonly session = signal<RoomSession | null>(null);

  readonly crdt$ = new Subject<CrdtPayload>();
  readonly telemetry$ = new Subject<TelemetryPayload>();

  connect(roomCode: string, username: string, userId?: string): Socket {
    const cleanCode = roomCode.trim().toUpperCase();
    this.saveSession({ roomCode: cleanCode, username, userId });

    if (this.socket && this.currentRoomCode === cleanCode) {
      this.socket.emit('joinRoom', { roomCode: cleanCode, username, userId });
      return this.socket;
    }

    if (this.socket) {
      this.disconnect();
    }

    this.currentRoomCode = cleanCode;

    const baseApi = environment.apiUrl;
    const socketUrl = `${baseApi}/rooms`;

    this.socket = io(socketUrl, {
      auth: {
        roomCode: cleanCode,
        username,
        userId,
      },
      transports: [ 'polling','websocket'],
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
    });

    this.socket.on('connect', () => {
      this.connected.set(true);
      this.socketId.set(this.socket?.id ?? null);
    });

    this.socket.on('disconnect', () => {
      this.connected.set(false);
    });

    this.socket.on('roomJoined', (room: Room) => {
      this.currentRoom.set(room);
    });

    this.socket.on('roomStateUpdated', (room: Room) => {
      this.currentRoom.set(room);
    });

    this.socket.on('crdtSync', (payload: CrdtPayload) => {
      this.crdt$.next(payload);
    });

    this.socket.on('telemetryStream', (payload: TelemetryPayload) => {
      this.telemetry$.next(payload);
    });

    this.socket.on('connect_error', (error) => {
      this.connected.set(false);
    });

    return this.socket;
  }

  sendCrdtUpdate(changes: any): void {
    if (!this.socket || !this.currentRoomCode) return;
    this.socket.emit('crdtUpdate', {
      roomCode: this.currentRoomCode,
      changes,
    });
  }

  sendTelemetry(telemetry: any): void {
    if (!this.socket || !this.currentRoomCode) return;
    this.socket.emit('telemetryUpdate', {
      roomCode: this.currentRoomCode,
      telemetry,
    });
  }

  restoreSession(roomCode: string): RoomSession | null {
    const cleanCode = roomCode.trim().toUpperCase();
    const active = this.session();
    if (active?.roomCode === cleanCode) {
      return active;
    }
    try {
      const saved = JSON.parse(sessionStorage.getItem(SESSION_STORAGE_KEY) ?? 'null') as RoomSession | null;
      return saved?.roomCode === cleanCode ? saved : null;
    } catch {
      return null;
    }
  }

  leave(): void {
    this.disconnect();
    this.currentRoom.set(null);
    this.session.set(null);
    try {
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
    } catch {}
  }

  private saveSession(session: RoomSession): void {
    this.session.set(session);
    try {
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
    } catch {}
  }

  disconnect(): void {
    if (this.socket) {
      if (this.currentRoomCode) {
        this.socket.emit('leaveRoom', { roomCode: this.currentRoomCode });
      }
      this.socket.disconnect();
      this.socket = null;
    }
    this.currentRoomCode = null;
    this.connected.set(false);
    this.socketId.set(null);
  }

  ngOnDestroy(): void {
    this.disconnect();
    this.crdt$.complete();
    this.telemetry$.complete();
  }
}

