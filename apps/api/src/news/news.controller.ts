import { Controller, Get } from '@nestjs/common';
import { NewsService } from './news.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Public()
  @Get()
  async getNews() {
    return this.newsService.getNews();
  }

  @Roles('admin')
  @Get('fetch')
  async fetchNews() {
    return await this.newsService.fetchAndStoreFloodNews();
  }
}
