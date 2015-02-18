---
title: Stop Using Needless Sass Mixins
author: James Steinbach
layout: post
permalink: /css/sass/stop-using-worthless-sass-mixins/
categories:
  - Sass
---
Sass is a powerful tool &#8211; this power makes it easy to misuse. One of the most common ways people misuse Sass is creating mixins that they never needed in the first place. I&#8217;m not talking about the cool proof-of-concept &#8220;let&#8217;s create an icosidodecahedron with CSS&#8221; mixins &#8211; those have their place. I&#8217;m talking about worthless mixins that bloat CSS and serve no one. Let&#8217;s look at the mixins you should stop using right now:

## Border-Radius Prefixes

.26%: that&#8217;s the total global browser usage that needs a prefix on `border-radius`. Not 26% &#8211; .26%. <a title="Can I Use data: Border-radius" href="http://caniuse.com/#feat=border-radius" target="_blank">Firefox 3.6 & down, Chrome 3 & down, Safari 4 & down, iOS 3.2 & down need <code>border-radius</code> prefixes.</a> Before replying with lofty ideals about &#8220;no user left behind,&#8221; think about what you do for IE6-8. Chances are, you&#8217;ve written at least one of those browser off as &#8220;unsupported.&#8221; You&#8217;ve got more than 10x as many IE8 users as you have `border-radius` prefix users. By now, the best thing to do is consider border-radius to be a progressive enhancement. I&#8217;ve never seen a website become unreadable or inaccessible when border-radius was removed.

## Box-Shadow Prefixes

This is the exact same issue as above: there are more older browsers that need prefixes for `box-shadow` than for `border-radius`, but it&#8217;s still only <a title="Can I Use data: box-shadow" href="http://caniuse.com/#feat=css-boxshadow" target="_blank">half a percent</a>. And same as before: this is a progressive enhancement. The box might look prettier with a shadow, but lack of `box-shadow` isn&#8217;t going to obscure its content. As Mitch Hedberg says, &#8220;There would never be an escalator temporarily out of order sign, only an escalator temporarily stairs. Sorry for the convenience.&#8221;

## Anything with Prefixes

The two examples above never need prefixes ever, but you really shouldn&#8217;t be using Sass mixins for any prefixes at all. I know, Compass & Bourbon have libraries to do this for you, but there&#8217;s a better way: <a title="Autoprefixer on Github" href="https://github.com/postcss/autoprefixer" target="_blank">Autoprefixer</a>. You can add Autoprefixer to any Sass workflow: Grunt, Gulp, Ruby gem CLI, Codekit, etc. It runs immediately after your Sass is compiled and *automatically adds & removes browser prefixes based on your requirements*. You realize how awesome that is, right? You never have to type `@include` for prefixes again. This lets you write CSS3 with normal, spec syntax. AutoPrefixer uses current data from <a title="Can I Use" href="http://caniuse.com" target="_blank">caniuse.com</a> to choose prefixes that match your specified browser & usage specifications. Just supporting most recent 3 browser version numbers or browsers with at least 3% usage? Autoprefixer does that automatically: you just type the spec version of the CSS. Transitions, transforms, keyframe animations, flexbox, gradients, etc &#8211; all those prefixes are handled automatically. Again, you don&#8217;t even need to worry about where to use a mixin: just learn the correct spec syntax & you&#8217;re covered.

## Opacity

Everybody but IE8 likes `opacity`. IE8 can do opacity with `filter: alpha(opacity=(50));`, but that&#8217;s hardly ideal. You could use a mixin for this, or (as I&#8217;d recommend) just let IE8 be opaque. If readability of your site *depends* on opacity, you should already be using Modernizr to detect support & deliver a safe fallback. Give IE8 that fallback. IMO, a much bigger issue is IE8&#8217;s lack of support for `rgba()` and `hsla()` colors. If you&#8217;re using those, you should definitely be providing a good fallback. Most of the time, I see fallbacks like this:

```
.element {
	color: rgb(243, 107, 33);
	color: rgba(243, 107, 33 .5);
}
```

If you need to keep color values closer than that, what I&#8217;d recommend for `rgba()` fallback is using Sass&#8217;s `mix()` function to blend the foreground (transparent) and background colors. I&#8217;ve got a <a title="RGBA Color Fallback Mixin on Sassmeister" href="http://sassmeister.com/gist/b687d319b542d0fadb17" target="_blank">working version of that mixin in this Sassmeister gist</a>. (I&#8217;d break it down for you, but I&#8217;m ready to wrap this post up. Look for a future post explaining its inner workings, maybe.)

## Conclusion

Sass is great, but not if it&#8217;s used to create needless CSS. The next time you read a post about &#8220;essential Sass mixins&#8221; or want to start using a detailed mixin library, ask yourself, &#8220;Does this even need a mixin?&#8221; and if it does, &#8220;Is this mixin creating good CSS or bloated CSS?&#8221;

If you&#8217;ve got questions about bloated Sass mixins or unnecessary styles, ask away in the comments. Thanks!