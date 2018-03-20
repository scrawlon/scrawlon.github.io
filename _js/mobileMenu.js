var webAnimationsJs = require('web-animations-js');
var animate;
var mobileNav = document.getElementById('nav-mobile');
var mobileNavMenu = mobileNav ? mobileNav.getElementsByTagName('ul') : [];
var mobileNavLinks = mobileNavMenu.length ? mobileNavMenu[0].getElementsByTagName('li') : [];
var mobileNavToggle = document.getElementById('nav-mobile-toggle');
var mobileNavBackdrop = document.getElementById('nav-mobile-backdrop');
var html = document.querySelector('html');
var body = document.querySelector('body');
var mobileNavOpen = false;
var direction = 'normal';
var mobileNavFadeInAnimation = [
  { opacity: 0, height: '0' },
  { opacity: 1, height: '5vh' }
];
var mobileNavSlideInAnimation = [
  { right: '22px', height: '5vh', width: '30px', borderRadius: '50%' },
  { right: '0', height: '100vh', width: '100vw', borderRadius: '0' }
];
var mobileNavLinksAnimation = [
  { opacity: 0 },
  { opacity: 1 }
];
var mobileNavBackdropAnimation = [
  { opacity: 0 },
  { opacity: 1 }
];

mobileNavToggle.onclick = function() {
  mobileMenuAnimate();
}

/*mobileNavBackdrop.onclick = function() {
  mobileMenuAnimate();
}*/

function mobileMenuAnimate() {
  /*setMobileNavAnimation();*/

  [html, body].forEach(function(el) {
    mobileNavOpen ? el.classList.remove('no-scroll') : el.classList.add('no-scroll');
  });

  mobileNavOpen ? animatedMenuOut('reverse') : animatedMenuIn('normal');
  mobileNavOpen ? mobileNavToggle.classList.remove('is-active') : mobileNavToggle.classList.add('is-active');

  mobileNavOpen = !mobileNavOpen;
}

/*function setMobileNavAnimation() {
  var notMobile = window.matchMedia("(min-width: 40em)");

  if ( notMobile.matches ) {
    mobileNavSlideInAnimation[1] = { transform: 'translate(60vw)' };
  } else {
    mobileNavSlideInAnimation[1] = { transform: 'translate(18vw)' };
  }
}*/

function animatedMenuIn(direction) {
  mobileNavBackdrop.classList.add('visible');
  mobileNavBackdrop.animate(mobileNavBackdropAnimation, {
    direction: direction,
    duration: 300,
    easing: 'ease-in-out',
    fill: 'forwards'
  });

  mobileNav.classList.add('visible');

  mobileNav
    .animate(mobileNavFadeInAnimation, {
      direction: direction,
      duration: 150,
      easing: 'ease-in',
      fill: 'forwards'
    });

  mobileNav
    .animate(mobileNavSlideInAnimation, {
      delay: 150,
      direction: direction,
      duration: 100,
      easing: 'ease-in',
      fill: 'forwards',
      /* composite: 'add' */
    });

  for ( var i=0; i < mobileNavLinks.length; i++ ) {
    mobileNavLinks[i].animate(mobileNavLinksAnimation, {
      direction: direction,
      duration: 50,
      easing: 'ease-in',
      fill: 'forwards'
    });
  }

  /* for ( var i=0; i < mobileNavLinks.length; i++ ) {
    (function(i) {
      setTimeout(function () {
        mobileNavLinks[i].animate(mobileNavLinksAnimation, {
          direction: direction,
          duration: 60,
          easing: 'ease-in',
          fill: 'forwards',
        });
      }, i * 60);
    })(i);
  } */
}

function animatedMenuOut(direction) {
  for ( var i=0; i < mobileNavLinks.length; i++ ) {
    mobileNavLinks[i].animate(mobileNavLinksAnimation, {
      direction: direction,
      duration: 50,
      easing: 'ease-in',
      fill: 'forwards'
    });
  }

  mobileNav
    .animate(mobileNavSlideInAnimation, {
      direction: direction,
      duration: 100,
      easing: 'ease-in',
      fill: 'forwards'
    });

  mobileNav
    .animate(mobileNavFadeInAnimation, {
      delay: 100,
      direction: direction,
      duration: 150,
      easing: 'ease-in',
      fill: 'forwards',
      /* composite: 'add' */
  }).onfinish = function() {
    mobileNav.classList.remove('visible');
  }

  mobileNavBackdrop.animate(mobileNavBackdropAnimation, {
    direction: direction,
    duration: 300,
    easing: 'ease-in-out',
    fill: 'forwards'
  }).onfinish = function() {
    mobileNavBackdrop.classList.remove('visible');
  }
}

/* requestAnimationFrame + customEvent
 * from https://developer.mozilla.org/en-US/docs/Web/Events/resize
 */

(function() {
    var throttle = function(type, name, obj) {
        obj = obj || window;
        var running = false;
        var func = function() {
            if (running) { return; }
            running = true;
             requestAnimationFrame(function() {
                obj.dispatchEvent(new CustomEvent(name));
                running = false;
            });
        };
        obj.addEventListener(type, func);
    };

    /* init - you can init any event */
    throttle("resize", "optimizedResize");
})();

// handle event
window.addEventListener("optimizedResize", function () {
  mobileNavOpen && mobileMenuAnimate();
});

/* ie 11 Custom EVent polyfill
 * from https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent#Polyfill
 */

 (function () {

   if ( typeof window.CustomEvent === "function" ) return false;

   function CustomEvent ( event, params ) {
     params = params || { bubbles: false, cancelable: false, detail: undefined };
     var evt = document.createEvent( 'CustomEvent' );
     evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
     return evt;
    }

   CustomEvent.prototype = window.Event.prototype;

   window.CustomEvent = CustomEvent;
 })();
