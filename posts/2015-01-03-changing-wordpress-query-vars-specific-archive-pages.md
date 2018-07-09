---
title: Changing WordPress Query Vars for Specific Archive Pages
author: James Steinbach
layout: post
permalink: /wordpress/changing-wordpress-query-vars-specific-archive-pages/
categories:
  - WordPress
---
When you develop a WordPress theme with multiple custom post types or taxonomies, you&#8217;ll inevitably find yourself needing to change some query vars for specific archives. For example, you may want to change the default blog archive from 10 posts to 5, but on the archive page that displays portfolio items, you want to show the most recent 12 items. On the staff page, you want to sort people by menu order with no post limit. The recommended resources page should sort posts alphabetically without a post limit. You could set all those archive pages up by building a <a title="WordPress Codex: Custom Page Template" href="http://codex.wordpress.org/Page_Templates" target="_blank">custom page template</a> that uses a <a title="WordPress Codex: WP_Query" href="http://codex.wordpress.org/Class_Reference/WP_Query" target="_blank">new WP_query</a> with custom vars for each one, and assigning a Page to each template.

A cleaner solution is to use WordPress&#8217;s own <a title="WordPress Codex: Template Hierarchy" href="http://codex.wordpress.org/Template_Hierarchy" target="_blank">template hierarchy</a> to generate archives for each post type. For your custom post types (slugs: portfolio, staff, resource), you&#8217;d create `archive-portfolio.php`, `archive-staff.php`, and `archive-resource.php`. Those archive template files will be used whenever WordPress&#8217;s permalink URLs are used to call archives for each post type. By default, they&#8217;ll use WordPress&#8217;s default query vars: limit to 10 posts (or whatever number is saved in Settings > Reading) in descending order by date. We can add (and adjust) the following snippet in `functions.php` to modify the query vars used on each of those template pages:

~~~php
add_action( 'pre_get_posts', 'custom_query_vars' );
function custom_query_vars( $query ) {
  if ( !is_admin() && $query->is_main_query() {
    if ( get_post_type() == 'portfolio' ) {
      $query->set( 'posts_per_page', 12 );
    }
    if ( get_post_type() == 'staff' ) {
      $query->set( 'posts_per_page', -1 );
      $query->set( 'orderby', 'menu_order' );
      $query->set( 'order', 'ASC' );
    }
    if ( get_post_type() == 'resource' ) {
      $query->set( 'posts_per_page', -1 );
      $query->set( 'orderby', 'title' );
      $query->set( 'order', 'ASC' );
    }
  }
  return $query;
}
~~~

The first line of code in that block adds the function `custom_query_vars()` to the <a title="WordPress Codex: Action - pre_get_posts" href="http://codex.wordpress.org/Plugin_API/Action_Reference/pre_get_posts" target="_blank">`pre_get_posts`</a> WordPress action: any time WordPress runs a post query, our custom function will run with the ability to modify query vars.

In our custom function, the first thing we do is use an `if` statement to limit where our modifications happen. The `!is_admin()` condition prevents custom query modifications from affecting the Dashboard. The `$query->is_main_query()` condition makes sure our changes only happen to the main query on a given archive page (for example, sidebar widgets won&#8217;t be affected by our tweaks).

Inside that condition, we&#8217;ve got the three `if` statements we&#8217;ll need to modify each of our custom post type archives. Inside of each `if`, we use `$query->set()`; to change the appropriate query vars. For portfolio items, we change the `posts_per_page` var to 12. For the staff archive, we remove the post limit (`'posts_per_page', -1`) and order items by `menu_order` in ascending order. For resource archive pages, we remove the post limit and order posts by their title in ascending order (alphabetical).

> Note: `$query->set( $var, $value );` is simply a WordPress alias function for `query_vars[$var] = $value;`. The function `set_query_var( $var, $value );` does the same thing, but can run outside of the `pre_get_posts` action.

This code snippet can also change query vars on individual categories. For example, if you wanted the posts in a specific blog category to be ordered differently, you&#8217;d replace `if ( get_post_type() == $post_type )` with `if ( is_category( $category_slug ) )`. For a custom taxonomy, you could use `if ( is_tax( $taxonomy, $term ) )`. WordPress has several <a title="WordPress Codex: Conditional Tags" href="http://codex.wordpress.org/Conditional_Tags" target="_blank">conditional tags</a> you can use to modify specific queries.
