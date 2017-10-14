import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';
import PortfolioFilterBar from './PortfolioFilterBar';
import PortfolioTags from './PortfolioTags';

class PortfolioList extends Component {
  render() {
    const projects = this.props.projects;

    return (
      <div>
        <PortfolioFilterBar projects={projects} />
        <ul className="portfolio-list">
          {projects.length && projects.map((project) => {
            const imageClass = "project-image" + (project.screenshot_small ? " small" : "");
            return (
              <Link to={`${this.props.match.url}/${project.id}`} key={project.id}>
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
    );
  }
}

export default PortfolioList;
