import {
  pgTable,
  serial,
  integer,
  timestamp,
  unique,
} from 'drizzle-orm/pg-core';
import { users } from './users.schema';
import { comments } from './comments.schema';
import { voteTypeEnum } from './report_votes.schema';

export const commentVotes = pgTable(
  'comment_votes',
  {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => users.id, {
      onDelete: 'cascade',
    }),
    commentId: integer('comment_id').references(() => comments.id, {
      onDelete: 'cascade',
    }),
    voteType: voteTypeEnum('vote_type').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
  },
  (t) => [unique().on(t.userId, t.commentId)],
);
