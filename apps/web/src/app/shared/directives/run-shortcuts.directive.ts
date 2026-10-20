import { Directive, HostListener, booleanAttribute, input, output } from '@angular/core';
import { isPrimaryModifierPressed } from '../utils/platform';

@Directive({
  selector: '[appRunShortcuts]',
  standalone: true,
})
export class RunShortcutsDirective {
  readonly enabled = input(true, {
    alias: 'appRunShortcuts',
    transform: booleanAttribute,
  });
  readonly listenGlobal = input(true, { transform: booleanAttribute });
  readonly allowInInputs = input(false, { transform: booleanAttribute });

  readonly run = output<void>();
  readonly submit = output<void>();

  @HostListener('document:keydown', ['$event'])
  onDocumentKeyDown(event: KeyboardEvent): void {
    if (!this.enabled() || !this.listenGlobal()) return;
    this.handleKeyEvent(event);
  }

  @HostListener('keydown', ['$event'])
  onHostKeyDown(event: KeyboardEvent): void {
    if (!this.enabled() || this.listenGlobal()) return;
    this.handleKeyEvent(event);
  }

  private handleKeyEvent(event: KeyboardEvent): void {
    if (event.key !== 'Enter') return;

    if (!isPrimaryModifierPressed(event)) return;

    const target = event.target as HTMLElement | null;
    const tagName = target?.tagName?.toLowerCase();
    const isTextInput = tagName === 'input' && !target?.classList.contains('monaco-editor');

    if (isTextInput && !this.allowInInputs()) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    if (event.shiftKey) {
      this.submit.emit();
    } else {
      this.run.emit();
    }
  }
}
