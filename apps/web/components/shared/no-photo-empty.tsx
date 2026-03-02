import { Empty, EmptyHeader, EmptyMedia } from '@/components/ui/empty';
import { IconPhotoOff } from '@tabler/icons-react';

export default function NoPhotoEmpty() {
  return (
    <Empty className="h-full border">
      <EmptyHeader>
        <EmptyMedia>
          <IconPhotoOff />
        </EmptyMedia>
      </EmptyHeader>
    </Empty>
  );
}
