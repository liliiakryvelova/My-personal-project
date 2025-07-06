import React, { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'; 
import "./Navbar.css"; 
import LightModeIcon from '@mui/icons-material/LightMode';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import ContactMailIcon from '@mui/icons-material/ContactMail';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleToggleMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      document.body.classList.toggle('dark-mode', newMode);
      return newMode;
    });
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${darkMode ? 'dark' : 'light'}`}>
      <div className="nav-container">
        <Link
          to="/"
          className="nav-logo"
          onClick={closeMenu}
        >
          <HomeIcon className="logo-icon" />
          <span className="logo-text">My Portfolio</span>
        </Link>

        <div className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(prev => !prev)}>
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </div>

        <ul className={`nav-menu ${menuOpen ? "active" : ""}`}>
          <li className="nav-item">
            <NavLink 
              to="/about" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={closeMenu}
            >
              <PersonIcon className="nav-icon" />
              <span>About</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="/services" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={closeMenu}
            >
              <BusinessIcon className="nav-icon" />
              <span>Services</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink 
              to="/contact" 
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={closeMenu}
            >
              <ContactMailIcon className="nav-icon" />
              <span>Contact</span>
            </NavLink>
          </li>
          <li className="nav-item theme-toggle">
            <button 
              className="theme-btn" 
              onClick={handleToggleMode}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? 
                <LightModeIcon className="theme-icon" /> : 
                <ModeNightIcon className="theme-icon" />
              }
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
