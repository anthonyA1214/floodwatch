import {
  pgTable,
  serial,
  integer,
  timestamp,
  uniqueIndex,
} from 'drizzle-orm/pg-core';
import { users } from './users.schema';
import { varchar } from 'drizzle-orm/pg-core';

export const refreshTokens = pgTable(
  'refresh_tokens',
  {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => users.id, {
      onDelete: 'cascade',
    }),
    deviceId: varchar('device_id', { length: 255 }).notNull(),
    hashedToken: varchar('hashed_token', { length: 255 }).notNull(),
    expiresAt: timestamp('expires_at').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
  },
  (t) => [uniqueIndex().on(t.userId, t.deviceId)],
);
