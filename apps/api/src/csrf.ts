import { doubleCsrf } from 'csrf-csrf';

export const { generateCsrfToken, doubleCsrfProtection } = doubleCsrf({
  getSecret: () => process.env.CSRF_SECRET!,
  getSessionIdentifier: (req) => (req.cookies['access_token'] as string) ?? '', // You can use any identifier you want, but it should be unique per user and consistent across requests.
  cookieName: 'csrf_token', // The name of the cookie to store the CSRF token in. Defaults to 'csrf_token'.
  cookieOptions: {
    httpOnly: false, // The cookie must be accessible via JavaScript to read the token and include it in requests.
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    domain:
      process.env.NODE_ENV === 'production' ? '.floodwatch.me' : undefined,
  },
});
