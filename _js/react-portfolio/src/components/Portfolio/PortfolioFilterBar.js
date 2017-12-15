import React, { Component } from 'react';

class PortfolioFilterBar extends Component {
  render() {
    const projectTags = this.props.projectTags;

    return (
      <div>
        <ul className="tag-cloud">
          <form action="">
            <h2>Filter Projects By:</h2>

            <label htmlFor="tags-industries">Types</label>
            <select name="tags-project-types" multiple>
              {projectTags.project_types && projectTags.project_types.length && projectTags.project_types.map((tag) => {
                return <option key={tag} value={tag}>{tag}</option>;
              })}
            </select>

            <label htmlFor="tags-industries">Industries</label>
            <select name="tags-industries" multiple>
              {projectTags.industries && projectTags.industries.length && projectTags.industries.map((tag) => {
                return <option key={tag} value={tag}>{tag}</option>;
              })}
            </select>

            <label htmlFor="tags-technologies">Technologies</label>
            <select name="tags-technologies" multiple>
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
