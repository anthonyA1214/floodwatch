import { defineConfig } from 'drizzle-kit';
import { env } from 'src/config/env';

export default defineConfig({
  out: './drizzle',
  schema: './src/drizzle/schemas/**.schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
