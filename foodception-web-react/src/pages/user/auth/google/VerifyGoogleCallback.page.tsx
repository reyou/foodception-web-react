import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Alert, Container, Spinner } from 'react-bootstrap';
import { useAuth } from '../../../../contexts/AuthContext';
import { FoodceptionHttpException } from '../../../../exceptions/FoodceptionHttpException';
import { FrontEndUtils } from '../../../../utils/FrontEndUtils';
import LoggedInView from '../components/LoggedInView';
import ParentWindowUtils from '../../../../utils/ParentWindowUtils';

/**
 * Component that handles Google OAuth callback verification.
 * This component is responsible for:
 * 1. Verifying the OAuth state parameter to prevent CSRF attacks
 * 2. Exchanging the authorization code for a token via loginWithGoogle
 * 3. Showing appropriate UI based on authentication state
 */
const VerifyGoogleCallback: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { loginWithGoogle, authenticated, logout } = useAuth();
    const [error, setError] = useState<string | null>(null);

    // Handle the Google OAuth callback verification
    useEffect(() => {
        // Skip verification if already authenticated
        if (authenticated) {
            return;
        }

        const verifyGoogleAuth = async () => {
            try {
                console.log('Verifying Google authentication callback...');
                const params = new URLSearchParams(location.search);
                const code = params.get('code');
                const state = params.get('state');
                const storedState = sessionStorage.getItem('googleOAuthState');

                // Validate state parameter (prevents CSRF attacks)
                if (!state || state !== storedState) {
                    // Silent return instead of error for better UX
                    return;
                }

                // Validate authorization code
                if (!code) {
                    const codeError = new Error('No authorization code present in the callback URL.');
                    console.error('Google OAuth code missing:', {
                        searchParams: location.search
                    });
                    throw codeError;
                }

                // Exchange code for token via AuthProvider
                await loginWithGoogle(code);
                sessionStorage.removeItem('googleOAuthState');

                // Only redirect in non-iframe mode (iframe parent handles navigation)
                if (!FrontEndUtils.isInsideIframe()) {
                    FrontEndUtils.redirect('/?logged_in=true', navigate);
                }
                console.log('Google authentication callback verified successfully.');
            } catch (err) {
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
        };

        verifyGoogleAuth();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authenticated]);

    // If authenticated, show the logged-in view
    if (authenticated) {
        // TODO: make this logic centralized
        const handleSignOut = () => {
            if (FrontEndUtils.isInsideIframe()) {
                logout();
                ParentWindowUtils.sendSignOutData();
            } else {
                logout();
            }
        };

        return <LoggedInView onLogout={handleSignOut} />;
    }

    // If there's an error, show error message
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

    // Show loading spinner during verification
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
