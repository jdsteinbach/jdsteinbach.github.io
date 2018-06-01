---
title: Which Webfont Services Perform the Best?
date: 2015-10-30
author: James Steinbach
layout: post
permalink: /css/webfont-services-perform-best/
categories:
  - CSS
---

Which webfont services perform best? This repo compares the top 4 options for webfont service: Cloud.typography (Hoefler & Co), Typekit (Adobe), Google Web Font, and self-hosted. These services will be graded on the following criteria: overall page speed, total page weight, and total HTTP requests (tested at [webpagetest.org](http://webpagetest.org)).

## Fonts

The sample page is taken from [bestcolleges.com](http://www.bestcolleges.com/resources/). It's currently using Cloud.typography fonts and loading 5 unique font-faces. Tests for Typekit, Google Web Fonts, and self-hosted fonts will use 5 similar font-faces to keep the comparison even. *"Similar" here means roughly equivalent in visual appearance, but identical on (sans) serif, `font-style`, and `font-weight`.*

### Title Font
* H&Co - Tungsten (400 normal)
* Typekit - Bebas Neue (400 normal)
* Google & self-hosted - Oswald (400 normal)

### Body Fonts
* H&Co - Whitney (400 normal, 400 italic, 600 normal, 600 italic)
* Typekit - Freight Sans Pro (400 normal, 400 italic, 600 normal, 600 italic)
* Google & self-hosted - Lato (400 normal, 400 italic, 700 normal, 700 italic)

## Comparison
| | H&Co | TK | GF | SH | None |
|---|:---:|:---:|:---:|:---:|---|
| Speed | 2.08s | 2.26s | 2.03s | 1.82s | 1.62s |
| Weight | 467kb | 454kb | 437kb | 434kb | 3.37kb |
| Requests | 41 | 42 | 44 | 42 | 39 |

Source: [Full data spreadsheet](https://docs.google.com/spreadsheets/d/1GvAYqlhN59Bc0EjQ2_V_0OzNXfzhLLfpW-viygKqPcM/)

## Notes on Individual Services

### Cloud.typography (Hoefler & Co)

Normally, browsers only load files in `@font-face` declarations when the fonts are actually used. Cloud.typography base-64 encodes the entire font file into a stylesheet, ruining the browser's intelligent default behavior. Additionally, Cloud.typography loads 2 copies of every font (A & B - B is a smaller base64 string), creating unnecessary weight & delay.

On the plus side, by encoding all the font files into a single stylesheet, H&Co fonts cache very well.

### Typekit

In these tests, Typekit uses the `async` option. It has the poorest performance of any web font service. While it's only slightly slower for 1st page loads, it doesn't cache well at all, so subsequent page loads are considerably slower than any other service.

Typekit has a great selection of fonts and the subscription model is pretty great, but a little performance is the trade-off.

### Google Web Fonts

Google Web Fonts were the 2nd best performing service: just slightly faster than H&Co. Google adds averages 2-3 http requests more than the other providers (I'm assuming this is related to some kind of tracking they do), but stays fast in spite of that.

Google has a pretty meager selection of *good quality* web fonts, however.

### Self-hosted Fonts

This method is measurably faster than any of the externally-hosted font services above. It gives us fine-tune control over caching, compression, expires-headers, and included font-faces.

We can get good quality webfonts for self-hosting from a few sources: [Google Webfonts Helper](https://google-webfonts-helper.herokuapp.com/fonts), Font Squirrel, MyFonts.com, and other independent font foundries.

Self-hosted fonts require proper web format & licensing: we cannot simply "convert" `.otf` or `.ttf` fonts purchased for desktop / print usage. This may raise the initial assets cost for a site that uses professional-grade web fonts from MyFonts or a similar seller, but there are no long-term subscription costs like H&Co or Typekit.

## Conclusion

Self-hosted web fonts provide the best performance; they also strike a solid balance between quality and cost.

### Sources

* [Google Webfonts Helper](https://google-webfonts-helper.herokuapp.com/fonts) [**free**]
* [Font Squirrel](http://www.fontsquirrel.com/) [**free**]
* [MyFonts.com](https://www.myfonts.com/topwebfonts/) [**paid**]
* [FontSpring](http://www.fontspring.com/web-fonts) [**paid**]
* Individual font foundries [**paid**]
