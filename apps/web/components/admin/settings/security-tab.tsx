'use client';

import { SecurityVerification } from '@/components/empty';
import { Button } from '@/components/ui/button';
import { IconLock } from '@tabler/icons-react';
import { useState } from 'react';

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
            <div className="flex items-center justify-between bg-gray-100 border rounded-xl p-4">
              
              <div className="flex items-center gap-4">
               
                <div className="bg-white p-2 rounded-xl border">
                  <Image
                    src="/google.svg"
                    alt="Google Logo"
                    width={32}
                    height={32}
                  />
                </div>
                
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
            <div className="flex items-center justify-between bg-gray-100 border rounded-xl p-4 gap-8">
              {/* left */}
              <div className="flex items-center gap-4">
                {/* google logo */}
                <div className="p-2 rounded-xl border text-xl text-[#0066CC] bg-[#0066CC]/10">
                  <IconLock className="w-[1.5em]! h-[1.5em]!" />
                </div>
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
