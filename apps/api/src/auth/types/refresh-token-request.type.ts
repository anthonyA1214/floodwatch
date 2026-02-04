import { Request } from 'express';

export interface RefreshTokenRequest extends Request {
  user: {
    id: number;
    role: string;
  };
  cookies: {
    refresh_token: string;
    device_id: string;
  };
}
