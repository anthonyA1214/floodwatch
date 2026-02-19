'use server';

import { ActionState } from '@/lib/types/action-state';
import { changePasswordSchema, setPasswordSchema } from '@repo/schemas';
import z from 'zod';
import { mapResetPasswordAuthError } from '../services/auth/reset-password-auth-error';
import { apiFetchServer } from '../api-fetch-server';

export async function changePassword(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsedData = changePasswordSchema.safeParse({
    resetSessionId: formData.get('resetSessionId'),
    new_password: formData.get('new_password'),
    confirm_new_password: formData.get('confirm_new_password'),
  });

  if (!parsedData.success) {
    return {
      errors: z.flattenError(parsedData.error).fieldErrors,
      status: 'error',
    };
  }

  const { resetSessionId, new_password, confirm_new_password } =
    parsedData.data;

  try {
    await apiFetchServer('/auth/change-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        resetSessionId,
        new_password,
        confirm_new_password,
      }),
    });

    return {
      errors: {},
      status: 'success',
    };
  } catch (err) {
    console.log('Change password error:', err);

    return {
      errors: (await mapResetPasswordAuthError(err)).errors,
      status: 'error',
    };
  }
}

export async function setPassword(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsedData = setPasswordSchema.safeParse({
    new_password: formData.get('new_password'),
    confirm_new_password: formData.get('confirm_new_password'),
  });

  if (!parsedData.success) {
    return {
      errors: z.flattenError(parsedData.error).fieldErrors,
      status: 'error',
    };
  }

  const { new_password, confirm_new_password } = parsedData.data;

  try {
    await apiFetchServer('/auth/set-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        new_password,
        confirm_new_password,
      }),
    });

    return {
      errors: {},
      status: 'success',
    };
  } catch (err) {
    console.log('Set password error:', err);

    return {
      errors: { _form: ['An unexpected error occurred. Please try again.'] },
      status: 'error',
    };
  }
}
