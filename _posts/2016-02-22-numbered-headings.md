---
title: CSS (Sass) for Content-Agnostic Numbered Headings
author: James Steinbach
layout: post
permalink: /sass/numbered-headings/
categories:
  - CSS
  - Sass
---

You&#8217;re writing a blog post or other HTML document and you want to number your `h2` and `h3` elements to give users a sense of where they are in the page&#8217;s logical flow. Or perhaps you&#8217;re maintaining legal content or technical documentation that needs to have numbered `h2`, `h3`, etc elements. I suppose you could nest the content of your entire document in a bunch of nested lists, or you could write the outline-style numbering by hand. Or &hellip; perhaps there&#8217;s a better way that only requires CSS.

We&#8217;ll start by checkout the code that makes this happen. What you see below is a Sass mixin, but you can do this with just the CSS output if you like.

~~~scss
$headings: (
  h2: upper-alpha,
  h3: decimal
);

@mixin generate-outline( $headings ) {
  @each $el, $style in $headings {
    $counter: unique-id();
    $int: index(map-keys($headings), $el);
    $prev-el: if($int > 1, nth(map-keys($headings), $int - 1), body);

    #{$prev-el} {
      counter-reset: $counter;
    }

    #{$el} {
      counter-increment: $counter;

      &::before {
        $style: if($style, $style, decimal);
        content: counter($counter, $style)'. ';
      }
    }
  }
}

@include generate-outline($headings);
~~~

## Setting Up Defaults

The first thing we&#8217;re doing is setting the `$headings` map to hold our config. Each line in the map has a **key** which is the selector you want to attach an outline number to, and a **value** which is the style you want the number to appear in. The number style should be chosen from the [CSS `list-style-type` options](https://developer.mozilla.org/en-US/docs/Web/CSS/list-style-type#Values).

The Sass mixin we&#8217;ll use next expects items in this map to be in the same order as your intended content hierarchy. In other words, in our example here, every `h2` will reset the count for the `h3` elements. If we added `h4: lower-roman` to the map, every `h3` would reset the count for `h4` elements.

## Using CSS Counters

The Sass mixin `generate-outline()` automates the use of CSS counters. There are 3 CSS properties we need to use to see counters in action.

Each level of counter needs a unique name. In the Sass above, we&#8217;re creating that name by using the Sass [`unique-id()` function](http://sass-lang.com/documentation/Sass/Script/Functions.html#miscellaneous_functions). If you&#8217;re just using CSS, you&#8217;ll need to choose a different name for each level of numbering.

We can increment that counter by using `counter-increment: $name;` on the element that&#8217;ll show the counter&#8217;s number.

We&#8217;ll use CSS `content` to display that counter on each heading: `content: counter($name)'. ';`. Notice that we&#8217;re putting the string `'. '` on the end of each number. This makes sure we get &#8220;A. Heading&#8221; instead of &#8220;AHeading.&#8221;

For the 2nd level of numbered headings, we&#8217;ll need to reset that counter every time an element in the 1st level of headings goes by. The Sass mixin gets the position of the current level in the `$headings` map - if it&#8217;s a 2nd (or deeper) level counter, the mixin will get the next element above it, and use that element to reset the counter. If the current element is the first element in the loop, the mixin will just attach `counter-reset: $name;` to the `body` element.

## Output: Numbered Headings

With the CSS we&#8217;ve just generated, we&#8217;ve attached an A, B, C numbering system to all `h2` elements in the page, and a 1, 2, 3 numbering system to all `h3` elements in the page. This system doesn&#8217;t care what else you&#8217;ve got in your page: any paragraphs, blockquotes, other heading levels, images, etc &ndash; none of that affects this CSS&#8217;s ability to number `h2` and `h3` elements sequentially.

You can see this code in action on [this CodePen](http://codepen.io/jdsteinbach/pen/vLqwjB).

<p data-height="268" data-theme-id="0" data-slug-hash="vLqwjB" data-default-tab="result" data-user="jdsteinbach" class='codepen'>See the Pen <a href='http://codepen.io/jdsteinbach/pen/vLqwjB/'>Sass / CSS for Numbered Document Headings</a> by James Steinbach (<a href='http://codepen.io/jdsteinbach'>@jdsteinbach</a>) on <a href='http://codepen.io'>CodePen</a>.</p>