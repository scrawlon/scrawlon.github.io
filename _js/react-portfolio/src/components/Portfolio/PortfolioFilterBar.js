import React, { Component } from 'react';
var array = require('../../helpers/array.js');

class PortfolioFilterBar extends Component {
  render() {
    const projects = this.props.projects;
    let tags = {
      industries: [],
      technologies: [],
      project_types: []
    }

    projects.forEach((project) => {
      project.tags.forEach((tag) => {
        if ( tag.industries ) {
          // tags.industries = [...new Set(tags.industries.concat(tag.industries))].sort();
        } else if ( tag.technologies ) {
          // tags.technologies = [...new Set(tags.technologies.concat(tag.technologies))].sort((a,b) => array.sortAlpha(a,b));
        } else if ( tag.project_types ) {
          tags.project_types = [...new Set(tags.project_types.concat(tag.project_types))].sort((a,b) => array.sortAlpha(a,b));
        }
      });
    });

    /*console.log('tags', tags);*/

    return (
      <div>
        <ul className="tag-cloud">
          <h2>Tags: Project Types</h2>
          {tags.project_types.length && tags.project_types.map((tag) => {
            return <li key={tag}>{tag}</li>;
          })}
        </ul>
      </div>
    );
  }
}

export default PortfolioFilterBar;
