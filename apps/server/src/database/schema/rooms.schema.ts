import { Injectable, OnModuleInit } from '@nestjs/common';
import { sql } from 'drizzle-orm';
import { relations } from 'drizzle-orm/relations';
import {
  pgTable,
  varchar,
  integer,
  boolean,
  timestamp,
  pgEnum,
} from 'drizzle-orm/pg-core';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

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

export const roomModeEnum = pgEnum('room_mode', ['RACE', 'COOP']);
export const roomStatusEnum = pgEnum('room_status', ['LOBBY', 'IN_PROGRESS', 'FINISHED']);
export const bufferVisibilityEnum = pgEnum('buffer_visibility', ['OBSCURED', 'HOST_ONLY', 'OPEN']);

export const rooms = pgTable('rooms', {
  ...baseEntity,
  code: varchar('code', { length: 6 }).notNull().unique(),
  name: varchar('name', { length: 255 }).notNull(),
  mode: roomModeEnum('mode').notNull(),
  status: roomStatusEnum('status').default('LOBBY').notNull(),
  hostId: varchar('host_id', { length: 255 }).notNull(),
  problemIds: integer('problem_ids').array().notNull(),
  maxParticipants: integer('max_participants').default(4).notNull(),
  hiddenTestCases: boolean('hidden_test_cases').default(true).notNull(),
  bufferVisibility: bufferVisibilityEnum('buffer_visibility').default('OBSCURED').notNull(),
});

export const roomParticipants = pgTable('room_participants', {
  ...baseEntity,
  roomId: integer('room_id')
    .notNull()
    .references(() => rooms.id, { onDelete: 'cascade' }),
  userId: varchar('user_id', { length: 255 }).notNull(),
  username: varchar('username', { length: 255 }).notNull(),
  isHost: boolean('is_host').default(false).notNull(),
  socketId: varchar('socket_id', { length: 255 }),
});

export const roomsRelations = relations(rooms, ({ many }) => ({
  participants: many(roomParticipants),
}));

export const roomParticipantsRelations = relations(roomParticipants, ({ one }) => ({
  room: one(rooms, {
    fields: [roomParticipants.roomId],
    references: [rooms.id],
  }),
}));

export const schema = {
  rooms,
  roomParticipants,
  roomsRelations,
  roomParticipantsRelations,
  roomModeEnum,
  roomStatusEnum,
  bufferVisibilityEnum,
};

@Injectable()
export class DrizzleService implements OnModuleInit {
  public db: NodePgDatabase<typeof schema>;

  async onModuleInit() {
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
    this.db = drizzle(pool, { schema });
  }
}
