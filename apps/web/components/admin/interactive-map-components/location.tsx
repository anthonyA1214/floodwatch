const severityConfig = {
  Critical: { text: 'text-red-500', icon: 'text-red-500', bg: 'bg-red-50' },
  High: { text: 'text-orange-500', icon: 'text-orange-500', bg: 'bg-orange-50' },
  Moderate: { text: 'text-yellow-500', icon: 'text-yellow-500', bg: 'bg-yellow-50' },
  Low: { text: 'text-blue-400', icon: 'text-blue-400', bg: 'bg-blue-50' },
};

interface LocationProps {
  name: string;
  description: string;
  timeAgo: string;
  severity: keyof typeof severityConfig;
}

export default function Location({ name, description, timeAgo, severity }: LocationProps) {
  const styles = severityConfig[severity];

  return (
    <div className="flex items-start gap-3 py-4 border-b border-gray-100 last:border-0 group cursor-pointer hover:bg-gray-50/50 transition-colors px-2">

      <div className={`mt-1 ${styles.icon}`}>
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </div>

      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h5 className="text-[15px] font-bold text-gray-900">{name}</h5>
          <span className={`text-[10px] font-bold uppercase tracking-wider ${styles.text}`}>
            {severity}
          </span>
        </div>
        
        <p className="text-sm text-gray-600 mt-0.5 leading-snug">
          {description}
        </p>
        
        <div className="flex items-center gap-1.5 mt-2 text-gray-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-xs font-medium">{timeAgo}</span>
        </div>
      </div>
    </div>
  );
}