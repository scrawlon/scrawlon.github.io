import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';
import PortfolioFilterBar from './PortfolioFilterBar';
/*import PortfolioTags from './PortfolioTags';*/
/*var array = require('../../helpers/array.js');*/

class PortfolioList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filtersVisible: {
        industries: true,
        technologies: false,
        project_types: false
      },
      filtersActive: {
        industries: [],
        technologies: [],
        project_types: []
      },
      filtersActiveAll: {
        industries: true,
        technologies: true,
        project_types: true
      },
      filteredProjects: this.props.projects
    }

    this.handleFilterSelect = this.handleFilterSelect.bind(this);
    this.setActiveFilters = this.setActiveFilters.bind(this);
    this.setActiveFilter = this.setActiveFilter.bind(this);
    this.initActiveFilter = this.initActiveFilter.bind(this);
    this.toggleActiveFilter = this.toggleActiveFilter.bind(this);
    this.getFilteredProjects = this.getFilteredProjects.bind(this);
    this.cacheState = this.cacheState.bind(this);
  }

  componentWillMount() {
    /*sessionStorage.removeItem('state');*/
    const cachedState = JSON.parse(sessionStorage.getItem('state'));

    /* Disable cache for testing */
    /*const cachedState = false;*/

    if ( cachedState && cachedState.filteredProjects.length ) {
      this.state = cachedState;
    } else {
      this.setActiveFilters();
    }

    /*console.log('cached state', cachedState);*/
  }

  cacheState() {
    sessionStorage.setItem('state', JSON.stringify(this.state));
  }

  setActiveFilters(event) {
    const filterTypes = Object.keys(this.state.filtersVisible);
    let allFilterSettings = {};

    filterTypes.forEach((filterType) => {
      allFilterSettings[filterType] = this.initActiveFilter(filterType, event);
    });

    this.setState({
      filtersActive: allFilterSettings
    });
  }

  initActiveFilter(filterType, event) {
    const filters = this.props.projectTags[filterType];
    let filterSettings = [];

    filters && filters.forEach((filter) => {

      if ( event && event.target.value && filter === event.target.value && filterType === event.target.dataset.tagType ) {
        filterSettings.push(event.target.value);
      } else {
        filterSettings.push(filter);
      }
    });

    return filterSettings;
  }

  toggleActiveFilter(event) {
    const filtersActive = this.state.filtersActive;
    const filtersActiveAll = this.state.filtersActiveAll;
    const filterType = event.target.dataset.tagType;
    const filterChecked = event.target.checked ? true : false;

    if ( filterChecked ) {
      filtersActive[filterType] = this.initActiveFilter(filterType);
    } else {
      filtersActive[filterType] = [];
    }

    filtersActiveAll[filterType] = filterChecked;

    this.setState({
      filtersActive: filtersActive,
      filterActiveAll: filtersActiveAll
    });

    this.getFilteredProjects(filterType);
  }

  setActiveFilter(event) {
    const filtersActive = this.state.filtersActive;
    const filterType = event.target.dataset.tagType;
    const filter = event.target.value;
    const filterChecked = event.target.checked;
    const filtersActiveValue = filtersActive[filterType].indexOf(filter);

    if ( filterChecked && filtersActiveValue === -1 ) {
      filtersActive[filterType].push(filter);
    } else if ( !filterChecked && filtersActiveValue !== -1 ) {
      filtersActive[filterType].splice(filtersActiveValue, 1);
    }

    this.setState({
      filtersActive: filtersActive,
    });

    this.getFilteredProjects(filterType);
  }

  getFilteredProjects(filterType) {
    const filtersActive = this.state.filtersActive;
    const projects = this.props.projects;
    const filterTypes = Object.keys(filtersActive);
    let filteredProjects = projects.filter((project) => {
      const projectTags = project.tags;
      let filterMatch = true;

      filterTypes.forEach((filterType) => {
        const filtersActiveByType = filtersActive[filterType];

        projectTags.forEach((tags) => {
          const tagKey = Object.keys(tags)[0];
          if ( tagKey === filterType ) {
            /*console.log('project tags', tags[tagKey]);*/
            const filterTypeMatch = tags[tagKey].some((tag) => {
              return filtersActiveByType.includes(tag);
            });

            if ( !filterTypeMatch ) { filterMatch = false; }
          }
        });

      });

      return filterMatch;
    });

    this.setState({
      filteredProjects: filteredProjects
    });
  }

  handleFilterSelect(event) {
    const filtersActive = this.state.filtersActive;
    const filtersActiveAll = this.state.filtersActiveAll;
    const projectFilters = Object.keys(this.state.filtersVisible);
    const filtersVisible = this.state.filtersVisible;
    const filterChange = event.target.value;

    if ( filtersVisible[filterChange] === true ) {
      return;
    }

    projectFilters.forEach((tagType) => {
      if ( tagType === filterChange ) {
        filtersVisible[tagType] = !this.state.filtersVisible[tagType];
      } else {
        filtersVisible[tagType] = false;
        filtersActive[tagType] = this.initActiveFilter(tagType);
        filtersActiveAll[tagType] = true;
      }
    });


    this.setState({
      filtersVisible: filtersVisible,
      filtersActive: filtersActive,
      filterActiveAll: filtersActiveAll
    });

    this.getFilteredProjects();
  }

  render() {
    const projects = this.state.filteredProjects;
    const projectTags = this.props.projectTags;
    const filtersVisible = this.state.filtersVisible;
    const filtersActive = this.state.filtersActive;
    const filtersActiveAll = this.state.filtersActiveAll;
    const headerBackground = {
      backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAG0lEQVQYV2NMKL/ty4ADMIIkF3SqbsYmP+gkAayXGgfe8HOVAAAAAElFTkSuQmCC)'
    };

    if ( projects.length ) {
      this.cacheState();
    }

    return (
      <div>

        <header style={headerBackground}>
          <div className="backdrop">
          </div>
          <div className="wrapper">
            <h1 className="page">
              Portfolio
            </h1>
          </div>
        </header>

        <div className="portfolio-wrapper">

          <PortfolioFilterBar
            projects={projects}
            projectTags={projectTags}
            filtersVisible={filtersVisible}
            filtersActive={filtersActive}
            filtersActiveAll={filtersActiveAll}
            setActiveFilter={this.setActiveFilter}
            handleFilterSelect={this.handleFilterSelect}
            toggleActiveFilter={this.toggleActiveFilter}
          />

          <ul className="portfolio-list">
            {!projects.length
              ? <li><h2>No projects match your query</h2></li>
              :
              projects.map((project) => {
                const imageClass = "project-image" + (project.screenshot_small ? " small" : "");
                return (
                  <Link
                    to={`${this.props.match.url}${project.id}`}
                    key={project.id}
                    title={"Read more about portfolio project, '" + project.title + "'"}
                    onClick={this.cacheState}
                  >
                    <li key={project.title}>
                      <div className={imageClass} style={{backgroundImage: 'url(' + project.screenshot + ')'}}></div>
                    </li>
                  </Link>
                );
              })
            }
          </ul>
        </div>
      </div>
    );
  }
}

export default PortfolioList;
