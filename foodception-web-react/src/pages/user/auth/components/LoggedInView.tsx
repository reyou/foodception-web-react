import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useAuth } from '../../../../contexts/AuthContext';
import { FrontEndUtils } from '../../../../utils/FrontEndUtils';

interface LoggedInViewProps {
  onLogout: () => void;
  onContinue?: () => void;
  title?: string;
  message?: string;
}

export const LoggedInView: React.FC<LoggedInViewProps> = ({
  onLogout,
  onContinue,
  title = "Already Logged In",
  message = "You are already logged in to the application. What would you like to do?"
}) => {
  const { user } = useAuth();

  onContinue = onContinue || (() => {
    FrontEndUtils.redirect("/");
  });

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6}>
          <Card className="shadow-sm">
            <Card.Body className="p-4">
              <h4 className="text-center mb-4">{title}</h4>

              {user && (
                <>
                  <div className="text-muted mb-2">Currently logged in as:</div>
                  <div className="text-center mb-4">
                    <div className="fw-bold fs-5">{user.firstName} {user.lastName}</div>
                    <div className="text-muted">{user.email}</div>
                  </div>
                </>
              )}

              <div className="text-muted mb-3">
                {message}
              </div>

              <div className="d-grid gap-2">
                {onContinue && (
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={onContinue}
                  >
                    Continue with current session
                  </Button>
                )}
                <Button
                  variant="danger"
                  size="lg"
                  onClick={onLogout}
                >
                  Sign out
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoggedInView;
