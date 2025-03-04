import { FrontEndUtils } from './FrontEndUtils';
import ParentWindowUtils from './ParentWindowUtils';
import { ErrorDetails, ErrorType } from '../types/error.types';
import HttpProvider from '../providers/HttpProvider';
import { GoogleLoginResponse, User } from '../types/auth.types';

export class AuthenticationUtils {

  static async isAuthenticated(): Promise<boolean> {
    try {
      await HttpProvider.get('/authentication/authenticated');
      return true;
    } catch (error) {
      return false;
    }
  }

  static async getUser(): Promise<User | null> {
    try {
      const userResponse = await HttpProvider.get('/authentication/user');
      return userResponse.user;
    } catch (error) {
      return null;
    }
  }

  static async login(email: string, password: string) {
    try {
      await HttpProvider.post('/authentication/login', { email, password });
    } catch (error) {
      throw error;
    }
  }

  static async loginWithGoogle(code: string): Promise<GoogleLoginResponse> {
    try {
      const response = await HttpProvider.post('/authentication/login/google', { code });
      return response as GoogleLoginResponse;
    } catch (error) {
      throw error;
    }
  }

  static handleUnauthenticated() {
    if (FrontEndUtils.isInsideIframe()) {
      ParentWindowUtils.sendError({
        type: ErrorType.AUTH_ERROR,
        message: 'You need to log in to access this page.'
      } as ErrorDetails);
    } else {
      // Redirect to login page with return URL
      const returnUrl = encodeURIComponent(window.location.pathname);
      window.location.href = `/user/login?returnUrl=${returnUrl}`;
    }
  }

  static logout() {
    localStorage.removeItem('authToken');
  }

  static setAuthToken(authToken: string) {
    localStorage.setItem('authToken', authToken);
  }
}
