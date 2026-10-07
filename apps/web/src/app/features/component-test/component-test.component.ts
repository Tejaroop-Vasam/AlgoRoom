import { Component, inject, signal } from '@angular/core';
import {
  BadgeComponent,
  ButtonComponent,
  CodeEditorComponent,
  Competitor,
  IconComponent,
  InputComponent,
  LiveGridComponent,
  ModalService
} from '../../shared';
import { TestModalContentComponent } from './test-modal-content/test-modal-content.component';

export type ComponentSection = 'all' | 'inputs' | 'buttons' | 'badges' | 'icons' | 'modals' | 'editor' | 'live-grid';

@Component({
  imports: [InputComponent, ButtonComponent, BadgeComponent, IconComponent, CodeEditorComponent, LiveGridComponent],
  selector: 'app-component-test',
  styleUrl: './component-test.component.css',
  templateUrl: './component-test.component.html',
})
export class ComponentTest {
  readonly modalService = inject(ModalService);
  readonly testModalContent = TestModalContentComponent;

  readonly activeSection = signal<ComponentSection>('all');
  readonly clearableValue = signal('Clear me');

  readonly testCompetitors: Competitor[] = [
    {
      rank: 1,
      name: 'Rahul Sharma',
      status: '12/12 Tests',
      hasPassedTests: true,
      time: '12m 42s',
      progressPercent: 100,
      runs: 14,
      submissions: 2,
      compileErrors: 1,
      runtimeErrors: 0,
    },
    {
      rank: 2,
      name: 'Teja (You)',
      isCurrentUser: true,
      status: 'Running T10...',
      time: '18m 42s',
      progressPercent: 67,
      runs: 10,
      submissions: 3,
      compileErrors: 2,
      runtimeErrors: 1,
    },
    {
      rank: 3,
      name: 'Ananya Iyer',
      status: 'Editing Line 24',
      time: '18m 42s',
      progressPercent: 33,
      runs: 6,
      submissions: 1,
      compileErrors: 0,
      runtimeErrors: 2,
    },
  ];

  readonly headToHeadCompetitors: Competitor[] = [
    {
      rank: 1,
      name: 'Teja (You)',
      isCurrentUser: true,
      status: '8/8 Tests',
      hasPassedTests: true,
      time: '06m 15s',
      progressPercent: 100,
      runs: 5,
      submissions: 1,
      compileErrors: 0,
      runtimeErrors: 0,
    },
    {
      rank: 2,
      name: 'Marcus Chen',
      status: '6/8 Tests',
      time: '07m 40s',
      progressPercent: 75,
      runs: 8,
      submissions: 2,
      compileErrors: 1,
      runtimeErrors: 1,
    },
  ];

  readonly compactCompetitors: Competitor[] = [
    {
      rank: 1,
      name: 'Priya Patel',
      status: '10/10 Tests',
      hasPassedTests: true,
      time: '14m 20s',
      progressPercent: 100,
    },
    {
      rank: 2,
      name: 'Alex Rivera',
      status: '7/10 Tests',
      time: '16m 05s',
      progressPercent: 70,
    },
    {
      rank: 3,
      name: 'Teja (You)',
      isCurrentUser: true,
      status: '5/10 Tests',
      time: '17m 50s',
      progressPercent: 50,
    },
    {
      rank: 4,
      name: 'David Kim',
      status: '3/10 Tests',
      time: '18m 30s',
      progressPercent: 30,
    },
  ];

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
