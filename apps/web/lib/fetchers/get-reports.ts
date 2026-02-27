import { apiFetchClient } from '@/lib/api-fetch-client';
import { SWR_KEYS } from '@/lib/constants/swr-keys';

export async function getReports() {
  const res = await apiFetchClient(SWR_KEYS.reports, {
    method: 'GET',
  });

  if (!res.ok) {
    console.error('REPORTS ERROR:', res.status);
    return null;
  }

  const data = await res.json();
  return data;
}
