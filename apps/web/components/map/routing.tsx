'use client';

import { useEffect, useRef } from 'react';
import { useMap } from 'react-map-gl/maplibre';

import { AnyRouting } from '@any-routing/core';
import { HereProvider } from '@any-routing/here-data-provider';
import {
  defaultMapLibreProjectorOptions,
  MapLibreProjector,
} from '@any-routing/maplibre-engine';
import { AnnotationPlugin } from '@any-routing/annotation-plugin';

export default function Routing() {
  const { current: mapRef } = useMap();
  const routingRef = useRef<AnyRouting | null>(null);

  useEffect(() => {
    if (!mapRef) return;

    const map = mapRef.getMap();

    if (!map.isStyleLoaded()) {
      map.once('load', () => initRouting(map));
    } else {
      initRouting(map);
    }

    function initRouting(map: maplibregl.Map) {
      const dataProvider = new HereProvider({
        apiKey: '1234', // replace with real key
      });

      const projector = new MapLibreProjector({
        ...defaultMapLibreProjectorOptions,
        map,
      });

      const routing = new AnyRouting({
        dataProvider,
        waypointsSyncStrategy: 'none',
        plugins: [projector, new AnnotationPlugin({ map })],
      });

      routing.initialize();

      routing.setWaypoints([
        { position: { lat: 14.755722, lng: 121.030444 }, properties: { label: 'A' } },
        { position: { lat: 14.755278, lng: 121.030778 }, properties: { label: 'B' } },
      ]);

      routing.recalculateRoute({ fitViewToData: true });

      routingRef.current = routing;
    }

    return () => {
      // ✅ No destroy or clear needed
      // Just remove reference so GC can collect it
      routingRef.current = null;
    };
  }, [mapRef]);

  return null;
}
