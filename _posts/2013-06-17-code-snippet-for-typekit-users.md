---
title: Code Snippet for Typekit Users
author: James Steinbach
layout: post
permalink: /css/code-snippet-for-typekit-users/
categories:
  - CSS
---
If you&#8217;re using Typekit fonts on your website, you&#8217;ve probably got users seeing a FOUC (Flash of Unstyled Content) &#8211; they see the fallback fonts for your text, then they&#8217;ll see a flash, then the content in your custom fonts. To avoid this, just throw the following code into your stylesheet:

    .wf-loading {
      opacity: 0;
    }
    html[class*="active"]{
      opacity: 1;
      transition: opacity .4s ease-in;
      /* Add needed prefixes */
    }

This will hide the page content while the fonts are loading, then ease it in once they&#8217;ve loaded.

Another helpful tip: put the Typekit javascript code in the head of your page (I know, best practices says put most JS in the footer, but Typekit fonts load earlier if you put the code in the header).