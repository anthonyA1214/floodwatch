import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

export default function WeatherDrawerSkeleton() {
  return (
    <div className='flex flex-col max-w-lg mx-auto w-full gap-2'>
      {/* Header skeleton */}
      <div className='flex items-center justify-between w-full px-3 border-b pb-3'>
        <div className='flex items-center gap-2'>
          <Skeleton className='w-9 h-9 rounded-full' />
          <Skeleton className='w-16 h-3' />
          <Skeleton className='w-12 h-3' />
        </div>
        <div className='flex items-center gap-2'>
          <Skeleton className='w-12 h-3' />
          <Skeleton className='w-12 h-3' />
        </div>
      </div>

      {/* Forecast rows skeleton */}
      <div className='flex flex-col gap-2 px-3'>
        <Skeleton className='w-24 h-3' />
        <Separator />
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className='flex items-center py-2 border-b last:border-b-0'
          >
            <div className='flex-[0.5] flex flex-col gap-1'>
              <Skeleton className='w-10 h-3' />
              <Skeleton className='w-8 h-3' />
            </div>
            <div className='flex-1 flex items-center gap-2'>
              <Skeleton className='w-9 h-9 rounded-full' />
              <Skeleton className='w-8 h-3' />
            </div>
            <div className='flex-1 flex items-center gap-2'>
              <Skeleton className='w-14 h-3' />
              <Skeleton className='w-10 h-3' />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
