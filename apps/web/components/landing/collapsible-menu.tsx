'use client';

import Link from 'next/link';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const navItems = [
  { label: 'Features', url: '#features' },
  { label: 'Safety Guides', url: '#safety-guides' },
  { label: 'Latest News', url: '#latest-news' },
  { label: 'About Us', url: '#about-us' },
];

export default function CollapsibleMenu() {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className="flex items-center justify-center md:hidden"
    >
      <CollapsibleTrigger className="text-white">
        {open ? <X /> : <Menu />}
      </CollapsibleTrigger>

      {/* Mobile Menu */}
      <CollapsibleContent className="fixed left-0 top-16 bottom-0 w-full bg-white shadow-md">
        <div className="flex flex-col p-6 gap-4 text-lg overflow-y-scroll h-full">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.url}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          <div className="w-full flex flex-col items-center gap-4 mt-auto">
            <Link href="/auth/login" className="w-full">
              <button
                className="w-full py-3 bg-[#FFFFFF] hover:bg-[#F5F5F5] active:bg-[#EAEAEA] 
                rounded-lg border transition-colors"
              >
                Login
              </button>
            </Link>
            <Link href="/auth/sign-up" className="w-full">
              <button
                className="
                w-full py-3 rounded-lg
                bg-[#81B2E2]
                text-white font-semibold
                hover:bg-[#6CA2DA]
                active:bg-[#578FCF]
                transition-colors
                shadow-sm"
              >
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
