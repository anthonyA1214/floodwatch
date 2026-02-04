'use client';

import React, { createContext, useContext, useState } from 'react';

type ActivePanel = 'profile' | 'notification' | null;

interface PanelContextType {
  activePanel: ActivePanel;
  toggle: (panel: 'profile' | 'notification') => void;
  close: () => void;
}

const PanelContext = createContext<PanelContextType | null>(null);

export function PanelContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activePanel, setActivePanel] = useState<ActivePanel>(null);

  const toggle = (panel: 'profile' | 'notification') => {
    setActivePanel((current) => (current === panel ? null : panel));
  };

  return (
    <PanelContext.Provider
      value={{
        activePanel,
        toggle,
        close: () => setActivePanel(null),
      }}
    >
      {children}
    </PanelContext.Provider>
  );
}

export function usePanel() {
  const context = useContext(PanelContext);
  if (!context) throw new Error('usePanel must be used within PanelProvider');
  return context;
}
