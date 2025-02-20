import { useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import './css/bootstrapOverrides.css';
import './App.css';
import WindowState from './utils/WindowState';

import FoodceptionRouter from './Router';
import AuthUtils from './utils/AuthUtils';

function App() {
  useEffect(() => {
    // Get iframeId from the query string
    const params = new URLSearchParams(window.location.search);
    const iframeId = params.get('iframeId') || 'N/A';
    // Send the message on mount
    WindowState.addResizeListener(iframeId);
    AuthUtils.addAuthListener();
    // TODO: clean up auth state listener on unmount
    AuthUtils.runAuthStateListener();
    // Cleanup listener on unmount
    return () => {
      WindowState.removeResizeListener();
      AuthUtils.removeAuthListener();
    };
  }, []);

  return <FoodceptionRouter />;
}

export default App;
