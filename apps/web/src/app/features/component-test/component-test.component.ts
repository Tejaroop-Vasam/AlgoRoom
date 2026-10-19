import { Component, computed, inject, signal } from '@angular/core';
import {
  AvatarComponent,
  BadgeComponent,
  ButtonComponent,
  CheckboxComponent,
  ChipComponent,
  CodeEditorComponent,
  Competitor,
  IconComponent,
  InputComponent,
  KbdComponent,
  LiveGridComponent,
  ModalService,
  OptionCardComponent,
  SegmentOption,
  SegmentedControlComponent,
  SelectComponent,
  SelectOption,
  ToggleSwitchComponent,
  ToastService,
  SplitPaneComponent,
  TestcaseConsoleComponent,
  TestResultData,
  TestCaseItem,
  AccordionComponent,
  AccordionItemComponent,
  DividerComponent,
  RunShortcutsDirective,
  getPlatformModifierKey,
  LoaderComponent,
  LoadingService,
} from '../../shared';
import { ProblemPanelComponent, ProblemData } from '../problem-panel/problem-panel.component';
import { TestModalContentComponent } from './test-modal-content/test-modal-content.component';

export type ComponentSection =
  | 'all'
  | 'inputs'
  | 'buttons'
  | 'badges'
  | 'icons'
  | 'modals'
  | 'toasts'
  | 'chips'
  | 'controls'
  | 'cards'
  | 'accordions'
  | 'dividers'
  | 'editor'
  | 'split-pane'
  | 'console'
  | 'live-grid'
  | 'loader'
  | 'workspace';

@Component({
  imports: [
    InputComponent,
    ButtonComponent,
    BadgeComponent,
    IconComponent,
    CodeEditorComponent,
    LiveGridComponent,
    ChipComponent,
    SegmentedControlComponent,
    SelectComponent,
    OptionCardComponent,
    CheckboxComponent,
    AvatarComponent,
    KbdComponent,
    ToggleSwitchComponent,
    SplitPaneComponent,
    ProblemPanelComponent,
    TestcaseConsoleComponent,
    AccordionComponent,
    AccordionItemComponent,
    DividerComponent,
    RunShortcutsDirective,
    LoaderComponent,
  ],
  selector: 'app-component-test',
  styleUrl: './component-test.component.css',
  templateUrl: './component-test.component.html',
})
export class ComponentTest {
  readonly modalService = inject(ModalService);
  readonly toastService = inject(ToastService);
  readonly loadingService = inject(LoadingService);
  readonly testModalContent = TestModalContentComponent;

  readonly modKey = signal<string>(getPlatformModifierKey());
  readonly activeSection = signal<ComponentSection>('all');
  readonly clearableValue = signal('Clear me');

  triggerGlobalLoader(): void {
    this.loadingService.show();
    setTimeout(() => {
      this.loadingService.hide();
      this.toastService.info('Global loader simulation completed.');
    }, 2500);
  }

  triggerSuccessToast(): void {
    this.toastService.success('Room instance deployed successfully! Lobby code: #X92A1', {
      title: 'Room Created',
    });
  }

  triggerErrorToast(): void {
    this.toastService.error('Connection to runner sandbox timed out after 10000ms.', {
      title: 'Execution Failed',
    });
  }

  triggerWarningToast(): void {
    this.toastService.warning('Your session will automatically expire in 2 minutes of inactivity.', {
      title: 'Session Warning',
    });
  }

  triggerInfoToast(): void {
    this.toastService.info('Rahul Sharma submitted 12/12 test cases.', {
      title: 'Leaderboard Telemetry',
    });
  }

  triggerActionToast(): void {
    this.toastService.info('Problem was removed from the staged set.', {
      title: 'Set Modified',
      action: {
        label: 'Undo',
        action: () => {
          this.toastService.success('Problem restored to challenge set.');
        },
      },
    });
  }

  readonly tagOptions = ['Graph', 'Dynamic Programming', 'Trees', 'Arrays & Hashing', 'Two Pointers', 'Binary Search'];
  readonly selectedTags = signal<string[]>(['Graph', 'Dynamic Programming']);
  readonly stagedProblems = signal<string[]>(["Dijkstra's Shortest Path", 'Course Schedule II', 'Network Delay Time']);

  readonly difficultyOptions: SegmentOption[] = [
    { label: 'Easy', value: 'easy' },
    { label: 'Med', value: 'medium' },
    { label: 'Hard', value: 'hard' },
  ];
  readonly difficulty = signal<string | undefined>('medium');

  readonly viewOptions: SegmentOption[] = [
    { label: 'List', value: 'list', icon: 'view_list' },
    { label: 'Grid', value: 'grid', icon: 'grid_view' },
    { label: 'Board', value: 'board', icon: 'view_kanban', disabled: true },
  ];
  readonly view = signal<string | undefined>('list');

  readonly curatedListOptions: SelectOption[] = [
    { label: 'Blind 75', value: 'blind75' },
    { label: 'NeetCode 150', value: 'neetcode150' },
    { label: 'Grind 169', value: 'grind169' },
    { label: 'Top Interview 150', value: 'top150', disabled: true },
  ];
  readonly curatedList = signal<string | null>('blind75');
  readonly bufferSecurity = signal<string | null>(null);
  readonly bufferSecurityOptions: SelectOption[] = [
    { label: 'Obscured until round end', value: 'obscured', icon: 'visibility_off' },
    { label: 'Visible to host', value: 'host', icon: 'shield_person' },
    { label: 'Fully visible', value: 'open', icon: 'visibility' },
  ];

