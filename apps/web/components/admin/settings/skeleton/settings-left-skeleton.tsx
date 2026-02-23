import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

export default function SettingsLeftSkeleton() {
  return (
    <div className="flex flex-col items-center border-r p-4 gap-8">
      <div className="relative">
        <Skeleton className="size-40 rounded-full" />
      </div>

      <div className="flex flex-col text-center gap-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-5 w-56" />
      </div>

      <Separator />

      <div className="flex flex-col text-center w-full max-w-md gap-4">
        <div className="flex justify-between">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-5 w-24" />
        </div>
        <div className="flex justify-between">
          <Skeleton className="h-5 w-12" />
          <Skeleton className="h-5 w-8" />
        </div>
        <div className="flex justify-between">
          <Skeleton className="h-5 w-36" />
          <Skeleton className="h-5 w-6" />
        </div>
      </div>
    </div>
  );
}
