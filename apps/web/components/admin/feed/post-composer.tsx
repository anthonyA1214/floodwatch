'use client';

import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Avatar as UIAvatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import Avatar from 'boring-avatars';
import { IconPhoto, IconSend } from '@tabler/icons-react';
import { useUser } from '@/hooks/use-user';
import { Skeleton } from '@/components/ui/skeleton';

export default function PostComposer() {
  const { user, isLoading } = useUser();

  return (
    <>
      {/* share an update with the community */}
      <div className="flex flex-col gap-4 rounded-2xl p-4 border">
        {/* user */}
        <div className="flex gap-2 items-center">
          {isLoading ? (
            <>
              <Skeleton className="size-10 rounded-full" />
              <div className="flex flex-col gap-1">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-16" />
              </div>
            </>
          ) : (
            <>
              <UIAvatar className="size-10 border">
                <AvatarImage src={user?.profilePicture} />
                <AvatarFallback>
                  <Avatar
                    name={`${user?.name} ${user?.id}`}
                    variant="beam"
                    className="size-10"
                  />
                </AvatarFallback>
              </UIAvatar>
              <div className="flex flex-col">
                <span className="font-semibold">{user?.name}</span>
                <span className="text-xs text-gray-600">
                  {user?.role.toUpperCase()}
                </span>
              </div>
            </>
          )}
        </div>

        {/* textarea */}
        <Textarea
          id="description"
          placeholder="Share an update with the community..."
          className="min-h-[150px] max-h-[150px] bg-gray-100"
          style={{ wordBreak: 'break-word' }}
          disabled={isLoading}
        />

        {/* buttons */}
        <div className="flex justify-end gap-4">
          <Button variant="outline" disabled={isLoading}>
            <IconPhoto />
            Add Image
          </Button>
          <Button disabled={isLoading}>
            <IconSend />
            Post Update
          </Button>
        </div>
      </div>
    </>
  );
}
