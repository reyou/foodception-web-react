import React, { useEffect, useState } from 'react';
import { AuthenticationUtils } from '../utils/AuthenticationUtils';
import LoadingPanel from './loading_panel';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authenticated = await AuthenticationUtils.isAuthenticated();
        setIsAuthenticated(authenticated);
        if (!authenticated) {
          AuthenticationUtils.handleUnauthenticated();
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return <LoadingPanel visible={true} />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
