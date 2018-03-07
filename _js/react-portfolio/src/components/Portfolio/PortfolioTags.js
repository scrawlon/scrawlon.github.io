import React, { Component } from 'react';
var array = require('../../helpers/array.js');

class PortfolioTags extends Component {
  render () {
    const tags = this.props.tags;
    const tagTypes = this.props.tagTypes;

    return (
      <div>
        {tags.map((tag) => {
          const tagType = Object.keys(tag)[0];

          if ( tagTypes.indexOf(tagType) > -1 ) {
            return (
              <div key={tagType} className="tags">
                {tag[tagType].sort((a,b) => array.sortAlpha(a,b)).join(', ')}
              </div>
            );
          } else {
            return '';
          }
        })}
      </div>
    )
  }
}

export default PortfolioTags;
