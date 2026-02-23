import { Skeleton } from '@/components/ui/skeleton';

export default function AffectedLocationsCardSkeleton() {
  return (
    <div className="grid rounded-lg p-4 gap-3 border">
      <div className="flex justify-between gap-8 items-center">
        {/* Icon + name */}
        <div className="flex items-center gap-2">
          <Skeleton className="size-4 rounded" />
          <Skeleton className="h-3.5 w-28" />
        </div>
        {/* Badge */}
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
      {/* Message/address: 2 lines */}
      <div className="space-y-1.5">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-2/3" />
      </div>
      {/* Time/availability */}
      <div className="flex items-center gap-2">
        <Skeleton className="size-3.5 rounded" />
        <Skeleton className="h-3 w-20" />
      </div>
    </div>
  );
}
