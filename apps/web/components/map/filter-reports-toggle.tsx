'use client';

import { IconMenu2 } from '@tabler/icons-react';

type FilterReportsToggleProps = {
  isOpen: boolean;
  onClick: () => void;
};

export default function FilterReportsToggle({
  isOpen,
  onClick,
}: FilterReportsToggleProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      title="Toggle verification filter"
      aria-pressed={isOpen}
      className="flex h-[36px] w-[36px] items-center justify-center rounded-md border border-slate-300 bg-white/80 shadow-lg transition hover:bg-gray-200"
    >
      <IconMenu2 className="h-[24px] w-[24px]" strokeWidth={1.8} />
    </button>
  );
}
