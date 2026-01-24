import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number().default(4001),
  FRONTEND_URL: z.url(),
  DATABASE_URL: z.url(),
  JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters'),
  JWT_EXPIRES_IN: z.string().default('7d'),
});

export const env = envSchema.parse(process.env);
