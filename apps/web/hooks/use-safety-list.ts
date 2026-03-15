'use client';

import useSWR from 'swr';
import { SWR_KEYS } from '@/lib/constants/swr-keys';
import { SafetyListItemInput } from '@repo/schemas';
import { getSafetyList } from '@/lib/fetchers/get-safety-list';

export function useSafetyList() {
  const { data, error, isLoading, isValidating, mutate } = useSWR<
    SafetyListItemInput[]
  >(SWR_KEYS.safetyList, getSafetyList);

  return {
    safetyList: data,
    isLoading,
    isValidating,
    isError: error,
    mutateSafetyList: mutate,
  };
}
