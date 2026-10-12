import { pgTable, integer, varchar, text, jsonb } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { primaryKeyId, timestamps } from './common.schema';

export interface SampleTestCase {
  id?: number;
  input: string;
  expectedOutput: string;
  explanation?: string;
}

export interface TestCaseItem {
  id: number;
  input: string;
  expectedOutput: string;
  isHidden?: boolean;
  explanation?: string;
}

export interface LanguageTemplate {
  starterCode: string;
  driverCode?: string;
}

export type ProblemCodeTemplates = {
  python?: LanguageTemplate;
  cpp?: LanguageTemplate;
  java?: LanguageTemplate;
  [lang: string]: LanguageTemplate | undefined;
};

export const problems = pgTable('problems', {
  ...primaryKeyId,
  title: varchar('title', { length: 255 }).notNull().unique(),
  description: text('description').notNull(),
  difficulty: varchar('difficulty', { length: 50 }).notNull().default('EASY'),
  constraints: jsonb('constraints').$type<string[]>().default(sql`'[]'::jsonb`).notNull(),
  hints: jsonb('hints').$type<string[]>().default(sql`'[]'::jsonb`).notNull(),
  sample_test_cases: jsonb('sample_test_cases').$type<SampleTestCase[]>().default(sql`'[]'::jsonb`).notNull(),
  starter_templates: jsonb('starter_templates').$type<Record<string, string>>().default(sql`'{}'::jsonb`).notNull(),
  code_templates: jsonb('code_templates').$type<ProblemCodeTemplates>().default(sql`'{}'::jsonb`).notNull(),
  test_cases_r2_key: varchar('test_cases_r2_key', { length: 500 }),
  time_limit_ms: integer('time_limit_ms').default(2000).notNull(),
  memory_limit_mb: integer('memory_limit_mb').default(256).notNull(),
  ...timestamps,
});

export type Problem = typeof problems.$inferSelect;
export type NewProblem = typeof problems.$inferInsert;
