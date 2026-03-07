import {
  serial,
  pgTable,
  integer,
  pgEnum,
  timestamp,
  unique,
} from 'drizzle-orm/pg-core';
import { users } from './users.schema';
import { reports } from './reports.schema';

export const reportConfirmationActionEnum = pgEnum('vote_type', [
  'confirm',
  'deny',
]);

export const reportConfirmations = pgTable(
  'report_confirmations',
  {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => users.id, {
      onDelete: 'cascade',
    }),
    reportId: integer('report_id').references(() => reports.id, {
      onDelete: 'cascade',
    }),
    action: reportConfirmationActionEnum().notNull(),
    createdAt: timestamp('created_at').defaultNow(),
  },
  (t) => [unique().on(t.userId, t.reportId)],
);
