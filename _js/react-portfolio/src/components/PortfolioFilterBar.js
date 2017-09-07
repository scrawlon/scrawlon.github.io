import React, { Component } from 'react';

class PortfolioFilterBar extends Component {
  render() {
    const projects = this.props.projects;
    let tags = {
      industries: [],
      technologies: []
    }

    projects.forEach((project) => {
      project.tags.forEach((tag) => {
        if ( tag.industries ) {
          tags.industries = [...new Set(tags.industries.concat(tag.industries))];
        } else if ( tag.technologies ) {
          tags.technologies = [...new Set(tags.technologies.concat(tag.technologies))];
        }
      });
    });

    console.log('tags', tags);

    return (
      <div>
        <ul>
          <h2>Industries</h2>
          {tags.industries.length && tags.industries.map((tag) => {
            return <li key={tag}>{tag}</li>;
          })}
        </ul>
        <ul>
          <h2>Technologies</h2>
          {tags.technologies.length && tags.technologies.map((tag) => {
            return <li key={tag}>{tag}</li>;
          })}
        </ul>
      </div>
    );
  }
}

export default PortfolioFilterBar;
