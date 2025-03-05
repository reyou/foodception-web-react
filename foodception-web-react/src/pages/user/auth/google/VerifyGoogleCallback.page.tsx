import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Alert, Container, Spinner } from 'react-bootstrap';
import { useAuth } from '../../../../contexts/AuthContext';
import { FoodceptionHttpException } from '../../../../exceptions/FoodceptionHttpException';

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
                throw new Error('Invalid state parameter. Authentication failed.');
            }

            if (!code) {
                throw new Error('No authorization code present in the callback URL.');
            }

            await loginWithGoogle(code);
            sessionStorage.removeItem('googleOAuthState');
            navigate('/?logged_in=true');
        } catch (err) {
            let errorMessage = "";
            if (err instanceof FoodceptionHttpException) {
                errorMessage = "Failed to verify Google login. Status code: " + err.statusCode;
            }
            else {
                errorMessage = 'Unknown error. Failed to verify Google login';
            }
            setError(errorMessage);
            setTimeout(() => navigate(`/user/login?error=${errorMessage}`), 3000);
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
