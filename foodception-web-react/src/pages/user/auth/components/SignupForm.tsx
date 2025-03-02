import React from 'react';
import { Col, Container, Row, Button, Form, Alert } from 'react-bootstrap';
import FoodceptionLink from '../../../../components/links/foodception_link';
import { GoogleLoginButton } from 'react-social-login-buttons';
import { FrontEndUtils } from '../../../../utils/FrontEndUtils';

interface SignupFormProps {
  email: string;
  password: string;
  confirmPassword: string;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  error?: string | null;
  success?: string | null;
  handleGoogleLogin?: () => void;
}

export const SignupForm: React.FC<SignupFormProps> = ({
  email,
  password,
  confirmPassword,
  onEmailChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onSubmit,
  error,
  success,
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
            <h1 className="display-4 mb-3">Sign Up for Foodception</h1>
            <p className="text-muted">
              Already have an account? <FoodceptionLink url="/user/login" underlined={true}>Log In</FoodceptionLink>
            </p>
          </div>

          <div className="mb-4">
            <GoogleLoginButton onClick={() => handleGoogleLoginBase()} text="Sign up with Google" />
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

            <Form.Group className="mb-3">
              <Form.Label>Confirm Password<span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => onConfirmPasswordChange(e.target.value)}
                required
              />
            </Form.Group>

            {error && (
              <Alert variant="danger" className="mb-3">
                {error}
              </Alert>
            )}

            {success && (
              <Alert variant="success" className="mb-3">
                {success}
              </Alert>
            )}

            <Button
              variant="dark"
              type="submit"
              className="w-100 py-2"
            >
              Sign Up
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupForm;