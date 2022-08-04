---
title: An Introduction to CSS Logical Properties
author: James Steinbach
layout: post
permalink: /css/logical-properties/
categories:
  - CSS
---

<p>For years, we’ve identified CSS locations with <em>physical</em> keywords: <code class="inline">top</code>, <code class="inline">right</code>, <code class="inline">bottom</code>, and <code class="inline">left</code>. These words are tied to the physical dimensions of the browser viewport itself. Any property containing the word <code class="inline">left</code> is connected to the left edge of the browser window. Many properties use this physical location syntax (<code class="inline">margin</code>, <code class="inline">padding</code>, <code class="inline">border</code>, and the <code class="inline">position</code>-related properties). </p>
<p>We’ve been writing CSS like this for so many years, it’s hard to imagine changing the way we think about identifying locations. However, there’s a new evolution in the way we identify locations and directions in CSS, and it allows us to create much more robust layouts with less code! Let’s take a look at <em>logical properties</em>.</p>
<h2>What Logical Properties Describe</h2>
<p>Logical properties respond automatically to text direction and writing mode. This means that locations formerly identified by <code class="inline">left</code> and <code class="inline">right</code> will automatically reverse for RTL layouts, and horizontal and vertical properties will automatically rotate for vertical writing mode.</p>
<p>If you’re not familiar with “LTR” (left-to-right) and “RTL” (right-to-left) or vertical writing mode, I recommend reading Jen Simmons’ <a href="https://24ways.org/2016/css-writing-modes/">post on writing modes</a> or watching her <a href="https://talks.jensimmons.com/A2frEN">writing modes video</a>.</p>
<h3>Block &amp; Inline</h3>
<p>The new keywords <code class="inline">block</code> and <code class="inline">inline</code> describe vertical and horizontal axes. To remember how these properties work, I like to picture a long paragraph of text.</p>
<p>The <code class="inline">block</code> axis runs from the start to the end of the <strong>block</strong> of text. For languages with horizontal text direction (including both LTR and RTL), that’s the axis that runs from the top to the bottom of the paragraph. For languages with vertical writing mode, the <code class="inline">block</code> axis still runs from the start to the end of each <strong>block</strong> of text. Because these languages present text in vertical columns, however, the <code class="inline">block</code> axis automatically adapts and runs horizontally.</p>
<p>The <code class="inline">inline</code> axis runs from the start to the end of a <strong>line</strong> of text <strong>in</strong> the paragraph. For LTR and RTL languages, that’s horizontal. Just like before, when you use <code class="inline">inline</code> properties in a vertical writing mode, the inline axis adapts and runs vertically.</p>
<p>Another way to describe these new axes is:</p>
<ul>
<li><code class="inline">block</code> = perpendicular to a line of text
</li>
<li><code class="inline">inline</code> = parallel to a line of text
</li>
</ul>
<h3>Start &amp; End</h3>
<p>Now that we can use <code class="inline">block</code> and <code class="inline">inline</code> to identify vertical and horizontal dimensions in a way that adapts to writing mode, we can add  <code class="inline">start</code> and <code class="inline">end</code> to identify which end of the axis we need to target.</p>
<h3>Comparison to Physical Properties</h3>
<p>Let’s get our bearings by looking at the old familiar physical properties</p>
<p><img src="/images/physical-properties.png" alt="Physical Properties"></p>
<p>Now, how do logical properties compare to current physical properties in LTR writing mode?</p>
<ul>
<li><code class="inline">block-start</code> matches <code class="inline">top</code>
</li>
<li><code class="inline">inline-start</code> matches <code class="inline">left</code>
</li>
<li><code class="inline">block-end</code> matches <code class="inline">bottom</code>
</li>
<li><code class="inline">inline-end</code> matches <code class="inline">right</code>
</li>
</ul>
<p><img src="/images/logical-properties-ltr.png" alt="Logical Properties in LTR Writing Mode"></p>
<p>Now, watch how these properties respond to a change in localization. If our site is translated into Arabic or Hebrew, the <code class="inline">dir="rtl"</code> attribute will cause this change in the <code class="inline">inline</code> locations:</p>
<ul>
<li><code class="inline">block-start</code> matches <code class="inline">top</code>
</li>
<li><code class="inline">inline-start</code> matches <code class="inline">right</code>
</li>
<li><code class="inline">block-end</code> matches <code class="inline">bottom</code>
</li>
<li><code class="inline">inline-end</code> matches <code class="inline">left</code>
</li>
</ul>
<p><img src="/images/logical-properties-rtl.png" alt="Logical Properties in RTL Writing Mode"></p>
<p>RTL is cool, but let’s check out the vertical text. Han-based languages (sometimes identified as CJK: Chinese, Japanese, Korean) can run vertically from right to left. If we were building a web app that would be localized for users reading these languages, <a href="https://24ways.org/2016/css-writing-modes/">we could support that writing mode by adding <code class="inline">writing-mode: vertical-rl</code></a> to the root element. Then our logical properties would adapt to match the rotated <code class="inline">block</code> and <code class="inline">inline</code> axes:</p>
<ul>
<li><code class="inline">block-start</code> matches <code class="inline">right</code>
</li>
<li><code class="inline">inline-start</code> matches <code class="inline">top</code>
</li>
<li><code class="inline">block-end</code> matches <code class="inline">left</code>
</li>
<li><code class="inline">inline-end</code> matches <code class="inline">bottom</code>
</li>
</ul>
<p><img src="/images/logical-properties-vertical-rl.png" alt="Logical Properties in Vertical RL Writing Mode"></p>
<p>All the physical properties I mentioned above can be replaced with logical properties: <code class="inline">margin</code>, <code class="inline">padding</code>, and <code class="inline">border</code> properties can be replaced with logical suffixes. Positioning properties like <code class="inline">top</code> are replaced by <code class="inline">inset-block-start</code>. You can even use <code class="inline">float</code> and <code class="inline">clear</code> with logical values: <code class="inline">inline-start</code> and <code class="inline">inline-end</code>.</p>
<h2>Using Logical Properties</h2>
<p>Let’s take a look at some examples of logical properties in real life!</p>
<h3>Available Properties &amp; Values</h3>
<p>Here are a few lists of logical properties and values:</p>
<h4>Properties &amp; Values that You Might Not Have Realized Are Logical</h4>
<p>In Flexbox and Grid, <code class="inline">justify-*</code> and <code class="inline">align-*</code> use logical values.</p>
<ul>
<li><code class="inline">start</code>
</li>
<li><code class="inline">end</code>
</li>
<li><code class="inline">flex-start</code>
</li>
<li><code class="inline">flex-end</code>
</li>
</ul>
<h4>Logical Properties with Solid Modern Browser Support</h4>
<ul>
<li><code class="inline">margin-block-start</code> and similar
</li>
<li><code class="inline">padding-inline-end</code> and similar
</li>
<li><code class="inline">border-block-end</code> and similar
</li>
<li><code class="inline">text-align</code> with <code class="inline">start</code> / <code class="inline">end</code> values
</li>
</ul>
<h4>Logical Properties &amp; Values with only Firefox Support</h4>
<ul>
<li><code class="inline">inset-block-start</code> and similar
</li>
<li><code class="inline">float</code> with logical values
</li>
<li><code class="inline">clear</code> with logical values
</li>
</ul>
<p>Breaking these properties down helps us decide which to use.</p>
<ul>
<li>Seeing Flexbox and Grid as logical property systems help us get our minds around the concepts.
</li>
<li>The properties that are widely supported are worth exploring now (if you don’t support IE11).
</li>
<li>The properties and values that are Firefox-only are good to know about, but not ready for production use, in my opinion.
</li>
</ul>
<h3>Text Alignment in a Grid</h3>
<p>To begin, here’s an example of logical properties at work in some code that may feel familiar to many front-end devs.</p>


