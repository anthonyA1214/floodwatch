import { apiFetchClient } from '@/lib/api-fetch-client';
import { SWR_KEYS } from '@/lib/constants/swr-keys';

export async function getMe() {
  const res = await apiFetchClient(SWR_KEYS.me, {
    method: 'GET',
  });

  if (res.status === 401) {
    return null;
  }

  if (!res.ok) {
    console.error('ME ERROR:', res.status);
    return null;
  }

  const data = await res.json();
  return data;
}
