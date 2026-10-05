import { Component, inject, signal } from '@angular/core';
import {
  BadgeComponent,
  ButtonComponent,
  CodeEditorComponent,
  IconComponent,
  InputComponent,
  ModalService
} from '../../shared';
import { TestModalContentComponent } from './test-modal-content/test-modal-content.component';

export type ComponentSection = 'all' | 'inputs' | 'buttons' | 'badges' | 'icons' | 'modals' | 'editor';

@Component({
  imports: [InputComponent, ButtonComponent, BadgeComponent, IconComponent, CodeEditorComponent],
  selector: 'app-component-test',
  styleUrl: './component-test.component.css',
  templateUrl: './component-test.component.html',
})
export class ComponentTest {
  readonly modalService = inject(ModalService);
  readonly testModalContent = TestModalContentComponent;

  readonly activeSection = signal<ComponentSection>('all');
  readonly clearableValue = signal('Clear me');

  readonly pythonCode = signal(`def fibonacci(n: int) -> list[int]:
    sequence = [0, 1]
    while len(sequence) < n:
        sequence.append(sequence[-1] + sequence[-2])
    return sequence[:n]

print(fibonacci(8))`);

  readonly javaCode = `public class BinarySearch {
    public static int search(int[] arr, int target) {
        int left = 0, right = arr.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (arr[mid] == target) return mid;
            if (arr[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return -1;
    }
}`;

  readonly jsCode = signal(`export function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}`);

  readonly minimalCode = `import math

def circle_area(radius):
    return math.pi * (radius ** 2)`;

  setSection(section: ComponentSection): void {
    this.activeSection.set(section);
  }
}