```html
<div class="job">
  <h2 class="job__title">Office Manager</h2>
  <p class="job__location">Remote / Chicago</p>
  <p class="job__department">Employee Experience</p>
  <p class="job__hours">Full-Time</p>
</div>
```

```css
.job {
  display: grid;
  grid-template-columns: 1fr auto;
  column-gap: 1rem;
  align-items: center;
  justify-content: start;
}

.job__location,
.job__hours {
  justify-self: end;
}
```

<p>We’ve created a simple job posting card layout with CSS Grid. The column containing the title and department will take up as much room as is available, and the column with the location and hours will be only as wide as it needs to be. We’ll need to align both the location and hours to the end of their column.</p>
<p>Let’s find the logical properties here. First, in <code class="inline">justify-content</code> - the grid columns will all be shifted to the <code class="inline">start</code> of the inline axis. In LTR, they’ll be at the left; in RTL, they’ll be at the right. Second, we’re overriding that <code class="inline">start</code> value for the location and hours. We always want that text to be aligned to the end of the grid, so we justify it with <code class="inline">end</code>. In the past, you might’ve just put <code class="inline">text-align: right</code> on that element (and then needed more CSS to override that in RTL mode). However, using Grid with <code class="inline">justify-self: end</code>, we get the same visual effect <em>and</em> it automatically switches for non-LTR writing modes.</p>
<p>And yes, <code class="inline">text-align: end</code> would produce the same effect as <code class="inline">justify-self: end</code> in this context.</p>
<p><iframe src="https://codepen.io/team/DockYard/pen/b3958c0e1702efe87f91b94a861603bb?editors=1100#0" width="100%" height="500"></iframe></p>
<h3>Absolutely-Positioned Buttons</h3>
<p>I recently worked on a project with horizontally-scrollable rows. Each row had scroll-left / scroll-right buttons absolutely positioned at the left and right edges. The row used Grid layout, so as soon as we went RTL, it flipped automatically, but the buttons stayed put. Let’s use logical properties to solve that problem.</p>

