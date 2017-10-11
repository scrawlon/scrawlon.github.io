import React from 'react';
import Portfolio from './components/Portfolio';
import logo from './logo.svg';
import './App.css';

const App = () => (
  <div className="App">
    <Portfolio />
    <div className="App-footer">
      <a href="https://facebook.github.io/react/" title="React" target="_blank" rel="noopener noreferrer">
        <h3>Built with React</h3>
        <img src={logo} className="App-logo" alt="logo" />
      </a>
    </div>
  </div>
);

export default App;
