'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useActionState } from 'react';
import { ActionState } from '@/lib/types/action-state';
import { logIn } from '@/lib/actions/auth';

export default function LoginForm() {
  const initialState: ActionState = {
    status: null,
    errors: null,
  };

  const [state, formAction, isPending] = useActionState(logIn, initialState);

  return (
    <form action={formAction} className="space-y-6">
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
