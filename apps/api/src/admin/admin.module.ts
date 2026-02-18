import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [DrizzleModule, UsersModule],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
