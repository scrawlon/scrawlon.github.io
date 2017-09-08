import React, { Component } from 'react';
var array = require('../../helpers/array.js');

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
          // tags.industries = [...new Set(tags.industries.concat(tag.industries))].sort();
        } else if ( tag.technologies ) {
          tags.technologies = [...new Set(tags.technologies.concat(tag.technologies))].sort((a,b) => array.sortAlpha(a,b));
        }
      });
    });

    console.log('tags', tags);

    return (
      <div>
        <ul className="tag-cloud">
          <h2>Tags: Technologies</h2>
          {tags.technologies.length && tags.technologies.map((tag) => {
            return <li key={tag}>{tag}</li>;
          })}
        </ul>
      </div>
    );
  }
}

export default PortfolioFilterBar;
