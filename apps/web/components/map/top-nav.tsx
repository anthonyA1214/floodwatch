'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  Avatar as UIAvatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import Avatar from 'boring-avatars';
import {
  IconBell,
  IconMapPinExclamation,
  IconShieldPin,
} from '@tabler/icons-react';
import { usePanel } from '@/contexts/panel-context';
import AuthButtons from '@/components/shared/auth-buttons';
import { useUser } from '@/hooks/use-user';
import { Skeleton } from '@/components/ui/skeleton';
import ReportFloodAlertDialog from './report-flood-alert-dialog';

export default function TopNav() {
  const { toggle } = usePanel();
  const { user, isLoading } = useUser();

  return (
    <header className="w-full bg-[#0066CC] relative z-50">
      <nav className="flex flex-wrap w-full justify-between px-3 md:px-4 py-2 mx-auto items-center gap-y-2">
        {/* logo */}
        <div className="flex items-center gap-3 shrink-0">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo-white.svg" alt="Logo" width={32} height={32} />
            <h1 className="hidden sm:block text-white font-bold text-lg">
              FloodWatch
            </h1>
          </Link>
        </div>

        {/* mobile row buttons */}
        <div className="flex basis-full gap-3 order-last 2xl:hidden px-2 min-w-0">
          <button
            className="flex-1 min-w-0 flex items-center justify-center gap-2 text-white
            bg-white/10 border border-white/10
            px-3 py-2 rounded-lg text-xs
            hover:bg-white/20 active:bg-white/30
            transition-colors"
          >
            <IconMapPinExclamation className="w-[1.5em] h-[1.5em] shrink-0" />
            <span className="font-medium leading-tight text-center">
              AFFECTED LOCATIONS
            </span>
          </button>

          <button
            className="flex-1 min-w-0 flex items-center justify-center gap-2 text-white 
            bg-white/10 border border-white/10 
            px-3 py-2 rounded-lg text-xs
            hover:bg-white/20 active:bg-white/30
            transition-colors"
          >
            <IconShieldPin className="w-[1.5em] h-[1.5em] shrink-0" />
            <span className="leading-tight text-center">SAFETY LOCATIONS</span>
          </button>
        </div>

        {/* user actions */}
        {isLoading ? (
          <div className="flex items-center gap-2 ml-auto">
            <Skeleton className="w-24 h-9 rounded-md bg-white/20" />
            <Skeleton className="w-6 h-6 rounded-md bg-white/20" />
            <Skeleton className="size-8 rounded-full bg-white/20" />
          </div>
        ) : user ? (
          <div className="flex items-center gap-3 sm:gap-6 ml-auto">
            {/* desktop tabs beside report */}
            <div className="hidden 2xl:flex items-center gap-4">
              <button
                className="flex items-center justify-center gap-2 text-white 
                bg-white/10 border border-white/10 
                px-4 py-1.5 rounded-lg text-sm
                hover:bg-white/20"
              >
                <IconMapPinExclamation className="w-[1.5em] h-[1.5em]" />
                <span>AFFECTED LOCATIONS</span>
              </button>

              <button
                className="flex items-center justify-center gap-2 text-white 
                bg-white/10 border border-white/10 
                px-4 py-1.5 rounded-lg text-sm
                hover:bg-white/20"
              >
                <IconShieldPin className="w-[1.5em] h-[1.5em]" />
                <span>SAFETY LOCATIONS</span>
              </button>
            </div>

            <ReportFloodAlertDialog />

            <button
              className="text-white hover:text-gray-200"
              onClick={() => toggle('notification')}
            >
              <IconBell className="w-[1.5em] h-[1.5em]" />
            </button>

            <button onClick={() => toggle('profile')}>
              <UIAvatar className="size-8 border">
                <AvatarImage src={user?.profilePicture} />
                <AvatarFallback>
                  <Avatar
                    name={`${user?.name} ${user?.id}`}
                    variant="beam"
                    className="size-8"
                  />
                </AvatarFallback>
              </UIAvatar>
            </button>
          </div>
        ) : (
          <div className="ml-auto">
            <AuthButtons />
          </div>
        )}
      </nav>
    </header>
  );
}
