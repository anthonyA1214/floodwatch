'use client';

import { useComments } from '@/hooks/use-comments';
import CommentCardsSkeleton from './skeletons/comment-cards-skeleton';
import CommentCard from './comment-card';
import NoUpdatesYetEmpty from './no-updates-yet-empty';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { useUser } from '@/hooks/use-user';

export default function CommentsList({
  reportId,
  scrollContainerId,
}: {
  reportId: number;
  scrollContainerId?: string;
}) {
  const { user } = useUser();

  const {
    comments,
    hasMore,
    isLoading,
    isValidating,
    isFetchingMore,
    loadMore,
  } = useComments(reportId);

  const { ref, inView } = useInView({
    threshold: 0.1,
    root:
      typeof window !== 'undefined' && scrollContainerId
        ? document.getElementById(scrollContainerId)
        : null,
  });

  useEffect(() => {
    if (inView && hasMore && !isLoading && !isValidating && !isFetchingMore) {
      loadMore();
    }
  }, [inView, hasMore, isLoading, isValidating, isFetchingMore, loadMore]);

  if (isLoading) return <CommentCardsSkeleton />;
  if (!isLoading && comments.length === 0) return <NoUpdatesYetEmpty />;

  const isAdmin = user?.role === 'admin';

  return (
    <div className="flex flex-col gap-4">
      {comments.map((comment) => (
        <CommentCard
          key={comment.id}
          author={{
            name: comment?.author?.name ?? 'Unknown User',
            profilePicture: comment?.author?.profilePicture ?? undefined,
          }}
          content={comment.content}
          timestamp={comment.createdAt}
          reportCount={0}
          isAdmin={isAdmin}
          isOwner={comment.author?.id === user?.id}
        />
      ))}
      {/* sentinel */}
      <div ref={ref} className={!hasMore ? 'invisible' : 'h-2'} />

      {isFetchingMore && <CommentCardsSkeleton />}

      {!hasMore && !isValidating && (
        <div className="flex gap-4 text-xs items-center px-2 lg:px-0">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="font-poppins font-bold opacity-50">
            YOU&apos;RE ALL CAUGHT UP
          </span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>
      )}
    </div>
  );
}
