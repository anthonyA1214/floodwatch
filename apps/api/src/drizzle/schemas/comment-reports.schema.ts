import {
  pgTable,
  serial,
  integer,
  timestamp,
  unique,
  text,
} from 'drizzle-orm/pg-core';
import { users } from './users.schema';
import { comments } from './comments.schema';

export const commentReports = pgTable(
  'comment_reports',
  {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => users.id, {
      onDelete: 'cascade',
    }),
    commentId: integer('comment_id').references(() => comments.id, {
      onDelete: 'cascade',
    }),
    reason: text('reason'),
    createdAt: timestamp('created_at').defaultNow(),
  },
  (t) => [unique().on(t.userId, t.commentId)],
);
