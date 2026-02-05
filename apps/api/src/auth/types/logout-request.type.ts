import { Request } from 'express';

export interface LogoutRequest extends Request {
  user: {
    id: number;
  };
  cookies: {
    device_id: string;
  };
}
