import { pgTable, serial, text, timestamp, unique } from 'drizzle-orm/pg-core';

export const news = pgTable(
  'news',
  {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    description: text('description').notNull(),
    url: text('url').notNull(),
    image: text('image_url'),
    publishedAt: timestamp('published_at').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
  },
  (t) => [unique().on(t.url)],
);
