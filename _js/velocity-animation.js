var homeLogoAnimation = require('./velocity-animations/home-logo-animation.js');
var scrollAnimation = require('./velocity-animations/scroll-animation.js');
var scrollToElement = require('./velocity-animations/scroll-to-element.js');

(function() {
  var svgScrawlonLogoFull = document.getElementsByClassName('scrawlon-logo-full');
  var svgScrollArrow = document.getElementsByClassName('scroll-arrow');

  var animations = {
    homeLogoAnimationPlay: function() {
      homeLogoAnimation.velocityTimeline.forEach(function(timeline) {
        timeline.animation(timeline.startAt, timeline.endAt);
      });
    },
    scrollAnimationPlay: function() {
      scrollAnimation.velocityTimeline.forEach(function(timeline) {
        timeline.animation(timeline.startAt, timeline.endAt);
      });
    },
    scrollToElementPlay: function() {
      scrollToElement.velocityTimeline.forEach(function(timeline) {
        timeline.animation();
      });
    }
  }

  if ( svgScrawlonLogoFull.length ) {
    animations.homeLogoAnimationPlay();
  }

  if ( svgScrollArrow.length ) {
    animations.scrollAnimationPlay();

    for ( var i=0; i < svgScrollArrow.length; i++ ) {
      svgScrollArrow[i].onclick = function(event) {
        var article = document.getElementsByTagName('article');

        if ( article.length ) {
          animations.scrollToElementPlay();
        }
      }
    }
  }
})();
