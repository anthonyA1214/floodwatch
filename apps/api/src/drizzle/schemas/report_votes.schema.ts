import {
  serial,
  pgTable,
  integer,
  uuid,
  pgEnum,
  timestamp,
  unique,
} from 'drizzle-orm/pg-core';
import { users } from './users.schema';
import { reports } from './reports.schema';

export const voteTypeEnum = pgEnum('vote_type', ['up', 'down']);

export const reportVotes = pgTable(
  'report_votes',
  {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => users.id, {
      onDelete: 'cascade',
    }),
    reportId: uuid('report_id').references(() => reports.id, {
      onDelete: 'cascade',
    }),
    voteType: voteTypeEnum('vote_type').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
  },
  (t) => [unique().on(t.userId, t.reportId)],
);
