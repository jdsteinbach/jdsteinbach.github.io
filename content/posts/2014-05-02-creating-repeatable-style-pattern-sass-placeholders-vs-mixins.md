---
title: 'Creating a Repeatable Style Pattern with Sass: Placeholders vs. Mixins'
author: James Steinbach
layout: post.html
permalink: /css/sass/creating-repeatable-style-pattern-sass-placeholders-vs-mixins/
categories:
  - Sass
sassmeister: true
---
One the biggest benefits of Sass its ability to create reusable blocks of code. I often use <a title="Sass Placeholder Selector Documentation" href="http://sass-lang.com/documentation/file.SASS_REFERENCE.html#placeholder_selectors_" target="_blank">`%placeholders`</a> or <a title="Sass Mixin Documentation" href="http://sass-lang.com/documentation/file.SASS_REFERENCE.html#mixins" target="_blank">`@mixins`</a> to create reusable code modules. (Here&#8217;s a great article on the <a title="Sass: Mixin or Placeholder? by Hugo Giraurdel" href="http://www.sitepoint.com/sass-mixin-placeholder/" target="_blank">difference between placeholders and mixins</a>. My short version: use mixins when you need to pass variables and placeholders when you don&#8217;t.)

I&#8217;m working on a site now that uses the same grid pattern in multiple pages: products, services, and industries all have the same archive layout. I don&#8217;t need any variable-controlled style, so my first thought was to use a placeholder. With Sass 3.3, you can create OOCSS/BEM selectors by referencing parent selectors with `&`. In previous versions, you could create nested selectors, now you can create new selectors:

<p class="sassmeister" data-gist-id="11478684" data-height="480">
  <a href="http://sassmeister.com/gist/11478684">Play with this gist on SassMeister.</a>
</p>

I wondered if I could do use a `%placeholder` at the top of a `&`-nested set of styles, extend that top placeholder in the container selector, and let Sass generate all the new `&`-selectors I need. Turns out that doesn&#8217;t work with generated selector names. (It would work just fine if my nested selectors were parent/child selectors.) See what I mean:

<p class="sassmeister" data-gist-id="11481882" data-height="480">
  <a href="http://sassmeister.com/gist/11481882">Play with this gist on SassMeister.</a>
</p>

Now I could use a `@mixin` to get what I want here. That would work, but it would duplicate code: each time I run the `@mixin`, I&#8217;ll get the same style properties repeated in a new place in my stylesheet. I don&#8217;t want to repeat myself. I can avoid repeating myself if I comma-chain all my parent selectors and call the `@mixin` just once:

<p class="sassmeister" data-gist-id="11482335" data-height="480">
  <a href="http://sassmeister.com/gist/11482335">Play with this gist on SassMeister.</a>
</p>

That&#8217;s almost the DRY-est way I know to do this. If you don&#8217;t need to keep your parent selectors in separate partials, you can declare them all together and run the `@mixin` on them all at once. However, if you like advanced Sass and don&#8217;t mind working extra hard, keep reading for the bonus content!

If you need to keep your parent/container selectors in separate partials, but still want to avoid repeating identical style properties, you could set an empty list variable early in your project, add parent classes to it on each individual partial where appropriate, then call the `@mixin` on that list toward the end. This gist shows what I mean:

<p class="sassmeister" data-gist-id="11483068" data-height="480">
  <a href="http://sassmeister.com/gist/11483068">Play with this gist on SassMeister.</a>
</p>

The final `@if` loop (1) makes sure `$parent-classes` isn&#8217;t empty, (2) converts all its items into a comma-separated string, and (3) calls the `@mixin` on the classes that the string contains. Now none of the `@mixin` code is repeated, all the parent classes can &#8220;live&#8221; in their own partials, and all the OOCSS/BEM sub-item classes are generated correctly.

Of course, this isn&#8217;t just for grid patterns: it applies to any nested styles you need repeated for elements with different class names. Leave a comment to let me know how else you might use this pattern. Or, if you see a better way to do this, share that too, thanks!

**Update:**

Thanks to Hugo & Stuart &#8211; Hugo posted a [comment][1] with a cleaner version that handles the parent class list in a stringier way and makes the final `@if` loop unnecessary. Stuart [recommended][2] including the `comma` to keep the list of classes comma-separated in the output.

<p class="sassmeister" data-gist-id="3e6b586921f9556856fd" data-height="480">
  <a href="http://sassmeister.com/gist/3e6b586921f9556856fd">Play with this gist on SassMeister.</a>
</p>

 [1]: http://jamessteinbach.com/css/sass/creating-repeatable-style-pattern-sass-placeholders-vs-mixins/#comment-63 "Read Hugo's comment"
 [2]: http://jamessteinbach.com/css/sass/creating-repeatable-style-pattern-sass-placeholders-vs-mixins/#comment-67 "Read Stuart's comment"
