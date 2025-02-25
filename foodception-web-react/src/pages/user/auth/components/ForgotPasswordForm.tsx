import React from 'react';
import { Col, Container, Row, Form, Alert } from 'react-bootstrap';
import FoodceptionLink from '../../../../components/links/foodception_link';

interface ForgotPasswordFormProps {
  email: string;
  onEmailChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  error?: string | null;
  success?: string | null;
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  email,
  onEmailChange,
  onSubmit,
  error,
  success
}) => {
  return (
    <Container className="py-5" fluid>
      <Row className="justify-content-center">
        <Col xs={12} md={6} lg={4}>
          <div className="text-center mb-4">
            <h1 className="display-4 mb-3">Reset your Foodception password</h1>
            <p className="text-muted">
              Enter your login email and we'll send you a link to reset your password.
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

            <div className="d-grid gap-2">
              <button
                type="submit"
                className="btn btn-dark btn-lg"
              >
                Reset Password
              </button>
            </div>

            <div className="text-center mt-3">
              <FoodceptionLink url="/user/login" underlined={true}>
                Back to Login
              </FoodceptionLink>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
