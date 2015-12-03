---
title: When I Use (and Don’t Use) Sass Extend
author: James Steinbach
layout: post
permalink: /sass/use-extend/
categories:
  - Sass
---

Using Sass’s `@extend` directive is one of the more controversial discussions within the Sass community. On one hand, there are developers whose primary concern is the potential for selector bloat that comes with unrestrained use of `@extend`. On the other hand, there are developers who understand what `@extend` really does and limit their use to avoid the dangers.

I’m in the “use `@extend` wisely” team. [😀](https://twitter.com/Una/status/664890977505570818) Here are the three limitations I put on my use of `@extend`.

## Don’t mix nesting and extends.

Selector bloat is a real concern, but it usually comes from one of two practices: extending a nested selector, or extending a class that’s used more frequently than expected. When there’s nesting on the extended block and the extender’s selector, Sass is forced to create unnecessary duplicates with the nesting:

```scss
// Nested Input
header .class1 {
  color: red;
}

.class2 {
  footer & {
    @extend .class1;
  }
}

// Bloated Output
header .class1,
header footer .class2,
footer header .class2 {
  color: red;
}
```

## Only extend placeholders.

As I mentioned above, the 2nd main cause of `@extend` selector bloat is extending a class that’s used more frequently than originally planned or expected. We can solve this concern by limiting `@extend` to Sass `%placeholder` selectors, and not actual CSS selectors (classes, tags, IDs, attributes, etc). If you try to extend an actual selector, and you or another dev uses that elsewhere in the code, you’ll end up extending all those additional instances of the class.

```scss
// Initial Selector to Extend
.shadow-box {
  background-color: #fff;
  box-shadow: 2px 2px 4px rgba(black, .5);
}

// Added Later
.home-page .shadow-box {
  background-color: #eee;
}

// Extender
.comment-card {
  @extend .shadow-box;
  // Yikes! I hope .comment-card is
  // meant to be #eee on .home-page…
}
```

```scss
// Better
%shadow-box {
  background-color: #fff;
  box-shadow: 2px 2px 4px rgba(black, .5);
}

.shadow-box {
  @extend %shadow-box;

  .home-page & {
    background-color: #eee;
  }
}

.comment-card {
  @extend %shadow-box;
}
```

## Try to use an actual selector instead.

Another important question I ask myself when I’m considering using `@extend` is “Is there a sufficiently broad CSS selector I can use for this style pattern?” If I’ve got two elements that I want to style identically, why don't they share a class or attribute? This helps me name things better. If I’m naming visually-identical elements differently in different contexts, I need to rework my classes a bit. After all, classes are not primarily intended to describe the contents of their elements, they’re meant to provide hooks for styles to catch.

I’ve seen projects that use a number of extendable classes/placeholders to mimic single-responsibility utility classes, then extend each of those utility selectors wherever needed to attach the right styles to the actual selectors. This creates a hodge-podge of selector duplication. You see, `@extend` doesn’t repeat styles where the directive is written: it hoists the extender’s selector up to the location of the original extended object. If you’re not aware of this, you’ll likely be surprised at the way using `@extend` appears to “break” your cascade.

```scss
%red-box {
  border: 2px solid red;
  color: darken(red, 30%);
}

%green-box {
  border: 2px solid green;
  color: darken(green, 30%);
}

.box {
  @extend %green-box;
}

.error-box {
  @extend %red-box;
}
/* You'd expect .error-box to be 2nd,
but since the selector is hoisted
to the %placeholder location,
it ends up first and won't be red.*/
```

This brings up the front-end game of [“Optimization Whack-A-Mole”](css/css-repetition-basically-whack-mole/) - whenever you remove duplication from one part of your styles, it shows up somewhere else. If you avoid repeating declarations (like with `@extend`), you’ll repeat selectors. If you avoid repeating selectors (like with `@mixin`s), you’ll repeat declarations. If you use utility classes, you’ll repeat classes throughout your HTML markup. All that to say, bending `@extend` to mimic utility classes doesn’t really shorten anything. It only adds cascade issues and selector repetition.

*Note: always gzip your stylesheets and markup. All the repeated strings (whether selectors, declaration, or markup classes) will be compressed.*