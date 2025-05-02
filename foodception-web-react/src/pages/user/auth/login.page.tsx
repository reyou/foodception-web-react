import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import AuthenticatedView from './components/AuthenticatedView';
import EventBus from '../../../utils/EventBus';
import { EventTypes } from '../../../utils/EventTypes';
import { FrontEndUtils } from '../../../utils/FrontEndUtils';
import ParentWindowUtils from '../../../utils/ParentWindowUtils';
import { LoginForm } from './components/LoginForm';
import { AuthContextType } from '../../../types/auth.types';
import LoggedInView from './components/LoggedInView';

const LoginPage: React.FC = () => {
  const { login, logout }: AuthContextType = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Subscribe to login error events
    const unsubscribe = EventBus.subscribe(EventTypes.LOGIN_ERROR, (data) => {
      setError(data.error.message);
    });

    return () => {
      unsubscribe();
    };
  }, []);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      if (FrontEndUtils.isInsideIframe()) {
        ParentWindowUtils.sendLoginData({ email, password });
      } else {
        await login(email, password);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during login');
    }
  };

  // TODO: make this logic centralized
  const handleSignOut = () => {
    if (FrontEndUtils.isInsideIframe()) {
      logout();
      ParentWindowUtils.sendSignOutData();
    } else {
      logout();
    }
  };

  const authenticatedView = (
    <LoggedInView onLogout={handleSignOut} />
  );

  const unauthenticatedView = (
    <LoginForm
      email={email}
      password={password}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      onSubmit={handleSubmit}
      error={error}
    />
  );

  return (
    <AuthenticatedView
      authenticatedView={authenticatedView}
      unauthenticatedView={unauthenticatedView}
    />
  );
};

export default LoginPage;
