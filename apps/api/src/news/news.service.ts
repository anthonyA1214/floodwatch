import { Injectable, Inject, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { DRIZZLE } from '../drizzle/drizzle-connection';
import { news } from '../drizzle/schemas';
import { desc } from 'drizzle-orm';
import { type DrizzleDB } from 'src/drizzle/types/drizzle';
import { GNewsResponse, gnewsResponseSchema } from '@repo/schemas';
import { z } from 'zod';

@Injectable()
export class NewsService {
  private readonly logger = new Logger(NewsService.name);
  private readonly GNEWS_URL = 'https://gnews.io/api/v4/search';

  constructor(
    @Inject(DRIZZLE) private readonly db: DrizzleDB,
    private readonly httpService: HttpService,
  ) {}

  async getNews() {
    return this.db.select().from(news).orderBy(desc(news.publishedAt)).limit(4);
  }

  @Cron('0 0 * * *', {
    name: 'fetchFloodNews',
    timeZone: 'Asia/Manila',
  })
  async fetchAndStoreFloodNews() {
    try {
      const response = await firstValueFrom(
        this.httpService.get<GNewsResponse>(this.GNEWS_URL, {
          params: {
            q: 'flood philippines',
            lang: 'en',
            max: 4,
            apikey: process.env.GNEWS_API_KEY,
          },
        }),
      );

      const parsed = gnewsResponseSchema.safeParse(response.data);

      if (!parsed.success) {
        this.logger.error('Invalid GNews response format', {
          errors: z.flattenError(parsed.error).fieldErrors,
          rawData: response.data,
        });
        return;
      }

      const { articles } = parsed.data;

      for (const article of articles) {
        await this.db
          .insert(news)
          .values({
            title: article.title,
            description: article.description ?? 'No description available.',
            url: article.url,
            image: article.image ?? null,
            publishedAt: new Date(article.publishedAt),
          })
          .onConflictDoNothing({ target: news.url });
      }

      return { message: 'Flood news fetched and stored successfully.' };
    } catch (error) {
      this.logger.error('Error fetching flood news:', error);
    }
  }
}
