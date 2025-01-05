export default class AuthUtils {
  static authMessageListener(event: MessageEvent) {
    // Validate origin
    if (event.origin !== 'https://www.foodception.com') {
      console.warn('Unauthorized message origin:', event.origin);
      return;
    }

    const { type, payload } = event.data;

    // Process only auth-related messages
    if (type === 'auth') {
      if (
        typeof payload === 'object' &&
        typeof payload.isLoggedIn === 'boolean' &&
        typeof payload.userId === 'string' &&
        typeof payload.token === 'string'
      ) {
        console.log('Auth message received:', payload);
        localStorage.setItem('authState', JSON.stringify(payload));
      } else {
        console.warn('Invalid auth message payload:', payload);
      }
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
}
