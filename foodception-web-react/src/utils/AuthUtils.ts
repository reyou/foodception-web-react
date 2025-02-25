import { FrontEndUtils } from "./FrontEndUtils";
import EventBus from "./EventBus";
import { EventTypes } from "./EventTypes";

interface JwtPayload {
  exp?: number;
  iat?: number;
  [key: string]: any;
}

export default class AuthUtils {
  static authToken: string | null = AuthUtils.getAuthTokenFromLocalStorage();
  private static authStateInterval: number | null = null;

  static authMessageListener(event: MessageEvent) {
    // Validate origin
    const allowedOrigin = process.env.REACT_APP_WEB_URL;
    if (event.origin !== allowedOrigin) {
      return;
    }

    const { type, action, payload } = event.data;

    // Process only auth-related messages
    if (type === 'auth') {
      if (action === 'setAuthToken') {
        if (payload.authToken) {
          localStorage.setItem('authToken', payload.authToken);
        }
        else {
          localStorage.removeItem('authToken');
        }
      }
    } 
    else if(type === EventTypes.LOGIN_ERROR) {
      EventBus.publish(EventTypes.LOGIN_ERROR, event.data);
    }
    else if(type === EventTypes.SIGNUP_SUCCESS) {
      EventBus.publish(EventTypes.SIGNUP_SUCCESS, event.data);
    }
    else if(type === EventTypes.SIGNUP_ERROR) {
      EventBus.publish(EventTypes.SIGNUP_ERROR, event.data);
    }
    else if(type === EventTypes.FORGOT_PASSWORD_SUCCESS) {
      EventBus.publish(EventTypes.FORGOT_PASSWORD_SUCCESS, event.data);
    }
    else if(type === EventTypes.FORGOT_PASSWORD_ERROR) {
      EventBus.publish(EventTypes.FORGOT_PASSWORD_ERROR, event.data);
    }
    else {
      console.warn('Foodception: Ignoring non-auth message:', event.data);
    }
  }

  static addAuthListener() {
    window.addEventListener('message', AuthUtils.authMessageListener);
  }

  static removeAuthListener() {
    window.removeEventListener('message', AuthUtils.authMessageListener);
  }

  static getAuthTokenFromLocalStorage() {
    return localStorage.getItem('authToken');
  }

  static parseJwt(token: string): JwtPayload | null {
    if (!token) return null;
    
    try {
      const base64Url = token.split('.')[1];
      if (!base64Url) return null;
      
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.warn('Error parsing JWT:', e);
      return null;
    }
  }

  static willTokenExpireSoon(token: string, thresholdMinutes: number = 5): boolean {
    try {
      const decoded = AuthUtils.parseJwt(token);
      if (!decoded?.exp) {
        return true; // If we can't decode the token or find expiration, assume it needs refresh
      }

      const expirationTime = decoded.exp * 1000; // Convert to milliseconds
      const currentTimeUTC = new Date().getTime(); // This gives us UTC milliseconds
      const timeUntilExpiration = expirationTime - currentTimeUTC;
      const thresholdMs = thresholdMinutes * 60 * 1000;

      return timeUntilExpiration <= thresholdMs;
    } catch (e) {
      console.warn('Error checking token expiration:', e);
      return true; // If there's any error, assume we need a new token
    }
  }

  static getAuthToken() {
    // Get the auth token from local storage 
    const authToken = AuthUtils.getAuthTokenFromLocalStorage();
    
    if (!authToken || AuthUtils.willTokenExpireSoon(authToken)) {
      window.parent.postMessage(
        {
          type: 'auth',
          action: 'getAuthToken',
        },
        process.env.REACT_APP_WEB_URL || ''
      );
    }
  }

  static runAuthStateListener() {
    if (FrontEndUtils.isInsideIframe()) {
      // Clear any existing interval first
      if (AuthUtils.authStateInterval) {
        window.clearInterval(AuthUtils.authStateInterval);
      }

      AuthUtils.authStateInterval = window.setInterval(() => {
        AuthUtils.getAuthToken();
        let authToken = AuthUtils.getAuthTokenFromLocalStorage();
        if (!AuthUtils.authToken && authToken) {
          FrontEndUtils.reloadPage();
        }
        else if (AuthUtils.authToken && !authToken) {
          FrontEndUtils.reloadPage();
        }
      }, 1000);
    }
  }

  static removeAuthStateListener() {
    if (AuthUtils.authStateInterval) {
      window.clearInterval(AuthUtils.authStateInterval);
      AuthUtils.authStateInterval = null;
    }
  }
}
