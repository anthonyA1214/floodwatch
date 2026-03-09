'use client';

import useSWR from 'swr';
import { SWR_KEYS } from '@/lib/constants/swr-keys';
import { getMyVote } from '@/lib/fetchers/get-my-vote';

export function useMyVote(reportId: number) {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    SWR_KEYS.myVote(reportId),
    () => getMyVote(reportId!),
  );

  return {
    myVote: data,
    isLoading,
    isValidating,
    isError: error,
    mutateMyVote: mutate,
  };
}
