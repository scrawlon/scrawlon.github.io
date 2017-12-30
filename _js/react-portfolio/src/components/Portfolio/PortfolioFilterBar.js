import React, { Component } from 'react';

class PortfolioFilterBar extends Component {
  render() {
    const projectTags = this.props.projectTags;
    const projectFilters = Object.keys(this.props.filtersVisible);

    return (
      <div>
        <form action="">

          <ul className="tag-cloud">
            {!projectTags
              ? ''
              :
              projectFilters.map((tagType, i) => {
                const tagLabel = tagType.replace('_', ' ').toUpperCase();
                const checked = this.props.filtersVisible[tagType];

                return (
                  <li key={tagType} className={checked ? 'checked' : ''}>
                    <input
                      type="radio"
                      id={"filter-type" + (i + 1)}
                      name={"filter-type" + (i + 1)}
                      value={tagType}
                      checked={checked ? 'checked' : ''}
                      onChange={this.props.handleFilterSelect}
                    />
                    <label htmlFor={"filter-type" + (i + 1)}>{tagLabel}</label>
                  </li>
                );
              })
            }
          </ul>

          <div className="tag-filters">
            {!projectTags
              ? ''
              :
              projectFilters.map((tagType) => {
                if ( this.props.filtersVisible[tagType] ) {
                  const checkedAll = this.props.filtersActiveAll[tagType];
                  return (
                    <ul key={tagType}>
                      <li>
                        <input
                          type="checkbox"
                          id={"check-all-" + tagType}
                          name={"check-all-" + tagType}
                          data-tag-type={tagType}
                          checked={checkedAll ? 'checked' : ''}
                          onChange={this.props.toggleActiveFilter}
                        />
                        <label htmlFor={"check-all-" + tagType}>all</label>
                      </li>
                      {projectTags[tagType] && projectTags[tagType].length && projectTags[tagType].map((tag) => {
                        const checked = this.props.filtersActive[tagType].includes(tag);

                        return (
                          <li key={tag}>
                            <input
                              type="checkbox"
                              id={tag}
                              name={tag}
                              value={tag}
                              checked={checked ? 'checked' : ''}
                              onChange={this.props.setActiveFilter}
                              data-tag-type={tagType}
                            />
                            <label htmlFor={tag}>{tag}</label>
                          </li>
                        );
                      })}
                    </ul>
                  );
                } else {
                  return '';
                }
              })
            }
          </div>
        </form>
      </div>
    );
  }
}

export default PortfolioFilterBar;
