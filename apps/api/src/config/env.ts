import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number().default(4001),
  DATABASE_URL: z.string().min(32, 'JWT_SECRET must be at least 32 characters'),
  JWT_SECRET: z.string().default('7d'),
});

export const env = envSchema.parse(process.env);
