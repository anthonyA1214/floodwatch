import { registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export default registerAs(
  'jwt',
  (): JwtModuleOptions => ({
    secret: process.env.JWT_ACCESS_SECRET!,
    signOptions: {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN! as any,
    },
  }),
);
