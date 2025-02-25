import { useEffect, useState } from 'react';
import { AuthenticationUtils } from '../../../utils/AuthenticationUtils';
import { Container, Row, Col, Button } from 'react-bootstrap';
import SignupForm from './components/SignupForm';
import ParentWindowUtils from '../../../utils/ParentWindowUtils';
import { FrontEndUtils } from '../../../utils/FrontEndUtils';
import EventBus from '../../../utils/EventBus';
import { EventTypes } from '../../../utils/EventTypes';

const SignupPage: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            const authenticated = await AuthenticationUtils.isAuthenticated();
            setIsAuthenticated(authenticated);
        };

        checkAuth();

        // Subscribe to signup error events
        const unsubscribe = EventBus.subscribe(EventTypes.SIGNUP_ERROR, (data) => {
            setError(data.error.message);
        });

        // Cleanup subscription
        return () => {
            unsubscribe();
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
        await AuthenticationUtils.logout();
        setIsAuthenticated(false);
    };

    return isAuthenticated ? (
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
    ) : (
        <SignupForm
            email={email}
            password={password}
            confirmPassword={confirmPassword}
            onEmailChange={setEmail}
            onPasswordChange={setPassword}
            onConfirmPasswordChange={setConfirmPassword}
            onSubmit={handleSubmit}
            error={error}
        />
    );
};

export default SignupPage;