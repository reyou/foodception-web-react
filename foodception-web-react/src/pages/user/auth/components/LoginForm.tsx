import React from 'react';
import { Col, Container, Row, Button, Form, Alert } from 'react-bootstrap';
import FoodceptionLink from '../../../../components/links/foodception_link';
import { GoogleLoginButton } from 'react-social-login-buttons';
import { FrontEndUtils } from '../../../../utils/FrontEndUtils';


interface LoginFormProps {
  email: string;
  password: string;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  error?: string | null;
  handleGoogleLogin?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  error,
  handleGoogleLogin
}) => {

  const handleGoogleLoginBase = async () => {
    if (handleGoogleLogin) {
      await handleGoogleLogin();
    }
    else {
      FrontEndUtils.redirect("/user/login/google");
    }
  };

  return (
    <Container className="py-5" fluid>
      <Row className="justify-content-center">
        <Col xs={12} md={6} lg={4}>
          <div className="text-center mb-4">
            <h1 className="display-4 mb-3">Log In to Foodception</h1>
            <p className="text-muted">
              New to this site? <FoodceptionLink url="/user/signup" underlined={true}>Sign Up</FoodceptionLink>
            </p>
          </div>

          <div className="mb-4">
            <GoogleLoginButton onClick={() => handleGoogleLoginBase()} />
          </div>

          <div className="d-flex align-items-center mb-4">
            <div className="flex-grow-1 border-bottom"></div>
            <div className="px-3 text-muted">or</div>
            <div className="flex-grow-1 border-bottom"></div>
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
              <FoodceptionLink url="/user/forgot-password" underlined={true}>Forgot password?</FoodceptionLink>
            </div>
            {error && (
              <Alert variant="danger" className="mb-3">
                {error}
              </Alert>
            )}
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
