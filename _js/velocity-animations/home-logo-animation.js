var Velocity = require('velocity-animate');

var svgScrawlonLogoFull = document.getElementsByClassName('scrawlon-logo-full');
var svgScrawlonLogoFullGradientOne = document.getElementById('slf-bg-one');
var svgScrawlonLogoFullGradientThree = document.getElementById('slf-bg-three');
var svgSo = document.getElementsByClassName('logo-so');
var svgScrawlon = document.getElementsByClassName('logo-scrawlon');
var svgLogoFrame = document.getElementsByClassName('logo-frame');
var swiperColorFrame = document.getElementsByClassName('swiper-color-frame');
var swiperFade = document.getElementsByClassName('swiper-fade');
var sliderBackground = document.getElementsByClassName('slider-background');

var velocityTimeline = [
  /* sliderBackground */
  /*{
    animation: fadeInBackground,
    startAt: 500,
    endAt: 2500
  },*/

  /* word art */
  {
    animation: wordArt,
    startAt: 500,
    endAt: 6500
  },

  /* Swiper Color Frame */
  {
    animation: fadeOutSwiperColorFrame,
    startAt: 6500,
    endAt: 10500
  },

  /* svgLogoFrame */
  {
    animation: fadeInsScrawlonLogoFull,
    startAt: 8500,
    endAt: 10500
  },
  {
    animation: drawLogoFrame,
    startAt: 8900,
    endAt: 10900
  },

  /* svgSo */
  {
    animation: drawLogoSoOutline,
    startAt: 10000,
    endAt: 10800
  },
  {
    animation: drawLogoSoFill,
    startAt: 0,
    endAt: 1600
  },

  /* logo gradients */
  {
    animation: fadeInLogoGradient,
    startAt: 11900,
    endAt: 13000
  },

  /* svgScrawlon */
  {
    animation: drawLogoScrawlon,
    startAt: 13200,
    endAt: 14200
  }
];

/*function fadeInBackground(startAt, endAt) {
  Velocity(sliderBackground, { opacity: 1 }, { duration: endAt - startAt, delay: startAt });
}*/

function wordArt(startAt, endAt) {
  var sentences = document.querySelectorAll('.slide-header p');
  var totalDuration = endAt - startAt;
  var sentencePause = 500;
  var individualDuration = totalDuration / sentences.length;
  var fadeDuration = 500;

  sentences.forEach(function(sentence, i) {
    var spans = sentence.querySelectorAll('span');
    var thisStart = startAt + (individualDuration * i);
    /*var thisDuration = (individualDuration * (i + 1)) - fadeDuration;*/

    Velocity(sentence, { opacity: 1, translateY: [0, -100], fontSize: '3em' }, { duration: fadeDuration, delay: thisStart });

    if ( spans.length ) {
      var spanDuration = individualDuration / spans.length;
      spans.forEach(function(span, i) {
        Velocity(span, { opacity: 1, fontSize: '1em' }, { duration: fadeDuration, delay: thisStart + (spanDuration * i) });
        Velocity(span, { opacity: 0 }, { duration: fadeDuration, delay: spanDuration - fadeDuration });
      });
    }

    Velocity(sentence, 'reverse', { duration: fadeDuration, delay: ( individualDuration - (fadeDuration * 2) ) + sentencePause });
  })
}

function fadeOutSwiperColorFrame(startAt, endAt) {
  Velocity(swiperColorFrame, { opacity: .55 }, { duration: endAt - startAt, delay: startAt });
}

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

module.exports = {
  velocityTimeline: velocityTimeline
};
