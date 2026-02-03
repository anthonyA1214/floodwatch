'use client';

import React, { createContext, useContext, useState } from 'react';

interface ProfileContextType {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
}

const ProfileContext = createContext<ProfileContextType | null>(null);

export function ProfileContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ProfileContext.Provider
      value={{
        isOpen,
        toggle: () => setIsOpen((prev) => !prev),
        close: () => setIsOpen(false),
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context)
    throw new Error('useProfile must be used within ProfileProvider');
  return context;
}
