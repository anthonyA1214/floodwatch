'use client';

import { useNavigation } from '@/contexts/navigation-context';
import { SafetyLocationsDataTableSkeleton } from './skeleton/safety-locations-data-table-skeleton';

export default function SafetyLocationsDataTableWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isPending } = useNavigation();

  if (isPending) return <SafetyLocationsDataTableSkeleton />;

  return <>{children}</>;
}
