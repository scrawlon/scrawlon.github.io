import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';
import PortfolioFilterBar from './PortfolioFilterBar';
import PortfolioTags from './PortfolioTags';

class PortfolioList extends Component {
  render() {
    const projects = this.props.projects;
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
          <PortfolioFilterBar projects={projects} />
          <ul className="portfolio-list">
            {projects.length && projects.map((project) => {
              const imageClass = "project-image" + (project.screenshot_small ? " small" : "");
              return (
                <Link to={`${this.props.match.url}${project.id}`} key={project.id} title={"Read more about portfolio project, \'" + project.title + "\'"}>
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