```html
<div class="scroll-row">
  <div class="scroll-row__contents">
    <!-- lots of items -->
  </div>
  <button class="scroll-row__button scroll-row__button--back">Back</button>
  <button class="scroll-row__button scroll-row__button--forward">Forward</button>
</div>
```

```css
.scroll-row {
  position: relative;
}

.scroll-row__button {
  width: 50px;
  position: absolute;
  top: 0;
  bottom: 0;
}

.scroll-row__button--back {
  /* left: -50px; */
  inset-inline-start: -50px;
}

.scroll-row__button--forward {
  /* right: -50px; */
  inset-inline-end: -50px;
}
```

<p>Using <code class="inline">left</code> and <code class="inline">right</code> would have caused RTL problems, but using <code class="inline">inset-inline-*</code> creates positioning that responds correctly to changes in writing mode.</p>
<p><iframe src="https://codepen.io/team/DockYard/pen/feec89c6d776e2bdc2cce623ada3b752?editors=1100#0" width="100%" height="500"></iframe></p>
<h3>Floated Images</h3>
<p>You can use logical properties to make sure floated images are positioned correctly as well. With the existing physical properties, it was common to float images like this:</p>

```css
img.left {
  margin-right: 1rem;
  margin-bottom: 1rem;
  float: left;
  clear: left;
}

img.right {
  margin-left: 1rem;
  margin-bottom: 1rem;
  float: right;
  clear: right;
}
```

<p>But now, with logical properties, we can make that more resilient:</p>

```css
img.start {
  margin-inline-end: 1rem;
  margin-block-end: 1rem;
  float: inline-start;
  clear: inline-start;
}

img.end {
  margin-inline-start: 1rem;
  margin-bottom: 1rem;
  float: inline-end;
  clear: inline-end;
}
```

<p><iframe src="https://codepen.io/team/DockYard/pen/b468a48420bbef653b2c63fdfb6efee8?editors=1100#0" width="100%" height="500"></iframe></p>
<h2>Conclusion</h2>
<h3>Browser Support</h3>
<p>Logical properties appear to have remarkably good browser support. According to caniuse, <a href="https://caniuse.com/#search=logical%20properties">logical property support</a> is as good as Grid support: all major desktop browsers, Mobile Safari, and modern Android browsers.</p>
<p><strong>However, that’s not the end of the story.</strong> I wish it were. It’d be great if logical properties worked as well as caniuse indicates!</p>
<p>First, a number of the properties I showed above are only supported by Firefox at the time of writing:</p>
<ul>
<li><a href="https://caniuse.com/#feat=mdn-css_properties_inset-block-start"><code class="inline">inset-block-start</code></a>
</li>
<li><a href="https://caniuse.com/#feat=mdn-css_properties_inset-block-end"><code class="inline">inset-block-end</code></a>
</li>
<li><a href="https://caniuse.com/#feat=mdn-css_properties_inset-inline-start"><code class="inline">inset-inline-start</code></a>
</li>
<li><a href="https://caniuse.com/#feat=mdn-css_properties_inset-inline-end"><code class="inline">inset-inline-end</code></a>
</li>
<li><a href="https://caniuse.com/#feat=mdn-css_properties_clear_flow_relative_values"><code class="inline">clear: inline-*</code></a>
</li>
<li><a href="https://caniuse.com/#feat=mdn-css_properties_float_flow_relative_values"><code class="inline">float: inline-*</code></a>
</li>
</ul>
<p>This means “non-supporting browsers” is a pretty large category. You still support some browsers that are at least partially non-supporting, even if you’ve dropped IE11. In this case, you could start writing logical properties now and use <a href="https://github.com/csstools/postcss-logical">a PostCSS plugin called postcss-logical-properties</a> to back-fill the old physical values. However, it’s worth noting that that plugin only supports LTR/RTL, not any vertical writing modes.</p>
<p>Without using that PostCSS plugin (which I haven’t tried out on any significant projects, so your mileage may vary), fallback CSS is a bit tricky. The fallback CSS requires an additional attribute selector (<code class="inline">[dir="rtl"]</code>) and that raises your specificity. That higher specificity now overrides your logical property code, even in modern browsers. In the code example below, the 2nd block overrides the 3rd even in supporting browsers, making the logical property effectively worthless. (<a href="https://css-tricks.com/logic-in-media-queries/#article-header-id-5"><code class="inline">@supports</code> and <code class="inline">@media</code> queries don’t increase specificity.</a>)</p>

