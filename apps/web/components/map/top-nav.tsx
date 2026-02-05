'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  Avatar as UIAvatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import Avatar from 'boring-avatars';
import { IconBell } from '@tabler/icons-react';
import { usePanel } from '@/contexts/panel-context';
import { useAuth } from '@/contexts/auth-context';
import AuthButtons from '@/components/auth-buttons';

export default function TopNav() {
  const { toggle } = usePanel();
  const { isAuthenticated } = useAuth();

  return (
    <header className="flex w-full bg-[#0066CC] h-16 relative z-50">
      <nav className="flex justify-between p-4 container mx-auto items-center">
        <Link href="/" className="flex items-center gap-x-2">
          <Image src="/logo-white.svg" alt="Logo" width={32} height={32} />
          <h1 className="text-white font-bold text-xl">FloodWatch</h1>
        </Link>

        {isAuthenticated ? (
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-4">
              {/* Notification button maybe dropdown */}
              <button
                className="text-base text-white hover:text-[#F5F5F5] active:text-[#EAEAEA] transition-colors"
                onClick={() => toggle('notification')}
              >
                <IconBell className="w-[1.5em]! h-[1.5em]!" />
              </button>

              <button onClick={() => toggle('profile')}>
                <UIAvatar className="size-8 border">
                  <AvatarImage src="" />
                  <AvatarFallback>
                    <Avatar name="Lawrence Dullo" variant="beam" />
                  </AvatarFallback>
                </UIAvatar>
              </button>
            </div>
          </div>
        ) : (
          <AuthButtons />
        )}
      </nav>
    </header>
  );
}
