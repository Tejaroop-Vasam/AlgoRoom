import type * as Monaco from 'monaco-editor';
import * as Y from 'yjs';
import { CollabDocument, CollabPeer, peerColor } from './collab-document';

const CURSOR_INTERVAL_MS = 60;
const AUTHORS_DELAY_MS = 80;

interface PeerCaret {
  widget: Monaco.editor.IContentWidget;
  node: HTMLElement;
  label: HTMLElement;
  position: Monaco.IPosition;
}

export class MonacoCollabBinding {
  private applyingRemote = false;
  private readonly undoManager: Y.UndoManager;
  private readonly selections: Monaco.editor.IEditorDecorationsCollection;
  private readonly authorLines: Monaco.editor.IEditorDecorationsCollection;
  private readonly carets = new Map<string, PeerCaret>();
  private readonly disposables: Monaco.IDisposable[] = [];
  private cursorTimer?: ReturnType<typeof setTimeout>;
  private authorsTimer?: ReturnType<typeof setTimeout>;
  private readonly blameNode = document.createElement('div');
  private blamePosition: Monaco.IPosition | null = null;
  private readonly blameWidget: Monaco.editor.IContentWidget = {
    getId: () => 'collab-line-blame',
    getDomNode: () => this.blameNode,
    getPosition: () => this.blamePosition && {
      position: this.blamePosition,
      preference: [this.monaco.editor.ContentWidgetPositionPreference.EXACT],
    },
  };

  constructor(
    private readonly editor: Monaco.editor.IStandaloneCodeEditor,
    private readonly collab: CollabDocument,
    private readonly monaco: typeof Monaco,
  ) {
    this.undoManager = new Y.UndoManager(collab.text, { trackedOrigins: new Set([this]) });
    this.selections = editor.createDecorationsCollection();
    this.authorLines = editor.createDecorationsCollection();
    editor.updateOptions({ lineDecorationsWidth: 8 });
    this.blameNode.className = 'collab-line-blame';
    editor.addContentWidget(this.blameWidget);

    const model = this.model();
    model?.setEOL(monaco.editor.EndOfLineSequence.LF);
    if (model && model.getValue() !== collab.text.toString()) {
      this.applyingRemote = true;
      try {
        model.pushEditOperations([], [{ range: model.getFullModelRange(), text: collab.text.toString() }], () => null);
      } finally {
        this.applyingRemote = false;
      }
    }

    collab.text.observe(this.onTextChange);
    collab.text.observe(this.scheduleAuthors);
    collab.authors.observe(this.scheduleAuthors);
    this.disposables.push(
      editor.onDidChangeModelContent(event => this.onModelChange(event)),
      editor.onDidChangeCursorSelection(() => {
        this.scheduleCursor();
        this.scheduleAuthors();
      }),
    );
    this.scheduleCursor();
    this.renderAuthors();
  }

  undo(): void {
    this.undoManager.undo();
  }

  redo(): void {
    this.undoManager.redo();
  }

  renderPeers(peers: CollabPeer[]): void {
    const model = this.model();
    if (!model) return;
    const decorations: Monaco.editor.IModelDeltaDecoration[] = [];
    const visible = new Set<string>();
    for (const peer of peers) {
      if (peer.head === null) continue;
      visible.add(peer.id);
      const head = model.getPositionAt(peer.head);
      if (peer.anchor !== null && peer.anchor !== peer.head) {
        const anchor = model.getPositionAt(peer.anchor);
        decorations.push({
          range: this.monaco.Range.fromPositions(
            peer.anchor < peer.head ? anchor : head,
            peer.anchor < peer.head ? head : anchor,
          ),
          options: { className: `collab-selection collab-peer-${peer.color}` },
        });
      }
      this.placeCaret(peer, head);
    }
    for (const [id, caret] of this.carets) {
      if (visible.has(id)) continue;
      this.editor.removeContentWidget(caret.widget);
      this.carets.delete(id);
    }
    this.selections.set(decorations);
  }

  dispose(): void {
    clearTimeout(this.cursorTimer);
    clearTimeout(this.authorsTimer);
    this.collab.text.unobserve(this.onTextChange);
    this.collab.text.unobserve(this.scheduleAuthors);
    this.collab.authors.unobserve(this.scheduleAuthors);
    this.disposables.forEach(disposable => disposable.dispose());
    this.undoManager.destroy();
    try {
      this.carets.forEach(caret => this.editor.removeContentWidget(caret.widget));
      this.editor.removeContentWidget(this.blameWidget);
      this.selections.clear();
      this.authorLines.clear();
      this.editor.updateOptions({ lineDecorationsWidth: 0 });
    } catch {}
    this.carets.clear();
  }

  private model(): Monaco.editor.ITextModel | null {
    return this.editor.getModel();
  }

  private placeCaret(peer: CollabPeer, position: Monaco.IPosition): void {
    let caret = this.carets.get(peer.id);
    if (!caret) {
      const node = document.createElement('div');
      const label = document.createElement('div');
      label.className = 'collab-caret-label';
      node.appendChild(label);
      const created: PeerCaret = {
        node,
        label,
        position,
        widget: {
          allowEditorOverflow: true,
          getId: () => `collab-caret-${peer.id}`,
          getDomNode: () => node,
          getPosition: () => ({
            position: created.position,
            preference: [this.monaco.editor.ContentWidgetPositionPreference.EXACT],
          }),
        },
      };
      caret = created;
      this.carets.set(peer.id, caret);
      this.editor.addContentWidget(caret.widget);
    }
    caret.node.className = `collab-caret collab-peer-${peer.color}`;
    caret.node.classList.toggle('collab-caret-first-line', position.lineNumber === 1);
    caret.node.style.height = `${this.editor.getOption(this.monaco.editor.EditorOption.lineHeight)}px`;
    caret.label.textContent = peer.username;
    caret.position = position;
    this.editor.layoutContentWidget(caret.widget);
  }

