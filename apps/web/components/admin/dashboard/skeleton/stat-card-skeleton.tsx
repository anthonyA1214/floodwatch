import { Skeleton } from '@/components/ui/skeleton';

export default function StatCardSkeleton() {
  return (
    <div className="flex items-center rounded-2xl border shadow-md p-6 gap-6">
      {/* Icon circle */}
      <Skeleton className="rounded-full size-14 shrink-0" />
      <div className="grid space-y-2">
        <Skeleton className="h-5 w-28" />
        <Skeleton className="h-10 w-12" />
      </div>
    </div>
  );
}
