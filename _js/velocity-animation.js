var Velocity = require('velocity-animate');

(function() {
  var svgScrawlonLogoFull = document.getElementsByClassName('scrawlon-logo-full');
  var svgScrawlonLogoFullGradientOne = document.getElementById('slf-bg-one');
  var svgScrawlonLogoFullGradientThree = document.getElementById('slf-bg-three');
  var svgSo = document.getElementsByClassName('logo-so');
  var svgScrawlon = document.getElementsByClassName('logo-scrawlon');
  var svgLogoFrame = document.getElementsByClassName('logo-frame');
  var swiperFade = document.getElementsByClassName('swiper-fade');
  var sliderBackground = document.getElementsByClassName('slider-background');

  var velocityTimeline = [
    /* sliderBackground */
    /*{
      animation: fadeInBackground,
      startAt: 500,
      endAt: 2500
    },*/

    /* svgLogoFrame */
    {
      animation: fadeInsScrawlonLogoFull,
      startAt: 500,
      endAt: 2500
    },
    {
      animation: drawLogoFrame,
      startAt: 900,
      endAt: 2900
    },

    /* svgSo */
    {
      animation: drawLogoSoOutline,
      startAt: 2000,
      endAt: 2800
    },
    {
      animation: drawLogoSoFill,
      startAt: 0,
      endAt: 1600
    },

    /* logo gradients */
    {
      animation: fadeInLogoGradient,
      startAt: 3900,
      endAt: 5000
    },

    /* svgScrawlon */
    {
      animation: drawLogoScrawlon,
      startAt: 5200,
      endAt: 6200
    }
  ];

  velocityTimeline.forEach(function(timeline) {
    timeline.animation(timeline.startAt, timeline.endAt);
  });

  /*function fadeInBackground(startAt, endAt) {
    Velocity(sliderBackground, { opacity: 1 }, { duration: endAt - startAt, delay: startAt });
  }*/

  function fadeInsScrawlonLogoFull(startAt, endAt) {
    Velocity(svgScrawlonLogoFull, { opacity: 1 }, { duration: endAt - startAt, delay: startAt });
  }

  function drawLogoFrame(startAt, endAt) {
    Velocity(svgLogoFrame, { 'stroke-dasharray': 494 }, { duration: endAt - startAt, delay: startAt }, 'easeInOutSine');
  }

  function drawLogoSoOutline(startAt, endAt) {
    Velocity(svgSo, { strokeOpacity: 1 }, { duration: endAt - startAt, delay: startAt });
  }

  function drawLogoSoFill(startAt, endAt) {
    Velocity(svgSo, { strokeOpacity: 0, fillOpacity: 1 }, { duration: endAt - startAt, delay: startAt }, 'easeInOutSine');
  }

  function fadeInLogoGradient(startAt, endAt) {
    Velocity(svgScrawlonLogoFullGradientOne, { stopOpacity: .6 }, { duration: endAt - startAt, delay: startAt }, 'easeInOutSine');
    Velocity(svgScrawlonLogoFullGradientThree, { stopOpacity: .9 }, { duration: endAt - startAt, delay: startAt }, 'easeInOutSine');
  }

  function drawLogoScrawlon(startAt, endAt) {
    Velocity(svgScrawlon, { fillOpacity: .5 }, { duration: endAt - startAt, delay: startAt });
  }
})();
