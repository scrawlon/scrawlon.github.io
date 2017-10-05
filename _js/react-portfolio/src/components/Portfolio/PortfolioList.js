import React, { Component } from 'react';
var array = require('../../helpers/array.js');

class PortfolioList extends Component {
  render() {
    const projects = this.props.projects;

    return (
      <div>
        <ul className="portfolio-list">
          {projects.length && projects.map((project) => {
            const imageClass = "project-image" + (project.screenshot_small ? " small" : "");
            return (
              <li key={project.title}>
                <div className={imageClass} style={{backgroundImage: 'url(' + project.screenshot + ')'}}></div>
                <div className="project-details">
                  <h1>{project.title}</h1>
                  {project.tags.map((tag) => {
                    const tagType = Object.keys(tag);

                    if ( tagType[0] === 'technologies' ) {
                      return (
                        <div key={tagType[0]} className="tags">
                          {tag[tagType[0]].sort((a,b) => array.sortAlpha(a,b)).join(', ')}
                        </div>
                      );
                    } else {
                      return '';
                    }
                  })}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default PortfolioList;
