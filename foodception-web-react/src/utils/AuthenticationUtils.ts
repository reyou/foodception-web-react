import { FrontEndUtils } from './FrontEndUtils';
import ParentWindowUtils from './ParentWindowUtils';
import { ErrorDetails, ErrorType } from '../types/error.types';
import HttpProvider from '../providers/HttpProvider';

export class AuthenticationUtils {

  static async isAuthenticated(): Promise<boolean> {
    try {
      await HttpProvider.get('/authentication/authenticated');
      return true;
    } catch (error) {
      return false;
    }
  }

  static async getUser(): Promise<any> {
    try {
      return await HttpProvider.get('/authentication/user');
    } catch (error) {
      return null;
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
}
