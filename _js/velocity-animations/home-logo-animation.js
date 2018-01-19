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

if ( sliderBackgroundWidth > 650 ) {
  animationStartOffset = 0;
}

var velocityTimeline = [
  /* scrawlon logo Full */
  {
    animation: fadeInsScrawlonLogoFull,
    startAt: 5500 - animationStartOffset,
    endAt: 7000 - animationStartOffset
  },
  {
    animation: zoomOutScrawlonLogoFull,
    startAt: 0,
    endAt: 1000
  },

  /* Swiper Color Frame */
  {
    animation: fadeOutSwiperColorFrame,
    startAt: 7800 - animationStartOffset,
    endAt: 8800 - animationStartOffset
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
    startAt: 7000 - animationStartOffset,
    endAt: 7800 - animationStartOffset
  },
  {
    animation: drawLogoSoFill,
    startAt: 0,
    endAt: 1600
  },

  /* logo gradients */
  {
    animation: fadeInLogoGradient,
    startAt: 7800 - animationStartOffset,
    endAt: 8800 - animationStartOffset
  },

  /* svgScrawlon */
  {
    animation: drawLogoScrawlon,
    startAt: 8500 - animationStartOffset,
    endAt: 9500 - animationStartOffset
  }
];

if ( sliderBackgroundWidth > 650 ) {
  velocityTimeline.push(
    /* word art */
    {
      animation: wordArt,
      startAt: 500,
      endAt: 6500
    }
  );
}

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

    if ( i === sentences.length ) {
      individualDuration += 2000;
    }

    Velocity(sentence, { opacity: 1, translateY: [0, -50] }, { duration: fadeDuration, delay: thisStart });

    if ( spans.length ) {
      var spanDuration = individualDuration / spans.length;
      spans.forEach(function(span, i) {
        Velocity(span, { opacity: 1 }, { duration: fadeDuration, delay: thisStart + sentencePause + (spanDuration * i) });
        Velocity(span, { opacity: 0 }, { duration: fadeDuration, delay: spanDuration });
      });
    }

    Velocity(sentence, { opacity: 0, translateY: '+=50' }, { duration: fadeDuration / 2, delay: ( individualDuration - (fadeDuration * 2) ) + sentencePause });
  })
}

function fadeOutSwiperColorFrame(startAt, endAt) {
  Velocity(swiperColorFrame, { opacity: .25 }, { duration: endAt - startAt, delay: startAt });
  Velocity(sliderBackgroundCaption, { opacity: 1 }, { duration: endAt - startAt, delay: startAt });
}

function fadeInsScrawlonLogoFull(startAt, endAt) {
  Velocity(svgScrawlonLogoFull, { opacity: 1, scale: 1 }, { duration: endAt - startAt, delay: startAt }, 'easeInElastic');
}

function zoomOutScrawlonLogoFull(startAt, endAt) {
  Velocity(svgScrawlonLogoFull, { scale: .8}, { duration: endAt - startAt, delay: startAt });
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
