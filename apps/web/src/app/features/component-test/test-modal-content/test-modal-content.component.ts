import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../../../shared';
import { ModalContainerComponent } from '../../../shared/components/modal/modal-container.component';

@Component({
  selector: 'app-test-modal-content',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './test-modal-content.component.html',
  styleUrl: './test-modal-content.component.css',
})
export class TestModalContentComponent {
  private readonly container = inject(ModalContainerComponent, { optional: true });

  close(): void {
    this.container?.close();
  }
}
