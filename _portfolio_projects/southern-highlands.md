---
title: Southern Highlands
site_url: https://southernhighlands.com
my_work:
  page_title: 'Home Finder'
  page_url:  https://southernhighlands.com/home-finder/?price_range=0-10000000&sort=price_DESC
screenshot: southern-highlands-090717.jpg
employer: Compulse Integrated Marketing
tags:
  - industries: ['real estate']
  - technologies: ['WordPress', 'jQuery', 'Google Maps API', 'iHomefinder IDX API', 'UnderscoreJS']
  - project_types: ['website']
published: true
featured: true
---

When we won this project, I already had some experience working
with real estate data APIs and property listing web interfaces. For this one, I was
asked to build a 'Home Finder' page -- basically a web-app-in-a-page with a fully
interactive catalog of the client's real estate listings.

On the backend, I had two main peices to code. I needed to retrieve property
data from the iHomefinder IDX API, save it to the database, and update it
automatically at regular intervals. I also needed to build custom database
queries to handle the user interaction on the 'Home Finder' web page.

On the frontend, properties were listed in an image grid format,
were filterable by
number of bedrooms and bathrooms, square feet, neighborhood, price range and
property type, and were sortable by price (high to low, low to high).
A Google Map displayed clickable markers for each property, as well. All user
interactions triggered an AJAX request to the server, and the property list was
updated with the response from my custom database queries.

The individual property listing pages were interactive as well, with a
photo slider, a mortgage calculator, a contact form, a Google map
and social sharing icons.
