import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { promises as fs } from 'fs';
import * as path from 'path';
import * as os from 'os';
import { execFile } from 'child_process';
import { promisify } from 'util';
import { SUPPORTED_LANGUAGES } from './runner.constants';
import {
  EvaluateTestCasesOptions,
  ExecuteCodeOptions,
  ExecutionResult,
  ExecutionStatus,
  SubmissionEvaluationResult,
  SubmissionVerdict,
  SupportedLanguage,
  TestCaseEvaluationResult,
} from './interfaces/runner.interface';
import { FormatLanguage, FormatResultDto } from './dto/format-code.dto';

const execFileAsync = promisify(execFile);

@Injectable()
export class RunnerService {
  normalizeOutput(str = ''): string {
    return str
      .replace(/\r\n/g, '\n')
      .split('\n')
      .map((line) => line.trimEnd())
      .join('\n')
      .trim();
  }

  async executeCode(options: ExecuteCodeOptions): Promise<ExecutionResult> {
    const {
      language,
      code,
      input = '',
      timeLimitMs = 2000,
      memoryLimitMb = 256,
    } = options;

    const evaluation = await this.evaluateTestCases({
      language,
      code,
      testCases: [{ input, expectedOutput: '' }],
      timeLimitMs,
      memoryLimitMb,
    });

    const firstResult = evaluation.results[0];
    if (!firstResult) {
      return {
        status: 'RUNTIME_ERROR',
        stdout: '',
        stderr: 'Execution produced no result',
        executionTimeMs: 0,
      };
    }

    let status: ExecutionStatus = 'SUCCESS';
    if (firstResult.verdict === 'COMPILE_ERROR') {
      status = 'COMPILE_ERROR';
    } else if (firstResult.verdict === 'TIME_LIMIT_EXCEEDED') {
      status = 'TIME_LIMIT_EXCEEDED';
    } else if (firstResult.verdict === 'MEMORY_LIMIT_EXCEEDED') {
      status = 'MEMORY_LIMIT_EXCEEDED';
    } else if (firstResult.verdict === 'RUNTIME_ERROR') {
      status = 'RUNTIME_ERROR';
    }

    return {
      status,
      stdout: firstResult.actualOutput,
      stderr: firstResult.stderr,
      executionTimeMs: firstResult.executionTimeMs,
    };
  }

