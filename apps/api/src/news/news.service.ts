import { Injectable, Logger, Inject } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { DRIZZLE } from '../drizzle/drizzle-connection';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../drizzle/schemas';
import { news } from '../drizzle/schemas';
import { desc } from 'drizzle-orm';

@Injectable()
export class NewsService {
  private readonly logger = new Logger(NewsService.name);
  private readonly GNEWS_URL = 'https://gnews.io/api/v4/search';

  constructor(
    @Inject(DRIZZLE) private readonly db: NodePgDatabase<typeof schema>,
    private readonly httpService: HttpService,
  ) {}

  @Cron('0 6 * * *')
  async fetchAndStoreFloodNews() {
    this.logger.log('Fetching flood-related news from GNews...');

    try {
      const response = await firstValueFrom(
        this.httpService.get<any>(this.GNEWS_URL, {
          params: {
            q: 'flood disaster water Philippines',
            lang: 'en',
            max: 4,
            apikey: process.env.GNEWS_API_KEY,
          },
        }),
      );

      const articles = response.data?.articles ?? [];

      for (const article of articles) {
        await this.db
          .insert(news)
          .values({
            title: article.title,
            description: article.description ?? 'No description available.',
            imageUrl: article.image ?? null,
            source: article.source?.name ?? 'Unknown',
            publishedAt: new Date(article.publishedAt),
            externalUrl: article.url,
          })
          .onConflictDoNothing({ target: news.externalUrl });
      }

      this.logger.log(`Processed ${articles.length} flood news articles.`);
    } catch (error) {
      this.logger.error('Failed to fetch news from GNews:', error.message);
    }
  }

  async getLatestNews() {
    return this.db
      .select()
      .from(news)
      .orderBy(desc(news.publishedAt))
      .limit(4);
  }

  async clearNews() {
    await this.db.delete(news);
    return { message: 'All news cleared.' };
  }
}