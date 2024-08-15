import { useEffect } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import './css/bootstrap-overrides.css';
import './App.css';
import WindowState from './utils/WindowState';

import FoodceptionRouter from './Router';

function App() {
  useEffect(() => {
    // Get iframeId from the query string
    const params = new URLSearchParams(window.location.search);
    const iframeId = params.get('iframeId') || 'N/A';
    // Send the message on mount
    WindowState.addResizeListener(iframeId);

    // Cleanup listener on unmount
    return () => {
      WindowState.removeResizeListener();
    };
  }, []);

  return <FoodceptionRouter />;
}

export default App;
