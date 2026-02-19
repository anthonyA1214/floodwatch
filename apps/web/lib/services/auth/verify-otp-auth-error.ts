// lib/services/auth/verify-otp-auth-error.ts
import { ActionState } from '@/lib/types/action-state';

export async function mapVerifyOtpAuthError(
  err: unknown,
): Promise<ActionState> {
  // If it's a fetch Response
  if (err instanceof Response) {
    // Optional: parse backend JSON for detailed errors
    let data: Record<string, unknown> | null = null;
    try {
      data = (await err.json().catch(() => null)) as Record<
        string,
        unknown
      > | null;
    } catch (parseErr) {
      console.error('Failed to parse JSON', parseErr);
    }

    // If backend returned validation errors for OTP
    if (data?.errors && typeof data.errors === 'object') {
      return {
        status: 'error',
        errors: data.errors as Record<string, string[]>,
      };
    }

    // Generic OTP error fallback
    return {
      status: 'error',
      errors: { otp: ['Invalid or expired code.'] },
    };
  }

  // Network or unknown error
  console.error(err);
  return {
    status: 'error',
    errors: { otp: ['Invalid or expired code.'] },
  };
}
