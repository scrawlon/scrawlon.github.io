var Velocity = require('velocity-animate');

var sliderBackground = document.getElementsByClassName('slider-background');
var sliderBackgroundCaption = document.getElementsByTagName('figcaption');
var sliderBackgroundWidth = sliderBackground.length ? sliderBackground[0].offsetWidth : 0;

if ( !sliderBackgroundWidth ) { return; }

var svgScrawlonLogoFull = document.getElementsByClassName('scrawlon-logo-full');
var svgScrawlonLogoFullGradientOne = document.getElementById('slf-bg-one');
var svgScrawlonLogoFullGradientThree = document.getElementById('slf-bg-three');
var svgSo = document.getElementsByClassName('logo-so');
var svgScrawlon = document.getElementsByClassName('logo-scrawlon');
var svgLogoFrame = document.getElementsByClassName('logo-frame');
var swiperColorFrame = document.getElementsByClassName('swiper-color-frame');
var swiperFade = document.getElementsByClassName('swiper-fade');
var animationStartOffset = 5000;

var velocityTimeline = [
  /* scrawlon logo Full */
  {
    animation: fadeInsScrawlonLogoFull,
    startAt: 5500 - animationStartOffset,
    endAt: 7000 - animationStartOffset
  },

  /* Swiper Color Frame */
  {
    animation: fadeOutSwiperColorFrame,
    startAt: 7200 - animationStartOffset,
    endAt: 8200 - animationStartOffset
  },

  /* svgLogoFrame */
  {
    animation: drawLogoFrame,
    startAt: 5900 - animationStartOffset,
    endAt: 7900 - animationStartOffset
  },

  /* svgSo */
  {
    animation: drawLogoSoOutline,
    startAt: 7200 - animationStartOffset,
    endAt: 8200 - animationStartOffset
  },

  /* logo gradients */
  {
    animation: fadeInLogoGradient,
    startAt: 8200 - animationStartOffset,
    endAt: 9000 - animationStartOffset
  },

  /* svgScrawlon */
  {
    animation: drawLogoScrawlon,
    startAt: 8200 - animationStartOffset,
    endAt: 9000 - animationStartOffset
  }
];

function fadeOutSwiperColorFrame(startAt, endAt) {
  Velocity(swiperColorFrame, { opacity: .25 }, { duration: endAt - startAt, delay: startAt });
  Velocity(sliderBackgroundCaption, { opacity: 1 }, { duration: endAt - startAt, delay: startAt });
}

function fadeInsScrawlonLogoFull(startAt, endAt) {
  Velocity(svgScrawlonLogoFull, { opacity: 1, scale: 1 }, { duration: endAt - startAt, delay: startAt }, 'easeInElastic');
  Velocity(svgScrawlonLogoFull, { scale: .8}, { duration: 1000, delay: 0 });
}

function drawLogoFrame(startAt, endAt) {
  Velocity(svgLogoFrame, { 'stroke-dasharray': 494 }, { duration: endAt - startAt, delay: startAt }, 'easeInOutSine');
}

function drawLogoSoOutline(startAt, endAt) {
  Velocity(svgSo, { strokeOpacity: 1 }, { duration: endAt - startAt, delay: startAt });
  Velocity(svgSo, { strokeOpacity: 0, fillOpacity: 1 }, { duration: 1600, delay: 0 }, 'easeInOutSine');
}

function fadeInLogoGradient(startAt, endAt) {
  Velocity(svgScrawlonLogoFullGradientOne, { stopOpacity: .6 }, { duration: endAt - startAt, delay: startAt }, 'easeInOutSine');
  Velocity(svgScrawlonLogoFullGradientThree, { stopOpacity: .9 }, { duration: endAt - startAt, delay: startAt }, 'easeInOutSine');
}

function drawLogoScrawlon(startAt, endAt) {
  Velocity(svgScrawlon, { fillOpacity: .5 }, { duration: endAt - startAt, delay: startAt });
}

module.exports = {
  velocityTimeline: velocityTimeline
};
