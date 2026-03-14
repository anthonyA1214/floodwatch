'use client';

import useSWR from 'swr';
import { SWR_KEYS } from '@/lib/constants/swr-keys';
import { getReportList } from '@/lib/fetchers/get-report-list';
import { ReportListItemInput } from '@repo/schemas';

export function useReportList() {
  const { data, error, isLoading, isValidating, mutate } = useSWR<
    ReportListItemInput[]
  >(SWR_KEYS.reportList, getReportList);

  return {
    reportList: data,
    isLoading,
    isValidating,
    isError: error,
    mutateReportList: mutate,
  };
}
