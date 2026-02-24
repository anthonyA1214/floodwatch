'use client';

import { NavigationProvider } from '@/contexts/navigation-context';
import ViewReportDialog from './view-report-dialog';
import ViewReportDialogProvider from '@/contexts/view-report-dialog-context';

export default function FloodReportsClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ViewReportDialogProvider>
      <NavigationProvider>
        {children}
        <ViewReportDialog />
      </NavigationProvider>
    </ViewReportDialogProvider>
  );
}