  readonly problemChecks = signal<boolean[]>([true, true, false]);
  readonly allProblemsChecked = computed(() => this.problemChecks().every(Boolean));
  readonly someProblemsChecked = computed(() => this.problemChecks().some(Boolean) && !this.allProblemsChecked());

  readonly hiddenTests = signal(true);
  readonly autoStart = signal(false);

  readonly arenaMode = signal<'race' | 'coop'>('race');

  isTagSelected(tag: string): boolean {
    return this.selectedTags().includes(tag);
  }

  setTagSelected(tag: string, selected: boolean): void {
    this.selectedTags.update(tags => selected ? [...tags, tag] : tags.filter(t => t !== tag));
  }

  removeStagedProblem(problem: string): void {
    this.stagedProblems.update(problems => problems.filter(p => p !== problem));
  }

  setProblemChecked(index: number, checked: boolean): void {
    this.problemChecks.update(checks => checks.map((c, i) => i === index ? checked : c));
  }

  setAllProblemsChecked(checked: boolean): void {
    this.problemChecks.update(checks => checks.map(() => checked));
  }

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

  readonly sampleProblem: ProblemData = {
    id: 1,
    title: 'Two Sum',
    difficulty: 'EASY',
    description:
      'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.',
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].',
      },
      {
        input: 'nums = [3,2,4], target = 6',
        output: '[1,2]',
      },
      {
        input: 'nums = [3,3], target = 6',
        output: '[0,1]',
      },
    ],
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.',
    ],
    hints: [
      'A really brute force way would be to search for all possible pairs of numbers but that would be too slow. Can you do it in O(n) runtime?',
      'Can we use a hash map to look up if the complement exists in O(1) time?',
    ],
    topics: ['Array', 'Hash Table'],
    companies: ['Amazon', 'Google', 'Apple', 'Meta'],
    likes: 70800,
    commentsCount: 2100,
  };

  readonly workspaceLanguage = signal<string>('cpp');
  readonly workspaceCode = signal<string>(`class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> seen;
        for (int i = 0; i < nums.size(); ++i) {
            int complement = target - nums[i];
            if (seen.find(complement) != seen.end()) {
                return {seen[complement], i};
            }
            seen[nums[i]] = i;
        }
        return {};
    }
};`);

  readonly isWorkspaceRunning = signal<boolean>(false);
  readonly isWorkspaceSubmitting = signal<boolean>(false);
  readonly workspaceResult = signal<TestResultData | null>(null);

  onRunWorkspace(testcase?: TestCaseItem): void {
    this.isWorkspaceRunning.set(true);
    const tc = testcase || {
      id: 1,
      name: 'Case 1',
      params: [{ name: 'nums', value: '[2,7,11,15]' }, { name: 'target', value: '9' }],
      expectedOutput: '[0,1]',
    };
    setTimeout(() => {
      this.isWorkspaceRunning.set(false);
      this.workspaceResult.set({
        status: 'ACCEPTED',
        runtimeMs: 42,
        memoryMb: 14.8,
        input: tc.params.map(p => `${p.name} = ${p.value}`).join(', '),
        output: '[0,1]',
        expectedOutput: '[0,1]',
      });
      this.toastService.success('Testcase passed! Output matched expected solution.', {
        title: 'Run Completed',
      });
    }, 800);
  }

  onShortcutRunWorkspace(): void {
    if (this.isWorkspaceRunning() || this.isWorkspaceSubmitting()) return;
    this.onRunWorkspace();
  }

  onSubmitWorkspace(): void {
    this.isWorkspaceSubmitting.set(true);
    setTimeout(() => {
      this.isWorkspaceSubmitting.set(false);
      this.workspaceResult.set({
        status: 'ACCEPTED',
        runtimeMs: 38,
        memoryMb: 15.2,
        input: 'Full 55/55 hidden test suites evaluated',
        output: 'All testcases passed',
        expectedOutput: 'All testcases passed',
      });
      this.toastService.success('Solution Accepted! Beats 94.2% of submissions in runtime.', {
        title: 'Submission Accepted',
      });
    }, 1200);
  }

  onResetWorkspace(): void {
    this.workspaceCode.set(`class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        
    }
};`);
    this.toastService.info('Code reset to original boilerplate.');
  }

  readonly splitHorizontal = signal<number>(50);
  readonly splitVertical = signal<number>(50);
  readonly accordionMulti = signal<boolean>(true);

  readonly sampleConsoleResult: TestResultData = {
    status: 'WRONG_ANSWER',
    runtimeMs: 38,
    memoryMb: 14.2,
    input: 'nums = [3,2,4], target = 6',
    output: '[0,1]',
    expectedOutput: '[1,2]',
    errorMessage: 'Output [0,1] did not match expected solution [1,2] for testcase #2.',
  };

  setSection(section: ComponentSection): void {
    this.activeSection.set(section);
  }
}

