import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './VerifyGoogleLogin.page.styles.css';
import ParentWindowUtils from '../../../../utils/ParentWindowUtils';
import { FrontEndUtils } from '../../../../utils/FrontEndUtils';
import { AuthenticationUtils } from '../../../../utils/AuthenticationUtils';

const VerifyGoogleLogin: React.FC = () => {
  // Mock data - would be replaced with actual user data in implementation


  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const user = await AuthenticationUtils.getUser();
      if (!user) {
        FrontEndUtils.redirect("/user/login");
      }
      else {
        setUser(user);
      }
    };

    checkAuth();

  }, []);

  const handleSignOut = () => {
    ParentWindowUtils.sendSignOutData();
  };

  const handleContinue = () => {
    FrontEndUtils.redirect("/");
  };

  return (
    user && <div className="vgl-container">
      <Container fluid>
        <Row className="justify-content-center align-items-center">
          <Col xs={12} sm={10} md={8} lg={6} xl={5}>
            <Card className="verify-content">
              <Card.Body className="p-4">
                <h3>Google Sign-In Confirmation</h3>

                <div className="current-user-info">
                  <p>You're currently signed in as:</p>
                  <Card className="user-profile">
                    <Card.Body className="text-center py-4">
                      <div className="user-name">{user.firstName} {user.lastName}</div>
                      <div className="user-email">{user.email}</div>
                    </Card.Body>
                  </Card>
                </div>

                <div className="confirmation-message">
                  <p>You're about to sign in with a different Google account. What would you like to do?</p>
                </div>

                <div className="action-buttons">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleContinue}
                  >
                    Continue using this account
                  </Button>
                  <Button
                    onClick={handleSignOut}
                    variant="danger"
                    size="lg"
                  >
                    Sign out and use another account
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default VerifyGoogleLogin;
