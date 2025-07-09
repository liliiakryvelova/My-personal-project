import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { reportWebVitals } from './hooks/usePerformance';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Get the basename from the homepage in package.json
const basename = process.env.NODE_ENV === 'production' 
  ? '/My-personal-project' 
  : '/My-personal-project'; // Keep consistent for development

root.render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Performance monitoring
reportWebVitals((metric) => {
  if (process.env.NODE_ENV === 'production') {
    // Log performance metrics in production
    console.log(metric);
  }
});

// Register service worker for caching
if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
  window.addEventListener('load', () => {
    const swUrl = process.env.NODE_ENV === 'production' 
      ? '/My-personal-project/sw.js'
      : '/sw.js';
      
    navigator.serviceWorker.register(swUrl)
      .then((registration) => {
        console.log('SW registered: ', registration);
        
        // Check for updates periodically
        setInterval(() => {
          registration.update();
        }, 60000); // Check every minute
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}


