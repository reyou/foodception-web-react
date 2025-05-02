import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as Sentry from '@sentry/react';
import ErrorFallback from './components/error_fallback';
const isSentryEnabled = process.env.REACT_APP_SENTRY_ENABLED === 'true';
const sentryDsn = process.env.REACT_APP_SENTRY_DSN;

const sampleRate = parseFloat(
  process.env.REACT_APP_SENTRY_SAMPLE_RATE || '1.0'
);

if (isSentryEnabled && sentryDsn) {
  Sentry.init({
    dsn: sentryDsn,
    integrations: [Sentry.replayIntegration()],
    tracesSampleRate: sampleRate,
    replaysSessionSampleRate: sampleRate,
    replaysOnErrorSampleRate: 1.0
  });
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const appContent = isSentryEnabled ? (
  <Sentry.ErrorBoundary fallback={<ErrorFallback />}>
    <App />
  </Sentry.ErrorBoundary>
) : (
  <App />
);

const enableStrictMode = true;

root.render(
  enableStrictMode ? (
    <React.StrictMode>
      {appContent}
    </React.StrictMode>
  ) : (
    appContent
  )
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
