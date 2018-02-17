var homeLogoAnimation = require('./velocity-animations/home-logo-animation.js');
var scollAnimation = require('./velocity-animations/scroll-animation.js');

(function() {
  var svgScrawlonLogoFull = document.getElementsByClassName('scrawlon-logo-full');

  var animations = {
    homeLogoAnimationPlay: function() {
      homeLogoAnimation.velocityTimeline.forEach(function(timeline) {
        timeline.animation(timeline.startAt, timeline.endAt, false);
      });
    },
    scrollAnimationPlay: function() {
      scrollAnimation.velocityTimeline.foreach(function(timeline) {
        timeline.animation(timeline.startAt, timeline.endAt, false);
      });
    }
  }

  if ( svgScrawlonLogoFull.length ) {
    animations.homeLogoAnimationPlay();
  }
})();
