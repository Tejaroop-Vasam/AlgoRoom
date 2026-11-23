import { Component, OnDestroy, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../../environments/environment';
import {
  CodeEditorComponent,
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
import { ProblemPanelComponent } from '../problem-panel/problem-panel.component';
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

@Component({
  selector: 'app-problem-workspace',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    IconComponent,
    SplitPaneComponent,
    ProblemPanelComponent,
    CodeEditorComponent,
    LiveGridComponent,
    RoomChatComponent,
    TestcaseConsoleComponent,
    RunShortcutsDirective,
  ],
  templateUrl: './problem-workspace.component.html',
  styleUrl: './problem-workspace.component.css',
  host: {
    class: 'd-flex flex-col w-full h-full overflow-hidden bg-surface',
  },
})
export class ProblemWorkspaceComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly problemsApi = inject(ProblemsApiService);
  private readonly runnerApi = inject(RunnerApiService);
  private readonly toast = inject(ToastService);
  private readonly guest = inject(GuestSessionService);
  private readonly room = signal<Room | null>(null);
  private readonly participantId = signal<string | null>(null);
  private socket?: Socket;

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

  async ngOnInit(): Promise<void> {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : 1;
    this.problemId.set(id);
    if (this.roomCode) this.connectRoom(this.roomCode);
    await this.fetchProblem(id);
  }

  ngOnDestroy(): void {
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
        this.roomProgressUnavailable.set(!result?.participantId);
      } catch {
        this.roomProgressUnavailable.set(true);
      }
    });
    socket.on('connect_error', () => this.roomProgressUnavailable.set(true));
    socket.on('disconnect', () => this.room.set(null));
    socket.on('roomStateUpdated', (room: Room) => this.room.set(room));
    socket.on('chatBroadcast', (message: RoomChatMessage) => {
      this.messages.update(messages => [...messages.slice(-99), message]);
    });
    socket.on('error', (error: { message: string }) => {
      if (this.roomConnected()) this.toast.error(error.message);
    });
  }

  async fetchProblem(id: number): Promise<void> {
    try {
      const res = await this.problemsApi.getProblem(id);
      this.problemDetail.set(res);

      const starters: Record<string, string> = (res.starterCodes as Record<string, string>) || {};
      this.starterCodes.set(starters);

      this.language.set(this.languages.find(language => starters[language]) ?? 'python');
      this.code.set(starters[this.language()] || '');

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
    const starter = this.starterCodes()[newLang];
    if (starter) {
      this.code.set(starter);
    }
  }

  resetCode(): void {
    const starter = this.starterCodes()[this.language()];
    if (starter) {
      this.code.set(starter);
      this.toast.info('Code reset to default problem template.');
    }
  }

  async onRun(testcase: TestCaseItem): Promise<void> {
    if (this.loading()) return;

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
    if (this.loading()) return;

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
