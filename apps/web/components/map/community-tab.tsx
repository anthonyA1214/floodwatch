import CommentComposer from '@/components/shared/comment-composer';

export default function CommunityTab() {
  return (
    <div className='flex flex-col gap-6'>
      <CommentComposer reportId={100000} />
    </div>
  );
}
