---
title: A Cheatsheet for CSS @font-face Declarations
author: James Steinbach
layout: post.html
permalink: /css/cheatsheet-css-font-face-declarations/
categories:
  - CSS
---
CSS `@font-face` is easy: just `@import` from Google Web Fonts or copy what you get from Font Squirrel, right? Not quite. If you’re hosting your own webfonts, cleaning up the default you get from a service like Font Squirrel, or just concerned about performance, you want more details than “just paste this line of code.” Here’s a list of the most important details you should know about CSS `@font-face`:

1. `.woff` covers nearly everything
2. `.eot` if you need to support IE8
3. `.ttf` if you need to support old Androids
4. `.woff2` is gonna be great

Now that you’ve seen the short list, let’s look at those points in more detail.

## .woff covers nearly everything

According to caniuse, we’ve got [83% global browser support for .woff files (86% in the US)][1]. That’s pretty good. If you’re viewing webfonts as a progressive enhancement, you’d probably have good reason to quit stop with just .woff files:

~~~css
@font-face {
  font-family: 'SampleFont';
  src: url('sample_font') format('woff');
  font-style: normal;
  font-weight: normal;
}
~~~

## .eot if you need to support IE8

An .eot file (embedded open type) is needed for IE<8 (and IE9 running in compatibility mode). This adds another [4% (7% US) to browser support][2], bringing our totals to 87% / 94%. Be sure to include it above the .woff. Notice we&#8217;re linking to the same file twice: the first declaration is for IE9 in compatiblity mode; the second (which is inline with the .woff declaration) is for IE6-8.

~~~css
@font-face {
  font-family: 'SampleFont';
  src: url('sample_font.eot');
  src: url('sample_font.eot?#iefix') format('embedded-opentype'),
    url('sample_font.woff') format('woff');
  font-style: normal;
  font-weight: normal;
}
~~~

## .ttf if you need to support old Androids

These older Android browsers support both .ttf & .svg fonts, so pick whichever you like best. No, I&#8217;m kidding. Just use .ttf. Very few (and very old) browsers render .svg fonts but not .ttf.

Supporting these browsers brings our total support to [90% global, 96% US][3].

~~~css
@font-face {
  font-family: 'SampleFont';
  src: url('sample_font.eot');
  src: url('sample_font.eot?#iefix') format('embedded-opentype'),
    url('sample_font.woff') format('woff'),
    url('sample_font.ttf') format('truetype');
  font-style: normal;
  font-weight: normal;
}
~~~

## .woff2 is gonna be great

Yep. We&#8217;re going to [shave 20-30% off the filesize with .woff2][4]. Right now Chrome & Opera are the only browsers actively supporting .woff2, but Firefox will be adding support behind a flag shortly.

## Conclusion

The code above helps you include .woff, .eot, and .ttf files for your websites. That said, make your own decisions about how to &#8220;support&#8221; browsers on this issue. In my view at the moment, web fonts are a progressive enhancement. Sure, they make sites look fantastic, but we need to work hard at making sure they don&#8217;t block people from content.

Personally, I&#8217;m fine with serving *only .woff fonts* at this point. If a visitor is on any of the old browsers we discussed above, they&#8217;re used to sites looking less progressively enhanced. But if your project or organizational requirements are different, I hope this helps you.

 [1]: http://caniuse.com/#feat=woff
 [2]: http://caniuse.com/#feat=eot
 [3]: http://caniuse.com/#feat=ttf
 [4]: https://twitter.com/wpseo/status/482516050303807490
