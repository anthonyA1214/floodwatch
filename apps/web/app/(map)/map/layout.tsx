import { SideNav } from '@/components/map/side-nav';
import TopNav from '@/components/map/top-nav';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { PanelContextProvider } from '@/contexts/panel-context';
import { MapUIProvider } from '@/contexts/map-ui-context';
import { BoundaryProvider } from '@/contexts/boundary-context';

export default function MapLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider>
      <PanelContextProvider>
        <MapUIProvider>
          <BoundaryProvider>
            <SideNav />

            <SidebarInset>
              <div className="flex flex-col h-screen">
                <TopNav />
                <main className="flex-1 overflow-hidden">{children}</main>
              </div>
            </SidebarInset>
          </BoundaryProvider>
        </MapUIProvider>
      </PanelContextProvider>
    </SidebarProvider>
  );
}