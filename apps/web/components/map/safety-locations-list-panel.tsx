'use client';

import { IconChevronLeft, IconShieldCheck } from '@tabler/icons-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Separator } from '../ui/separator';
import SafetyLocationsCard from './safety-locations-card';
import { useMapOverlay } from '@/contexts/map-overlay-context';
import { useSafetyList } from '@/hooks/use-safety-list';
import { useMapFilter } from '@/contexts/map-filter-context';
import { useSafetyMapPins } from '@/hooks/use-safety-map-pins';
import { useMapPopup } from '@/contexts/map-popup-context';
import { useState } from 'react';
import SafetyLocationsCardSkeleton from './skeletons/safety-locations-card-skeleton';
import LocationsListEmpty from './empty/locations-list-empty';

export default function SafetyLocationsListPanel() {
  const { safetyList, isLoading } = useSafetyList();
  const { close } = useMapOverlay();
  const { activePopup, openSafetyPopup } = useMapPopup();
  const { safetyMapPins } = useSafetyMapPins();

  const [type, setType] = useState<'all-types' | 'shelter' | 'hospital'>(
    'all-types',
  );

  const { filters } = useMapFilter();
  const filteredSafetyList = safetyList?.filter((safety) => {
    const pin = safetyMapPins?.find((p) => p.id === safety.id);
    if (!pin) return false;
    if (!filters.safetyTypes.has(pin.type)) return false;
    if (type !== 'all-types' && pin.type !== type) return false;
    return true;
  });

  const handleCardClick = (safetyId: number) => {
    const pin = safetyMapPins?.find((p) => p.id === safetyId);
    if (pin) {
      openSafetyPopup(pin);
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
          <IconShieldCheck className='w-[1.5em]! h-[1.5em]! text-[#0066CC]' />
          <span>Safety Locations</span>
        </div>

        <Separator />

        {/* Filter using Select */}
        <div className='px-4'>
          <Select
            defaultValue={type}
            onValueChange={(value) =>
              setType(value as 'all-types' | 'shelter' | 'hospital')
            }
          >
            <SelectTrigger className='w-full text-sm text-gray-600 py-3 justify-between'>
              <SelectValue placeholder='All Types' />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value='all-types'>All Types</SelectItem>
              <SelectItem value='shelter'>Shelter</SelectItem>
              <SelectItem value='hospital'>Hospital</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Content */}
        <div className='flex flex-col gap-4 overflow-y-auto flex-1 min-h-0 px-4'>
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <SafetyLocationsCardSkeleton key={i} />
            ))
          ) : !filteredSafetyList || filteredSafetyList?.length === 0 ? (
            <LocationsListEmpty />
          ) : (
            filteredSafetyList?.map((safety) => (
              <SafetyLocationsCard
                key={safety.id}
                isActive={
                  activePopup?.type === 'safety' &&
                  activePopup?.safety?.id === safety.id
                }
                type={safety.type}
                location={safety.location}
                address={safety.address}
                availability={safety.availability}
                onClick={() => handleCardClick(safety.id)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
