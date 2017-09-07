import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import PortfolioFilterBar from './components/PortfolioFilterBar';
import PortfolioList from './components/PortfolioList';
const api = require('./helpers/api.js');

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

    this.getPortfolioProjects = this.getPortfolioProjects.bind(this);
  }

  componentDidMount () {
    this.getPortfolioProjects();
  }

  getPortfolioProjects () {
    this.setState(() => {
      return { loading: true };
    });

    api.getPortfolioProjects()
      .then((res) => {
        let data = res && res.data ? res.data : [];
        this.setState(() => {
          return {
            loading: false,
            projects: data
          };
        });
        console.log('projects state', this.state.projects);
      });
  }

  render() {
    const loading = this.state.loading;
    const projects = this.state.projects;

    return (
      !loading
        ? <div>
            <PortfolioFilterBar projects={projects} />
            <PortfolioList projects={projects} />
          </div>
        : <h2>Loading...</h2>
    );
  }
}

export default App;
