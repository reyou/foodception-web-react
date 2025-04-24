import React, { createContext, useContext, useState, ReactNode } from 'react';

const LayoutContext = createContext<{
  showNavigation: boolean;
  setShowNavigation: React.Dispatch<React.SetStateAction<boolean>>;
  showBreadcrumb: boolean;
  setShowBreadcrumb: React.Dispatch<React.SetStateAction<boolean>>;
  showHorizontalRule: boolean;
  setShowHorizontalRule: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

interface LayoutProviderProps {
  children: ReactNode;
}

export const LayoutProvider = ({ children }: LayoutProviderProps) => {
  const [showNavigation, setShowNavigation] = useState(true);
  const [showBreadcrumb, setShowBreadcrumb] = useState(true);
  const [showHorizontalRule, setShowHorizontalRule] = useState(true);

  return (
    <LayoutContext.Provider
      value={{
        showNavigation,
        setShowNavigation,
        showBreadcrumb,
        setShowBreadcrumb,
        showHorizontalRule,
        setShowHorizontalRule
      }}
    >
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
