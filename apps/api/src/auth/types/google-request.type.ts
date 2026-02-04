import { Request } from 'express';

export interface GoogleRequest extends Request {
  user: {
    googleId: string;
    email: string;
    firstName: string;
    lastName: string;
    profilePicture: string;
  };
}
