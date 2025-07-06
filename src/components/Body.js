import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Home, About, Services, Contact } from './pages'
import '../App.css'

export default function Body() {
  return (
    <div className="content-wrap">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  )
}
