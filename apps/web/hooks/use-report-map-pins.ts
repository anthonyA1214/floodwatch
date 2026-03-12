'use client';

import useSWR from 'swr';
import { SWR_KEYS } from '@/lib/constants/swr-keys';
import { getReportMapPins } from '@/lib/fetchers/get-report-map-pins';
import { ReportMapPinsInput } from '@repo/schemas';

export function useReportMapPins() {
  const { data, error, isLoading, isValidating, mutate } = useSWR<
    ReportMapPinsInput[]
  >(SWR_KEYS.reportMapPins, getReportMapPins);

  return {
    reportMapPins: data,
    isLoading,
    isValidating,
    isError: error,
    mutateReportMapPins: mutate,
  };
}
