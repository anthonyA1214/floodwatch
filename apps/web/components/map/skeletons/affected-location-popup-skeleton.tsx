import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

export default function AffectedLocationPopupSkeleton() {
  return (
    <div className='flex flex-col justify-center rounded-lg overflow-hidden w-[300px] max-h-[70vh] overflow-y-auto bg-white'>
      {/* header — no wrapper div since isAdmin is unknown */}
      <div className='flex items-center justify-between bg-[#0066CC] p-3 text-white rounded-b-2xl'>
        <Skeleton className='h-4 w-24 bg-white/30' />
        <Skeleton className='size-4 rounded-full bg-white/30' />
      </div>

      <div className='flex flex-col'>
        {/* time + status badge */}
        <div className='flex flex-row justify-between gap-4 p-3'>
          <div className='flex items-center gap-1.5'>
            <Skeleton className='h-4 w-4 rounded-sm shrink-0' />
            <Skeleton className='h-4 w-24' />
          </div>
          <Skeleton className='h-6 w-24 rounded-full' />
        </div>

        <Separator />

        {/* report details */}
        <div className='flex flex-col gap-2 p-3'>
          {/* severity level */}
          <div className='flex justify-between gap-2 items-center'>
            <div className='flex items-center gap-1.5'>
              <Skeleton className='h-4 w-4 rounded-sm' />
              <Skeleton className='h-4 w-24' />
            </div>
            <Skeleton className='h-6 w-16 rounded-full' />
          </div>

          <Separator />

          {/* date & time */}
          <div className='flex justify-between items-start gap-2'>
            <div className='flex items-center gap-1.5 shrink-0'>
              <Skeleton className='h-4 w-4 rounded-sm' />
              <Skeleton className='h-4 w-20' />
            </div>
            <div className='flex flex-col items-end gap-1'>
              <Skeleton className='h-3.5 w-28' />
              <Skeleton className='h-3 w-16' />
            </div>
          </div>

          <Separator />

          {/* location */}
          <div className='flex justify-between gap-2 items-start'>
            <div className='flex items-center gap-1.5 shrink-0'>
              <Skeleton className='h-4 w-4 rounded-sm' />
              <Skeleton className='h-4 w-16' />
            </div>
            <div className='flex flex-col items-end gap-1'>
              <Skeleton className='h-3.5 w-36' />
              <Skeleton className='h-3.5 w-24' />
            </div>
          </div>
        </div>

        <Separator />

        {/* credibility + vote buttons (non-admin default) */}
        <div className='flex flex-col text-xs'>
          <div className='flex justify-between items-center p-3'>
            <div className='flex items-center gap-1.5'>
              <Skeleton className='h-4 w-4 rounded-sm' />
              <Skeleton className='h-4 w-20' />
            </div>
            <Skeleton className='h-4 w-8' />
          </div>
          <div className='flex'>
            <Skeleton className='h-12 flex-1 rounded-none' />
            <div className='w-px bg-border' />
            <Skeleton className='h-12 flex-1 rounded-none' />
          </div>
        </div>

        {/* community / directions buttons */}
        <div className='flex justify-between items-center p-3 gap-2'>
          <Skeleton className='h-10 w-full rounded-lg' />
          <Skeleton className='h-10 w-full rounded-lg' />
        </div>

        <Separator />

        {/* pagination */}
        <div className='p-3'>
          <div className='flex items-center gap-3 justify-between'>
            <Skeleton className='h-8 w-full rounded-md' />
            <Skeleton className='h-4 w-8 shrink-0' />
            <Skeleton className='h-8 w-full rounded-md' />
          </div>
        </div>
      </div>
    </div>
  );
}
