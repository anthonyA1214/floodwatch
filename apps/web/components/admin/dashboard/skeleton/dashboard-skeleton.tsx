import { Skeleton } from '@/components/ui/skeleton';
import StatCardSkeleton from '@/components/admin/dashboard/skeleton/stat-card-skeleton';
import ActiveFloodAlertsCardSkeleton from './active-flood-alerts-card-skeleton';
import SafetyLocationsCardSkeleton from './safety-locations-card-skeleton';

export default function DashboardSkeleton() {
  return (
    <div className="flex-1 flex flex-col bg-white p-8 rounded-2xl gap-8 min-h-0">
      {/* Header */}
      <div className="space-y-2">
        <Skeleton className="h-9 w-64" />
        <Skeleton className="h-4 w-80" />
      </div>

      <div className="flex-1 h-0 overflow-hidden">
        <div className="space-y-8 pr-4">
          {/* Stat Cards */}
          <div className="grid grid-cols-2 gap-8">
            {Array.from({ length: 2 }).map((_, i) => (
              <StatCardSkeleton key={i} />
            ))}
          </div>

          {/* Active Flood Alerts */}
          <div className="grid rounded-2xl border shadow-md p-6 gap-6">
            {/* Section header */}
            <div className="flex gap-2 items-center">
              <Skeleton className="size-7 rounded" />
              <Skeleton className="h-5 w-40" />
            </div>
            <div className="grid gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <ActiveFloodAlertsCardSkeleton key={i} />
              ))}
            </div>
          </div>

          {/* Safety Locations */}
          <div className="grid rounded-2xl border shadow-md p-6 gap-6">
            {/* Section header */}
            <div className="flex gap-2 items-center">
              <Skeleton className="size-7 rounded" />
              <Skeleton className="h-5 w-36" />
            </div>
            <div className="grid gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <SafetyLocationsCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
