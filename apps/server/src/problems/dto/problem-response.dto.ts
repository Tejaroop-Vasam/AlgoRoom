import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ProblemListItemDto {
  @ApiProperty({ example: 1, description: 'Unique problem identifier' })
  id: number;

  @ApiProperty({ example: 'Two Sum', description: 'Problem title' })
  title: string;

  @ApiProperty({ example: 'EASY', enum: ['EASY', 'MEDIUM', 'HARD'], description: 'Difficulty level' })
  difficulty: string;

  @ApiProperty({ description: 'Created timestamp' })
  createdAt: Date;

  @ApiProperty({ description: 'Updated timestamp' })
  updatedAt: Date;
}

export class ProblemsListResponseDto {
  @ApiProperty({ type: [ProblemListItemDto], description: 'List of problems matching the query' })
  problems: ProblemListItemDto[];

  @ApiProperty({ example: 75, description: 'Total number of problems matching the query' })
  total: number;

  @ApiProperty({ example: 1, description: 'Current page number' })
  page: number;

  @ApiProperty({ example: 20, description: 'Items per page limit' })
  limit: number;

  @ApiProperty({ example: 4, description: 'Total number of pages' })
  totalPages: number;
}

export class SampleTestCaseDto {
  @ApiPropertyOptional()
  id?: number;

  @ApiProperty()
  input: string;

  @ApiProperty()
  expectedOutput: string;

  @ApiPropertyOptional()
  explanation?: string;
}

export class ProblemDetailResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Two Sum' })
  title: string;

  @ApiProperty({ example: 'Given an array of integers nums and an integer target...' })
  description: string;

  @ApiProperty({ example: 'EASY', enum: ['EASY', 'MEDIUM', 'HARD'] })
  difficulty: string;

  @ApiProperty({ type: [String], example: ['2 <= nums.length <= 104'] })
  constraints: string[];

  @ApiProperty({ type: [String], example: ['A really brute force way would be to search for all possible pairs...'] })
  hints: string[];

  @ApiProperty({ type: [SampleTestCaseDto] })
  sampleTestCases: SampleTestCaseDto[];

  @ApiProperty({ type: Object, additionalProperties: { type: 'string' } })
  starterTemplates: Record<string, string>;

  @ApiProperty({ type: Object, additionalProperties: { type: 'string' } })
  starterCodes: Record<string, string>;

  @ApiProperty({ example: 2000 })
  timeLimitMs: number;

  @ApiProperty({ example: 256 })
  memoryLimitMb: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
