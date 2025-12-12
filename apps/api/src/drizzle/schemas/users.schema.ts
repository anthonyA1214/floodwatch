import { pgTable, integer, varchar, text } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  email: varchar({ length: 255 }).unique().notNull(),
  password: text().notNull(),
});
