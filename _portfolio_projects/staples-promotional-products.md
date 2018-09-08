---
title: Staples Promotional Products (mobile)
site_url:
my_work:
screenshot: staples-promotional-products-090717.jpg
employer: Compulse Integrated Marketing
tags:
  - industries: ['ecommerce']
  - technologies: ['Laravel', 'JavaScript', 'UnderscoreJS', 'BackboneJS', 'Amazon AWS']
  - project_types: ['website']
published: false
---

Obviously, Staples is a big client to win, so it was decided that
our lead designers and developers at the time would handle this project alone.
They made a valiant effort but, as the deadline loomed, there were a few
loose ends they needed to hand off to the rest of the development team.

Much of the site was complete by the time they brought me in.
The storefront was built with Laravel on the backend and BackboneJS
on the frontend. The products were loaded in the database, and
displaying correctly in the browser. All they needed from me was the code to
make the product color filter work.

It seemed simple enough. I just needed to create a clickable menu that included
all of the unique colors from the products database. When a user chose a color,
the products list would only display the products that matched
 -- _nothing_ is ever that simple in this business. Though we thought this
 would be a simple frontend coding effort, I ended up needing to dive into the
 Laravel code.

What we didn't realize at first, was that the products didn't have a standard
naming convention for color. They offered a large variety of products
(from usb drives and sunglasses to t-shirts and pens), so it would make sense
that these might use differing color names, but
it's not something you notice until you're really examining the data.
As it turned out, if there were 200 items on a page, they might all have
different color names, and we couldn't have a color filter with that many
options.

Fortunately, there was a second product field related to color, the
"color swatch image url". What I found was that some of the products with similar
"color names" might actually share the same "color swatch image url".
For example, there might be 10 blue items with different color names
(sea blue, light blue, cornflower blue, etc.),
but the color swatch was the same. I was able to use that to query the database,
iterate over the products and create a list of unique color swatches and the
color names that mapped to them.

Once I had that, I was able code up the BackboneJS frontend for the color filter
and tie it all together.
