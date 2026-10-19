import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkAccordion } from '@angular/cdk/accordion';

@Component({
  selector: 'app-accordion',
  standalone: true,
  imports: [CommonModule, CdkAccordion],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.css',
  host: {
    class: 'd-flex flex-col w-full gap-2',
  },
})
export class AccordionComponent {
  readonly multi = input<boolean>(false);
}
