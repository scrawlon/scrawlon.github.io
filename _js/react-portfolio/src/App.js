import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Portfolio from './components/Portfolio';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Portfolio />
        <div className="App-header">
          <a href="https://facebook.github.io/react/" title="React" target="_blank" rel="noopener noreferrer">
            <h2>Built with React</h2>
            <img src={logo} className="App-logo" alt="logo" />
          </a>
        </div>
      </div>
    );
  }
}

export default App;
