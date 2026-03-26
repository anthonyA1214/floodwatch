'use client';

import useSWR from 'swr';
import { SWR_KEYS } from '@/lib/constants/swr-keys';
import { SafetyLocationQueryInput } from '@repo/schemas';
import { getSafetyList } from '@/lib/fetchers/get-safety-list';

export function useSafetyList(params: SafetyLocationQueryInput) {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    [SWR_KEYS.safetyList, params],
    () => getSafetyList(params),
    { keepPreviousData: true },
  );

  return {
    safetyList: data?.data,
    meta: data?.meta,
    isLoading,
    isValidating,
    isError: error,
    mutateSafetyList: mutate,
  };
}
