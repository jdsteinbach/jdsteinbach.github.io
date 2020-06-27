---
title: Keeping RWD Simple & Sassy – Animation
author: James Steinbach
layout: post
permalink: /sass/rwd-sass-animation/
categories:
  - Sass
excerpt: Using Sass for animation to keep responsive Sass code clean and maintainable.
---

This is the fifth & final post in a series based on my recent RWD Summit talk “Keeping RWD Simple & Sassy.” It covers some useful techniques for managing responsive animations with Sass.

## Responsive Animations

Complex animations may need to move differently at different breakpoints. The only way to use different animations at different breakpoints is to define multiple `@keyframes` animations and use a media query on the animated selector to change the `animation-name` at the appropriate breakpoints.

Before we get into some useful Sass techniques to help manage responsive animations, let's talk about a few things you should **not** be doing with Sass.

Do not use Sass mixins for browser prefixes. I know, you can still find dozens of articles claiming that browser prefixes are a "must-use" Sass technique. Use [Autoprefixer instead](http://jds.li/autoprefix). If you're using Sass, there's a pretty high likelihood you're using a task runner (Gulp, Grunt, Brocolli, npm scripts) to automate your workflow. Add Autoprefixer to it and just write spec CSS. It will add all the prefixes you need.

Also, try to avoid using Sass maps to store CSS property-value pairs. Sure, you *can* do that, but Sass mixins provide a much better way to store reusable property-value pairs. As I see it, writing big nested Sass maps that hold all your keyframes data in them isn't ideal. Unless you need to manipulate the values, putting repeated CSS in a mixin is better than in a map as key-value pairs.

So how can Sass help with responsive animations? There are two kinds of animations and two ways Sass can make them more maintainable.

### Unique Animations

If your animations are detailed and unique (not reusable), you can use a Sass mixin to nest your animation code right inside the selector that uses that animation.

```scss
@mixin animate() {
  $name: unique-id();
  animation-name: $name;

  @at-root {
    @keyframes #{$name} {
      @content;
    }
  }
}

.animated-thing {
  @include animate {
    0%, 100% {
      transform: none;
    }
    50% {
      transform: translateX(100%);
    }
  }

  @include bp(large) {
    @include animate {
      0%, 100% {
        transform: none;
      }
      50% {
        transform: translateX(-100%);
      }
    }
  }
}
```

For one-off animations, this mixin keeps everything you need in the selector's normal partial and saves you the trouble of thinking up animation names!

### Reusable Animations

On the other hand, some animations are reusable. If you've used Dan Eden's [`animate.css`](http://jds.li/animcss), you've experienced a supply of animations designed to be reusable. If you want to see how Sass can organize something like that, checkout the [`animate.scss` project](http://jds.li/animsass).

### Animation Consistency

You can also use Sass to solve CSS animation's speed problem. As you may know, you can only define 2 speed-related properties in CSS animations: duration (with the `animation-duration` property) and distance (in the `@keyframes` themselves). What you can't do is define an actual speed: pixels per second. But you can use Sass to calculate duration or distance based on a desired speed.

```scss
$default-speed: 300px 1s;

@function calc-distance($duration, $speed: $default-speed) {
  @return $duration / nth($speed, 2) * nth($speed, 1);
}

@function calc-duration($distance, $speed: $default-speed) {
  @return $distance / nth($speed, 1) * nth($speed, 2);
}
```

This isn't purely responsive, but if you are aiming for consistent speed for your animation at various breakpoints, this saves you a lot of math.

The last way I've found Sass helpful for animations is for creating a style guide of consistent motion possibilities. You can set up a map of transition / animation distances and a map of transition / animation durations. (Or just one of those maps & the functions from above!) Then, with a helper function, you can quickly get the right value for your current animation.

```scss
$transition-durations: (
  short: .16s,
  medium: .26s,
  long: .42s
);

$transition-distances: (
  short: .6rem,
  medium: 2.6rem,
  long: 6.8rem
);
```

Here are the functions we can use to retrieve those values. I've written 1 function to house the validation and warning, and two alias functions to make it easier to use.

```scss
@function get-transition-value($map, $key) {
  @if map-has-key($map, $key) {
    @return map-get($map, $key);
  } @else {
    @warn 'Current $map does not contain key: #{$key}';
  }
}

@function duration($key) {
  @return get-transition-value($transition-durations, $key);
}

@function distance($key) {
  @return get-transition-value($transition-distances, $key);
}
```

And here's what it looks like in use:

```scss
.slow-element {
  transition: transform duration(long) ease-in-out;

  &.moved {
    transform: translateY(distance(short));
  }
}
```
