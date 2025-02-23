import React from 'react';
import { Col, Container, Row, Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { AuthenticationUtils } from '../../../utils/AuthenticationUtils';
import { Link } from 'react-router-dom';

const LoginForm: React.FC<{
  email: string;
  password: string;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}> = ({ email, password, onEmailChange, onPasswordChange, onSubmit }) => {
  return (
    <Container className="py-5" fluid>
      <Row className="justify-content-center">
        <Col xs={12} md={6} lg={4}>
          <div className="text-center mb-4">
            <h1 className="display-4 mb-3">Log In to Foodception</h1>
            <p className="text-muted">
              New to this site? <Link to="/user/signup">Sign Up</Link>
            </p>
          </div>
          
          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email<span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => onEmailChange(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password<span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => onPasswordChange(e.target.value)}
                required
              />
            </Form.Group>

            <div className="text-end mb-3">
              <Link to="/user/forgot-password">Forgot password?</Link>
            </div>

            <Button
              variant="dark"
              type="submit"
              className="w-100 py-2"
            >
              Log In
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

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
