import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Alert, Container, Spinner } from 'react-bootstrap';
import { useAuth } from '../../../../contexts/AuthContext';
import { FoodceptionHttpException } from '../../../../exceptions/FoodceptionHttpException';
import { FrontEndUtils } from '../../../../utils/FrontEndUtils';
import LoggedInView from '../components/LoggedInView';
import ParentWindowUtils from '../../../../utils/ParentWindowUtils';

const VerifyGoogleCallback: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { loginWithGoogle, authenticated, logout } = useAuth();
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
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

                if (!state || state !== storedState) {
                    return;
                }

                if (!code) {
                    const codeError = new Error('No authorization code present in the callback URL.');
                    console.error('Google OAuth code missing:', {
                        searchParams: location.search
                    });
                    throw codeError;
                }

                await loginWithGoogle(code);
                sessionStorage.removeItem('googleOAuthState');
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

        const authenticatedView = (
            <LoggedInView onLogout={handleSignOut} />
        );
        return authenticatedView;
    }

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
