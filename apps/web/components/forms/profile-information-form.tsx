import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUser } from '@/hooks/use-user';
import { updateProfile } from '@/lib/actions/update-profile-action';
import { ActionState } from '@/lib/types/action-state';
import { useActionState, useEffect } from 'react';
import { Empty, EmptyContent, EmptyMedia } from '@/components/ui/empty';
import { Spinner } from '@/components/ui/spinner';

export default function ProfileInformationForm({
  isEditing,
  setIsEditing,
  setIsSubmitting,
}: {
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
  setIsSubmitting: (submitting: boolean) => void;
}) {
  const { user, isLoading, isValidating, mutateUser } = useUser();

  const initialState: ActionState = {
    errors: null,
    status: null,
  };

  const [state, onUpdate, isUpdating] = useActionState(
    updateProfile,
    initialState,
  );

  useEffect(() => {
    setIsSubmitting(isUpdating);
    async function handleSuccess() {
      if (state.status === 'success') {
        await mutateUser();
        setIsEditing(false);
      }
    }
    handleSuccess();
  }, [state, setIsEditing, isUpdating, setIsSubmitting, mutateUser]);

  if (isLoading || isValidating) {
    return (
      <Empty>
        <EmptyContent>
          <EmptyMedia>
            <Spinner className="size-16 text-[#0066CC]" />
          </EmptyMedia>
        </EmptyContent>
      </Empty>
    );
  }

  return (
    <form
      id="profile-information-form"
      action={onUpdate}
      className="flex flex-col gap-6 text-sm"
    >
      {/* first name */}
      <div className="space-y-2">
        <Label htmlFor="first_name">First Name</Label>
        <Input
          id="first_name"
          name="first_name"
          type="text"
          defaultValue={user?.firstName}
          placeholder="Enter your first name"
          className="rounded-full px-4 shadow-sm"
          disabled={!isEditing}
        />
        {state?.errors &&
          'firstName' in state.errors &&
          state.errors.firstName && (
            <p className="text-red-500 text-sm">{state.errors.firstName}</p>
          )}
      </div>

      {/* last name */}
      <div className="space-y-2">
        <Label htmlFor="last_name">Last Name</Label>
        <Input
          id="last_name"
          name="last_name"
          type="text"
          defaultValue={user?.lastName}
          placeholder="Enter your last name"
          className="rounded-full px-4 shadow-sm"
          disabled={!isEditing}
        />
        {state?.errors &&
          'lastName' in state.errors &&
          state.errors.lastName && (
            <p className="text-red-500 text-sm">{state.errors.lastName}</p>
          )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          defaultValue={user?.email}
          placeholder="Enter your email"
          className="rounded-full px-4 shadow-sm"
          disabled
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
          type="text"
          defaultValue={user?.homeAddress}
          placeholder="Enter your home address"
          className="rounded-full px-4 shadow-sm"
          disabled={!isEditing}
        />
        {state?.errors &&
          'homeAddress' in state.errors &&
          state.errors.homeAddress && (
            <p className="text-red-500 text-sm">{state.errors.homeAddress}</p>
          )}

        {state?.errors && '_form' in state.errors && state.errors._form && (
          <p className="text-red-500 text-sm">{state.errors._form}</p>
        )}
      </div>
    </form>
  );
}
