var homeLogoAnimation = require('./velocity-animations/home-logo-animation.js');
var homeLogoReplay = document.getElementsByClassName('homeLogoReplay');

(function() {
  function homeLogoAnimationPlay() {
    homeLogoAnimation.velocityTimeline.forEach(function(timeline) {
      timeline.animation(timeline.startAt, timeline.endAt, false);
    });
  }

  homeLogoAnimationPlay();
})();
