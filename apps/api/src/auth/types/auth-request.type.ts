import { Request } from 'express';
import type { InferSelectModel } from 'drizzle-orm';
import { users } from 'src/drizzle/schemas/users.schema';

export type User = InferSelectModel<typeof users>;

export interface AuthRequest extends Request {
  user: User;
}

export interface RefreshTokenRequest extends Request {
  user: {
    id: number;
  };
  cookies: {
    refresh_token: string;
  };
}
