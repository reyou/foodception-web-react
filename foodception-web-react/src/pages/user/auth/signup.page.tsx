import { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import SignupForm from './components/SignupForm';
import ParentWindowUtils from '../../../utils/ParentWindowUtils';
import { FrontEndUtils } from '../../../utils/FrontEndUtils';
import EventBus from '../../../utils/EventBus';
import { EventTypes } from '../../../utils/EventTypes';
import { useAuth } from '../../../contexts/AuthContext';
import AuthenticatedView from './components/AuthenticatedView';

const SignupPage: React.FC = () => {
    const { logout } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    useEffect(() => {
        // SIGNUP_SUCCESS
        const unsubscribeSuccess = EventBus.subscribe(EventTypes.SIGNUP_SUCCESS, (data) => {
            setSuccess(`Account created successfully for ${data.member.loginEmail}`);
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        });

        // SIGNUP_ERROR
        const unsubscribeError = EventBus.subscribe(EventTypes.SIGNUP_ERROR, (data) => {
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

        // Validate passwords match
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (FrontEndUtils.isInsideIframe()) {
            ParentWindowUtils.sendSignupData({ email, password });
        } else {
            console.log('email', email);
            console.log('password', password);
            console.log("Call API and register user. Use Wix API");
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
        } catch (err) {
            console.error('Logout error:', err);
        }
    };

    const authenticatedView = (
        <Container>
            <Row>
                <Col>
                    <h2>You are already logged in</h2>
                    <Button variant="outline-dark" onClick={handleLogout}>
                        Logout
                    </Button>
                </Col>
            </Row>
        </Container>
    );

    const unauthenticatedView = (
        <SignupForm
            email={email}
            password={password}
            confirmPassword={confirmPassword}
            onEmailChange={setEmail}
            onPasswordChange={setPassword}
            onConfirmPasswordChange={setConfirmPassword}
            onSubmit={handleSubmit}
            error={error}
            success={success}
        />
    );

    return (
        <AuthenticatedView
            authenticatedView={authenticatedView}
            unauthenticatedView={unauthenticatedView}
        />
    );
};

export default SignupPage;