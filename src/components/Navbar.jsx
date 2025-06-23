import React, { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'; 
import "./Navbar.css"; 
import LightModeIcon from '@mui/icons-material/LightMode';
import ModeNightIcon from '@mui/icons-material/ModeNight';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  const handleToggleMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      document.body.classList.toggle('dark-mode', newMode);
      return newMode;
    });
  };

  return (
    <nav>
      <Link
        to="/"
        className="title"
        end
      >
        My personal page.
      </Link>

      <div className='menu' onClick={() => setMenuOpen(prev => !prev)}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to="/about" className="title" onClick={() => setMenuOpen(false)}>About</NavLink>
        </li>
        <li>
          <NavLink to="/services" className="title" onClick={() => setMenuOpen(false)}>Services</NavLink>
        </li>
        <li>
          <NavLink to="/contact" className="title" onClick={() => setMenuOpen(false)}>Contact</NavLink>
        </li>
        <li
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', height: '100%' }}
          onClick={() => {
            handleToggleMode();
            setMenuOpen(false);
          }}
        >
          {darkMode ? <LightModeIcon style={{ color: '#FFD700' }} /> : <ModeNightIcon style={{ color: '#333' }} />}
        </li>
      </ul>
    </nav>
  );
}
