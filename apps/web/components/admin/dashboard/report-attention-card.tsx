'use client';

import { Button } from '@/components/ui/button';
import { IconCheck, IconClock, IconArrowRight } from '@tabler/icons-react';

export default function ReportAttentionCard() {
  return (
    <div className='rounded-2xl border-2 border-orange-400 bg-white p-5'>
      {/* Top row */}
      <div className='flex items-start justify-between'>
        <div className='space-y-2'>
          {/* Title */}
          <h3 className='text-lg font-semibold text-slate-800'>Barangay 176</h3>

          {/* Description */}
          <p className='text-slate-500'>
            Water level rising fast near elementary school grounds.
          </p>
        </div>

        {/* Vote badge */}
        <div className='flex items-center gap-1 rounded-full border border-orange-400 px-3 py-1 text-sm font-semibold text-orange-500'>
          <IconCheck className='h-4 w-4' />
          12
        </div>
      </div>

      {/* Bottom row */}
      <div className='mt-4 flex items-center justify-between'>
        {/* Time */}
        <div className='flex items-center gap-2 text-sm text-slate-400'>
          <IconClock className='h-4 w-4' />1 hrs ago
        </div>

        {/* Review button */}
        <Button
          size='sm'
          className='flex items-center gap-1 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200'
        >
          Review
          <IconArrowRight className='h-4 w-4' />
        </Button>
      </div>
    </div>
  );
}
