'use client';

import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Avatar as UIAvatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import Avatar from 'boring-avatars';
import { IconPhoto, IconSend, IconX } from '@tabler/icons-react';
import { useUser } from '@/hooks/use-user';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import Image from 'next/image';
import { createCommentSchema } from '@repo/schemas';
import { apiFetchClient } from '@/lib/api-fetch-client';
import { useComments } from '@/hooks/use-comments';
import { Spinner } from '../ui/spinner';

export default function CommentComposer({ reportId }: { reportId: number }) {
  const { mutateComments } = useComments(reportId);
  const { user, isLoading } = useUser();
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isPending, setIsPending] = useState(false);

  const resetForm = () => {
    setImage(null);
    setPreview(null);
    setContentValue('');
  };

  const isLoggedIn = !isLoading && !!user;

  // form data
  const [contentValue, setContentValue] = useState<string | undefined>(
    undefined,
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) {
      setImage(null);
      return;
    }

    // Validate type
    if (!file.type.startsWith('image/')) {
      toast.warning('Please select a valid image file.');
      e.target.value = ''; // reset input
      return;
    }

    // Validate size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.warning('File size must be less than 5MB.');
      e.target.value = ''; // reset input
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));

    // Reset file input to allow re-uploading the same file if needed
    e.target.value = '';
  };

  const handleRemoveImage = () => {
    if (preview) URL.revokeObjectURL(preview);
    setImage(null);
    setPreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!contentValue && !image) {
      toast.error('Please enter content or add an image.');
      return;
    }

    const parsed = createCommentSchema.safeParse({
      content: contentValue?.trim(),
    });

    if (!parsed.success) {
      toast.error('Please enter a comment.');
      return;
    }

    const { content } = parsed.data;

    const formData = new FormData();
    formData.append('content', content || '');
    if (image) formData.append('image', image);

    try {
      setIsPending(true);
      await apiFetchClient(`/reports/${reportId}/comments`, {
        method: 'POST',
        body: formData,
      });
      mutateComments();
    } catch (err) {
      console.error('Error submitting comment:', err);
      toast.error('Failed to post comment. Please try again.');
    } finally {
      resetForm();
      setIsPending(false);
    }
  };

  return (
    <form className='flex flex-col gap-3 sm:gap-4 rounded-2xl p-3 sm:p-4 md:p-5 border'>
      {/* user */}
      <div className='flex gap-2 items-center'>
        {isLoading ? (
          <>
            <Skeleton className='size-8 sm:size-10 rounded-full shrink-0' />
            <div className='flex flex-col gap-1'>
              <Skeleton className='h-3.5 sm:h-4 w-20 sm:w-24' />
              <Skeleton className='h-2.5 sm:h-3 w-14 sm:w-16' />
            </div>
          </>
        ) : isLoggedIn ? (
          <>
            <UIAvatar className='size-8 sm:size-10 border shrink-0'>
              <AvatarImage src={user?.profilePicture} />
              <AvatarFallback>
                <Avatar
                  name={`${user?.name} ${user?.id}`}
                  variant='beam'
                  className='size-8 sm:size-10'
                />
              </AvatarFallback>
            </UIAvatar>
            <div className='flex flex-col'>
              <span className='font-semibold text-sm sm:text-base truncate'>
                {user?.name}
              </span>
              <span className='text-xs text-gray-600 truncate'>
                {user?.role.toUpperCase()}
              </span>
            </div>
          </>
        ) : (
          <>
            <UIAvatar className='size-8 sm:size-10 shrink-0'>
              <AvatarFallback>?</AvatarFallback>
            </UIAvatar>
            <div className='flex flex-col min-w-0'>
              <span className='font-semibold text-sm sm:text-base text-gray-600'>
                Guest
              </span>
              <span className='text-xs text-gray-600'>Sign in to post</span>
            </div>
          </>
        )}
      </div>

      {/* textarea */}
      <Textarea
        id='content'
        name='content'
        placeholder='Share an update with the community...'
        className='min-h-[100px] sm:min-h-[130px] md:min-h-[150px] max-h-[150px] sm:max-h-[180px] bg-gray-100 text-sm'
        style={{ wordBreak: 'break-word' }}
        disabled={isLoading || !isLoggedIn}
        value={contentValue}
        onChange={(e) => setContentValue(e.target.value)}
      />

      {preview && (
        <div className='relative w-fit'>
          {/* group only wraps the image + overlay */}
          <div className='relative group'>
            <Image
              src={preview}
              alt='Preview'
              width={320}
              height={180}
              unoptimized
              className='rounded-lg object-cover border max-h-48 w-auto'
            />
            {/* overlay */}
            <div
              className='absolute inset-0 bg-black/50 
                top-0 left-0 flex flex-col gap-1 items-center 
                justify-center text-white opacity-0 cursor-pointer
                group-hover:opacity-100 transition-opacity rounded-lg'
              onClick={() => fileInputRef.current?.click()}
            >
              <IconPhoto className='w-[1.5em]! h-[1.5em]!' />
              <span className='font-poppins font-medium text-sm'>REPLACE</span>
            </div>
          </div>

          {/* X button outside the group */}
          <button
            type='button'
            onClick={handleRemoveImage}
            className='absolute -top-1.5 -right-1.5 bg-black text-white rounded-full p-0.5 hover:bg-gray-700 z-10'
          >
            <IconX className='size-3.5' />
          </button>
        </div>
      )}

      {/* hidden file input */}
      <input
        ref={fileInputRef}
        type='file'
        accept='image/*'
        onChange={handleImageChange}
        className='hidden'
      />

      {/* buttons */}
      <div className='flex justify-end gap-4'>
        <Button
          type='button'
          variant='outline'
          disabled={isLoading || !isLoggedIn}
          className='text-xs sm:text-sm'
          onClick={() => fileInputRef.current?.click()}
        >
          <IconPhoto />
          <span className='font-poppins'>
            {image ? 'CHANGE IMAGE' : 'ADD IMAGE'}
          </span>
        </Button>
        <Button
          disabled={isLoading || !isLoggedIn || isPending}
          className='text-xs sm:text-sm'
          onClick={handleSubmit}
        >
          {isPending ? (
            <>
              <Spinner />
              <span className='font-poppins'>POSTING...</span>
            </>
          ) : (
            <>
              <IconSend className='w-[1.5em]! h-[1.5em]!' />
              <span className='font-poppins'>POST UPDATE</span>
            </>
          )}
        </Button>
      </div>

      {/* login prompt */}
      {!isLoading && !isLoggedIn && (
        <p className='text-sm text-center text-gray-600'>
          <Link
            href='/auth/login'
            className='underline font-medium text-gray-600 hover:text-black'
          >
            Sign in
          </Link>{' '}
          to share an update with the community.
        </p>
      )}
    </form>
  );
}
