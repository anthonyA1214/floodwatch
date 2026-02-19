// lib/services/auth/signup-auth-error.ts
import { ActionState } from '@/lib/types/action-state';

export async function mapSignupAuthError(err: unknown): Promise<ActionState> {
  // If the error is a Response from fetch
  if (err instanceof Response) {
    const status = err.status;

    let data: Record<string, unknown> | null = null;
    try {
      data = (await err.json().catch(() => null)) as Record<
        string,
        unknown
      > | null;
    } catch (parseErr) {
      console.error('Failed to parse JSON', parseErr);
    }

    // Validation errors from backend
    if (data?.errors && typeof data.errors === 'object') {
      return {
        status: 'error',
        errors: data.errors as Record<string, string[]>,
      };
    }

    // Email already exists
    if (status === 409) {
      return {
        status: 'error',
        errors: {
          email: ['An account with this email already exists.'],
        },
      };
    }

    // Generic fallback
    return {
      status: 'error',
      errors: {
        _form: [
          'Unable to create account at this time. Please try again later.',
        ],
      },
    };
  }

  // Network or unknown error
  console.error(err);
  return {
    status: 'error',
    errors: { _form: ['Something went wrong. Please try again.'] },
  };
}
