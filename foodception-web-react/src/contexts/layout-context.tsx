import React, { createContext, useContext, useState, ReactNode } from 'react';

const LayoutContext = createContext<{
  showBreadcrumb: boolean;
  setShowBreadcrumb: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

interface LayoutProviderProps {
  children: ReactNode;
}

export const LayoutProvider = ({ children }: LayoutProviderProps) => {
  const [showBreadcrumb, setShowBreadcrumb] = useState(true);

  return (
    <LayoutContext.Provider value={{ showBreadcrumb, setShowBreadcrumb }}>
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
