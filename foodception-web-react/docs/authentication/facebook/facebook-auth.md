# Facebook Authentication Integration

This guide explains how to integrate Facebook authentication into the Foodception web application.

## Prerequisites

1. Facebook Developer Account
2. Facebook App created in the [Facebook Developers Console](https://developers.facebook.com/)
3. App ID and App Secret from your Facebook App

## Setup

### 1. Install Dependencies

```bash
npm install @react-oauth/facebook
```

### 2. Configure Environment Variables

Create or update your `.env` file:

```env
REACT_APP_FACEBOOK_APP_ID=your_app_id_here
```

### 3. Initialize Facebook SDK

Add this to your `public/index.html`:

```html
<script>
  window.fbAsyncInit = function() {
    FB.init({
      appId: '%REACT_APP_FACEBOOK_APP_ID%',
      cookie: true,
      xfbml: true,
      version: 'v18.0'
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
</script>
```

## Implementation

### 1. Create Facebook Login Button Component

```typescript
import { FacebookLoginButton } from 'react-social-login-buttons';
import { AuthenticationUtils } from '../utils/AuthenticationUtils';

interface FacebookLoginProps {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export const FacebookLogin: React.FC<FacebookLoginProps> = ({ onSuccess, onError }) => {
  const handleFacebookLogin = async () => {
    try {
      const response = await new Promise((resolve, reject) => {
        window.FB.login((response) => {
          if (response.authResponse) {
            resolve(response.authResponse);
          } else {
            reject('User cancelled login or did not fully authorize.');
          }
        }, { scope: 'email,public_profile' });
      });

      await AuthenticationUtils.handleFacebookLogin(response);
      onSuccess?.();
    } catch (error) {
      console.error('Facebook login error:', error);
      onError?.(error);
    }
  };

  return (
    <FacebookLoginButton onClick={handleFacebookLogin} />
  );
};
```

### 2. Update Auth Provider

Add Facebook authentication methods to your auth context:

```typescript
interface AuthContextType {
  // ... existing types
  facebookLogin: () => Promise<void>;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // ... existing provider code

  const facebookLogin = async () => {
    setLoading(true);
    try {
      const fbResponse = await new Promise((resolve, reject) => {
        window.FB.login((response) => {
          if (response.authResponse) {
            resolve(response.authResponse);
          } else {
            reject('Facebook login failed');
          }
        });
      });
      
      await refreshUser();
    } catch (error) {
      console.error('Facebook login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    // ... existing values
    facebookLogin,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
```

### 3. Usage in Login Form

```typescript
const LoginForm: React.FC = () => {
  const { facebookLogin } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const handleFacebookLogin = async () => {
    try {
      await facebookLogin();
      // Redirect or update UI on success
    } catch (err) {
      setError('Facebook login failed. Please try again.');
    }
  };

  return (
    <div>
      {/* ... other login form elements */}
      <FacebookLogin 
        onSuccess={handleFacebookLogin}
        onError={(err) => setError(err.message)}
      />
    </div>
  );
};
```

## Security Considerations

1. **Token Validation**: Always validate Facebook tokens on your backend
2. **Scope Limitation**: Only request necessary permissions
3. **Error Handling**: Implement proper error handling for all Facebook SDK calls
4. **HTTPS**: Ensure your application uses HTTPS in production
5. **Session Management**: Implement proper session handling after successful login

## Useful Links

- [Facebook Login Documentation](https://developers.facebook.com/docs/facebook-login)
- [Facebook Graph API Documentation](https://developers.facebook.com/docs/graph-api)
- [Facebook JavaScript SDK Reference](https://developers.facebook.com/docs/javascript)

## Troubleshooting

### Common Issues

1. **Login Popup Blocked**
   - Ensure login is triggered by user interaction
   - Check browser popup settings

2. **SDK Loading Issues**
   - Verify correct App ID
   - Check SDK initialization in console
   - Ensure SDK is loaded before usage

3. **Permission Issues**
   - Verify app review status for requested permissions
   - Check app settings in Facebook Developer Console

4. **Token Expiration**
   - Implement token refresh logic
   - Handle expired token errors gracefully