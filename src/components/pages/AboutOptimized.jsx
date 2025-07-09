import React, { useEffect, useState, Suspense, lazy } from 'react';
import './About.css';

// Lazy load ThreeJS animation only when needed
const ThreeJSAnimation = lazy(() => import('../ThreeJSAnimation'));

export default function About() {
  const [isLoading, setIsLoading] = useState(true);
  const [show3D, setShow3D] = useState(false);

  useEffect(() => {
    // Delay 3D animation load to allow page to render first
    const timer = setTimeout(() => {
      setIsLoading(false);
      setShow3D(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="about-container">
      {/* Loading State */}
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-content">
            <div className="loading-spinner">
              <div className="spinner-ring"></div>
              <div className="spinner-ring"></div>
              <div className="spinner-ring"></div>
            </div>
            <h2 className="loading-text">Loading Experience...</h2>
            <p className="loading-subtitle">Preparing interactive content</p>
          </div>
        </div>
      )}
      
      {/* Three.js Canvas - Only load when ready */}
      {show3D && (
        <Suspense fallback={<div className="three-canvas-placeholder" />}>
          <div className="three-canvas">
            <ThreeJSAnimation />
          </div>
        </Suspense>
      )}
      
      {/* Content */}
      <div className={`about-content ${isLoading ? 'hidden' : 'visible'}`}>
        <div className="about-hero">
          <h1 className="about-title">About Me</h1>
          <p className="about-subtitle">Passionate Developer & Creative Technologist</p>
        </div>
        
        <div className="about-grid">
          <div className="about-card">
            <h3>🚀 Background</h3>
            <p>
              I'm a passionate developer based in Seattle, WA, with expertise in modern web technologies 
              and a love for creating immersive digital experiences. I specialize in React, Three.js, 
              and cutting-edge UI/UX design.
            </p>
          </div>
          
          <div className="about-card">
            <h3>💡 Skills</h3>
            <div className="skills-list">
              <span className="skill-tag">React</span>
              <span className="skill-tag">Three.js</span>
              <span className="skill-tag">JavaScript</span>
              <span className="skill-tag">CSS3</span>
              <span className="skill-tag">WebGL</span>
              <span className="skill-tag">Node.js</span>
            </div>
          </div>
          
          <div className="about-card">
            <h3>🎯 Philosophy</h3>
            <p>
              I believe in creating beautiful, functional, and accessible web experiences that push 
              the boundaries of what's possible in the browser. Every project is an opportunity 
              to learn something new and create something amazing.
            </p>
          </div>
          
          <div className="about-card">
            <h3>🌟 Interests</h3>
            <p>
              When I'm not coding, you'll find me exploring the latest in 3D graphics, experimenting 
              with new design trends, or enjoying the beautiful Pacific Northwest outdoors.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
