import { Button } from '@/components/ui/button';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import { IconShield } from '@tabler/icons-react';
import VerifyOtpModal from './map/verify-otp-modal';

export function SecurityVerification({ onCancel }: { onCancel: () => void }) {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia className="text-[#0066CC] bg-[#0066CC]/10 p-4 rounded-full">
          <IconShield className="size-12" />
        </EmptyMedia>
        <EmptyTitle>Security Verification Required</EmptyTitle>
        <EmptyDescription>
          To change your password, you need to verify your identity. We&apos;ll
          send a one-time password (OTP) to your registered email address.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent className="flex-row justify-center gap-2">
        <VerifyOtpModal />
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </EmptyContent>
    </Empty>
  );
}
