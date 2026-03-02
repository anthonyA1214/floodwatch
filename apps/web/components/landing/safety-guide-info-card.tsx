import { cn } from '@/lib/utils';
import { Icon, IconCheck } from '@tabler/icons-react';

export default function SafetyGuideInfoCard({
  icon: Icon,
  title,
  bullets,
  className,
}: {
  icon: Icon;
  title: string;
  bullets: string[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow',
        className,
      )}
    >
      <div className="flex items-center gap-3">
        {/* Navy Icon Container */}
        <div className="p-4 rounded-xl bg-[#0066CC] flex items-center justify-center text-white shrink-0 shadow-md shadow-[#0066CC]/20">
          <Icon className="w-[1.5em]! h-[1.5em]!" />
        </div>
        <span className="font-poppins font-bold text-[#0066CC] text-lg">
          {title.toUpperCase()}
        </span>
      </div>

      <ul className="space-y-3">
        {bullets.map((bullet, i) => (
          <li
            key={i}
            className="flex items-start gap-2 text-base text-gray-600"
          >
            <IconCheck className="w-[1.5em]! h-[1.5em]! shrink-0 text-[#0066CC]" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
