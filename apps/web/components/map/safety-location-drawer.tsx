'use client';

import { SAFETY_TYPE_COLOR_MAP } from '@/lib/utils/get-color-map';
import {
  IconCalendarPlus,
  IconInfoCircle,
  IconRoad,
  IconSend,
  IconShield,
} from '@tabler/icons-react';
import { clsx } from 'clsx';
import { format } from 'date-fns';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Drawer } from 'vaul';
import { Separator } from '@/components/ui/separator';
import NoPhotoEmpty from '../shared/no-photo-empty';
import { Button } from '../ui/button';
import { AffectedLocationDrawerSkeleton } from './skeletons/affected-location-drawer-skeleton';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { useMapOverlay } from '@/contexts/map-overlay-context';
import { useSafetyDetail } from '@/hooks/use-safety-detail';

const snapPoints = ['0px', '355px', 1];

export default function SafetyLocationDrawer({
  safetyId,
}: {
  safetyId: number;
}) {
  const { close } = useMapOverlay();
  const [snap, setSnap] = useState<number | string | null>(snapPoints[1]);
  const [open, setOpen] = useState(true);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) close?.();
  };

  const { safetyDetail, isLoading } = useSafetyDetail(safetyId);

  const scrollRef = useRef<HTMLDivElement>(null);

  // scroll to top when report changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [safetyId]);

  const formattedTime = safetyDetail
    ? format(safetyDetail?.createdAt, 'hh:mm a')
    : '';
  const formattedDate = safetyDetail
    ? format(safetyDetail?.createdAt, 'MMMM dd, yyyy')
    : '';

  return (
    <Drawer.Root
      modal={false}
      dismissible={true}
      snapPoints={snapPoints}
      activeSnapPoint={snap}
      handleOnly={true}
      setActiveSnapPoint={(newSnap) => {
        if (newSnap === snapPoints[0]) {
          handleOpenChange(false);
        } else {
          setSnap(newSnap);
        }
      }}
      open={open}
      onOpenChange={handleOpenChange}
    >
      <Drawer.Overlay className='absolute inset-0 bg-black/40 pointer-events-none' />

      <VisuallyHidden>
        <Drawer.Title>Safety Location</Drawer.Title>
      </VisuallyHidden>

      <Drawer.Content
        data-testid='content'
        className='z-1 absolute flex flex-col bg-white border border-gray-200 border-b-none rounded-t-[10px] bottom-0 left-0 right-0 h-full max-h-full -mx-px'
      >
        <Drawer.Handle className='w-16! my-3! rounded-full! shrink-0!' />

        {isLoading || !safetyDetail ? (
          <AffectedLocationDrawerSkeleton />
        ) : (
          <div
            ref={scrollRef}
            id='report-drawer-scroll'
            className={clsx('flex flex-col max-w-lg mx-auto w-full gap-2', {
              'overflow-y-auto': snap === 1,
              'overflow-hidden': snap !== 1,
            })}
          >
            {/* report details */}
            <div
              className='flex flex-col p-2 sm:p-3 gap-2 lg:gap-3 border-l-4 shrink-0'
              style={{
                borderLeftColor: SAFETY_TYPE_COLOR_MAP[safetyDetail?.type],
              }}
            >
              {/* row 1 */}
              <Drawer.Title className='font-poppins text-base lg:text-lg font-semibold'>
                {safetyDetail?.location}
              </Drawer.Title>

              <Separator />

              {/* badge and distance to now */}
              {/* <div className='flex flex-row justify-between gap-3'>
                <div className='flex items-center text-xs lg:text-sm gap-1.5 lg:gap-2 tabular-nums opacity-50'>
                  <IconClock className='w-[1.5em]! h-[1.5em]!' />
                  {formatDistanceToNow(reportDetail?.reportedAt, {
                    addSuffix: true,
                  })}
                </div>

                <div
                  className='flex items-center rounded-full px-3 py-1 w-fit h-fit'
                  style={{
                    color: REPORT_STATUS_COLOR_MAP[reportDetail?.status],
                    backgroundColor: `${REPORT_STATUS_COLOR_MAP[reportDetail?.status]}25`,
                  }}
                >
                  <div className='flex items-center gap-1.5 lg:gap-2 text-xs lg:text-sm'>
                    {reportDetail?.status === 'verified' ? (
                      <IconCircleCheck className='w-[1.5em]! h-[1.5em]!' />
                    ) : (
                      <IconHelpCircle className='w-[1.5em]! h-[1.5em]!' />
                    )}
                    <span className='font-poppins font-medium'>
                      {reportDetail?.status.toUpperCase()} REPORT
                    </span>
                  </div>
                </div>
              </div> */}

              {/* details */}
              <div className='flex flex-col border rounded-lg text-xs lg:text-sm'>
                {/* severity */}
                <div className='flex justify-between items-center p-3 lg:p-4'>
                  <div className='flex items-center gap-1.5 lg:gap-2 opacity-50'>
                    <IconShield className='w-[1.5em]! h-[1.5em]!' />
                    <span className='font-poppins font-medium'>
                      SAFETY TYPE
                    </span>
                  </div>

                  <div
                    className='flex items-center rounded-full px-3 py-1'
                    style={{
                      color: SAFETY_TYPE_COLOR_MAP[safetyDetail?.type],
                      backgroundColor: `${SAFETY_TYPE_COLOR_MAP[safetyDetail?.type]}25`,
                    }}
                  >
                    <span className='font-poppins text-xs font-medium'>
                      {safetyDetail?.type?.toUpperCase()}
                    </span>
                  </div>
                </div>

                <Separator />

                <div className='flex justify-between items-center p-3 lg:p-4'>
                  <div className='flex items-center gap-1.5 lg:gap-2 opacity-50'>
                    <IconRoad className='w-[1.5em]! h-[1.5em]!' />
                    <span className='font-poppins font-medium'>ADDRESS</span>
                  </div>

                  <span>{safetyDetail?.address || 'No address provided'}</span>
                </div>

                <Separator />

                {/* added on */}
                <div className='flex justify-between items-start p-3 lg:p-4'>
                  <div className='flex items-center gap-1.5 lg:gap-2 opacity-50 shrink-0'>
                    <IconCalendarPlus className='w-[1.5em]! h-[1.5em]!' />
                    <span className='font-poppins font-medium'>ADDED ON</span>
                  </div>

                  <div className='flex flex-col items-end gap-0.5 text-xs lg:text-sm text-right'>
                    <span>{formattedDate}</span>
                    <span className='opacity-50'>{formattedTime}</span>
                  </div>
                </div>

                {/*  */}
              </div>

              {/* image */}
              <div className='aspect-video w-full relative bg-muted shrink-0 '>
                {safetyDetail?.image ? (
                  <Image
                    src={safetyDetail.image}
                    alt='Affected location'
                    fill
                    className='object-cover'
                  />
                ) : (
                  <div className='absolute inset-0'>
                    <NoPhotoEmpty />
                  </div>
                )}
              </div>

              {/* description */}
              {safetyDetail?.description && (
                <div className='flex flex-col border rounded-lg text-xs lg:text-sm p-3 lg:p-4 gap-0.5'>
                  <div className='flex items-center gap-1.5 lg:gap-2 opacity-50'>
                    <IconInfoCircle className='w-[1.5em]! h-[1.5em]!' />
                    <span className='font-poppins font-medium'>
                      DESCRIPTION
                    </span>
                  </div>

                  <p>{safetyDetail?.description}</p>
                </div>
              )}

              <Button className='rounded-lg h-12'>
                <IconSend className='w-[1.5em]! h-[1.5em]!' />
                <span className='font-poppins font-medium'>GET DIRECTIONS</span>
              </Button>
            </div>
          </div>
        )}
      </Drawer.Content>
    </Drawer.Root>
  );
}
