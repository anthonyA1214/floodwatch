'use server';

import { cookies } from 'next/headers';
import { getApiUrl } from './utils/get-api-url';

let refreshing: Promise<string | null> | null = null;

async function refreshToken(cookieHeader: string): Promise<string | null> {
  if (refreshing) {
    return refreshing;
  }

  refreshing = (async () => {
    try {
      const response = await fetch(`${getApiUrl()}/auth/refresh`, {
        method: 'POST',
        headers: { Cookie: cookieHeader },
        cache: 'no-store',
      });

      if (!response.ok) {
        throw new Error('Failed to refresh token');
      }

      const setCookies = response.headers.getSetCookie();
      return setCookies.length
        ? setCookies.map((c) => c.split(';')[0]).join('; ')
        : null;
    } finally {
      refreshing = null;
    }
  })();

  return refreshing;
}

async function apiFetchServerRaw(path: string, init: RequestInit = {}) {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  async function request(overrideCookieHeader?: string) {
    return fetch(`${getApiUrl()}${path}`, {
      ...init,
      headers: {
        ...(init.headers || {}),
        Cookie: overrideCookieHeader || cookieHeader,
      },
      cache: 'no-store',
    });
  }

  let res = await request();

  if (res.status === 401) {
    const newCookies = await refreshToken(cookieHeader); // NEW: capture returned cookies
    const retryCookieHeader = newCookies // NEW: merge with original header
      ? `${cookieHeader}; ${newCookies}`
      : cookieHeader;
    res = await request(retryCookieHeader); // NEW: pass merged cookies to retry
  }

  return res;
}

export async function apiFetchServer(path: string, init: RequestInit = {}) {
  const res = await apiFetchServerRaw(path, init);

  if (res.status === 403) {
    await apiFetchServerRaw('/auth/logout', { method: 'POST' });
  }

  return res;
}
