---
title: Sass Maps for Breakpoint Mixin (Update)
author: James Steinbach
layout: post
permalink: /css/sass-maps-breakpoint-mixin/
categories:
  - CSS
  - Sass
sassmeister: true
---
When I started using Sass, I was using the following breakpoint mixin. It&#8217;s pretty simple and common, gets the job done, but could probably be improved.

~~~scss
@mixin breakpoint($point) {
  @if $point == small {
    @media (min-width: 480px) { @content; }
  } @else if $point == medium {
    @media (min-width: 720px) { @content; }
  } @else if $point == large {
    @media (min-width: 960px) { @content; }
  } @else if $point == wide {
    @media (min-width: 1200px) { @content; }
  } @else {
    @warn 'Not a valid breakpoint name.';
  }
}
~~~

I wasn&#8217;t really happy about having the pixel values for the widths in the mixin itself. That data ought to be saved as variables in my `_variables.scss`, not tucked in `_mixins.scss`. So I pulled those out and made them variables. This is a little better:

~~~scss
$smallBP: 480px;
$mediumBP: 720px;
$largeBP: 960px;
$wideBP: 1200px;

@mixin breakpoint($point) {
  @if $point == small {
    @media (min-width: $smallBP) { @content; }
  } @else if $point == medium {
    @media (min-width: $mediumBP) { @content; }
  } @else if $point == large {
    @media (min-width: $largeBP) { @content; }
  } @else if $point == wide {
    @media (min-width: $wideBP) { @content; }
  } @else {
    @warn 'Not a valid breakpoint name.';
  }
}
~~~

But what if I get bored with small, medium, large, & wide? ([Maybe I&#8217;d rather use bears instead…][1]) Or maybe I just want to abstract my breakpoint names to variables too. [Sass 3.3 added Sass maps][2]: a clean way to manage an array of variable data.

Now I put all my names and sizes in `$breakpoints` as a map: each value pair inside holds a breakpoint name and width. This moves all my breakpoint data to a single item in my variables partial.

There&#8217;s another big benefit to storing all the breakpoint names and sizes in a map: I can repeat myself less in the mixin itself. In the breakpoint mixin code, I now write the basic structure just once, and let the $breakpoints map data control the previously repeated part.

~~~scss
$breakpoints: (
  small: 480px,
  medium: 720px,
  large: 960px,
  wide: 1200px
);
@mixin breakpoint($name) {
  @each $label, $size in $breakpoints {
    @if $name == $label {
      @media (min-width: $size) {
        @content;
      }
    }
  }
}
~~~

*Update*: One problem with the code above is that it fails silently. If you misspell your breakpoint name, nothing happens. No errors, no compiled styles. Just failure with no warning. I got some help from [Kitty Giraudel][3] in a [comment thread][4]. Here&#8217;s his suggested rewrite handling errors correctly:

~~~scss
$breakpoints: (
  small: 480px,
  medium: 720px,
  large: 960px,
  wide: 1200px
);
@mixin breakpoint($name) {
  @if not map-has-key($breakpoints, $name) {
    @warn "Warning: `#{$name}` is not a valid breakpoint name.";
  } @else {
    @media (min-width: map-get($breakpoints, $name)) {
      @content;
    }
  }
}
~~~

See the code in action:

<p class="sassmeister" data-gist-id="c88f9357661530a02f9b" data-height="480" data-theme="tomorrow"><a href="http://sassmeister.com/gist/c88f9357661530a02f9b">Play with this gist on SassMeister.</a></p>

 [1]: http://css-tricks.com/media-queries-sass-3-2-and-codekit/ "Chris Coyier names his media queries after bears."
 [2]: http://blog.sass-lang.com/posts/184094-sass-33-is-released "Sass 3.3 Release"
 [3]: http://kittygiraudel.com/ "Kitty Giraudel"
 [4]: http://www.sitepoint.com/css-sass-styleguide/#comment-1288013797 "My Current CSS and Sass Styleguide"
