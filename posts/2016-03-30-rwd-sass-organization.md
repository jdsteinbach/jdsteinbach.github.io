---
title: Keeping RWD Simple & Sassy – Organization
author: James Steinbach
layout: post
permalink: /sass/rwd-sass-organization/
categories:
  - Sass
excerpt: Programming organizational principles for keeping responsive Sass code clean and maintainable.
---

This is the first post in a series based on my recent RWD Summit talk “Keeping RWD Simple & Sassy.” It covers some important programming principles for keeping any code organized and makes application to your responsive Sass code base.

## Single Source of Truth

There's a principle in data organization and programming called "Single Source of Truth." It means that ideally, a system should only define a piece of data once, then all other references to that data should refer back to the original/canonical definition. While this principle originally described data structures and databases primarily, it does apply to style organization. For example, if you use a specific shade of blue throughout a site, it's best to define that color once (as a variable) and use the variable throughout the rest of your style codebase. You may have heard this same principle explained with the acronym "DRY" - Don't Repeat Yourself.

One clarification on SSoT: this principle does not mean that you never ever type the same value or string twice. This principle applies to data that's repeated "because it's meant to be the same." However, sometimes data points are identical but not on purpose. The height of a site's fixed header might be `80px` (or `5rem` if you like that better) and the page title font-size may be the same size. However, that's not necessarily because they **must** be the same size. SSOT/DRY doesn't mean you have to force identical values into a single variable.

## Naming Things Well

The key to maintainability is consistency. If you need to find and change some code quickly, things have to be named consistently. Let me suggest a naming pattern that'll help with consistency: the words in your variable and file names should go from broad to narrow.

### Name Things Consistently

#### Naming Variables

~~~scss
// Avoid this:
$blue-color:      #0074D9;
$dark-blue-color: #001f3f; // eeny
$blue-dark-color: #001f3f; // meeny
$blue-color-dark: #001f3f; // miney mo
$red-color:       #ff4136;

// Do this:
$color-blue:      #0074D9;
$color-blue-dark: #001f3f;
$color-red:       #ff4136;
~~~

~~~scss
// Avoid this:
$normal-border: 1px solid $color-gray-light;
$fancy-border:  1px solid $color-blue;

// Do this:
$border-normal: 1px solid $color-gray-light;
$border-fancy:  1px solid $color-blue;
~~~

#### Naming Files

~~~
// Cluttered
|–  modules/
|   |–  _block-table.scss
|   |–  _siteheader.scss
|   |–  _4column-block.scss
|   |–  _footer.scss
|   |–  _menus.scss
|   `–  _mobile-nav.scss
|–  reset/
|   `–  _reset.scss
`–  style.scss

// Better
|–  blocks/
|   |–  _block-table.scss
|   `–  _block-columns-4.scss
|–  shared/
|   |–  _site-header.scss
|   |–  _site-footer.scss
|   |–  _nav.scss
|   `–  _nav-mobile.scss
|–  reset/
|   `–  _reset.scss
`–  style.scss
~~~

### Name Things Clearly

Things have to be named clearly as well. You'll often seen developers using all manner of abbreviations for their variables and files. Shorter names might be quicker to type as you create a new codebase, but they're a lot less useful when you need to understand the existing code for a maintenance request later. We often spend a month or two building a site, then a year or more maintaining it. Don't make the long-term maintenance hard for the sake of typing fewer characters while you build the site.

#### Naming Variables

~~~scss
// Harder to read / maintain
$c-bl-dk: #001f3f;
$c-rd-lt: lighten(#ff4136, 25%);
$c-gr:    #3d9970;

// Easier to read / maintain
$color-blue-dark: #001f3f;
$color-red-light: lighten(#FF4136, 25%);
$color-green:     #3D9970;
~~~

#### Naming Files

~~~
// Mysterious
|–  modules/
|   |–  _b-table.scss
|   |–  _s-header.scss
|   |–  _4c-b.scss
|   |–  _ft.scss
|   |–  _m.scss
|   `–  _mob-nav.scss
|–  reset/
|   `– _reset.scss
`–  style.scss

// Clearer
|–  blocks/
|   |–  _block-table.scss
|   |–  _block-columns-4.scss
|–  shared/
|   |–  _site-header.scss
|   |–  _site-footer.scss
|   |–  _nav.scss
|   `–  _nav-mobile.scss
|–  reset/
|   `– _reset.scss
`–  style.scss
~~~

## Making Big Things Small

Using a preprocessor means you no longer need to deal with 1000s of lines of CSS in a single file. (You'll still compile everything to a single CSS file, but you won't have to maintain directly.)

Let's talk about how to organize your preprocessor partials. Credit for this pattern goes to Hugo Giraudel's [Sass Guidelines site](http://sass-guidelin.es/#the-7-1-pattern).

~~~
// 7-1 Sass Folder Pattern
sass/
|–  abstracts/
|–  base/
|–  components/
|–  layout/
|–  pages/
|–  themes/
|–  vendors/
`–  main.scss
~~~

~~~
sass/
|–  abstracts/
|   |–  _variables.scss    # Sass Variables
|   |–  _functions.scss    # Sass Functions
|   |–  _mixins.scss       # Sass Mixins
|   `–  _placeholders.scss # Sass Placeholders
|
|–  base/
|   |–  _reset.scss        # Reset/normalize
|   |–  _typography.scss   # Typography rules
|   …                      # Etc.
|
|–  components/
|   |–  _buttons.scss      # Buttons
|   |–  _carousel.scss     # Carousel
|   |–  _cover.scss        # Cover
|   |–  _dropdown.scss     # Dropdown
|   …                      # Etc.
|
|–  layout/
|   |–  _navigation.scss   # Navigation
|   |–  _grid.scss         # Grid system
|   |–  _header.scss       # Header
|   |–  _footer.scss       # Footer
|   |–  _sidebar.scss      # Sidebar
|   |–  _forms.scss        # Forms
|   …                      # Etc.
|
|–  pages/
|   |–  _home.scss         # Home specific styles
|   |–  _contact.scss      # Contact specific styles
|   …                      # Etc.
|
|–  themes/
|   |–  _theme.scss        # Default theme
|   |–  _admin.scss        # Admin theme
|   …                      # Etc.
|
|–  vendors/
|   |–  _bootstrap.scss    # Bootstrap
|   |–  _jquery-ui.scss    # jQuery UI
|   …                      # Etc.
|
`–  main.scss              # Main Sass file
~~~

* **Abstracts:** variables, mixins, functions, placeholders
* **Vendors:** code libraries from other sources like grid helpers, mixin libraries, etc
* **Base:** boilerplate stuff like reset, typography
* **Layouts:** macro (wireframe) page parts like header, footer, grid
* **Components:** smaller, reusable components like widgets, media, thumbnails
* **Pages:** page-specific styles
* **Themes:** specific theme variations (not common on small/medium sites)
