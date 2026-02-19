import { apiFetchServer } from '../api-fetch-server';

export async function getMeServer() {
  try {
    const res = await apiFetchServer('/users/me', {
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
  } catch (err) {
    console.error('Error fetching user data:', err);
    return null;
  }
}
