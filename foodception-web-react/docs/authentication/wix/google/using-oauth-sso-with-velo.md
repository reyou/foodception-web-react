# Using OAuth SSO with Velo in Foodception

## Overview

This guide explains how to implement OAuth-based Single Sign-On (SSO) in the Foodception Wix site using Velo. We'll focus on integrating with Google OAuth, which will allow users to sign in to our Wix site using their Google accounts.

## Prerequisites

- A Wix site with Velo enabled
- A Google OAuth client ID and client secret (see the [Google Authentication Guide](../google/google-auth.md))
- Basic understanding of OAuth 2.0 flow

## Implementation Steps

### 1. Set Up the OAuth Provider in Wix

1. In your Wix site dashboard, navigate to **Settings** > **OAuth Apps**
2. Click **Add OAuth App**
3. Select **Google** as the provider
4. Enter the following details:
   - **App Name**: Foodception Google Auth
   - **Client ID**: Your Google OAuth client ID
   - **Client Secret**: Your Google OAuth client secret
   - **Redirect URL**: This should match the redirect URL configured in your Google OAuth settings
   - **Scope**: `email profile openid`
5. Click **Save**

### 2. Create a Login Button

Add a button to your site that will initiate the OAuth login process:

```html
<!-- In your Wix Editor, add a button element -->
<button id="googleLoginButton">Login with Google</button>
```

### 3. Add the OAuth Login Code

In your page's code (using Velo), add the following JavaScript:

```javascript
import wixUsers from 'wix-users';
import wixLocation from 'wix-location';
import wixWindow from 'wix-window';

$w.onReady(function () {
    // Get the login button
    $w('#googleLoginButton').onClick(() => {
        // Start the OAuth login process
        startGoogleLogin();
    });
    
    // Check if this is a redirect from OAuth provider
    checkForOAuthRedirect();
});

// Function to start the Google login process
function startGoogleLogin() {
    // Get the login URL from Wix OAuth
    wixUsers.oAuth.getAuthUrl('google')
        .then((authUrl) => {
            // Redirect the user to Google's login page
            wixLocation.to(authUrl);
        })
        .catch((error) => {
            console.error('Error getting auth URL:', error);
        });
}

// Function to check if this is a redirect from OAuth
function checkForOAuthRedirect() {
    // Get the current URL parameters
    const queryParams = wixWindow.getQueryParams();
    
    // Check if this is a redirect from OAuth
    if (queryParams.code && queryParams.state) {
        // Complete the OAuth process
        wixUsers.oAuth.completeLogin(queryParams.code, queryParams.state)
            .then((result) => {
                // User is now logged in
                console.log('User logged in successfully');
                
                // Redirect to the home page or dashboard
                wixLocation.to('/');
                
                // Alternatively, you can refresh the page to update the UI
                // wixLocation.to(wixLocation.url);
            })
            .catch((error) => {
                console.error('Error completing login:', error);
            });
    }
}
```

### 4. Handle the User Session

Once the user is logged in, you can access their information using the Wix Users API:

```javascript
import wixUsers from 'wix-users';

// Check if user is logged in
if (wixUsers.currentUser.loggedIn) {
    // Get the current user
    wixUsers.currentUser.getEmail()
        .then((email) => {
            console.log('User email:', email);
        });
        
    // Get the user's profile picture from Google
    wixUsers.currentUser.getPicture()
        .then((picture) => {
            // Update UI with user's profile picture
            $w('#profileImage').src = picture.url;
        });
}
```

### 5. Communicate with the React App

To communicate the authentication state to our embedded React application, we need to send a message to the iframe:

```javascript
import wixUsers from 'wix-users';
import wixWindow from 'wix-window';

// Function to send auth token to React app
function sendAuthTokenToReactApp() {
    // Check if user is logged in
    if (wixUsers.currentUser.loggedIn) {
        // Get the user's session token
        wixUsers.currentUser.getSessionToken()
            .then((sessionToken) => {
                // Get the iframe element
                const iframe = document.getElementById('foodception-app');
                
                // Get user information
                Promise.all([
                    wixUsers.currentUser.getEmail(),
                    wixUsers.currentUser.getNickname(),
                    wixUsers.currentUser.getPicture()
                ])
                .then(([email, nickname, picture]) => {
                    // Send the token and user info to the React app
                    iframe.contentWindow.postMessage({
                        type: 'auth',
                        action: 'googleAuth',
                        payload: {
                            authToken: sessionToken,
                            userProfile: {
                                id: wixUsers.currentUser.id,
                                email: email,
                                name: nickname,
                                picture: picture ? picture.url : null
                            }
                        }
                    }, 'https://web.foodception.com');
                });
            });
    } else {
        // If user is not logged in, send a message to clear the token
        const iframe = document.getElementById('foodception-app');
        iframe.contentWindow.postMessage({
            type: 'auth',
            action: 'setAuthToken',
            payload: {
                authToken: null
            }
        }, 'https://web.foodception.com');
    }
}

// Call this function when the page loads and when the user's auth state changes
$w.onReady(function () {
    // Send auth token when page loads
    sendAuthTokenToReactApp();
    
    // Set up a listener for auth state changes
    wixUsers.onLogin((user) => {
        sendAuthTokenToReactApp();
    });
    
    wixUsers.onLogout(() => {
        sendAuthTokenToReactApp();
    });
});
```

### 6. Handle Authentication Requests from React App

Set up a listener to handle authentication requests from the React app:

```javascript
import wixWindow from 'wix-window';
import wixUsers from 'wix-users';

// Set up message listener
window.addEventListener('message', (event) => {
    // Validate origin
    if (event.origin !== 'https://web.foodception.com') {
        return;
    }
    
    const { type, action, source } = event.data;
    
    if (type === 'auth') {
        if (action === 'initiateGoogleAuth' && source === 'react-app') {
            // Start the Google OAuth flow
            startGoogleLogin();
        } else if (action === 'getAuthToken') {
            // Send the current auth token to the React app
            sendAuthTokenToReactApp();
        } else if (action === 'logout') {
            // Log the user out
            wixUsers.logout()
                .then(() => {
                    // Send updated auth state to React app
                    sendAuthTokenToReactApp();
                });
        }
    }
});
```

## Security Considerations

1. **Token Validation**:
   - The Wix platform handles token validation for you
   - Always use the built-in Wix Users API to verify authentication

2. **Origin Validation**:
   - Always validate message origins when using postMessage
   - Only accept messages from trusted domains

3. **Scope Limitations**:
   - Request only the minimum required scopes
   - Clearly document what user data is being accessed

## Troubleshooting

### Common Issues

1. **"Origin not allowed" errors**:
   - Verify that all domains are properly configured in Google Console
   - Check that the message origin validation is using the correct URL

2. **Authentication flow interruption**:
   - Ensure the postMessage events are being properly sent and received
   - Check browser console for any errors in the communication

3. **User not recognized after authentication**:
   - Verify that the Wix Users API is being used correctly
   - Check that the user account is properly associated in your Wix database

## References

- [Wix OAuth SSO Documentation](https://dev.wix.com/docs/develop-websites/articles/code-tutorials/wix-editor-elements/using-oauth-sso-with-velo)
- [Wix Users API](https://www.wix.com/velo/reference/wix-users)
- [Window.postMessage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage)
- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)