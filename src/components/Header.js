import React from 'react'
import './Navbar.css'; // Assuming you have a CSS file for styling
import Navbar from './Navbar';
import { Route, Routes } from 'react-router-dom';
import { About, Contact, Home, Services } from './pages/index.js'; 

export default function Header() {
  return (
    <div>
       <Navbar />
       <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        {/* Add more routes as needed */}
      </Routes>
    </div>
  )
}
