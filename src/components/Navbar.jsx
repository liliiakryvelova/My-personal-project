import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'; 
import "./Navbar.css"; 

export default function Navbar() {

    const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav>
        <Link to="/" className="title" end>
           My personal page.
        </Link>
        <div className='menu' 
            onClick={() => setMenuOpen(!menuOpen)}>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <ul className={ menuOpen ? "open" : "" }>
            <li>
                <NavLink to="/about" className="title">About</NavLink>
            </li>
            <li>
                <NavLink to="/services" className="title">Services</NavLink>
            </li>
            <li>
                <NavLink to="/contact" className="title">Contact</NavLink>
            </li>
        </ul>
    </nav>
  )
}
