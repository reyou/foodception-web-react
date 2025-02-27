import React from 'react';
import './VerifyGoogleLogin.page.styles.css';

const VerifyGoogleLogin: React.FC = () => {
  // Mock data - would be replaced with actual user data in implementation
  const currentUser = {
    email: 'aytekoz@gmail.com',
    name: 'Aytek Oz'
  };

  return (
    <div className="vgl-container">
      <div className="verify-container">
        <div className="verify-content">
          <h3>Google Sign-In Confirmation</h3>

          <div className="current-user-info">
            <p>You're currently signed in as:</p>
            <div className="user-profile">
              <span className="user-name">{currentUser.name}</span>
              <span className="user-email">{currentUser.email}</span>
            </div>
          </div>

          <div className="confirmation-message">
            <p>You're about to sign in with a different Google account. What would you like to do?</p>
          </div>

          <div className="action-buttons">
            <button className="continue-button">Continue with this account</button>
            <button className="signout-button">Sign out and use another account</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyGoogleLogin;
