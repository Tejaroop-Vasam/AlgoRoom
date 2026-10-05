import { TemplateRef, Type } from '@angular/core';

export interface ModalConfig<D = unknown> {
  title?: string;
  description?: string;
  icon?: string;
  width?: string;
  maxWidth?: string;
  disableClose?: boolean;
  showCloseButton?: boolean;
  data?: D;
  panelClass?: string | string[];
}

export interface ModalData<D = unknown> {
  template?: TemplateRef<unknown>;
  component?: Type<unknown>;
  config?: ModalConfig<D>;
}
