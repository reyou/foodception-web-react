import React from 'react';
import AuthenticatedView from '../components/AuthenticatedView';
import RedirectingToGoogle from './RedirectingToGoogle.page';
import VerifyGoogleLogin from './VerifyGoogleLogin.page';
import { Container } from 'react-bootstrap';


const LoginGooglePage: React.FC = () => {
  return (
    <Container className="py-5" fluid>
      <AuthenticatedView
        authenticatedView={<VerifyGoogleLogin />}
        unauthenticatedView={<RedirectingToGoogle />}
      ></AuthenticatedView>
    </Container>
  );
};

export default LoginGooglePage;
