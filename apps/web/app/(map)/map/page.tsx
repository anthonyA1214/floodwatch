'use client';

import { Spinner } from '@/components/ui/spinner';
import dynamic from 'next/dynamic';

const InteractiveMapPage = dynamic(
  () => import('@/components/map/interactive-map-page'),
  {
    ssr: false,
    loading: () => (
      <div className='absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 pointer-events-none'>
        <Spinner className='size-16' />
        <span className='text-lg font-medium'>Loading map...</span>
      </div>
    ),
  },
);

export default function Page() {
  return <InteractiveMapPage />;
}
