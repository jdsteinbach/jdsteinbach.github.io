---
title: Accessible Loading Indicators—with No Extra Elements!
---

<p>It’s almost expected that web apps (no matter what framework or language they use!) will need some time to process their response to user actions. Those delays can be tied to interactions like submitting forms, changing routes, loading content from an API, and uploading files, to name a few. Unfortunately, some apps seem to expect users to instinctively sit still and wait during these asynchronous functions: they don’t bother providing any visual or semantic clues that the app is busy!</p>
<p>We’re going to look at some HTML &amp; CSS that allow us to communicate to users that part of the page is waiting on an async response. These features will communicate to both sighted and screen reader users that the app is busy and they need to wait.</p>
<p>In this post, we’ll gradually improve a block of sample code. For this example, we’ll build a random news article container. Every time a user clicks the “Show New Post” button, the container will load a new article.</p>

```html
<section class="news-wrapper">
  <article class="news">
    <h2 class="news__title">…</h2>
    <img class="news__artwork" src="" alt="" />
    <div class="news__content">…</div>
  </article>
</section>
```

<h2>Accessible Loading Indicator: ARIA Attributes</h2>
<h3><code class="inline">aria-live</code></h3>
<p>There’s a little-known ARIA attribute that tells screen readers and other assistive tech that part of the app contains dynamic content: <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions"><code class="inline">aria-live</code></a>. The <code class="inline">aria-live</code> attribute takes three values: <code class="inline">off</code>, <code class="inline">polite</code>, and <code class="inline">assertive</code> / <code class="inline">rude</code>. Generally speaking, <code class="inline">polite</code> is a good default: it won’t interrupt the user if they’re listening to their assistive tech tell them about other parts of the page and it’s supported by all major screen readers. Alternatively, the <code class="inline">assertive</code> and <code class="inline">rude</code> values will immediately interrupt the user with updates on the element’s content (note: there are some differences between which screen readers support which value). We’ll start by adding <code class="inline">aria-live="polite"</code> to our container:</p>

```html
<section class="news-wrapper" aria-live="polite">
  <!-- contents -->
</section>
```

<h3><code class="inline">aria-busy</code></h3>
<p>Once a container is <code class="inline">aria-live</code>, we can use <a href="https://www.digitala11y.com/aria-busy-state/"><code class="inline">aria-busy</code></a> to tell assistive tech that the container is getting new content. When the container is not refreshing, <code class="inline">aria-busy</code> will be <code class="inline">false</code>, and when it is waiting for new content, it’ll be <code class="inline">true</code>. Let’s add that to our sample code:</p>

```html
<!-- while reloading -->
<section class="news-wrapper" aria-live="polite" aria-busy="true">
  <!-- contents -->
</section>
```

```html
<!-- while stable -->
<section class="news-wrapper" aria-live="polite" aria-busy="false">
  <!-- contents -->
</section>
```

<p>Now our container is correctly signalling to screen readers when our container is “busy” getting new content! Additionally, it’ll automatically read the new content to users without requiring additional interaction from them.</p>
<h2>Visual Loading Indicator: CSS Pseudo-Elements</h2>
<p>Now that we’ve gotten our news container built to serve users relying on assistive tech, let’s add some styles so that sighted users will also know when our container is getting new content.</p>
<p>I’m not going to get into <em>all</em> the container’s layout styles: if you’re doing this in real life, you know your unique CSS concerns better than I do. I’ll just provide the bare minimum for a CSS-only loading indicator. We’re going to use a CSS Grid trick to make some layout overlapping simpler, but if your support requirements don’t match that, there are CSS <code class="inline">position</code> fallback solutions, too.</p>
<h3>Container Layout</h3>
<p>Let’s put some minimal layout CSS on our container. Note: I’ll be using nesting in these code samples, like you’d use in Sass or PostCSS with a nesting plugin.</p>

```scss
.news-wrapper {
  /* 1. Grid Layout */
  display: grid;
  grid-template: "content" 100% / auto;

  &::after {
    /* 2. Grid Positioning */
    grid-area: content;
    align-self: center;
    justify-self: center;

    /* 3. Indicator Styles */
    content: "";
    margin: 3rem auto;
    width: 4rem;
    height: 4rem;
    display: block;
    border: .5rem solid blue;
    border-left-color: transparent;
    border-radius: 50%;
    opacity: 0;
    transition: opacity .1s;
    pointer-events: none;
    animation: loading-circle 1s ease-in-out infinite;
  }
}

.news {
  /* 2. Grid Positioning */
  grid-area: content;
}

@keyframes loading-circle {
  to {
    transform: rotate(360deg);
  }
}
```

