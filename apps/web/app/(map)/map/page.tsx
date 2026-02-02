'use client';

import SearchBar from '@/components/map/search-bar';
import MapLegend from '@/components/map/map-legend';
import InteractiveMap from '@/components/map/interactive-map';
import { useState } from 'react';
import ProfilePanel from '@/components/map/profile-panel';
import { useProfile } from '@/contexts/profile-context';
export default function InteractiveMapPage() {
  const [showLegend, setShowLegend] = useState(false);
  const { isOpen } = useProfile();

  return (
    <div className="relative w-full h-full">
      <SearchBar toggleLegend={() => setShowLegend(!showLegend)} />

      <div className="absolute top-4 right-4 z-10 flex gap-4 h-full">
        <MapLegend show={showLegend} />
        {isOpen && <ProfilePanel />}
      </div>

      <InteractiveMap />
    </div>
  );
}
