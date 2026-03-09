import { Empty } from '@/components/ui/empty';
import { IconPhotoOff } from '@tabler/icons-react';

export default function NoPhotoEmpty() {
  return (
    <Empty className='h-full border object-cover'>
      <IconPhotoOff className='w-full h-full opacity-50' />
    </Empty>
  );
}
