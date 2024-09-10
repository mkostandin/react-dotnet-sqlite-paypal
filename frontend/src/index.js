import React from 'react';
import { createRoot } from 'react-dom/client'; // Import from react-dom/client for createRoot
import './index.css';
import App from './App';

// Find the root element in the DOM
const rootElement = document.getElementById('root');

// Create a root and render the app
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);