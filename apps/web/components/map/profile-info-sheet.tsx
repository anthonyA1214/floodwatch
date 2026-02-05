'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LogOut } from 'lucide-react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';

export default function ProfileInfoSheet({
  children,
}: {
  children: React.ReactNode;
}) {
  // Navigation States
  const [view, setView] = useState<
    'profile' | 'edit' | 'password' | 'otp' | 'success'
  >('profile');

  // Helper to reset back to start
  const reset = () => setView('profile');

  return (
    <Sheet onOpenChange={(open) => !open && reset()}>
      <SheetTrigger asChild>
        <Button variant="link" className="p-0 h-auto font-normal">
          {children}
        </Button>
      </SheetTrigger>

      <SheetContent className="flex flex-col gap-0 p-0 sm:max-w-[400px] rounded-l-3xl overflow-hidden border-none shadow-xl bg-white">
        {/* HEADER LOGIC */}
        <SheetHeader className="p-6 pb-2 text-left">
          <SheetTitle className="text-[#4A86C1] font-bold text-lg">
            {view === 'success'
              ? 'Lawrence Dullo | FloodWatch'
              : view === 'otp'
                ? 'Verify OTP'
                : view === 'password'
                  ? 'Change Password'
                  : 'Profile Information'}
          </SheetTitle>
          <SheetDescription
            className={
              view === 'password' ? 'text-gray-500 text-xs mt-2' : 'sr-only'
            }
          >
            A minimum of 6 characters is required. Your password should contain
            letters, numbers, and special characters.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 px-6 space-y-6 overflow-y-auto">
          {/* VIEW: PROFILE & EDIT */}
          {(view === 'profile' || view === 'edit') && (
            <div className="space-y-6 pt-2">
              <div className="space-y-2">
                <Label className="text-gray-600 font-semibold ml-1">
                  Full Name
                </Label>
                <Input
                  readOnly={view === 'profile'}
                  defaultValue="Lawrence Dullo"
                  className="rounded-[20px] h-12 border-gray-200 focus-visible:ring-[#0066CC]"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-600 font-semibold ml-1">
                  Email Address
                </Label>
                <Input
                  readOnly={view === 'profile'}
                  defaultValue="dullolawrence@gmail.com"
                  className="rounded-[20px] h-12 border-gray-200 focus-visible:ring-[#0066CC]"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-600 font-semibold ml-1">
                  Home address
                </Label>
                <Input
                  readOnly={view === 'profile'}
                  defaultValue="Home address block sample"
                  className="rounded-[20px] h-12 border-gray-200 focus-visible:ring-[#0066CC]"
                />
              </div>
            </div>
          )}

          {/* VIEW: PASSWORD */}
          {view === 'password' && (
            <div className="space-y-6 pt-4">
              <div className="space-y-2">
                <Label className="text-gray-600 font-semibold ml-1">
                  Current Password
                </Label>
                <Input
                  type="password"
                  className="rounded-[20px] h-12 border-gray-200"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-600 font-semibold ml-1">
                  Enter New Password
                </Label>
                <Input
                  type="password"
                  className="rounded-[20px] h-12 border-gray-200"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-600 font-semibold ml-1">
                  Confirm New Password
                </Label>
                <Input
                  type="password"
                  className="rounded-[20px] h-12 border-gray-200"
                />
              </div>
            </div>
          )}

          {/* VIEW: OTP */}
          {view === 'otp' && (
            <div className="space-y-6 pt-4 flex flex-col items-center">
              <div className="w-full text-left space-y-4 mb-4">
                <h3 className=" font-bold">Request OTP Verification</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  To reset your FloodWatch password, we&apos;ll send a One-Time
                  Password (OTP) to your registered email.
                </p>
                <Label className="text-gray-600 font-bold block">
                  Enter OTP Code
                </Label>
              </div>

              <InputOTP maxLength={6}>
                <InputOTPGroup className="gap-2">
                  {[...Array(6)].map((_, i) => (
                    <InputOTPSlot
                      key={i}
                      index={i}
                      className="w-12 h-12 rounded-xl border-gray-200 text-lg font-bold"
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>

              <p className="text-gray-400 text-xs text-center mt-4 px-4">
                Enter the 6-digit OTP sent to your device to verify your
                identity.
              </p>
            </div>
          )}

          {/* VIEW: SUCCESS */}
          {view === 'success' && (
            <div className="flex flex-col items-center justify-center pt-16 pb-10 text-center space-y-4">
              <h2 className="text-lg font-bold text-gray-700">
                Password Reset Successful
              </h2>
              <p className="text-sm text-gray-500 max-w-[280px]">
                Your password has been successfully updated.
              </p>
            </div>
          )}

          {/* BUTTONS */}
          <div className="flex flex-col items-center gap-4 pt-6">
            {view === 'profile' && (
              <Button
                onClick={() => setView('edit')}
                className="bg-[#0066CC] rounded-full px-12 h-12 font-bold hover:bg-[#0052a3]"
              >
                Edit Information
              </Button>
            )}

            {view === 'edit' && (
              <div className="flex flex-col items-center gap-3 w-full">
                <Button
                  onClick={() => setView('profile')}
                  variant="outline"
                  className="w-full max-w-[240px] rounded-full h-12 border-gray-200 text-gray-400 font-bold"
                >
                  Save
                </Button>
                <Button
                  onClick={() => setView('password')}
                  className="bg-[#0066CC] w-full max-w-[240px] rounded-full h-12 font-bold"
                >
                  Change Password
                </Button>
              </div>
            )}

            {view === 'password' && (
              <Button
                onClick={() => setView('otp')}
                className="bg-[#0066CC] rounded-full px-12 h-12 font-bold"
              >
                Change Password
              </Button>
            )}

            {view === 'otp' && (
              <Button
                onClick={() => setView('success')}
                className="bg-[#0066CC] rounded-full px-12 h-12 font-bold"
              >
                Verify OTP
              </Button>
            )}

            {view === 'success' && (
              <Button
                onClick={reset}
                className="bg-[#0066CC] rounded-full px-10 h-12 font-bold"
              >
                Return to User Information
              </Button>
            )}
          </div>

          {/* STATS SECTION */}
          <div className="pt-12 space-y-2 pb-6 mt-auto">
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-500 font-medium">Member Since</span>
              <span className="text-gray-500 font-medium">October 5, 2025</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-500 font-medium">Posts</span>
              <span className="text-gray-500 font-medium">5</span>
            </div>
          </div>
        </div>

        {/* UPDATED FOOTER SECTION */}
        <SheetFooter className="mt-auto p-4 border-t border-gray-100 bg-white">
          <div className="flex items-center justify-between w-full px-2">
            <div className="flex items-center gap-3">
              {/* Logout Button */}
              <SheetClose asChild>
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <LogOut size={28} />
                </button>
              </SheetClose>

              {/* Avatar moved to the left of the text */}
              <div className="w-12 h-12 rounded-full bg-blue-100 overflow-hidden border border-gray-50">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Lawrence"
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* User Info aligned to the left */}
              <div className="text-left">
                <p className="text-sm font-bold text-gray-800 leading-tight">
                  Lawrence Dullo
                </p>
                <p className="text-[11px] text-gray-400">
                  lawrencedullo04@gmail.com
                </p>
              </div>
            </div>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
