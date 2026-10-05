import { Component, computed, effect, inject, input, model, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditorComponent } from 'ngx-monaco-editor-v2';
import type * as Monaco from 'monaco-editor';
import { IconComponent } from '../icon/icon.component';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-code-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, EditorComponent, IconComponent],
  templateUrl: './code-editor.component.html',
  styleUrl: './code-editor.component.css',
  host: {
    class: 'd-block w-full',
  },
})
export class CodeEditorComponent {
  readonly code = model<string>('');
  readonly fileName = input<string>('untitled');
  readonly language = model<string>('python');
  readonly availableLanguages = input<string[]>(['python', 'java', 'javascript']);
  readonly theme = input<'dark' | 'light' | 'stitch-dark' | 'stitch-light' | undefined>(undefined);
  readonly readonly = input<boolean>(false);
  readonly readOnly = input<boolean>(false);

  private readonly themeService = inject(ThemeService, { optional: true });

  readonly isReadOnly = computed(() => this.readonly() || this.readOnly());
  readonly resolvedTheme = computed(() => {
    const custom = this.theme();
    if (custom) {
      if (custom === 'light' || custom === 'stitch-light') return 'stitch-light';
      if (custom === 'dark' || custom === 'stitch-dark') return 'stitch-dark';
      return custom;
    }
    return this.themeService?.isDark() === false ? 'stitch-light' : 'stitch-dark';
  });

  readonly showLineNumbers = input<boolean>(true);
  readonly showDots = input<boolean>(true);
  readonly showStatusBar = input<boolean>(true);
  readonly showMinimap = input<boolean>(false);
  readonly copyable = input<boolean>(true);
  readonly formattable = input<boolean>(true);
  readonly minHeight = input<string>('16rem');
  readonly maxHeight = input<string>('36rem');
  readonly tabSize = input<number>(4);

  readonly saved = output<string>();

  private editor?: Monaco.editor.IStandaloneCodeEditor;

  readonly isLoading = signal<boolean>(true);
  readonly currentLine = signal<number>(1);
  readonly currentCol = signal<number>(1);
  readonly totalLines = signal<number>(1);
  readonly charCount = signal<number>(0);
  readonly isCopied = signal<boolean>(false);
  readonly isFormatted = signal<boolean>(false);
  readonly statusMessage = signal<string>('READY');

  constructor() {
    effect(() => {
      const lang = this.language();
      if (this.editor) {
        const model = this.editor.getModel();
        const monaco = (window as any).monaco;
        if (model && monaco) {
          monaco.editor.setModelLanguage(model, lang);
        }
      }
    });

    effect(() => {
      const activeTheme = this.resolvedTheme();
      const monaco = (window as any).monaco;
      if (this.editor && monaco) {
        monaco.editor.setTheme(activeTheme);
      }
    });
  }

  onLanguageChange(newLang: string): void {
    this.language.set(newLang);
  }

  readonly editorOptions = computed<Monaco.editor.IStandaloneEditorConstructionOptions>(() => ({
    theme: this.resolvedTheme(),
    language: this.language(),
    fontSize: 12,
    lineHeight: 22,
    fontFamily: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    fontLigatures: true,
    minimap: { enabled: this.showMinimap() },
    lineNumbers: this.showLineNumbers() ? 'on' : 'off',
    glyphMargin: false,
    folding: true,
    lineDecorationsWidth: 0,
    lineNumbersMinChars: 3,
    readOnly: this.isReadOnly(),
    domReadOnly: this.isReadOnly(),
    tabSize: this.tabSize(),
    automaticLayout: true,
    formatOnPaste: true,
    formatOnType: true,
    scrollBeyondLastLine: false,
    renderLineHighlight: 'all',
    cursorBlinking: 'smooth',
    cursorSmoothCaretAnimation: 'on',
    smoothScrolling: true,
    padding: { top: 12, bottom: 12 },
    scrollbar: {
      verticalScrollbarSize: 8,
      horizontalScrollbarSize: 8,
      alwaysConsumeMouseWheel: false,
    },
  }));

  onEditorInit(editor: Monaco.editor.IStandaloneCodeEditor): void {
    this.editor = editor;
    this.isLoading.set(false);
    this.updateCounts();

    setTimeout(() => {
      editor.layout();
    }, 100);

    if (this.isReadOnly()) {
      this.statusMessage.set('READ ONLY');
    }

    editor.onDidChangeCursorPosition(e => {
      this.currentLine.set(e.position.lineNumber);
      this.currentCol.set(e.position.column);
    });

    editor.onDidChangeModelContent(() => {
      this.updateCounts();
    });

    const monaco = (window as any).monaco;
    if (monaco) {
      editor.addCommand(
        monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS,
        () => {
          this.saved.emit(this.code());
          this.statusMessage.set('SAVED');
          setTimeout(() => this.statusMessage.set(this.isReadOnly() ? 'READ ONLY' : 'READY'), 2000);
        }
      );
    }
  }

  formatCode(): void {
    if (this.isReadOnly() || !this.editor) return;

    const action = this.editor.getAction('editor.action.formatDocument');
    if (action) {
      action.run().then(() => {
        this.notifyFormatted();
      }).catch(() => {
        this.fallbackFormat();
      });
    } else {
      this.fallbackFormat();
    }
  }

  private fallbackFormat(): void {
    if (!this.editor) return;
    const model = this.editor.getModel();
    if (!model) return;

    const lines = model.getLinesContent();
    const cleaned: string[] = [];
    let blankCount = 0;
    for (const line of lines) {
      const trimmedEnd = line.replace(/\s+$/, '');
      if (!trimmedEnd) {
        blankCount++;
        if (blankCount <= 2) cleaned.push('');
      } else {
        blankCount = 0;
        cleaned.push(trimmedEnd);
      }
    }

    this.editor.executeEdits('format', [{
      range: model.getFullModelRange(),
      text: cleaned.join('\n') + (cleaned.length ? '\n' : ''),
      forceMoveMarkers: true,
    }]);
    this.notifyFormatted();
  }

  private notifyFormatted(): void {
    this.isFormatted.set(true);
    this.statusMessage.set('FORMATTED');
    this.updateCounts();
    setTimeout(() => {
      this.isFormatted.set(false);
      this.statusMessage.set(this.isReadOnly() ? 'READ ONLY' : 'READY');
    }, 1500);
  }

  copyCode(): void {
    const val = this.editor ? this.editor.getValue() : this.code();
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(val).then(() => {
        this.isCopied.set(true);
        setTimeout(() => this.isCopied.set(false), 2000);
      });
    }
  }

  private updateCounts(): void {
    if (this.editor) {
      const model = this.editor.getModel();
      if (model) {
        this.totalLines.set(model.getLineCount());
        this.charCount.set(model.getValueLength());
        return;
      }
    }
    const val = this.code() || '';
    this.totalLines.set(val.split('\n').length);
    this.charCount.set(val.length);
  }
}
