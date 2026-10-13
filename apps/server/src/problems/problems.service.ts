import {
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { and, eq, ilike, sql } from 'drizzle-orm';
import { problems, Problem, TestCaseItem } from '../database/schema/problems.schema';
import { StorageService } from '../storage/storage.service';
import { ProblemQueryDto } from './dto/problem-query.dto';
import { ProblemsRepository } from './problems.repository';
import {
  ProblemDetailResponse,
  ProblemListItem,
  ProblemsListResponse,
} from './interfaces/problem.interface';

@Injectable()
export class ProblemsService {
  private readonly logger = new Logger(ProblemsService.name);

  constructor(
    private readonly problemsRepository: ProblemsRepository,
    private readonly storageService: StorageService,
  ) {}

  private mapToDetail(problem: Problem): ProblemDetailResponse {
    const starterCodes: Record<string, string> = {};

    if (problem.code_templates) {
      for (const [lang, tmpl] of Object.entries(problem.code_templates)) {
        if (tmpl?.starterCode) {
          starterCodes[lang] = tmpl.starterCode;
        }
      }
    }

    for (const [lang, code] of Object.entries(problem.starter_templates || {})) {
      if (!starterCodes[lang]) {
        starterCodes[lang] = code;
      }
    }

    return {
      id: problem.id,
      title: problem.title,
      description: problem.description,
      difficulty: problem.difficulty,
      constraints: problem.constraints,
      hints: problem.hints,
      sampleTestCases: problem.sample_test_cases,
      starterTemplates: starterCodes,
      starterCodes,
      timeLimitMs: problem.time_limit_ms,
      memoryLimitMb: problem.memory_limit_mb,
      createdAt: problem.created_at,
      updatedAt: problem.updated_at,
    };
  }

  private mapToListItem(problem: Problem): ProblemListItem {
    return {
      id: problem.id,
      title: problem.title,
      difficulty: problem.difficulty,
      createdAt: problem.created_at,
      updatedAt: problem.updated_at,
    };
  }

  async findAll(query: ProblemQueryDto): Promise<ProblemsListResponse> {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const offset = (page - 1) * limit;

    const conditions = [];

    if (query.difficulty) {
      conditions.push(eq(problems.difficulty, query.difficulty));
    }

    if (query.search) {
      conditions.push(
        sql`(${ilike(problems.title, `%${query.search}%`)} OR ${ilike(problems.description, `%${query.search}%`)})`,
      );
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const { problems: rows, total } = await this.problemsRepository.findMany({
      where: whereClause,
      limit,
      offset,
    });

    return {
      problems: rows.map((r) => this.mapToListItem(r)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getProblemEntity(id: number): Promise<Problem> {
    const problem = await this.problemsRepository.findById(id);

    if (!problem) {
      throw new NotFoundException(`Problem #${id} not found`);
    }

    return problem;
  }

  async findById(id: number): Promise<ProblemDetailResponse> {
    const problem = await this.getProblemEntity(id);
    return this.mapToDetail(problem);
  }

  assembleExecutableCode(problem: Problem, language: string, userCode: string): string {
    const template = problem.code_templates?.[language];
    if (!template?.driverCode) {
      return userCode;
    }

    const driver = template.driverCode;

    if (driver.includes('// __USER_CODE__')) {
      return driver.replace('// __USER_CODE__', userCode);
    }
    if (driver.includes('# __USER_CODE__')) {
      return driver.replace('# __USER_CODE__', userCode);
    }
    if (driver.includes('{{USER_CODE}}')) {
      return driver.replace('{{USER_CODE}}', userCode);
    }

    return `${userCode}\n\n${driver}`;
  }

  async getTestCases(
    id: number,
    options: { includeHidden?: boolean } = { includeHidden: false },
  ): Promise<TestCaseItem[]> {
    const problem = await this.getProblemEntity(id);

    if (!problem.test_cases_r2_key) {
      return (problem.sample_test_cases || []).map((stc, idx) => ({
        id: stc.id || idx + 1,
        input: stc.input,
        expectedOutput: stc.expectedOutput,
        isHidden: false,
        explanation: stc.explanation,
      }));
    }

    const testCases = await this.storageService.getTestCases(problem.test_cases_r2_key);

    if (options.includeHidden) {
      return testCases;
    }

    return testCases.filter((tc) => !tc.isHidden);
  }
}
