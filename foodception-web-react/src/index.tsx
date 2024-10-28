import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as Sentry from '@sentry/react';
import ErrorFallback from './components/error_fallback';

const sampleRate = parseFloat(
  process.env.REACT_APP_SENTRY_SAMPLE_RATE || '1.0'
);

Sentry.init({
  dsn: 'https://6f5839dffcc350026aac4fa3d885f8f1@o122230.ingest.us.sentry.io/4507864032346112',
  integrations: [Sentry.replayIntegration()],
  tracesSampleRate: sampleRate,
  replaysSessionSampleRate: sampleRate,
  replaysOnErrorSampleRate: 1.0
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Sentry.ErrorBoundary fallback={<ErrorFallback />}>
      <App />
    </Sentry.ErrorBoundary>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
