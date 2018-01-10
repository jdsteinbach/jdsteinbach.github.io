---
title: Why I&#8217;m Not Breaking Up with Sass
author: James Steinbach
layout: post.html
permalink: /sass/not-breaking-up-sass/
categories:
  - Sass
---

You may have seen a post about &#8220;Breaking up with Sass&#8221; recently. In it, [Ben](http://benfrain.com/breaking-up-with-sass-postcss/) explains how he chooses not to use several Sass features and is able to replicate the features he does use with a tool called [PostCSS](https://github.com/postcss/postcss). With PostCSS (and a handful of functions & json files), Ben came up with &#8220;build your own plugins&#8221; system to emulate the Sass features he used. It&#8217;s a fascinating idea and Ben&#8217;s article is pretty even-handed: he blames himself for the break-up, not Sass. He&#8217;s not trying to start a war of words, and I&#8217;m not trying to manufacture one. I do want to take some time to share the reasons I&#8217;m not breaking up with Sass.

## Startup Investment

PostCSS looks like a great tool. It&#8217;s a tool that builds on a lot of other tools, though. If you&#8217;d like to use PostCSS, you&#8217;ll be installing the whole Node / npm thing and installing and configuring a task runner. Sass, on the other hand, is portable enough to plug in to any workflow. Grunt, Gulp, npm tools, Ruby, etc? Yep, there&#8217;s probably a Sass wrapper ready and waiting  without requiring you to spend the better part of a day installing, learning, and configuring a new tool. Of course, if you&#8217;re already using npm, adding a module like PostCSS probably won&#8217;t be too much trouble for you. I&#8217;m projecting a bit of my own experience (used Sass for at least a year before using any npm/task-runners). I&#8217;m also expressing concern for brand-new users. I started using Sass hesitantly; it was the first real workflow automator I picked up. If the instructions had been more complicated than `gem install sass` and `sass --watch main.scss:main.css`, I&#8217;d have been intimidated. Sass had all the tools I needed to get started without being overwhelmed by heavy config/setup work.

## Features

Some people don&#8217;t use all of the features available in Sass. That&#8217;s completely fine. I don&#8217;t use every feature in most projects. But all those features are still there. That makes Sass incredible tool to learning. A newcomer to Sass can start of with nothing more than variables, then break up styles into partials, then create mixins for various design patterns, then use a map to manage all the breakpoint data. This gradual onboarding ease in Sass is fantastic, but it&#8217;s simply not there with a &#8220;build your own plugins&#8221; system like the npm+PostCSS+etc system Ben built.

## Stability

Running your own homemade processor is great if you work alone or on small cutting-edge products. (So is Sass!) But if you&#8217;re in an agency or on an in-house dev team, you need something everyone can work together on. Most of us don&#8217;t want to invent a new system and then spend most our time, mental energy, and emotional capacity troubleshooting it and responding to other people&#8217;s bug reports or complaints. On an enterprise level, a stable tool like Sass makes sense.

## Community

This is the biggest reason I&#8217;m not breaking up with Sass is that it&#8217;s more than just a development tool: it&#8217;s a community. I&#8217;m not just talking about the fact that Sass is popular enough that it has specific channels in several tutorial/blog sites. I&#8217;m talking about people who care about other people. We have have a [conference](http://sassconf.com/), a [camp](http://campsass.com/), a [summit](http://environmentsforhumans.com/2014/sass-summit/), and meetups around the globe ([Austin](http://atxsass.com/), [Portland](http://www.meetup.com/pdxSass/), [NYC](http://www.meetup.com/gothamsass/), [Charlotte](http://cltsass.com), [Denver](http://www.meetup.com/Sass-Hack-Denver/), [London](https://twitter.com/ldn_sass), [DC](http://sassydc.github.io/), [SF](http://thesassway.com/news/sass-meetup-sf-aug-17-2011), [South Florida](https://nvite.com/SouthFlorida/abc), etc)/. You&#8217;ll find Sass talks and workshops cropping up at most front-end or CSS conferences. Why does Sass get so much attention? I&#8217;m convinced it&#8217;s because of the community: people who love Sass and love teaching others. We&#8217;re not perfect, but we care about each other and we want to help newcomers turn into experienced Sass developers. I haven&#8217;t found very many other dev communities this welcoming on such a large scale. Honestly, it&#8217;s a privilege to be part of it.

## Disclaimer

Once upon a time, Sass was the crazy new thing to try and CSS &#8220;purists&#8221; have been resisting it for years now. I started using Sass after it became widely used, so I can&#8217;t personally appreciate what Hampton, Natalie, and Chris went through as pioneers in the early days. I&#8217;m certainly not trying to put down PostCSS or any similarly new front-end tool. There&#8217;s definitely good reason to push boundaries and try experimental workflows and write new tools. I&#8217;m impressed by the people who have the skills to imagine and code those tools.

I&#8217;m not breaking up with Sass, and you don&#8217;t need to either.
