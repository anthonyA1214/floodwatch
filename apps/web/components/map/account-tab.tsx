'use client';

import ProfileInformationForm from '../forms/profile-information-form';
import { Separator } from '@/components/ui/separator';
import { Button } from '../ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import LogoutButton from '@/components/map/logout-button';
import { useState } from 'react';
import { useUser } from '@/hooks/use-user';
import { format } from 'date-fns';
import { Spinner } from '@/components/ui/spinner';

// ✅ ADD THIS
import { AccountProfilePhotoModal } from './account-photo-modal';

export default function AccountTab() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useUser();

  const formatted = user ? format(new Date(user.createdAt), 'MMMM d, yyyy') : '';

  const handleButtonClick = () => {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    const form = document.getElementById(
      'profile-information-form',
    ) as HTMLFormElement | null;

    form?.requestSubmit();
  };

  return (
    <div className="flex flex-col gap-8 h-full">
      <h3 className="font-poppins font-semibold">Profile Information</h3>

      <ScrollArea className="flex-1 min-h-0 pr-4">
        <ProfileInformationForm
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          setIsSubmitting={setIsSubmitting}
        />
      </ScrollArea>

      <div className="flex flex-col gap-4 w-full mt-auto">
        <Button
          className="w-full py-6 flex gap-2 justify-center items-center"
          onClick={handleButtonClick}
          disabled={isSubmitting}
        >
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

      <div className="flex flex-col gap-2 w-full text-xs mt-auto">
        <div className="flex justify-between">
          <span>Member since</span>
          <span>{formatted}</span>
        </div>

        <div className="flex justify-between">
          <span>Posts</span>
          <span>5</span>
        </div>

        <Separator />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 w-auto">
          {/* ✅ REPLACED: avatar is now clickable + opens modal */}
          <AccountProfilePhotoModal />

          <div className="flex flex-col">
            <span className="font-medium text-sm">{user?.name}</span>
            <span className="text-xs text-gray-600">{user?.email}</span>
          </div>
        </div>

        <LogoutButton />
      </div>
    </div>
  );
}