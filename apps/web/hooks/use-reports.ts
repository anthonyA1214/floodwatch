'use client';

import useSWR from 'swr';
import { SWR_KEYS } from '@/lib/constants/swr-keys';
import { getReports } from '@/lib/fetchers/get-reports';
import { ReportsDto } from '@repo/schemas';

export function useReports() {
  const { data, error, isLoading, isValidating, mutate } = useSWR<ReportsDto[]>(
    SWR_KEYS.reports,
    getReports,
  );

  return {
    reports: data,
    isLoading,
    isValidating,
    isError: error,
    mutateReports: mutate,
  };
}
