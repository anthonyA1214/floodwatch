// 'use client';

// import { ColumnDef } from '@tanstack/react-table';
// import { SafetyLocationsDto } from '@repo/schemas';
// import { IconEye, IconTrash } from '@tabler/icons-react';
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipTrigger,
// } from '@/components/ui/tooltip';
// import { cn } from '@/lib/utils';
// import { SEVERITY_COLOR_MAP } from '@/lib/utils/get-color-map';
// import { useSafetyLocationsDialog } from '@/contexts/safety-locations-dialog-context';
// import { format } from 'date-fns';

// export const columns: ColumnDef<any>[] = [
//   {
//     accessorKey: 'location',
//     header: 'LOCATION',
//     cell: ({ row }) => {
//       const safetyLocation = row.original;

//       return <span className='font-medium'>{safetyLocation.location}</span>;
//     },
//   },
//   {
//     accessorKey: 'reportedAt',
//     header: 'REPORTED DATE',
//     cell: ({ row }) => {
//       const user = row.original;

//       return (
//         <span className='text-gray-600'>
//           {format(user?.reportedAt, 'MMMM dd, yyyy')}
//         </span>
//       );
//     },
//   },
//   {
//     accessorKey: 'severity',
//     header: () => <span className='flex justify-center'>SEVERITY LEVEL</span>,
//     cell: ({ row }) => {
//       const data = row.original;

//       const color = SEVERITY_COLOR_MAP[data.severity];

//       return (
//         <div className='flex justify-center w-full'>
//           <div
//             className='inline-flex items-center rounded-full px-4 py-1.5'
//             style={{ backgroundColor: `${color}25`, color }}
//           >
//             <span className='text-sm font-medium capitalize'>
//               {data.severity.toUpperCase()}
//             </span>
//           </div>
//         </div>
//       );
//     },
//   },
//   {
//     accessorKey: 'actions',
//     header: () => <span className='flex justify-center'>ACTIONS</span>,
//     cell: ({ row }) => {
//       const safetyLocation = row.original;
//       return <ActionCell safetyLocation={safetyLocation} />;
//     },
//   },
// ];

// function ActionCell({
//   safetyLocation,
// }: {
//   safetyLocation: SafetyLocationsDto;
// }) {
//   const { openDialog } = useSafetyLocationsDialog();

//   return (
//     <div className='flex justify-center gap-2'>
//       <Tooltip>
//         <TooltipTrigger
//           className='text-[#0066CC] bg-[#0066CC]/10 rounded-lg p-1.5 hover:bg-[#0066CC]/20 transition'
//           onClick={() => openDialog('view', safetyLocation)}
//         >
//           <IconEye className='w-[1.5em]! h-[1.5em]!' />
//         </TooltipTrigger>
//         <TooltipContent>
//           <p>View safety location</p>
//         </TooltipContent>
//       </Tooltip>

//       <Tooltip>
//         <TooltipTrigger
//           className={cn(
//             `text-[#FB323B] bg-[#FB323B]/10 rounded-lg p-1.5 hover:bg-[#FB323B]/20 transition`,
//           )}
//           onClick={() => openDialog('delete', safetyLocation)}
//         >
//           <IconTrash className='w-[1.5em]! h-[1.5em]!' />
//         </TooltipTrigger>
//         <TooltipContent>
//           <p>Delete safety location</p>
//         </TooltipContent>
//       </Tooltip>
//     </div>
//   );
// }
