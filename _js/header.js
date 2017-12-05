// Reference: http://www.html5rocks.com/en/tutorials/speed/animations/

var last_known_scroll_position = 0;
var scrollTicking = false;
var resizeTicking = false;
var socialIconsAreHidden = true;
var desktopSocialIcons = document.querySelectorAll('.nav-desktop ul.social-icons');

window.addEventListener('scroll', function(e) {
  last_known_scroll_position = window.scrollY;

  if (!scrollTicking) {
    window.requestAnimationFrame(function() {
      if ( desktopSocialIcons.length ) {
        toggleDesktopSocialIcons(last_known_scroll_position);
      }
      scrollTicking = false;
    });

    scrollTicking = true;
  }
});

function toggleDesktopSocialIcons(scrollPosition) {
  if ( hideDesktopSocialIconsOnMobile() ) {
    return;
  }

  if ( scrollPosition > 10 && !socialIconsAreHidden ) {
    desktopSocialIcons[0].style.display = 'none';
    socialIconsAreHidden = true;
  } else if ( scrollPosition < 10 && socialIconsAreHidden ) {
    desktopSocialIcons[0].style.display = 'block';
    socialIconsAreHidden = false;
  }
}

window.addEventListener('resize', function(e) {
  last_known_scroll_position = window.scrollY;

  if (!resizeTicking) {
    window.requestAnimationFrame(function() {
      if ( desktopSocialIcons.length ) {
        hideDesktopSocialIconsOnMobile()
      }
      resizeTicking = false;
    });

    resizeTicking = true;
  }
});



function hideDesktopSocialIconsOnMobile() {
  var isMobile = window.matchMedia( "(max-width: 60em)" );
  if ( isMobile.matches ) {
    desktopSocialIcons[0].style.display = 'none';
    socialIconsAreHidden = true;

    return true;
  }

  desktopSocialIcons[0].style.display = 'block';
  socialIconsAreHidden = false;

  return false;
}
