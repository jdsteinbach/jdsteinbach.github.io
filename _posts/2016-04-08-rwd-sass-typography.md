---
title: Keeping RWD Simple & Sassy – Responsive Typography
author: James Steinbach
layout: post
permalink: /sass/rwd-sass-typography/
categories:
  - Sass
excerpt: Using Sass for typography to keep responsive Sass code clean and maintainable.
---

This is the third post in series based on my recent RWD Summit talk “Keeping RWD Simple & Sassy.” It covers some useful techniques for managing responsive typograpnhy with Sass.

## Responsive Sass Typography

You might recall our `$breakpoints` map from [the last post](/sass/rwd-sass-media-queries/). Let's combine that with 2 other maps to automate some responsive typography.

```scss
$breakpoints: (
  default: null,
  medium: 25em,
  large: 50em
);
```

```scss
$font-sizes: (
  default: 1rem,
  medium:  1.2rem,
  large:   1.4rem
);
```

```scss
$line-heights: (
  default: 1.5,
  medium:  1.6,
  large:   1.6
);
```

Again, we'll use the function `map-get()` to retrieve values from these map.

```scss
$breakpoint-medium: map-get($breakpoints, medium);
```

```scss
$font-size-default: map-get($font-sizes, default);
```

```scss
$line-height-large: map-get($line-heights, large);
```

I mentioned earlier we'd be able to loop through a map (an advantage over a series of variables). Here's a practical example. Let's create some quick responsive typography with the three maps we just made a moment ago. For each breakpoint (`default`, `medium`, `large`), we're going to set the base `font-size` & `line-height` on the `body` element.

```scss
body {
  @each $label, $min-width in $breakpoints {
    @include media-query($label) {
      font-size: map-get($font-sizes, $label);
      line-height: map-get($line-heights, $label);
    }
  }
}
```

And now we get responsive base typography:

```css
body {
  font-size: 1rem;
  line-height: 1.5;
}
@media screen and (min-width: 25em) {
  body {
    font-size: 1.2rem;
    line-height: 1.6;
  }
}
@media screen and (min-width: 50em) {
  body {
    font-size: 1.4rem;
    line-height: 1.6;
  }
}
```

## Responsive Typography Sass Libraries

* Modular Scale:[jds.li/mscale](http://jds.li/mscale)
* TypeTuner:[jds.li/typetuner](http://jds.li/typetuner)
* Sassline:[jds.li/sassline](http://jds.li/sassline)
* Typi:[jds.li/typi](http://jds.li/typi)
* Typographic:[jds.li/typographic](http://jds.li/typographic)
