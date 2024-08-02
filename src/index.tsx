import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import 'normalize.css';
import 'animate.css';
import './styles/index.scss';
import 'react-notifications-component/dist/theme.css';

const APP_ROOT = document.getElementById('root');

if (APP_ROOT) {
  createRoot(APP_ROOT).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext;
  }
}
