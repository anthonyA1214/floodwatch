import { Skeleton } from '@/components/ui/skeleton';

export function PostCardSkeleton({ hasImage }: { hasImage: boolean }) {
  return (
    <div className="flex flex-col rounded-2xl p-4 border gap-4">
      {/* Author row */}
      <div className="flex gap-2 items-center">
        <Skeleton className="size-10 rounded-full shrink-0" />
        <div className="flex flex-col w-full gap-1.5">
          <div className="flex justify-between items-center">
            {/* Name */}
            <Skeleton className="h-4 w-28" />
            {/* Flag + trash */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Skeleton className="size-8 rounded-full" />
                <Skeleton className="h-3 w-3" />
              </div>
              <Skeleton className="size-8 rounded-full" />
            </div>
          </div>
          {/* Timestamp + location */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-3 rounded-full" />
            <Skeleton className="h-3 w-36" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-1.5">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
        {!hasImage && <Skeleton className="h-3 w-3/4" />}
      </div>

      {/* Optional image */}
      {hasImage && <Skeleton className="w-full h-48 rounded-lg" />}
    </div>
  );
}
