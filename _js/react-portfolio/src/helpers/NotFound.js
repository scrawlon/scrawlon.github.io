import React from 'react';

function NotFound() {
  var backgroundImage404 = {
    backgroundImage: 'url(' + document.location.origin + '/images/404-image.jpg)',
    backgroundSize: 'cover'
  }
  return (
    <header className="full-height" style={backgroundImage404} title="On the run">
      <div className="backdrop"></div>
      <div className="wrapper">
        <h1>404</h1>
        <h2 className="subheading">Page Not Found</h2>
      </div>

      <figcaption>
        PHOTO CREDIT:

        <a href="https://flic.kr/p/rp9WC6" title="On the run" target="_blank" rel="noopener noreferrer">
          "On the run"
        </a>

        <a href="https://www.flickr.com/photos/53267244@N03/" title="Erik" target="_blank" rel="noopener noreferrer">
          by Erik
        </a>
        on Flickr

        <a href="https://creativecommons.org/licenses/by/2.0/" title="Creative Commons" target="_blank" rel="noopener noreferrer">
          (Creative Commons)
        </a>
      </figcaption>
    </header>
  );
}

export default NotFound;
