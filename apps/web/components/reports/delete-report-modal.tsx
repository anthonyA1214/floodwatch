'use client';

import * as React from 'react';
import type { FloodReportDto } from '@repo/schemas';

import { Button } from '@/components/ui/button';

// ✅ ADDED: shadcn AlertDialog for delete confirm
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function DeleteReportDialog({
  open,
  onOpenChange,
  report,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  // ✅ ADDED: selected report
  report: FloodReportDto | null;

  // ✅ ADDED: static confirm callback
  onConfirm?: (report: FloodReportDto) => void;
}) {
  const displayName = report?.name ?? 'this report';

  function handleDelete() {
    // ✅ ADDED: static for now
    if (report) onConfirm?.(report);

    // ✅ ADDED: close after confirm
    onOpenChange(false);
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete report?</AlertDialogTitle>
          <AlertDialogDescription>
            You are about to delete <b>{displayName}</b>&apos;s flood report.
            This action cannot be undone.
            <br />
            <span className="text-xs text-muted-foreground">
              (Static for now — no API call yet.)
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          {/* ✅ ADDED: destructive confirm */}
          <AlertDialogAction asChild>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}