import { IconMapPinX } from '@tabler/icons-react';
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';

export default function LocationsListEmpty() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant='icon'>
          <IconMapPinX />
        </EmptyMedia>
        <EmptyTitle>No locations found</EmptyTitle>
        <EmptyDescription>
          Try adjusting the filter or check back later.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
}
