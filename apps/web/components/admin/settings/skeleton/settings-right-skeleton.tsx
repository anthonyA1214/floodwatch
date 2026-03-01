import { Skeleton } from '@/components/ui/skeleton';

export default function SettingsRightSkeleton() {
  return (
    <div className="flex flex-col min-h-0">
      {/* Tab triggers */}
      <div className="w-full border-b pb-0">
        <div className="flex gap-4 px-1">
          <div className="flex items-center gap-1.5 pb-3 border-b-2 border-[#0066CC]">
            <Skeleton className="size-4 rounded" />
            <Skeleton className="h-4 w-16" />
          </div>
          <div className="flex items-center gap-1.5 pb-3">
            <Skeleton className="size-4 rounded" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      </div>

      {/* Account tab content */}
      <div className="flex flex-col p-4 gap-8">
        <Skeleton className="h-5 w-36" />

        <div className="flex flex-col gap-6">
          {/* Full name row */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <div className="grid grid-cols-2 gap-3">
              <Skeleton className="h-10 w-full rounded-full" />
              <Skeleton className="h-10 w-full rounded-full" />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-10 w-full rounded-full" />
          </div>

          {/* Home address */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-10 w-full rounded-full" />
          </div>

          {/* Button */}
          <Skeleton className="h-11 w-full rounded-md" />
        </div>
      </div>
    </div>
  );
}
