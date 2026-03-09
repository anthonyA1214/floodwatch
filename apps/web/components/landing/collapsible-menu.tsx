'use client';

import Link from 'next/link';
import { Collapsible, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useEffect, useState } from 'react';
import { Cross as Hamburger } from 'hamburger-react';
import { AnimatePresence, motion } from 'motion/react';

const navItems = [
  { label: 'Features', url: '#features' },
  { label: 'Safety Guides', url: '#safety-guides' },
  { label: 'Latest News', url: '#latest-news' },
  { label: 'About Us', url: '#about-us' },
];

export default function CollapsibleMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className='flex items-center justify-center'
    >
      <CollapsibleTrigger className='text-white'>
        <Hamburger
          direction='left'
          toggled={open}
          toggle={setOpen}
          size={20}
          distance='sm'
        />
      </CollapsibleTrigger>

      {/* Backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div
            key='backdrop'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className='fixed inset-0 top-16 bg-black/30 z-40'
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu — replaces CollapsibleContent */}
      <AnimatePresence>
        {open && (
          <motion.div
            key='menu'
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className='fixed right-0 top-16 bottom-0 w-3/4 max-w-xs bg-white shadow-md z-50'
          >
            <div className='flex flex-col p-6 gap-4 text-lg overflow-y-scroll h-full'>
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.url}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              <div className='w-full flex flex-col items-center gap-4 mt-auto'>
                <Link href='/auth/login' className='w-full'>
                  <button className='w-full py-3 bg-[#FFFFFF] hover:bg-[#F5F5F5] active:bg-[#EAEAEA] rounded-lg border transition-colors'>
                    Login
                  </button>
                </Link>
                <Link href='/auth/sign-up' className='w-full'>
                  <button className='w-full py-3 rounded-lg bg-[#81B2E2] text-white font-semibold hover:bg-[#6CA2DA] active:bg-[#578FCF] transition-colors shadow-sm'>
                    Sign Up
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Collapsible>
  );
}
