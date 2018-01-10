---
title: Using SVGs in WordPress
author: James Steinbach
layout: post.html
permalink: /wordpress/using-svgs-wordpress/
categories:
  - WordPress
---
SVGs are basically the bomb-diggety for vector images on the web. They&#8217;re crisp and clean at any size or resolution, making them perfect for icons, line art, or other vector artwork. Unfortunately, using SVGs in WordPress is not supported by default. This post shows you how to fix three significant issues with using SVGs in WordPress: uploading SVGs, displaying SVGs in the Editor and custom fields, and inlining SVG code in a post or page template.

## Allowing SVGs in WordPress Uploader

WordPress, however, doesn&#8217;t allow you to upload SVGs. By default, it treats them as a security risk (I&#8217;d assume this has something to do with the possibility of executing code through SVG&#8217;s XML file format, but maybe someone can leave a more detailed answer in the comments&#8230;). Step one to using SVGs in WordPress is to give the Media Library Uploader permission to upload them. The following PHP snippet (pasted in your theme&#8217;s functions.php file) will do that:

~~~php
function svg_mime_types( $mimes ) {
  $mimes['svg'] = 'image/svg+xml';
  return $mimes;}
add_filter( 'upload_mimes', 'svg_mime_types' );
~~~

That snippet comes from <a title="CSS-Tricks: Allow SVG through WordPress Uploader" href="http://css-tricks.com/snippets/wordpress/allow-svg-through-wordpress-media-uploader/" target="_blank">CSS-Tricks.com</a>.

## Displaying SVGs in WordPress Dashboard

<div id="attachment_1251" style="width: 298px" class="wp-caption alignright">
  <img class="size-medium wp-image-1251" src="/images/Screen-Shot-2014-06-23-at-4.00.54-PM-288x300.png" alt="Default display of SVGs in WordPress custom field" width="288" height="300" />
  <p class="wp-caption-text">Whoops, this SVG is huge!</p>
</div>

Now that you can successfully upload SVGs to your Media Library, you&#8217;re about to run into a pretty nasty display problem: the SVG is either too small or too big. If you put the SVG in the editor inline, you&#8217;ll end up with the default height/width attributes set to 1px × 1px: practically invisible. If, on the other hand, you&#8217;re using an SVG in a custom field, the image becomes huge, filling all the possible width of the column (and a proportional height). To fix this, we need to add some CSS to WordPress&#8217;s Dashboard. The following PHP snippet (again, added to functions.php) will accomplish that:

~~~php
function svg_size() {
  echo '<style>
    svg, img[src*=".svg"] {
      max-width: 150px !important;
      max-height: 150px !important;
    }
  </style>';
}
add_action('admin_head', 'svg_size');
~~~

What we just did was insert a small CSS declaration into every Dashboard page. The selector finds <code>&lt;svg&gt;</code> elements, as well as images with <code>.svg</code> in their src attribute. It then overrides their default attributes (1px × 1px in the Editor, no limits in a custom field) and fits them all into a 150px × 150px box.

<div id="attachment_1250" style="width: 1230px" class="wp-caption aligncenter">
  <img class="size-full wp-image-1250" src="/images/Screen-Shot-2014-06-23-at-3.58.53-PM.png" alt="Improved display of SVGs in WordPress custom field" width="1220" height="230" />
  <p class="wp-caption-text">Ah, this is much better!</p>
</div>

Note: this is only a problem if you&#8217;re optimizing your SVGs with a tool that removes the height and width attributes. You should optimize, of course! Just be aware that if your optimizer removes height/width, you&#8217;ll need to use CSS to control the layout size of the SVG on the front-end as well as here in the Dashboard.

## Inlining SVGs in WordPress Themes

Now let&#8217;s push a little farther. Let&#8217;s take a common SVG case use and solve another WordPress-related SVG issue. We&#8217;ll pretend for a moment that we&#8217;re building a website for a manufacturing company and we&#8217;re using a custom post type for each &#8220;step&#8221; in their process. Each step has an icon that&#8217;s an SVG, so we add a custom field for &#8220;Step Icon&#8221; to the post type. We want those icons to change color on hover, however. The normal dark blue color should become a medium gray. In order to transition colors on <code>:hover</code> with only CSS, we need to inline the SVG as XML in the page. Using <code>&lt;img src="image.svg"&gt;</code> or using an SVG background-image won&#8217;t allow us to control the colors with CSS. Assuming you&#8217;re using the <a title="Advanced Custom Fields WordPress Plugin" href="http://www.advancedcustomfields.com/" target="_blank">ACF plugin for your custom fields</a>, the following PHP snippet belongs in the template file you use for displaying process steps where you want to inline the SVG file:

~~~php
if ( get_field( 'step_icon' ) ) {
  $icon = get_field( 'step_icon' );
  if ( strpos( $icon, '.svg' ) !== false ) {
    $icon = str_replace( site_url(), '', $icon);
    print '<div class="step-icon">';
    include(ABSPATH . $icon);
    print '</div>';
   }
}
~~~

Of course, if you&#8217;re using a different plugin for your custom fields (Types, Pods, etc), you&#8217;ll need to change <code>get_field()</code> to whatever function that plugin provides (or use WP&#8217;s core <a title="WordPress Codex: get_post_meta()" href="http://codex.wordpress.org/Function_Reference/get_post_meta" target="_blank"><code>get_post_meta()</code></a> function). That snippet checks to make sure the image is really an SVG, then strips out the WP site_url text. (This is necessary because the <code>include()</code> function on a full http[s] url is a cross-site-scripting vulnerability.) The <code>include()</code> function prints the SVG as XML to your page&#8217;s source. The following CSS (or something similar) in your style.css will allow you to change the color on hover:

~~~css
.step-icon svg path,
.step-icon svg polygon {
  fill: #383b52; /* Your color here. */
}
.step-icon:hover svg path,
.step-icon:hover svg polygon {
  fill: #444; /* Your color here. */
}
~~~

Now you should get this delightful hover effect:

<img class="alignright size-full wp-image-1254" src="/images/svg-hover.gif" alt="CSS Hover Effects for Inline SVGs in WordPress" width="301" height="200" />

## Conclusion

There you have it: three code snippets to allow you to (1) upload SVGs to your WordPress Media Library, (2) display those SVGs nicely in Dashboard, and (3) inline those SVGs in WordPress theme files. You&#8217;ll want to be aware that <a title="Can I Use: SVG" href="http://caniuse.com/svg" target="_blank">SVGs aren&#8217;t supported by IE8 and down</a>, so you&#8217;ll need to work out a fallback if a missing SVG image would create a usability or accessibility problem.

If you&#8217;ve got questions or other great ideas for using SVGs in WordPress, please leave a comment!
