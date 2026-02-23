import { Skeleton } from '@/components/ui/skeleton';

export default function PaginationSkeleton() {
  return (
    <div className="flex items-center gap-1">
      <Skeleton className="h-9 w-20 rounded-md" />
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-9 w-9 rounded-md" />
      ))}
      <Skeleton className="h-9 w-16 rounded-md" />
    </div>
  );
}
