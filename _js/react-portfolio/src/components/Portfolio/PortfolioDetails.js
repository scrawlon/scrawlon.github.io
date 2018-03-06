import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
            <h1>
              <span className="title-type">
                <a href="/portfolio">Portfolio</a>
              </span> {project.title}
            </h1>
          </article>
        </header>

        <div className="portfolio-wrapper">
          <div className="portfolio-details-wrapper">
            {project
              ?
              <article>

                <section className="headline">
                  <p className="portfolio-details-agency">
                    <span className="title-type">Design Agency</span> {project.employer}
                  </p>
                </section>

                <section className="headline shadow">
                  <img className="header-image" src={project.screenshot} alt={"Porfolio project: " + project.title} />
                </section>

                <section className="content">

                  <h2>Quick Links</h2>
                  <ul>

                    {project.site_url
                      ? <li>
                          <a href={project.site_url} title={project.title + ": Homepage"} target="_blank">
                            <span className="title-type">Project Homepage</span> {project.title}
                          </a>
                        </li>
                      : <li>site currently offline</li>
                    }

                    {project.my_work
                      ? <li>
                          <a href={project.my_work.page_url} title={project.title + ": " + project.my_work.page_title} target="_blank">
                            <span className="title-type">My Main Contribution</span> {project.title + ": " + project.my_work.page_title}
                          </a>
                        </li>
                      : ''
                    }
                  </ul>

                  <h2>Project Notes</h2>
                  <div className="portfolio-details-text" dangerouslySetInnerHTML={ {__html: project.content} } />

                  <p className="btn-wrapper">
                    <Link
                      to="/"
                      key={project.id}
                      title={"back to Portfolio page"}
                      onClick={this.cacheState}
                      className="btn btn-white btn-mobile"
                    >
                      back to portfolio
                    </Link>
                  </p>
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
