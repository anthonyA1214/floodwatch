import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { DrizzleModule } from '../drizzle/drizzle.module';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';

@Module({
  imports: [HttpModule, DrizzleModule],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}