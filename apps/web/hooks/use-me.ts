'use client';

import useSWR from 'swr';
import { getMe } from '@/lib/fetchers/get-me';
import { SWR_KEYS } from '@/lib/constants/swr-keys';

export function useMe() {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    SWR_KEYS.me,
    getMe,
  );

  return {
    me: data,
    isLoading,
    isValidating,
    isError: error,
    mutateMe: mutate,
  };
}
