---
ID: 222
post_title: >
  Add more social media options to
  WordPress Divi Theme
author: smcgrath
post_date: 2015-09-20 01:09:48
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