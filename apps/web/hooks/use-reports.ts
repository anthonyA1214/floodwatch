import { useState, useEffect, useCallback } from 'react';
import { apiFetchClient } from '@/lib/api-fetch-client';
import { FloodReportsDto } from '@repo/schemas';

export function useReports() {
  const [reports, setReports] = useState<FloodReportsDto[]>([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await apiFetchClient('/reports', { method: 'GET' });
        const data = await res.json();
        setReports(data);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };

    fetchReports();
  }, []);

  const refreshReports = useCallback(async () => {
    try {
      const res = await apiFetchClient('/reports', { method: 'GET' });
      const data = await res.json();
      setReports(data);
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  }, []);

  return { reports, refreshReports };
}
