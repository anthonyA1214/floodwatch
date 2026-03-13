import TopNav from '@/components/map/top-nav';
import { MapFilterProvider } from '@/contexts/map-filter-context';
import { MapOverlayProvider } from '@/contexts/map-overlay-context';

export default function MapLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <MapOverlayProvider>
      <MapFilterProvider>
        <div className='flex flex-col h-dvh overscroll-none overflow-hidden'>
          <TopNav />
          <main className='flex-1 overflow-hidden'>{children}</main>
        </div>
      </MapFilterProvider>
    </MapOverlayProvider>
  );
}
