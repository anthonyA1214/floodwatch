import { pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const news = pgTable('news', {
  id: serial('id').primaryKey(),
  externalUrl: text('external_url').unique().notNull(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  imageUrl: text('image_url'),
  source: varchar('source', { length: 255 }).notNull(),
  publishedAt: timestamp('published_at').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});