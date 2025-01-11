import { FrontEndUtils } from './FrontEndUtils';
import ParentWindowUtils from './ParentWindowUtils';
import { ErrorType } from '../types/error.types';
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

  static handleUnauthenticated() {
    if (FrontEndUtils.isInsideIframe()) {
      ParentWindowUtils.sendError({
        type: ErrorType.AUTH_ERROR,
        message: 'You need to log in to access this page.'
      });
    } else {
      // Redirect to login page with return URL
      const returnUrl = encodeURIComponent(window.location.pathname);
      window.location.href = `/login?returnUrl=${returnUrl}`;
    }
  }
}
