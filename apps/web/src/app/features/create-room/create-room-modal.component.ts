import { Component, computed, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { NgTemplateOutlet } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { CdkDrag, CdkDragDrop, CdkDragHandle, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { catchError, debounceTime, map, of, switchMap, tap } from 'rxjs';
import {
  AvatarComponent,
  BadgeComponent,
  BadgeVariant,
  ButtonComponent,
  CheckboxComponent,
  ChipComponent,
  IconComponent,
  InputComponent,
  OptionCardComponent,
  SegmentOption,
  SegmentedControlComponent,
  SelectComponent,
  SelectOption,
  ToggleSwitchComponent,
} from '../../shared';
import { ModalContainerComponent } from '../../shared/components/modal/modal-container.component';
import {
  ApiError,
  BufferVisibility,
  Difficulty,
  ProblemsApiService,
  ProblemSummary,
  Room,
  RoomMode,
  RoomsApiService,
  UsersApiService,
} from '../../services/api';

export const MAX_STAGED_PROBLEMS = 5;
export const MIN_PARTICIPANTS = 2;
export const MAX_PARTICIPANTS = 8;

const NAME_ADJECTIVES = ['Graph', 'Greedy', 'Recursive', 'Binary', 'Dynamic', 'Sliding', 'Heap', 'Trie'];
const NAME_NOUNS = ['Warriors', 'Raiders', 'Sprinters', 'Architects', 'Hunters', 'Mavericks', 'Pilots', 'Titans'];

function randomRoomName(): string {
  const pick = <T>(items: T[]) => items[Math.floor(Math.random() * items.length)];
  return `${pick(NAME_ADJECTIVES)} ${pick(NAME_NOUNS)} #${100 + Math.floor(Math.random() * 900)}`;
}

@Component({
  selector: 'app-create-room-modal',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    CdkDropList,
    CdkDrag,
    CdkDragHandle,
    AvatarComponent,
    BadgeComponent,
    ButtonComponent,
    CheckboxComponent,
    ChipComponent,
    IconComponent,
    InputComponent,
    OptionCardComponent,
    SegmentedControlComponent,
    SelectComponent,
    ToggleSwitchComponent,
  ],
  templateUrl: './create-room-modal.component.html',
  styleUrl: './create-room-modal.component.css',
})
export class CreateRoomModalComponent {
  private readonly container = inject(ModalContainerComponent, { optional: true });
  private readonly problemsApi = inject(ProblemsApiService);
  private readonly roomsApi = inject(RoomsApiService);
  private readonly usersApi = inject(UsersApiService);

  readonly maxStaged = MAX_STAGED_PROBLEMS;
  readonly minParticipants = MIN_PARTICIPANTS;
  readonly maxParticipants = MAX_PARTICIPANTS;

  readonly roomName = signal(randomRoomName());
  readonly host = toSignal(
    this.usersApi.getProfile().pipe(
      map(res => res.user),
      catchError(() => of(null)),
    ),
    { initialValue: null },
  );

  readonly mode = signal<RoomMode>('RACE');

  readonly search = signal('');
  readonly curatedList = signal<string | null>('blind-75');
  readonly difficulty = signal<Difficulty | undefined>(undefined);
  readonly selectedTags = signal<string[]>([]);

  readonly difficultyOptions: SegmentOption<Difficulty>[] = [
    { label: 'Easy', value: 'EASY' },
    { label: 'Med', value: 'MEDIUM' },
    { label: 'Hard', value: 'HARD' },
  ];

  readonly tags = toSignal(this.problemsApi.getTags().pipe(catchError(() => of([]))), { initialValue: [] });
  readonly listOptions = toSignal(
    this.problemsApi.getLists().pipe(
      map(lists => lists.map((l): SelectOption => ({ label: l.name, value: l.slug }))),
      catchError(() => of([] as SelectOption[])),
    ),
    { initialValue: [] as SelectOption[] },
  );

  private readonly problemQuery = computed(() => ({
    search: this.search().trim() || undefined,
    list: this.curatedList() || undefined,
    difficulty: this.difficulty(),
    tags: this.selectedTags(),
    limit: 50,
  }));

  readonly loadingProblems = signal(true);
  readonly problemsError = signal<string | null>(null);
  readonly results = toSignal(
    toObservable(this.problemQuery).pipe(
      tap(() => this.loadingProblems.set(true)),
      debounceTime(250),
      switchMap(query => this.problemsApi.getProblems(query).pipe(
        map(res => {
          this.problemsError.set(null);
          return res.problems;
        }),
        catchError(() => {
          this.problemsError.set('Could not load problems. Try again in a moment.');
          return of([] as ProblemSummary[]);
        }),
      )),
      tap(() => this.loadingProblems.set(false)),
    ),
    { initialValue: [] as ProblemSummary[] },
  );

  readonly staged = signal<ProblemSummary[]>([]);
  private readonly stagedIds = computed(() => new Set(this.staged().map(p => p.id)));
  readonly unstagedResults = computed(() => this.results().filter(p => !this.stagedIds().has(p.id)));
  readonly stagingFull = computed(() => this.staged().length >= MAX_STAGED_PROBLEMS);
  readonly totalPoints = computed(() => this.staged().reduce((sum, p) => sum + p.points, 0));
  readonly estimatedMinutes = computed(() => this.staged().reduce((sum, p) => sum + p.targetMinutes, 0));

  readonly headcount = signal<number>(4);
  readonly hiddenTestCases = signal(true);
  readonly bufferVisibility = signal<string | null>('OBSCURED');
  readonly bufferOptions: SelectOption[] = [
    { label: 'Obscured until round end', value: 'OBSCURED', icon: 'visibility_off' },
    { label: 'Visible to host only', value: 'HOST_ONLY', icon: 'shield_person' },
    { label: 'Open to all players', value: 'OPEN', icon: 'visibility' },
  ];

  readonly headcountError = computed(() => {
    const n = Number(this.headcount());
    return Number.isInteger(n) && n >= MIN_PARTICIPANTS && n <= MAX_PARTICIPANTS
      ? ''
      : `Between ${MIN_PARTICIPANTS} and ${MAX_PARTICIPANTS} players`;
  });

  readonly submitting = signal(false);
  readonly submitError = signal<string | null>(null);
  readonly createdRoom = signal<Room | null>(null);
  readonly copied = signal<'code' | 'link' | null>(null);

  readonly canSubmit = computed(() =>
    !!this.roomName().trim() &&
    this.staged().length > 0 &&
    !this.headcountError() &&
    !this.submitting()
  );

  rerollName(): void {
    this.roomName.set(randomRoomName());
  }

  isTagSelected(slug: string): boolean {
    return this.selectedTags().includes(slug);
  }

  setTagSelected(slug: string, selected: boolean): void {
    this.selectedTags.update(tags => selected ? [...tags, slug] : tags.filter(t => t !== slug));
  }

  isStaged(problem: ProblemSummary): boolean {
    return this.stagedIds().has(problem.id);
  }

  setStaged(problem: ProblemSummary, staged: boolean): void {
    if (staged) {
      if (!this.isStaged(problem) && !this.stagingFull()) {
        this.staged.update(list => [...list, problem]);
      }
    } else {
      this.staged.update(list => list.filter(p => p.id !== problem.id));
    }
  }

  clearStaged(): void {
    this.staged.set([]);
  }

  reorderStaged(event: CdkDragDrop<ProblemSummary[]>): void {
    this.staged.update(list => {
      const next = [...list];
      moveItemInArray(next, event.previousIndex, event.currentIndex);
      return next;
    });
  }

  difficultyVariant(difficulty: Difficulty): BadgeVariant {
    return difficulty === 'EASY' ? 'secondary' : difficulty === 'MEDIUM' ? 'tertiary' : 'error';
  }

  difficultyLabel(difficulty: Difficulty): string {
    return difficulty.charAt(0) + difficulty.slice(1).toLowerCase();
  }

  tagNames(problem: ProblemSummary): string {
    return problem.tags.map(t => t.name).join(', ');
  }

  create(): void {
    if (!this.canSubmit()) {
      return;
    }
    this.submitting.set(true);
    this.submitError.set(null);

    this.roomsApi.createRoom({
      name: this.roomName().trim(),
      mode: this.mode(),
      problemIds: this.staged().map(p => p.id),
      maxParticipants: Number(this.headcount()),
      hiddenTestCases: this.hiddenTestCases(),
      bufferVisibility: (this.mode() === 'COOP' ? 'OPEN' : this.bufferVisibility() ?? 'OBSCURED') as BufferVisibility,
    }).subscribe({
      next: room => {
        this.submitting.set(false);
        this.createdRoom.set(room);
      },
      error: (err: HttpErrorResponse) => {
        this.submitting.set(false);
        this.submitError.set((err.error as ApiError | null)?.message ?? 'Could not create the room. Please try again.');
      },
    });
  }

  inviteLink(room: Room): string {
    return `${window.location.origin}/?join=${room.code}`;
  }

  async copy(kind: 'code' | 'link', room: Room): Promise<void> {
    try {
      await navigator.clipboard.writeText(kind === 'code' ? room.code : this.inviteLink(room));
      this.copied.set(kind);
      setTimeout(() => this.copied.set(null), 1500);
    } catch {
      this.copied.set(null);
    }
  }

  close(): void {
    this.container?.close(this.createdRoom());
  }
}
