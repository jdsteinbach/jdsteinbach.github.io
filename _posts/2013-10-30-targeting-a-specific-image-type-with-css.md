---
title: Targeting a Specific Image Type with CSS
author: James Steinbach
layout: post
permalink: /css/targeting-a-specific-image-type-with-css/
categories:
  - CSS
---

<style>
 .image-box { padding: 2em; width: 600px; max-width: 100%; background: #888; margin-bottom: 3em; text-align: center; box-shadow: inset 0 0 1em #444; -webkit-box-shadow: inset 0 0 1em #444;}
.image-box img { width: 240px; max-width: 100%; margin: 1em; display: inline-block; border: #fff 8px solid; box-shadow: 0 2px 4px #444; -webkit-box-shadow: 0 2px 4px #444; }
.meh.image-box img { width: 240px; max-width: 100%; margin: 1em; display: inline-block; border: #fff 8px solid; box-shadow: 0 2px 4px #444; -webkit-box-shadow: 0 2px 4px #444; background: #fff; }
.good.image-box img[src*='png'] { border: none; box-shadow: none; -webkit-box-shadow: none; background: transparent; }
</style>

So I&#8217;m coding up a new site from our designer and he&#8217;s set some nice quasi-polaroid photo effects: white border, box-shadow, etc. This looks great on rectangular images, of course, but not so much on other images with transparency.

<div class="image-box">
  <img class="size-full wp-image-1128 alignnone" alt="Normal rectangular photo image" src="http://jdsteinbach.com/wp-content/uploads/2013/10/stanley-sm.jpg" width="400" height="300" />
  <img class="size-full wp-image-1127 alignnone" alt="Fake logo image with transparency" src="http://jdsteinbach.com/wp-content/uploads/2013/10/fake-logo.png" width="400" height="300" />
</div>

One quick fix is to set the background to the same color as the border. That fixes the lonely frame problem and puts the transparent image on &#8220;card&#8221; of sorts. It&#8217;s a step in the right direction:

<div class="meh image-box">
  <img class="size-full wp-image-1128 alignnone" alt="Normal rectangular photo image" src="http://jdsteinbach.com/wp-content/uploads/2013/10/stanley-sm.jpg" width="400" height="300" />
  <img class="size-full wp-image-1127 alignnone" alt="Fake logo image with transparency" src="http://jdsteinbach.com/wp-content/uploads/2013/10/fake-logo.png" width="400" height="300" />
</div>

My old workaround was to ask our content specialist to add the class &#8220;no-border&#8221; to any image that was transparent and thus shouldn&#8217;t have the border effect. That was less than ideal, however. WordPress doesn&#8217;t make it super-easy to add classes to images, so this would put extra work on him, require new training for anyone else who touches content, and provide an extra avenue for operator error. What I really needed was a way to target the transparent images via CSS without adding anything to them in the CMS.

Today it hit me that I could use an attribute selector to find any PNG and remove the border, shadow, and background from it. <a title="Attribute Selectors on CSS-Tricks" href="http://css-tricks.com/attribute-selectors/" target="_blank">Attribute selectors are good to go on IE 7+ and all real browsers.</a> It&#8217;s a pretty safe bet that the only image with transparency would be a PNG (if for some reason you&#8217;re still using GIFs, though, just modify this code to include them) and that the normal rectangular photo images would be JPGs. Here&#8217;s the code I use to target them (of course, choose your own border / box-shadow and do your own prefixing):

```
img {
  border: border;
  background: border-color;
  box-shadow: box-shadow;
}

img[src*="png"] {
  border: none;
  background: transparent;
  box-shadow: none;
}
```

Now, as you can see below, the JPG photo image has the correct border / box-shadow, while the PNG displays in all its transparent, frame-less glory.

<div class="good image-box">
  <img class="size-full wp-image-1128 alignnone" alt="Normal rectangular photo image" src="http://jdsteinbach.com/wp-content/uploads/2013/10/stanley-sm.jpg" width="400" height="300" />
  <img class="size-full wp-image-1127 alignnone" alt="Fake logo image with transparency" src="http://jdsteinbach.com/wp-content/uploads/2013/10/fake-logo.png" width="400" height="300" />
</div>

Of course, there is a possibility that someone might upload a rectangular photo formatted as PNG, but in my opinion, that&#8217;s a good opportunity to teach them about file formats. Other than education, any ideas on how to improve this snippet to cover non-transparent PNGs?