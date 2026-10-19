import { ApiProperty } from '@nestjs/swagger';

export class ExecutionResultDto {
  @ApiProperty({
    enum: ['SUCCESS', 'TIME_LIMIT_EXCEEDED', 'MEMORY_LIMIT_EXCEEDED', 'COMPILE_ERROR', 'RUNTIME_ERROR'],
    example: 'SUCCESS',
  })
  status: 'SUCCESS' | 'TIME_LIMIT_EXCEEDED' | 'MEMORY_LIMIT_EXCEEDED' | 'COMPILE_ERROR' | 'RUNTIME_ERROR';

  @ApiProperty({ example: 'true' })
  stdout: string;

  @ApiProperty({ example: '' })
  stderr: string;

  @ApiProperty({ example: 45 })
  executionTimeMs: number;
}

export class TestCaseEvaluationResultDto {
  @ApiProperty({ example: 1 })
  testCaseIndex: number;

  @ApiProperty({
    enum: ['ACCEPTED', 'WRONG_ANSWER', 'TIME_LIMIT_EXCEEDED', 'MEMORY_LIMIT_EXCEEDED', 'COMPILE_ERROR', 'RUNTIME_ERROR'],
    example: 'ACCEPTED',
  })
  verdict: 'ACCEPTED' | 'WRONG_ANSWER' | 'TIME_LIMIT_EXCEEDED' | 'MEMORY_LIMIT_EXCEEDED' | 'COMPILE_ERROR' | 'RUNTIME_ERROR';

  @ApiProperty({ example: 's = "()"' })
  input: string;

  @ApiProperty({ example: 'true' })
  expectedOutput: string;

  @ApiProperty({ example: 'true' })
  actualOutput: string;

  @ApiProperty({ example: '' })
  stderr: string;

  @ApiProperty({ example: 45 })
  executionTimeMs: number;
}

export class SubmissionEvaluationResultDto {
  @ApiProperty({ example: true })
  passed: boolean;

  @ApiProperty({ example: 5 })
  totalCount: number;

  @ApiProperty({ example: 5 })
  passedCount: number;

  @ApiProperty({ type: [TestCaseEvaluationResultDto] })
  results: TestCaseEvaluationResultDto[];
}
