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

    const langConfig = SUPPORTED_LANGUAGES[language as SupportedLanguage];
    if (!langConfig) {
      throw new BadRequestException(
        `Unsupported language "${language}". Supported: ${Object.keys(SUPPORTED_LANGUAGES).join(', ')}`,
      );
    }
    const timeoutSec = Math.max(1, Math.ceil(timeLimitMs / 1000));

    const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'eligible-run-'));

    try {
      await fs.writeFile(path.join(tempDir, langConfig.filename), code ?? '', 'utf8');
      await fs.writeFile(path.join(tempDir, 'input.txt'), input ?? '', 'utf8');

      const runCommand = langConfig.buildRunCommand(timeoutSec);

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
        `${tempDir}:/workspace:ro`,
        langConfig.image,
        'sh',
        '-c',
        runCommand,
      ];

      const startTime = Date.now();
      let stdout = '';
      let stderr = '';
      let exitCode: number | string = 0;

      try {
        const hostProcessTimeout = timeLimitMs + 3000;
        const extendedPath = [
          path.join(os.homedir(), '.docker', 'bin'),
          '/usr/local/bin',
          '/opt/homebrew/bin',
          process.env.PATH,
        ]
          .filter(Boolean)
          .join(':');

        const result = await execFileAsync('docker', dockerArgs, {
          timeout: hostProcessTimeout,
          maxBuffer: 1024 * 1024,
          env: {
            ...process.env,
            PATH: extendedPath,
          },
        });
        stdout = result.stdout as string;
        stderr = result.stderr as string;
      } catch (err: any) {
        exitCode = err.code ?? (err.killed ? 124 : 1);
        stdout = err.stdout ?? '';
        stderr = err.stderr ?? err.message ?? '';
      }

      const executionTimeMs = Date.now() - startTime;

      let status: ExecutionStatus = 'SUCCESS';
      if (exitCode === 124 || exitCode === 'ETIMEDOUT') {
        status = 'TIME_LIMIT_EXCEEDED';
      } else if (exitCode === 137) {
        status = 'MEMORY_LIMIT_EXCEEDED';
      } else if (exitCode !== 0) {
        const isCompileError =
          (language === 'cpp' && stderr.includes('error:')) ||
          (language === 'java' && (stderr.includes('error:') || stderr.includes('javac')));
        status = isCompileError ? 'COMPILE_ERROR' : 'RUNTIME_ERROR';
      }

      return {
        status,
        stdout: stdout.trimEnd(),
        stderr: stderr.trimEnd(),
        executionTimeMs,
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

  async evaluateTestCases(options: EvaluateTestCasesOptions): Promise<SubmissionEvaluationResult> {
    const {
      language,
      code,
      testCases = [],
      timeLimitMs = 2000,
      memoryLimitMb = 256,
    } = options;

    const results: TestCaseEvaluationResult[] = [];
    let passedCount = 0;

    for (let i = 0; i < testCases.length; i++) {
      const { input = '', expectedOutput = '' } = testCases[i];
      const execResult = await this.executeCode({
        language,
        code,
        input,
        timeLimitMs,
        memoryLimitMb,
      });

      const normalizedActual = this.normalizeOutput(execResult.stdout);
      const normalizedExpected = this.normalizeOutput(expectedOutput);

      let verdict: SubmissionVerdict;
      if (execResult.status === 'SUCCESS') {
        if (normalizedActual === normalizedExpected) {
          verdict = 'ACCEPTED';
          passedCount++;
        } else {
          verdict = 'WRONG_ANSWER';
        }
      } else {
        verdict = execResult.status;
      }

      results.push({
        testCaseIndex: i + 1,
        verdict,
        input,
        expectedOutput: normalizedExpected,
        actualOutput: normalizedActual,
        stderr: execResult.stderr,
        executionTimeMs: execResult.executionTimeMs,
      });

      if (verdict === 'COMPILE_ERROR') {
        break;
      }
    }

    return {
      passed: passedCount === testCases.length && testCases.length > 0,
      totalCount: testCases.length,
      passedCount,
      results,
    };
  }
}
