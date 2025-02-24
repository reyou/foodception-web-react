import React, { useState, useEffect } from 'react';
import { FrontEndUtils } from '../../../utils/FrontEndUtils';
import ParentWindowUtils from '../../../utils/ParentWindowUtils';
import { ForgotPasswordForm } from './components/ForgotPasswordForm';
import EventBus from '../../../utils/EventBus';
import { EventTypes } from '../../../utils/EventTypes';

const ForgotPasswordPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribeSuccess = EventBus.subscribe(EventTypes.FORGOT_PASSWORD_SUCCESS, (_) => {
            setSuccess("Password reset email sent");
            setEmail('');
        });

        const unsubscribeError = EventBus.subscribe(EventTypes.FORGOT_PASSWORD_ERROR, (data) => {
            setError(data.error.message);
        });

        // Cleanup subscription
        return () => {
            unsubscribeSuccess();
            unsubscribeError();
        };
    }, []);

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
                ParentWindowUtils.sendForgotPasswordData({ email });
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