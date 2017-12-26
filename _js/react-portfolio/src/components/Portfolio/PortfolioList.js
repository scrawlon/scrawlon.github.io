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
        project_types: {},
        technologies: {},
        industries: {}
      },
      filteredProjects: this.props.projects
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleFilterSelect = this.handleFilterSelect.bind(this);
    this.setActiveFilters = this.setActiveFilters.bind(this);
    this.getActiveFilter = this.getActiveFilter.bind(this);
  }

  componentWillMount() {
    this.setActiveFilters();
  }

  setActiveFilters() {
    const filterTypes = Object.keys(this.state.filtersVisible);
    let allFilterSettings = {};

    filterTypes.forEach((filterType) => {
      allFilterSettings[filterType] = this.getActiveFilter(filterType);
    });

    this.setState({
      filtersActive: allFilterSettings
    });
  }

  getActiveFilter(filterType) {
    const filters = this.state.filters[filterType];
    let filterSettings = {};

    filters && filters.forEach((filter) => {
      filterSettings[filter] = true;
    });

    return filterSettings;
  }

  handleChange() {
    const filters = this.state.filters;
    const projects = this.props.projects;
    const filteredProjects = projects.filter(project => {
      let filterMatch = true;

      project.tags.forEach(tagType => {
        let filterKey = Object.keys(tagType)[0];

        if ( tagType[filterKey].every(elem => filters[filterKey].indexOf(elem) === -1) ) {
          console.log('project removed', project);
          filterMatch = false;
        }
      });

      return filterMatch;
    });

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

    console.log('handle filter select', this.state.filtersVisible);
  }

  render() {
    const projects = this.state.filteredProjects;
    const filtersVisible = this.state.filtersVisible;
    const filtersActive = this.state.filtersActive;
    const projectTags = this.props.projectTags;
    const headerBackground = {
      backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAG0lEQVQYV2NMKL/ty4ADMIIkF3SqbsYmP+gkAayXGgfe8HOVAAAAAElFTkSuQmCC)'
    };

    console.log('active filter state', this.state.filtersActive);

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
