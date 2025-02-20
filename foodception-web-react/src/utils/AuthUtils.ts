export default class AuthUtils {
  static authToken: string | null = null;
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
        localStorage.setItem('authToken', payload.authToken);
      }
    } else {
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

  static authStateListener() {
    setInterval(() => {
      AuthUtils.getAuthToken();
      const authToken = AuthUtils.getAuthTokenFromLocalStorage();
      // check if this value changed, if so then reload the page
      if (authToken !== AuthUtils.authToken) {
        AuthUtils.authToken = authToken;
        console.log('Auth token changed reloading page', authToken);
        window.location.reload();
      }
    }, 1000);
  }

  static getAuthToken() {
    // Post a properly structured message to the parent window
    window.parent.postMessage(
      {
        type: 'auth',
        action: 'getAuthToken'
      },
      '*'
    );
  }
}
