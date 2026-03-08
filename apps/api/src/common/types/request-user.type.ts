import { InferSelectModel } from 'drizzle-orm';
import { users } from 'src/drizzle/schemas';

export type RequestUser = Pick<
  InferSelectModel<typeof users>,
  'id' | 'email' | 'role'
>;
