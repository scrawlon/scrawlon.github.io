import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';
import PortfolioFilterBar from './PortfolioFilterBar';
import PortfolioTags from './PortfolioTags';
/*var array = require('../../helpers/array.js');*/

class PortfolioList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: {
        industries: this.props.projectTags.industries,
        project_types: this.props.projectTags.project_types,
        technologies: this.props.projectTags.technologies
      },
      filteredProjects: this.props.projects
    }

    this.handleChange = this.handleChange.bind(this);
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

  render() {
    const projects = this.state.filteredProjects;
    const projectTags = this.props.projectTags;
    const headerBackground = {
      backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAG0lEQVQYV2NMKL/ty4ADMIIkF3SqbsYmP+gkAayXGgfe8HOVAAAAAElFTkSuQmCC)'
    };

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

          <PortfolioFilterBar projects={projects} projectTags={projectTags} />

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
                      <div className="project-details">
                        <h3>"{project.title}"</h3>
                        <PortfolioTags tags={project.tags} tagTypes={['technologies']}/>
                      </div>
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
