import { signal } from '@angular/core';
import type { Socket } from 'socket.io-client';
import * as Y from 'yjs';

export const COLLAB_REMOTE = Symbol('collab-remote');
const PEER_COLORS = 6;
const COMPACT_AFTER = 150;
const SEND_DELAY_MS = 40;

export interface CollabPeer {
  id: string;
  username: string;
  color: number;
  anchor: number | null;
  head: number | null;
}

interface CursorMessage {
  doc: string;
  user: { id: string; username: string };
  anchor?: unknown;
  head?: unknown;
  left?: boolean;
}

export function peerColor(id: string): number {
  let hash = 0;
  for (const char of id) hash = (hash * 31 + char.charCodeAt(0)) | 0;
  return Math.abs(hash) % PEER_COLORS;
}

function toBase64(bytes: Uint8Array): string {
  let binary = '';
  for (let i = 0; i < bytes.length; i += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  }
  return btoa(binary);
}

function fromBase64(value: string): Uint8Array {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

export class CollabDocument {
  readonly doc = new Y.Doc();
  readonly text = this.doc.getText('code');
  readonly authors = this.doc.getMap<string>('authors');
  readonly synced = signal(false);
  readonly peers = signal<CollabPeer[]>([]);

  private readonly peerCursors = new Map<string, { username: string; anchor: unknown; head: unknown }>();
  private pending: Uint8Array[] = [];
  private sendTimer?: ReturnType<typeof setTimeout>;
  private seedRetry?: ReturnType<typeof setTimeout>;
  private lastCursor: { anchor: number; head: number } | null = null;
  selfId: string | null = null;
  private destroyed = false;

  constructor(
    private readonly socket: Socket,
    readonly id: string,
    private readonly seedText: () => string,
  ) {
    this.doc.on('update', this.onLocalUpdate);
    this.text.observe(this.refreshPeers);
    socket.on('collabUpdate', this.onRemoteUpdate);
    socket.on('collabCursor', this.onRemoteCursor);
  }

  async connect(): Promise<void> {
    if (this.destroyed) return;
    clearTimeout(this.seedRetry);
    const result = await this.socket.timeout(5000).emitWithAck('collabJoin', { doc: this.id });
    if (this.destroyed || !Array.isArray(result?.updates)) {
      throw new Error(result?.error ?? 'Could not open the shared editor.');
    }
    this.selfId = result.userId ?? null;
    const hadLocalState = this.doc.store.clients.size > 0;
    Y.transact(this.doc, () => {
      for (const update of result.updates as string[]) Y.applyUpdate(this.doc, fromBase64(update), COLLAB_REMOTE);
    }, COLLAB_REMOTE);

    if (hadLocalState) {
      this.queue(Y.encodeStateAsUpdate(this.doc));
    } else if (result.seed && this.text.length === 0) {
      const seed = this.seedText().replace(/\r\n?/g, '\n');
      if (seed) this.text.insert(0, seed);
    } else if (result.updates.length === 0) {
      this.seedRetry = setTimeout(() => {
        if (this.text.length === 0 && this.doc.store.clients.size === 0) void this.connect().catch(() => {});
      }, 3000);
    }

    if (this.selfId && result.username && this.authors.get(this.selfId) !== result.username) {
      this.authors.set(this.selfId, result.username);
    }

    if (result.updates.length > COMPACT_AFTER) {
      void this.socket.emitWithAck('collabCompact', {
        doc: this.id,
        upto: result.updates.length,
        snapshot: toBase64(Y.encodeStateAsUpdate(this.doc)),
      }).catch(() => {});
    }

    this.synced.set(true);
    if (this.lastCursor) this.sendCursor(this.lastCursor.anchor, this.lastCursor.head);
  }

  authorName(id: string): string {
    if (id === this.selfId) return 'You';
    return this.authors.get(id) ?? this.peerCursors.get(id)?.username ?? 'A former player';
  }

  sendCursor(anchor: number, head: number): void {
    this.lastCursor = { anchor, head };
    if (!this.synced()) return;
    this.socket.volatile.emit('collabCursor', {
      doc: this.id,
      anchor: Y.relativePositionToJSON(Y.createRelativePositionFromTypeIndex(this.text, anchor)),
      head: Y.relativePositionToJSON(Y.createRelativePositionFromTypeIndex(this.text, head)),
    });
  }

  destroy(): void {
    if (this.destroyed) return;
    this.destroyed = true;
    clearTimeout(this.seedRetry);
    this.flush();
    this.socket.off('collabUpdate', this.onRemoteUpdate);
    this.socket.off('collabCursor', this.onRemoteCursor);
    if (this.socket.connected) this.socket.emit('collabLeave');
    this.doc.destroy();
  }

  private readonly onLocalUpdate = (update: Uint8Array, origin: unknown): void => {
    if (origin !== COLLAB_REMOTE) this.queue(update);
  };

  private queue(update: Uint8Array): void {
    this.pending.push(update);
    if (!this.sendTimer) this.sendTimer = setTimeout(() => this.flush(), SEND_DELAY_MS);
  }

  private flush(): void {
    clearTimeout(this.sendTimer);
    this.sendTimer = undefined;
    if (this.pending.length === 0 || !this.socket.connected) return;
    const update = this.pending.length === 1 ? this.pending[0] : Y.mergeUpdates(this.pending);
    this.pending = [];
    this.socket.emit('collabUpdate', { doc: this.id, update: toBase64(update) });
  }

  private readonly onRemoteUpdate = (message: { doc: string; update: string }): void => {
    if (message.doc !== this.id) return;
    Y.applyUpdate(this.doc, fromBase64(message.update), COLLAB_REMOTE);
  };

  private readonly onRemoteCursor = (message: CursorMessage): void => {
    if (message.doc !== this.id || message.user.id === this.selfId) return;
    if (message.left) {
      this.peerCursors.delete(message.user.id);
    } else {
      const isNew = !this.peerCursors.has(message.user.id);
      this.peerCursors.set(message.user.id, {
        username: message.user.username,
        anchor: message.anchor,
        head: message.head,
      });
      if (isNew && this.lastCursor) this.sendCursor(this.lastCursor.anchor, this.lastCursor.head);
    }
    this.refreshPeers();
  };

  private readonly refreshPeers = (): void => {
    const peers: CollabPeer[] = [];
    for (const [id, cursor] of this.peerCursors) {
      peers.push({
        id,
        username: cursor.username,
        color: peerColor(id),
        anchor: this.resolve(cursor.anchor),
        head: this.resolve(cursor.head),
      });
    }
    this.peers.set(peers);
  };

  private resolve(json: unknown): number | null {
    if (!json) return null;
    try {
      const position = Y.createAbsolutePositionFromRelativePosition(Y.createRelativePositionFromJSON(json), this.doc);
      return position ? position.index : null;
    } catch {
      return null;
    }
  }
}
