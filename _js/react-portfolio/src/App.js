import React from 'react';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import ScrollMemory from 'react-router-scroll-memory';
import Portfolio from './components/Portfolio';
import './App.css';

const App = () => (
  <div className="App">
    <Router basename="/portfolio">
      <div>
        <ScrollMemory />
        <Portfolio />
      </div>
    </Router>
  </div>
);

export default App;
