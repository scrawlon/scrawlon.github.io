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
                {project.tags.map((tag) => {
                  const tagType = Object.keys(tag);

                  if ( tagType[0] === 'technologies' ) {
                    return (
                      <div key={tagType[0]}>
                        <h3>Tags: Technologies</h3> {tag[tagType[0]].join(', ')}
                      </div>
                    );
                  } else {
                    return '';
                  }
                })}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default PortfolioList;
