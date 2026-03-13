'use client';

import useSWR from 'swr';
import { SWR_KEYS } from '@/lib/constants/swr-keys';
import { SafetyMapPinInput } from '@repo/schemas';
import { getSafetyMapPins } from '@/lib/fetchers/get-safety-map-pins';

export function useSafetyMapPins() {
  const { data, error, isLoading, isValidating, mutate } = useSWR<
    SafetyMapPinInput[]
  >(SWR_KEYS.safetyMapPins, getSafetyMapPins);

  return {
    safetyMapPins: data,
    isLoading,
    isValidating,
    isError: error,
    mutateSafetyMapPins: mutate,
  };
}
