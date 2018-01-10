---
title: Custom Post Types vs. ACF Repeater Fields
author: James Steinbach
layout: post.html
permalink: /wordpress/custom-post-types-vs-acf-repeater-fields/
categories:
  - WordPress
---
If you’ve been using WordPress to develop custom sites for long, you’ve probably needed to help clients manage custom types of content. Those content types might include events, staff members, products, FAQs or testimonials. There are three methods you might use to add those content types to the client’s Dashboard. The worst option would be to install a plugin for each one. I don’t recommend that: multiple plugins slow sites down and you’ll probably burn a lot of time making 2-3 different plugins &#8220;fit&#8221; your design.

The second method is to create a custom post type of your own. <a title="WP Types Plugin" href="http://wp-types.com/" target="_blank">Types</a>, <a title="WP Custom Post Type UI Plugin" href="https://wordpress.org/plugins/custom-post-type-ui/" target="_blank">Custom Post Type UI</a>, and <a title="WP Pods Plugin" href="http://pods.io/" target="_blank">Pods</a> are the most popular plugins for doing this. You can also use <a title="WordPress Codex: register_post_type()" href="http://codex.wordpress.org/Post_Types#Custom_Post_Types" target="_blank">the WP `register_post_type()` function</a> to add your own to any theme. Creating a custom post type will add a new menu item to the Dashboard’s left menu (similar to “Post” or “Pages”). Each item created in a custom post type will be saved as a unique “post” in WordPress’s database. You can also assign custom fields and custom taxonomies to your custom post types. For instance, you might create an FAQ category to help sort frequently asked questions, or add a field for an email to be attached to an employee profile.

<img class="aligncenter size-full wp-image-1302" src="/images/custom-post-types.png" alt="screenshot of a custom post type in the WordPress dashboard" width="800" height="440" />

Another way to allow clients to add multiple pieces of complex information to a post or page is to use the <a title="WP Advanced Custom Fields: Repeater Field" href="http://www.advancedcustomfields.com/add-ons/repeater-field/" target="_blank">Advanced Custom Fields Repeater Field</a> (this field used to be a separate premium add-on, but now is included in <a title="Advanced Custom Fields Pro" href="http://www.advancedcustomfields.com/pro/" target="_blank">ACF Pro</a>). The repeater field lets you create a custom field that accepts multiple rows of complex data. For instance, you might add a slider repeater field to a home page that allows users to add multiple images with titles and links, or an unlimited number of Q/A pairs for a Frequently Asked Questions page.

<img class="aligncenter size-full wp-image-1303" src="/images/repeater-field.png" alt="screenshot of a repeater field in the WordPress dashboard" width="890" height="580" />

The question to answer now is, which method should you use: custom post types or repeater fields? The short answer is: “It depends.” Let’s explore several criteria that help us decide whether to use a custom post type or a repeater field to manage complex input in WordPress.

## Single vs. Archive Display

Will you need to display a single item of this data in a single view, or will data always be shown in lists? If you need a single item view, a custom post type is best. WordPress easily supports custom post type single views. A post type with the slug `employee` would be displayed with a template file called `single-employee.php`. If you’ll always display the data collected in a list or archive view, however, you may be able to use a repeater field.

## Taxonomy Organization

Will you need to sort or filter this data with a taxonomy (category/tag) structure? If so, you’ll need to use a custom post type. The WordPress function <a title="WordPress Codex: register_taxonomy() function" href="http://codex.wordpress.org/Function_Reference/register_taxonomy" target="_blank"><code>register_taxonomy()</code></a> allows you to create custom category / tag structures and assign them to custom post types. (The Dashboard options pages for the plugins above allow you to do this as well.) If your data never needs to be sorted of filtered, however, you might be ok with a repeater field.

## Export Functionality

Will you want to export all the data of this type and use it in a different site? If so, you’ll want to use a custom post type. Custom post types can be exported with WordPress’s default export functionality. An ACF repeater field, on the other hand, can only be exported as post meta-data for the post or page it’s attached to.

## Reusability

How many times will you need to display this data? If you need to display items from this custom content type in multiple places in your site, a custom post type may be easier. If you need to use data from a repeater field on multiple posts or pages, you’ll want to assign that field to an options page (also part of ACF Pro) and not to a specific post or page. Since this goal can be accomplished with both custom post types and repeater fields, this is a subjective factor as well.

## Easily Re-order Content

If your client will want to manage a fixed order for items easily, a repeater field will probably be better. ACF allows them to drag and drop repeater field rows to re-order content quickly. A custom post type will have to rely on the `menu_order` post-meta field: this is usable, but not easy.

## Number of Items

This is a fairly subjective criterion. If you think adding repeater fields to accommodate all of the data necessary will be cumbersome in the editor, you’ll probably want to use a custom post type. This is entirely up to your (and your client’s) preference.

## Template Language

How do you want to write template files for this content? If you prefer the <a title="WordPress Codex: get_post() function" href="http://codex.wordpress.org/Template_Tags/get_posts" target="_blank">`get_posts()` function</a> or the <a title="WordPress Codex: WP_Query() object" href="http://codex.wordpress.org/Class_Reference/WP_Query" target="_blank">`WP_Query` object</a>, a custom post type will fit your programming style better. If you’d rather use the ACF repeater <a title="WP ACF have_rows() function" href="http://www.advancedcustomfields.com/resources/have_rows/" target="_blank"><code>while ( have_rows( 'field_name' ) ) { the_row(); }</code></a> loop on a page template, you can use a repeater field.

## Simplicity of Set-Up

I think ACF repeater fields are slightly simpler to set up than custom post types. When none of the other factors point toward custom post types, the repeater field lets me develop more quickly. This is subjective, though: you may find custom post types easier than repeater fields, and that’s OK!

## User-Friendliness

Most clients will prefer to edit content for a page on that page’s editor. If a repeater field meets all the factors above, it will make things easier for your clients. WordPress is (to those of us who develop) a pretty simple CMS, but to our clients it can be complicated and intimidating. If your custom data will only appear on one page, it’ll be easier for your clients if you attach a repeater field to that page.

## Conclusion

Most of the factors above point toward using a custom post type, but there are some situations where using a repeater field will serve your purposes as well. Other than the non-negotiable feature issues (taxonomies, exportability, etc), it’s important to choose the set-up that will be most usable for your clients. Hopefully this list helps you build a better CMS experience for your clients. Check out the flow chart below for the most important factors to consider.

<img class="aligncenter wp-image-1305 size-full" src="/images/CPT-ACF.png" alt="low chart helping developers choose custom post types of advanced custom fields repeater fields." width="1610" height="535">
