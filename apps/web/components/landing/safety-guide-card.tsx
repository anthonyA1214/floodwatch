import { ReactNode } from 'react';

export default function SafetyGuideInfoCard({
  icon,
  title,
  bullets,
}: {
  icon: ReactNode;
  title: string;
  bullets: string[];
}) {
  return (
    <div className="flex flex-col gap-4 bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3">
        {/* Navy Icon Container */}
        <div className="w-10 h-10 rounded-xl bg-[#2F327D] flex items-center justify-center text-white shrink-0 shadow-md shadow-[#2F327D]/20">
          {icon}
        </div>
        <h4 className="font-poppins font-bold text-[#2F327D] text-base leading-tight">
          {title}
        </h4>
      </div>
      
      <ul className="space-y-3">
        {bullets.map((bullet, i) => (
          <li key={i} className="flex items-start gap-2 text-sm leading-relaxed text-gray-600">
            <svg
              className="w-4 h-4 mt-0.5 text-[#2F327D] shrink-0 opacity-80"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}