import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { IconMessage } from '@tabler/icons-react';

export default function NoUpdatesYetEmpty() {
  return (
    <div className="flex aspect-video items-center justify-center border rounded-2xl">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <IconMessage />
          </EmptyMedia>
          <EmptyTitle>No updates yet</EmptyTitle>
          <EmptyDescription>
            Be the first to share what&apos;s happening on the ground.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </div>
  );
}
