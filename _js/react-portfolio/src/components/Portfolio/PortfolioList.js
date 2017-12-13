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
        industries: ['all'],
        projectTypes: ['all'],
        technologies: ['all']
      },
      filteredProjects: this.props.projects
    }

    /*this.getProjectTags = this.getProjectTags.bind(this);*/
  }

  componentWillMount() {
    /*this.getProjectTags();*/
    /*console.log('tags', this.state.tags);
    console.log('filters', this.state.filters);
    console.log('projects', this.state.filteredProjects);*/
  }

  /*getProjectTags = () => {
    let tags = {
      industries: [],
      technologies: [],
      projectTypes: []
    }

    this.props.projects.forEach((project) => {
      project.tags.forEach((tag) => {
        if ( tag.industries ) {
          tags.industries = [...new Set(tags.industries.concat(tag.industries))].sort();
        } else if ( tag.technologies ) {
          tags.technologies = [...new Set(tags.technologies.concat(tag.technologies))].sort((a,b) => array.sortAlpha(a,b));
        } else if ( tag.project_types ) {
          tags.project_types = [...new Set(tags.projectTypes.concat(tag.project_types))].sort((a,b) => array.sortAlpha(a,b));
        }
      });
    });

    console.log('tags 2', tags);

    this.setState({ tags: tags });
  }*/

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
            {projects.length && projects.map((project) => {
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
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default PortfolioList;
