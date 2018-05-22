---
title: CSS (Sass) for Content-Agnostic Numbered Headings
author: James Steinbach
layout: post
permalink: /sass/numbered-headings/
categories:
  - CSS
  - Sass
codepen: true
---

You&#8217;re writing a blog post or other HTML document and you want to number your `h2` and `h3` elements to give users a sense of where they are in the page&#8217;s logical flow. Or perhaps you&#8217;re maintaining legal content or technical documentation that needs to have numbered `h2`, `h3`, etc elements. I suppose you could nest the content of your entire document in a bunch of nested lists, or you could write the outline-style numbering by hand. Or &hellip; perhaps there&#8217;s a better way that only requires CSS.

We&#8217;ll start by checkout the code that makes this happen. What you see below is a Sass mixin, but you can do this with just the CSS output if you like.

~~~scss
@mixin generate-outline($reset-element: body, $list-style: decimal) {
  $counter: unique-id();

  counter-increment: $counter;

  &::before {
    content: counter($counter, $list-style)'. ';
  }

  @at-root {
    #{$reset-element} {
      counter-reset: $counter;
    }
  }
}

// How to use it
h2 {
  @include generate-outline(h1, upper-alpha);
}

h3 {
  @include generate-outline(h2);
}
~~~

## Setting Up Defaults

You&#8217;ll use the `generate-outline()` mixin on each selector you want to number. The mixin takes two optional arguments: `$reset-element` and `$list-style`. `$reset-element` is the selector that you want to restart your numbering at. For example, if you want to number your `h3` elements, but restart that count everytime your markup includes an `h2`, you would call `@include generate-outline(h2);` in your `h3` declaration block. If you leave `$reset-element` empty, the mixin will default to `body`.

The second argument is `$list-style` and should be a [valid value for the CSS `list-style-type` property](https://developer.mozilla.org/en-US/docs/Web/CSS/list-style-type#Values). If you leave it blank, `$list-style` will default to `decimal`.

## Using CSS Counters

The Sass mixin `generate-outline()` automates the use of CSS counters. There are 3 CSS properties we need to use to see counters in action.

Each level of counter needs a unique name. In the Sass above, we&#8217;re creating that name by using the Sass [`unique-id()` function](http://sass-lang.com/documentation/Sass/Script/Functions.html#miscellaneous_functions). If you&#8217;re just using CSS, you&#8217;ll need to choose a different name for each level of numbering.

We can increment that counter by using `counter-increment: $name;` on the element that&#8217;ll show the counter&#8217;s number.

We&#8217;ll use the `::before` pseudoelement and the CSS `content` property to display that counter on each heading: `content: counter($name)'. ';`. Notice that we&#8217;re putting the string `'. '` on the end of each number. This makes sure we get &#8220;A. Heading&#8221; instead of &#8220;AHeading.&#8221;

For the 2nd level of numbered headings, we&#8217;ll need to reset that counter every time an element in the 1st level of headings goes by. The Sass mixin gets the position of the current level in the `$headings` map - if it&#8217;s a 2nd (or deeper) level counter, the mixin will get the next element above it, and use that element to reset the counter. If the current element is the first element in the loop, the mixin will just attach `counter-reset: $name;` to the `body` element.

## Output: Numbered Headings

With the CSS we&#8217;ve just generated, we&#8217;ve attached an A, B, C numbering system to all `h2` elements in the page, and a 1, 2, 3 numbering system to all `h3` elements in the page. This system doesn&#8217;t care what else you&#8217;ve got in your page: any paragraphs, blockquotes, other heading levels, images, etc &ndash; none of that affects this CSS&#8217;s ability to number `h2` and `h3` elements sequentially.

You can see this code in action on [this CodePen](http://codepen.io/jdsteinbach/pen/vLqwjB).

<p data-height="268" data-theme-id="0" data-slug-hash="vLqwjB" data-default-tab="result" data-user="jdsteinbach" class='codepen'>See the Pen <a href='http://codepen.io/jdsteinbach/pen/vLqwjB/'>Sass / CSS for Numbered Document Headings</a> by James Steinbach (<a href='http://codepen.io/jdsteinbach'>@jdsteinbach</a>) on <a href='http://codepen.io'>CodePen</a>.</p>