---
title: Safe Fallback for CSS Lazy Loading
author: James Steinbach
layout: post
permalink: /css/async-css-noscript/
categories:
  - CSS
---

Recently, Scott Jehl published a short post about [“The Simplest Way to Load CSS Asynchronously.”](https://www.filamentgroup.com/lab/load-css-simpler/) In it, he recommends adding `media="print"` to your `link` tag, then adding an inline JS attribute as well: `onload="this.media='all'"`. Put together, here's the recommended code:

```html
<link rel="stylesheet" href="styles.css" media="print" onload="this.media='all'" />
```

A bunch of other publishers & newsletters picked up on this too (CSS-Tricks, Smashing Magazine, CSS Weekly, and Calibre, to name a few). It's a pretty handy trick! No extra JS libraries needed for this async load.

However, there's a small resiliency issue. **If JS is disabled, the CSS won't load.**

I know, I know, the number of people who intentionally disable JS is very small. But counterpoint: the solution I'm recommending here is also super easy to implement! In most cases, it'd take less than 30 seconds to add. To make sure your CSS loads even with JS disabled, add another `link` to your stylesheet inside a `<noscript>` tag.

Here's the improved code snippet:

```html
<link rel="stylesheet" href="styles.css" media="print" onload="this.media='all'" />
<noscript>
  <link rel="stylesheet" href="styles.css" />
</noscript>
```

There you go! Maybe no one will actually need that `noscript` copy, but it's very easy to add and it makes sure that the inline JS solution Scott recommended is truly a progressive enhancement, no side effects.
