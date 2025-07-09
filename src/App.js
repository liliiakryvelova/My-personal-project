import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './critical.css'; // Critical CSS first
import './App.css';

// Lazy load all page components for better performance
const Home = lazy(() => import('./components/pages/Home'));
const About = lazy(() => 
  import('./components/pages/About').then(module => ({
    default: module.default
  }))
);
const Services = lazy(() => import('./components/pages/Services'));
const Contact = lazy(() => import('./components/pages/Contact'));

// Enhanced loading component with skeleton
const PageLoader = () => (
  <div className="page-loader" role="status" aria-label="Loading page content">
    <div className="loader-spinner" aria-hidden="true"></div>
    <p>Loading...</p>
  </div>
);

function App() {
  return (
    <div className="page-container">
      <Navbar />
      <main className="content-wrap">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/about" element={<About />} />
            <Route path="/home" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;
