import { pgEnum, pgTable, timestamp, text, uuid } from 'drizzle-orm/pg-core';
import { doublePrecision } from 'drizzle-orm/pg-core';

export const safetyTypeEnum = pgEnum('safety_type', ['shelter', 'hospital']);

export const safety = pgTable('safety', {
  id: uuid('id').defaultRandom().primaryKey(),
  latitude: doublePrecision('latitude').notNull(),
  longitude: doublePrecision('longitude').notNull(),
  location: text('location').notNull().default('Unknown location'),
  address: text('address'),
  description: text('description'),
  image: text('image'),
  imagePublicId: text('image_public_id'),
  type: safetyTypeEnum().notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
