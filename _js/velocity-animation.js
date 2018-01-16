var homeLogoAnimation = require('./velocity-animations/home-logo-animation.js');

(function() {
  homeLogoAnimation.velocityTimeline.forEach(function(timeline) {
    timeline.animation(timeline.startAt, timeline.endAt);
  });
})();
