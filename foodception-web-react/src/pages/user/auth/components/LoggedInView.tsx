import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

interface LoggedInViewProps {
  onLogout: () => void;
}

export const LoggedInView: React.FC<LoggedInViewProps> = ({ onLogout }) => {
  return (
    <Container>
      <Row>
        <Col>
          <h2>You are already logged in</h2>
          <Button variant="outline-dark" onClick={onLogout}>
            Logout
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default LoggedInView;
