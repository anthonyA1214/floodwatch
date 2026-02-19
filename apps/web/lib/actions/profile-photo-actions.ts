'use server';

import { apiFetchServer } from '../api-fetch-server';

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
    await apiFetchServer('/users/me/avatar', {
      method: 'POST',
      body: formData,
    });

    return {
      errors: {},
      status: 'success',
    };
  } catch (err) {
    console.error('Error uploading profile photo:', err);
    return {
      errors: { file: ['Failed to upload profile photo. Please try again.'] },
      status: 'error',
    };
  }
}

export async function removeProfilePhoto() {
  try {
    await apiFetchServer('/users/me/avatar', {
      method: 'DELETE',
    });

    return {
      errors: {},
      status: 'success',
    };
  } catch (err) {
    console.error('Error removing profile photo:', err);
    return {
      errors: {
        file: ['Failed to remove profile photo. Please try again.'],
      },
      status: 'error',
    };
  }
}
