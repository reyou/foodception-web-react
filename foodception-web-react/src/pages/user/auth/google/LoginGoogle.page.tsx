import React, { useEffect } from 'react';
import AuthenticatedView from '../components/AuthenticatedView';
import RedirectingToGoogle from './RedirectingToGoogle.page';
import VerifyGoogleLogin from './VerifyGoogleLogin.page';
import { GoogleAuthUtils } from '../../../../utils/GoogleAuthUtils';
import { FrontEndUtils } from '../../../../utils/FrontEndUtils';
import { Container } from 'react-bootstrap';

const LoginGooglePage: React.FC = () => {
  // after 3 seconds redirect user to google auth page
  useEffect(() => {
    const timer = setTimeout(() => {
      const authUrl = GoogleAuthUtils.getAuthUrl();
      FrontEndUtils.redirect(authUrl);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

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
