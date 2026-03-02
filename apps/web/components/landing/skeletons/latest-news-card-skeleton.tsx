import { Skeleton } from '@/components/ui/skeleton';

export default function LatestNewsCardSkeleton({
  variant = 'compact',
}: {
  variant?: 'featured' | 'compact';
}) {
  // FEATURED SKELETON
  if (variant === 'featured') {
    return (
      <div className="bg-white h-full flex flex-col rounded-2xl shadow-lg overflow-hidden">
        {/* Image */}
        <Skeleton className="aspect-video w-full rounded-t-2xl rounded-b-none" />

        {/* Content */}
        <div className="flex flex-1 flex-col gap-4 p-6 sm:p-6 md:p-8">
          <Skeleton className="h-5 w-28 rounded-full" />

          <div className="space-y-2">
            <Skeleton className="h-6 w-full rounded-md" />
            <Skeleton className="h-6 w-4/5 rounded-md" />

            <div className="space-y-1 pt-1">
              <Skeleton className="h-4 w-full rounded-md" />
              <Skeleton className="h-4 w-full rounded-md" />
              <Skeleton className="h-4 w-2/3 rounded-md" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // COMPACT SKELETON
  return (
    <div className="bg-white h-full flex rounded-2xl shadow-lg p-3 sm:p-4 gap-3 sm:gap-4">
      {/* Image */}
      <Skeleton className="aspect-square w-20 sm:w-24 md:w-28 shrink-0 rounded-2xl" />

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2">
        <Skeleton className="h-4 w-12 rounded-full" />

        <div className="space-y-1.5">
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-4/5 rounded-md" />

          <div className="space-y-1 pt-0.5">
            <Skeleton className="h-3 w-full rounded-md" />
            <Skeleton className="h-3 w-3/4 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}
