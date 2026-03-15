'use client';

import useSWR from 'swr';
import { SWR_KEYS } from '@/lib/constants/swr-keys';
import { SafetyDetailInput } from '@repo/schemas';
import { getSafetyDetail } from '@/lib/fetchers/get-safety-detail';

export function useSafetyDetail(safetyId: number) {
  const { data, error, isLoading, isValidating, mutate } =
    useSWR<SafetyDetailInput>(
      safetyId ? SWR_KEYS.safetyDetail(safetyId) : null,
      () => getSafetyDetail(safetyId),
    );

  return {
    safetyDetail: data,
    isLoading,
    isValidating,
    isError: error,
    mutateSafetyDetail: mutate,
  };
}
