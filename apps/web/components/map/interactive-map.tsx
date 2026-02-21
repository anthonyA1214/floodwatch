'use client';

import { useEffect, useRef } from 'react';

// ✅ CHANGED: added Source and Layer imports so we can draw the Caloocan boundary overlay
import Map, { Marker, Source, Layer, type MapRef } from 'react-map-gl/maplibre';

import 'maplibre-gl/dist/maplibre-gl.css';
// ⚠️ NOTE: This import is not needed in Next.js frontend and can cause warnings/errors.
// If you’re not using it, remove it.
// import { report } from 'process';

type SelectedLocation = {
  longitude: number;
  latitude: number;
  label: string;
};

//Mock data
export type FloodSeverity = 'Low' | 'Medium' | 'High';
export type FloodStatus = 'Pending' | 'Verified' | 'Resolved';

export type MockFloodReport = {
  id: string;
  longitude: number;
  latitude: number;
  locationName: string;
  severity: FloodSeverity;
  description: string;
  reportedAt: string; // ISO string
  status: FloodStatus;
};
//end

//function helper for color
function severityPinClass(severity: 'Low' | 'Medium' | 'High') {
  if (severity === 'High') return 'bg-red-600 border-t-red-600';
  if (severity === 'Medium') return 'bg-orange-500 border-t-orange-500';
  return 'bg-yellow-400 border-t-yellow-400';
}

export default function InteractiveMap({
  selectedLocation,
  mapId = 'main-map',
  reports = [], //added
  onSelectReport, //added

  // ✅ ADDED (STEP #2): caloocanGeoJson prop so we can draw the zone overlay
  caloocanGeoJson,
}: {
  selectedLocation?: SelectedLocation | null;
  mapId?: string; //added
  reports?: MockFloodReport[]; //added
  onSelectReport?: (report: MockFloodReport) => void; //added

  // ✅ ADDED (STEP #2): accept GeoJSON boundary data (Feature or FeatureCollection)
  caloocanGeoJson?: any;
}) {
  const mapRef = useRef<MapRef | null>(null);

  // When user searches a location, fly to it
  useEffect(() => {
    const loc = selectedLocation;
    const map = mapRef.current;
    if (!loc || !map) return;

    const currentZoom = typeof map.getZoom === 'function' ? map.getZoom() : 0;

    map.flyTo({
      center: [loc.longitude, loc.latitude],
      zoom: Math.max(currentZoom, 16),
      essential: true,
    });
  }, [selectedLocation]);

  const handleReportClick = (report: MockFloodReport) => {
    onSelectReport?.(report);

    // Optional: also fly to the report pin when clicked
    const map = mapRef.current;
    if (!map) return;

    const currentZoom = typeof map.getZoom === 'function' ? map.getZoom() : 0;

    map.flyTo({
      center: [report.longitude, report.latitude],
      zoom: Math.max(currentZoom, 16),
      essential: true,
    });
  };

  return (
    <Map
      id={mapId}
      ref={mapRef}
      initialViewState={{
        // Center around Metro Manila area (so your sample pins are visible)
        longitude: 121.03,
        latitude: 14.62,
        zoom: 12.8,
      }}
      mapStyle="https://tiles.openfreemap.org/styles/bright"
    >
      {/* ✅ ADDED (STEP #2): Caloocan boundary overlay */}
      {caloocanGeoJson && (
        <Source id="caloocan-zone" type="geojson" data={caloocanGeoJson}>
          {/* ✅ ADDED: zone fill (light transparent) */}
          <Layer
            id="caloocan-fill"
            type="fill"
            paint={{
              // keep it subtle so pins are still visible
              'fill-opacity': 0.08,
              'fill-color': '#3b82f6',
            }}
          />

          {/* ✅ ADDED: zone outline */}
          <Layer
            id="caloocan-outline"
            type="line"
            paint={{
              'line-width': 1,
              'line-opacity': 0.85,
              'line-color': '#1e40af', 
            }}
          />
        </Source>
      )}

      {/* ✅ Mock report pins */}
      {reports.map((report) => {
        // ✅ determine pin color based on severity
        const pinClass = severityPinClass(report.severity);

        // ✅ split into circle class + triangle class
        const [circleClass, triangleClass] = pinClass.split(' ');

        return (
          <Marker
            key={report.id}
            longitude={report.longitude}
            latitude={report.latitude}
            anchor="bottom"
          >
            <button
              type="button"
              onClick={() => handleReportClick(report)}
              className="relative"
              title={report.locationName}
              aria-label={`Flood report pin: ${report.locationName}`}
            >
              {/* ✅ Pin circle (severity-based color) */}
              <div className={`h-5 w-5 rounded-full shadow-md ${circleClass}`} />

              {/* ✅ Pin triangle (severity-based color) */}
              <div
                className={`mx-auto -mt-1 h-0 w-0 border-x-8 border-x-transparent border-t-12 ${triangleClass}`}
              />
            </button>
          </Marker>
        );
      })}

      {/* ✅ Search-selected location pin (red) */}
      {selectedLocation && (
        <Marker
          longitude={selectedLocation.longitude}
          latitude={selectedLocation.latitude}
          anchor="bottom"
        >
          <div
            title={selectedLocation.label}
            className="relative"
            aria-label="Selected location pin"
          >
            <div className="h-6 w-6 rounded-full bg-red-600 shadow-md" />
            <div className="mx-auto -mt-1 h-0 w-0 border-x-8 border-x-transparent border-t-12 border-t-red-600" />
          </div>
        </Marker>
      )}
    </Map>
  );
}