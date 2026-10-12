import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RunnerService } from './runner.service';
import { ProblemsService } from '../problems/problems.service';
import { RunCodeDto } from './dto/run-code.dto';
import { SubmitCodeDto } from './dto/submit-code.dto';

@ApiTags('Code Runner')
@Controller('api')
export class RunnerController {
  constructor(
    private readonly runnerService: RunnerService,
    private readonly problemsService: ProblemsService,
  ) {}

  @Post('run')
  @ApiOperation({ summary: 'Execute code against custom input or problem sample test case' })
  async run(@Body() runCodeDto: RunCodeDto) {
    let executableCode = runCodeDto.code;
    let input = runCodeDto.input ?? '';
    let timeLimitMs: number | undefined;
    let memoryLimitMb: number | undefined;

    if (runCodeDto.problemId) {
      const problem = await this.problemsService.getProblemEntity(runCodeDto.problemId);
      executableCode = this.problemsService.assembleExecutableCode(
        problem,
        runCodeDto.language,
        runCodeDto.code,
      );

      if (!input && problem.sample_test_cases?.length > 0) {
        input = problem.sample_test_cases[0].input;
      }

      timeLimitMs = problem.time_limit_ms;
      memoryLimitMb = problem.memory_limit_mb;
    }

    return this.runnerService.executeCode({
      language: runCodeDto.language,
      code: executableCode,
      input,
      timeLimitMs,
      memoryLimitMb,
    });
  }

  @Post('submit')
  @ApiOperation({ summary: 'Submit solution to evaluate against full test cases from storage/DB' })
  async submit(@Body() submitCodeDto: SubmitCodeDto) {
    const problem = await this.problemsService.getProblemEntity(submitCodeDto.problemId);
    const executableCode = this.problemsService.assembleExecutableCode(
      problem,
      submitCodeDto.language,
      submitCodeDto.code,
    );

    const r2TestCases = await this.problemsService.getTestCases(submitCodeDto.problemId, {
      includeHidden: true,
    });

    const testCases = r2TestCases.map((tc) => ({
      input: tc.input,
      expectedOutput: tc.expectedOutput,
    }));

    return this.runnerService.evaluateTestCases({
      language: submitCodeDto.language,
      code: executableCode,
      testCases,
      timeLimitMs: problem.time_limit_ms,
      memoryLimitMb: problem.memory_limit_mb,
    });
  }
}
