import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-clash-emblem',
  templateUrl: './clash-emblem.component.html',
  styleUrl: './clash-emblem.component.css',
})
export class ClashEmblemComponent {
  // Bumping the key re-creates the SVG, which restarts the clash animation.
  readonly clashKey = signal(0);

  replay(): void {
    this.clashKey.update((key) => key + 1);
  }
}
