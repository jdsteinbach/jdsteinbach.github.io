---
title: Keeping RWD Simple & Sassy – Grids & Columns
author: James Steinbach
layout: post.html
permalink: /sass/rwd-sass-grids/
categories:
  - Sass
excerpt: Using Sass for grids to keep responsive Sass code clean and maintainable.
---

This is the fourth post in a series based on my recent RWD Summit talk “Keeping RWD Simple & Sassy.” It covers some useful techniques for managing grid/column layouts with Sass.

## Grids and Columns

Another big piece of responsive desig is grids. Well, columns. Always cracks me up at CSS/Sass "grid systems" that only create columns and become painfully complex when you try to use them for an actual "grid." (Shout out to Susy for Sass with its `gallery()` mixin!) But I digress. We almost always have some kind of column-based layout that changes proportions. What's the best way to handle that?

Let's quickly nix a bad way to handle that: writing some Sass to generate every possible grid proportion for your project to a set of utility classes. Basically a Sass partial that makes your own "Bootstrap" class system.

```scss
@for $child-columns from 1 through 12 {
  @for $parent-columns from 1 through 12 {
    @if $parent-columns >= $child-columns {
      .col-#{$child-columns}-of-#{$parent-columns} {
        width: 100% / $parent-columns * $child-columns;
      }
    }
  }
}

[class^="col-"] {
  float: left;
}
```

Those loops are really short and give us handy set of classes that are (almost) instantly ready to plug-in to our markup, but they also generate almost 80 selector blocks (300+ lines of unminified markup). And we haven't even added breakpoints, gutters, or offsets yet!

A much better solution is to use a set of mixins that create the right column widths and margins for you. This set of mixins should generate CSS based on grid math *only when their mixins are used.* This prevents the problem of making your users download the CSS needed for every possible grid position. It gives you all the benefits of highly configurable grids measurements, but only generates the CSS needed for the elements you actually want to style. All the possibilities, none of the bloat.

### Responsive Grids Sass Libraries

There are 3 major Sass libraries that do nearly everything you need: Susy, Singularity, and Neat (with its Bourbon dependency).

**Neat (and Bourbon)**: Neat is probably the most basic of the three. It does grid (with gutter) proportions and has a media query mixin. It's dependent on Bourbon (a mixin library). If you already use Bourbon, that makes Neat a natural choice, but if not, the dependency doesn't matter. [Download Neat](http://jds.li/neat).

**Susy**: Susy's best bonus feature (in my opinion) is its `gallery()` mixin. Most grid systems just do columns, but `gallery()` lets you generate an actual grid (column **and** rows!) of items. It also has solid support for asymmetric grids (not all column proportions have to fit on a 12-col / 16-col / etc layout). [Download Susy](http://jds.li/susy).

**Singularity**: Singularity supports asymmetric grids like Susy, but not a simple "gallery" mixin. It also has an add-on mixin that uses `calc()` to mix fluid and fixed width columns. [Download Singularity](http://jds.li/singularity).
