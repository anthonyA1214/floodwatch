import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

export function ReportedLocationPanelSkeleton() {
  return (
    <div className='flex-1 min-h-0 overflow-y-auto'>
      {/* image */}
      <Skeleton className='aspect-video w-full shrink-0 rounded-none' />

      <div className='flex flex-col p-4 gap-4 border-l-4 border-muted shrink-0'>
        {/* location name */}
        <Skeleton className='h-6 w-3/4' />

        <Separator />

        {/* status + reported at */}
        <div className='flex flex-row justify-between gap-4'>
          <Skeleton className='h-8 w-36 rounded-full' />
          <Skeleton className='h-5 w-28' />
        </div>

        {/* details card */}
        <div className='flex flex-col border rounded-lg text-xs lg:text-sm'>
          {/* reported by */}
          <div className='flex justify-between items-center p-3 lg:p-4'>
            <Skeleton className='h-4 w-28' />
            <div className='flex items-center gap-2'>
              <Skeleton className='size-5 rounded-full' />
              <Skeleton className='h-4 w-24' />
            </div>
          </div>

          <Separator />

          {/* verified by */}
          <div className='flex justify-between items-center p-3 lg:p-4'>
            <Skeleton className='h-4 w-24' />
            <Skeleton className='h-4 w-20' />
          </div>

          <Separator />

          {/* date & time */}
          <div className='flex justify-between items-start p-3 lg:p-4'>
            <Skeleton className='h-4 w-24' />
            <div className='flex flex-col items-end gap-0.5'>
              <Skeleton className='h-4 w-36' />
              <Skeleton className='h-3 w-16' />
            </div>
          </div>

          <Separator />

          {/* severity */}
          <div className='flex justify-between items-center p-3 lg:p-4'>
            <Skeleton className='h-4 w-28' />
            <Skeleton className='h-7 w-20 rounded-full' />
          </div>
        </div>

        {/* credibility + vote buttons card */}
        <div className='flex flex-col border rounded-lg text-xs lg:text-sm overflow-hidden'>
          {/* credibility */}
          <div className='flex justify-between items-center p-3 lg:p-4'>
            <Skeleton className='h-4 w-24' />
            <Skeleton className='h-4 w-10' />
          </div>

          {/* vote buttons */}
          <div className='flex border-t'>
            <Skeleton className='h-12 flex-1 rounded-none' />
            <div className='w-px bg-border' />
            <Skeleton className='h-12 flex-1 rounded-none' />
          </div>
        </div>

        {/* get directions button */}
        <Skeleton className='h-12 w-full rounded-lg' />

        <Separator />

        {/* pagination */}
        <div className='flex items-center gap-3 sm:gap-6 justify-between'>
          <Skeleton className='h-8 w-full rounded-md' />
          <Skeleton className='h-4 w-8 shrink-0' />
          <Skeleton className='h-8 w-full rounded-md' />
        </div>
      </div>
    </div>
  );
}
