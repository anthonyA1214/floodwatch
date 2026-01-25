import jwt from 'jsonwebtoken';

export interface JwtPayload {
  sub: number;
  role: string;
  iat: number;
  exp: number;
}

export function decodeJwt(token: string): JwtPayload | null {
  try {
    return jwt.decode(token) as unknown as JwtPayload;
  } catch {
    return null;
  }
}
