'use client';

import useSWR from 'swr';
import { SWR_KEYS } from '@/lib/constants/swr-keys';
import { getNews } from '@/lib/fetchers/get-news';
import { GNewsArticle } from '@repo/schemas';

export function useNews() {
  const { data, error, isLoading, isValidating, mutate } = useSWR<
    GNewsArticle[]
  >(SWR_KEYS.news, getNews);

  return {
    news: data,
    isLoading,
    isValidating,
    isError: error,
    mutateNews: mutate,
  };
}
