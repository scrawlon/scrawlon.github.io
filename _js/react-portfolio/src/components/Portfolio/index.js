import React, { Component } from 'react';
import PortfolioFilterBar from './PortfolioFilterBar';
import PortfolioList from './PortfolioList';
const api = require('../../helpers/api.js');

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

export default Portfolio;
