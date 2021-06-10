import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'normalize.css';
import './styles/index.scss';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

// mkcert -cert-file ./.cert/cert.pem -key-file ./.cert/key.pem localhost
// HTTPS=true SSL_CRT_FILE=./.cert/cert.pem SSL_KEY_FILE=./.cert/key.pem npm run dev

declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext;
  }
}
