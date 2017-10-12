import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import ScrollToTop from '../../helpers/ScrollToTop';
import { AnimatedSwitch } from 'react-router-transition';
import PortfolioList from './PortfolioList';
import PortfolioDetails from './PortfolioDetails';
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
                <Route render={( {location} ) => (
                  <AnimatedSwitch
                    atEnter={{ offset: +100 }}
                    atLeave={{ offset: 0 }}
                    atActive={{ offset: 0 }}
                    mapStyles={(styles) => ({
                      transform: `translateX(${styles.offset}%)`,
                    })}
                    >
                      <Route exact path = "/portfolio" render={(props)=> <PortfolioList {...props} projects={projects} />} />
                      <Route path="/portfolio/:id" render={(props)=> <PortfolioDetails {...props} projects={projects} />} />
                  </AnimatedSwitch>
                )} />
              </ScrollToTop>
            </Router>
          </div>
        : <h2>Loading...</h2>
    );
  }
}

export default Portfolio;
