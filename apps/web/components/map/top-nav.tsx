'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  Avatar as UIAvatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import Avatar from 'boring-avatars';
import { Button } from '@/components/ui/button';
import { IconBell } from '@tabler/icons-react';
import { useProfile } from '@/contexts/profile-context';
import { useAuth } from '@/contexts/auth-context';
import AuthButtons from '@/components/auth-buttons';

export default function TopNav() {
  const { toggle } = useProfile();
  const { isAuthenticated } = useAuth();

  return (
    <>
      <header className="flex w-full bg-[#0066CC] h-16">
        <nav className="flex justify-between p-4 container mx-auto">
          <div className="flex items-center gap-4 md:gap-10">
            <Link href="/" className="flex items-center gap-x-2">
              <Image
                src="/logo-white.svg"
                alt="FloodWatch Logo"
                width={32}
                height={32}
              />
              <h1 className="text-[#FFFFFF] font-bold text-xl">FloodWatch</h1>
            </Link>
          </div>

          {isAuthenticated ? (
            <div className="flex items-center gap-10">
              <div className="flex items-center gap-4">
                {/* Notification button maybe dropdown */}
                <Button size="icon" className="text-2xl">
                  <IconBell className="w-[1em]! h-[1em]!" />
                </Button>

                <button onClick={toggle}>
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
    </>
  );
}
