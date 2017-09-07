const axios = require('axios');

function getPortfolioProjects() {
  return axios.get('http://localhost:4000/portfolio-projects.json')
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
