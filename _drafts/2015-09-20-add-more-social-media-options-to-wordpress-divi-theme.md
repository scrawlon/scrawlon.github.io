---
ID: 222
post_title: >
  Add more social media options to
  WordPress Divi Theme
author: smcgrath
post_date: 2015-09-20 01:15:54
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
    
    <!-- These are the new Social Media Options -->yy
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
    <!-- END new Social Media Options -->