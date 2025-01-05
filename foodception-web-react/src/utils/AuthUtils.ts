export default class AuthUtils {
  static authMessageListener(event: MessageEvent) {
    // Validate origin
    const allowedOrigin = process.env.REACT_APP_WEB_URL;
    if (event.origin !== allowedOrigin) {
      // console.warn('Unauthorized message origin:', event.origin);
      return;
    }

    const { type, payload } = event.data;

    // Process only auth-related messages
    if (type === 'auth') {
      console.log('Auth message received:', payload);
    } else {
      console.log('Ignoring non-auth message:', event.data);
    }
  }

  static addAuthListener() {
    window.addEventListener('message', AuthUtils.authMessageListener);
  }

  static removeAuthListener() {
    window.removeEventListener('message', AuthUtils.authMessageListener);
  }

  static getMember() {
    // Post a properly structured message to the parent window
    window.parent.postMessage(
      {
        type: 'auth',
        action: 'getMember'
      },
      '*'
    );
  }
}
