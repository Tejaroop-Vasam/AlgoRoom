import { Component, ContentChild, inject, input, output, TemplateRef, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { ModalService } from './modal.service';
import { ModalConfig } from './modal.types';
import { ModalContainerComponent } from './modal-container.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  private readonly modalService = inject(ModalService);
  private dialogRef: MatDialogRef<ModalContainerComponent> | null = null;

  @ContentChild(TemplateRef) projectedTemplate?: TemplateRef<unknown>;

  readonly title = input<string | undefined>(undefined);
  readonly description = input<string | undefined>(undefined);
  readonly icon = input<string | undefined>(undefined);
  readonly width = input<string>('36rem');
  readonly maxWidth = input<string>('90vw');
  readonly disableClose = input<boolean>(false);
  readonly showCloseButton = input<boolean>(true);
  readonly panelClass = input<string | string[] | undefined>(undefined);
  readonly component = input<Type<unknown> | undefined>(undefined);
  readonly contentTemplate = input<TemplateRef<unknown> | undefined>(undefined);

  readonly opened = output<void>();
  readonly closed = output<unknown>();

  open<D = unknown, R = unknown>(
    contentOrData?: TemplateRef<unknown> | Type<unknown> | D,
    data?: D
  ): MatDialogRef<ModalContainerComponent, R> | null {
    let content: TemplateRef<unknown> | Type<unknown> | undefined;
    let resolvedData = data;

    if (contentOrData instanceof TemplateRef || typeof contentOrData === 'function') {
      content = contentOrData as TemplateRef<unknown> | Type<unknown>;
    } else if (contentOrData !== undefined) {
      resolvedData = contentOrData as D;
    }

    const targetContent = content || this.component() || this.contentTemplate() || this.projectedTemplate;
    if (!targetContent) {
      return null;
    }

    const config: ModalConfig<D> = {
      title: this.title(),
      description: this.description(),
      icon: this.icon(),
      width: this.width(),
      maxWidth: this.maxWidth(),
      disableClose: this.disableClose(),
      showCloseButton: this.showCloseButton(),
      panelClass: this.panelClass(),
      data: resolvedData
    };

    const ref = this.modalService.open<unknown, R>(targetContent, config);
    this.dialogRef = ref as unknown as MatDialogRef<ModalContainerComponent>;
    this.opened.emit();

    ref.afterClosed().subscribe(result => {
      this.dialogRef = null;
      this.closed.emit(result);
    });

    return ref;
  }

  close(result?: unknown): void {
    if (this.dialogRef) {
      this.dialogRef.close(result);
      this.dialogRef = null;
    }
  }

  isOpen(): boolean {
    return this.dialogRef !== null;
  }
}
