import { Component, OnDestroy, OnInit } from '@angular/core';
import type { Socket } from 'socket.io-client';
import * as Y from 'yjs';
import {
  CodeEditorComponent,
  COLLAB_REMOTE,
  CollabDocument,
  Competitor,
  IconComponent,
  LiveGridComponent,
} from '../../../shared';

const DOC_ID = 'preview';
const SELF = { id: 'kartheek', username: 'Kartheek' };
const TEJA = { id: 'teja', username: 'Teja' };
const AKHIL = { id: 'akhil', username: 'Akhil' };

const CODE: [string | null, string][] = [
  [null, 'class Solution:\n'],
  [null, '    def isValid(self, s: str) -> bool:\n'],
  [TEJA.id, "        pairs = {')': '(', ']': '[', '}': '{'}\n"],
  [SELF.id, '        stack = []\n'],
  [AKHIL.id, '        for ch in s:\n'],
  [AKHIL.id, '            if ch in pairs:\n'],
  [TEJA.id, '                if not stack or '],
  [SELF.id, 'stack.pop() != pairs[ch]:\n'],
  [TEJA.id, '                    return False\n'],
  [SELF.id, '            else:\n'],
  [SELF.id, '                stack.append(ch)\n'],
  [AKHIL.id, '        return not stack'],
];

/** A socket stand-in that never connects, so the preview document stays entirely local. */
function offlineSocket(): { socket: Socket; deliver: (event: string, message: unknown) => void } {
  const handlers = new Map<string, (message: unknown) => void>();
  const stub = {
    connected: false,
    on(event: string, handler: (message: unknown) => void) {
      handlers.set(event, handler);
      return stub;
    },
    off(event: string) {
      handlers.delete(event);
      return stub;
    },
    emit: () => stub,
    timeout: () => stub,
    emitWithAck: async () => ({}),
    get volatile() {
      return stub;
    },
  };
  return {
    socket: stub as unknown as Socket,
    deliver: (event, message) => handlers.get(event)?.(message),
  };
}

@Component({
  selector: 'app-mode-preview',
  standalone: true,
  imports: [LiveGridComponent, CodeEditorComponent, IconComponent],
  templateUrl: './mode-preview.component.html',
  host: {
    class: 'd-block w-full',
  },
})
export class ModePreviewComponent implements OnInit, OnDestroy {
  readonly competitors: Competitor[] = [
    {
      id: TEJA.id, rank: 1, name: TEJA.username, status: '12/12 tests · Accepted', hasPassedTests: true,
      time: '36 ms', progressPercent: 100, runs: 3, submissions: 1, compileErrors: 0, runtimeErrors: 0,
    },
    {
      id: SELF.id, rank: 2, name: SELF.username, isCurrentUser: true, status: '9/12 tests · Wrong answer',
      time: '41 ms', progressPercent: 75, runs: 4, submissions: 2, compileErrors: 1, runtimeErrors: 0,
    },
    {
      id: AKHIL.id, rank: 3, name: AKHIL.username, status: '1/3 tests · Runtime error',
      time: '', progressPercent: 33, runs: 2, submissions: 0, compileErrors: 0, runtimeErrors: 1,
    },
  ];

  readonly collab: CollabDocument;
  private readonly deliver: (event: string, message: unknown) => void;

  constructor() {
    const { socket, deliver } = offlineSocket();
    this.deliver = deliver;
    this.collab = new CollabDocument(socket, DOC_ID, () => '');
    this.collab.selfId = SELF.id;
    const { doc, text, authors } = this.collab;
    doc.transact(() => {
      for (const player of [SELF, TEJA, AKHIL]) authors.set(player.id, player.username);
      for (const [author, chunk] of CODE) {
        text.insert(text.length, chunk, author ? { author } : undefined);
      }
    }, COLLAB_REMOTE);
  }

  ngOnInit(): void {
    const source = this.collab.text.toString();
    const appendAt = source.indexOf('stack.append(ch)') + 'stack.append(ch)'.length;
    const selectFrom = source.indexOf('return not stack');
    this.sendPeerCursor(TEJA, appendAt, appendAt);
    this.sendPeerCursor(AKHIL, selectFrom, selectFrom + 'return not stack'.length);
    this.collab.synced.set(true);
  }

  ngOnDestroy(): void {
    this.collab.destroy();
  }

  private sendPeerCursor(user: { id: string; username: string }, anchor: number, head: number): void {
    const position = (index: number) =>
      Y.relativePositionToJSON(Y.createRelativePositionFromTypeIndex(this.collab.text, index));
    this.deliver('collabCursor', { doc: DOC_ID, user, anchor: position(anchor), head: position(head) });
  }
}
