import { DataTableSkeleton } from '@/components/admin/users/skeleton/data-table-skeleton';
import PaginationSkeleton from '@/components/admin/pagination-skeleton';
import { Skeleton } from '@/components/ui/skeleton';
import ReportStatCardSkeleton from './report-stat-card-skeleton';

export default function FloodReportsPageSkeleton() {
  return (
    <div className="flex-1 flex flex-col bg-white p-8 rounded-2xl gap-8 min-h-0">
      {/* Header */}
      <Skeleton className="h-9 w-56" />

      {/* Search bar + Add button row */}
      <div className="flex justify-between gap-4">
        <Skeleton className="flex-1 h-10" />
        <Skeleton className="w-36 h-10" />
      </div>

      <div className="flex-1 flex flex-col min-h-0 gap-4">
        <div className="grid grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <ReportStatCardSkeleton key={i} />
          ))}
        </div>

        <DataTableSkeleton />

        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-40" />

          <PaginationSkeleton />
        </div>
      </div>
    </div>
  );
}
