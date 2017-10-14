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
          <article>
            <section className="headline">
              <h1>"{project.title}"</h1>
              <img className="header-image" src={project.screenshot} alt={project.title} />
            </section>
            <section className="content">
              <div className="portfolio-details-text" dangerouslySetInnerHTML={ {__html: project.content} } />
            </section>
            <aside>
              <h1>sidebar</h1>
            </aside>
          </article>
          : ''
        }
      </div>
    );
  }
}

export default PortfolioDetails
