import { cn } from '@/lib/utils';

export default function IconBox({
  children,
  color,
  className,
}: {
  children: React.ReactNode;
  color?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex items-center justify-center w-10 h-10 border rounded-xl shrink-0',
        className,
      )}
      style={
        color
          ? { color, backgroundColor: `${color}25` }
          : { backgroundColor: 'white' }
      }
    >
      {children}
    </div>
  );
}
