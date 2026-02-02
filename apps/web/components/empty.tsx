import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { Spinner } from '@/components/ui/spinner';

export function LoadingLogin() {
  return (
    <Empty>
      <EmptyContent>
        <EmptyMedia>
          <Spinner className="w-8 h-8 text-[#A590DB]" />
        </EmptyMedia>
      </EmptyContent>
    </Empty>
  );
}