<p>Let’s take that CSS apart, section by section.</p>
<h3>1. Grid Layout</h3>
<p>This CSS makes our container a CSS Grid.</p>


```css
.news-wrapper {
  display: grid;
  grid-template: "content" 100% / auto;
}
```

<p>This CSS <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template"><code class="inline">grid-template</code></a> declaration (shorthand for <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-rows"><code class="inline">grid-template-rows</code></a>, <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns"><code class="inline">grid-template-columns</code></a>, and <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-areas"><code class="inline">grid-template-areas</code></a>) creates one column (100% width) and one row (auto height: total height is set by content height), and it <a href="https://css-tricks.com/simple-named-grid-areas/">names that grid area <code class="inline">content</code></a>. “Why use a Grid if it’s only 1×1?” you may be asking. That’s a great question. Setting up 1×1 Grid allows us to position our contents without relying on <code class="inline">position</code> and related measurements. That brings us to internal positioning.</p>
<h3>2. Grid Positioning</h3>
<p>You may be used to <code class="inline">position: relative</code> (on a parent) and <code class="inline">position: absolute</code> (on a child) for centering a child in a parent when the parent contains normal content. However, using Grid lets us do that with fewer side effects.</p>

```css
.news {
  grid-area: content;
}

.news-wrapper::after {
  grid-area: content;
  align-self: center;
  justify-self: center;
}
```

<p>We’ve positioned each child of the Grid container inside the <code class="inline">content</code> area. This will cause those elements (<code class="inline">.news</code> and <code class="inline">.news-wrapper::after</code>) to overlap. Even when there’s a <code class="inline">.news</code> article inside the container, both it and the <code class="inline">::after</code> will be in <code class="inline">content</code> area, overlapping one another. Additionally, the <code class="inline">::after</code> will be centered inside the container.</p>
<h3>3. Indicator Styles</h3>
<p>To summarize the visual styles, this loading indicator is an open, rotating circle. It’s a larger version of buffering spinners you might see in a media streaming site or app.</p>
<p>Notice that we’ve included <code class="inline">pointer-events: none</code>. This element is positioned above the <code class="inline">.news</code> (because it’s later in the DOM), which means even with <code class="inline">opacity: 0</code>, it’ll prevent users from clicking on parts of <code class="inline">.news</code> that are right behind it. Its purpose is visual decoration, so removing <code class="inline">pointer-events</code> prevents the spinner from “getting between” the user and the actual content. Note: we could also solve the overlap problem by changing <code class="inline">z-index</code> when it’s visible, but that requires adding a <code class="inline">position</code>  property, and we’re keeping the CSS as simple as we can.</p>
<h3>Styling with the Attributes</h3>
<p>The last step is the selector for showing the spinner. When the content is busy reloading, we want to make <code class="inline">.news</code> less visible and make the spinner visible. We could use a class for that (you might use <code class="inline">.is-reloading</code>, if you use SMACSS state classes, for example). But we’ve already got a selector in the DOM and there’s no need to duplicate it with another class. Instead we can tie our last few lines of CSS directly to the <code class="inline">aria-busy="live"</code> attribute.</p>

```scss
.news-wrapper[aria-busy="true"] {
  .news {
    opacity: .2;
  }

  &::after {
    opacity: 1;
  }
}
```

<h2>Conclusion</h2>
<p>In this project, we started by considering users who rely on assistive tech to access our site. As we continued, we discovered that by providing a good experience for them, we already had our selectors ready to go for providing visual cues to sighted users. If you’d like to see a demo of the whole thing put together, check out the CodePen below. And of course, if you turn on VoiceOver or another screen reader, you’ll see how both semantic <em>and</em> visual affordances are aligned for users.</p>
<p><iframe src="https://codepen.io/team/DockYard/pen/a521c19f2227127124e9e77d01299323?editors=1100#0" width="100%" height="500"></p>
