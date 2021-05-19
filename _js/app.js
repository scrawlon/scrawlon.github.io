// var Velocity = require('velocity-animate');
var urlPath = window.location.pathname;

// require('./header');
require('./mobileMenu');
require('./homeSlider');
require('fg-loadcss');

if ( urlPath.indexOf('/portfolio') !== -1 ) {
  require('./portfolio');
}

// window.onload = function() {
//   require('./velocity-animation');
// }
