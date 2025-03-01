import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useAuth } from '../../../contexts/AuthContext';
import AuthenticatedView from './components/AuthenticatedView';
import EventBus from '../../../utils/EventBus';
import { EventTypes } from '../../../utils/EventTypes';
import { FrontEndUtils } from '../../../utils/FrontEndUtils';
import ParentWindowUtils from '../../../utils/ParentWindowUtils';
import { LoginForm } from './components/LoginForm';
import { AuthContextType } from '../../../types/auth.types';

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

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const authenticatedView = (
    <Container>
      <Row>
        <Col>
          <h2>You are already logged in</h2>
          <Button variant="outline-dark" onClick={handleLogout}>
            Logout
          </Button>
        </Col>
      </Row>
    </Container>
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
