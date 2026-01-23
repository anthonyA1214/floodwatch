'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { ActionState } from '@/lib/types/action-state';
import { useAuth } from '@/providers/auth-provider';
import { logInSchema } from '@repo/schemas';
import z from 'zod';
import { loginClient } from '@/lib/actions/auth-api';
import { mapAuthError } from '@/lib/actions/map-auth-error';

export default function LoginForm() {
  const { setAuth } = useAuth();

  const [state, setState] = useState<ActionState>({
    status: null,
    errors: null,
    data: undefined,
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);

    const formData = new FormData(e.currentTarget);

    const parsed = logInSchema.safeParse({
      email: formData.get('email'),
      password: formData.get('password'),
    });

    if (!parsed.success) {
      setState({
        errors: z.flattenError(parsed.error).fieldErrors,
        status: 'error',
        data: undefined,
      });
      setIsPending(false);
      return;
    }

    const { email, password } = parsed.data;

    try {
      const { access_token, deviceId } = await loginClient(email, password);

      setState({
        errors: {},
        status: 'success',
        data: { access_token, deviceId },
      });

      setAuth(access_token, deviceId);
    } catch (err) {
      setState({
        errors: mapAuthError(err).errors,
        status: 'error',
        data: undefined,
      });
    } finally {
      setIsPending(false);
    }
  }

  const [isPending, setIsPending] = useState(false);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your Email"
          className="rounded-full"
        />
        {state?.errors && 'email' in state.errors && state.errors.email && (
          <p className="text-red-500 text-sm">{state.errors.email}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Enter your Password"
          className="rounded-full"
        />
        {state?.errors &&
          'password' in state.errors &&
          state.errors.password && (
            <p className="text-red-500 text-sm">{state.errors.password}</p>
          )}
        {state?.errors && '_form' in state.errors && state.errors._form && (
          <p className="text-red-500 text-sm">{state.errors._form}</p>
        )}
        <div className="text-right text-sm text-gray-500 hover:underline cursor-pointer">
          <Link href="/auth/forgot-password"> Forgot Password? </Link>
        </div>
      </div>

      <Button
        disabled={isPending}
        type="submit"
        className="w-full rounded-full bg-[#0066CC] hover:bg-[#005BB8]"
      >
        Login
      </Button>
    </form>
  );
}
