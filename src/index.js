import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';


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


