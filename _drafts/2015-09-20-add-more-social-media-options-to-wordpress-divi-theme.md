---
ID: 222
post_title: >
  Add more social media options to
  WordPress Divi Theme
author: Scott McGrath
post_date: 2015-09-20 22:48:21
post_excerpt: ""
layout: post
permalink: http://scrawlon.com/?p=222
published: false
---
My employer began using Divi for all new builds close to a year ago now. The Divi Builder is real game changer for web designers. It provides a selection of the most commonly used page elements that can be easily added to our designs. That said, Divi can't be everything for all people, and sometimes client's ask for the less-popular options that Divi doesn't natively support. Fortunately, the Divi codebase includes [pluggable functions][1], that permit us to customize it as needed.

**This tutorial assumes you have knowledge of WordPress and PHP, you have ftp access to your sites files, you have the Divi theme installed and you've created a Divi child theme ([learn more about child theme's here][2]).**

The first step in extending the Divi social media options, is to find and override the function that loads those options. If you look in the file 'Divi/epanel/custom_functions.php', the function we're looking for is *et_load_core_options*. The purpose of this function is to the file 'Divi/epanel/options_divi.php'. That's the code builds the options tab you see when you open the 'Divi > Theme Options > General' in your WordPress admin menu.

*While it is possible to edit that file directly, it is not recommended. Any theme file that you edit will be overwritten when you update that theme, causing your work to be lost and your site to stop working. For that reason, we'll make our changes in the child theme.*

Add the following code at the bottom of your child theme's functions.php:

    function load_custom_core_options() {
        if ( ! function_exists( 'et_load_core_options' ) ) {
            function et_load_core_options() {
                global $shortname, $options;
    
                require_once( get_template_directory() . esc_attr( "/epanel/options_{$shortname}.php" ) );
                require_once( get_stylesheet_directory() . esc_attr( "/epanel/custom_options_{$shortname}.php" ) );
    
                $options = array_merge($options, $custom_options);
            }
        }
    }
    add_action( 'after_setup_theme', 'load_custom_core_options' )
    

W Create a new folder called includes and create a files called social_icons.php. Paste in the following code:

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

 [1]: https://codex.wordpress.org/Pluggable_Functions
 [2]: http://www.eleganttweaks.com/learn/creating-a-child-theme/