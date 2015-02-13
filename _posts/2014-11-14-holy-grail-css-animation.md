---
title: The Holy Grail of CSS Animation
author: James Steinbach
layout: post
permalink: /css/holy-grail-css-animation/

categories:
  - CSS
---
If you&#8217;ve been doing front-end development for long, you may have heard of the &#8220;Holy Grail&#8221; of web layout. [A List Apart][1] identified this layout as a flexible-width content column between two fixed-width sidebar columns, with all three columns occupying the same height between the header and footer rows. (Today we have Flexbox, so that problem is pretty solvable.)

<img class="alignright wp-image-1379 size-medium" src="http://jamessteinbach.com/wp-content/uploads/2014/11/holy-grail-168x300.png" alt="holy grail" width="168" height="300" />

I&#8217;ve identified a &#8220;Holy Grail&#8221; of CSS animation that (to my knowledge) hasn&#8217;t been solved successfully yet. What I want to do is mimic jQuery&#8217;s `slideToggle()` (`slideDown()` / `slideUp()`) feature with pure CSS on in-page content. I&#8217;m picturing collapsible FAQs or WikiPedia&#8217;s mobile view where content is collapsed under the header (except animated, unlike Wikipedia). Here are my five requirements for this behavior:

1. Uses CSS animation/transitions
2. Works on elements of any height
3. Maintains proper easing and timing
4. Following content fills collapsed space
5. Jank-free performance

## Uses CSS animation/transitions

JS is fine and good, but I&#8217;m looking for a way to do with with just CSS.

## Works on elements of any height

This is a tricky one. Basically I&#8217;m asking CSS to transition between `height: 0;` and `height: auto;`. But it currently can&#8217;t.

If all my elements were a fixed height, I could easily transition betweeen `` and that height, but I want a technique that works without fixing the element&#8217;s height in advance.

## Maintains proper easing and timing

One method I&#8217;ve seen suggested is transitioning the `max-height` of the element from `` to `1000px` (or some other fixed measurement higher than any potential element height). However, this method destroys any deliberate easing function or timing. For example, look at the following code (add your own prefixes):

```
.expandable {
  max-height: 0;
  transition: max-height 500ms ease-in-out;
}
.expandable[aria-expanded="true"] {
  max-height: 1000px;
}
```

If an `.expandable` element is only 500px, its visible transition will finish in 250ms (not 500ms) because the transition calculates 1000px of motion over 500ms. The easing function will also be broken: the easing curve is also spread out over 1000px / 500ms: since the actual element has no motion left at 500px / 250ms, it won&#8217;t ease-out at all. Animating `max-height` would work if duration was completely irrelevant and if the easing easing function was `linear`. But if you&#8217;ve deliberately chosen your durations & easing, this technique is out.

## Following content fills collapsed space

Another method for smoothly collapsing elements is transitioning between `transform: scaleY(0);` and `transform: scaleY(1);`. This handles timing & easing nicely.

```
.expandable {
  transform: scaleY(0);
  transition: transform 500ms ease-in-out;
}
.expandable[aria-expanded="true"] {
  transform: scaleY(1);
}
```

However, it doesn&#8217;t truly &#8220;collapse&#8221; the element. An element scaled to 0 with the `transform` property still exists in the stacking order of the site, preventing sibling elements from &#8220;moving up&#8221; to fill the empty space. This method works fine on elements that aren&#8217;t in the stacking order to begin with (for example, absolutely positioned sub-menu dropdowns), but this technique fails for normal content elements.

## Jank-free performance

CSS transitions and animations (when used properly!) hit 60fps really nicely. [Hint: limit transitioned properties to `transform`, `opacity`, and properties that contain simple color values.] jQuery&#8217;s `slideToggle()` functions don&#8217;t run jank-free, however. Use them on an element with border-radius, box-shadow, or complex children and you&#8217;ll probably get a glitchy, stuttery animation.

## Conclusion

If you&#8217;ve got a CSS animation / transition solution that meets all the criteria above, please share in the comments!

 [1]: http://alistapart.com/article/holygrail