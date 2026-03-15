import { Skeleton } from '@/components/ui/skeleton';

export default function SafetyLocationsCardSkeleton() {
  return (
    <div className='grid rounded-lg p-4 gap-3 border'>
      {/* Top row: name + badge */}
      <div className='flex justify-between gap-8 items-center'>
        {/* Icon + name */}
        <div className='flex items-center gap-2'>
          <Skeleton className='h-5 w-5 rounded-full' />
          <Skeleton className='h-4 w-36' />
        </div>
        {/* Badge */}
        <Skeleton className='h-6 w-20 rounded-full' />
      </div>

      {/* Address */}
      <Skeleton className='h-4 w-3/4' />

      {/* Availability */}
      <div className='flex items-center gap-2'>
        <Skeleton className='h-4 w-4 rounded-full' />
        <Skeleton className='h-3 w-24' />
      </div>
    </div>
  );
}
