import { Skeleton } from '@/components/ui/skeleton';

export default function AffectedLocationsCardSkeleton() {
  return (
    <div className='grid rounded-lg p-4 gap-3 border'>
      {/* Top row: location + badge */}
      <div className='flex justify-between gap-8 items-start'>
        <div className='flex items-center gap-2'>
          <Skeleton className='w-5 h-5 rounded shrink-0' />
          <Skeleton className='h-4 w-32' />
        </div>
        <Skeleton className='h-6 w-20 rounded-full' />
      </div>

      {/* Description */}
      <div className='flex flex-col gap-1.5'>
        <Skeleton className='h-3.5 w-full' />
        <Skeleton className='h-3.5 w-4/5' />
      </div>

      {/* Reported at */}
      <div className='flex items-center gap-2'>
        <Skeleton className='w-4 h-4 rounded' />
        <Skeleton className='h-3 w-24' />
      </div>
    </div>
  );
}
