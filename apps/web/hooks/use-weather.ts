'use client';

import useSWR from 'swr';
import { SWR_KEYS } from '@/lib/constants/swr-keys';
import { getWeather } from '@/lib/fetchers/get-weather';

export function useWeather(lat: number | null, lon: number | null) {
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    lat && lon ? SWR_KEYS.weather(lat, lon) : null,
    () => getWeather(lat, lon),
    {
      revalidateOnFocus: false,
      refreshInterval: 15 * 60 * 1000, // 15 minutes
    },
  );

  return {
    weather: data,
    isLoading,
    isValidating,
    isError: error,
    mutateWeather: mutate,
  };
}
