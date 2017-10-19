import React, { Component } from 'react';
import {
  Route,
} from 'react-router-dom';
import PortfolioList from './PortfolioList';
import PortfolioDetails from './PortfolioDetails';
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
    window.removeEventListener('resize', debounce( () => this.mediaQuery(), 100 ) );
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

    return (
      !loading
        ?
        <div>
          <Route exact path = "/portfolio" render={(props) => <PortfolioList {...props} projects={projects} />} />
          <Route path="/portfolio/:id" render={(props) => <PortfolioDetails {...props} projects={projects} />} />
        </div>
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
