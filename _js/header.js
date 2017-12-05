// Reference: http://www.html5rocks.com/en/tutorials/speed/animations/

var last_known_scroll_position = 0;
var ticking = false;
var socialIconsAreHidden = false;

window.addEventListener('scroll', function(e) {
  last_known_scroll_position = window.scrollY;
  var desktopSocialIcons = document.querySelectorAll('.nav-desktop ul.social-icons');

  if (!ticking) {
    window.requestAnimationFrame(function() {
      if ( last_known_scroll_position > 20 && !socialIconsAreHidden ) {
        desktopSocialIcons[0].style.display = 'none';
        socialIconsAreHidden = true;
      } else if ( last_known_scroll_position < 20 && socialIconsAreHidden ) {
        desktopSocialIcons[0].style.display = 'block';
        socialIconsAreHidden = false;
      }
      ticking = false;
    });

    ticking = true;
  }
});
