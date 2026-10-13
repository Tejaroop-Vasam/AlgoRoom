import { Problem, TestCaseItem, SampleTestCase, ProblemCodeTemplates } from '../../database/schema/problems.schema';

export interface ProblemListItem {
  id: number;
  title: string;
  difficulty: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProblemDetailResponse {
  id: number;
  title: string;
  description: string;
  difficulty: string;
  constraints: string[];
  hints: string[];
  sampleTestCases: SampleTestCase[];
  starterTemplates: Record<string, string>;
  starterCodes: Record<string, string>;
  timeLimitMs: number;
  memoryLimitMb: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProblemsListResponse {
  problems: ProblemListItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
