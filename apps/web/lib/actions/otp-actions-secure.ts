import { ActionState } from '@/lib/types/action-state';
import { verifyOtpSecureSchema } from '@repo/schemas';
import z from 'zod';
import { mapVerifyOtpAuthError } from '../services/auth/verify-otp-auth-error';
import { apiFetchClient } from '../api-fetch-client';

export async function handleVerify(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const parsedData = verifyOtpSecureSchema.safeParse({
    otp: formData.get('otp'),
  });

  if (!parsedData.success) {
    return {
      errors: z.flattenError(parsedData.error).fieldErrors,
      status: 'error',
    };
  }

  const { otp } = parsedData.data;

  try {
    const res = await apiFetchClient('/auth/change-password/verify-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ otp }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return {
        errors: mapVerifyOtpAuthError(errorData).errors,
        status: 'error',
      };
    }

    const { resetSessionId } = await res.json();

    // Store resetSessionId in sessionStorage for later use in change password step
    sessionStorage.setItem('resetSessionId', resetSessionId);

    return {
      errors: {},
      status: 'success',
    };
  } catch (err) {
    console.error('Failed to verify OTP:', err);

    return {
      errors: mapVerifyOtpAuthError(err).errors,
      status: 'error',
    };
  }
}

export async function handleResend(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  try {
    await apiFetchClient('/auth/change-password/resend-otp', {
      method: 'POST',
    });

    return {
      errors: null,
      status: 'success',
    };
  } catch (err) {
    console.error('Failed to resend OTP:', err);
    return {
      errors: null,
      status: 'success', // Even if resend fails, we don't want to show an error to the user
    };
  }
}
