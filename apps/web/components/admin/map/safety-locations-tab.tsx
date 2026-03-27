'use client';

import Pagination from '@/components/admin/map/map-pagination';
import CreateSafetyLocationsDialog from './create-safety-locations-dialog';
import { useMapFilterAdmin } from '@/contexts/map-filter-admin-context';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { SafetyListItemInput, SafetyLocationQueryInput } from '@repo/schemas';
import { useSafetyList } from '@/hooks/use-safety-list';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import SafetyLocationsCardSkeleton from '@/components/map/skeletons/safety-locations-card-skeleton';
import LocationsListEmpty from '@/components/map/empty/locations-list-empty';
import SafetyLocationsCard from '@/components/shared/safety-locations-card';
import PagePagination from '@/components/shared/page-pagination';

export default function SafetyLocationsTab() {
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);
  const [type, setType] = useState<'all-types' | 'shelter' | 'hospital'>(
    (searchParams.get('status') as 'all-types' | 'shelter' | 'hospital') ||
      'all-types',
  );
  const { q } = useMapFilterAdmin();

  const params: SafetyLocationQueryInput = {
    page: Number(page),
    limit: Number(searchParams.get('limit') || '10'),
    type: type === 'all-types' ? undefined : type,
    q: q || undefined,
  };

  const { safetyList, meta, isLoading } = useSafetyList(params);

  return (
    <>
      <CreateSafetyLocationsDialog />
      <div className='flex-1 flex flex-col rounded-2xl border min-h-0 overflow-hidden'>
        <Select
          value={type}
          onValueChange={(value) => {
            setType(value as 'all-types' | 'shelter' | 'hospital');
            setPage(1);
          }}
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

        <div className='flex-1 overflow-hidden min-h-0'>
          <div className='space-y-4 p-4 overflow-y-auto h-full'>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <SafetyLocationsCardSkeleton key={i} />
              ))
            ) : !safetyList || safetyList?.length === 0 ? (
              <LocationsListEmpty />
            ) : (
              safetyList?.map((safety: SafetyListItemInput) => (
                <SafetyLocationsCard
                  key={safety.id}
                  type={safety.type}
                  location={safety.location}
                  address={safety.address}
                  availability={safety.availability}
                />
              ))
            )}
          </div>
        </div>

        {meta && meta.totalPages > 1 && (
          <div className='mt-auto border-t p-2 rounded-b-2xl'>
            <PagePagination
              currentPage={meta?.page ?? 1}
              totalPages={meta?.totalPages ?? 1}
              hasNextPage={meta?.hasNextPage ?? false}
              hasPrevPage={meta?.hasPrevPage ?? false}
              onPageChange={setPage}
            />
          </div>
        )}
      </div>
    </>
  );
}
