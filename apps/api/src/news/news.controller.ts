import { Controller, Get, Post, Delete } from '@nestjs/common';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  async getLatestNews() {
    return this.newsService.getLatestNews();
  }

  @Post('fetch')
  async triggerFetch() {
    await this.newsService.fetchAndStoreFloodNews();
    return { message: 'News fetch triggered successfully.' };
  }

  @Delete()
  async clearNews() {
    return this.newsService.clearNews();
  }
}