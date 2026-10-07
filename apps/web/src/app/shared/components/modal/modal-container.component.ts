import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IconComponent } from '../icon/icon.component';
import { ModalData } from './modal.types';

@Component({
  selector: 'app-modal-container',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './modal-container.component.html',
  styleUrl: './modal-container.component.css'
})
export class ModalContainerComponent {
  readonly dialogRef = inject(MatDialogRef<ModalContainerComponent>);
  readonly data: ModalData = inject(MAT_DIALOG_DATA);

  get config() {
    return this.data.config;
  }

  get showHeader(): boolean {
    return !!(this.config?.title || this.config?.icon || this.config?.showCloseButton !== false);
  }

  get templateContext() {
    return {
      $implicit: this.config?.data,
      data: this.config?.data,
      close: (result?: unknown) => this.close(result)
    };
  }

  close(result?: unknown): void {
    this.dialogRef.close(result);
  }
}
