import { relations } from 'drizzle-orm';
import { users } from './schemas/users.schema';
import { profileInfo } from './schemas/profile-info.schema';

export const userRelation = relations(users, ({ one }) => ({
  profile: one(profileInfo, {
    fields: [users.id],
    references: [profileInfo.userId],
  }),
}));

export const profileRelation = relations(profileInfo, ({ one }) => ({
  user: one(users, {
    fields: [profileInfo.userId],
    references: [users.id],
  }),
}));
