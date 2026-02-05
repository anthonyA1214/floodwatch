import { headers } from 'next/headers';

export async function getMeServer() {
  const cookie = (await headers()).get('cookie');

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
    headers: {
      cookie: cookie || '',
    },
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch user data');
  }

  const data = await response.json();
  return data;
}
