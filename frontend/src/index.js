// src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client'; // Import from react-dom/client for createRoot
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration'; // Import the service worker registration
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

// Find the root element in the DOM
const rootElement = document.getElementById('root');

// Create a root and render the app
const root = createRoot(rootElement);

const initialOptions = {
  "client-id": "YOUR_LIVE_CLIENT_ID", // Replace with your Live Client ID
  currency: "USD",
  components: "buttons, venmo", // Include 'venmo' in components
  // Any other necessary options
};

root.render(
  <React.StrictMode>
    <PayPalScriptProvider options={initialOptions}>
      <App />
    </PayPalScriptProvider>
  </React.StrictMode>
);

// Register the service worker
serviceWorkerRegistration.register();