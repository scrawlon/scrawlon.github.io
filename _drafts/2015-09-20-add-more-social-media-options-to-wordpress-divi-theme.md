---
ID: 222
post_title: >
  Add more social media options to
  WordPress Divi Theme
author: smcgrath
post_date: 2015-09-20 01:12:10
post_excerpt: ""
layout: post
permalink: http://scrawlon.com/?p=222
published: false
---
Add the following to your child theme's functions.php:

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
    
    <?php if ( 'on' === et_get_option( 'divi_show_github_icon', 'on' ) ) : ?>
        <li class="et-social-icon">
            <a href="<?php echo esc_url( et_get_option( 'divi_github_url', '#' ) ); ?>" class="icon">
                <i class="fa fa-github"></i>
            </a>
        </li>
    <?php endif; ?>
    <?php if ( 'on' === et_get_option( 'divi_show_linkedin_icon', 'on' ) ) : ?>
        <li class="et-social-icon">
            <a href="<?php echo esc_url( et_get_option( 'divi_linkedin_url', '#' ) ); ?>" class="icon">
                <i class="fa fa-linkedin"></i>
            </a>
        </li>
    <?php endif; ?>
    
    <?php if ( 'on' === et_get_option( 'divi_show_facebook_icon', 'on' ) ) : ?>
        <li class="et-social-icon et-social-facebook">
            <a href="<?php echo esc_url( et_get_option( 'divi_facebook_url', '#' ) ); ?>" class="icon">
                <span><?php esc_html_e( 'Facebook', 'Divi' ); ?></span>
            </a>
        </li>
    <?php endif; ?>
    <?php if ( 'on' === et_get_option( 'divi_show_twitter_icon', 'on' ) ) : ?>
        <li class="et-social-icon et-social-twitter">
            <a href="<?php echo esc_url( et_get_option( 'divi_twitter_url', '#' ) ); ?>" class="icon">
                <span><?php esc_html_e( 'Twitter', 'Divi' ); ?></span>
            </a>
        </li>
    <?php endif; ?>
    <?php if ( 'on' === et_get_option( 'divi_show_google_icon', 'on' ) ) : ?>
        <li class="et-social-icon et-social-google-plus">
            <a href="<?php echo esc_url( et_get_option( 'divi_google_url', '#' ) ); ?>" class="icon">
                <span><?php esc_html_e( 'Google', 'Divi' ); ?></span>
            </a>
        </li>
    <?php endif; ?>
    
    <?php if ( 'on' === et_get_option( 'divi_show_rss_icon', 'on' ) ) : ?>
    <?php
        $et_rss_url = '' !== et_get_option( 'divi_rss_url' )
            ? et_get_option( 'divi_rss_url' )
            : get_bloginfo( 'rss2_url' );
    ?>
        <li class="et-social-icon et-social-rss">
            <a href="<?php echo esc_url( $et_rss_url ); ?>" class="icon">
                <span><?php esc_html_e( 'RSS', 'Divi' ); ?></span>
            </a>
        </li>
    <?php endif; ?>
    </ul>