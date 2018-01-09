---
title: 'CSS Snippet for “Animating” both Display and Transform'
author: James Steinbach
layout: post
permalink: /css/snippet-animate-display-transform/
categories:
  - CSS
codepen: true
---
I often find myself needing to change an element from `display: none;` to `display: block;` *and* transition some `transform` properties on it. (Especially menu drop-downs&hellip;) Unfortunately, if you attempt to change `display` and `transform` at the same time, `display` “wins”: the element appears, but nothing gets transitioned.

I’ve been able to work around that by using an animation instead of a transition:

~~~css
@keyframes grow {
  0% {
    display: none;
    opacity: 0;
  }
  1% {
    display: block;
    opacity: 0;
    transform: scale(0);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
/* Add your own prefixes */
~~~

I use the first percent of the animation to change the `display` value, then the next 99% to change the transition-able properties.

Check out the difference in this Pen:

<p data-height="268" data-theme-id="0" data-slug-hash="MYPgPp" data-default-tab="result" data-user="jdsteinbach" class='codepen'>See the Pen <a href='http://codepen.io/jdsteinbach/pen/MYPgPp/'>MYPgPp</a> by James Steinbach (<a href='http://codepen.io/jdsteinbach'>@jdsteinbach</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
