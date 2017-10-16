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
      navigationBack: false,
      mobileView: false
    };

    this.getPortfolioProjects = this.getPortfolioProjects.bind(this);
    this.mediaQuery = this.mediaQuery.bind(this);
  }

  componentDidMount () {
    this.getPortfolioProjects();
    this.mediaQuery();

    window.addEventListener('resize', debounce( () => this.mediaQuery(), 100 ) );
  }

  componentWillUnmount () {
    window.removeEventListener('resize', () => {
      this.mediaQuery();
    });
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

  mediaQuery () {
    let mqMobile = window.matchMedia( "(max-width: 959px)");

    if ( mqMobile.matches ) {
      this.setState(() => {
        return { mobileView: true };
      });
    } else {
      this.setState(() => {
        return { mobileView: false };
      });
    }
  }

  render() {
    const loading = this.state.loading;
    const projects = this.state.projects;
    const mobileView = this.state.mobileView;

    console.log('mobile view?', mobileView);

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

function debounce(fn, delay) {
  var timer = null;
  return function () {
    var context = this, args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}

export default Portfolio;
