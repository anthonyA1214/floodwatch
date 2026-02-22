import {
  pgTable,
  varchar,
  pgEnum,
  timestamp,
  serial,
  index,
} from 'drizzle-orm/pg-core';

export const roleEnum = pgEnum('role', ['user', 'admin']);
export const usersStatusEnum = pgEnum('user_status', ['active', 'blocked']);

export const users = pgTable(
  'users',
  {
    id: serial('id').primaryKey(),
    email: varchar('email', { length: 255 }).unique().notNull(),
    role: roleEnum().notNull().default('user'),
    status: usersStatusEnum().notNull().default('active'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
  },
  (t) => [index('email_idx').on(t.email)],
);
