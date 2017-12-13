import React, { Component } from 'react';
/*var array = require('../../helpers/array.js');*/

class PortfolioFilterBar extends Component {
  render() {
    const projectTags = this.props.projectTags;

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
