import { apiFetchClient } from '../api-fetch-client';
import { SWR_KEYS } from '../constants/swr-keys';

export async function getSafetyList() {
  const res = await apiFetchClient(SWR_KEYS.safetyList, {
    method: 'GET',
  });

  if (!res.ok) {
    console.error('SAFETY LIST ERROR:', res.status);
    return null;
  }

  const data = await res.json();
  console.log('SAFETY LIST:', data);
  return data;
}
