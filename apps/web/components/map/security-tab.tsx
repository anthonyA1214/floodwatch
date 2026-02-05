'use client';

import { SecurityVerification } from '@/components/empty';
import { Button } from '@/components/ui/button';
import { IconLock } from '@tabler/icons-react';
import { useState } from 'react';
import IconBox from '../icon-box';

export default function SecurityTab() {
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  return (
    <div className="flex flex-col gap-8">
      {isChangingPassword ? (
        <>
          <SecurityVerification onCancel={() => setIsChangingPassword(false)} />
        </>
      ) : (
        <>
          {/* google */}
          {/* <div className="flex flex-col gap-3">
            <h3 className="font-poppins font-semibold">Connected Accounts</h3>
            <div className="flex flex-col bg-gray-100 border rounded-xl p-4 gap-4">
              
              <div className="flex items-start gap-4 flex-1">
                
                <IconBox>
                  <Image
                    src="/google.svg"
                    alt="Google Logo"
                    width={24}
                    height={24}
                  />
                </IconBox>
                
                <div className="flex flex-col">
                  <span className="font-medium">Google</span>
                  <span className="text-sm text-gray-600">
                    Connect your Google account for easier sign-in
                  </span>
                </div>
              </div>

              
              <Button className="flex items-center gap-2">
                <IconLink className="w-[1.5em]! h-[1.5em]!" />
                Connect
              </Button>
            </div>
          </div> */}

          {/* Password */}
          <div className="flex flex-col gap-3">
            <h3 className="font-poppins font-semibold">Password</h3>
            <div className="flex flex-col bg-gray-100 border rounded-xl p-4 gap-4">
              {/* left */}
              <div className="flex items-start gap-4 flex-1">
                {/* lock icon */}
                <IconBox color="#0066CC">
                  <IconLock className="w-6 h-6" />
                </IconBox>
                {/* label */}
                <div className="flex flex-col">
                  <span className="font-medium">Change password</span>
                  <span className="text-sm text-gray-600">
                    Keep your account secure by using a strong password and
                    changing it regularly
                  </span>
                </div>
              </div>

              {/* right */}
              <Button
                className="flex items-center gap-2"
                onClick={() => setIsChangingPassword(true)}
              >
                <IconLock className="w-[1.5em]! h-[1.5em]!" />
                Change password
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
