---
ID: 222
post_title: >
  Add more social media options to
  WordPress Divi Theme
author: Scott McGrath
post_date: 2015-09-21 06:44:52
post_excerpt: ""
layout: post
permalink: http://scrawlon.com/?p=222
published: false
---
My employer began using the WordPress [Divi theme][1] about a year ago. The Divi Builder is real game changer for web designers. It provides a selection of the most commonly used page elements that can be easily added to our designs. That said, Divi can't be everything for all people, and sometimes client's ask for the less-popular options that Divi doesn't natively support. Fortunately, the Divi codebase includes [pluggable functions][2], that permit us to customize it as needed.

**This tutorial assumes you have knowledge of WordPress and PHP, you have ftp access to your sites files, you have the Divi theme installed and you've created a Divi child theme ([learn more about child theme's here][3]).**

The first step in extending the Divi social media options, is to find and override the function that loads those options. If you look in the file '/wp-content/themes/Divi/epanel/custom_functions.php', the function we're looking for is *et_load_core_options*. The purpose of this function is to load the file '/wp-content/themes/Divi/epanel/options_divi.php'. Inside that file is the global $options array. That's the code that builds the options tab you see when you open 'Divi > Theme Options > General' in your WordPress admin menu.

*While it is possible to edit that file directly, it is not recommended. Any theme file that you edit will be overwritten when you update that theme, causing your work to be lost and your site to stop working. For that reason, we'll make our changes in the child theme.*

Our next step, is to create a custom options array and combine it with the original Divi options array. In you child theme folder create a new folder named 'includes' and add a new file named '/includes/custom_options_divi.php'. Add the following code to the new file:

    <?php
    $custom_options = array (
    
        array( "name" => "wrap-general",
               "type" => "contenttab-wrapstart",),
    
            array( "type" => "subnavtab-start",),
    
                array( "name" => "custom-1",
                       "type" => "subnav-tab",
                       "desc" => esc_html__("Custom Options",$themename)),
    
            array( "type" => "subnavtab-end",),
    
                array( "name" => "general-1",
                       "type" => "subcontent-start",),
    
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
    
                array( "name" => "general-1",
                       "type" => "subcontent-end",),
    
    );
    

This is our custom options array. We're adding two new options, one for GitHub and one for LinkedIn. You could add others, but for the purpose of this tutorial, let's just focus on those. If you're curious where this code comes from, you can take a look at the original file '/wp-content/themes/Divi/epanel/options_divi.php'.

With the custom_options_divi.php file created, we can create the new *et_load_core_options* function that puts it all together. Add the following code at the bottom of your child theme's functions.php:

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
    add_action( 'after_setup_theme', 'load_custom_core_options' );
    

The above code loads the 'options_divi.php' file and our 'custom_options_divi.php' file. It then merges the arrays, $options and $custom_options.

If you log into your WordPress admin, and open 'Divi > Theme Options > General', you should see the GitHub and LinkedIn buttons at the bottom. You can enable them and add URLs for them, but the icons won't appear on your site until we add the new icons to the template.

We're going to use the [Font Awesome icon font][4] to get all of the current social media logos. The easiest way to add this to WordPress is the [Better Font Awesome plugin][5]. Install that before continuing.

The last thing we need to do is override the Divi social icons template file. In your child theme folder, create a new folder called 'includes' and add a file called '/include/social_icons.php'. Paste in the following code:

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

 [1]: http://www.elegantthemes.com/gallery/divi/
 [2]: https://codex.wordpress.org/Pluggable_Functions
 [3]: http://www.eleganttweaks.com/learn/creating-a-child-theme/
 [4]: https://fortawesome.github.io/Font-Awesome/
 [5]: https://wordpress.org/plugins/better-font-awesome/