import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import ScrollToTop from '../../helpers/ScrollToTop';
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
    const loading = this.state.loading;
    const projects = this.state.projects;

    return (
      !loading
        ? <div>
            <Router>
              <ScrollToTop>
                <Route render={({ location }) => (
                  <div>
                    <AnimatedSwitch
                      className="switch-wrapper"
                      atEnter={bounceTransition.atEnter}
                      atLeave={bounceTransition.atLeave}
                      atActive={bounceTransition.atActive}
                      mapStyles={mapStyles}
                    >
                      <Route exact path = "/portfolio" render={(props) => <PortfolioList {...props} projects={projects} />} />
                      <Route path="/portfolio/:id" render={(props) => <PortfolioDetails {...props} projects={projects} />} />
                    </AnimatedSwitch>
                  </div>
                )} />
              </ScrollToTop>
            </Router>
          </div>
        : <h2>Loading...</h2>
    );
  }
}
// we need to map the `scale` prop we define below
// to the transform style property
function mapStyles(styles) {
  return {
    opacity: styles.opacity,
    transform: `scale(${styles.scale})`,
  };
}

// wrap the `spring` helper to use a bouncy config
function bounce(val) {
  return spring(val, {
    stiffness: 330,
    damping: 22,
  });
}

// child matches will...
const bounceTransition = {
  // start in a transparent, upscaled state
  atEnter: {
    opacity: 0,
    scale: 1.2,
  },
  // leave in a transparent, downscaled state
  atLeave: {
    opacity: 0,
    scale: bounce(0.8),
  },
  // and rest at an opaque, normally-scaled state
  atActive: {
    opacity: 1,
    scale: bounce(1),
  },
};
export default Portfolio;
