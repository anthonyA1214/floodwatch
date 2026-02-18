import { cookies } from 'next/headers';

export async function getMeServer() {
  const cookieStore = await cookies();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/me`,
      {
        headers: {
          Cookie: cookieStore.toString(),
        },
        credentials: 'include',
        cache: 'no-store',
      },
    );

    if (response.status === 401) {
      return null;
    }

    if (!response.ok) {
      console.error('ME ERROR:', response.status);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Error fetching user data:', err);
    return null;
  }
}
