import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-kbd',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kbd.component.html',
  styleUrl: './kbd.component.css',
  host: {
    class: 'd-inline-flex'
  }
})
export class KbdComponent {
  readonly keys = input<string[]>([]);
}
