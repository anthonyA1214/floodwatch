'use client';

import { Map, Marker } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Spinner } from '@/components/ui/spinner';
import RadiusCircle from './radius-circle';

const SEVERITY_COLOR_MAP: Record<string, string> = {
  critical: '#FB2C36',
  high: '#FF6900',
  moderate: '#F0B204',
  low: '#2B7FFF',
};

export default function InteractiveMap({
  longitude,
  latitude,
  range,
  severity,
}: {
  longitude: number | null;
  latitude: number | null;
  range: number;
  severity: 'critical' | 'high' | 'moderate' | 'low';
}) {
  if (longitude === null || latitude === null) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-2">
        <Spinner className="size-16 text-[#0066CC]" />
        <span className="text-lg text-gray-600">Getting your location...</span>
      </div>
    );
  }

  return (
    <Map
      initialViewState={{
        longitude: longitude,
        latitude: latitude,
        zoom: 16,
      }}
      mapStyle="https://tiles.openfreemap.org/styles/bright"
    >
      <RadiusCircle
        longitude={longitude}
        latitude={latitude}
        range={range}
        severity={severity}
      />
      <Marker
        key={severity}
        longitude={longitude}
        latitude={latitude}
        color={SEVERITY_COLOR_MAP[severity]}
      />
    </Map>
  );
}
