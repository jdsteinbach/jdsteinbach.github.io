---
title: Using a Gradient as the Image in a CSS Border-Image
author: James Steinbach
layout: post
permalink: /css/using-gradient-image-css-border-image/
categories:
  - CSS
codepen: true
---
The CSS `border-image` property accepts any valid image format for its image value. That includes CSS gradients. I regularly get design comps that include border gradients (usually a solid line that fades to transparent at both ends). Combining gradients with border-images allows me to do that without needing an image / pseudo-element hack. Here&#8217;s a pen:

<p class='codepen'  data-height='170' data-theme-id='0' data-slug-hash='vifnp' data-default-tab='result' data-line-numbers='' data-animations='run'>
  See the Pen <a href="http://codepen.io/jdsteinbach/pen/vifnp/">Using a gradient for a border</a> by James Steinbach (<a href="http://codepen.io/jdsteinbach">@jdsteinbach</a>) on <a href="http://codepen.io">CodePen</a>.
</p>

I&#8217;m using Sass with Bourbon&#8217;s border-image @mixin to handle cross-browser prefixing. After the gradient syntax, I used `1` for all the slice values &#8211; this tells the browser where to offset any slice in the image (which we&#8217;re not doing). The `stretch` value sets the gradient to 100% width & height of the border-box. After the border-image declaration, I fine-tuned the actual width with the `border-width` property, including a `:last-child` to remove the extra border from the final item. (You can read all the juicy details about the [CSS border-image property](http://css-tricks.com/understanding-border-image/) on CSS-Tricks.)

Using CSS gradients for border-images gives us a lot more customizability than simple solid (dashed, double, whatever) borders. For example, you could use this on an `<hr />` element or the bottom of any element to get a fade-in-out line for a divider between vertically stacked elements. You could also use a radial gradient to create more interesting picture borders. Check this pen out:

<p class='codepen'  data-height='540' data-theme-id='0' data-slug-hash='dvmwu' data-default-tab='result' data-line-numbers='' data-animations='run'>
  See the Pen <a href="http://codepen.io/jdsteinbach/pen/dvmwu/">Using a radial gradient for a border</a> by James Steinbach (<a href="http://codepen.io/jdsteinbach">@jdsteinbach</a>) on <a href="http://codepen.io">CodePen</a>.
</p>

Of course, there&#8217;s a big IE catch: <a title="Can I Use data: border-image" href="http://caniuse.com/border-image" target="_blank">border-image is only supported by IE11</a>. If this ornamentation is necessary, you&#8217;ll want to include a solid border-color fall-back for IE10 & down.

What uses do you see for using CSS gradients as the image in a CSS border-image property? Please share a <a title="CodePen" href="http://codepen.io" target="_blank">CodePen</a>, <a title="JSFiddle" href="http://jsfiddle.net/" target="_blank">JSFiddle</a>, <a title="Dabbblet" href="http://dabblet.com/" target="_blank">Dabbblet</a>, <a title="SassMeister" href="http://sassmeister.com/" target="_blank">SassMeister gist</a>, (or whatever sandbox you prefer!) in the comments below!
