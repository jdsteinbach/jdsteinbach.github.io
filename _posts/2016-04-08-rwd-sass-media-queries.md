---
title: Keeping RWD Simple & Sassy – Media Queries
author: James Steinbach
layout: post
permalink: /sass/rwd-sass-media-queries/
categories:
  - Sass
excerpt: Organizing media queries with Sass to keep responsive Sass code clean and maintainable.
---

This is the second post in series based on my recent RWD Summit talk “Keeping RWD Simple & Sassy.” It covers some useful techniques manage media queries with Sass to keep your responsive Sass code base clean and maintainable.

## Media Query Variables

I know, we're working with some bedrock basics: managing repeated values with variables. Assign any repeated value to a variable. The biggest improvements are: 1) you don't have to look up that value every time you want to use it again and 2) you can change that value across the entire codebase by editing the variable just once. This is a practical way to apply the programming principle of having a "single source of truth" for these values.

```scss
$breakpoint-medium: 25em;
$breakpoint-large:  50em;
```

Now if you want to write a media query in Sass, you can stick with your defined breakpoints like this:

```scss
.element {
  @media screen and (min-width: $breakpoint-medium) {
    width: 50%;
  }
}
```

Let's improve that a bit, shall we? Sass variables aren't limited to simple string storage: they can also be maps (or associative arrays):

```scss
$breakpoints: (
  default: null,
  medium: 25em,
  large: 50em
);
```

Or if you've put your breakpoints in a map, you'll use `map-get()` to retreive the value for that breakpoint. This is the Sass equivalent of `array['key']` / `array.key` in JS or `$array['key']`in PHP:

```scss
.element {
  @media screen and (min-width: map-get($breakpoints, medium)) {
    width: 50%;
  }
}
```

### Media Query Mixin

Now, that's still a lot to type, so let's create a mixin to make the whole MQ syntax fast and reusable:

```scss
@mixin media-query($label) {
  $min-width: map-get($breakpoints, $label);
  @if $min-width {
    @media screen and (min-width: $min-width) {
      @content;
    }
  } @else {
    @content;
  }
}

.element {
  @include media-query(medium) {
    width: 50%;
  }
}
```

*Note: That mixin will fail silently. If you pass it a key that doesn't exist in `$breakpoints`, it'll just output the `@content` CSS with no media query. Read [my article on Sass validation](http://jds.li/validsass) for more information on validating input for Sass mixins & functions.*

### Breakpoints vs. Tweakpoints

You may have seen [Jeremy Keith's article on "Tweakpoints" recently](http://jds.li/tweakpoints). Tweakpoints are like breakpoints for a design, but not as "major." You're probably already used to having 3 or 4 major layout-changing breakpoints for a site. You've probably also felt the pain of having a few odd components that don't seem to "break" nicely at your primary breakpoints. Tweakpoints are "sub-breakpoints" for individual parts of the site that need a slightly-adjusted breakpoint.

You can handle tweakpoints a couple different ways. You could be strict and say, "They're not as important as breakpoints, so they'll be stored in their own map." In that scenario, you'll then need to either (a) write a `tweakpoint()` version of the breakpoint mixin, or (b) modify your breakpoint mixin so that it can handle tweakpoints too. If you like option (b), read [this tweakpoint Sass tutorial](http://jds.li/tpointsass) for an example of how to scope tweakpoints to each Sass partial.

The other way to handle tweakpoints is to decide, "I don't care that they're not as important as breakpoints. I'll put them in the same map anyway and that's fine." The downside of this approach is that all the tweakpoints are available to the entire codebase, instead of being scoped to the style patterns that actually need them.

Here's my way to mess with the breakpoint mixin and get it to handle tweakpoints nicely.

```scss
@mixin media-query($label) {
  $min-width: $label;

  @if type-of($label) = string {
    $min-width: map-get($breakpoints, $label);
  }

  @if $min-width {
    @media screen and (min-width: $min-width) {
      @content;
    }
  } @else {
    @content;
  }
}
```

```scss
$tweakpoint-element: 45em;

.element {
  @include media-query(medium) {
    width: 50%;
  }

  @include media-query($tweakpoint-element) {
    width: 33.33%;
  }
}
```

### Per-Partial Variables for Breakpoints

I often find myself in a situation where I've got a Sass partial that re-uses a breakpoint in several element. Navigation is a pretty common place for this to happen. I don't always know up front if I'll need to change the nav at the medium breakpoint, the large breakpoint, or a tweakpoint somewhere in between. I do know that when I figure out where to break that point, I'll need to update the argument in 4-5 instances of the media query mixin. I handle that with a variable in that partial pointing to the breakpoint I want to test.

```scss
$mq-nav: medium;

.site-nav {
  display: none;

  @include media-query($mq-nav) {
    display: block;
  }
}

.site-nav-item {
  display: block;

  @include media-query($mq-nav) {
    display: inline-block;
  }
}

.site-nav-link {
  padding: 1em .5em;

  @include media-query($mq-nav) {
    padding: 1em;
  }
}
```

In real life, the partial is never that simple: it's got all kinds of other style information scattered around and it ends up 100 or more lines long. This alias variable allows me to link all the styles that should happen at a single breakpoint and edit that breakpoint easily.

### Nested Media Queries vs. MQ Partials

This may be an old topic that doesn't need to be re-hashed here, but it's RWD and Sass, so I think it deserves a slide or two.

Should you nest all your media queries inside the selectors they modify, or have a partial per media query with all the modifications in each partial?

```scss
// in _nav partial

.site-nav {
  // styles

  @include media-query(medium) {
    // medium styles
  }

  @include media-query(large) {
    // large styles
  }
}
```

```scss
// in styles partial

@import 'site-nav';

@include media-query(medium) {
  @import 'bp-medium';
}

@include media-query(large) {
  @import 'bp-large';
}
```

Option 2 reminds us of the olden days when we wrote all our styles in a single CSS file, and put our media queries in order at the bottom of that file. If you remember those days, you probably remember the major frustration of that: to modify one component responsively, you had to keep scrolling between 3 positions in your 1000s of lines CSS file. There's no reason to keep that frustration when you're using a preprocessory.

Nesting all your media queries in the selectors they modify allows you to (ideally) open 1 partial to find and maintain all the styles for a single component. When it comes to dev-friendly organization like we talked about before, nesting media queries is the way to go.

The objection to that technique, however, is that it will bloat CSS output by repeating the media query syntax over and over again. However, that objection ignores an important factor: if you don't repeat media queries, you'll repeat your selectors.

I ran a brief test to see how bad the "bloat" is. For the test, I generated 40 selectors (of varying length) and nested 2 media queries in each one. Then I wrote default styles & 2 media queries with the 40 selectors repeated in each media query. The nested media query output was a bit larger: 11.3kb, while the separated media query output was 8.3kb - 25% smaller. (*Remember, this is not an entire stylesheet: it's a simplified test to show how much weight the selectors & queries themselves generate. Also, this is not a huge issue: if your total style sheet is ~150kb, it's only a 2% change.*) Then I gzipped both output files. Surprisingly, the nested media query gzip was 87% smaller than the separated media query gzip.

So first of all, the repetitious bloat warning is exaggerated: you're going to have repetition no matter what you do. Secondly, however, you really **must** be gzipping your HTML/CSS/JS for users. Gzip compression finds all the repeated strings in a text file and uses an alias to shorten them. And for the record, you get better compression with 2 strings repeated 40x than with 40 strings repeated 2x. Nested media queries FTW!

*Note: [more information on gzip](http://jds.li/gzip).*