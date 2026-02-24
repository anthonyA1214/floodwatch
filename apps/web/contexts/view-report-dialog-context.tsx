'use client';

import { ReportsDto } from '@repo/schemas';
import { createContext, useContext, useState } from 'react';

interface ViewReportDialogContextType {
  report: ReportsDto | null;
  open: boolean;
  openDialog: (report: ReportsDto) => void;
  closeDialog: () => void;
}

const ViewReportDialogContext =
  createContext<ViewReportDialogContextType | null>(null);

export default function ViewReportDialogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [report, setReport] = useState<ReportsDto | null>(null);
  const [open, setOpen] = useState(false);

  const openDialog = (report: ReportsDto | null) => {
    setReport(report);
    setOpen(true);
  };

  const closeDialog = () => {
    setReport(null);
    setOpen(false);
  };

  return (
    <ViewReportDialogContext.Provider
      value={{ report, open, openDialog, closeDialog }}
    >
      {children}
    </ViewReportDialogContext.Provider>
  );
}

export function useViewReportDialog() {
  const ctx = useContext(ViewReportDialogContext);
  if (!ctx)
    throw new Error(
      'useViewReportDialog must be used within ViewReportDialogProvider',
    );
  return ctx;
}
