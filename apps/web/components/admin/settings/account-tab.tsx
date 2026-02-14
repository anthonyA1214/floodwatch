'use client';

import { Button } from '@/components/ui/button';
import { Empty, EmptyContent, EmptyMedia } from '@/components/ui/empty';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { useUser } from '@/hooks/use-user';
import { updateProfile } from '@/lib/actions/update-profile-action';
import { ActionState } from '@/lib/types/action-state';
import { IconPencil } from '@tabler/icons-react';
import { useActionState, useEffect, useState } from 'react';

export default function AccountTab() {
  const [isEditing, setIsEditing] = useState(false);
  const { user, mutateUser, isLoading, isValidating } = useUser();

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isEditing) {
      e.preventDefault();
      setIsEditing(true);
    }
  };

  const initialState: ActionState = {
    errors: null,
    status: null,
  };

  const [state, formAction, isSubmitting] = useActionState(
    updateProfile,
    initialState,
  );

  useEffect(() => {
    async function handleSuccess() {
      if (state.status === 'success') {
        await mutateUser();
        setIsEditing(false);
      }
    }

    handleSuccess();
  }, [state, mutateUser]);

  return (
    <>
      <h3 className="font-poppins font-semibold">Profile Information</h3>
      {isLoading || isValidating ? (
        <Empty>
          <EmptyContent className="mb-auto">
            <EmptyMedia>
              <Spinner className="size-16 text-[#0066CC]" />
            </EmptyMedia>
          </EmptyContent>
        </Empty>
      ) : (
        <form action={formAction}>
          <div className="flex flex-col gap-y-6 mx-auto w-full ">
            <div className="space-y-2">
              <Label htmlFor="first_name">Full name</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Input
                    id="first_name"
                    name="first_name"
                    placeholder="First name"
                    defaultValue={user?.firstName}
                    className="rounded-full px-4 shadow-sm"
                    disabled={!isEditing}
                  />
                  {state?.errors &&
                    'firstName' in state.errors &&
                    state.errors.firstName && (
                      <p className="text-red-500 text-sm">
                        {state.errors.firstName}
                      </p>
                    )}
                </div>

                <div className="space-y-2">
                  <Input
                    id="last_name"
                    name="last_name"
                    placeholder="Last name"
                    defaultValue={user?.lastName}
                    className="rounded-full px-4 shadow-sm"
                    disabled={!isEditing}
                  />
                  {state?.errors &&
                    'lastName' in state.errors &&
                    state.errors.lastName && (
                      <p className="text-red-500 text-sm">
                        {state.errors.lastName}
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
                defaultValue={user?.email}
                className="rounded-full px-4 shadow-sm"
                disabled
              />
              {state?.errors &&
                'email' in state.errors &&
                state.errors.email && (
                  <p className="text-red-500 text-sm">{state.errors.email}</p>
                )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="home_address">Home Address</Label>
              <Input
                id="home_address"
                name="home_address"
                placeholder="Enter your home address"
                defaultValue={user?.homeAddress}
                className="rounded-full px-4 shadow-sm"
                disabled={!isEditing}
              />
              {state?.errors &&
                'homeAddress' in state.errors &&
                state.errors.homeAddress && (
                  <p className="text-red-500 text-sm">
                    {state.errors.homeAddress}
                  </p>
                )}

              {state?.errors &&
                '_form' in state.errors &&
                state.errors._form && (
                  <p className="text-red-500 text-sm">{state.errors._form}</p>
                )}
            </div>

            <Button
              type={isEditing ? 'submit' : 'button'}
              className="py-5"
              onClick={handleButtonClick}
              disabled={isSubmitting}
            >
              <IconPencil />
              {isSubmitting ? (
                <>
                  <span>Saving...</span>
                  <Spinner className="size-4" />
                </>
              ) : isEditing ? (
                'Save Changes'
              ) : (
                'Edit Profile'
              )}
            </Button>
          </div>
        </form>
      )}
    </>
  );
}
