'use client';

import { useState } from 'react';
import { IconArrowRight, IconCircleDot } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';

export default function LocationMonitorCard() {
  // toggle state for switching between affected and safety locations
  const [activeTab, setActiveTab] = useState<'affected' | 'safety'>('affected');

  return (
    <div className='rounded-2xl border border-slate-200 bg-white p-6 shadow-sm'>
      {/* header */}
      <div className='mb-6 flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <IconCircleDot className='h-5 w-5 text-red-500' stroke={2} />
          <h2 className='text-[20px] font-semibold text-slate-700'>
            Location Monitor
          </h2>
        </div>

        <Button
          variant='outline'
          className='rounded-full border-slate-200 px-4 text-blue-500 hover:text-blue-600'
        >
          View All
          <IconArrowRight className='ml-1 h-4 w-4' />
        </Button>
      </div>

      {/* tab toggle */}
      <div className='border-b border-slate-200'>
        <div className='flex items-center gap-10'>
          {/* affected locations tab */}
          <button
            type='button'
            onClick={() => setActiveTab('affected')}
            className={`border-b-2 pb-3 text-sm font-medium uppercase tracking-wide transition-colors ${
              activeTab === 'affected'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-400'
            }`}
          >
            Affected Locations
          </button>

          {/* safety locations tab */}
          <button
            type='button'
            onClick={() => setActiveTab('safety')}
            className={`border-b-2 pb-3 text-sm font-medium uppercase tracking-wide transition-colors ${
              activeTab === 'safety'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-400'
            }`}
          >
            Safety Locations
          </button>
        </div>
      </div>

      {/* content area */}
      <div className='pt-4'>
        {activeTab === 'affected' ? (
          <div>{/* affected location cards will go here */}</div>
        ) : (
          <div>{/* safety location cards will go here */}</div>
        )}
      </div>
    </div>
  );
}
