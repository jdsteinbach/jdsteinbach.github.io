---
title: Just Details; No Devil
---

<p>Have you ever needed to code a series of collapsible pieces of content? Maybe some FAQs or some “accordion” components to allow readers to dig more deeply into content that was more relevant for them? In agencies or client-facing work, these might be called accordions, collapsible panels, toggled content, plus/minus menus, or something else.</p>
<p>Chances are, you reached for some JavaScript to do that. Maybe you used a definition list (<code class="inline">dl</code>) with click events on all the definition term (<code class="inline">dt</code>) elements? If you were concerned with accessibility, you might have toggled <code class="inline">aria-expanded</code> on each affected definition details (<code class="inline">dd</code>) element. At this point, you’re handling a significant amount of complexity: semantic markup, JS event/state handling, accessibility attribute management.</p>
<p>What if I told you that browsers can natively handle this collapsed-content behavior?</p>
<p>Enter the <code class="inline">details</code> element (and its bff: <code class="inline">summary</code>):</p>
<h2>Introducing <code class="inline">details</code></h2>
<p>The <code class="inline">details</code> element is a pretty useful HTML element that handles collapsible content natively.</p>
<p>Using <code class="inline">details</code> is pretty straightforward: you wrap a <code class="inline">details</code> element around any block of HTML content. The browser will collapse that block of content until a user expands it.</p>

```html
<details>Here’s some content that might not be useful to <i>everyone</i> so we’ve “hidden” it in a details block till a user expands it.</details>
```

<p>Once a user opens a <code class="inline">details</code> block, they’ll be able to read all that hidden content.</p>
<p>If you want a specific <code class="inline">details</code> block to be open by default, set the <code class="inline">open</code> attribute on the opening tag:</p>

```html
<​details open>All of this content will be expanded by default. A user can still collapse this block if they want to.<​/details>
```

<h2>Custom Titles with <code class="inline">summary</code></h2>
<p>By default, browsers give a <code class="inline">details</code> element a generic “Details” title. You can customize that with the <code class="inline">summary</code> element.</p>
<p>Put a <code class="inline">summary</code> at the beginning of your details element and <b>Boom!</b> - you’ve got a custom title for your <code class="inline">details</code> block.</p>

```html
<details>
  <summary>More information about this topic</summary>
  <p>Here’s a lot more information about the topic at hand!</p>
</details>
```

<h2>Styling <code class="inline">details</code> and <code class="inline">summary</code></h2>
<p>You can style the <code class="inline">details</code> and <code class="inline">summary</code> elements however you like. Set a border, some padding, whatever your designs call for.</p>
<h3>Removing the <code class="inline">summary</code> icon</h3>
<p>The <code class="inline">summary</code> element is where the <code class="inline">▸</code> marker lives. If you want to get rid of that, there is a prefixed pseudo-element selector: <code class="inline">::-webkit-details-marker</code>. Set that to <code class="inline">display: none</code> for WebKit browsers.</p>
<p>In Firefox and Edge, it’s a bit different. Change the <code class="inline">summary</code>’s <code class="inline">display</code> value to anything but its native <code class="inline">list-item</code>; then the <code class="inline">▸</code> will be removed.</p>

```css
/* Firefox & Edge */
summary {
  display: block;
}
/* Safari & Chrome */
::webkit-details-marker {
  display: none;
}
```

<h3>Styling open and closed states</h3>
<p>When a <code class="inline">details</code> block is open, it has the <code class="inline">open</code> attribute that I mentioned earlier. To style it (or its children) based on its state, use <code class="inline">details[open]</code>.</p>

```css
details[open] {
  box-shadow: 0 0 5px black;
}
```

<p>Note: there’s no <code class="inline">closed</code> attribute. Any styles you apply without the <code class="inline">[open]</code> selector scope will be used on the closed state.</p>
<h2>JavaScript, Accessibility, and Support</h2>
<h3>No JavaScript required</h3>
<p>It may seem too good to be true, but in supporting browsers, no JS is needed to make <code class="inline">details</code> work. There are a few scenarios that would require JS:</p>
<ul>
<li>Proper behavior in a browser without support
</li>
<li>Forcing open <code class="inline">details</code> to collapse when a user opens another one
</li>
</ul>
<h3>Accessible by default</h3>
<p>Since <code class="inline">details</code> and <code class="inline">summary</code> are native HTML elements, they provide useful semantic information to screen readers.</p>
<p>Screen readers will typically read the <code class="inline">summary</code> for a collapsed <code class="inline">details</code> block (and communicate that it’s collapsed). They’ll also provide an interactive hook for users to open the <code class="inline">details</code> block. If the <code class="inline">details</code> is already expanded, they’ll read the whole content.</p>
<p>I don’t rely on assistive tech to read the web, so I may be unaware of some limitations or drawbacks to using <code class="inline">details</code> and <code class="inline">summary</code>, but I suspect their assistive tech user experience is at least as good as (if not better than) most JavaScript-dependent accordion solutions.</p>
<h3>Browser support</h3>
<p>Unfortunately, <code class="inline">details</code> and <code class="inline">summary</code> don’t work in IE or Edge. They are supported in Firefox (since 49: 2016), Chrome (since 6: 2011), Safari (since 6: 2012), and Android (since 4: 2011). Check out <a href="https://caniuse.com/#feat=details" target="_blank" rel="noopener">caniuse data for <code class="inline">details</code> and <code class="inline">summary</code></a>.</p>
<p>Non-supporting browsers don’t collapse/expand. They show all the contents like a block-level element. This is a very nice bit of progressive enhancement: if a user’s browser doesn’t support <code class="inline">details</code> and <code class="inline">summary</code>, they can still read all the content and custom styles are still applied.</p>
<p>You’ll want to be careful to remove any interactive affordances in IE and Edge: don’t show a user toggle icons for something that won’t move. You can include a <a href="https://www.smashingmagazine.com/2014/11/complete-polyfill-html5-details-element/" target="_blank" rel="noopener">JS polyfill</a> if the behavior is necessary.</p>
<p>It’s unlikely IE11 will be getting any updates on this front, but there’s hope for Edge! If this is important to you, please <a href="https://wpdev.uservoice.com/forums/257854-microsoft-edge-developer/suggestions/6261266-details-summary-elements" target="_blank" rel="noopener">cast a vote a vote for Edge to support <code class="inline">details</code> and <code class="inline">summary.</code></a>.</p>
<h2>Additional Resources</h2>
<p>If you’d like to continue learning about <code class="inline">details</code> and <code class="inline">summary</code>, here’s a list of resources that will be helpful to you:</p>
<ul>
<li>MDN: <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details" target="_blank" rel="noopener">details</a>, <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/summary" target="_blank" rel="noopener">summary</a>
</li>
<li><a href="http://html5doctor.com/the-details-and-summary-elements/" target="_blank" rel="noopener">HTML5Doctor</a>
</li>
<li><a href="https://www.scottohara.me/blog/2018/09/03/details-and-summary.html" target="_blank" rel="noopener">Scott O’Hara</a>
</li>
<li><a href="https://blog.teamtreehouse.com/use-details-summary-elements" target="_blank" rel="noopener">Treehouse Blog</a>
</li>
<li><a href="https://webdesign.tutsplus.com/tutorials/explaining-the-details-and-summary-elements--cms-21999" target="_blank" rel="noopener">Envato Tuts+</a>
</li>
<li><a href="https://caniuse.com/#feat=details" target="_blank" rel="noopener">caniuse table for <code class="inline">details</code></a>
</li>
</ul>
