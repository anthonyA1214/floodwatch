// affected-location-list-panel.tsx
'use client';

import { useMemo, useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { IconAlertTriangle, IconChevronLeft } from '@tabler/icons-react';
import AffectedLocationsCard from '@/components/map/affected-locations-card';

type Severity = 'critical' | 'high' | 'moderate' | 'low';

type AffectedLocationItem = {
  severity: Severity;
  location: string;
  message: string;
  reportedAt: string; // ISO string
};

type Props = {
  title?: string;
  items?: AffectedLocationItem[];
  className?: string;
  onClose?: () => void;
};

export default function AffectedLocationListPanel({
  title = 'Affected Locations',
  items,
  className = '',
  onClose,
}: Props) {
  const [level, setLevel] = useState<'all-levels' | Severity>('all-levels');

  const data: AffectedLocationItem[] = items ?? [
    {
      severity: 'critical',
      location: 'Barangay 174',
      message: 'Critical flood warning. Evacuation recommended.',
      reportedAt: '2026-01-28T10:30:00Z',
    },
    {
      severity: 'high',
      location: 'Barangay 174',
      message: 'Flooding at knee level. Road partially impassable.',
      reportedAt: '2026-01-28T11:30:00Z',
    },
    {
      severity: 'low',
      location: 'Barangay 174',
      message: 'Minor flooding. Passable with caution.',
      reportedAt: '2026-01-28T12:23:00Z',
    },
    {
      severity: 'low',
      location: 'Barangay 174',
      message: 'Minor flooding. Passable with caution.',
      reportedAt: '2026-01-28T12:23:00Z',
    },
  ];

  const filtered = useMemo(() => {
    if (level === 'all-levels') return data;
    return data.filter((item) => item.severity === level);
  }, [data, level]);

  return (
    <aside
      className={[
        'relative w-full h-full bg-white z-50 min-h-0 flex flex-col pointer-events-auto',
        // ✅ must be visible so the handle can stick out
        'border shadow-lg overflow-visible',
        className,
      ].join(' ')}
    >
      {/* Side close handle */}
      {onClose && (
        <button
          className="
            absolute
            -right-7
            top-1/2
            -translate-y-1/2
            h-16
            w-7
            bg-white
            border
            border-l-0
            rounded-r-xl
            z-[60]
            shadow-[4px_0px_6px_-1px_rgba(0,0,0,0.1)]
            flex
            items-center
            justify-center
            hover:bg-gray-50
          "
          onClick={onClose}
          type="button"
          aria-label="Close panel"
        >
          <IconChevronLeft className="w-4 h-4" />
        </button>
      )}

      {/* Header */}
      <div className="px-4 pt-4 pb-3">
        <div className="flex items-center gap-2">
          <IconAlertTriangle className="w-5 h-5 text-[#FB2C36]" />
          <h3 className="text-base font-semibold text-[#1f1f1f]">{title}</h3>
        </div>

        <div className="mt-3">
          <Select
            value={level}
            onValueChange={(val) => setLevel(val as 'all-levels' | Severity)}
          >
            <SelectTrigger className="w-full h-10 text-sm text-muted-foreground justify-between">
              <SelectValue placeholder="All Levels" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all-levels">All Levels</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="moderate">Moderate</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Separator />

      {/* List */}
      {/* ✅ keep inner clipping here */}
      <ScrollArea className="flex-1 min-h-0 overflow-hidden">
        <div className="p-4 space-y-3">
          {filtered.map((item, index) => (
            <AffectedLocationsCard
              key={`${item.location}-${item.reportedAt}-${index}`}
              severity={item.severity}
              location={item.location}
              message={item.message}
              reportedAt={item.reportedAt}
            />
          ))}

          {filtered.length === 0 ? (
            <div className="text-sm text-muted-foreground py-10 text-center">
              No locations for this level.
            </div>
          ) : null}
        </div>
      </ScrollArea>
    </aside>
  );
}
