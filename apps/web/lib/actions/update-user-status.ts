'use server';

import { cookies } from 'next/headers';
import { getApiUrl } from '@/lib/utils/get-api-url';

export async function blockUser(userId: number) {
  try {
    const cookieStore = await cookies();

    await fetch(`${getApiUrl()}/admin/users/${userId}/block`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return { status: 'success' };
  } catch (error) {
    console.error('Error blocking user:', error);
    return { status: 'error', message: 'Failed to block user' };
  }
}

export async function unblockUser(userId: number) {
  try {
    const cookieStore = await cookies();

    await fetch(`${getApiUrl()}/admin/users/${userId}/unblock`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return { status: 'success' };
  } catch (error) {
    console.error('Error unblocking user:', error);
    return { status: 'error', message: 'Failed to unblock user' };
  }
}