  private readonly scheduleAuthors = (): void => {
    if (this.authorsTimer) return;
    this.authorsTimer = setTimeout(() => {
      this.authorsTimer = undefined;
      this.renderAuthors();
    }, AUTHORS_DELAY_MS);
  };

  private lineAuthors(): Map<string, number>[] {
    const lines: Map<string, number>[] = [new Map()];
    for (const op of this.collab.text.toDelta() as { insert: unknown; attributes?: { author?: string } }[]) {
      if (typeof op.insert !== 'string') continue;
      const author = op.attributes?.author;
      for (const char of op.insert) {
        if (char === '\n') {
          lines.push(new Map());
        } else if (author && char.trim()) {
          const line = lines[lines.length - 1];
          line.set(author, (line.get(author) ?? 0) + 1);
        }
      }
    }
    return lines;
  }

  private renderAuthors(): void {
    const model = this.model();
    if (!model) return;
    const cursorLine = this.editor.getPosition()?.lineNumber ?? 0;
    const lineCount = model.getLineCount();
    const decorations: Monaco.editor.IModelDeltaDecoration[] = [];
    let blame: string | null = null;
    this.lineAuthors().forEach((counts, index) => {
      const lineNumber = index + 1;
      if (counts.size === 0 || lineNumber > lineCount) return;
      const ranked = [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([id]) => id);
      const names = ranked.map(id => this.collab.authorName(id));
      const summary = names.length === 1
        ? names[0]
        : `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`;
      const tooltip = `Written by ${summary}`;
      decorations.push({
        range: new this.monaco.Range(lineNumber, 1, lineNumber, 1),
        options: {
          isWholeLine: true,
          linesDecorationsClassName: `collab-line-author collab-peer-${peerColor(ranked[0])}`,
          linesDecorationsTooltip: tooltip,
          lineNumberHoverMessage: { value: tooltip },
        },
      });
      if (lineNumber === cursorLine) blame = summary;
    });
    this.authorLines.set(decorations);
    this.blamePosition = blame
      ? { lineNumber: cursorLine, column: model.getLineMaxColumn(cursorLine) }
      : null;
    this.blameNode.textContent = blame ?? '';
    this.blameNode.style.lineHeight = `${this.editor.getOption(this.monaco.editor.EditorOption.lineHeight)}px`;
    this.editor.layoutContentWidget(this.blameWidget);
  }

  private readonly onTextChange = (event: Y.YTextEvent, transaction: Y.Transaction): void => {
    if (transaction.origin === this) return;
    const model = this.model();
    if (!model) return;
    let marks = (this.editor.getSelections() ?? []).map(selection => [
      model.getOffsetAt({ lineNumber: selection.selectionStartLineNumber, column: selection.selectionStartColumn }),
      model.getOffsetAt(selection.getPosition()),
    ]);
    this.applyingRemote = true;
    try {
      let index = 0;
      for (const op of event.delta) {
        if (op.retain !== undefined) {
          index += op.retain;
        } else if (op.insert !== undefined) {
          const text = typeof op.insert === 'string' ? op.insert : '';
          const at = index;
          const position = model.getPositionAt(at);
          model.applyEdits([{ range: this.monaco.Range.fromPositions(position, position), text }]);
          marks = marks.map(mark => mark.map(offset => (offset > at ? offset + text.length : offset)));
          index += text.length;
        } else if (op.delete !== undefined) {
          const at = index;
          const length = op.delete;
          const start = model.getPositionAt(at);
          const end = model.getPositionAt(at + length);
          model.applyEdits([{ range: this.monaco.Range.fromPositions(start, end), text: '' }]);
          marks = marks.map(mark => mark.map(offset => (offset > at ? offset - Math.min(length, offset - at) : offset)));
        }
      }
      if (marks.length > 0) {
        this.editor.setSelections(marks.map(([anchor, head]) => {
          const from = model.getPositionAt(anchor);
          const to = model.getPositionAt(head);
          return new this.monaco.Selection(from.lineNumber, from.column, to.lineNumber, to.column);
        }), 'collab');
      }
    } finally {
      this.applyingRemote = false;
    }
  };

  private onModelChange(event: Monaco.editor.IModelContentChangedEvent): void {
    if (this.applyingRemote) return;
    const model = this.model();
    if (!model) return;
    const text = this.collab.text;
    const author = this.collab.selfId ? { author: this.collab.selfId } : undefined;
    this.collab.doc.transact(() => {
      if (event.isFlush) {
        const value = model.getValue();
        if (value === text.toString()) return;
        text.delete(0, text.length);
        text.insert(0, value);
        return;
      }
      const changes = [...event.changes].sort((a, b) => b.rangeOffset - a.rangeOffset);
      for (const change of changes) {
        if (change.rangeLength > 0) text.delete(change.rangeOffset, change.rangeLength);
        if (change.text) text.insert(change.rangeOffset, change.text, author);
      }
    }, this);
  }

  private scheduleCursor(): void {
    if (this.applyingRemote || this.cursorTimer) return;
    this.cursorTimer = setTimeout(() => {
      this.cursorTimer = undefined;
      const model = this.model();
      const selection = this.editor.getSelection();
      if (!model || !selection) return;
      const anchor = model.getOffsetAt({
        lineNumber: selection.selectionStartLineNumber,
        column: selection.selectionStartColumn,
      });
      this.collab.sendCursor(anchor, model.getOffsetAt(selection.getPosition()));
    }, CURSOR_INTERVAL_MS);
  }
}
