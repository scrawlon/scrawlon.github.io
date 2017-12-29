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
      filters: {
        project_types: this.props.projectTags.project_types,
        technologies: this.props.projectTags.technologies,
        industries: this.props.projectTags.industries
      },
      filtersVisible: {
        project_types: false,
        technologies: false,
        industries: false
      },
      filtersActive: {
        project_types: [],
        technologies: [],
        industries: []
      },
      filteredProjects: this.props.projects
    }

    this.handleFilterSelect = this.handleFilterSelect.bind(this);
    this.setActiveFilters = this.setActiveFilters.bind(this);
    this.setActiveFilter = this.setActiveFilter.bind(this);
    this.initActiveFilter = this.initActiveFilter.bind(this);
    this.getFilteredProjects = this.getFilteredProjects.bind(this);
  }

  componentWillMount() {
    this.setActiveFilters();
  }

  setActiveFilters(event) {
    const filterTypes = Object.keys(this.state.filtersVisible);
    let allFilterSettings = {};

    /*console.log('set active filters tag type', event && event.target.dataset.tagType);*/
    /*console.log('set active filters value', event && event.target.value);*/
    /*console.log('set active filters checked', event && event.target.checked);*/

    filterTypes.forEach((filterType) => {
      allFilterSettings[filterType] = this.initActiveFilter(filterType, event);
    });

    this.setState({
      filtersActive: allFilterSettings
    });
  }

  initActiveFilter(filterType, event) {
    const filters = this.state.filters[filterType];
    let filterSettings = [];

    filters && filters.forEach((filter) => {

      if ( event && filterType === event.target.dataset.tagType && filter === event.target.value ) {
        filterSettings.push(event.target.value);
      } else {
        filterSettings.push(filter);
      }
    });

    return filterSettings;
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

    console.log('filters active', filtersActive[filterType]);

    this.setState({
      filtersActive: filtersActive,
    });

    this.getFilteredProjects(filterType);
  }

  getFilteredProjects(filterType) {
    const filtersActive = this.state.filtersActive[filterType];
    const projects = this.props.projects;
    /*const filterTypes = Object.keys(filtersActive);*/
    let filteredProjects = projects.filter((project) => {
      const projectTags = project.tags;
      let filterMatch = false;

      console.log('filtersActive', filtersActive);
      /*console.log('projectTags', projectTags);*/

      projectTags.forEach((tags) => {
        const tagKey = Object.keys(tags)[0];
        if ( tagKey === filterType ) {
          console.log('project tags', tags[tagKey]);
          tags[tagKey].forEach((tag) => {
            if ( filtersActive.includes(tag) ) {
              filterMatch = true;
            }
          });
        }
      });

      return filterMatch;
      /*return filtersActive.includes(projectTags);*/

    });

    console.log('new filteredProjects', filteredProjects);

    this.setState({
      filteredProjects: filteredProjects
    });
  }

  handleFilterSelect(event) {
    const projectFilters = Object.keys(this.state.filtersVisible);
    const filtersVisible = this.state.filtersVisible;
    const filterChange = event.target.value;

    projectFilters.forEach((tagType) => {
      if ( tagType === filterChange ) {
        filtersVisible[tagType] = !this.state.filtersVisible[tagType];
      } else {
        filtersVisible[tagType] = false;
      }
    });


    this.setState({
      filterVisible: filtersVisible
    });
  }

  render() {
    const projects = this.state.filteredProjects;
    const filtersVisible = this.state.filtersVisible;
    const filtersActive = this.state.filtersActive;
    const projectTags = this.props.projectTags;
    const headerBackground = {
      backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAG0lEQVQYV2NMKL/ty4ADMIIkF3SqbsYmP+gkAayXGgfe8HOVAAAAAElFTkSuQmCC)'
    };

    /*console.log('active filter state', this.state.filtersActive);*/

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
            handleFilterSelect={this.handleFilterSelect}
            setActiveFilter={this.setActiveFilter}
          />

          <ul className="portfolio-list">
            {!projects.length
              ? <li><h2>No projects match your query</h2></li>
              :
              projects.map((project) => {
                const imageClass = "project-image" + (project.screenshot_small ? " small" : "");
                return (
                  <Link to={`${this.props.match.url}${project.id}`} key={project.id} title={"Read more about portfolio project, '" + project.title + "'"}>
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