  async evaluateTestCases(options: EvaluateTestCasesOptions): Promise<SubmissionEvaluationResult> {
    const {
      language,
      code,
      testCases = [],
      timeLimitMs = 2000,
      memoryLimitMb = 256,
    } = options;

    if (testCases.length === 0) {
      return {
        passed: false,
        totalCount: 0,
        passedCount: 0,
        results: [],
      };
    }

    const langConfig = SUPPORTED_LANGUAGES[language as SupportedLanguage];
    if (!langConfig) {
      throw new BadRequestException(
        `Unsupported language "${language}". Supported: ${Object.keys(SUPPORTED_LANGUAGES).join(', ')}`,
      );
    }

    const timeoutSec = Math.max(1, Math.ceil(timeLimitMs / 1000));
    const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'eligible-batch-'));
    const workspaceDir = path.join(tempDir, 'workspace');
    const inputsDir = path.join(workspaceDir, 'inputs');
    const outputsDir = path.join(tempDir, 'outputs');

    try {
      await fs.mkdir(workspaceDir, { recursive: true });
      await fs.mkdir(inputsDir, { recursive: true });
      await fs.mkdir(outputsDir, { recursive: true, mode: 0o777 });
      await fs.chmod(outputsDir, 0o777);

      // 1. Write user source code
      await fs.writeFile(path.join(workspaceDir, langConfig.filename), code ?? '', 'utf8');

      // 2. Write all testcase inputs
      for (let i = 0; i < testCases.length; i++) {
        await fs.writeFile(path.join(inputsDir, `${i}.in`), testCases[i].input ?? '', 'utf8');
      }

      // 3. Build single-container execution harness
      const runCommand = langConfig.buildRunCommand(timeoutSec);
      const compileSection = langConfig.compileCommand
        ? `${langConfig.compileCommand} > /outputs/compile.out 2> /outputs/compile.err
if [ $? -ne 0 ]; then
  echo "COMPILE_ERROR" > /outputs/batch.status
  exit 0
fi`
        : '';

      const harnessScript = `#!/bin/bash
# Phase 1: Compile once (if needed)
${compileSection}

# Phase 2: Execute all test cases sequentially against compiled binary
for (( i=0; i<${testCases.length}; i++ )); do
  START=$(date +%s%3N)
  ${runCommand} < "/workspace/inputs/\${i}.in" > "/outputs/\${i}.out" 2> "/outputs/\${i}.err"
  EXIT_CODE=$?
  END=$(date +%s%3N)
  DIFF=$((END - START))

  echo "$EXIT_CODE" > "/outputs/\${i}.status"
  echo "$DIFF" > "/outputs/\${i}.time"
done

echo "SUCCESS" > /outputs/batch.status
`;

      await fs.writeFile(path.join(workspaceDir, 'harness.sh'), harnessScript, {
        mode: 0o755,
        encoding: 'utf8',
      });

      // 4. Run single Docker container for the whole batch
      const dockerArgs = [
        'run',
        '--rm',
        '--network',
        'none',
        '--memory',
        `${memoryLimitMb}m`,
        '--cpus',
        '1.0',
        '--pids-limit',
        '64',
        '--read-only',
        '--tmpfs',
        '/tmp:rw,exec,nosuid,size=64m',
        '-v',
        `${workspaceDir}:/workspace:ro`,
        '-v',
        `${outputsDir}:/outputs:rw`,
        langConfig.image,
        'bash',
        '/workspace/harness.sh',
      ];

      const extendedPath = [
        path.join(os.homedir(), '.docker', 'bin'),
        '/usr/local/bin',
        '/opt/homebrew/bin',
        process.env.PATH,
      ]
        .filter(Boolean)
        .join(':');

      const hostProcessTimeout = Math.max(10000, timeoutSec * testCases.length * 1000 + 10000);

      try {
        await execFileAsync('docker', dockerArgs, {
          timeout: hostProcessTimeout,
          maxBuffer: 2 * 1024 * 1024,
          env: {
            ...process.env,
            PATH: extendedPath,
          },
        });
      } catch (err: any) {
        // If container timed out on the host or failed to launch
        const isHostTimeout = err.killed || err.code === 'ETIMEDOUT';
        if (isHostTimeout) {
          const results: TestCaseEvaluationResult[] = testCases.map((tc, idx) => ({
            testCaseIndex: idx + 1,
            verdict: 'TIME_LIMIT_EXCEEDED' as SubmissionVerdict,
            input: tc.input,
            expectedOutput: this.normalizeOutput(tc.expectedOutput),
            actualOutput: '',
            stderr: 'Container execution timed out',
            executionTimeMs: timeoutSec * 1000,
          }));

          return {
            passed: false,
            totalCount: testCases.length,
            passedCount: 0,
            results,
          };
        }

        // If batch status was written, we continue to parse outputs below
        const hasStatusFile = await fs
          .access(path.join(outputsDir, 'batch.status'))
          .then(() => true)
          .catch(() => false);

        if (!hasStatusFile) {
          throw new InternalServerErrorException(err.message || 'Execution container failed');
        }
      }

      // 5. Check compilation status
      let batchStatus = 'SUCCESS';
      try {
        batchStatus = (await fs.readFile(path.join(outputsDir, 'batch.status'), 'utf8')).trim();
      } catch {
        batchStatus = 'FAILED';
      }

      if (batchStatus === 'COMPILE_ERROR') {
        let compileErr = '';
        try {
          compileErr = await fs.readFile(path.join(outputsDir, 'compile.err'), 'utf8');
        } catch {}

        const results: TestCaseEvaluationResult[] = testCases.map((tc, idx) => ({
          testCaseIndex: idx + 1,
          verdict: 'COMPILE_ERROR' as SubmissionVerdict,
          input: tc.input,
          expectedOutput: this.normalizeOutput(tc.expectedOutput),
          actualOutput: '',
          stderr: compileErr.trimEnd(),
          executionTimeMs: 0,
        }));

        return {
          passed: false,
          totalCount: testCases.length,
          passedCount: 0,
          results,
        };
      }

      // 6. Parse results for each testcase
      const results: TestCaseEvaluationResult[] = [];
      let passedCount = 0;

      for (let i = 0; i < testCases.length; i++) {
        let exitCode = 0;
        try {
          const statusStr = await fs.readFile(path.join(outputsDir, `${i}.status`), 'utf8');
          exitCode = parseInt(statusStr.trim(), 10) || 0;
        } catch {
          exitCode = 1;
        }

        let executionTimeMs = 0;
        try {
          const timeStr = await fs.readFile(path.join(outputsDir, `${i}.time`), 'utf8');
          executionTimeMs = parseInt(timeStr.trim(), 10) || 0;
        } catch {}

        let actualOutput = '';
        try {
          actualOutput = await fs.readFile(path.join(outputsDir, `${i}.out`), 'utf8');
          if (actualOutput.length > 65536) {
            actualOutput = actualOutput.slice(0, 65536) + '\n[Output truncated]';
          }
        } catch {}

        let stderr = '';
        try {
          stderr = await fs.readFile(path.join(outputsDir, `${i}.err`), 'utf8');
          if (stderr.length > 65536) {
            stderr = stderr.slice(0, 65536) + '\n[Stderr truncated]';
          }
        } catch {}

        const normalizedActual = this.normalizeOutput(actualOutput);
        const normalizedExpected = this.normalizeOutput(testCases[i].expectedOutput);

        let verdict: SubmissionVerdict;
        if (exitCode === 124) {
          verdict = 'TIME_LIMIT_EXCEEDED';
        } else if (exitCode === 137) {
          verdict = 'MEMORY_LIMIT_EXCEEDED';
        } else if (exitCode !== 0) {
          verdict = 'RUNTIME_ERROR';
        } else if (normalizedActual === normalizedExpected) {
          verdict = 'ACCEPTED';
          passedCount++;
        } else {
          verdict = 'WRONG_ANSWER';
        }

        results.push({
          testCaseIndex: i + 1,
          verdict,
          input: testCases[i].input,
          expectedOutput: normalizedExpected,
          actualOutput: normalizedActual,
          stderr: stderr.trimEnd(),
          executionTimeMs,
        });
      }

      return {
        passed: passedCount === testCases.length && testCases.length > 0,
        totalCount: testCases.length,
        passedCount,
        results,
      };
    } catch (err: any) {
      if (err instanceof BadRequestException) {
        throw err;
      }
      throw new InternalServerErrorException(err.message || 'Execution failed');
    } finally {
      await fs.rm(tempDir, { recursive: true, force: true }).catch(() => {});
    }
  }

  async formatCode(options: {
    language: FormatLanguage;
    code: string;
  }): Promise<FormatResultDto> {
    const { language, code } = options;
    if (!code || !code.trim()) {
      return { code: code || '', formatted: true };
    }

    try {
      switch (language) {
        case FormatLanguage.PYTHON: {
          const { format } = await import('@wasm-fmt/ruff_fmt');
          const formatted = format(code);
          return { code: formatted, formatted: true };
        }

        case FormatLanguage.CPP: {
          // @ts-ignore
          const { format } = await import('@wasm-fmt/clang-format');
          const formatted = format(code, 'solution.cpp');
          return { code: formatted, formatted: true };
        }

        case FormatLanguage.JAVA: {
          // @ts-ignore
          const { format } = await import('@wasm-fmt/clang-format');
          const formatted = format(code, 'Solution.java');
          return { code: formatted, formatted: true };
        }

        case FormatLanguage.JAVASCRIPT:
        case FormatLanguage.TYPESCRIPT: {
          const prettier = await import('prettier');
          const formatted = await prettier.format(code, {
            parser: language === FormatLanguage.TYPESCRIPT ? 'typescript' : 'babel',
          });
          return { code: formatted, formatted: true };
        }

        default:
          return { code, formatted: false, error: `Unsupported language for formatting: ${language}` };
      }
    } catch (err: any) {
      return { code, formatted: false, error: err.message || 'Formatting failed' };
    }
  }
}
