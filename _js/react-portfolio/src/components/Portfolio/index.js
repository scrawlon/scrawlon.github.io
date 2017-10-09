import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
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
            <Router>
              <div>
                <Route exact path = "/" render={()=> <PortfolioList projects={projects} />} />
                <Route path="/:id" component={Child}/>
              </div>
            </Router>
          </div>
        : <h2>Loading...</h2>
    );
  }
}

const Child = ({ match }) => (
  <div>
    <h3>ID: {match.params.id}</h3>
  </div>
)

export default Portfolio;
