---
title: Sass Maps vs Lists
author: James Steinbach
layout: post
permalink: /sass/maps-lists/
categories:
  - Sass
---

The title of this post may be surprising to some of you. If you&#8217;re a Sass veteran, you may remember the days (pre-Ruby-Sass-3.3) of using lists of lists to emulate nested arrays of data. (Ruby) Sass 3.3 added a new data type called [maps](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#maps). Lists of lists could hold complex data in a nested format, but without key-value pairing. Maps added key-value pairs and let us create arrays of data.

With the advent of maps, many of us Sass users started putting everything into maps (and for good reason!). All your [breakpoint widths](/css/sass-maps-breakpoint-mixin/), [color values](http://www.sitepoint.com/managing-color-values-with-sass/), [grid layouts](/css/sass/breaking-free-bootstrap/), [type scales](http://www.sitepoint.com/using-sass-build-custom-type-scale-vertical-rhythm/) and other [responsive typography](http://www.sitepoint.com/sass-responsive-typography/) details can go into maps!

[Gist](http://sassmeister.com/gist/598bce41ebe7305cfacd)