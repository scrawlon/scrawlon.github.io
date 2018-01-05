const axios = require('axios');
const dataCache = require('./dataCache.js');
let apiUrl = 'https://scrawlon.github.io/';
let cacheTime = 1000 * 60 * 30; // milliseconds * seconds * minutes

if ( window.location.hostname === 'localhost' ) {
  apiUrl = 'http://localhost:4000/';
  cacheTime = 1000 * 30; // milliseconds * seconds
}

function getPortfolioProjects() {
  const portfolioCache = dataCache.get('portfolio');

  if ( portfolioCache ) {
    return Promise.resolve(portfolioCache);
  }

  return axios.get( apiUrl + 'portfolio-projects.json')
    .then((res) => {
      /*console.log('api response', res);*/
      dataCache.set('portfolio', res, cacheTime);
      return res;
    })
    .catch((error) => {
      console.log(error);
    });
}

module.exports = {
  getPortfolioProjects: getPortfolioProjects
};
