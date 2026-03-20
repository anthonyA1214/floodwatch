'use client';

import { ColumnDef } from '@tanstack/react-table';
import {
  Avatar as UIAvatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import Avatar from 'boring-avatars';
import { IconEye, IconTrash } from '@tabler/icons-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export interface ReportedUserDto {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
  reportsCount: number;
  status: 'resolved' | 'pending';
}

export const createReportedCommentsColumns = (
  onViewReports: (user: ReportedUserDto) => void,
): ColumnDef<ReportedUserDto>[] => [
  {
    accessorKey: 'name',
    header: 'REPORTED USER',
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className='flex items-center gap-3 w-auto'>
          <UIAvatar className='size-8'>
            <AvatarImage src={user.profilePicture || undefined} />
            <AvatarFallback>
              <Avatar name={`${user.name} ${user.id}`} variant='beam' />
            </AvatarFallback>
          </UIAvatar>
          <div className='flex flex-col'>
            <span className='font-medium'>{user.name}</span>
            <span className='text-sm text-gray-600'>{user.email}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'reportsCount',
    header: 'REPORTS',
    cell: ({ row }) => {
      const user = row.original;
      return <span className='font-semibold'>{user.reportsCount}</span>;
    },
  },
  {
    accessorKey: 'status',
    header: () => <span className='flex justify-center'>STATUS</span>,
    cell: ({ row }) => {
      const user = row.original;
      const statusColorMap = {
        resolved: { bg: '#00D69B', text: '#00D69B' },
        pending: { bg: '#FFA500', text: '#FFA500' },
      };

      const colors = statusColorMap[user.status];

      return (
        <div className='flex justify-center w-full'>
          <div
            className='inline-flex items-center rounded-full px-4 py-1.5'
            style={{
              backgroundColor: `${colors.bg}25`,
              color: colors.text,
            }}
          >
            <span className='text-sm font-medium capitalize'>
              {user.status}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'actions',
    header: () => <span className='flex justify-center'>ACTION</span>,
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className='flex justify-center gap-2'>
          <Tooltip>
            <TooltipTrigger
              onClick={() => onViewReports(user)}
              className='text-[#0066CC] bg-[#0066CC]/10 rounded-lg p-1.5 hover:bg-[#0066CC]/20 transition cursor-pointer'
            >
              <IconEye className='w-[1.5em]! h-[1.5em]!' />
            </TooltipTrigger>
            <TooltipContent>
              <p>View reports</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger className='text-[#FB323B] bg-[#FB323B]/10 rounded-lg p-1.5 hover:bg-[#FB323B]/20 transition'>
              <IconTrash className='w-[1.5em]! h-[1.5em]!' />
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete reports</p>
            </TooltipContent>
          </Tooltip>
        </div>
      );
    },
  },
];
