import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Body from './components/Body';

function App() {


  return (
    <>
      <div className="page-container">
        <Header />
        <Body />
        <Footer />
    </div>

    </>   
  );
}

export default App;
