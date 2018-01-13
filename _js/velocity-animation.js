var Velocity = require('velocity-animate');

console.log('velocity-animation', 3);

(function() {
  var svgScrawlonLogoFull = document.getElementsByClassName('scrawlon-logo-full');
  var svgScrawlonLogoFullGradientOne = document.getElementById('slf-bg-one');
  var svgScrawlonLogoFullGradientTwo = document.getElementById('slf-bg-two');
  var svgScrawlonLogoFullGradientThree = document.getElementById('slf-bg-three');
  var svgSo = document.getElementsByClassName('logo-so');
  var svgScrawlon = document.getElementsByClassName('logo-scrawlon');
  var svgLogoFrame = document.getElementsByClassName('logo-frame');
  var swiperFade = document.getElementsByClassName('swiper-fade');
  var sliderBackground = document.getElementsByClassName('slider-background');

  fadeInBackground();
  drawLogoFrame();
  drawLogoSO();
  fadeInLogoGradient();

  function fadeInBackground() {
    Velocity(sliderBackground, { opacity: 1 }, { duration: 2000, delay: 500 });
  }
  /*Velocity(swiperFade, { background: "linearGradient(to bottom, transparent, rgba(25,25,112,1))" });*/
  /*Velocity(swiperFade, { background: "linearGradient(to bottom, transparent, rgba(25,25,112,0.6))" }, { duration: 2000, delay: 1000 });*/
  /*Velocity(swiperFade, { opacity: .5 }, { duration: 5000, delay: 500 });*/

  function drawLogoFrame() {
    Velocity(svgLogoFrame, { 'stroke-dasharray': 494 }, { duration: 2000, delay: 900 }, 'easeInOutSine');
  }

  function drawLogoSO() {
    Velocity(svgSo, { strokeOpacity: 1 }, { duration: 800, delay: 2000 });
    Velocity(svgSo, { strokeOpacity: 0, fillOpacity: 1 }, { duration: 1600, delay: 0 }, 'easeInOutSine');
    Velocity(svgScrawlon, { fillOpacity: 1 }, { duration: 1300, delay: 2800 });
  }

  function fadeInLogoGradient() {
    Velocity(svgScrawlonLogoFullGradientOne, { stopOpacity: .8 }, { duration: 1200, delay: 2800 }, 'easeInOutSine');
    Velocity(svgScrawlonLogoFullGradientTwo, { stopOpacity: .8 }, { duration: 1200, delay: 2800 }, 'easeInOutSine');
    Velocity(svgScrawlonLogoFullGradientThree, { stopOpacity: .8 }, { duration: 1200, delay: 2800 }, 'easeInOutSine');
    /*Velocity(svgScrawlonLogoFullGradientOne, { stopOpacity: .8 }, { duration: 100, delay: 100 }, 'easeInOutSine');
    Velocity(svgScrawlonLogoFullGradientTwo, { stopOpacity: .8 }, { duration: 100, delay: 100 }, 'easeInOutSine');
    Velocity(svgScrawlonLogoFullGradientThree, { stopOpacity: .8, stopColor: "#191970" }, { duration: 100, delay: 100 }, 'easeInOutSine');*/
    /* sop color #191970 */
    /*Velocity(svgScrawlonLogoFullGradientThree, { stopOpacity: .8 }, { duration: 400, delay: 1800 }, 'easeInOutSine');*/
  }
  /*Velocity(svgScrawlonLogoFull, { opacity: 0 }, { duration: 1000, delay: 1500 });*/
})();
