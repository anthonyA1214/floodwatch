import SearchBar from '@/components/admin/interactive-map-components/search-bar-component';
import MapHolder from '@/components/admin/interactive-map-components/map-component';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import Paginator from '@/components/admin/interactive-map-components/paginator-component';
import CreateFloodAlertModal from '@/components/admin/interactive-map-components/create-flood-alert-modal';
import CreateSafeZoneModal from '@/components/admin/interactive-map-components/create-safe-zone-modal';
import FloodedAreaCard from '@/components/admin/interactive-map-components/flooded-area-card';
import SafeAreaCard from '@/components/admin/interactive-map-components/safe-area-card';

export default function InteractiveMap() {
  return (
    <div className="flex-1 rounded-3xl p-8 bg-white shadow-sm border border-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight">
        Interactive Map
      </h2>
      <div className="mb-6">
        {' '}
        <SearchBar />{' '}
      </div>

      <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-250px)]">
        {/* Map View */}
        <div className="flex-2 relative rounded-3xl overflow-hidden border border-gray-200 bg-slate-50 flex items-center justify-center">
          <MapHolder />
        </div>

        {/* Sidebar Controls */}
        <div className="flex-1 min-w-[380px] flex flex-col h-full">
          {/* ===== TABS (FULL HEIGHT) ===== */}
          <Tabs defaultValue="affected" className="w-full flex flex-col flex-1">
            {/* TAB HEADERS */}
            <TabsList className="w-full bg-[#6FA8DC] rounded-sm flex h-18 p-2">
              <TabsTrigger
                value="affected"
                className="flex-1 rounded-sm text-md text-white data-[state=active]:bg-[#0066CC] data-[state=active]:text-white transition-all"
              >
                Affected Locations
              </TabsTrigger>

              <TabsTrigger
                value="safe"
                className="flex-1 rounded-sm text-md text-white data-[state=active]:bg-[#0066CC] data-[state=active]:text-white transition-all"
              >
                Safe Zone
              </TabsTrigger>
            </TabsList>

            {/* ===== TAB CONTENTS ===== */}
            <TabsContent
              value="affected"
              className="flex-1 flex flex-col overflow-hidden"
            >
              {/* Button to open modal */}
              <div className="py-2">
                <CreateFloodAlertModal />
              </div>

              {/* Scrollable list */}
              <div className="flex-1 rounded-xl border border-gray-200 bg-white p-4 overflow-y-auto">
                <FloodedAreaCard />
              </div>
            </TabsContent>

            <TabsContent
              value="safe"
              className="flex-1 flex flex-col overflow-hidden"
            >
              {/* Button to open modal */}
              <div className="py-2">
                <CreateSafeZoneModal />
              </div>

              {/* Scrollable list */}
              <div className="flex-1 rounded-xl border border-gray-200 bg-white p-4 overflow-y-auto">
                <SafeAreaCard />
              </div>
            </TabsContent>
          </Tabs>

          {/* ===== PAGINATOR STUCK TO BOTTOM ===== */}
          <div className="mt-auto pt-4 border-t border-gray-200 bg-white">
            <Paginator />
          </div>
        </div>
      </div>
    </div>
  );
}
