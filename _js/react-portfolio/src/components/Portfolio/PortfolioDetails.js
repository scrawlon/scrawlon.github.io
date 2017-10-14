import React, { Component } from 'react';
import PortfolioTags from './PortfolioTags';

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
              <h2>Quick Links</h2>
              <ul>
                <li>Project Hompage: <a href={project.site_url} alt={project.title} target="_blank">{project.title}</a></li>
                {project.page_url
                  ? <li>Project Subpage (my work): <a href={project.page_url} alt={project.title} target="_blank">{project.page_url}</a></li>
                  : ''}
              </ul>
              <div className="portfolio-details-text" dangerouslySetInnerHTML={ {__html: project.content} } />
            </section>

            <aside>
              <h3>Project Types</h3>
              <PortfolioTags tags={project.tags} tagTypes={['project_types']}/>

              <h3>Technologies</h3>
              <PortfolioTags tags={project.tags} tagTypes={['technologies']}/>

              <h3>Industries</h3>
              <PortfolioTags tags={project.tags} tagTypes={['industries']}/>
            </aside>

          </article>
          : ''
        }
      </div>
    );
  }
}

export default PortfolioDetails
