// lib/services/auth/reset-password-auth-error.ts
import { ActionState } from '@/lib/types/action-state';

export async function mapResetPasswordAuthError(
  err: unknown,
): Promise<ActionState> {
  // If it's a Response from fetch
  if (err instanceof Response) {
    let data: Record<string, unknown> | null = null;

    try {
      data = (await err.json().catch(() => null)) as Record<
        string,
        unknown
      > | null;
    } catch (parseErr) {
      console.error('Failed to parse JSON', parseErr);
    }

    const status = err.status;
    console.log(status);

    // Password validation / mismatch errors
    if (data?.errors && typeof data.errors === 'object') {
      return {
        status: 'error',
        errors: data.errors as Record<string, string[]>,
      };
    }

    // OTP / reset session expired or invalid
    if ([400, 401, 410].includes(status)) {
      return {
        status: 'error',
        errors: {
          _form: [
            'Your verification session has expired. Please request a new code.',
          ],
        },
      };
    }

    // Generic fallback
    return {
      status: 'error',
      errors: {
        _form: [
          'Unable to reset password at this time. Please try again later.',
        ],
      },
    };
  }

  // Network or unknown error
  console.error(err);

  return {
    status: 'error',
    errors: {
      _form: ['Something went wrong. Please try again.'],
    },
  };
}
