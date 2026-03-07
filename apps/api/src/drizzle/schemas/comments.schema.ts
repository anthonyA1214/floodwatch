import { pgTable, serial, integer, text, timestamp } from 'drizzle-orm/pg-core';
import { users } from './users.schema';
import { reports } from './reports.schema';

export const comments = pgTable('comments', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id, {
    onDelete: 'cascade',
  }),
  reportId: integer('report_id').references(() => reports.id, {
    onDelete: 'cascade',
  }),
  content: text('content'),
  image: text('image'),
  imagePublicId: text('image_public_id'),
  reportsCount: integer('reports_count').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
