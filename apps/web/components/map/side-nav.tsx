'use client';

/**
 * SideNav
 * - Uses BoundaryContext (Option B: precomputed barangay flood)
 * - Shows loading/error state from:
 *    - isLoadingGeoJSON
 *    - geoJSONError
 * - Controls:
 *    - showBarangayFlood toggle
 *    - selectedBarangay select + Apply
 */

import * as React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { MapPin } from 'lucide-react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

import { useMapUI } from '@/contexts/map-ui-context';
import { useBoundary } from '@/contexts/boundary-context';

function getBarangayNames(fc: GeoJSON.FeatureCollection | null) {
  if (!fc?.features?.length) return [];
  const names = new Set<string>();

  for (const f of fc.features as any[]) {
    const name = String(f?.properties?.adm4_en ?? '').trim();
    if (name) names.add(name);
  }

  return Array.from(names).sort((a, b) => a.localeCompare(b));
}

export function SideNav() {
  const {
    selectedBarangay,
    setSelectedBarangay,
    showBarangayFlood,
    setShowBarangayFlood,
    apply,
  } = useMapUI();

  // ✅ Option B context fields
  const { barangayGeoJSON, isLoadingGeoJSON, geoJSONError } = useBoundary();

  const barangayNames = React.useMemo(
    () => getBarangayNames(barangayGeoJSON),
    [barangayGeoJSON],
  );

  return (
    <Sidebar className="bg-[#2F327D] border-r">
      <SidebarHeader className="p-0">
        <div className="bg-[#2F327D] text-white px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-white/15 grid place-items-center shrink-0">
              <MapPin className="size-5" />
            </div>
            <h2 className="text-lg font-semibold truncate">Location Filter</h2>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-0">
        <SidebarGroup className="px-4 py-4 space-y-4">
          {/* CITY */}
          <div className="space-y-2">
            <p className="text-xs font-semibold tracking-wide text-muted-foreground">
              CITY
            </p>

            <div className="rounded-xl border bg-muted px-4 py-3 flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">
                Caloocan City
              </span>

              <span className="size-6 rounded-full bg-primary grid place-items-center">
                <span className="size-2.5 rounded-full bg-white" />
              </span>
            </div>
          </div>

          {/* FLOOD TOGGLE */}
          <div className="rounded-2xl border bg-background p-3 space-y-2">
            <div className="flex items-center justify-between gap-3">
              <Label className="text-sm font-semibold text-foreground">
                Show Flood Susceptibility
              </Label>
              <Switch
                checked={showBarangayFlood}
                onCheckedChange={setShowBarangayFlood}
              />
            </div>

            {/* ✅ Option B: just show loading when GeoJSON is fetching */}
            {showBarangayFlood && isLoadingGeoJSON && (
              <p className="text-xs text-muted-foreground">
                Loading map data…
              </p>
            )}

            {/* ✅ Option B: show fetch error if any */}
            {showBarangayFlood && geoJSONError && (
              <p className="text-xs text-destructive">
                {geoJSONError}
              </p>
            )}
          </div>

          {/* SELECT BARANGAY */}
          <div className="space-y-2">
            <p className="text-xs font-semibold tracking-wide text-muted-foreground">
              SELECT BARANGAY
            </p>

            <Select
              value={selectedBarangay ?? ''}
              onValueChange={(v) => setSelectedBarangay(v || null)}
            >
              <SelectTrigger className="h-12 w-full rounded-xl">
                <SelectValue
                  placeholder={
                    barangayNames.length
                      ? 'Choose a barangay...'
                      : isLoadingGeoJSON
                        ? 'Loading barangays...'
                        : 'No barangays loaded'
                  }
                />
              </SelectTrigger>

              <SelectContent>
                {barangayNames.map((name) => (
                  <SelectItem key={name} value={name}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* APPLY */}
          <Button
            className="h-12 w-full rounded-xl"
            onClick={apply}
            disabled={!selectedBarangay}
          >
            Apply Filter
          </Button>

          <Separator />

          {/* LEGEND */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="h-5 w-1 rounded-full bg-primary" />
              <p className="text-sm font-semibold text-foreground">
                Flood Susceptibility
              </p>
            </div>

            <div className="rounded-2xl border bg-background p-3 space-y-1">
              <LegendRow dotClass="bg-blue-900" label="Very High Susceptibility" />
              <LegendRow dotClass="bg-blue-600" label="High Susceptibility" />
              <LegendRow dotClass="bg-purple-500" label="Moderate Susceptibility" />
              <LegendRow dotClass="bg-slate-400" label="Low Susceptibility" />
            </div>
          </div>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

function LegendRow({ dotClass, label }: { dotClass: string; label: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl px-3 py-3 hover:bg-muted transition">
      <span className={cn('size-4 rounded-full shrink-0', dotClass)} />
      <span className="text-sm font-medium text-foreground">{label}</span>
    </div>
  );
}