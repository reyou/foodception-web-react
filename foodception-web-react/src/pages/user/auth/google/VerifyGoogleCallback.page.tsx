import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Alert, Container, Spinner } from 'react-bootstrap';
import { useAuth } from '../../../../contexts/AuthContext';
import { FoodceptionHttpException } from '../../../../exceptions/FoodceptionHttpException';
import { FrontEndUtils } from '../../../../utils/FrontEndUtils';

const VerifyGoogleCallback: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { loginWithGoogle } = useAuth();
    const [error, setError] = useState<string | null>(null);
    const [authInitialized, setAuthInitialized] = useState<boolean>(false);

    const verifyCallback = useCallback(async () => {
        if (authInitialized) {
            return;
        }
        setAuthInitialized(true);

        try {
            const params = new URLSearchParams(location.search);
            const code = params.get('code');
            const state = params.get('state');
            const storedState = sessionStorage.getItem('googleOAuthState');

            if (!state || state !== storedState) {
                const stateError = new Error('Invalid state parameter. Authentication failed.');
                console.error('Google OAuth state validation failed:', {
                    receivedState: state,
                    storedState: storedState
                });
                throw stateError;
            }

            if (!code) {
                const codeError = new Error('No authorization code present in the callback URL.');
                console.error('Google OAuth code missing:', {
                    searchParams: location.search
                });
                throw codeError;
            }

            console.log('Attempting Google login with authorization code');
            await loginWithGoogle(code);
            console.log('Google login successful');
            sessionStorage.removeItem('googleOAuthState');
            FrontEndUtils.redirect('/?logged_in=true', navigate);
        } catch (err) {
            // Log the original error with full details
            console.error('Google authentication error:', err);

            let errorMessage = "";
            if (err instanceof FoodceptionHttpException) {
                errorMessage = "Failed to verify Google login. Status code: " + err.statusCode;
                console.error('HTTP Exception during Google login:', {
                    statusCode: err.statusCode,
                    message: err.message,
                });
            }
            else {
                errorMessage = 'Unknown error. Failed to verify Google login';
                console.error('Unexpected error during Google login:', {
                    error: err instanceof Error ? err.message : String(err)
                });
            }
            setError(errorMessage);
            setTimeout(() => {
                const loginErrorUrl = `/user/login?error=${encodeURIComponent(errorMessage)}`;
                FrontEndUtils.redirect(loginErrorUrl, navigate);
            }, 5000);
        }
    }, [location.search, loginWithGoogle, navigate, authInitialized]);

    useEffect(() => {
        verifyCallback();
    }, [verifyCallback]);

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
