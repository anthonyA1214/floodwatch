import { apiFetchClient } from '@/lib/api-fetch-client';
import { SWR_KEYS } from '@/lib/constants/swr-keys';

export async function getReportMapPins() {
  const res = await apiFetchClient(SWR_KEYS.reportMapPins, {
    method: 'GET',
  });

  if (!res.ok) {
    console.error('REPORT MAP PINS ERROR:', res.status);
    return null;
  }

  const data = await res.json();
  return data;
}
