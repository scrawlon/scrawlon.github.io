var webAnimationsJs = require('web-animations-js');
var animate
var mobileNav = document.getElementById('nav-mobile');
var mobileNavToggle = document.getElementById('nav-mobile-toggle');
var mobileNavBackdrop = document.getElementById('nav-mobile-backdrop');
var html = document.querySelector('html');
var body = document.querySelector('body');
var mobileNavOpen = false;
var direction = 'normal';

mobileNavToggle.onclick = function(e) {
  if ( mobileNavOpen ) {
    direction = 'reverse';
    mobileNavOpen = false;

    [html, body].forEach(function(el) {
      el.classList.remove('no-scroll');
    });

    animatedMenuOut(direction);
    this.classList.remove('is-active')
  } else {
    direction = 'normal';
    mobileNavOpen = true;

    [html, body].forEach(function(el) {
      el.classList.add('no-scroll');
    });

    animatedMenuIn(direction);
    this.classList.add('is-active')
  }
}

function animatedMenuIn(direction) {
  mobileNavBackdrop.classList.add('visible');
  mobileNavBackdrop.animate(mobileNavBackdropAnimation, {
    direction: direction,
    duration: 600,
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

var mobileNavBackdropAnimation = [
  {
    opacity: 0
  },
  {
    opacity: 1
  }
];

var mobileNavSlideInAnimation = [
  {
    transform: 'translate(100vw, 0)'
  },
  {
    transform: 'translate(0vw, 0)'
  }
];