import { Skeleton } from '@/components/ui/skeleton';

export default function CommentCardSkeleton({
  showImage = false,
}: {
  showImage?: boolean;
}) {
  return (
    <div className='flex flex-col rounded-2xl p-3 sm:p-4 border gap-3 sm:gap-4'>
      {/* Header row — avatar + name/timestamp + actions */}
      <div className='flex gap-2 items-center'>
        {/* Avatar */}
        <Skeleton className='size-8 sm:size-10 rounded-full shrink-0' />

        <div className='flex flex-col w-full gap-1.5'>
          <div className='flex justify-between w-full items-center'>
            {/* Author name */}
            <Skeleton className='h-4 w-28 sm:w-36' />

            {/* Flag + trash icons */}
            <div className='flex items-center gap-2 sm:gap-4'>
              <Skeleton className='h-7 w-7 rounded-full' />
              <Skeleton className='h-7 w-7 rounded-full' />
            </div>
          </div>

          {/* Timestamp */}
          <Skeleton className='h-3 w-20' />
        </div>
      </div>

      {/* Content lines */}
      <div className='min-w-0 flex flex-col gap-2'>
        <Skeleton className='h-3.5 w-full' />
        <Skeleton className='h-3.5 w-full' />
        <Skeleton className='h-3.5 w-3/4' />
      </div>

      {/* Optional image placeholder */}
      {showImage && (
        <Skeleton className='aspect-video w-full rounded-lg shrink-0' />
      )}
    </div>
  );
}
