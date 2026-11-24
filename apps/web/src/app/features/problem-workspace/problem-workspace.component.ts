import { Component, OnDestroy, OnInit, computed, effect, inject, signal, untracked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../../environments/environment';
import {
  BadgeComponent,
  ButtonComponent,
  CodeEditorComponent,
  CollabDocument,
  IconComponent,
  LiveGridComponent,
  RunShortcutsDirective,
  SplitPaneComponent,
  TestCaseItem,
  TestResultData,
  TestcaseConsoleComponent,
  ToastService,
} from '../../shared';
import { RoomChatComponent, RoomChatMessage } from '../../shared/components/room-chat/room-chat.component';
import { ProblemPanelComponent, SubmissionRecord } from '../problem-panel/problem-panel.component';
import { ProblemsApiService } from '../../services/api/problems-api.service';
import { LoadingService } from '../../services/loading.service';
import { GuestSessionService } from '../../services/guest-session.service';
import { RunnerApiService } from '../../services/api/runner-api.service';
import { Language, ProblemDetailResponseDto, Room } from '../../services/api/api.types';
import {
  buildRunResult,
  buildSubmitResult,
  formatPayloadInput,
  mapToProblemData,
  parseInputToParams,
  roomCompetitors,
} from './problem-workspace.utils';
import { RaceBarComponent } from '../race/race-bar/race-bar.component';
import { RaceStandingsComponent } from '../race/race-standings/race-standings.component';
import { RaceClock } from '../race/race-clock';
import { formatDuration, newSolves, raceStandings } from '../race/race.utils';

@Component({
  selector: 'app-problem-workspace',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    BadgeComponent,
    ButtonComponent,
    IconComponent,
    SplitPaneComponent,
    ProblemPanelComponent,
    CodeEditorComponent,
    LiveGridComponent,
    RoomChatComponent,
    TestcaseConsoleComponent,
    RunShortcutsDirective,
    RaceBarComponent,
    RaceStandingsComponent,
  ],
  templateUrl: './problem-workspace.component.html',
  styleUrl: './problem-workspace.component.css',
  host: {
    class: 'd-flex flex-col w-full h-full overflow-hidden bg-surface',
  },
})
export class ProblemWorkspaceComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly problemsApi = inject(ProblemsApiService);
  private readonly runnerApi = inject(RunnerApiService);
  private readonly toast = inject(ToastService);
  private readonly guest = inject(GuestSessionService);
  readonly room = signal<Room | null>(null);
  readonly participantId = signal<string | null>(null);
  private socket?: Socket;
  private drafts: Record<string, string> = {};
  private readonly submissionsKey = `algoroom-submissions:${this.route.snapshot.queryParamMap.get('room')?.trim().toUpperCase() || 'solo'}`;
  private readonly submissionHistory = signal<Partial<Record<number, SubmissionRecord[]>>>(this.loadSubmissions());
  readonly submissions = computed(() => this.submissionHistory()[this.problemId()] ?? []);
  private readonly requestedTitles = new Set<number>();

  readonly roomCode = this.route.snapshot.queryParamMap.get('room')?.trim().toUpperCase() || null;
  readonly problemId = signal<number>(1);
  readonly problemDetail = signal<ProblemDetailResponseDto | null>(null);

  readonly languages: Language[] = ['python', 'cpp', 'java'];
  readonly language = signal<string>('python');
  readonly code = signal<string>('');
  readonly starterCodes = signal<Record<string, string>>({});

  readonly testcases = signal<TestCaseItem[]>([]);
  readonly consoleTab = signal<'testcase' | 'result'>('testcase');
  readonly testResult = signal<TestResultData | null>(null);

  readonly loading = inject(LoadingService).isLoading;

  readonly problemData = computed(() => mapToProblemData(this.problemDetail()));
  readonly competitors = computed(() => roomCompetitors(
    this.room()?.participants ?? [], this.problemId(), this.participantId(),
  ));
  readonly roomProgressUnavailable = signal(false);
  readonly activityOpen = signal(false);
  readonly roomConnected = computed(() => !!this.room() && !!this.participantId());
  readonly messages = signal<RoomChatMessage[]>([]);
  readonly onlineCount = computed(() => this.room()?.participants.filter(player => player.online).length ?? 0);

  readonly clock = new RaceClock();
  readonly problemTitles = signal<Partial<Record<number, string>>>({});
  readonly endingRace = signal(false);
  readonly finishingActivity = signal(false);
  readonly selfFinished = computed(() =>
    !!this.room()?.participants.find(player => player.id === this.participantId())?.finishedAt);
  readonly isRace = computed(() => this.room()?.mode === 'RACE');
  readonly sessionActive = computed(() => !!this.room() && this.room()?.status !== 'LOBBY');
  readonly raceActive = computed(() => this.isRace() && this.sessionActive());
  readonly sessionLocked = computed(() => {
    const room = this.room();
    if (!room) return false;
    if (room.status === 'FINISHED' || this.selfFinished()) return true;
    if (room.status !== 'IN_PROGRESS') return room.mode === 'RACE';
    return !!room.startedAt && this.clock.now() < Date.parse(room.startedAt);
  });
  readonly collab = signal<CollabDocument | null>(null);
  readonly collabDocId = computed(() => {
    const room = this.room();
    if (!room || room.mode !== 'COOP' || !this.participantId()) return null;
    if (this.problemDetail()?.id !== this.problemId() || !room.problemIds.includes(this.problemId())) return null;
    return `${this.problemId()}:${this.language()}`;
  });
  readonly standings = computed(() => {
    const room = this.room();
    return room && room.mode === 'RACE' ? raceStandings(room) : [];
  });

  constructor() {
    if (this.roomCode) this.drafts = this.loadDrafts();
    this.route.paramMap.pipe(takeUntilDestroyed()).subscribe(params => {
      const id = Number(params.get('id')) || 1;
      if (this.problemDetail() && id === this.problemId()) return;
      this.problemId.set(id);
      void this.fetchProblem(id);
    });

    effect(() => {
      const docId = this.collabDocId();
      untracked(() => this.openSharedDoc(docId));
    });
  }

  private openSharedDoc(docId: string | null): void {
    const current = this.collab();
    if (current?.id === docId && docId) return;
    current?.destroy();
    this.collab.set(null);
    if (!docId || !this.socket) return;
    const [problemId, language] = docId.split(':');
    const doc = new CollabDocument(this.socket, docId, () => this.codeFor(Number(problemId), language));
    this.collab.set(doc);
    doc.connect().catch(() => {
      if (this.collab() !== doc) return;
      doc.destroy();
      this.collab.set(null);
      this.toast.error('Shared editor is unavailable. Your edits stay on this device.');
    });
  }

  ngOnInit(): void {
    if (this.roomCode) this.connectRoom(this.roomCode);
  }

  ngOnDestroy(): void {
    this.collab()?.destroy();
    this.socket?.disconnect();
  }

  sendChat(message: string): void {
    if (this.roomConnected()) this.socket?.emit('chatMessage', { message });
  }

  private connectRoom(code: string): void {
    const socket = io(`${environment.apiUrl}/rooms`, { auth: { guestToken: this.guest.token } });
    this.socket = socket;
    socket.on('connect', async () => {
      this.roomProgressUnavailable.set(false);
      try {
        const result = await socket.timeout(4000).emitWithAck('joinLobby', { code });
        this.participantId.set(result?.participantId ?? null);
        this.leaveIfDone();
        this.roomProgressUnavailable.set(!result?.participantId);
      } catch {
        this.roomProgressUnavailable.set(true);
      }
    });
    socket.on('connect_error', () => this.roomProgressUnavailable.set(true));
    socket.on('disconnect', () => this.room.set(null));
    socket.on('roomStateUpdated', (room: Room) => this.onRoomState(room));
    socket.on('chatBroadcast', (message: RoomChatMessage) => {
      this.messages.update(messages => [...messages.slice(-99), message]);
    });
    socket.on('error', (error: { message: string }) => {
      if (this.roomConnected()) this.toast.error(error.message);
    });
  }

  async endRace(): Promise<void> {
    if (!this.socket || this.endingRace()) return;
    this.endingRace.set(true);
    try {
      await this.socket.timeout(4000).emitWithAck('endRace');
    } catch {
      this.toast.error('Could not end the race. Try again.');
    } finally {
      this.endingRace.set(false);
    }
  }

  async finishActivity(): Promise<void> {
    if (!this.socket || this.finishingActivity()) return;
    this.finishingActivity.set(true);
    try {
      const result = await this.socket.timeout(4000).emitWithAck('finishActivity');
      if (result?.finished) this.toast.success('You finished. Results update live as others play.');
    } catch {
      this.toast.error('Could not finish. Try again.');
    } finally {
      this.finishingActivity.set(false);
    }
  }

  onCodeChange(value: string): void {
    this.code.set(value);
    this.saveDraft();
  }

  private onRoomState(room: Room): void {
    this.clock.sync(room.serverTime);
    if (room.mode === 'RACE') {
      for (const solve of newSolves(this.room(), room)) {
        if (solve.player.id === this.participantId()) continue;
        const position = room.problemIds.indexOf(solve.problemId) + 1;
        const title = this.problemTitles()[solve.problemId] ?? `problem ${position}`;
        this.toast.info(`${solve.player.username} solved ${title} in ${formatDuration(solve.solveMs)}`);
      }
      this.loadTitles(room.problemIds);
    }
    this.room.set(room);
    this.leaveIfDone();
  }

  private leaveIfDone(): void {
    const room = this.room();
    if (room && (room.status === 'FINISHED' || this.selfFinished())) {
      void this.router.navigate(['/room', room.code, 'results']);
    }
  }

  private loadTitles(ids: number[]): void {
    for (const id of ids) {
      if (this.problemTitles()[id] || this.requestedTitles.has(id)) continue;
      this.requestedTitles.add(id);
      void this.problemsApi.getProblem(id).then(({ title }) => {
        this.problemTitles.update(titles => ({ ...titles, [id]: title }));
      }).catch(() => this.requestedTitles.delete(id));
    }
  }

  private recordSubmission(verdict: string, passedCount: number, totalCount: number, runtimeMs?: number): void {
    const record: SubmissionRecord = {
      submittedAt: new Date().toISOString(),
      language: this.language(),
      verdict,
      passedCount,
      totalCount,
      runtimeMs: runtimeMs ?? null,
    };
    const problemId = this.problemId();
    this.submissionHistory.update(history => ({
      ...history,
      [problemId]: [record, ...(history[problemId] ?? [])].slice(0, 50),
    }));
    try {
      sessionStorage.setItem(this.submissionsKey, JSON.stringify(this.submissionHistory()));
    } catch {}
  }

  private loadSubmissions(): Partial<Record<number, SubmissionRecord[]>> {
    try {
      return JSON.parse(sessionStorage.getItem(this.submissionsKey) ?? '{}');
    } catch {
      return {};
    }
  }

  private draftKey(problemId: number, language: string): string {
    return `${problemId}:${language}`;
  }

  private loadDrafts(): Record<string, string> {
    try {
      return JSON.parse(sessionStorage.getItem(`algoroom-drafts:${this.roomCode}`) ?? '{}');
    } catch {
      return {};
    }
  }

  private saveDraft(): void {
    if (!this.roomCode || !this.problemDetail()) return;
    this.drafts[this.draftKey(this.problemId(), this.language())] = this.code();
    try {
      sessionStorage.setItem(`algoroom-drafts:${this.roomCode}`, JSON.stringify(this.drafts));
    } catch {}
  }

  private codeFor(problemId: number, language: string): string {
    return this.drafts[this.draftKey(problemId, language)] ?? this.starterCodes()[language] ?? '';
  }

  async fetchProblem(id: number): Promise<void> {
    try {
      const res = await this.problemsApi.getProblem(id);
      this.problemDetail.set(res);

      if (id !== this.problemId()) return;
      const starters: Record<string, string> = (res.starterCodes as Record<string, string>) || {};
      this.starterCodes.set(starters);
      this.problemTitles.update(titles => ({ ...titles, [id]: res.title }));
      this.testResult.set(null);
      this.consoleTab.set('testcase');

      if (!starters[this.language()]) {
        this.language.set(this.languages.find(language => starters[language]) ?? 'python');
      }
      if (!this.collabDocId()) this.code.set(this.codeFor(id, this.language()));

      const parsedCases: TestCaseItem[] = (res.sampleTestCases ?? []).map((stc, idx) => ({
        id: stc.id ?? idx + 1,
        label: `Case ${idx + 1}`,
        params: parseInputToParams(stc.input),
        expectedOutput: stc.expectedOutput,
        rawInput: stc.input,
      }));

      this.testcases.set(
        parsedCases.length > 0
          ? parsedCases
          : [{ id: 1, label: 'Case 1', params: [{ name: 'input', value: '' }] }],
      );
    } catch {
    }
  }

  onLanguageChange(newLang: string): void {
    this.language.set(newLang);
    const code = this.codeFor(this.problemId(), newLang);
    if (code && !this.collabDocId()) {
      this.code.set(code);
    }
  }

  resetCode(): void {
    const starter = this.starterCodes()[this.language()];
    if (starter) {
      this.code.set(starter);
      this.saveDraft();
      this.toast.info('Code reset to default problem template.');
    }
  }

  async onRun(testcase: TestCaseItem): Promise<void> {
    if (this.loading() || this.sessionLocked()) return;

    this.consoleTab.set('result');
    this.testResult.set(null);

    const inputPayload = formatPayloadInput(testcase);

    try {
      const res = await this.runnerApi.run({
        problemId: this.problemId(),
        language: this.language() as Language,
        code: this.code(),
        input: inputPayload,
      }, this.roomCode?.length === 6 ? this.roomCode : undefined);

      const { result, toastType, toastMessage } = buildRunResult(res, testcase, inputPayload);
      this.testResult.set(result);
      this.toast[toastType](toastMessage);
    } catch {}
  }

  async onSubmit(): Promise<void> {
    if (this.loading() || this.sessionLocked()) return;

    this.consoleTab.set('result');
    this.testResult.set(null);

    try {
      const res = await this.runnerApi.submit({
        problemId: this.problemId(),
        language: this.language() as Language,
        code: this.code(),
      }, this.roomCode?.length === 6 ? this.roomCode : undefined);

      const { result, toastType, toastMessage } = buildSubmitResult(res);
      this.testResult.set(result);
      this.recordSubmission(result.status, res.passedCount, res.totalCount, result.runtimeMs);
      this.toast[toastType](toastMessage);
    } catch {}
  }

  onShortcutRun(): void {
    if (this.loading()) return;
    const selected = this.testcases()[0];
    if (selected) {
      this.onRun(selected);
    }
  }

  onShortcutSubmit(): void {
    if (this.loading()) return;
    this.onSubmit();
  }
}
