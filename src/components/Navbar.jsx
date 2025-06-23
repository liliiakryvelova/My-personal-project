import React from 'react'
import { Link, NavLink } from 'react-router-dom'; 
import "./Navbar.css"; 

export default function Navbar() {
  return (
    <nav>
        <Link to="/" >Website</Link>
        <div className='menu'>
            <span>

            </span>
            <span>

            </span>
            <span>

            </span>
        </div>
        <ul>
            <li>
                <NavLink to="/about">About</NavLink>
            </li>
            <li>
                <NavLink to="/services">Services</NavLink>
            </li>
            <li>
                <NavLink to="/contact">Contact</NavLink>
            </li>
        </ul>
    </nav>
  )
}
