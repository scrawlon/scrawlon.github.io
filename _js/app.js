var mobileNav = document.getElementById('nav-mobile');
var mobileNavToggle = document.getElementById('nav-mobile-toggle');
var mobileNavBackdrop = document.getElementById('nav-mobile-backdrop');
var html = document.querySelector('html');
var body = document.querySelector('body');

console.log('mobile nav', mobileNav);
console.log('mobile nav toggle', mobileNavToggle);

mobileNavToggle.onclick = function(e) {
  console.log('click');

  mobileNavBackdrop.classList.add('visible');

  mobileNavBackdrop.animate(mobileNavBackdropAnimation, {
    duration: 300,
    easing: 'ease-in-out',
    fill: 'forwards'
  });

  [html, body].forEach(function(el) {
    el.classList.add('no-scroll');
  });

  mobileNav.animate(mobileNavSlideInAnimation, {
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
