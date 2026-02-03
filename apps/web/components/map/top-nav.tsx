'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { IconBell } from '@tabler/icons-react';
import NotificationPanel from './notification-panel'; // Path fixed

export default function TopNav() {
  const [isOpen, setIsOpen] = useState(false); // Variable name fixed

  return (
    <header className="flex w-full bg-[#0066CC] h-16 relative z-50">
      <nav className="flex justify-between p-4 container mx-auto items-center">
        <Link href="/" className="flex items-center gap-x-2">
          <Image src="/logo-white.svg" alt="Logo" width={32} height={32} />
          <h1 className="text-white font-bold text-xl">FloodWatch</h1>
        </Link>

        <div className="flex items-center gap-4 relative">
          <Button
            size="icon"
            variant="ghost"
            className="text-white text-2xl"
            onClick={() => setIsOpen(!isOpen)} // Matching the state variable
          >
            <IconBell />
          </Button>

          {/* Conditional rendering linked to state */}
          {isOpen && (
            <div className="absolute top-12 right-0 z-[100] mt-2">
              <NotificationPanel />
            </div>
          )}

          <Avatar className="ring-2 ring-white/20 size-10">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </nav>
    </header>
  );
}
