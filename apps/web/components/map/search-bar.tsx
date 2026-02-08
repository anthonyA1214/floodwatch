'use client';

import { useMemo, useState } from 'react';
import { useMap } from 'react-map-gl/maplibre';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { IconLayersIntersect, IconSearch } from '@tabler/icons-react';

type NominatimResult = {
  lat: string;
  lon: string;
  display_name: string;
};

export default function SearchBar({
  toggleLegend,
}: {
  toggleLegend: () => void;
}) {
  const { ['main-map']: mapRef } = useMap();
  const map = mapRef?.getMap();

  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const endpoint = useMemo(() => {
    // Nominatim requires a valid User-Agent. Browser fetch can't set User-Agent header,
    // so ideally you'd proxy this through a Next.js route (best practice).
    // This direct call often still works, but can be rate-limited.
    return 'https://nominatim.openstreetmap.org/search';
  }, []);

  const runSearch = async () => {
    const q = query.trim();
    if (!q || !map) return;

    setLoading(true);
    try {
      const url = `${endpoint}?format=json&q=${encodeURIComponent(q)}&limit=1`;
      const res = await fetch(url, {
        headers: {
          Accept: 'application/json',
        },
      });

      if (!res.ok) throw new Error(`Geocode failed: ${res.status}`);

      const data: NominatimResult[] = await res.json();
      const first = data[0];
      if (!first) return;

      const lon = Number(first.lon);
      const lat = Number(first.lat);

      map.flyTo({
        center: [lon, lat],
        zoom: Math.max(map.getZoom(), 16),
        essential: true,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <InputGroup className="absolute top-4 left-4 h-12 rounded-xl z-50 max-w-md bg-white shadow-md">
      <InputGroupInput
        placeholder="Search location..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') runSearch();
        }}
      />
      <InputGroupAddon>
        <button
          type="button"
          onClick={runSearch}
          className="p-2"
          aria-label="Search"
          disabled={loading}
        >
          <IconSearch />
        </button>
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">
        <button
          onClick={toggleLegend}
          className="p-2 rounded-lg bg-[#0066CC] hover:bg-[#005BB5] transition text-white mr-2 text-xs"
          type="button"
        >
          <IconLayersIntersect className="w-[1.5em]! h-[1.5em]!" />
        </button>
      </InputGroupAddon>
    </InputGroup>
  );
}
