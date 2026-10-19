import { TestCaseItem, TestCaseParam, TestResultData, TestResultStatus } from '../../shared';
import { ProblemData } from '../problem-panel/problem-panel.component';
import { ExecutionResultDto, ProblemDetailResponseDto, SubmissionEvaluationResultDto } from '../../services/api/api-client';

export interface RunOutcome {
  result: TestResultData;
  toastType: 'success' | 'warning' | 'error';
  toastMessage: string;
}

export interface SubmitOutcome {
  result: TestResultData;
  toastType: 'success' | 'error';
  toastMessage: string;
}

export function parseInputToParams(inputStr: string): TestCaseParam[] {
  if (!inputStr) return [{ name: 'input', value: '' }];

  if (inputStr.includes('=')) {
    const parts = inputStr.split(/,\s*(?=[a-zA-Z0-9_]+\s*=)/);
    return parts.map(part => {
      const eqIdx = part.indexOf('=');
      if (eqIdx !== -1) {
        const name = part.substring(0, eqIdx).trim();
        const value = part.substring(eqIdx + 1).trim();
        return { name, value };
      }
      return { name: 'param', value: part.trim() };
    });
  }

  return [{ name: 'input', value: inputStr }];
}

export function formatPayloadInput(tc: TestCaseItem): string {
  if (tc.params && tc.params.length > 0) {
    return tc.params.map(p => `${p.name} = ${p.value}`).join(', ');
  }
  return tc.rawInput || '';
}

export function mapToProblemData(p: ProblemDetailResponseDto | null): ProblemData | null {
  if (!p) return null;

  return {
    id: p.id,
    title: p.title,
    difficulty: (p.difficulty || 'EASY') as ProblemData['difficulty'],
    description: p.description,
    constraints: p.constraints ?? [],
    hints: p.hints ?? [],
    examples: (p.sampleTestCases ?? []).map(stc => ({
      input: stc.input,
      output: stc.expectedOutput,
      explanation: stc.explanation,
    })),
    topics: ['DSA', 'Algorithms'],
    companies: ['LeetRooms'],
    likes: 1200,
    commentsCount: 350,
  };
}

export function buildRunResult(
  res: ExecutionResultDto,
  testcase: TestCaseItem,
  inputPayload: string,
): RunOutcome {
  if (res.status === 'COMPILE_ERROR') {
    return {
      result: {
        status: 'COMPILE_ERROR',
        errorMessage: res.stderr || 'Compilation error occurred.',
        runtimeMs: res.executionTimeMs,
      },
      toastType: 'error',
      toastMessage: 'Compilation Error. Review errors in the console.',
    };
  }

  if (res.status === 'RUNTIME_ERROR') {
    return {
      result: {
        status: 'RUNTIME_ERROR',
        errorMessage: res.stderr || 'Runtime error occurred.',
        runtimeMs: res.executionTimeMs,
      },
      toastType: 'error',
      toastMessage: 'Runtime Error occurred.',
    };
  }

  if (res.status === 'TIME_LIMIT_EXCEEDED') {
    return {
      result: {
        status: 'TIME_LIMIT_EXCEEDED',
        errorMessage: 'Execution timed out exceeding time limit.',
        runtimeMs: res.executionTimeMs,
      },
      toastType: 'warning',
      toastMessage: 'Time Limit Exceeded.',
    };
  }

  const actual = (res.stdout || '').trim();
  const expected = (testcase.expectedOutput || '').trim();
  const isMatch = actual === expected;

  return {
    result: {
      status: isMatch ? 'ACCEPTED' : 'WRONG_ANSWER',
      runtimeMs: res.executionTimeMs,
      input: inputPayload,
      output: actual,
      expectedOutput: expected,
      errorMessage: !isMatch ? `Output ${actual} did not match expected solution ${expected}` : undefined,
    },
    toastType: isMatch ? 'success' : 'warning',
    toastMessage: isMatch ? 'Sample test case passed!' : 'Wrong answer on sample test case.',
  };
}

export function buildSubmitResult(res: SubmissionEvaluationResultDto): SubmitOutcome {
  if (res.passed) {
    const avgTime =
      res.results.length > 0
        ? Math.round(res.results.reduce((acc, r) => acc + (r.executionTimeMs || 0), 0) / res.results.length)
        : 0;

    return {
      result: {
        status: 'ACCEPTED',
        runtimeMs: avgTime,
        input: `All ${res.totalCount} test suites evaluated`,
        output: `Passed ${res.passedCount}/${res.totalCount} test cases`,
        expectedOutput: 'All cases accepted',
      },
      toastType: 'success',
      toastMessage: `Solution Accepted! Passed all ${res.totalCount} test cases.`,
    };
  }

  const failing = res.results.find(r => r.verdict !== 'ACCEPTED') || res.results[0];
  const verdict = (failing?.verdict || 'WRONG_ANSWER') as TestResultStatus;

  return {
    result: {
      status: verdict,
      runtimeMs: failing?.executionTimeMs,
      input: failing?.input || 'Hidden test case',
      output: failing?.actualOutput || '',
      expectedOutput: failing?.expectedOutput || '',
      errorMessage:
        failing?.stderr ||
        (verdict === 'WRONG_ANSWER'
          ? `Failed on testcase #${failing?.testCaseIndex ?? 1}. Output did not match expected solution.`
          : undefined),
    },
    toastType: 'error',
    toastMessage: `Solution failed on test case #${failing?.testCaseIndex ?? 1}: ${verdict}`,
  };
}
