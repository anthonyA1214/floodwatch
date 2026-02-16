import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { Button } from './ui/button';
import { IconCircleCheck } from '@tabler/icons-react';

export default function SuccessEmpty() {
  return (
    /* Increased min-h from [500px] to [700px] to make the background size taller */
    <Empty className="flex flex-col items-center justify-center p-12 bg-white text-center min-h-[700px]">
      <EmptyHeader className="flex flex-col items-center">
        <EmptyMedia
          variant="icon"
          className="mb-14 flex items-center justify-center scale-[2.2]"
        >
          <IconCircleCheck stroke={1.5} className="text-[#006ee6]" />
        </EmptyMedia>

        <div className="flex flex-col items-center space-y-4">
          <EmptyTitle className="text-[28px] font-extrabold text-[#333333] tracking-tight">
            Success!
          </EmptyTitle>

          <EmptyDescription className="text-[#666666] text-[16px] leading-snug max-w-[280px]">
            Congratulations! You have been successfully created an account
          </EmptyDescription>
        </div>
      </EmptyHeader>

      <EmptyContent className="w-full max-w-[340px] mt-16">
        <Button className="w-full bg-[#006ee6] hover:bg-[#005bbd] text-white py-7 rounded-full text-[16px] font-medium shadow-sm border-none transition-all">
          Done
        </Button>
      </EmptyContent>
    </Empty>
  );
}
