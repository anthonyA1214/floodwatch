'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import {
  IconCamera,
  IconCheck,
  IconTrash,
  IconUpload,
} from '@tabler/icons-react';
import {
  Avatar as UIAvatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import Avatar from 'boring-avatars';
import { Separator } from '@/components/ui/separator';
import { useUser } from '@/hooks/use-user';
import { useState, useRef } from 'react';
import { updateProfilePhoto } from '@/lib/actions/profile-photo-actions';
import { mutate } from 'swr';
import { SWR_KEYS } from '@/lib/constants/swr-keys';

interface FileWithPreview extends File {
  preview: string;
}

export function ProfilePhotoModal() {
  const { user } = useUser();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<FileWithPreview | null>(null);
  const [open, setOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Validate file type
      if (!selectedFile.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      // Validate file size (e.g., max 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      const preview = URL.createObjectURL(selectedFile);
      const fileWithPreview = Object.assign(selectedFile, { preview });
      setFile(fileWithPreview);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = () => {
    if (file) {
      URL.revokeObjectURL(file.preview);
    }
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) return;

    setIsUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const result = await updateProfilePhoto(formData);

      if (result.status === 'success') {
        await mutate(SWR_KEYS.me);
        setOpen(false);

        URL.revokeObjectURL(file.preview);
        setFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } else if (result.errors?.file) {
        setError(result.errors.file[0]);
      } else {
        setError('Failed to upload profile photo. Please try again.');
      }
    } catch (err) {
      setError('Failed to upload profile photo. Please try again.');
      console.error('Upload error:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);

    if (!newOpen && file) {
      setTimeout(() => {
        if (file?.preview) {
          URL.revokeObjectURL(file.preview);
        }
        setFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }, 300);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button className="absolute bottom-1.5 right-1.5 bg-[#0066CC] text-white rounded-full p-2 hover:bg-[#0052A3] transition-colors">
          <IconCamera />
        </button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          <DialogHeader>
            <DialogTitle className="font-poppins text-xl font-semibold">
              Change{' '}
              <span className="text-[#0066CC] font-bold">Profile Picture!</span>
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col items-center justify-center gap-6">
            <div className="flex flex-col items-center gap-8 w-full">
              {/* Show preview if file is selected, otherwise show current photo */}
              <UIAvatar className="size-32">
                <AvatarImage
                  src={file?.preview || user?.profilePicture}
                  className="object-cover"
                />
                <AvatarFallback>
                  <Avatar
                    name={`${user?.name} ${user?.id}`}
                    variant="beam"
                    className="size-32"
                  />
                </AvatarFallback>
              </UIAvatar>

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              <div className="grid grid-cols-1 gap-4 w-full">
                <div className="grid grid-cols-2 gap-4 w-full">
                  <Button
                    type="button"
                    onClick={handleUploadClick}
                    variant="outline"
                    className="flex gap-2 items-center w-full border-[#0066CC] text-[#0066CC] 
                hover:bg-[#0066CC]/10 hover:text-[#0066CC] text-base py-5"
                  >
                    <IconUpload className="w-[1em]! h-[1em]!" />
                    Upload
                  </Button>
                  <Button
                    type="button"
                    onClick={handleRemove}
                    disabled={!user?.profilePicture}
                    variant="ghost"
                    className="flex gap-2 items-center w-full text-base py-5 hover:bg-[#FB2C36]/10 hover:text-[#FB2C36] disabled:opacity-50"
                  >
                    <IconTrash className="w-[1em]! h-[1em]!" />
                    Remove
                  </Button>
                </div>

                {file && (
                  <Button
                    type="submit"
                    disabled={!file || isUploading}
                    className="flex gap-2 items-center w-full text-base py-5 disabled:opacity-50"
                  >
                    <IconCheck className="w-[1em]! h-[1em]!" />
                    <span>{isUploading ? 'Applying...' : 'Apply Changes'}</span>
                  </Button>
                )}
              </div>

              {/* Error display */}
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>

            <Separator />

            <DialogClose asChild>
              <Button variant="outline" className="w-full text-base py-5">
                Cancel
              </Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
