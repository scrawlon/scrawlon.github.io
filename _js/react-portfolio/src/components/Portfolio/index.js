import React, { Component } from 'react';
import {
  Route,
} from 'react-router-dom';
import { spring, AnimatedSwitch } from 'react-router-transition';
import PortfolioList from './PortfolioList';
import PortfolioDetails from './PortfolioDetails';
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
    const transitionFunctions = {
      mapStyles: (styles) => {
        return {
          opacity: styles.opacity,
          transform: `scale(${styles.scale})`,
        };
      },
      bounce: (val) => {
        return spring(val, {
          stiffness: 330,
          damping: 22,
        });
      }
    }

    const bounceTransition = {
      atEnter: {
        opacity: 0,
        scale: 0.5,
      },
      atLeave: {
        opacity: 0,
        scale: transitionFunctions.bounce(0.8),
      },
      atActive: {
        opacity: 1,
        scale: transitionFunctions.bounce(1),
      },
    };

    const loading = this.state.loading;
    const projects = this.state.projects;

    return (
      !loading
        ?
        <AnimatedSwitch
          className="switch-wrapper"
          atEnter={bounceTransition.atEnter}
          atLeave={bounceTransition.atLeave}
          atActive={bounceTransition.atActive}
          mapStyles={transitionFunctions.mapStyles}
        >
          <Route exact path = "/portfolio" render={(props) => <PortfolioList {...props} projects={projects} />} />
          <Route path="/portfolio/:id" render={(props) => <PortfolioDetails {...props} projects={projects} />} />
        </AnimatedSwitch>
        : <h2>Loading...</h2>
    );
  }
}

export default Portfolio;
