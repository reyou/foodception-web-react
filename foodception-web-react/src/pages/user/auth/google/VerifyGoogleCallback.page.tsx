import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Alert, Container, Spinner } from 'react-bootstrap';
import { useAuth } from '../../../../contexts/AuthContext';
import { FoodceptionHttpException } from '../../../../exceptions/FoodceptionHttpException';

const VerifyGoogleCallback: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { loginWithGoogle } = useAuth();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const verifyCallback = async () => {
            try {
                // Get the code and state from URL parameters
                const params = new URLSearchParams(location.search);
                const code = params.get('code');
                const state = params.get('state');
                const storedState = sessionStorage.getItem('googleOAuthState');

                // Verify state to prevent CSRF attacks
                if (!state || state !== storedState) {
                    throw new Error('Invalid state parameter. Authentication failed.');
                }

                if (!code) {
                    throw new Error('No authorization code present in the callback URL.');
                }

                // Exchange code for tokens through your backend
                await loginWithGoogle(code);

                // Clear the stored state
                sessionStorage.removeItem('googleOAuthState');

                // Redirect to home page or dashboard
                navigate('/');
            } catch (err) {
                let errorMessage = "";
                if (err instanceof FoodceptionHttpException) {
                    errorMessage = "Failed to verify Google login. Status code: " + err.statusCode;
                }
                else {
                    errorMessage = 'Unknown error. Failed to verify Google login';
                }
                setError(errorMessage);
                // Redirect to login page after 3 seconds on error
                setTimeout(() => navigate(`/user/login?error=${errorMessage}`), 3000);
            }
        };

        verifyCallback();
    }, [location, navigate, loginWithGoogle]);

    if (error) {
        return (
            <Container className="py-5">
                <Alert variant="danger">
                    {error}
                </Alert>
                <div className="text-center">
                    Redirecting to login page...
                </div>
            </Container>
        );
    }

    return (
        <Container className="py-5 text-center">
            <Spinner animation="border" role="status" />
            <div className="mt-3">
                Verifying your Google login...
            </div>
        </Container>
    );
};

export default VerifyGoogleCallback;
