'use client';

/**
 * BoundaryContext (Option B: Precomputed per-barangay flood)
 *
 * What this file does:
 * - Fetch Caloocan boundary + outline (for base layers)
 * - Fetch barangay GeoJSON that is already enriched with flood properties:
 *    - flood_max_var (number: typically 0..3)
 *    - flood_max_label (string)
 *    - flood_ratio / flood_area_m2, etc. (if present)
 *
 * What this file does NOT do:
 * - NO turf computation
 * - NO intersect loops
 * - NO requestIdleCallback compute
 *
 * Result:
 * - barangayGeoJSON: your barangay boundaries (same data)
 * - barangayFloodGeoJSON: SAME object as barangayGeoJSON (already enriched)
 */

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

type BoundaryContextType = {
  caloocanGeoJSON: GeoJSON.FeatureCollection | null;
  caloocanOutlineGeoJSON: GeoJSON.FeatureCollection | null;

  /**
   * Barangay boundaries. In Option B, this is already enriched with flood fields.
   */
  barangayGeoJSON: GeoJSON.FeatureCollection | null;

  /**
   * Same as barangayGeoJSON, but named for clarity in the map layer.
   * (Your map can use barangayFloodGeoJSON directly.)
   */
  barangayFloodGeoJSON: GeoJSON.FeatureCollection | null;

  /**
   * Loading + error state (useful for the sidebar and debugging).
   */
  isLoadingGeoJSON: boolean;
  geoJSONError: string | null;
};

const BoundaryContext = createContext<BoundaryContextType | null>(null);

export function BoundaryProvider({ children }: { children: React.ReactNode }) {
  const [caloocanGeoJSON, setCaloocanGeoJSON] =
    useState<GeoJSON.FeatureCollection | null>(null);

  const [caloocanOutlineGeoJSON, setCaloocanOutlineGeoJSON] =
    useState<GeoJSON.FeatureCollection | null>(null);

  const [barangayGeoJSON, setBarangayGeoJSON] =
    useState<GeoJSON.FeatureCollection | null>(null);

  const [barangayFloodGeoJSON, setBarangayFloodGeoJSON] =
    useState<GeoJSON.FeatureCollection | null>(null);

  const [isLoadingGeoJSON, setIsLoadingGeoJSON] = useState(false);
  const [geoJSONError, setGeoJSONError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchJson(path: string) {
      const res = await fetch(path, { signal: controller.signal });
      if (!res.ok) {
        throw new Error(`Failed to fetch ${path}: ${res.status} ${res.statusText}`);
      }
      return res.json();
    }

    async function load() {
      setIsLoadingGeoJSON(true);
      setGeoJSONError(null);

      try {
        // ✅ IMPORTANT: this barangay file must already contain flood_max_var / flood_max_label etc.
        const [details, outline, barangaysWithFlood] = await Promise.all([
          fetchJson('/geo/caloocan.geojson'),
          fetchJson('/geo/caloocan-outline.geojson'),
          fetchJson('/geo/caloocan-barangays-with-flood.geojson'),
        ]);

        setCaloocanGeoJSON(details);
        setCaloocanOutlineGeoJSON(outline);

        setBarangayGeoJSON(barangaysWithFlood);
        setBarangayFloodGeoJSON(barangaysWithFlood); // same reference, different meaning name

        // Quick sanity logs (optional)
        console.log('[GeoJSON loaded]', {
          caloocan: details?.features?.length,
          outline: outline?.features?.length,
          barangaysWithFlood: barangaysWithFlood?.features?.length,
        });

        // Sanity: count how many features have flood_max_var
        try {
          const feats = (barangaysWithFlood?.features ?? []) as any[];
          const hasVar = feats.filter((f) => typeof f?.properties?.flood_max_var === 'number').length;
          console.log('[Flood sanity]', { withFloodMaxVar: hasVar, total: feats.length });
        } catch {}
      } catch (err: any) {
        if (err?.name === 'AbortError') return;
        console.error('Failed to load GeoJSON files', err);
        setGeoJSONError(err?.message ?? 'Failed to load GeoJSON files');
      } finally {
        setIsLoadingGeoJSON(false);
      }
    }

    load();
    return () => controller.abort();
  }, []);

  const value = useMemo(
    () => ({
      caloocanGeoJSON,
      caloocanOutlineGeoJSON,
      barangayGeoJSON,
      barangayFloodGeoJSON,
      isLoadingGeoJSON,
      geoJSONError,
    }),
    [
      caloocanGeoJSON,
      caloocanOutlineGeoJSON,
      barangayGeoJSON,
      barangayFloodGeoJSON,
      isLoadingGeoJSON,
      geoJSONError,
    ],
  );

  return <BoundaryContext.Provider value={value}>{children}</BoundaryContext.Provider>;
}

export function useBoundary() {
  const context = useContext(BoundaryContext);
  if (!context) throw new Error('useBoundary must be used within BoundaryProvider');
  return context;
}