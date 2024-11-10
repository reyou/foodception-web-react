import React, { createContext, useContext, useState, ReactNode } from 'react';

const LayoutContext = createContext<{
  hasHeader: boolean;
  setHasHeader: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

interface LayoutProviderProps {
  children: ReactNode;
}

export const LayoutProvider = ({ children }: LayoutProviderProps) => {
  const [hasHeader, setHasHeader] = useState(false);

  return (
    <LayoutContext.Provider value={{ hasHeader, setHasHeader }}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
};
