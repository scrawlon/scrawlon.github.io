var webAnimationsJs = require('web-animations-js');
var animate
var mobileNav = document.getElementById('nav-mobile');
var mobileNavToggle = document.getElementById('nav-mobile-toggle');
var mobileNavBackdrop = document.getElementById('nav-mobile-backdrop');
var html = document.querySelector('html');
var body = document.querySelector('body');
var mobileNavOpen = false;
var direction = 'normal';

var mobileNavBackdropAnimation = [
  {
    opacity: 0
  },
  {
    opacity: 0.8
  }
];

var mobileNavSlideInAnimation = [
  {
    transform: 'translate(100vw)'
  },
  {
    transform: 'translate(60vw)'
  }
];

mobileNavToggle.onclick = function() {
  mobileMenuAnimate();
}

mobileNavBackdrop.onclick = function() {
  mobileMenuAnimate();
}

function mobileMenuAnimate() {
  [html, body].forEach(function(el) {
    mobileNavOpen ? el.classList.remove('no-scroll') : el.classList.add('no-scroll');
  });

  mobileNavOpen ? animatedMenuOut('reverse') : animatedMenuIn('normal');
  mobileNavOpen ? mobileNavToggle.classList.remove('is-active') : mobileNavToggle.classList.add('is-active');

  mobileNavOpen = !mobileNavOpen;
}

function animatedMenuIn(direction) {
  mobileNavBackdrop.classList.add('visible');
  mobileNavBackdrop.animate(mobileNavBackdropAnimation, {
    direction: direction,
    duration: 300,
    easing: 'ease-in-out',
    fill: 'forwards'
  });

  mobileNav.animate(mobileNavSlideInAnimation, {
    direction: direction,
    duration: 300,
    easing: 'ease-in-out',
    fill: 'forwards'
  });
}

function animatedMenuOut(direction) {
  mobileNav.animate(mobileNavSlideInAnimation, {
    direction: direction,
    duration: 300,
    easing: 'ease-in-out',
    fill: 'forwards'
  });

  mobileNavBackdrop.animate(mobileNavBackdropAnimation, {
    direction: direction,
    duration: 300,
    easing: 'ease-in-out',
    fill: 'forwards'
  }).onfinish = function() {
    mobileNavBackdrop.classList.remove('visible');
  }
}
