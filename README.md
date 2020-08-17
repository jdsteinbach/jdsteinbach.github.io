# Site Generator: jdsteinbach.com

I'm using [11ty](https://www.11ty.io/) to compile Markdown, render Liquid templates, and build my blog. It's a lot like Jekyll, but it runs in JS. That's lighter & quicker for me.

This project uses an [Eleventy template file](https://github.com/jdsteinbach/jdsteinbach.github.io/blob/blog/src/assets/styles.11ty.js) to process CSS (Sass & PostCSS). A [GitHub Action](https://github.com/jdsteinbach/jdsteinbach.github.io/blob/blog/.github/workflows/eleventy_build.yml) builds & deploys it to GitHub Pages hosting.

I'll work on some posts (eventually) on how I converted this over, & what you might want to know if you're considering converting from Jekyll, or setting up an 11ty site.
