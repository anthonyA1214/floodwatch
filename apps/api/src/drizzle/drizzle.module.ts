import { Module } from '@nestjs/common';
import { DRIZZLE } from './drizzle-connection';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
// import { neon } from '@neondatabase/serverless';
// import { drizzle, NeonHttpDatabase } from 'drizzle-orm/neon-http';
import * as schema from './schemas';

@Module({
  providers: [
    {
      provide: DRIZZLE,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const pool = new Pool({
          connectionString: configService.getOrThrow('DATABASE_URL'),
          ssl: true,
        });
        const db: NodePgDatabase<typeof schema> = drizzle(pool, { schema });
        // const sql = neon(configService.getOrThrow('DATABASE_URL'));
        // const db: NeonHttpDatabase<typeof schema> = drizzle(sql, { schema });
        return db;
      },
    },
  ],
  exports: [DRIZZLE],
})
export class DrizzleModule {}
