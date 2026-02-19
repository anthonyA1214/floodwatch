import { apiFetchClient } from '@/lib/api-fetch-client';

export async function logout() {
  try {
    await apiFetchClient('/auth/logout', {
      method: 'DELETE',
    });
  } catch (err) {
    console.error('Logout failed', err);
  }
}
