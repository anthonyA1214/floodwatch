import { apiFetchClient } from '@/lib/api-fetch-client';

export async function getMe() {
  const res = await apiFetchClient('/users/me', {
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
