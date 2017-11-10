const axios = require('axios');
let apiUrl = 'https://scrawlon.github.io/';

if ( window.location.basename ) {
  apiUrl = 'http://localhost:4000/';
}

function getPortfolioProjects() {
  return axios.get( apiUrl + 'portfolio-projects.json')
    .then((res) => {
      // console.log(res);
      return res;
    })
    .catch((error) => {
      console.log(error);
    });
}

module.exports = {
  getPortfolioProjects: getPortfolioProjects
};
