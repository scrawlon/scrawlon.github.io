---
ID: 673
post_title: >
  Dysfunctional WordPress Droplets on
  DigitalOcean
author: Scott McGrath
post_date: 2016-07-01 11:12:04
post_excerpt: ""
layout: post
permalink: >
  http%3a//scrawlon.dev/2016/07/01/dysfunctional-wordpress-droplets-on-digitalocean/
published: true
---
I've been a DigitalOcean user for a few years now, so when I decided to start this WordPress blog I chose the DigitalOcean WordPress One-Click Install. Unfortunately, the WordPress One-Click Install wasn't very stable out-of-the-box.

## The Symptom

Not long after creating my new WordPress droplet (a basic blog with very low expected traffic), I noticed my site was offline. This sort of thing can happen, so I just restarted the server, and didn't give it another thought.

## Chronic

Some time after, maybe a few weeks or a month later, the site went down again. I restarted again. It was at this point that the issue got worse. It became a weekly occurrence, and eventually the site wouldn't stay up for more than a few hours at a time.

Sometimes the page would just time out and other times I'd get the error ["Error establishing a database connection"][1].

## (SOME of) the Solutions

Once it became clear that the problem wasn't going away, I start looking for answers. I found a few tutorials that proved helpful.

*   [Add a swapfile][2]
*   [Optimize MySQL][3]
*   [Optimize Apache Web Server][4]
*   [Block XML-RPC attacks][5]

## Fixed?

I followed much of the advice from the above articles. I'd implement a change, restart my droplet and wait for the next crash. The results were from a few hours of uptime to a full day. None of the above changes fixed the problem, so continued searching the web for solutions to MySql and Apache running out of memory.

Tips I found on these two pages finally did the trick:

*   [Apache Performance Tuning: KeepAlive to remove latency][6]
*   [Configuring Apache/PHP/MySQL for Low Memory (RAM) VPS][7]

My site has been stable for a few months now, so it appears that something I did fixed it. Unfortunately, as these things often go, I can't say for sure what combination of the above fixes actually did the trick.

 [1]: https://www.google.com/search?num=100&espv=2&q=digitalocean%20error%20establishing%20a%20database%20connection&oq=digitalocean%20error%20establishing%20a%20database%20connection
 [2]: https://www.digitalocean.com/community/tutorials/how-to-add-swap-on-ubuntu-14-04
 [3]: https://www.digitalocean.com/community/questions/mysql-server-stops-very-frequently
 [4]: https://www.digitalocean.com/community/tutorials/how-to-optimize-apache-web-server-performance
 [5]: https://www.digitalocean.com/community/questions/error-establishing-a-database-connection-wordpress?answer=25981
 [6]: https://maanasroyy.wordpress.com/2012/05/05/apache-performance-tuning-keepalive-to-remove-latency/
 [7]: http://www.narga.net/optimizing-apachephpmysql-low-memory-server/
