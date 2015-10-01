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

https://gist.github.com/scrawlon/62a87592c38bb2adbcc4#file-custom_options_divi-php

    <?php
    
    global $options;
    require_once( get_template_directory() . esc_attr( "/epanel/options_divi.php" ) );
    $epanel_key = "name";
    $epanel_value = "Show RSS Icon";
    
    $custom_options = array (
        array( "type" => "clearfix",),
    
        array( "name" => __( "Show GitHub Icon", $themename ),
               "id" => $shortname."_show_github_icon",
               "type" => "checkbox",
               "std" => "on",
               "desc" => __( "Here you can choose to display the GitHub Icon. ", $themename ) ),
    
        array( "name" => __( "Show LinkedIn Icon", $themename ),
               "id" => $shortname."_show_linkedin_icon",
               "type" => "checkbox2",
               "std" => "on",
               "desc" => __( "Here you can choose to display the LinkedIn Icon on your homepage. ", $themename ) ),
    
        array( "type" => "clearfix",),
    
        array( "name" => __( "GitHub Profile Url", $themename ),
               "id" => $shortname."_github_url",
               "std" => "#",
               "type" => "text",
               "validation_type" => "url",
               "desc" => __( "Enter the URL of your GitHub feed. ", $themename ) ),
    
        array( "name" => __( "LinkedIn Profile Url", $themename ),
               "id" => $shortname."_linkedin_url",
               "std" => "#",
               "type" => "text",
               "validation_type" => "url",
               "desc" => __( "Enter the URL of your LinkedIn Profile. ", $themename ) ),
    
    );
    
    foreach( $options as $index => $value ) {
        if ( $value[$epanel_key] === $epanel_value ) {
            foreach( $custom_options as $custom_index => $custom_option ) {
                $options = insertArrayIndex($options, $custom_option, $index+$custom_index+1);
            }
            break;
        }
    }
    
    function insertArrayIndex($array, $new_element, $index) {
        $start = array_slice($array, 0, $index);
        $end = array_slice($array, $index);
        $start[] = $new_element;
    
        return array_merge($start, $end);
    }
    
    return $options;
    

This is our custom options array. We're adding two new options, one for GitHub and one for LinkedIn. You could add others, but for the purpose of this tutorial, let's just focus on those. If you're curious where this code comes from, you can take a look at the original file '/wp-content/themes/Divi/epanel/options_divi.php'.

The variables $epanel_key and $epanel_value define where our custom options will appear on the admin screen. If you take a look at the original file '/wp-content/themes/Divi/epanel/options_divi.php', you'll see an array that includes the 'name' => 'Show RSS Icon' key value pair. Our options appear after RSS feed button in the admin screen. You could move the options by change the values of $epanel_key and $epanel_value.

## Make the new options available to Divi

With the custom_options_divi.php file created, we can create the new *et_load_core_options* function that puts it all together. Add the following code at the bottom of your child theme's functions.php:

    function load_custom_core_options() {
        if ( ! function_exists( 'et_load_core_options' ) ) {
            function et_load_core_options() {
                global $options;
                $options = require_once( get_stylesheet_directory() . esc_attr( "/epanel/custom_options_divi.php" ) );
            }
        }
    }
    add_action( 'after_setup_theme', 'load_custom_core_options' );
    

If you log into your WordPress admin, and open 'Divi > Theme Options > General', you should see the GitHub and LinkedIn buttons at the bottom. You can enable them and add URLs for them, but the icons won't appear on your site until we add the new icons to the template.

## Load Font Awesome icon fonts and create a new Social Media template

We're going to use the [Font Awesome icon font][5] to get all of the current social media logos. The easiest way to add this to WordPress is the [Better Font Awesome plugin][6]. Install that before continuing.

The last thing we need to do is override the Divi social icons template file. In your child theme folder, create a new folder called 'includes' and add a file called '/includes/social_icons.php'. Paste in the following code:

    <ul class="et-social-icons">
    
        <?php
            $social_sites = array(
                "facebook"  => "fa-facebook",
                "twitter"   => "fa-twitter",
                "github"    => "fa-github",
                "linkedin"  => "fa-linkedin",
                "google"    => "fa-google-plus"
            );
        ?>
    
        <?php foreach( $social_sites as $social_site => $social_icon ): ?>
            <?php if ( 'on' === et_get_option( 'divi_show_' . $social_site . '_icon', 'on' ) ) : ?>
                <li class="et-social-icon">
                    <a href="<?php echo esc_url( et_get_option( 'divi_' . $social_site . '_url', '#' ) ); ?>" target="_blank" class="icon">
                        <i class="fa <?php echo $social_icon; ?>"></i>
                    </a>
                </li>
            <?php endif; ?>
        <?php endforeach; ?>
    
        <?php if ( 'on' === et_get_option( 'divi_show_rss_icon', 'on' ) ) : ?>
        <?php
            $et_rss_url = '' !== et_get_option( 'divi_rss_url' )
                ? et_get_option( 'divi_rss_url' )
                : get_bloginfo( 'rss2_url' );
        ?>
            <li class="et-social-icon">
                <a href="<?php echo esc_url( $et_rss_url ); ?>" target="_blank" class="icon">
                    <i class="fa fa-rss"></i>
                </a>
            </li>
        <?php endif; ?>
    
    </ul>
    

Here we have an array of social networks and their associated Font Awesome icons. The code loops through the array, adding each social network that has been activated in the Divi epanel.

That's it. If you activate GitHub or LinkedIn now, their icons will should now appear in you WordPress site's header or footer (depending on your settings). In order to add other social networks, you can add them to the code in '/epanel/custom_options_divi.php' and '/includes/social_icons.php'.

 [1]: https://github.com/scrawlon/add-more-social-media-options-to-wordpress-divi-theme
 [2]: http://www.elegantthemes.com/gallery/divi/
 [3]: https://codex.wordpress.org/Pluggable_Functions
 [4]: http://www.eleganttweaks.com/learn/creating-a-child-theme/
 [5]: https://fortawesome.github.io/Font-Awesome/
 [6]: https://wordpress.org/plugins/better-font-awesome/