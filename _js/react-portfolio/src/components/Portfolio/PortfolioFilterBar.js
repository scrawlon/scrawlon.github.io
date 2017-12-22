import React, { Component } from 'react';

class PortfolioFilterBar extends Component {
  render() {
    const projectTags = this.props.projectTags;
    const projectFilters = Object.keys(this.props.filtersVisible);

    return (
      <div>
        <ul className="tag-cloud">
          <form action="">
            <h2>Project Filters</h2>

            <ul>
              {!projectTags
                ? ''
                :
                projectFilters.map((tagType, i) => {
                  const tagLabel = tagType.replace('_', ' ').toUpperCase();
                  const checked = this.props.filtersVisible[tagType];

                  return (
                    <li key={tagType}>
                      <input
                        type="radio"
                        name={"filter-type" + (i + 1)}
                        value={tagType}
                        checked={checked ? 'checked' : ''}
                        onChange={this.props.handleFilterSelect}/>
                      <label htmlFor="filter-type">{tagLabel}</label>
                    </li>
                  );
                })
              }
            </ul>

            {!projectTags
              ? ''
              :
              projectFilters.map((tagType) => {
                if ( this.props.filtersVisible[tagType] ) {
                  return (
                    <div key={tagType}>
                      <select name={"tags-" + tagType} multiple>
                        {projectTags[tagType] && projectTags[tagType].length && projectTags[tagType].map((tag) => {
                          return <option key={tag} value={tag}>{tag}</option>;
                        })}
                      </select>
                    </div>
                  );
                } else {
                  return '';
                }
              })
            }
          </form>
        </ul>
      </div>
    );
  }
}

export default PortfolioFilterBar;
