import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

export function ReportedLocationDrawerSkeleton() {
  return (
    <div className="relative w-full h-full bg-white z-50 min-h-0 flex flex-col max-w-lg pointer-events-auto">
      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="flex flex-col p-2 sm:p-3 gap-2 lg:gap-3 border-l-4 border-gray-200">
          {/* location name */}
          <Skeleton className="h-6 w-3/4" />

          <Separator />

          {/* status + reported at */}
          <div className="flex flex-row justify-between gap-4">
            <Skeleton className="h-8 w-36 rounded-full" />
            <Skeleton className="h-5 w-28" />
          </div>

          {/* details card */}
          <div className="flex flex-col border rounded-lg text-xs lg:text-sm">
            {/* reported by */}
            <div className="flex justify-between items-center p-3 lg:p-4">
              <Skeleton className="h-4 w-28" />
              <div className="flex items-center gap-2">
                <Skeleton className="size-5 rounded-full" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>

            <Separator />

            {/* verified by */}
            <div className="flex justify-between items-center p-3 lg:p-4">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20" />
            </div>

            <Separator />

            {/* date & time */}
            <div className="flex justify-between items-start p-3 lg:p-4">
              <Skeleton className="h-4 w-24" />
              <div className="flex flex-col items-end gap-1">
                <Skeleton className="h-4 w-36" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>

            <Separator />

            {/* severity */}
            <div className="flex justify-between items-center p-3 lg:p-4">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-7 w-20 rounded-full" />
            </div>
          </div>

          {/* image */}
          <Skeleton className="aspect-video w-full shrink-0" />

          {/* credibility + confirm/deny card */}
          <div className="flex flex-col border rounded-lg text-xs lg:text-sm overflow-hidden">
            <div className="flex justify-between items-center p-3 lg:p-4">
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

        {/* community updates divider */}
        <div className="flex gap-4 text-xs items-center px-2 lg:px-0 my-2">
          <div className="h-px flex-1 bg-gray-200" />
          <Skeleton className="h-3 w-36" />
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        {/* post composer + post cards */}
        <div className="flex flex-col gap-6 p-3 lg:p-4">
          {/* composer */}
          <div className="flex gap-3 items-start">
            <Skeleton className="size-8 rounded-full shrink-0" />
            <Skeleton className="h-20 flex-1 rounded-lg" />
          </div>

          {/* post card 1 */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Skeleton className="size-8 rounded-full" />
              <div className="flex flex-col gap-1">
                <Skeleton className="h-3 w-28" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <div className="flex gap-3">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>

          {/* post card 2 (with image) */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <Skeleton className="size-8 rounded-full" />
              <div className="flex flex-col gap-1">
                <Skeleton className="h-3 w-28" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/6" />
            <Skeleton className="aspect-video w-full rounded-lg" />
            <div className="flex gap-3">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
