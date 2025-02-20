import React from 'react';
import { Col, Container, Row, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { AuthenticationUtils } from '../utils/AuthenticationUtils';


const LoginPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await AuthenticationUtils.isAuthenticated();
      setIsAuthenticated(authenticated);
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    await AuthenticationUtils.logout();
    setIsAuthenticated(false);
  };

  const handleLogin = async () => {
    await AuthenticationUtils.handleUnauthenticated();
  };

  return (
    <Container fluid>
      <Row className="justify-content-center mt-5">
        <Col xs={12} md={6} className="text-center">
          {isAuthenticated ? (
            <>
              <h2>You are authenticated!</h2>
              <p className="mt-3">
                Want to use a different account?
              </p>
              <Button variant="primary" onClick={handleLogout} className="mt-2">
                Log Out
              </Button>
            </>
          ) : (
            <>
              <h2>Welcome to Foodception</h2>
              <p className="mt-3">
                Please sign in to continue
              </p>
              <Button variant="primary" onClick={handleLogin} className="mt-2">
                Sign In
              </Button>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
