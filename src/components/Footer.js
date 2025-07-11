import React, { useState, useEffect } from 'react';
import './Footer.css';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import TwitterIcon from '@mui/icons-material/Twitter';
import FavoriteIcon from '@mui/icons-material/Favorite';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import useVisitorCounter from '../hooks/useVisitorCounter';
import VisitorStats from './VisitorStats';

function Footer() {
  const [darkMode, setDarkMode] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const { visitorCount, currentVisitor, visitorStats, loading } = useVisitorCounter();

  // Check if dark mode is active
  useEffect(() => {
    const isDark = document.body.classList.contains('dark-mode');
    setDarkMode(isDark);

    // Listen for dark mode changes
    const observer = new MutationObserver(() => {
      const isDark = document.body.classList.contains('dark-mode');
      setDarkMode(isDark);
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className={`footer ${darkMode ? 'dark' : 'light'}`}>
      <div className="footer-container">
        {/* Scroll to top button */}
        <button className="scroll-to-top" onClick={scrollToTop} aria-label="Scroll to top">
          <KeyboardArrowUpIcon />
        </button>

        {/* Main footer content */}
        <div className="footer-content">
          {/* Brand section */}
          <div className="footer-brand">
            <h3 className="footer-logo">Liliia Kryvelova</h3>
            <p className="footer-tagline">Creating beautiful digital experiences</p>
          </div>

          {/* Quick links */}
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/about">About</a></li>
              <li><a href="/services">Services</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>

          {/* Social media */}
          <div className="footer-social">
            <h4>Connect</h4>
            <div className="social-links">
              <a href="https://linkedin.com/in/liliia-kryvelova" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <LinkedInIcon />
              </a>
              <a href="https://github.com/liliiakryvelova" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <GitHubIcon />
              </a>
              <a href="mailto:your.email@example.com" aria-label="Email">
                <EmailIcon />
              </a>
              <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <TwitterIcon />
              </a>
            </div>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="footer-bottom">
          <div className="footer-divider"></div>
          <div className="footer-info">
            <p className="copyright">
              © {currentYear} Liliia Kryvelova. Made with <FavoriteIcon className="heart-icon" /> in React
            </p>
            <div className="visitor-info">
              <button 
                className="visitor-counter clickable"
                onClick={() => setShowStats(true)}
                title="Click to view detailed visitor statistics"
              >
                <VisibilityIcon className="visitor-icon" />
                Visitors: {loading ? '...' : visitorCount.toLocaleString()}
              </button>
              {currentVisitor && currentVisitor.city && currentVisitor.country && (
                <p className="visitor-location">
                  <LocationOnIcon className="location-icon" />
                  Latest: {currentVisitor.city}, {currentVisitor.country}
                </p>
              )}
            </div>
          </div>
          <p className="footer-note">All rights reserved.</p>
        </div>
      </div>
      
      {/* Visitor Stats Modal */}
      <VisitorStats 
        visitorStats={visitorStats}
        isOpen={showStats}
        onClose={() => setShowStats(false)}
      />
    </footer>
  );
}

export default Footer;
