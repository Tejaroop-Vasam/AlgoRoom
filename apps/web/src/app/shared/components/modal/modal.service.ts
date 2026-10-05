import { inject, Injectable, TemplateRef, Type } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalContainerComponent } from './modal-container.component';
import { ModalConfig, ModalData } from './modal.types';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private readonly dialog = inject(MatDialog);

  open<T = unknown, R = unknown>(
    content: Type<T> | TemplateRef<unknown>,
    config?: ModalConfig
  ): MatDialogRef<ModalContainerComponent, R> {
    const isTemplate = content instanceof TemplateRef;

    const modalData: ModalData = {
      template: isTemplate ? content : undefined,
      component: !isTemplate ? content : undefined,
      config
    };

    const panelClasses = ['app-modal-panel'];
    if (config?.panelClass) {
      if (Array.isArray(config.panelClass)) {
        panelClasses.push(...config.panelClass);
      } else {
        panelClasses.push(config.panelClass);
      }
    }

    return this.dialog.open(ModalContainerComponent, {
      width: config?.width || '36rem',
      maxWidth: config?.maxWidth || '90vw',
      disableClose: config?.disableClose ?? false,
      panelClass: panelClasses,
      data: modalData
    });
  }

  closeAll(): void {
    this.dialog.closeAll();
  }
}
