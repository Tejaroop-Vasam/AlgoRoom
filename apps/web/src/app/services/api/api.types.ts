export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';
export type RoomMode = 'RACE' | 'COOP';
export type RoomStatus = 'LOBBY' | 'IN_PROGRESS' | 'FINISHED';

export interface ProblemSummary {
  id: number;
  title: string;
  difficulty: Difficulty;
  createdAt: string;
  updatedAt: string;
}

export interface ProblemsQuery {
  search?: string;
  difficulty?: Difficulty;
  page?: number;
  limit?: number;
}

export interface ProblemsListResponse {
  problems: ProblemSummary[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ProblemDetailResponseDto extends ProblemSummary {
  description: string;
  constraints: string[];
  hints: string[];
  sampleTestCases: { id?: number; input: string; expectedOutput: string; explanation?: string }[];
  starterCodes: Record<string, string>;
}

export interface CreateRoomRequest {
  name: string;
  playerName: string;
  mode: RoomMode;
  problemIds: number[];
  maxParticipants: number;
}

export interface RoomParticipant {
  id: string;
  username: string;
  isHost: boolean;
  online: boolean;
  telemetry?: Record<number, RoomProblemTelemetry>;
}

export interface RoomProblemTelemetry {
  runs: number;
  submissions: number;
  compileErrors: number;
  runtimeErrors: number;
  passedTests: number;
  totalTests: number;
  executionTimeMs: number | null;
  status: ExecutionResultDto['status'] | SubmissionEvaluationResultDto['results'][number]['verdict'] | null;
}

export interface Room {
  id: number;
  name: string;
  code: string;
  mode: RoomMode;
  status: RoomStatus;
  host: RoomParticipant;
  participants: RoomParticipant[];
  problemIds: number[];
  settings: { maxParticipants: number };
  createdAt: string;
}

export interface RoomPreview {
  code: string;
  name: string;
  mode: RoomMode;
  status: RoomStatus;
  hostName: string;
  participantCount: number;
  maxParticipants: number;
  problemCount: number;
  isMember: boolean;
}

export type Language = 'python' | 'cpp' | 'java';
export type FormatLanguage = Language | 'javascript' | 'typescript';
type ExecutionFailure = 'TIME_LIMIT_EXCEEDED' | 'MEMORY_LIMIT_EXCEEDED' | 'COMPILE_ERROR' | 'RUNTIME_ERROR';

export interface RunCodeDto {
  language: Language;
  code: string;
  problemId?: number;
  input?: string;
}

export interface SubmitCodeDto {
  language: Language;
  code: string;
  problemId: number;
}

export interface ExecutionResultDto {
  status: 'SUCCESS' | ExecutionFailure;
  stdout: string;
  stderr: string;
  executionTimeMs: number;
}

export interface SubmissionEvaluationResultDto {
  passed: boolean;
  totalCount: number;
  passedCount: number;
  results: {
    testCaseIndex: number;
    verdict: 'ACCEPTED' | 'WRONG_ANSWER' | ExecutionFailure;
    input: string;
    expectedOutput: string;
    actualOutput: string;
    stderr: string;
    executionTimeMs: number;
  }[];
}

export interface FormatCodeDto {
  language: FormatLanguage;
  code: string;
}

export interface FormatResultDto {
  code: string;
  formatted: boolean;
  error?: string;
}
