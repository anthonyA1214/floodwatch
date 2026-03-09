import { z } from 'zod';

export const gnewsArticleSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  image: z.string().nullable(),
  url: z.string(),
  publishedAt: z.string(),
});

export const gnewsResponseSchema = z.object({
  articles: z.array(gnewsArticleSchema),
});

export type GNewsArticle = z.infer<typeof gnewsArticleSchema>;
export type GNewsResponse = z.infer<typeof gnewsResponseSchema>;
