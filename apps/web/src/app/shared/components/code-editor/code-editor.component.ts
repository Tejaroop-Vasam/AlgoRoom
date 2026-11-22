import { Component, computed, effect, inject, input, model, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditorComponent } from 'ngx-monaco-editor-v2';
import type * as Monaco from 'monaco-editor';
import { IconComponent } from '../icon/icon.component';
import { SelectComponent, SelectOption } from '../select/select.component';
import { ThemeService } from '../../../services/theme.service';
import { FormatLanguage, RunnerApiService } from '../../../services/api/runner-api.service';

@Component({
  selector: 'app-code-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, EditorComponent, IconComponent, SelectComponent],
  templateUrl: './code-editor.component.html',
  styleUrl: './code-editor.component.css',
  host: {
    class: 'd-block w-full',
  },
})
export class CodeEditorComponent {
  private readonly runnerApi = inject(RunnerApiService, { optional: true });
  private readonly themeService = inject(ThemeService, { optional: true });

  readonly code = model<string>('');
  readonly fileName = input<string>('untitled');
  readonly language = model.required<string>();
  readonly availableLanguages = input<string[]>(['python', 'java', 'javascript']);

  readonly languageOptions = computed<SelectOption<string>[]>(() =>
    this.availableLanguages().map(lang => ({
      label:lang,
      value: lang,
    }))
  );

  readonly theme = input<'dark' | 'light' | 'stitch-dark' | 'stitch-light' | undefined>(undefined);
  readonly readonly = input<boolean>(false);

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
  readonly minHeight = input<string>('16rem');
  readonly maxHeight = input<string>('36rem');
  readonly tabSize = input<number>(4);
  readonly showReset = input<boolean>(false);
  readonly showFullscreen = input<boolean>(false);

  readonly saved = output<string>();
  readonly reset = output<void>();
  readonly fullscreenToggle = output<void>();
  readonly bannerAction = output<void>();
  readonly run = output<void>();
  readonly submit = output<void>();

  private editor?: Monaco.editor.IStandaloneCodeEditor;

  readonly isLoading = signal<boolean>(true);
  readonly currentLine = signal<number>(1);
  readonly currentCol = signal<number>(1);
  readonly totalLines = signal<number>(1);
  readonly charCount = signal<number>(0);
  readonly isCopied = signal<boolean>(false);
  readonly isFormatted = signal<boolean>(false);
  readonly statusMessage = signal<string>('READY');

  onReset(): void {
    this.reset.emit();
  }

  onFullscreenToggle(): void {
    this.fullscreenToggle.emit();
  }

  onBannerAction(): void {
    this.bannerAction.emit();
  }

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

  onLanguageChange(newLang: string | null): void {
    if (newLang) {
      this.language.set(newLang);
    }
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
    readOnly: this.readonly(),
    domReadOnly: this.readonly(),
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

    if (this.readonly()) {
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
          setTimeout(() => this.statusMessage.set(this.readonly() ? 'READ ONLY' : 'READY'), 2000);
        }
      );

      editor.addCommand(
        monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
        () => {
          this.run.emit();
        }
      );

      editor.addCommand(
        monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.Enter,
        () => {
          this.submit.emit();
        }
      );

      editor.addCommand(
        monaco.KeyMod.Shift | monaco.KeyMod.Alt | monaco.KeyCode.KeyF,
        () => {
          this.formatCode();
        }
      );
    }
  }

  async formatCode(): Promise<void> {
    if (this.readonly() || !this.editor) return;

    const currentCode = this.editor.getValue();
    const currentLang = this.language();

    if (this.runnerApi && currentCode.trim()) {
      try {
        const res = await this.runnerApi.format({
          language: currentLang as FormatLanguage,
          code: currentCode,
        });

        if (res.formatted && res.code !== undefined) {
          if (res.code !== currentCode) {
            const model = this.editor.getModel();
            if (model) {
              this.editor.executeEdits('format', [
                {
                  range: model.getFullModelRange(),
                  text: res.code,
                  forceMoveMarkers: true,
                },
              ]);
              this.code.set(res.code);
            }
          }
          this.notifyFormatted();
          return;
        }
      } catch {}
    }

    const action = this.editor.getAction('editor.action.formatDocument');
    if (action) {
      action.run().then(() => {
        this.notifyFormatted();
      }).catch(() => {
      });
    } else {
    }
  }


  private notifyFormatted(): void {
    this.isFormatted.set(true);
    this.statusMessage.set('FORMATTED');
    this.updateCounts();
    setTimeout(() => {
      this.isFormatted.set(false);
      this.statusMessage.set(this.readonly() ? 'READ ONLY' : 'READY');
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
