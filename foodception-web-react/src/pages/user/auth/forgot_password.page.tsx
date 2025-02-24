import React, { useState } from 'react';
import { Col, Container, Row, Form, Alert } from 'react-bootstrap';
import FoodceptionLink from '../../../components/links/foodception_link';
import { FrontEndUtils } from '../../../utils/FrontEndUtils';
import ParentWindowUtils from '../../../utils/ParentWindowUtils';
 
const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    try {
      if (FrontEndUtils.isInsideIframe()) {
        ParentWindowUtils.sendForgotPasswordData({email});
      } else {
        // TODO: Implement password reset API call
        console.log('Reset password for email:', email);
        setSuccess('If an account exists for this email, you will receive password reset instructions.');
      }
    } catch (err) {
      setError('An error occurred while processing your request. Please try again later.');
    }
  };

  return (
    <Container className="py-5" fluid>
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6}>
          <div className="text-center mb-4">
            <h1 className="display-4 mb-3">Reset your Foodception password</h1>
            <p className="text-muted">
              Enter your login email and we'll send you a link to reset your password.
            </p>
          </div>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email<span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

export default ForgotPasswordPage;