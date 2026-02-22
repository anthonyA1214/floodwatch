'use client';

import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

// ✅ ADDED: type for your report rows (so meta handlers can use it)
import type { FloodReportDto } from '@repo/schemas'; // ✅ ADDED

// ✅ ADDED: meta type shared with columns (actions column will call these)
export type FloodReportsTableMeta = {
  onViewReport?: (report: FloodReportDto) => void;
  onDeleteReport?: (report: FloodReportDto) => void;
}; // ✅ ADDED

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];

  // ✅ ADDED: optional handlers (only used when TData is FloodReportDto in this page)
  onViewReport?: (report: FloodReportDto) => void;
  onDeleteReport?: (report: FloodReportDto) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,

  // ✅ ADDED: receive handlers from page.tsx
  onViewReport,
  onDeleteReport,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },

    // ✅ ADDED: pass handlers to TanStack Table meta (used by Action buttons in columns.tsx)
    meta: {
      onViewReport,
      onDeleteReport,
    } satisfies FloodReportsTableMeta,
  });

  return (
    <div className="overflow-hidden rounded-lg flex flex-col flex-1 min-h-0 h-0">
      <Table className="w-full table-fixed">
        <TableHeader className="font-poppins bg-[#0066CC]">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="hover:bg-transparent">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="text-white">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
      </Table>

      <div className="flex-1 min-h-0 overflow-hidden">
        <ScrollArea className="h-full">
          <Table className="w-full table-fixed">
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </div>
  );
}