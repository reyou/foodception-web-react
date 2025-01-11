import React, { useEffect, useState } from 'react';
import { AuthenticationUtils } from '../utils/AuthenticationUtils';
import LoadingPanel from './loading_panel';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

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
    return (
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col xs={12} md={6} lg={4}>
            <Card className="text-center shadow-sm">
              <Card.Body className="p-5">
                <i className="bi bi-lock-fill text-muted mb-3" style={{ fontSize: '2rem' }}></i>
                <Card.Title className="mb-4">Please Login</Card.Title>
                <Card.Text className="text-muted mb-4">
                  You need to be logged in to access this page.
                </Card.Text>
                <Button 
                  variant="primary" 
                  onClick={() => AuthenticationUtils.handleUnauthenticated()}
                >
                  Login Now
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
