import React from 'react';
import { Col, Container, Row, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { AuthenticationUtils } from '../../../utils/AuthenticationUtils';
import { LoginForm } from './components/LoginForm';

const LoginPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await AuthenticationUtils.isAuthenticated();
      setIsAuthenticated(authenticated);
    };

    checkAuth();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting form');
    console.log('Email:', email);
    console.log('Password:', password);
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
    />
  );
};

export default LoginPage;
