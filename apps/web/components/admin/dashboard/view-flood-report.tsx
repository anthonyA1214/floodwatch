'use client';

import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { IconMapPin } from '@tabler/icons-react';
import {
  Avatar as UIAvatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import Avatar from 'boring-avatars';

export default function ViewFloodReportDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='flex h-[80vh] min-w-[50vw] flex-col gap-0 overflow-hidden border-0 p-0 [&>button]:text-white [&>button]:opacity-70 [&>button]:hover:opacity-100 [&>button]:hover:text-white'>
        {/* blue header */}
        <DialogHeader className='shrink-0 rounded-b-2xl bg-[#0066CC] px-5 py-4'>
          <div className='flex flex-col space-y-0 text-white'>
            <DialogTitle className='font-poppins text-base font-semibold'>
              FLOOD REPORT
            </DialogTitle>
            <DialogDescription className='text-sm text-blue-100'>
              March 7, 2026 at 10:33 PM
            </DialogDescription>
          </div>
        </DialogHeader>

        {/* scrollable content */}
        <ScrollArea className='min-h-0 flex-1'>
          <div className='flex flex-col gap-6 p-6'>
            <div className='flex gap-4'>
              <div className='flex-1'>
                <div className='relative aspect-[1.05/1] overflow-hidden rounded-2xl border'>
                  <Image
                    src='/no-data-rafiki.svg'
                    alt='Map preview'
                    fill
                    className='object-cover opacity-60'
                  />
                </div>
              </div>

              <div className='flex-1'>
                <div className='overflow-hidden rounded-2xl border bg-white'>
                  <div className='border-b px-4 py-3'>
                    <span className='font-poppins text-base font-semibold text-gray-600'>
                      REPORT DETAILS
                    </span>
                  </div>

                  <div className='flex items-center justify-between px-4 py-4'>
                    <span className='text-sm font-medium text-gray-600'>
                      REPORTER
                    </span>

                    <div className='flex items-center gap-3'>
                      <UIAvatar className='size-8'>
                        <AvatarImage src='' />
                        <AvatarFallback>
                          <Avatar
                            name='Nick Dagum'
                            variant='beam'
                            className='size-8'
                          />
                        </AvatarFallback>
                      </UIAvatar>

                      <div className='flex flex-col text-right'>
                        <span className='text-sm font-medium text-gray-700'>
                          Nick Dagum
                        </span>
                        <span className='text-xs text-gray-500'>
                          nickdagum@gmail.com
                        </span>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className='flex items-center justify-between px-4 py-4'>
                    <span className='text-sm font-medium text-gray-600'>
                      SEVERITY LEVEL
                    </span>

                    <div className='rounded-full border border-red-300 bg-red-50 px-3 py-1'>
                      <span className='text-xs font-medium text-red-500'>
                        Critical
                      </span>
                    </div>
                  </div>

                  <Separator />

                  <div className='flex items-center justify-between px-4 py-4'>
                    <span className='text-sm font-medium text-gray-600'>
                      STATUS
                    </span>

                    <div className='rounded-full border border-orange-300 bg-orange-50 px-3 py-1'>
                      <span className='text-xs font-medium text-orange-500'>
                        Unverified report
                      </span>
                    </div>
                  </div>

                  <Separator />

                  <div className='flex items-center justify-between px-4 py-4'>
                    <span className='text-sm font-medium text-gray-600'>
                      CONFIRMS
                    </span>
                    <span className='text-sm font-semibold text-gray-700'>
                      32
                    </span>
                  </div>

                  <Separator />

                  <div className='flex items-center justify-between px-4 py-4'>
                    <span className='text-sm font-medium text-gray-600'>
                      DENIES
                    </span>
                    <span className='text-sm font-semibold text-gray-700'>
                      4
                    </span>
                  </div>

                  <Separator />

                  <div className='flex items-center justify-between px-4 py-4'>
                    <span className='text-sm font-medium text-gray-600'>
                      CREDIBILITY
                    </span>
                    <span className='text-sm font-semibold text-gray-700'>
                      88.89%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className='flex items-center gap-2'>
              <IconMapPin className='h-6 w-6 text-[#0066CC]' />
              <span className='text-sm text-gray-600'>
                Kai mall, barangay 178 bagong silang caloocan city
              </span>
            </div>

            <div className='flex flex-col gap-3'>
              <span className='font-poppins text-base font-semibold text-gray-600'>
                DESCRIPTION
              </span>

              <div className='min-h-[72px] rounded-2xl border bg-accent p-4'>
                <p className='text-sm text-gray-500'>
                  Water level rising fast near elementary school grounds.
                </p>
              </div>
            </div>

            <div className='flex flex-col gap-3'>
              <span className='font-poppins text-base font-semibold text-gray-600'>
                IMAGE
              </span>

              <div className='relative aspect-[16/6] overflow-hidden rounded-2xl bg-yellow-400'>
                <Image
                  src='/no-data-rafiki.svg'
                  alt='Flood report image'
                  fill
                  className='object-cover opacity-30'
                />
              </div>
            </div>
          </div>
        </ScrollArea>

        <DialogFooter className='shrink-0 rounded-t-2xl bg-[#F9F9F9] px-5 py-4'>
          <Button className='min-w-[140px] bg-[#0066CC] hover:bg-[#0057AD]'>
            Verify Report
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
