import { SWR_KEYS } from '@/lib/constants/swr-keys';
import { apiFetchClient } from '../api-fetch-client';

export async function getNews() {
  const res = await apiFetchClient(SWR_KEYS.news, {
    method: 'GET',
  });

  console.log(res);

  if (res.status === 401) {
    return null;
  }

  if (!res.ok) {
    console.error('NEWS ERROR:', res.status);
    return null;
  }

  const data = await res.json();
  return data;
}
