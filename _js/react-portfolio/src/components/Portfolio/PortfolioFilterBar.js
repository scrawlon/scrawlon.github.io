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
          tags.industries = [...new Set(tags.industries.concat(tag.industries))].sort();
        } else if ( tag.technologies ) {
          tags.technologies = [...new Set(tags.technologies.concat(tag.technologies))].sort((a,b) => sortAlpha(a,b));
        }
      });
    });

    console.log('tags', tags);

    return (
      <div>
        <ul className="tag-cloud">
          <h3>Tags: Industries</h3>
          {tags.industries.length && tags.industries.map((tag) => {
            return <li key={tag}>{tag}</li>;
          })}
        </ul>
        <ul className="tag-cloud">
          <h3>Tags: Technologies</h3>
          {tags.technologies.length && tags.technologies.map((tag) => {
            return <li key={tag}>{tag}</li>;
          })}
        </ul>
      </div>
    );
  }
}

function sortAlpha(a,b) {
  let aLower = a && a.toLowerCase();
  let bLower = b && b.toLowerCase();
  if (aLower < bLower) return -1;
  else if (aLower > bLower) return 1;
  return 0;
}

export default PortfolioFilterBar;
