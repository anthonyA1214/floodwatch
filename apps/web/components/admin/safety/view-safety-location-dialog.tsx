'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { IconShield } from '@tabler/icons-react';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { SAFETY_TYPE_COLOR_MAP } from '@/lib/utils/get-color-map';
import { useSafetyLocationsDialog } from '@/contexts/safety-locations-dialog-context';
import { format } from 'date-fns';

export default function ViewSafetyLocationDialog() {
  // ✅ USE THE CONTEXT DATA INSTEAD OF STATIC DATA
  const { safetyLocations, isOpen, closeDialog } = useSafetyLocationsDialog();

  // ✅ If no safety location is selected, don't render anything
  if (!safetyLocations) {
    return (
      <Dialog open={false}>
        <DialogContent />
      </Dialog>
    );
  }

  // ✅ Format the createdAt date - use a default if it doesn't exist
  const createdAt = safetyLocations.createdAt || new Date();
  const formattedTime = format(new Date(createdAt), 'hh:mm a');
  const formattedDate = format(new Date(createdAt), 'MMMM dd, yyyy');

  const safetyTypeColor =
    SAFETY_TYPE_COLOR_MAP[safetyLocations.type] || '#0066CC';

  return (
    <Dialog open={isOpen('view')} onOpenChange={closeDialog}>
      <DialogContent className='flex flex-col min-w-[50vw] h-[80vh] p-0 overflow-hidden gap-0 border-0 [&>button]:text-white [&>button]:hover:text-white [&>button]:opacity-70 [&>button]:hover:opacity-100'>
        {/* ── Blue Header with Shield Icon ── */}
        <DialogHeader className='flex flex-row items-center gap-4 bg-[#0066CC] rounded-b-2xl px-5 py-4 shrink-0'>
          {/* ✅ Shield Icon */}
          <div className='flex items-center justify-center w-12 h-12 bg-white/20 rounded-lg'>
            <IconShield className='w-6 h-6 text-white' />
          </div>

          {/* ✅ Text Section */}
          <div className='flex flex-col space-y-0 text-white'>
            <DialogTitle className='font-poppins text-base font-medium'>
              Safety Location
            </DialogTitle>
            <DialogDescription className='text-sm text-blue-100'>
              {/* ✅ Use context data */}
              {formattedDate} {formattedTime}
            </DialogDescription>
          </div>
        </DialogHeader>

        {/* ── Content Area ── */}
        <div className='flex-1 min-h-0 overflow-y-auto'>
          <div className='flex flex-col p-6 gap-6'>
            {/* ── Two Column Layout: Map + Details ── */}
            <div className='flex gap-6'>
              {/* ✅ Left Column: Map Placeholder */}
              <div className='flex-1 flex flex-col gap-4'>
                <div className='flex aspect-square rounded-2xl overflow-hidden border border-gray-200 h-fit bg-gray-100 items-center justify-center'>
                  {/* ✅ PLACEHOLDER - Replace with InteractiveMapSafetyLocation when ready */}
                  <div className='flex items-center justify-center w-full h-full'>
                    <span className='text-gray-400 font-medium'>
                      Map Component Here
                    </span>
                  </div>
                </div>
              </div>

              {/* ✅ Right Column: Safety Location Details */}
              <div className='flex-1 flex items-start'>
                <div className='w-full flex flex-col gap-4 bg-accent border border-gray-200 rounded-2xl p-6 h-fit'>
                  {/* ── Location Image ── */}
                  <div className='relative w-full aspect-video rounded-xl overflow-hidden'>
                    {/* ✅ Use context data for image */}
                    {safetyLocations.image ? (
                      <Image
                        src={safetyLocations.image}
                        alt={safetyLocations.location}
                        fill
                        className='object-cover'
                      />
                    ) : (
                      <Image
                        src='/no-data-rafiki.svg'
                        alt='No image available'
                        fill
                        className='object-cover opacity-40'
                      />
                    )}
                  </div>

                  {/* ── Name ── */}
                  <div className='flex flex-col gap-1'>
                    <span className='font-poppins font-medium text-gray-600 text-sm'>
                      NAME
                    </span>
                    {/* ✅ Use context data */}
                    <p className='text-base font-semibold text-gray-800'>
                      {safetyLocations.location}
                    </p>
                  </div>

                  <Separator className='my-1' />

                  {/* ── Type Badge ── */}
                  <div className='flex flex-col gap-2'>
                    <span className='font-poppins font-medium text-gray-600 text-sm'>
                      TYPE
                    </span>
                    <div
                      className='flex items-center rounded-full px-4 py-1.5 w-fit'
                      style={{
                        color: safetyTypeColor,
                        backgroundColor: `${safetyTypeColor}25`,
                      }}
                    >
                      <span className='text-sm font-bold capitalize'>
                        {/* ✅ Use context data */}
                        {safetyLocations.type}
                      </span>
                    </div>
                  </div>

                  <Separator className='my-1' />

                  {/* ── Address ── */}
                  <div className='flex flex-col gap-1'>
                    <span className='font-poppins font-medium text-gray-600 text-sm'>
                      ADDRESS
                    </span>
                    {/* ✅ Use context data */}
                    <p className='text-sm text-gray-600 leading-relaxed'>
                      {safetyLocations.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Full Width Description Section ── */}
            <div className='flex flex-col gap-3'>
              <span className='font-poppins text-base font-semibold text-gray-800'>
                SAFETY LOCATION DESCRIPTION
              </span>
              <div className='flex flex-col gap-4 bg-accent border border-gray-200 rounded-2xl p-6'>
                <p className='text-sm text-gray-600 leading-relaxed'>
                  {/* ✅ Use context data */}
                  {safetyLocations.description || 'No description provided.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
