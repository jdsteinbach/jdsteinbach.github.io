---
title: WordPress Function for Automatically Updating Copyright Years
author: James Steinbach
layout: post
permalink: /wordpress/function-automatically-update-copyright-years/
categories:
  - WordPress
---

Well, I gave away the whole point of this post in the title. Before we dive in and look at the whole code, I'll explain the purpose of this function. A lot of posts will recommend you simply put `<?php echo date( 'Y' ); ?>` where the year is hardcoded into `footer.php`. That's fine, but it only gives you *this year* in your footer. It&#8217;s better to put the [range of years that your site's content spans](http://info.legalzoom.com/write-copyright-statement-website-21115.html), not merely the current year. The function we&#8217;ll look at here will display the entire range of years for all the posts and pages published on your site.

*[Get the raw code from this Github gist](https://gist.github.com/jdsteinbach/e2646846ede81458f0c4).*


## Adding the `copyright_years()` function to your theme

Let's take a look at the code you&#8217;ll need to copy into your theme&#8217;s `functions.php` file (without the open/close PHP tags):

~~~php
<?php
if ( ! function_exists( 'get_copyright_years' ) ) {
  function get_copyright_years( $earliest_id = null ) {
    $earliest_args = array(
      'post_type'   => array( 'any' ),
      'numberposts' => 1,
      'orderby'     => 'date',
      'order'       => 'ASC'
    );
    $get_post      = $earliest_id
                   ? get_post( $earliest_id )
                   : null;
    if ( ! $get_post ) {
      $get_post = array_shift( get_posts( $earliest_args ) );
    }
    $earliest_date = date( 'Y', strtotime( $get_post->post_date ) );
    $current_date  = date( 'Y' );
    return $earliest_date == $current_date
           ? $current_date
           : $earliest_date . '&ndash;' . $current_date;
  }
}

if ( ! function_exists( 'copyright_years' ) ) {
  function copyright_years( $earliest_id = null ) {
    echo get_copyright_years( $earliest_id );
  }
}
?>
~~~

After you&#8217;ve added those two functions to `functions.php`, open `footer.php` and delete the year if it&#8217;s hardcoded in. Replace it with `<?php copyright_years(); ?>`. This function only shows the years, no &copy; or other text: you can keep whatever copyright / &#8220;all rights reserved&#8221; text you like.

## Using the `copyright_years()` function in your footer

The first thing I should point out is that there are actually two functions here. The first function is `get_copyright_years()` and only *returns* the date range. The second function is `copyright_years()` and *echoes* the date range. If you&#8217;re going to use this function in plain HTML in your footer file, use `<?php copyright_years(); ?>`:

~~~php
<footer class="site-footer">
	<p class="footer-credits">&copy; <?php copyright_years(); ?>. All Rights Reserved.</p>
</footer>
<?php wp_footer();?>
~~~

If you&#8217;re going to use this function in a line of PHP in your footer file, use `get_copyright_years()` instead. The following code shows how you might use it inside a translatable string function:

~~~php
<footer class="site-footer">
	<p class="footer-credits">
		<?php printf( __( '&copy; %s. All Rights Reserved.', 'text-domain' ), get_copyright_years() ); ?>
	</p>
</footer>
<?php wp_footer();?>
~~~

Technically you&#8217;re done now, you can quit reading this post. But if you&#8217;re curious how this function works, stay with me.

## What the `copyright_years()` function actually does

So now that you know the basics of using this function, let&#8217;s look under the hood and learn how it works.

### Getting the earliest post

You may have noticed this function takes a single argument: `$earliest_id`. Normally the function returns the publication date for the earliest post or page published, but if you want to override that by specifying a specific post or page as the &#8220;earliest published,&#8221; pass its ID in the function in `footer.php`.

The first thing in the function is `$earliest_args`: an array of [`get_posts()`](https://codex.wordpress.org/Template_Tags/get_posts) args. If you haven&#8217;t specified an override `$earliest_id`, the function will use these arguments to query the oldest post or page from the database.

The `$get_post` declaration uses [PHP ternary logic](http://php.net/manual/en/language.operators.comparison.php#language.operators.comparison.ternary). If `$earliest_id` is set, `$get_post` will contain the output of the function `get_post( $earliest_id )`, otherwise, it will be `null`.

At this point, `$get_post` will either be a single post object (if you specified a valid `$earliest_id`) or `null` (if you specified an invalid ID or none at all). If it&#8217;s `null`, we'll run our fallback `get_posts( $earliest_args )` function. This will return an array containing a single post objects. We only want the post object, so we&#8217;ll wrap `get_posts()` in [`array_shift()`](http://php.net/manual/en/function.array-shift.php). The PHP function `array_shift()` will return only the first object in the array. *Note: [`array_pop()`](http://php.net/manual/en/function.array-pop.php) would&#8217;ve done the same thing, since there's only one object in the array.*

### Comparing the years

Now no matter what argument you did or didn&#8217;t pass into the function, `$get_post` is a WordPress post object containing the post or page we want to use for the earliest piece of published content.

The next two variables (`$earliest_date` and `$current_date`) use the PHP date function to get the year from `$get_post` and the current year.

The `return` statement uses ternary logic again. If `$earliest_date` and `$current_date` are the same, the function will return only the current year. If they&#8217;re different, it will return the earliest year, a dash (&ndash;), then the current year.

## Conclusion

Put these functions in your theme `functions.php` and call the right function from `footer.php`, and you&#8217;ve now got an always-correct copyright date range in the footer of your site. No more January updates for you! (Unless, of course, you change your theme: in that case, you&#8217;ll need to put these functions where they belong in that theme too.)

*[Get the raw code from this Github gist](https://gist.github.com/jdsteinbach/e2646846ede81458f0c4).*
