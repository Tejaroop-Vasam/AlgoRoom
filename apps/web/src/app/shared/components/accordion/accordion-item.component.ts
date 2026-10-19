import { Component, input, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkAccordionItem } from '@angular/cdk/accordion';
import { IconComponent } from '../icon/icon.component';
import { BadgeComponent, BadgeVariant } from '../badge/badge.component';

@Component({
  selector: 'app-accordion-item',
  standalone: true,
  imports: [CommonModule, CdkAccordionItem, IconComponent, BadgeComponent],
  templateUrl: './accordion-item.component.html',
  styleUrl: './accordion-item.component.css',
  host: {
    class: 'd-block w-full',
  },
})
export class AccordionItemComponent {
  readonly title = input<string>('');
  readonly subtitle = input<string | undefined>(undefined);
  readonly icon = input<string | undefined>(undefined);
  readonly iconColor = input<string | undefined>(undefined);
  readonly badge = input<string | undefined>(undefined);
  readonly badgeVariant = input<BadgeVariant>('surface');
  readonly disabled = input<boolean>(false);
  readonly expanded = model<boolean>(false);
}
