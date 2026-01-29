import { Icon } from '@tabler/icons-react';

export default function StatCard({
  icon: Icon,
  color,
  label,
}: {
  icon: Icon;
  color: string;
  label: string;
}) {
  return (
    <div className="flex items-center rounded-2xl border shadow-md p-6 gap-6 text-2xl">
      <div
        className={`rounded-full p-4 `}
        style={{ color: color, backgroundColor: `${color}25` }}
      >
        <Icon className="w-[1.5em]! h-[1.5em]!" />
      </div>
      <div className="grid space-y-2">
        <span className="font-semibold text-base">{label}</span>
        <h3 className="font-bold">1,234</h3>
      </div>
    </div>
  );
}
