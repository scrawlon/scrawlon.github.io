---
ID: 1724
post_title: Swiper JS Fullscreen Image Slider
author: Scott McGrath
post_excerpt: >
  Create an image slider with a fullscreen
  view.
layout: post
published: true
post_date: 2017-07-29 18:22:47
---

Image slideshows are ubiquitous in modern web design. The ["Swiper"][1] JavaScript library is a simple lightweight solution. Here, I'm going to create an image slider with a fullscreen viewing option.

The set up is pretty straightforward, include the CSS and JS libraries (we're including jQuery as well for this tuturial). Then add your Swiper html and an init script that tells the Swiper library how to build your slideshow. You can see many examples at the [Swiper demos page.][2]

Let's take a look at a basic slideshow example I made on CodePen. It's really just a few divs initialized with SwiperJS code. You can add as many "swiper-slide" divs as you want with text and images and html. See the [ API documentation][3] for more info of the settings.

(use the 'edit on CodePen' button to view the code in another browser tab)

<p data-height="482" data-theme-id="0" data-slug-hash="WErovE" data-default-tab="html,result" data-user="smcgrath" data-embed-version="2" data-pen-title="WErovE" class="codepen">
  See the Pen <a href="https://codepen.io/smcgrath/pen/WErovE/">WErovE</a> by Scott McGrath (<a href="https://codepen.io/smcgrath">@smcgrath</a>) on <a href="https://codepen.io">CodePen</a>.
</p>

<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script> <script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

Compare that with the code below. As you can see, it doesn't take much to build a working image slider with a fullscreen view.

<p data-height="524" data-theme-id="0" data-slug-hash="aydBNx" data-default-tab="html,result" data-user="smcgrath" data-embed-version="2" data-pen-title="aydBNx" class="codepen">
  See the Pen <a href="https://codepen.io/smcgrath/pen/aydBNx/">aydBNx</a> by Scott McGrath (<a href="https://codepen.io/smcgrath">@smcgrath</a>) on <a href="https://codepen.io">CodePen</a>.
</p>

<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script> You'll notice that I've moved the CSS and JavaScript out of the html markup, and into the separate windows in the CodePen editor. This is just to make it easier to view. You could place this code directly in the html markup, or create .css and .js files that you can include.

Let's examine the html first. There's a ".swiper-container" div with three slides. Each slide has a numbered 'id'. Inside each slide is an image and a caption. Below the .'swiper-container' are two empty divs, "#fullscreen-swiper" and "#fullscreen-swiper-backdrop".

Now, let's look at the JavaScript. First we define and initialize the main swiper, "var swiper = new Swiper...". This is the swiper that appears when we load the page. The init script includes pagination, next/prevButton, and it calls for our slideshow to have 2 'slidesPerView'.

Next I have a jQuery 'onClick' function attached to the '.swiper-container .swiper-slide' element. When a slide is clicked, this code grabs the slide's id attribute and passes it to the 'openFullscreenSlider' function.

The first thing the 'openFullscreenSlider' function does is copy the html markup in the '.swiper-container' div and cache it in the "mainSwiperMarkup" variable. We use jQuery to append this markup (plus the "X" div) to our '#fullscreen-swiper' div. Then we call a Swiper init script on the '#fullscreen-swiper' div, "var fullscreenSwiper = new Swiper..." Notice, the '#fullscreen-swiper' is slightly different than the main swiper. It has only 1 'slidesPerView' and has an 'initialSlide' definition. The 'initialSlide' tells Swiper which slide to open the slider to. Since Swiper slides are zero-indexed, we subtract 1 from the id passed to the function (slide 1 = index 0, slide 2 = index 1, etc.).

The remainder of the code manages the fullscreen lightbox experience. Fade in the black '#fullscreen-swiper-backdrop'. Add a 'no-scroll' class to 'html and body' elements. Add a click event to the 'X' close button that removes the '#fullscreen-swiper', fades out the backdrop and removes the 'no-scroll' class.

 [1]: http://idangero.us/swiper/
 [2]: http://idangero.us/swiper/demos/
 [3]: http://idangero.us/swiper/api/
