import React from 'react';

import './style/style.css'

import Header from './components/Header';
import Body from './components/BodyContent';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <Body />
      <Footer />
    </div>
  );
}

export default App;
