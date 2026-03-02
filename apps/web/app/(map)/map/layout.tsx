import TopNav from '@/components/map/top-nav';
import { LocationsPanelContextProvider } from '@/contexts/locations-panel-context';
import { PanelContextProvider } from '@/contexts/panel-context';

export default function MapLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <PanelContextProvider>
      <LocationsPanelContextProvider>
        <div className="flex flex-col h-dvh overscroll-none overflow-hidden">
          <TopNav />
          <main className="flex-1 overflow-hidden">{children}</main>
        </div>
      </LocationsPanelContextProvider>
    </PanelContextProvider>
  );
}
