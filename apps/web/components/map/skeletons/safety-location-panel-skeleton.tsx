import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

export function SafetyLocationPanelSkeleton() {
  return (
    <div className='flex-1 min-h-0 overflow-y-auto'>
      {/* image */}
      <Skeleton className='aspect-video w-full shrink-0 rounded-none' />

      <div className='flex flex-col p-4 gap-4 border-l-4 border-muted shrink-0'>
        {/* official information banner — always shown for safety locations */}
        <div className='flex items-center gap-1.5 p-3 lg:p-4 bg-[#9B32E4]/10 rounded-lg'>
          <Skeleton className='h-4 w-4 rounded-sm shrink-0' />
          <Skeleton className='h-4 w-40' />
        </div>

        {/* location name */}
        <Skeleton className='h-6 w-3/4' />

        <Separator />

        {/* details card */}
        <div className='flex flex-col border rounded-lg text-xs lg:text-sm'>
          {/* safety type */}
          <div className='flex justify-between items-center p-3 lg:p-4'>
            <div className='flex items-center gap-1.5'>
              <Skeleton className='h-4 w-4 rounded-sm' />
              <Skeleton className='h-4 w-24' />
            </div>
            <Skeleton className='h-7 w-20 rounded-full' />
          </div>

          <Separator />

          {/* address */}
          <div className='flex justify-between items-center p-3 lg:p-4'>
            <div className='flex items-center gap-1.5 shrink-0'>
              <Skeleton className='h-4 w-4 rounded-sm' />
              <Skeleton className='h-4 w-16' />
            </div>
            <Skeleton className='h-4 w-36' />
          </div>

          <Separator />

          {/* added on */}
          <div className='flex justify-between items-start p-3 lg:p-4'>
            <div className='flex items-center gap-1.5 shrink-0'>
              <Skeleton className='h-4 w-4 rounded-sm' />
              <Skeleton className='h-4 w-20' />
            </div>
            <div className='flex flex-col items-end gap-0.5'>
              <Skeleton className='h-4 w-36' />
              <Skeleton className='h-3 w-16' />
            </div>
          </div>
        </div>

        {/* get directions button */}
        <Skeleton className='h-12 w-full rounded-lg' />
      </div>
    </div>
  );
}
