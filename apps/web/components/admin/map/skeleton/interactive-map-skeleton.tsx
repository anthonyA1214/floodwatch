import { Skeleton } from '@/components/ui/skeleton';
import AffectedLocationsCardSkeleton from './affected-locations-card-skeleton';

export default function InteractiveMapSkeleton() {
  return (
    <div className="flex-1 flex flex-col bg-white p-8 rounded-2xl gap-8 min-h-0">
      {/* Header */}
      <Skeleton className="h-9 w-48" />

      <div className="flex-1 flex flex-col min-h-0 gap-6">
        {/* Search bar */}
        <Skeleton className="h-12 w-full rounded-full" />

        <div className="flex flex-1 gap-6 min-h-0">
          {/* Map Panel — ~2/3 width */}
          <div className="relative flex-2 min-h-0 rounded-2xl overflow-hidden border">
            <Skeleton className="absolute inset-0" />
            {/* Layer toggle button — top right */}
            <Skeleton className="absolute top-4 right-4 z-10 size-9 rounded-lg" />
          </div>

          {/* Right Panel — ~1/3 width */}
          <div className="flex-1 min-h-0 flex flex-col gap-2">
            {/* Tabs */}
            <div className="bg-[#EFF6FF] flex gap-1.5 p-1.5 rounded-xl">
              {/* Active tab filled blue */}
              <Skeleton className="flex-1 h-12 rounded-md bg-[#0066CC]/30" />
              <Skeleton className="flex-1 h-12 rounded-md" />
            </div>

            {/* Create Flood Alert button */}
            <Skeleton className="h-12 w-full rounded-xl" />

            {/* Cards list */}
            <div className="flex-1 flex flex-col rounded-2xl border min-h-0 overflow-hidden">
              <div className="flex-1 p-4 space-y-4 overflow-hidden">
                {Array.from({ length: 3 }).map((_, i) => (
                  <AffectedLocationsCardSkeleton key={i} />
                ))}
              </div>

              {/* Pagination */}
              <div className="border-t p-2 flex justify-center">
                <div className="flex items-center gap-1">
                  <Skeleton className="h-8 w-20 rounded-md" />
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-8 w-8 rounded-md" />
                  ))}
                  <Skeleton className="h-8 w-8 rounded-md" />
                  <Skeleton className="h-8 w-16 rounded-md" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
