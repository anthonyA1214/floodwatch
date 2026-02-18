'use server';

import { cookies } from 'next/headers';
import { api } from '../api';

export async function updateProfilePhoto(formData: FormData) {
  const file = formData.get('file') as File | null;

  if (!file) {
    return {
      errors: { file: ['No file uploaded'] },
      status: 'error',
    };
  }

  // Validate file type
  if (!file.type.startsWith('image/')) {
    return {
      errors: { file: ['Please upload a valid image file'] },
      status: 'error',
    };
  }

  // Validate file size (e.g., max 5MB)
  if (file.size > 5 * 1024 * 1024) {
    return {
      errors: { file: ['File size must be less than 5MB'] },
      status: 'error',
    };
  }

  try {
    const cookieStore = await cookies();

    await api.post('/users/me/avatar', formData, {
      headers: {
        Cookie: cookieStore.toString(),
      },
      withCredentials: true,
    });

    return {
      errors: {},
      status: 'success',
    };
  } catch (err) {
    return {
      errors: { file: ['Failed to upload profile photo. Please try again.'] },
      status: 'error',
    };
  }
}

export async function removeProfilePhoto() {
  try {
    const cookieStore = await cookies();

    await api.delete('/users/me/avatar', {
      headers: {
        Cookie: cookieStore.toString(),
      },
      withCredentials: true,
    });

    return {
      errors: {},
      status: 'success',
    };
  } catch (err) {
    return {
      errors: {
        file: ['Failed to remove profile photo. Please try again.'],
      },
      status: 'error',
    };
  }
}
