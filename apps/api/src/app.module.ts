import { Module } from '@nestjs/common';
import { DrizzleModule } from './drizzle/drizzle.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProfilesModule } from './profiles/profiles.module';
import { MailerModule } from './mailer/mailer.module';
import { RedisModule } from './redis/redis.module';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    LoggerModule.forRoot({
      pinoHttp: {
        customProps: (req, res) => ({
          context: 'HTTP',
        }),
        transport: {
          target: 'pino-pretty',
        },
      },
    }),
    DrizzleModule,
    UsersModule,
    AuthModule,
    ProfilesModule,
    MailerModule,
    RedisModule,
  ],
})
export class AppModule {}
