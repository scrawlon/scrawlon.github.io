---
ID: 123
post_title: >
  Control Your Webcam with HTML and
  JavaScript
author: smcgrath
post_date: 2015-07-26 01:24:43
post_excerpt: ""
layout: post
permalink: >
  http://scrawlon.com/2015/07/26/control-your-webcam-with-html-and-javascript/
published: true
---
## Intro -

The more I learn about programming, the more I want to build things that are just for me. If I have access to a capable device, I want to take control of it and create the user interface that works best for me personally. Now that I have a small stack of old smartphones, tablets and laptops, it's time to experiment. Today, I'm going to look at what can I do with a webcam and a web browser.

## HTML is a still tangled mess (YAY !?)

So, HTML5 provides us with *[Navigator.getUserMedia()][1]*, so all we need to do is call that function and we're gold. Right? Hell no! Just like the pre-HTML5 days, we still have browser prefixes, API differences and Internet Explorer incompatibilities.

Let's quickly cover the top 3 browsers, so we can get to the code ASAP:

1.  **Firefox**: Browser prefix is *navigator.mozGetUserMedia*

2.  **Google Chrome**: Browser prefix is *navigator.webkitGetUserMedia*

3.  **Internet Explorer**: API is unsupported on all versions at the time of this writing, as Microsoft is focusing on an entirely separate API. This should surprise no one.

OK. That doesn't seem so bad, just use the correct browser prefix and avoid Internet Explorer. Simple. Not quite. There are further differences in the APIs between Firefox and Chrome, and if you're building a web app, you'll want it to run in all the browsers. There are shims ([for example][2]) to handle these incompatibilities, but this shouldn't be necessary.

For this basic tutorial, I'm only interested in handling the basics and making an app that works locally. Unfortunately, Google Chrome requires a running server to use the getUserMedia API. If you're using **Chrome**, continue to the *"Install a Local Server"* section. If you're using **Firefox** you can skip to *"Access the Webcam"*. If you're using Internet Explorer, you clearly haven't been reading very carefully, and I don't care what you do. ;)

## Install A Local Server

It would be nice if the makers of Google Chrome would let us access our local webcams from local html files directly, but that's not how it works. Fortunately, there are several free/simple to run local web servers. I recommend [XAMPP (Apache + MySQL + PHP + Perl)][3]. The rest of this post assumes Google Chrome users are running XAMPP, installed in c:\xampp

## Access The Webcam

There are plenty of tutorials and intros to the [HTML5 getUserMedia() API][4]. Most of the code I'll be sharing here comes directly from the API, so I recommend taking a look at that info.

First, we need an html page with some basic elements. Create a new file called *mirror.html*. If you're using Chrome, you should have XAMPP installed in c:\xampp and it should be running. Chrome users should add these new files in the c:\xampp\htdocs directory. Firefox users can create them in any directory you want (as it should be).

Keeping this as simple as possible. Add the code below to the new *mirror.html* file.

    <!DOCTYPE html>
    <html lang="en-us">
    <head>
      <meta charset="UTF-8">
    </head>
    <body>
    
      <video autoplay></video>
    
      <script src="mirror.js"></script>
    
    </body>
    </html>
    

It's just an empty page with a **video** element and a **JavaScript** file (which we will create next). If you tried to load this page now, you wouldn't see anything. That's because most of the getUserMedia() magic happens in the JavaScript. We're going to insert our webcam video into the *video* element with JavaScript.

Create a new file called *mirror.js* in the same directory as *mirror.html*:

    (function() {
      var video = document.getElementsByTagName('video')[0];
      var videoWidth = 1280;
      var videoHeight = 720;
    
      function activateWebcam(width, height) {
          var compatibleBrowser = hasUserMedia();
          var videoResolution = getBrowserVideoSettings(compatibleBrowser, width, height);
    
          if (compatibleBrowser) {
              window.URL = window.URL || window.webkitURL;
    
              navigator.getUserMedia({
                  audio: false,
                  video: videoResolution
              },
              function(stream) {
                  video.src = window.URL.createObjectURL(stream);
              },
              function(err) {
                  console.log("The following error occured: " + err.name);
              });
          } else {
              console.log("getUserMedia not supported");
          }
      }
    
      function hasUserMedia() {
          navigator.getUserMedia = navigator.getUserMedia ||
          navigator.webkitGetUserMedia ||
          navigator.mozGetUserMedia;
    
          return navigator.getUserMedia;
      }
    
     function getBrowserVideoSettings(browser, width, height) {
         if (browser === navigator.mozGetUserMedia) {
             return {
                 width: width,
                 height: height
             }
         } else {
             return {
                 mandatory: {
                     minWidth: width,
                     minHeight: height
                 }
             }
         }
      }
    
      activateWebcam(videoWidth, videoHeight);
    
    })();
    

Let's walk down through the code.

1.  First we capture the *video* element from the html file and define our webcam video resolution (1280x720 for HD video).

2.  In the main *activateWebcam()* function:

*   We have to deal with those browser prefixes and API differences. I've added two small functions to separate these details: *hasUserMedia()* and *getBrowserVideoSettings()*. The first returns the current browser's correct getUserMedia() prefix or NULL. The second returns the current browser's video resolution definition object. **These necessary alternative APIs are so similar, it's difficult to fathom that they couldn't agree to use one or the other...**

*   If *hasUserMedia()* isn't null, then we can finally call *getUserMedia()* with the appropriate video resolution object and apply the webcam video stream to our html *video* element's src.

That's it. Now, you just need to load the file in your browser.

*   In Firefox, press CTRL+O to load the *mirror.html* file.

*   In Chrome, make sure XAMPP is running and browse to http://localhost/webcam/mirror.html

You should be prompted with a webcam access prompt. Click 'Allow' or 'Share Selected Device' and your browser screen should be filled with webcam video.

## Finale - Make it a Mirror

Those are the basics to accessing your webcam with a web browser. As a finale, I'll share a few lines of CSS I found [here][5] that will flip the video horizontally. Put this in the head of the html file, and your video will appear like a mirror.

      <style>
        video {
            /* mirror video */
            -webkit-transform: scaleX(-1);
            transform: scaleX(-1);
        }
      </style>
    

If all of that worked for you, then 'cool'. You can take these basics and build on them. What else would this be useful for? You could do time lapse photography, create a security camera or a photobooth app. I hope to follow up this tutorial with those very projects soon.

If you had issues getting this to work, or want just want to discuss the code, leave a message in the comments or [hit me up on Twitter][6].

 [1]: https://developer.mozilla.org/en-US/docs/Web/API/Navigator/getUserMedia
 [2]: https://github.com/addyosmani/getUserMedia.js/
 [3]: https://www.apachefriends.org/index.html
 [4]: http://www.html5rocks.com/en/tutorials/getusermedia/intro/
 [5]: http://christianheilmann.com/2013/07/19/flipping-the-image-when-accessing-the-laptop-camera-with-getusermedia/
 [6]: https://twitter.com/scrawlon