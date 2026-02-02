'use client';

import SearchBar from '@/components/map/search-bar';
import MapLegend from '@/components/map/map-legend';
import InteractiveMap from '@/components/map/interactive-map';
import { useState } from 'react';
export default function InteractiveMapPage() {
  const [showLegend, setShowLegend] = useState(false);

  return (
    <div className="relative w-full h-full">
      <SearchBar toggleLegend={() => setShowLegend(!showLegend)} />
      <MapLegend show={showLegend} />
      <InteractiveMap />
    </div>
  );
}
