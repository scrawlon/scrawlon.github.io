import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

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

class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      projects: []
    };
  }

  componentDidMount () {
    this.setState((prevState) => {
      return { loading: true };
    });

    axios.get('http://localhost:4000/portfolio-projects.json')
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const loading = this.state.loading;

    return (
      !loading
        ? <h2>Portfolio</h2>
        : <h2>Loading...</h2>
    );
  }
}

export default App;
