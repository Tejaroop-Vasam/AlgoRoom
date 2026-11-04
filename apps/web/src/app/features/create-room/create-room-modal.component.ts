import { Component, computed, inject, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { NgTemplateOutlet } from '@angular/common';
import { CdkDrag, CdkDragDrop, CdkDragHandle, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { debounceTime } from 'rxjs';
import {
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
} from '../../shared';
import { ModalContainerComponent } from '../../shared/components/modal/modal-container.component';
import {
  BufferVisibility,
  Difficulty,
  ProblemsApiService,
  ProblemsQuery,
  ProblemSummary,
  Room,
  RoomMode,
  RoomsApiService,
} from '../../services/api';
import { LoadingService } from '../../services/loading.service';
import { RoomSocketService } from '../../services/room-socket.service';
import {
  MAX_PARTICIPANTS,
  MAX_STAGED_PROBLEMS,
  MIN_PARTICIPANTS,
} from '../../app.constants';

export interface CreateRoomModalData {
  initialProblem?: ProblemSummary;
}

@Component({
  selector: 'app-create-room-modal',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    CdkDropList,
    CdkDrag,
    CdkDragHandle,
    BadgeComponent,
    ButtonComponent,
    CheckboxComponent,
    ChipComponent,
    IconComponent,
    InputComponent,
    OptionCardComponent,
    SegmentedControlComponent,
  ],
  templateUrl: './create-room-modal.component.html',
  styleUrl: './create-room-modal.component.css',
  host: {
    class: 'd-block',
  },
})
export class CreateRoomModalComponent {
  private readonly container = inject(ModalContainerComponent, { optional: true });
  private readonly problemsApi = inject(ProblemsApiService);
  private readonly roomsApi = inject(RoomsApiService);
  private readonly loadingService = inject(LoadingService);
  private readonly roomSocket = inject(RoomSocketService);

  readonly maxStaged = MAX_STAGED_PROBLEMS;
  readonly minParticipants = MIN_PARTICIPANTS;
  readonly maxParticipants = MAX_PARTICIPANTS;

  readonly roomName = signal<string | null>(null);
  readonly hostName = signal<string>(typeof localStorage !== 'undefined' ? localStorage.getItem('algoroom_username') || '' : '');

  readonly mode = signal<RoomMode>('RACE');

  readonly search = signal('');
  readonly difficulty = signal<Difficulty | undefined>(undefined);

  readonly difficultyOptions: SegmentOption<Difficulty>[] = [
    { label: 'Easy', value: 'EASY' },
    { label: 'Med', value: 'MEDIUM' },
    { label: 'Hard', value: 'HARD' },
  ];

  private readonly problemQuery = computed<ProblemsQuery>(() => ({
    search: this.search().trim() || undefined,
    difficulty: this.difficulty(),
    limit: 50,
  }));

  readonly loadingProblems = this.loadingService.isLoading;
  readonly results = signal<ProblemSummary[]>([]);

  readonly staged = signal<ProblemSummary[]>([]);
  private readonly stagedIds = computed(() => new Set(this.staged().map(p => p.id)));
  readonly unstagedResults = computed(() => this.results().filter(p => !this.stagedIds().has(p.id)));
  readonly stagingFull = computed(() => this.staged().length >= MAX_STAGED_PROBLEMS);

  readonly headcount = signal<number>(4);

  readonly headcountError = computed(() => {
    const n = Number(this.headcount());
    return Number.isInteger(n) && n >= MIN_PARTICIPANTS && n <= MAX_PARTICIPANTS
      ? ''
      : `Between ${MIN_PARTICIPANTS} and ${MAX_PARTICIPANTS} players`;
  });

  readonly submitting = this.loadingService.isLoading;
  readonly createdRoom = signal<Room | null>(null);
  readonly activeRoom = computed(() => this.roomSocket.currentRoom() || this.createdRoom());
  readonly copied = signal<'code' | 'link' | null>(null);

  readonly canSubmit = computed(() =>
    !!this.roomName()?.trim() &&
    !!this.hostName()?.trim() &&
    this.staged().length > 0 &&
    !this.headcountError() &&
    !this.submitting()
  );

  constructor() {
    const data = this.container?.config?.data as CreateRoomModalData | undefined;
    if (data?.initialProblem) {
      this.staged.set([data.initialProblem]);
    }

    toObservable(this.problemQuery).pipe(
      debounceTime(250),
    ).subscribe(query => {
      this.fetchProblems(query);
    });
  }

  private async fetchProblems(query: ProblemsQuery): Promise<void> {
    try {
      const res = await this.problemsApi.getProblems(query);
      this.results.set(res.problems);
    } catch {
      this.results.set([]);
    }
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

  async create(): Promise<void> {
    if (!this.canSubmit()) {
      return;
    }

    const hostNameValue = this.hostName().trim();

    try {
      const room = await this.roomsApi.createRoom({
        name: this.roomName()?.trim() || '',
        hostName: hostNameValue,
        mode: this.mode(),
        problemIds: this.staged().map(p => p.id),
        maxParticipants: Number(this.headcount()),
        hiddenTestCases: true,
        bufferVisibility: (this.mode() === 'COOP' ? 'OPEN' : 'OBSCURED') as BufferVisibility,
      });
      this.createdRoom.set(room);
      this.roomSocket.connect(room.code, hostNameValue, room.host?.id);
    } catch {}
  }

  inviteLink(room: Room): string {
    const base = window.location.href.split('?')[0].split('#')[0].replace(/\/+$/, '');
    return `${base}/?join=${room.code}`;
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
    this.container?.close(this.activeRoom() || this.createdRoom());
  }
}
