'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import createAdmin from '@/lib/actions/create-admin';
import { ActionState } from '@/lib/types/action-state';
import { useActionState, useEffect, useState } from 'react';

export function AddNewAdminModal() {
  const [open, setOpen] = useState(false);

  const initialState: ActionState = {
    errors: null,
    status: null,
  };

  const [state, formAction, isPending] = useActionState(
    createAdmin,
    initialState,
  );

  useEffect(() => {
    function handleSuccess() {
      if (state.status === 'success') {
        setOpen(false);
      }
    }
    handleSuccess();
  }, [state]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="py-6">Add New Admin</Button>
      </DialogTrigger>
      <DialogContent>
        <form action={formAction} className="space-y-6">
          <DialogHeader>
            <DialogTitle className="font-poppins text-xl font-semibold">
              Add <span className="text-[#0066CC] font-bold">New Admin!</span>
            </DialogTitle>
            <DialogDescription>Please enter the details.</DialogDescription>
          </DialogHeader>

          <div className="space-y-2">
            <Label htmlFor="first_name">Full name</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <Input
                  id="first_name"
                  name="first_name"
                  placeholder="First name"
                  className="rounded-full px-4 shadow-sm"
                />
                {state?.errors &&
                  'first_name' in state.errors &&
                  state.errors.first_name && (
                    <p className="text-red-500 text-sm">
                      {state.errors.first_name}
                    </p>
                  )}
              </div>
              <div>
                <Input
                  id="last_name"
                  name="last_name"
                  placeholder="Last name"
                  className="rounded-full px-4 shadow-sm"
                />
                {state?.errors &&
                  'last_name' in state.errors &&
                  state.errors.last_name && (
                    <p className="text-red-500 text-sm">
                      {state.errors.last_name}
                    </p>
                  )}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              className="rounded-full px-4 shadow-sm"
            />
            {state?.errors && 'email' in state.errors && state.errors.email && (
              <p className="text-red-500 text-sm">{state.errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="home_address">Home Address</Label>
            <Input
              id="home_address"
              name="home_address"
              placeholder="Enter your home address"
              className="rounded-full px-4 shadow-sm"
            />
            {state?.errors &&
              'home_address' in state.errors &&
              state.errors.home_address && (
                <p className="text-red-500 text-sm">
                  {state.errors.home_address}
                </p>
              )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              className="rounded-full px-4 shadow-sm"
            />
            {state?.errors &&
              'password' in state.errors &&
              state.errors.password && (
                <p className="text-red-500 text-sm">{state.errors.password}</p>
              )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm_password">Confirm Password</Label>
            <Input
              id="confirm_password"
              name="confirm_password"
              type="password"
              placeholder="Re-enter your password"
              className="rounded-full px-4 shadow-sm"
            />
            {state?.errors &&
              'confirm_password' in state.errors &&
              state.errors.confirm_password && (
                <p className="text-red-500 text-sm">
                  {state.errors.confirm_password}
                </p>
              )}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button disabled={isPending} type="submit">
              {isPending ? (
                <>
                  Creating... <Spinner />
                </>
              ) : (
                'Create Admin'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
