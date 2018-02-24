var Velocity = require('velocity-animate');

var article = document.getElementsByTagName('article');
var velocityTimeline = [];

if ( article.length ) {
  velocityTimeline = [
    {
      animation: scrollDown
    }
  ];

  function scrollDown(startAt, endAt) {
    Velocity(article, "scroll", { duration: 1000, easing: "ease-in" });
  }
}

module.exports = {
  velocityTimeline: velocityTimeline
};
