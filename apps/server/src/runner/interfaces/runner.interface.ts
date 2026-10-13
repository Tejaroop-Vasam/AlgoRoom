export type SupportedLanguage = 'python' | 'cpp' | 'java';

export type ExecutionStatus =
  | 'SUCCESS'
  | 'TIME_LIMIT_EXCEEDED'
  | 'MEMORY_LIMIT_EXCEEDED'
  | 'COMPILE_ERROR'
  | 'RUNTIME_ERROR';

export type SubmissionVerdict =
  | 'ACCEPTED'
  | 'WRONG_ANSWER'
  | 'TIME_LIMIT_EXCEEDED'
  | 'MEMORY_LIMIT_EXCEEDED'
  | 'COMPILE_ERROR'
  | 'RUNTIME_ERROR';

export interface LanguageConfig {
  id: SupportedLanguage;
  image: string;
  filename: string;
  buildRunCommand: (timeoutSec: number) => string;
}

export interface ExecuteCodeOptions {
  language: string;
  code: string;
  input?: string;
  timeLimitMs?: number;
  memoryLimitMb?: number;
}

export interface ExecutionResult {
  status: ExecutionStatus;
  stdout: string;
  stderr: string;
  executionTimeMs: number;
}

export interface TestCase {
  input: string;
  expectedOutput: string;
}

export interface EvaluateTestCasesOptions {
  language: string;
  code: string;
  testCases: TestCase[];
  timeLimitMs?: number;
  memoryLimitMb?: number;
}

export interface TestCaseEvaluationResult {
  testCaseIndex: number;
  verdict: SubmissionVerdict;
  input: string;
  expectedOutput: string;
  actualOutput: string;
  stderr: string;
  executionTimeMs: number;
}

export interface SubmissionEvaluationResult {
  passed: boolean;
  totalCount: number;
  passedCount: number;
  results: TestCaseEvaluationResult[];
}
