import React, { Component } from 'react';
/*var array = require('../../helpers/array.js');*/

class PortfolioFilterBar extends Component {
  render() {
    const projectTags = this.props.projectTags;
    /*const projects = this.props.projects;*/
    /*let tags = {
      industries: [],
      technologies: [],
      project_types: []
    }*/

    /*projects.forEach((project) => {
      project.tags.forEach((tag) => {
        if ( tag.industries ) {
          tags.industries = [...new Set(tags.industries.concat(tag.industries))].sort();
        } else if ( tag.technologies ) {
          tags.technologies = [...new Set(tags.technologies.concat(tag.technologies))].sort((a,b) => array.sortAlpha(a,b));
        } else if ( tag.project_types ) {
          tags.project_types = [...new Set(tags.project_types.concat(tag.project_types))].sort((a,b) => array.sortAlpha(a,b));
        }
      });
    });*/

    /*console.log('tags', tags);*/

    return (
      <div>
        <ul className="tag-cloud">
          <form action="">
            <h2>Filter Projects By:</h2>
            <select name="" id="">
              {projectTags.industries && projectTags.industries.length && projectTags.industries.map((tag) => {
                return <option key={tag} value={tag}>{tag}</option>;
              })}
            </select>
            <select name="" id="">
              {projectTags.technologies && projectTags.technologies.length && projectTags.technologies.map((tag) => {
                return <option key={tag} value={tag}>{tag}</option>;
              })}
            </select>
          </form>
        </ul>
      </div>
    );
  }
}

export default PortfolioFilterBar;
