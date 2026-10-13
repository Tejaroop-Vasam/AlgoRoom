import { Injectable } from '@nestjs/common';
import { InjectDrizzle } from '@nestjs/drizzle';
import { desc, eq, SQL, sql } from 'drizzle-orm';
import { DrizzleDB, problems, Problem, NewProblem } from '../database/schema';

export interface FindProblemsOptions {
  where?: SQL;
  limit?: number;
  offset?: number;
}

@Injectable()
export class ProblemsRepository {
  constructor(@InjectDrizzle() private readonly db: DrizzleDB) {}

  async findById(id: number): Promise<Problem | null> {
    const [problem] = await this.db
      .select()
      .from(problems)
      .where(eq(problems.id, id))
      .limit(1);

    return problem || null;
  }

  async findMany(options: FindProblemsOptions = {}): Promise<{ problems: Problem[]; total: number }> {
    const { where, limit = 20, offset = 0 } = options;

    const [totalResult] = await this.db
      .select({ count: sql<number>`count(*)` })
      .from(problems)
      .where(where);

    const total = Number(totalResult?.count || 0);

    const rows = await this.db
      .select()
      .from(problems)
      .where(where)
      .orderBy(desc(problems.created_at))
      .limit(limit)
      .offset(offset);

    return {
      problems: rows,
      total,
    };
  }

  async create(data: NewProblem): Promise<Problem> {
    const [created] = await this.db.insert(problems).values(data).returning();
    return created;
  }

  async update(id: number, data: Partial<NewProblem>): Promise<Problem | null> {
    const [updated] = await this.db
      .update(problems)
      .set(data)
      .where(eq(problems.id, id))
      .returning();

    return updated || null;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.db.delete(problems).where(eq(problems.id, id)).returning();
    return result.length > 0;
  }
}
