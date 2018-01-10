---
title: Use Cases for CSS Variables
author: James Steinbach
layout: post.html
permalink: /css/use-cases-css-variables/
categories:
  - CSS
codepen: true
---
It&#8217;s time to start exploring use cases for CSS variables, now that <a title="CSS Variable data on Can I Use" href="http://caniuse.com/#feat=css-variables" target="_blank">Firefox supports them</a>. <a title="Chrome no longer supports CSS variables" href="http://stackoverflow.com/questions/18466569/enable-experimental-webkit-features-chrome-css-css3-variables" target="_blank">Chrome has toyed with CSS variables</a> before. That means that **this post & all the embedded pens will only work in Firefox**.

If you&#8217;re a fan of pre-processors, you might share my first reaction to CSS variables: &ldquo;I&#8217;m already using variables in [Sass/Less/Stylus]; why introduce something new?&rdquo; First, the ability to change these values live in a browser is pretty powerful. Second, native CSS variables will allow us to write lighter, more efficient stylesheets. In a series of follow-up posts to this one, I&#8217;ll go more in-depth comparing pre-processor variables with native CSS variables for each of the use cases introduced below.

## Basic Syntax

To define a native CSS variable globally, use the following syntax:

~~~css
:root{
  --color-primary: #001f3f;
}
~~~

To use that variable in a property, call it with the `var()` wrapper:

~~~css
p {
  color: var(--color-primary);
}
~~~

Because that variable is scoped to `:root`, it&#8217;s global. Any place in the stylesheet it appears, it will return that same value. CSS variables can be scoped to any element, however, making it possible to create &ldquo;exceptions.&rdquo; The following use cases show the power of locally-scoped CSS variables.

## Use Cases

### Colors

Let&#8217;s look at an example of scoping variables for color changes. In this use case, the &ldquo;normal&rdquo; color for `<h1>` elements will be the site accent red. However, the site also uses `<h1>` elements for the titles of widgets in the `<aside>` sidebar. We can redeclare the `--color-accent` variable in an `<aside>`: now any `<h1>` in a widget will be orange instead of red.

~~~css
:root{
  --color-accent: #ff4136;
}
h1 {
  color: var(--color-accent);
}
aside {
  --color-accent: #ff851b;
}
~~~

### Font Sizes

Font sizes can be changed with CSS variable scoping as well. This example works well in the same scenario as the sidebar colors above:

~~~css
:root{
  --heading-size: 32px;
}
h1 {
  font-size: var(--heading-size);
}
aside {
  --heading-size: 24px;
}
~~~

### SVGs

Inline SVG images can be styled with CSS: variables can change SVG colors based on context. Amelia Bellamy-Royds has already written a <a title="CSS Variables and SVGs" href="http://codepen.io/AmeliaBR/thoughts/customizable-svg-icons-css-variables" target="_blank">great CodePen blog post on SVGs and CSS variables</a>, so I&#8217;ll just link you to it and let her explain how it works.

### Grid Layouts

Grid layouts are one of the trendiest parts of modern web development to automate. There are probably dozens of grid frameworks written in JS, CSS, Sass, etc. We can use native CSS variables to set up custom grid layouts simply.

In this example, we&#8217;ll only need one set of styles for all our grid elements, regardless of the number of columns they&#8217;ll be presented with. (Note, this is a really simplistic grid layout.)

Each container element will display its `.grid-item` children according to the `--grid-width` percentage scoped to that particular container.

~~~css
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
~~~

### Column Proportions

Body vs. sidebar proportions can be managed with CSS variables as well:

~~~css
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
~~~

### Buttons

Next to grid layouts, buttons are everyone&#8217;s favorite place to automate styling. CSS variables are useful here.

~~~css
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
~~~

### JS Changes

One benefit of native CSS variables is that they can be changed in real time with JavaScript. This is nice for user-enabled theme changing or for easily demoing multiple layouts / color scheme options for a client. The following JS function changes the value of the `--color-primary` variable.

~~~js
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
~~~

## Conclusion

So many good uses, and we&#8217;re barely getting started… Use the comments to ask follow-up questions or share your ideas for using CSS variables. And of course, stay tuned for more detailed posts comparing native CSS variables to pre-processor variables in these use cases.

You can see all these <a title="CSS Variables: CodePen Demo" href="http://codepen.io/jdsteinbach/pen/AeEwk" target="_blank">CSS Variable use cases in a single CodePen</a> here.
