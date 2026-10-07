import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-divider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './divider.component.html',
  styleUrl: './divider.component.css',
  host: {
    class: 'd-block w-full',
  },
})
export class DividerComponent {
  readonly label = input<string>('');
}
