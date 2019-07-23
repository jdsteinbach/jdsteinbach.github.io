---
title: Where to Use CSS calc() in the Real World
author: James Steinbach
layout: post
permalink: /css/where-to-use-css-calc-real-world/
categories:
  - CSS
---


You can use the `calc()` function to do math on CSS measurement values in the browser. In this article, we’ll look at the syntax for this useful tool, check out some real world use cases, note some places not to use `calc()`, and a fallback for older browsers.

## Using `calc()`

The CSS `calc()` function puts the user’s browser to work doing math that can’t be done ahead of time by a developer or preprocessor. It’s especially useful for calculating measurements that need to be done in real time, or that use different units.

The syntax for `calc()` looks like this:

```css
.element {
  width: calc(100% - 2em);
}
```

Supporting browsers will calculate the distance of `2em` and subtract it from `100%`. The example above isn’t terribly useful by itself (padding on the parent could probably do the same thing), but it shows how the function is written. The `calc()` function can do addition, subtraction, multiplication, or division.

## Use Cases

Knowing how to use `calc()` is great, but where is it really useful? Let’s take a look at some great use cases for CSS `calc()`.

### Centered Content in Full-Screen Stripes

I’ve often been asked to develop sites that have a “striped” content structure: several rows of content are centered, have a fixed max-width, and have background colors or images that extend to the edges of the viewport. A great way to handle this set-up is to use `calc()` for left/padding on each row:

```css
.content-row {
  width: 100%;
  padding-right: calc(50% - 600px);
  padding-left: calc(50% - 600px);
  background-color: #eee;
}
.content-row:nth-child(even) {
  background-color: #ccc;
}
```

That code sample uses `padding` with `calc()` to create a 1200px “container” centered inside the full-width stripes. Alternating stripes will have different gray shades for the background: these colors will extend all the way out the parent element’s edges.

### Mixing Fixed & Fluid Grid Columns

You can use `calc()` to create a layout with both fixed-width and flexible columns.

```css
.container {
  width: 100%;
}
.fixed-column {
  width: 400px;
  float: left;
}
.fluid-column {
  width: calc(100% - 400px);
  float: left;
}
```

<p class="codepen">See the Pen <a href="https://codepen.io/jdsteinbach/pen/OPPQdg/">CSS calc() – Fixed & Fluid Columns</a> by James Steinbach (<a href="https://codepen.io/jdsteinbach">@jdsteinbach</a>) on <a href="https://codepen.io/">CodePen</a>.

With that code, the `.fixed-column` element will always be 400px wide, while the width of the `.fluid-column` element’s width will fill the remaining space in `.container`.

You could use this technique to put two fixed sidebars around a fluid center column:

```css
.container {
  width: 100%;
}
.sidebar-left,
.sidebar-right {
  width: 300px;
  float: left;
}
.fluid-column {
  width: calc(100% - 600px);
  float: left;
}
```

<p class="codepen">See the Pen <a href="https://codepen.io/jdsteinbach/pen/oggEOX/">CSS Calc – Fixed & Fluid Columns</a> by James Steinbach (<a href="https://codepen.io/jdsteinbach">@jdsteinbach</a>) on <a href="https://codepen.io/">CodePen</a>.

### Pinning Header and Footer in the Viewport

If you want to create an app-like layout for a web page, you might want to create a fixed-height header and footer pinned to the top and bottom of the viewport. This layout technique will use `calc()` and the `overflow` property to create a webapp layout:

```css
html, body {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.header,
.footer {
  height: 50px;
  width: 100%;
}
.content {
  height: calc(100% - 100px);
  overflow-y: scroll;
}
```

<p class="codepen">See the Pen <a href="https://codepen.io/jdsteinbach/pen/YPPegq/">CSS calc() – Pinning Header and Footer in the Viewport</a> by James Steinbach (<a href="https://codepen.io/jdsteinbach">@jdsteinbach</a>) on <a href="https://codepen.io/">CodePen</a>.

## Don’t Use Cases

Of course, as with any tool, there’s a temptation to use `calc()` for things it doesn’t need to do. Here are a couple places where you probably don’t need to use `calc()`.

### For math on compatible numbers

You don’t need to use `calc()` to do math on numbers that you could do the math for. It’s tempting to use `calc()` as a way to show your math transparently: `width: calc(100% / 12);` is a lot more understandable than `width: 8.33%;`, especially in a complex grid system. However, comments are a better way to explain the math than `calc`. Also, `calc()` could be an easy way to avoid doing math (lazy). If you need to be so “fast” that you can’t take time to do division, use a preprocessor! So instead of `calc(100% / 3)`, just use `33.33%`. Similarly, don’t use `calc(1200px - 40px)`, just do math & write `1160px`.

### Where your preprocessor can do the math for you

If you’re using Sass or another CSS preprocessor, you’ve got a toolkit of functions to convert units and do math for you without needing `calc()`.

```css
.element {
  width: calc(1200px - 4em);
  margin: 0 auto;
}
```

A preprocessor can convert pixels to ems & do that for you. For example, if you’re using Bourbon, use <a href="https://bourbon.io/docs/#px-to-em">`em()`</a>.

```css
.element {
  width: em(1200px) - 4em;
}
```

## Fallback

All this `calc()` stuff is cool, but what about support for older browsers that can’t handle it? <a href="https://caniuse.com/#feat=calc">Here are a few holdouts.</a> You can provide a fallback pretty easily. Let’s take a fixed + fluid column layout as an example:

```css
.fixed-column {
  width: 300px;
}
.fluid-column {
  width: calc(100% - 300px);
}
```

To provide a good fallback, wrap the fixed value in `calc()` even though it’s not necessary, then provide whatever non-`calc()` fallbacks you need:

```css
.fixed-column {
  width: 33%;
  width: calc(300px);
}
.fluid-column {
  width: 67%;
  width: calc(100% - 300px);
}
```

Now browsers that can’t handle `calc()` will ignore it (including the fixed pixel measurement) and use the simple percentage fallback.

## Additional Resources

The following posts have some more examples of `calc()` usage:

* <a target="_blank" rel="noopener nofollow noreferrer" href="https://www.sitepoint.com/css3-calc-function/">SitePoint</a>
* <a target="_blank" rel="noopener nofollow noreferrer" href="https://css-tricks.com/a-couple-of-use-cases-for-calc/">CSS-Tricks</a>
* <a target="_blank" rel="noopener nofollow noreferrer" href="https://updates.html5rocks.com/2012/03/CSS-layout-gets-smarter-with-calc">HTML5Rocks</a>
* <a target="_blank" rel="noopener nofollow noreferrer" href="https://davidwalsh.name/css-calc">David Walsh</a>
* <a target="_blank" rel="noopener nofollow noreferrer" href="https://www.hongkiat.com/blog/css3-calc-function/">Hongkiat</a>
