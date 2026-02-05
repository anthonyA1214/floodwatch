import { IconPhoneCall, IconX } from '@tabler/icons-react';
import { Separator } from '@/components/ui/separator';

export default function HotlinesPopup({
  show,
  onClose,
}: {
  show: boolean;
  onClose: () => void;
}) {
  if (!show) return null;

  return (
    <div
      className="flex-1 flex flex-col bg-white rounded-xl shadow-lg 
    border max-w-sm p-4 gap-4 max-h-[60vh] overflow-hidden min-h-0"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-8">
        <div className="flex items-center gap-2 font-semibold text-sm">
          <IconPhoneCall className="w-[1.5em]! h-[1.5em]! text-[#FF6900]" />
          <span>Emergency Hotlines</span>
        </div>

        <button onClick={onClose} className="text-xs">
          <IconX className="w-[1.5em]! h-[1.5em]! text-[#525254] hover:text-black" />
        </button>
      </div>

      <Separator />

      <div className="flex flex-col gap-4 text-sm">
        <div className="flex items-center justify-between gap-4">
          <span className="font-medium">Emergency call:</span>
          <span>911</span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="font-medium">CDRRMO:</span>
          <span>288825664</span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="font-medium">BGRY 174:</span>
          <span>09499952723</span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="font-medium">BGRY 174:</span>
          <span>09993682208</span>
        </div>
      </div>
    </div>
  );
}
