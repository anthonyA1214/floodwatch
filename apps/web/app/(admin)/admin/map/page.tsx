import SearchBar from '@/components/search-bar';
import MapPanel from '@/components/admin/map/map-panel';
import LocationsPanel from '@/components/admin/map/locations-panel';

export default function InteractiveMapPage() {
  return (
    <div className="flex-1 flex flex-col bg-white p-8 rounded-2xl gap-8 min-h-0">
      {/* Header */}
      <h1 className="font-poppins text-3xl font-bold">Interactive Map</h1>

      <div className="flex-1 flex flex-col min-h-0 gap-6">
        <SearchBar placeholder="Search location..." />

        <div className="flex flex-1 gap-6 min-h-0">
          {/* Map Panel */}
          <MapPanel />

          {/* Locations Panel */}
          <LocationsPanel />
        </div>
      </div>
    </div>
  );
}
