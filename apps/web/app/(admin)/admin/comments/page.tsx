'use client';

import { useState } from 'react';
import CommentStatCard from '@/components/admin/comments/comment-stat-card';
import SearchBar from '@/components/shared/search-bar';
import { DataTable } from '@/components/shared/data-table';
import {
  createReportedCommentsColumns,
  ReportedUserDto,
} from '@/components/admin/comments/reported-comments-column';
import {
  ReportedCommentDialog,
  ReportedCommentDialogData,
} from '@/components/admin/comments/reported-comments-dialog';

import {
  IconCheck,
  IconFileReport,
  IconMessageReport,
  IconX,
} from '@tabler/icons-react';

export default function ReportedCommentsPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedComment, setSelectedComment] =
    useState<ReportedCommentDialogData | null>(null);

  // Static data for now
  const [reportedUsers] = useState<ReportedUserDto[]>([
    {
      id: '1',
      name: 'Marvin Felices',
      email: 'marvinfelices@gmail.com',
      reportsCount: 45,
      status: 'resolved',
    },
    {
      id: '2',
      name: 'Andrea Andres',
      email: 'andreaandres@gmail.com',
      reportsCount: 23,
      status: 'resolved',
    },
    {
      id: '3',
      name: 'Anthony Amiluddin',
      email: 'anthonyamiluddin@gmail.com',
      reportsCount: 33,
      status: 'pending',
    },
  ]);

  // Static comment data (replace with API call later)
  const staticCommentData: ReportedCommentDialogData = {
    id: '1',
    reportedUser: {
      name: 'Anthony Amiluddin',
      email: 'anthonyamiluddin@gmail.com',
    },
    commentText:
      'ldjflksjdkfjdskfldsjklfljksldjfljdsklfljksdfjlksdfjlksdfjkfldsjfkl',
    postedOn: 'Posted on: Kai mall, barangay 178, calocoan city',
    status: 'pending',
    reportSummary: {
      totalReports: 15,
      categories: [
        { name: 'Misinformation', count: 8, percentage: 80 },
        { name: 'Not Disaster Related', count: 4, percentage: 40 },
      ],
    },
    reporters: [
      {
        id: '1',
        name: 'Marvin Felices',
        reason:
          'I don&rsquo;t like the this comment because it&rsquo;s feels like it comes from someone who&rsquo;s good for nothing son of a bitch.',
        category: 'Misinformation',
      },
      {
        id: '2',
        name: 'Andrea Andres',
        reason:
          'You can almost hear the generations of failure behind a comment like that. It&rsquo;s the talk of someone who was raised poorly and managed to live up to very low expectations.',
        category: 'Not Disaster Related',
      },
    ],
  };

  const handleViewReports = (user: ReportedUserDto) => {
    // Update the dialog data with the selected user
    setSelectedComment({
      ...staticCommentData,
      reportedUser: {
        name: user.name,
        email: user.email,
      },
      id: user.id,
    });
    setDialogOpen(true);
  };

  const reportedCommentsColumns =
    createReportedCommentsColumns(handleViewReports);

  return (
    <div className='flex-1 flex flex-col bg-white p-8 rounded-2xl gap-8 min-h-0'>
      {/* Header */}
      <h1 className='font-poppins text-3xl font-bold'>
        User Reported Comments
      </h1>

      {/* Search + Add Admin - always visible */}
      <div className='flex justify-between gap-4'>
        <div className='flex-1'>
          <SearchBar placeholder='Search by name...' />
        </div>
      </div>

      {/* Comment Stats */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
        <CommentStatCard
          icon={IconMessageReport}
          color='#FF6B6B'
          label='Total Reports'
          count={120}
        />
        <CommentStatCard
          icon={IconFileReport}
          color='#4ECDC4'
          label='Pending'
          count={85}
        />
        <CommentStatCard
          icon={IconCheck}
          color='#FF9F68'
          label='Resolved'
          count={35}
        />
        <CommentStatCard
          icon={IconX}
          color='#585858'
          label='Dismissed'
          count={35}
        />
      </div>

      {/* Reported Comments Table */}
      <DataTable columns={reportedCommentsColumns} data={reportedUsers} />

      {/* Dialog */}
      {selectedComment && (
        <ReportedCommentDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          data={selectedComment}
        />
      )}
    </div>
  );
}
