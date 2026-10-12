import { pgTable, uuid, varchar, boolean } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { timestamps } from './common.schema';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
  username: varchar('username', { length: 50 }).notNull(),
  email: varchar('email', { length: 300 }).notNull().unique(),
  hpassword: varchar('hpassword', { length: 300 }),
  google_id: varchar('google_id', { length: 300 }).unique(),
  is_admin: boolean('is_admin').default(false).notNull(),
  ...timestamps,
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
