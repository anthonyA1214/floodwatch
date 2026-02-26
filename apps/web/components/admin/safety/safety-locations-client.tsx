'use client';

import { NavigationProvider } from '@/contexts/navigation-context';
import SafetyLocationsDialogProvider from '@/contexts/safety-locations-dialog-context';

export default function SafetyLocationsClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SafetyLocationsDialogProvider>
      <NavigationProvider>{children}</NavigationProvider>;
    </SafetyLocationsDialogProvider>
  );
}
