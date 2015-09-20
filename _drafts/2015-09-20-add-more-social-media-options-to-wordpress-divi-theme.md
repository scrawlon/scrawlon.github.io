---
ID: 222
post_title: >
  Add more social media options to
  WordPress Divi Theme
author: smcgrath
post_date: 2015-09-20 18:52:02
post_excerpt: ""
layout: post
permalink: http://scrawlon.com/?p=222
published: false
---
First thing we neeAdd the following to your child theme's functions.php:

    add_action( 'after_setup_theme', 'load_custom_core_options' );
    
    function load_custom_core_options() {
        function et_load_core_options() {
            global $shortname, $options;
    
            require_once( get_template_directory() . esc_attr( "/epanel/options_{$shortname}.php" ) );
            require_once( get_stylesheet_directory() . esc_attr( "/epanel/custom_options_{$shortname}.php" ) );
    
            $options = array_merge($options, $custom_options);
        }
    }
    

Create a new folder called includes and create a files called social_icons.php. Paste in the following code:

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