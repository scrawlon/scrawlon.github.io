import React, { Component } from 'react';

class PortfolioList extends Component {
  render() {
    const projects = this.props.projects;

    return (
      <div>
        <h2>Portfolio</h2>
        <ul>
        {projects.length && projects.map((project) => {
          return <li key={project.title}>{project.title}</li>;
        })}
        </ul>
      </div>
    );
  }
}

export default PortfolioList;
