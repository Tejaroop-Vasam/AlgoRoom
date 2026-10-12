import { integer, timestamp } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const primaryKeyId = {
  id: integer('id').primaryKey().generatedByDefaultAsIdentity(),
};

export const id = primaryKeyId;

export const timestamps = {
  created_at: timestamp('created_at', { withTimezone: true })
    .default(sql`current_timestamp`)
    .notNull(),
  updated_at: timestamp('updated_at', { withTimezone: true })
    .default(sql`current_timestamp`)
    .notNull(),
};

export const baseEntity = {
  ...primaryKeyId,
  ...timestamps,
};
