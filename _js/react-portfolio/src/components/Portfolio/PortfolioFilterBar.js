import React, { Component } from 'react';

class PortfolioFilterBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filtersVisible: {
        industries: false,
        project_types: false,
        technologies: false
      }
    }

    this.handleFilterSelect = this.handleFilterSelect.bind(this);
  }

  handleFilterSelect(event) {
    const projectFilters = Object.keys(this.state.filtersVisible);
    const filtersVisible = this.state.filtersVisible;
    const filterChange = event.target.value;

    projectFilters.forEach((tagType) => {
      if ( tagType === filterChange ) {
        filtersVisible[tagType] = !this.state.filtersVisible[tagType];
      } else {
        filtersVisible[tagType] = false;
      }
    });


    this.setState({
      filterVisible: filtersVisible
    });

    console.log('handle filter select', this.state.filtersVisible);
  }

  render() {
    const projectTags = this.props.projectTags;
    const projectFilters = Object.keys(this.state.filtersVisible);

    console.log('project filters', projectFilters);

    return (
      <div>
        <ul className="tag-cloud">
          <form action="">
            <h2>Filter Projects By:</h2>

            <ul>
              {!projectTags
                ? ''
                :
                projectFilters.map((tagType, i) => {
                  const tagLabel = tagType.replace('_', ' ').toUpperCase();
                  const checked = this.state.filtersVisible[tagType];

                  return (
                    <li key={tagType}>
                      <input
                        type="radio"
                        name={"filter-type" + (i + 1)}
                        value={tagType}
                        checked={checked ? 'checked' : ''}
                        onChange={this.handleFilterSelect}/>
                      <label htmlFor="filter-type">{tagLabel}</label>
                    </li>
                  );
                })
              }
            </ul>

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
