import {
  Component,
  ElementRef,
  HostListener,
  computed,
  inject,
  input,
  model,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type SplitDirection = 'horizontal' | 'vertical';

@Component({
  selector: 'app-split-pane',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './split-pane.component.html',
  styleUrl: './split-pane.component.css',
  host: {
    class: 'd-flex w-full h-full overflow-hidden relative select-none',
    '[class.flex-row]': 'direction() === "horizontal"',
    '[class.flex-col]': 'direction() === "vertical"',
  },
})
export class SplitPaneComponent {
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  readonly direction = input<SplitDirection>('horizontal');
  readonly split = model<number>(50);
  readonly minSize = input<number>(15);
  readonly maxSize = input<number>(85);
  readonly gutterSize = input<string>('0.375rem');

  readonly isDragging = signal<boolean>(false);

  readonly pane1Style = computed(() => {
    const size = this.split();
    if (this.direction() === 'horizontal') {
      return { width: `${size}%`, height: '100%' };
    }
    return { height: `${size}%`, width: '100%' };
  });

  readonly pane2Style = computed(() => {
    const size = 100 - this.split();
    if (this.direction() === 'horizontal') {
      return { width: `${size}%`, height: '100%' };
    }
    return { height: `${size}%`, width: '100%' };
  });

  readonly gutterStyle = computed(() => {
    const size = this.gutterSize();
    if (this.direction() === 'horizontal') {
      return { width: size, cursor: 'col-resize' };
    }
    return { height: size, cursor: 'row-resize' };
  });

  onGutterMouseDown(event: MouseEvent): void {
    event.preventDefault();
    this.isDragging.set(true);
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (!this.isDragging()) return;

    const hostRect = this.elementRef.nativeElement.getBoundingClientRect();
    let percentage: number;

    if (this.direction() === 'horizontal') {
      const offsetX = event.clientX - hostRect.left;
      percentage = (offsetX / hostRect.width) * 100;
    } else {
      const offsetY = event.clientY - hostRect.top;
      percentage = (offsetY / hostRect.height) * 100;
    }

    const clamped = Math.min(Math.max(percentage, this.minSize()), this.maxSize());
    this.split.set(Math.round(clamped * 10) / 10);
  }

  @HostListener('document:mouseup')
  onMouseUp(): void {
    if (this.isDragging()) {
      this.isDragging.set(false);
    }
  }
}
