import React, { useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './RedirectingToGoogle.page.styles.css';
import { GoogleAuthUtils } from '../../../../utils/GoogleAuthUtils';
import { FrontEndUtils } from '../../../../utils/FrontEndUtils';


const RedirectingToGoogle: React.FC = () => {

  useEffect(() => {
    const timer = setTimeout(() => {
      const authUrl = GoogleAuthUtils.getAuthUrl();
      FrontEndUtils.redirect(authUrl);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="rtg-container">
      <Container fluid>
        <Row className="justify-content-center align-items-center">
          <Col xs={12} sm={10} md={8} lg={6} xl={5}>
            <Card className="redirect-content">
              <Card.Body className="p-4 text-center">
                <h3>Redirecting to Google</h3>
                <p>Please wait while we redirect you to Google to complete the sign-in process. You will be redirected
                  automatically in a few seconds.</p>

                <div className="google-logo">
                  <span className="g-blue">G</span>
                  <span className="g-red">o</span>
                  <span className="g-yellow">o</span>
                  <span className="g-blue">g</span>
                  <span className="g-green">l</span>
                  <span className="g-red">e</span>
                </div>

                <div className="loader"></div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RedirectingToGoogle;
