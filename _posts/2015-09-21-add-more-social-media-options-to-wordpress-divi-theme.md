---
ID: 222
post_title: >
  Add more social media options to
  WordPress Divi Theme
author: Scott McGrath
post_date: 2015-09-21 23:08:57
post_excerpt: "A tutorial on the Divi theme's pluggable functions, focused on extending the header/foooter social media options."
layout: post
permalink: >
  http://scrawlon.com/2015/09/21/add-more-social-media-options-to-wordpress-divi-theme/
published: true
---
Code from this guide is available on [GitHub][1].

## The Divi Builder (really good, but not perfect)

My employer began using the WordPress [Divi theme][2] about a year ago. The Divi Builder is real game changer for web designers. It provides a selection of the most commonly used page elements that can be easily added to our designs. That said, Divi can't be everything for all people, and sometimes client's ask for the less-popular options that Divi doesn't natively support. Fortunately, the Divi codebase includes [pluggable functions][3], that permit us to customize it as needed.

**This tutorial assumes you have knowledge of WordPress and PHP, you have ftp access to your site's files, you have the [Divi theme][2] installed and you've created a Divi child theme ([learn more about child theme's here][4]).**

## Find the Divi epanel options files

The first step in extending the Divi social media options, is to find and override the function that loads those options. If you look in the file '/wp-content/themes/Divi/epanel/custom_functions.php', the function we're looking for is *et_load_core_options*. The purpose of this function is to load the file '/wp-content/themes/Divi/epanel/options_divi.php'. Inside that file is the global $options array. That's the code that builds the options tab you see when you open 'Divi > Theme Options > General' in your WordPress admin menu.

*While it is possible to edit that file directly, it is not recommended. Any theme file that you edit will be overwritten when you update that theme, causing your work to be lost and your site to stop working. For that reason, we'll make our changes in the child theme.*

## Create the custom epanel options file

Our next step, is to create a custom options array and combine it with the original Divi options array. In your child theme folder create a new folder named 'epanel' and add a new file named '/epanel/custom_options_divi.php'. Add the following code to the new file:

[embed]https://gist.github.com/62a87592c38bb2adbcc4?file=custom_options_divi.php[/embed]

This is our custom options array. We're adding two new options, one for GitHub and one for LinkedIn. You could add others, but for the purpose of this tutorial, let's just focus on those. If you're curious where this code comes from, you can take a look at the original file '/wp-content/themes/Divi/epanel/options_divi.php'.

The variables $epanel_key and $epanel_value define where our custom options will appear on the admin screen. If you take a look at the original file '/wp-content/themes/Divi/epanel/options_divi.php', you'll see an array that includes the 'name' => 'Show RSS Icon' key value pair. Our options appear after RSS feed button in the admin screen. You could move the options by change the values of $epanel_key and $epanel_value.

## Make the new options available to Divi

With the custom_options_divi.php file created, we can create the new *et_load_core_options* function that puts it all together. Add the following code at the bottom of your child theme's functions.php:

[embed]https://gist.github.com/62a87592c38bb2adbcc4?file=functions.php[/embed]

If you log into your WordPress admin, and open 'Divi > Theme Options > General', you should see the GitHub and LinkedIn buttons at the bottom. You can enable them and add URLs for them, but the icons won't appear on your site until we add the new icons to the template.

## Load Font Awesome icon fonts and create a new Social Media template

We're going to use the [Font Awesome icon font][5] to get all of the current social media logos. The easiest way to add this to WordPress is the [Better Font Awesome plugin][6]. Install that before continuing.

The last thing we need to do is override the Divi social icons template file. In your child theme folder, create a new folder called 'includes' and add a file called '/includes/social_icons.php'. Paste in the following code:

[embed]https://gist.github.com/62a87592c38bb2adbcc4?file=social_icons.php[/embed]

Here we have an array of social networks and their associated Font Awesome icons. The code loops through the array, adding each social network that has been activated in the Divi epanel.

That's it. If you activate GitHub or LinkedIn now, their icons will should now appear in you WordPress site's header or footer (depending on your settings). In order to add other social networks, you can add them to the code in '/epanel/custom_options_divi.php' and '/includes/social_icons.php'.

 [1]: https://gist.github.com/scrawlon/62a87592c38bb2adbcc4
 [2]: http://www.elegantthemes.com/gallery/divi/
 [3]: https://codex.wordpress.org/Pluggable_Functions
 [4]: http://www.eleganttweaks.com/learn/creating-a-child-theme/
 [5]: https://fortawesome.github.io/Font-Awesome/
 [6]: https://wordpress.org/plugins/better-font-awesome/