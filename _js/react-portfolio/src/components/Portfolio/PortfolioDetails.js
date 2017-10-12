import React, { Component } from 'react';

class PortfolioDetails extends Component {
  render () {
    const project = this.props.projects.find((project) => {
      return project.id === this.props.match.params.id;
    });

    return (
      <div className="portfolio-details-wrapper">
        {project
          ?
          <div className="portfolio-details">
            <img src={project.screenshot} alt={project.title} />
            <h1>"{project.title}"</h1>
            <div className="portfolio-details-text" dangerouslySetInnerHTML={ {__html: project.content} } />
          </div>
          : ''
        }
      </div>
    );
  }
}

export default PortfolioDetails