```css
.element {
  margin-right: 2rem;
}
[dir="rtl"] .element {
  margin-right: 0;
  margin-left: 2rem;
}
@supports (margin-inline-end: 0) {
  .element {
    margin-inline-end: 2rem;
  }
}
```

<p>If all your supported browsers support <code class="inline">@supports</code>, you could do use both positive and negative <code class="inline">@supports</code> queries. <em>Note: IE11 doesn’t support <code class="inline">@supports</code> so this won’t work there.</em></p>

```css
@supports not (margin-inline-end: 0) {
  .element {
    margin-right: 2rem;
  }
  [dir="rtl"] .element {
    margin-right: 0;
    margin-left: 2rem;
  }
}
@supports (margin-inline-end: 0) {
  .element {
    margin-inline-end: 2rem;
  }
}
```

<p>However, that’s a lot of code. In fact, you could delete almost half (6 of those 13 lines) and nothing would change. <span aria-label="sad cat emoji"><span aria-hidden="true">😿</span></span></p>
<p>Unlike CSS Grid and some other areas where <em>new CSS allows entirely new behavior</em>, there’s no visible difference for users if you use logical properties with fallbacks. There are extra lines of code, I’m afraid.</p>
<p>As a rule, I don’t subscribe to the idea that “we shouldn’t use new CSS if we still need to write fallback styles.” However, in this case, writing logical properties with physical property fallbacks has significant specificity complications (which aren’t an issue with Grid). Additionally, the presence of merely partial support in Chrome and Safari makes fallbacks entirely necessary. Here’s a very <a href="https://medium.com/@elad/why-css-logical-properties-arent-ready-for-use-c102925a5cba">detailed explanation of current shortcomings with logical properties</a>.</p>
<h3>My Recommendations</h3>
<p>At this point, my recommendation for implementing logical properties is cautious:</p>
<ul>
<li>Only use properties and values that work in all your supported browsers.
</li>
<li>If you need to include fallback CSS in the same stylesheet, just use the fallback. Save logical properties for later.
</li>
<li>If you need to support older browsers but you’re itching to use logical properties, use logical properties with a PostCSS plugin that converts them to physical properties.
</li>
<li>If your project uses code-splitting in a way that allows different CSS delivery methods that match browser support for logical properties, use logical properties in the CSS that’s delivered to supporting browsers and use physical properties in the CSS that’s sent to non-supporting browsers.
</li>
</ul>
<p>Even if your current projects and requirements don’t allow you to use logical properties in all the ways mentioned here, don’t lose heart! Support will continue to grow and browser support baselines will improve. Knowing this syntax will set up well to write better CSS in the near future.</p>
<h3>Resources</h3>
<ul>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties">https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties</a>/
</li>
<li><a href="https://www.smashingmagazine.com/2018/03/understanding-logical-properties-values">https://www.smashingmagazine.com/2018/03/understanding-logical-properties-values</a>/
</li>
<li><a href="https://css-tricks.com/css-logical-properties">https://css-tricks.com/css-logical-properties</a>/
</li>
</ul>
