import React, { Component } from 'react';

class PortfolioList extends Component {
  render() {
    const projects = this.props.projects;

    return (
      <div>
        <ul className="portfolio-list">
          {projects.length && projects.map((project) => {
            return (
              <li key={project.title}>
                <h1>{project.title}</h1>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default PortfolioList;
