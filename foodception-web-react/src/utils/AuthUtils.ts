import { FrontEndUtils } from "./FrontEndUtils";
import EventBus from "./EventBus";
import { EventTypes } from "./EventTypes";

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

  static getAuthToken() {
    // Post a properly structured message to the parent window
    window.parent.postMessage(
      {
        type: 'auth',
        action: 'getAuthToken',
      },
      process.env.REACT_APP_WEB_URL || ''
    );
  }
}
