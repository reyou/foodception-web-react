import React from 'react';
import { Col, Container, Row, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { AuthenticationUtils } from '../../../utils/AuthenticationUtils';
import { LoginForm } from './components/LoginForm';
import ParentWindowUtils from '../../../utils/ParentWindowUtils';
import { FrontEndUtils } from '../../../utils/FrontEndUtils';
import EventBus from '../../../utils/EventBus';
import { EventTypes } from '../../../utils/EventTypes';

const LoginPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await AuthenticationUtils.isAuthenticated();
      setIsAuthenticated(authenticated);
    };

    checkAuth();

    // Subscribe to login error events
    const unsubscribe = EventBus.subscribe(EventTypes.LOGIN_ERROR, (data) => {
      setError(data.error.message);
    });

    // Cleanup subscription
    return () => {
      unsubscribe();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear any existing errors
    
    if(FrontEndUtils.isInsideIframe()) { 
      ParentWindowUtils.sendLoginData({email, password});
    }
    else {
     console.log('email', email);
     console.log('password', password);
     console.log("Call API and authenticate. Use Wix API"); 
    }
  };

  const handleLogout = async () => {
    await AuthenticationUtils.logout();
    setIsAuthenticated(false);
  };

  return isAuthenticated ? (
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
  ) : (
    <LoginForm
      email={email}
      password={password}
      onEmailChange={setEmail}
      onPasswordChange={setPassword}
      onSubmit={handleSubmit}
      error={error}
    />
  );
};

export default LoginPage;
