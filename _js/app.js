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

    animatedMenu(direction);
    mobileNavBackdrop.classList.remove('visible');
    this.classList.remove('is-active')
  } else {
    direction = 'normal';
    mobileNavOpen = true;

    [html, body].forEach(function(el) {
      el.classList.add('no-scroll');
    });

    animatedMenu(direction);
    mobileNavBackdrop.classList.add('visible');
    this.classList.add('is-active')
  }
}

function animatedMenu(direction) {
  mobileNavBackdrop.animate(mobileNavBackdropAnimation, {
    direction: direction,
    duration: 200,
    easing: 'ease-in-out',
    fill: 'forwards'
  });

  mobileNav.animate(mobileNavSlideInAnimation, {
    direction: direction,
    duration: 400,
    easing: 'ease-in-out',
    fill: 'forwards'
  });
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
