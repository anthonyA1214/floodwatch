import ProfileInformationForm from './forms/profile-information-form';
import {
  Avatar as UIAvatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { IconLogout } from '@tabler/icons-react';
import Avatar from 'boring-avatars';
import { Separator } from '@/components/ui/separator';
import { Button } from '../ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useState } from 'react';

export default function ProfilePanel() {
  const [edit, isEditing] = useState(false);

  return (
    <div className="flex flex-col bg-white rounded-xl shadow-md p-4 w-[20vw] gap-8 h-[80vh]">
      <h3 className="text-[#0066CC] font-semibold">Profile Information</h3>

      <ScrollArea className="flex-1 min-h-0 pr-4">
        <ProfileInformationForm isEditing={edit} />
      </ScrollArea>

      {/* buttons */}
      <div className="flex flex-col gap-4 w-full mt-auto">
        {edit && (
          <Button variant="outline" className="w-full py-6">
            Change Password
          </Button>
        )}
        <Button className="w-full py-6" onClick={() => isEditing(!edit)}>
          {edit ? 'Save Changes' : 'Edit Profile'}
        </Button>
      </div>

      <div className="flex flex-col gap-2 w-full text-xs mt-auto">
        <div className="flex justify-between">
          <span>Member since</span>
          <span>October 5, 2025</span>
        </div>
        <div className="flex justify-between">
          <span>Posts</span>
          <span>5</span>
        </div>

        <Separator />
      </div>

      <div className="flex items-center justify-between">
        {/*  */}
        <div className="flex items-center gap-3 w-auto">
          <UIAvatar className="size-8">
            <AvatarImage src="" />
            <AvatarFallback>
              <Avatar name="Lawrence Dullo" variant="beam" />
            </AvatarFallback>
          </UIAvatar>
          <div className="flex flex-col">
            <span className="font-medium text-sm">Lawrence Dullo</span>
            <span className="text-xs text-gray-600">
              lawrencedullo04@gmail.com
            </span>
          </div>
        </div>

        {/* logout */}
        <button>
          <IconLogout />
        </button>
      </div>
    </div>
  );
}
