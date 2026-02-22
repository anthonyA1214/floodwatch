import { Skeleton } from '@/components/ui/skeleton';
import { PostCardSkeleton } from '@/components/admin/feed/skeleton/post-card-skeleton';

export default function CommunityFeedPageSkeleton() {
  return (
    <div className="flex-1 flex flex-col bg-white p-8 rounded-2xl gap-8 min-h-0">
      {/* header */}
      <Skeleton className="h-9 w-56" />

      {/* Search bar + flag button */}
      <div className="flex justify-between gap-4">
        <Skeleton className="flex-1 h-12 rounded-full" />
        <Skeleton className="size-12 rounded-full" />
      </div>

      <div className="flex-1 flex gap-4 min-h-0">
        {/* LEFT */}
        <div className="flex-3 flex flex-col gap-6 min-h-0">
          {/* Location bar */}
          <Skeleton className="h-14 w-full rounded-xl" />

          <div className="flex flex-col gap-6 overflow-hidden">
            {/* Post composer */}
            <div className="flex flex-col gap-4 rounded-2xl p-4 border">
              {/* Avatar + name */}
              <div className="flex gap-2 items-center">
                <Skeleton className="size-10 rounded-full shrink-0" />
                <div className="flex flex-col gap-1.5">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
              {/* Textarea */}
              <Skeleton className="h-[150px] w-full rounded-md" />
              {/* Buttons */}
              <div className="flex justify-end gap-4">
                <Skeleton className="h-9 w-28 rounded-md" />
                <Skeleton className="h-9 w-28 rounded-md" />
              </div>
            </div>

            {/* Post cards */}
            <PostCardSkeleton hasImage={false} />
            <PostCardSkeleton hasImage={true} />
            <PostCardSkeleton hasImage={true} />
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex-1 min-h-0 flex flex-col gap-4">
          {/* Mini map */}
          <Skeleton className="w-full aspect-square rounded-2xl" />

          {/* Preview location card */}
          <div className="flex flex-col border p-4 rounded-2xl gap-4">
            {/* Title */}
            <Skeleton className="h-6 w-40" />
            {/* Image */}
            <Skeleton className="w-full aspect-video rounded-2xl" />
            {/* Details */}
            <div className="flex flex-col gap-2 border border-gray-200 p-4 rounded-2xl bg-gray-50">
              <Skeleton className="h-3.5 w-48" />
              <div className="flex items-center gap-2">
                <Skeleton className="size-4 rounded" />
                <Skeleton className="h-3 w-24" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
