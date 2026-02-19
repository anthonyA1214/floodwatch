import { getApiUrl } from './utils/get-api-url';

let refreshing: Promise<void> | null = null;

async function refreshToken() {
  if (refreshing) {
    return refreshing; // return the promise directly instead of awaiting and returning void
  }

  refreshing = (async () => {
    try {
      const res = await fetch(`${getApiUrl()}/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error('Failed to refresh token');
      }
    } finally {
      refreshing = null;
    }
  })();

  return refreshing; // return instead of await
}

export async function apiFetchClient(path: string, init: RequestInit = {}) {
  async function request() {
    return fetch(`${getApiUrl()}${path}`, {
      ...init,
      credentials: 'include', // important for browser cookies
    });
  }

  let res = await request();

  if (!res.ok) {
    throw res;
  }

  if (res.status === 401) {
    await refreshToken();
    res = await request();
  }

  if (res.status === 403) {
    await fetch(`${getApiUrl()}/auth/logout`, {
      method: 'DELETE',
      credentials: 'include',
    });
    window.location.href = '/auth/login';
  }

  return res;
}
