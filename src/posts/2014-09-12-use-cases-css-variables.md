---
title: Use Cases for CSS Custom Properties (Variables)
author: James Steinbach
layout: post
permalink: /css/use-cases-css-variables/
categories:
  - CSS
codepen: true
---

<p class="precursor"><em>Published September 12, 2014; updated April 16, 2018: updated browser support & changed most instances of "CSS variables" to "custom properties."</em></p>

It&#8217;s time to start exploring use cases for CSS <span style="text-decoration:line-through">variables</span> custom properties, now that <span style="text-decoration:line-through">Firefox</span> <a title="CSS Variable data on Can I Use" href="http://caniuse.com/#feat=css-variables" target="_blank">Firefox, Chrome, Safari, and Edge support them</a>. That means that <span style="text-decoration:line-through">this post & all the embedded pens will only work in Firefox</span> **this post & all the embedded pens will work almost everywhere but IE**.

If you&#8217;re a fan of pre-processors, you might share my first reaction to CSS custom properties / variables: &ldquo;I&#8217;m already using variables in [Sass/Less/Stylus]; why introduce something new?&rdquo; First, the ability to change these values live in a browser is pretty powerful. Second, native CSS variables will allow us to write lighter, more efficient stylesheets. Third, CSS custom properties do _far more_ than preprocessor variables. You can use a CSS property once, use `var(--custom-property)` for its value, then change the custom property in any selector block elsewhere: the value of the custom property will obey the cascade _without needing to rewrite the entire CSS property/value pair_ ([example](#buttons)).

## Basic Syntax

To define a native CSS custom property globally, use the following syntax:

```css
:root{
  --color-primary: #001f3f;
}
```

To use that value in a property declaration, call it with the `var()` function:

```css
p {
  color: var(--color-primary);
}
```

Because that custom property is scoped to `:root`, it&#8217;s global. Any place in the stylesheet it appears, it will return that same value. CSS custom properties can be scoped to any element, however, making it possible to create &ldquo;exceptions.&rdquo; The following use cases show the power of locally-scoped CSS values.

## Use Cases for CSS Custom Properties

### Colors

Let&#8217;s look at an example of scoping custom property values for color changes. In this use case, the &ldquo;normal&rdquo; color for `<h1>` elements will be the site accent red. However, the site also uses `<h1>` elements for the titles of widgets in the `<aside>` sidebar. We can redeclare the `--color-accent` value in an `<aside>`: now any `<h1>` in a widget will be orange instead of red.

```css
:root{
  --color-accent: #ff4136;
}
h1 {
  color: var(--color-accent);
}
aside {
  --color-accent: #ff851b;
}
```

### Font Sizes

Font sizes can be changed with CSS scoping as well. This example works well in the same scenario as the sidebar colors above:

```css
:root{
  --heading-size: 32px;
}
h1 {
  font-size: var(--heading-size);
}
aside {
  --heading-size: 24px;
}
```

### SVGs

Inline SVG images can be styled with CSS: custom properties can change SVG colors based on context. Amelia Bellamy-Royds has already written a [great CodePen blog post on SVGs and CSS variables](https://codepen.io/AmeliaBR/post/customizable-svg-icons-css-variables), so I&#8217;ll just link you to it and let her explain how it works.

### Grid Layouts

Grid layouts are one of the trendiest parts of modern web development to automate. There are probably dozens of grid frameworks written in JS, CSS, Sass, etc. We can use CSS custom properties to set up custom grid layouts simply.

In this example, we&#8217;ll only need one set of styles for all our grid elements, regardless of the number of columns they&#8217;ll be presented with. (Note, this is a really simplistic grid layout.)

Each container element will display its `.grid-item` children according to the `--grid-width` percentage scoped to that particular container.

```css
:root {
  --grid-width: 20%;
}
.grid-item {
  float: left;
  width: var(--grid-width);
}
.products-grid {
  --grid-width: 25%;
}
.portfolio-grid {
  --grid-width: 33%;
}
```

### Column Proportions

Body vs. sidebar proportions can be managed with CSS custo properties as well:

```css
:root{
  --content-width: 75%;
  --sidebar-width: 25%;
}
.page-content {
  width: var(--content-width);
}
.page-sidebar {
  width: var(--sidebar-width);
}
.has-wide-sidebar {
  --content-width: 62.5%;
  --sidebar-width: 37.5%;
}
```

### Buttons

Next to grid layouts, buttons are everyone&#8217;s favorite place to automate styling. CSS properties are useful here, too.

```css
:root{
  --button-color: #ff4136;
  --button-color-dark: #cc0e03;
  --button-color-light: #ff7469;
}
.button {
  background-color: var(--button-color);
  box-shadow: 1px 2px 0 var(--button-color-dark);
}
.button:hover {
  background-color: var(--button-color-dark);
  box-shadow: 0 0 0 var(--button-color-dark);
}
.button:active {
  background-color: var(--button-color-light);
  box-shadow: 0 0 0 var(--button-color-dark);
}
.contact-form {
  --button-color: #ff851b;
  --button-color-dark: #cc5200;
  --button-color-light: #ffb84e;
}
```

### JS Changes

One benefit of CSS custom properties is that they can be changed in real time with JavaScript. This is nice for user-enabled theme changing or for easily demoing multiple layouts / color scheme options for a client. The following JS function changes the value of the `--color-primary` variable.

```js
var body = document.getElementsByTagName("body")[0];
function change_vars(){
  if ( !body.classList.contains('changed') ) {
    body.style.setProperty('--color-primary', '#8e44ad');
    body.classList.add('changed');
  } else {
    body.style.setProperty('--color-primary', '#2980b9');
    body.classList.remove('changed');
  }
}
```

## Conclusion

So many good uses, and we&#8217;re barely getting started… Use the comments to ask follow-up questions or share your ideas for using CSS custom properties (variables).

You can see all these [CSS Variable use cases in a single CodePen](https://codepen.io/jdsteinbach/pen/AeEwk) here.
