---
title: 99/100 Google Page Speed Score
author: James Steinbach
layout: post
permalink: /performance/99-100-google-page-speed/
categories:
  - Performance
---
With all my WordPress sites, it&#8217;s taken a *lot* of work to get a Google Page Speed score above 90. When I moved this site to Jekyll & Github pages hosting, I instantly got a 93/100. I wasn&#8217;t satisfied (since I hadn&#8217;t put any effort into it!), so I started looking for ways to optimize things even more. Garth Braithwaite&#8217;s Medium post &#8220;[Becoming a Jekyll God][2]&#8221; had all the tools I needed to get to 99/100.

## Inline CSS

Garth points out that you can tell Jekyll to minify your CSS output by putting the following in your `_config.yml` file:

~~~ruby
sass:
  style: compressed
~~~

Then the article recommended going one step farther and inlining the entire style sheet into your document.

1. Move your `main.css` (or `style.scss` - whichever is being used in your theme) into your `/_includes/` directory.
2. Remove the “front matter” from that `.scss` file (everything between `---` and `---`.
3. In your `<head>` (probably in `/_includes/head.html`), replace the `<link rel=“stylesheet” … >` line with the following:

~~~html
<style type="text/css">
  {% raw %}{% capture include_to_scssify %}
    {% include main.scss %}
  {% endcapture %}
  {{ include_to_scssify | scssify }}{% endraw %}
</style>
~~~

## Compressed HTML

Compressing HTML was the next huge win for me. This requires an extra `.html` file in `/_layouts/`. You can [download `compress.html` here][1].

Most likely, your layout files are all calling a single &#8220;root&#8221; layout file. In the default theme, `page.html` and `post.html` both called `default.html` in their front matter. If that&#8217;s the case for you, copy `compress.html` to your `/_layouts/` directory and add the following to the top of `default.html`:

~~~ruby
---
layout: compress
---
~~~

## Caching

I&#8217;m using [CloudFlare](https://www.cloudflare.com "Visit cloudflare.com") to manage DNS for this site. For this domain, I went to “CloudFlare Settings” and clicked the “Performance Settings” tab. On that screen, I told CloudFlare to cache resources for 24 days (very aggressive), and minify JS, CSS, &amp; HTML. I realize, doing this after the HTML compression trick above is probably overkill. I may review that, do some testing and remove the compression from Jekyll. We&#8217;ll see.

![Screenshot showing 99/100 Google Page Speed Score](/images/99-100-google-page-speed.jpg "Google Page Speed")

> Note: I&#8217;m constantly playing with things on this site, so the 99/100 may come and go.

[1]: https://github.com/penibelst/jekyll-compress-html/releases/tag/v1.1.1 "Download compress.html"
[2]: https://medium.com/design-open/becoming-a-jekyll-god-ef722e93f771 "I am a Jekyll God"