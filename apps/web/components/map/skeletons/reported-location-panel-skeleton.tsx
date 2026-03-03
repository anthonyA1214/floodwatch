import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

export function ReportedLocationPanelSkeleton() {
  return (
    <div className="flex-1 min-h-0 overflow-y-auto">
      {/* image */}
      <Skeleton className="aspect-video w-full shrink-0" />

      <div className="flex flex-col p-4 gap-4 border-l-4 border-gray-200">
        {/* location name */}
        <Skeleton className="h-6 w-3/4" />

        <Separator />

        {/* status + reported at */}
        <div className="flex flex-row justify-between gap-4">
          <Skeleton className="h-8 w-36 rounded-full" />
          <Skeleton className="h-5 w-28" />
        </div>

        {/* details card */}
        <div className="flex flex-col border rounded-lg text-sm">
          {/* reported by */}
          <div className="flex justify-between items-center p-4">
            <Skeleton className="h-4 w-28" />
            <div className="flex items-center gap-2">
              <Skeleton className="size-5 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>

          <Separator />

          {/* verified by */}
          <div className="flex justify-between items-center p-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-20" />
          </div>

          <Separator />

          {/* date & time */}
          <div className="flex justify-between items-center p-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-36" />
          </div>

          <Separator />

          {/* severity */}
          <div className="flex justify-between items-center p-4">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-7 w-20 rounded-full" />
          </div>
        </div>

        {/* credibility card */}
        <div className="flex flex-col border rounded-lg text-sm overflow-hidden">
          <div className="flex justify-between items-center p-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-10" />
          </div>
          <div className="flex">
            <Skeleton className="h-12 w-full rounded-none" />
          </div>
        </div>

        {/* get directions button */}
        <Skeleton className="h-12 w-full rounded-lg" />
      </div>
    </div>
  );
}
