import { Skeleton } from '@/components/ui/skeleton';

export default function SafetyLocationsCardSkeleton() {
  return (
    <div className="grid border-l-4 border-gray-200 rounded-lg p-4 gap-4 bg-gray-50">
      <div className="flex justify-between gap-8 items-center">
        {/* Name: icon + text */}
        <div className="flex items-center gap-2">
          <Skeleton className="size-5 rounded" />
          <Skeleton className="h-4 w-40" />
        </div>
        {/* Type badge */}
        <Skeleton className="h-7 w-20 rounded-full" />
      </div>
      {/* Address */}
      <Skeleton className="h-3 w-56" />
      {/* Availability */}
      <div className="flex items-center gap-2">
        <Skeleton className="size-4 rounded" />
        <Skeleton className="h-3 w-16" />
      </div>
    </div>
  );
}
