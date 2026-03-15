import { apiFetchClient } from '../api-fetch-client';
import { SWR_KEYS } from '../constants/swr-keys';

export async function getReportList() {
  const res = await apiFetchClient(SWR_KEYS.reportList, {
    method: 'GET',
  });

  if (!res.ok) {
    console.error('REPORT LIST ERROR:', res.status);
    return null;
  }

  const data = await res.json();
  return data;
}
