import React, { Component } from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';
import PortfolioList from './PortfolioList';
import PortfolioDetails from './PortfolioDetails';
import NotFound from '../../helpers/NotFound';
const api = require('../../helpers/api.js');

class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      projects: [],
      projectTags: {},
      navigationBack: false,
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
        let projects = res && res.data && res.data.projects ? res.data.projects : [];
        let projectTags = res && res.data && res.data.projectTags ? res.data.projectTags : {};
        this.setState(() => {
          return {
            loading: false,
            projects: projects,
            projectTags: projectTags
          };
        });
      });
  }

  render() {
    const loading = this.state.loading;
    const projects = this.state.projects;
    const projectTags = this.state.projectTags;

    return (
      !loading
        ?
        <Switch>
          <Route exact path = "/" render={(props) => <PortfolioList {...props} projects={projects} projectTags={projectTags} />} />
          <Route exact path="/:id" render={(props) => <PortfolioDetails {...props} projects={projects} />} />
          <Route path="*" status="404" component={NotFound} />
        </Switch>
        : <h2>Loading...</h2>
    );
  }
}

export default Portfolio;
