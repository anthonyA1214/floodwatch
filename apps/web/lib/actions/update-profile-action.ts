'use server';

import { updateProfileSchema } from '@repo/schemas';
import { ActionState } from '../types/action-state';
import { z } from 'zod';
import { api } from '../api';
import { cookies } from 'next/headers';

export async function updateProfile(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsedData = updateProfileSchema.safeParse({
    firstName: formData.get('first_name'),
    lastName: formData.get('last_name'),
    homeAddress: formData.get('home_address'),
  });

  if (!parsedData.success) {
    return {
      errors: z.flattenError(parsedData.error).fieldErrors,
      status: 'error',
    };
  }

  const { firstName, lastName, homeAddress } = parsedData.data;

  try {
    const cookieStore = await cookies();

    await api.patch(
      '/users/me',
      {
        firstName,
        lastName,
        homeAddress,
      },
      {
        headers: { Cookie: cookieStore.toString() },
        withCredentials: true,
      },
    );

    return {
      errors: {},
      status: 'success',
    };
  } catch (err) {
    console.log('Update profile error:', err);
    return {
      errors: { _form: ['Failed to update profile'] },
      status: 'error',
    };
  }
}
