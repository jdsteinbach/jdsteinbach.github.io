---
title: 'CSS Repetition: It&#8217;s Basically Whack-A-Mole'
author: James Steinbach
layout: post
permalink: /css/css-repetition-basically-whack-mole/
categories:
  - CSS
  - Sass
---
## If you never repeat selectors in your stylesheet, you&#8217;ll repeat declarations.

Pretty self-explanatory, this one. If you&#8217;ve got four selectors with a few shared properties and you&#8217;re set on not repeating selectors, you repeat all those property declarations.

## If you never repeat declarations, you&#8217;ll repeat selectors.

If I were going to try this, I&#8217;d build a bunch of Sass %placeholders (all pattern library style) and @extend them from all the appropriate selectors.

## If you use single-function selectors, you&#8217;ll repeat classes throughout your HTML markup.

This is the Bootstrap approach: all the visual styles you want to use from Bootstrap&#8217;s CSS require you to add classes to your markup.

## So stop worrying about repetition.

Browsers are just machines and we&#8217;ve got dozens of build tools to compress & minify our HTML/CSS/JS. Instead of pursuing the pipe dream of writing code as efficient as the computers that render it, let&#8217;s pursue code that we can maintain and edit for months to come. If we&#8217;re really that serious about avoiding repetition, we&#8217;d reduce our entire markup / CSS to single-character selectors, right? And if we could replace all the CSS properties with less-than-four-character abbreviations, we could save even more space! But I jest. We&#8217;re never going to do that &#8211; and we shouldn&#8217;t. We need to work hard at writing CSS that we (and our teammates) can update, change, and maintain easily.

I&#8217;m not going to tell you how to write maintainable code: you & your team know your unique constraints much better than I ever will. I will say this: having dipped my toes in BEM, SMACSS, & OOCSS, I&#8217;m leaning toward mixing a flavor of BEM with <a title="Read Semantic CSS with Intelligent Selectors on Smashing Magazine" href="http://www.smashingmagazine.com/2013/08/20/semantic-css-with-intelligent-selectors/" target="_blank">Heydon Pickering&#8217;s &#8220;Semantic CSS with Intelligent Selectors&#8221;</a> at the moment.