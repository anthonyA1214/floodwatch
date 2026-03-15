import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

export default function SafetyLocationPopupSkeleton() {
  return (
    <div className='flex flex-col justify-center rounded-lg overflow-hidden w-[300px] max-h-[70vh] overflow-y-auto bg-white'>
      {/* header — mirrors bg-[#9B32E4]/10 wrapper + blue bar */}
      <div className='bg-[#9B32E4]/10'>
        <div className='flex items-center justify-between bg-[#0066CC] p-3 text-white rounded-b-2xl'>
          <Skeleton className='h-4 w-32 bg-white/30' />
          <Skeleton className='size-4 rounded-full bg-white/30' />
        </div>
      </div>

      {/* official information banner */}
      <div className='flex w-full gap-1.5 p-3 bg-[#9B32E4]/10'>
        <Skeleton className='h-4 w-4 rounded-sm' />
        <Skeleton className='h-4 w-40' />
      </div>

      <Separator className='bg-[#9B32E4]/30' />

      <div className='flex flex-col'>
        <div className='flex flex-col gap-2 p-3'>
          {/* safety type */}
          <div className='flex justify-between gap-2 items-center'>
            <div className='flex items-center gap-1.5'>
              <Skeleton className='h-4 w-4 rounded-sm' />
              <Skeleton className='h-4 w-24' />
            </div>
            <Skeleton className='h-6 w-20 rounded-full' />
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

          <Separator />

          {/* address */}
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

        {/* overview + directions buttons */}
        <div className='flex justify-between items-center p-3 gap-2'>
          <Skeleton className='h-10 w-full rounded-lg' />
          <Skeleton className='h-10 w-full rounded-lg' />
        </div>
      </div>
    </div>
  );
}
