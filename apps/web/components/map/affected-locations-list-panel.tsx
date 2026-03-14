'use client';

import { IconAlertTriangle, IconChevronLeft } from '@tabler/icons-react';
import AffectedLocationsCard from './affected-locations-card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Separator } from '../ui/separator';
import { useMapOverlay } from '@/contexts/map-overlay-context';
import { useReportList } from '@/hooks/use-report-list';
import AffectedLocationsCardSkeleton from './skeletons/affected-locations-card-skeleton';
import { useMapPopup } from '@/contexts/map-popup-context';
import { useReportMapPins } from '@/hooks/use-report-map-pins';
import { useState } from 'react';

export default function AffectedLocationsListPanel() {
  const { reportList, isLoading } = useReportList();
  const { close } = useMapOverlay();
  const { activePopup, openReportPopup } = useMapPopup();
  const { reportMapPins } = useReportMapPins();

  const [severity, setSeverity] = useState<
    'all-levels' | 'critical' | 'high' | 'moderate' | 'low'
  >('all-levels');

  const filteredReportList =
    severity === 'all-levels'
      ? reportList
      : reportList?.filter((report) => report.severity === severity);

  const handleCardClick = (reportId: number) => {
    const pin = reportMapPins?.find((p) => p.id === reportId);
    if (pin) {
      openReportPopup(pin);
    }
  };

  return (
    <div className='relative w-full h-full bg-white z-50 min-h-0 flex flex-col pointer-events-auto pt-16'>
      <button
        className='absolute bg-white top-1/2 translate-x-full right-0 h-16 -translate-y-1/2
        rounded-r-2xl ps-1 py-1 pr-1.5 text-xs z-30 shadow-[4px_0px_6px_-1px_rgba(0,0,0,0.1)]'
        onClick={close}
      >
        <IconChevronLeft className='w-[1.5em]! h-[1.5em]!' />
      </button>

      <div className='flex flex-col gap-4 flex-1 min-h-0 py-4'>
        {/* Header */}

        <div className='flex items-center gap-2 font-semibold text-lg px-4'>
          <IconAlertTriangle className='w-[1.5em]! h-[1.5em]! text-[#FB2C36]' />
          <span>Affected Locations</span>
        </div>

        <Separator />

        {/* Filter using Select */}
        <div className='px-4'>
          <Select
            defaultValue={severity}
            onValueChange={(value) =>
              setSeverity(
                value as
                  | 'all-levels'
                  | 'critical'
                  | 'high'
                  | 'moderate'
                  | 'low',
              )
            }
          >
            <SelectTrigger className='w-full text-sm text-gray-600 py-3 justify-between'>
              <SelectValue placeholder='All Levels' />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value='all-levels'>All Levels</SelectItem>
              <SelectItem value='critical'>Critical</SelectItem>
              <SelectItem value='high'>High</SelectItem>
              <SelectItem value='moderate'>Moderate</SelectItem>
              <SelectItem value='low'>Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Content */}
        <div className='flex flex-col gap-4 overflow-y-auto flex-1 min-h-0 px-4'>
          {isLoading || !reportList
            ? Array.from({ length: 5 }).map((_, i) => (
                <AffectedLocationsCardSkeleton key={i} />
              ))
            : filteredReportList?.map((report) => (
                <AffectedLocationsCard
                  key={report.id}
                  isActive={
                    activePopup?.type === 'report' &&
                    activePopup?.report?.id === report.id
                  }
                  severity={report.severity}
                  location={report.location}
                  description={report.description}
                  reportedAt={report.reportedAt}
                  onClick={() => handleCardClick(report.id)}
                />
              ))}
        </div>
      </div>
    </div>
  );
}
