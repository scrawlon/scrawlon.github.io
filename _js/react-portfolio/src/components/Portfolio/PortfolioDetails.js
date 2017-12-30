import React, { Component } from 'react';
import PortfolioTags from './PortfolioTags';
import NotFound from '../../helpers/NotFound';

class PortfolioDetails extends Component {
  render () {
    const project = this.props.projects.find((project) => {
      return project.id === this.props.match.params.id;
    });

    if ( !project ) { return <NotFound /> }

    return (
      <div>

        <header className="portfolio-details-header">
          <article>
            <h1 className="page">
              Project: "{project.title}"
            </h1>
          </article>
        </header>

        <div className="portfolio-wrapper">
          <div className="portfolio-details-wrapper">
            {project
              ?
              <article>

                <section className="headline">
                  <p className="portfolio-details-agency">Design Agency: {project.employer}</p>
                </section>

                <section className="headline shadow">
                  <img className="header-image" src={project.screenshot} alt={"Porfolio project: " + project.title} />
                </section>

                <section className="content">

                  <h2>Quick Links</h2>
                  <ul>

                    {project.site_url
                      ? <li>Project Hompage: <a href={project.site_url} alt={project.title} target="_blank">{project.title}</a></li>
                      : <li>site currently offline</li>
                    }

                    {project.my_work
                      ? <li>My Main Contribution: <a href={project.my_work.page_url} alt={project.title + ": " + project.my_work.page_title} target="_blank">{project.title + ": " + project.my_work.page_title}</a></li>
                      : ''
                    }
                  </ul>

                  <h2>Project Notes</h2>
                  <div className="portfolio-details-text" dangerouslySetInnerHTML={ {__html: project.content} } />
                </section>

                <aside>
                  <div className="portfolio-tags-wrapper">
                    <h3>Project Types</h3>
                    <PortfolioTags tags={project.tags} tagTypes={['project_types']}/>

                    <h3>Technologies</h3>
                    <PortfolioTags tags={project.tags} tagTypes={['technologies']}/>

                    <h3>Industries</h3>
                    <PortfolioTags tags={project.tags} tagTypes={['industries']}/>
                  </div>
                </aside>

              </article>
              : ''
            }
          </div>
        </div>
      </div>
    );
  }
}

export default PortfolioDetails
