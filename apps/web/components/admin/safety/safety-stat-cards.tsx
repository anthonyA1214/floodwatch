'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import SafetyStatCard from './safety-stat-card';
import { useNavigation } from '@/contexts/navigation-context';
import { useOptimistic } from 'react';

type SafetyStatCardsProps = {
  totalCount: number;
  shelterCount: number;
  hospitalCount: number;
};

export default function SafetyStatCards({
  totalCount,
  shelterCount,
  hospitalCount,
}: SafetyStatCardsProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { navigate, startTransition } = useNavigation();

  const currentStatus = searchParams.get('type') || 'total';

  const [optimisticStatus, setOptimisticStatus] = useOptimistic(currentStatus);

  const handleStatusChange = (status: 'total' | 'shelter' | 'hospital') => {
    const params = new URLSearchParams(searchParams.toString());

    if (status === 'total') {
      params.delete('type');
    } else {
      params.set('type', status);
    }

    params.set('page', '1'); // Reset to first page on status change

    startTransition(() => {
      setOptimisticStatus(status);
      navigate(`${pathname}?${params.toString()}`);
    });
  };

  return (
    <div className="grid grid-cols-3 gap-8">
      <SafetyStatCard
        label="Total Safety Locations"
        count={totalCount}
        status="total"
        isActive={optimisticStatus === 'total'}
        onClick={() => handleStatusChange('total')}
      />
      <SafetyStatCard
        label="Shelter Locations"
        count={shelterCount}
        status="shelter"
        isActive={optimisticStatus === 'shelter'}
        onClick={() => handleStatusChange('shelter')}
      />
      <SafetyStatCard
        label="Hospital Locations"
        count={hospitalCount}
        status="hospital"
        isActive={optimisticStatus === 'hospital'}
        onClick={() => handleStatusChange('hospital')}
      />
    </div>
  );
}
