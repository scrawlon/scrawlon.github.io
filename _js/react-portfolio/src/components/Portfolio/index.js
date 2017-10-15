import React, { Component } from 'react';
import {
  Route,
} from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import PortfolioList from './PortfolioList';
import PortfolioDetails from './PortfolioDetails';
import animations from '../../helpers/animations.js';
const api = require('../../helpers/api.js');

class Portfolio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      projects: [],
      navigationBack: false
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
        /*console.log('projects state', this.state.projects);*/
      });
  }

  render() {
    const loading = this.state.loading;
    const projects = this.state.projects;

    return (
      !loading
        ?
        <AnimatedSwitch
          className="switch-wrapper"
          atEnter={animations.bounceTransition.atEnter}
          atLeave={animations.bounceTransition.atLeave}
          atActive={animations.bounceTransition.atActive}
          mapStyles={animations.transitionFunctions.mapStyles}
        >
          <Route exact path = "/portfolio" render={(props) => <PortfolioList {...props} projects={projects} />} />
          <Route path="/portfolio/:id" render={(props) => <PortfolioDetails {...props} projects={projects} />} />
        </AnimatedSwitch>
        : <h2>Loading...</h2>
    );
  }
}

export default Portfolio;
