'use server';

import { createAdminSchema } from '@repo/schemas';
import { ActionState } from '@/lib/types/action-state';
import { z } from 'zod';
import { mapCreateAdminError } from '@/lib/services/user/create-admin-error';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export default async function createAdmin(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsedData = createAdminSchema.safeParse({
    first_name: formData.get('first_name'),
    last_name: formData.get('last_name'),
    email: formData.get('email'),
    home_address: formData.get('home_address'),
    password: formData.get('password'),
    confirm_password: formData.get('confirm_password'),
  });

  if (!parsedData.success) {
    return {
      errors: z.flattenError(parsedData.error).fieldErrors,
      status: 'error',
    };
  }

  const {
    first_name,
    last_name,
    email,
    home_address,
    password,
    confirm_password,
  } = parsedData.data;

  try {
    const cookieStore = await cookies();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/create`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify({
          first_name,
          last_name,
          email,
          home_address,
          password,
          confirm_password,
        }),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        errors: mapCreateAdminError(errorData).errors,
        status: 'error',
      };
    }

    revalidatePath('/admin/users');

    return {
      errors: null,
      status: 'success',
    };
  } catch (err) {
    return {
      errors: mapCreateAdminError(err).errors,
      status: 'error',
    };
  }
}
