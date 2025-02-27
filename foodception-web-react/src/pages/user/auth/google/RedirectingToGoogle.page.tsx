import React from 'react';
import './RedirectingToGoogle.page.styles.css';

const RedirectingToGoogle: React.FC = () => {
  return (
    <div className="redirect-container">
      <div className="redirect-content">
        <h3>Redirecting to Google</h3>
        <p>Please wait while we redirect you to Google to complete the sign-in process. You will be redirected
          automatically in a few seconds.</p>

        <div className="google-logo">
          <span className="g-blue">G</span>
          <span className="g-red">o</span>
          <span className="g-yellow">o</span>
          <span className="g-blue">g</span>
          <span className="g-green">l</span>
          <span className="g-red">e</span>
        </div>

        <div className="loader"></div>
      </div>
    </div>
  );
};

export default RedirectingToGoogle;
