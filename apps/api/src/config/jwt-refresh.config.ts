import { registerAs } from '@nestjs/config';
import { JwtSignOptions } from '@nestjs/jwt';

export default registerAs(
  'jwt-refresh',
  (): JwtSignOptions => ({
    secret: process.env.JWT_REFRESH_SECRET!,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN! as any,
  }),
);
