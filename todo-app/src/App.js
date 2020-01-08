import React from 'react'

import './App.sass'

import Header from './components/Header';
import Body from './components/BodyContent';
//import Footer from './components/Footer';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faEllipsisV, faSave, faTrash } from '@fortawesome/free-solid-svg-icons'

library.add(fab, faEllipsisV, faSave, faTrash)

function App() {
  return (
    <div className="App">
      <Header appname="TODOapp" />
      <Body />
    </div>
  );
  /*<Footer />*/
}

export default App;
