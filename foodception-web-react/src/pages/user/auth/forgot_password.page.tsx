import React, { useState } from 'react';
import { FrontEndUtils } from '../../../utils/FrontEndUtils';
import ParentWindowUtils from '../../../utils/ParentWindowUtils';
import { ForgotPasswordForm } from './components/ForgotPasswordForm';

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
    <ForgotPasswordForm
      email={email}
      onEmailChange={setEmail}
      onSubmit={handleSubmit}
      error={error}
      success={success}
    />
  );
};

export default ForgotPasswordPage;