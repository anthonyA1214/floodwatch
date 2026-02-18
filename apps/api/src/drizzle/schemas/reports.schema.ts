import {
  integer,
  pgEnum,
  pgTable,
  serial,
  timestamp,
  text,
} from 'drizzle-orm/pg-core';
import { users } from './users.schema';
import { doublePrecision } from 'drizzle-orm/pg-core';

export const severityEnum = pgEnum('severity', ['low', 'medium', 'high']);

export const reports = pgTable('reports', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id, {
    onDelete: 'cascade',
  }),
  latitude: doublePrecision('latitude').notNull(),
  longitude: doublePrecision('longitude').notNull(),
  location: text('location').notNull(),
  range: integer('range').notNull(),
  description: text('description'),
  image: text('image'),
  severity: severityEnum().notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
