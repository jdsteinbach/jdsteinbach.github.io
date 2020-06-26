---
title: Tracking WordPress with Git
author: James Steinbach
layout: post
permalink: /wordpress/git/
categories:
  - WordPress
---

* Most common is "only commit themes & plugins" - uploads is big & tied closely to DB (attachment post type), core also tied to DB
* But if you have an instant DB sync tool, probably won't hurt to track the whole thing (just plan for a long 1st commit w/ imgs).
* Either way `.git` usually lives in root; use `.gitignore` to limit what's tracked. I like [WPEngine's way](http://wpengine.com/git)
* If you've got a trackable, repeatable dev environment (like Vagrant, etc), you'll probably want to track env config stuff too.
* Haven't used it yet, but there's a relatively new plugin to track both DB & files in Git: [Revisr](https://wordpress.org/plugins/revisr/)