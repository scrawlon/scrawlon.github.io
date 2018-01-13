var Velocity = require('velocity-animate');

console.log('velocity-animation', 2);

(function() {
  var svgLogoFrame = document.getElementsByClassName('logo-frame');
  var swiperFade = document.getElementsByClassName('swiper-fade');
  var sliderBackground = document.getElementsByClassName('slider-background');

  /*Velocity(swiperFade, { background: "linearGradient(to bottom, transparent, rgba(25,25,112,1))" });*/
  /*Velocity(swiperFade, { background: "linearGradient(to bottom, transparent, rgba(25,25,112,0.6))" }, { duration: 2000, delay: 1000 });*/
  Velocity(sliderBackground, { opacity: 1 }, { duration: 1000, delay: 500 });
  Velocity(swiperFade, { opacity: .5 }, { duration: 5000, delay: 500 });
  Velocity(svgLogoFrame, { 'stroke-dasharray': 494 }, { duration: 1000, delay: 900 }, 'easeInOutSine');
})();
