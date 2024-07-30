---
title: Animating Background Gradients to Make Your PWA More Native
---

<p>Right now, you can’t transition a gradient in CSS. This is because the various gradient syntaxes (<code class="inline">linear-gradient</code>, <code class="inline">radial-gradient</code>, <code class="inline">repeating-linear-gradient</code>, and <code class="inline">conic-gradient</code>) are all values of the <code class="inline">background-image</code> property. CSS doesn’t currently allow transitions or animations on <code class="inline">background-image</code>, thus gradient can’t be transitioned. Behold:</p>
<p>See the pen <a href="https://codepen.io/jdsteinbach/pen/OxPWRm/">Transitioning Gradient: Background Transition</a> on CodePen.</p>
<p>This is a pretty frustrating limitation. Gradients are made of 3 parts: direction (linear) or position (radial), color values, and color stops. All those values are numbers: a browser should be mathematically capable of transitioning them. Some <a href="https://codepen.io/jdsteinbach/pen/LzLegx">browsers recently started transitioning between background images in <code class="inline">url()</code></a> so it’s unfortunate that browsers won’t transition gradients now.</p>
<p>As we built a recent <a href="https://dockyard.com/progressive-web-apps">progressive web app</a>, we had to work around this limitation. As a user scrolls through a <a href="https://hightide.earth">timeline of tide data</a>, a gradient representing the time of day transitions through gradients with colors representing night, dawn, day, dusk, and a few in-between phases. In order to give our app that native feel of smooth transitions, we had to get clever.</p>
<h2>Previous Tricks</h2>
<p>Some people have figured out some sneaky tricks for pretending to animate a gradient in the background. Let’s look at a few of them quickly:</p>
<h3>Move the Background</h3>
<p>If your gradient needs to move, you can draw it larger than the element that uses it and transition the <code class="inline">background-position</code> property. (Yes, I know this is not a performant transition: I’m not recommending it, just acknowledging that it’s a working hack.)</p>
<p>See the pen <a href="https://codepen.io/jdsteinbach/pen/eGmpmP/">Transitioning Gradient: Background Position</a> on CodePen.</p>
<h3>Move a Pseudo-Element</h3>
<p>This is a modification of the trick above, but instead of transitioning <code class="inline">background-position</code>, it uses the <code class="inline">::before</code> pseudo-element, makes it twice as tall as the containing element, and then transitions <code class="inline">transform</code> for a very performant animation. You get the same visual effect, but it’s much nicer on your device’s processor.</p>
<p>See the pen <a href="https://codepen.io/jdsteinbach/pen/GMgpEW/">Transitioning Gradient: Pseudo-Element</a> on CodePen.</p>
<h3>Use an Overlay</h3>
<p>This fits a separate use case. In this method, we don’t get the visual effect of a “moving” background. Rather, one color changes. In this instance, we create a gradient that fades to transparent in <code class="inline">background-image</code>, then transition the <code class="inline">background-color</code> behind it. Only one of the colors changes, but if the entire <code class="inline">background-gradient</code> is semi-transparent, the entire gradient appears to change color. If you use <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode"><code class="inline">mix-blend-mode</code></a> or <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/background-blend-mode"><code class="inline">background-blend-mode</code></a> (and blending is actually supported in your users’ browsers), you can create some really interesting effects with color blending.</p>
<p>See the pen <a href="https://codepen.io/jdsteinbach/pen/RLNrdq/">Transitioning Gradient: Pseudo-Element Overlay</a> on CodePen.</p>
<h2>A New(er) Trick</h2>
<p>None of these techniques matched our use case, however. We needed to transition <em>both</em> colors in the gradient without any visible motion. We found a good solution using an <strong>SVG mask.</strong></p>
<p>We start by putting an actual SVG into the markup as the immediate child of the element that we want the gradient to cover. Let’s look at that SVG and talk through the code it contains:</p>

```xml
<svg class="bg-mask" viewBox="0 0 1 1" preserveAspectRatio="xMidYMid slice">
  <defs>
    <mask id="mask" fill="url(#gradient)">
      <rect x="0" y="0" width="1" height="1"/>
    </mask>
    <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="100%" spreadMethod="pad">
      <stop offset="0%" stop-color="#fff" stop-opacity="1"/>
      <stop offset="100%" stop-color="#fff" stop-opacity="0" />
    </linearGradient>
  </defs>
  <rect class="fg" x="0" y="0" width="1" height="1" mask="url(#mask)"/>
</svg>
```

<p>In the SVG, we’re using <code class="inline">viewBox="0 0 1 1"</code> so that all the internal coordinates are based off of a 1px relative grid. With CSS, we can stretch the SVG to cover its parent; this <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/viewBox"><code class="inline">viewBox</code></a> just simplifies our math.</p>
<p>When the SVG stretches differently from its 1:1 aspect ratio, we want to keep it scaled nicely. That’s what we gain from <code class="inline">preserveAspectRatio="xMidYMid slice"</code>. The SVG’s internal elements will expand to cover the SVG’s rendered size. If you’re familiar with CSS, this is the equivalent of telling the SVG’s contents to behave like <code class="inline">background-size: cover</code> and <code class="inline">background-position: center</code>. If you’re going with a horizontal or angled gradient, you may need to adjust that value to get the desired visual effect.</p>
<p>The <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Element/defs"><code class="inline">defs</code></a> element in an SVG contains elements that can be used to mask or fill other elements but aren’t visually rendered on their own. Our first element there is <code class="inline">mask</code> that contains a <code class="inline">rect</code> - the mask will be used on a visible element outside of <code class="inline">defs</code>; the <code class="inline">rect</code> ensures that the <code class="inline">mask</code> takes up space.</p>
<p>Then we find a <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Element/linearGradient"><code class="inline">linearGradient</code></a> element: we’ll draw a white gradient from opaque to transparent with two <code class="inline">stop</code> elements. For the <code class="inline">mask</code> to work as desired, their <code class="inline">stop-color</code> needs to be white, but you can modify them or add more as desired to create more complex stripe patterns.</p>
<p>The <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Element/mask"><code class="inline">mask</code></a> is told to use this <code class="inline">linearGradient</code> to create its masking pattern.</p>
<p>Outside of <code class="inline">defs</code> we have a lone <code class="inline">rect</code> - this is the only SVG element visible to users. This element uses <code class="inline">mask="url(#mask)"</code> to create a gradient mask while still allowing us to transition its <code class="inline">fill</code> color with CSS.</p>
<p>This brings us to CSS. Here we can transition or animate the <code class="inline">background-color</code> on the element itself, and the <code class="inline">fill</code> color on the visible rectangle. Ta-da! Both colors in the gradient transitioning together!</p>
<p>See the pen <a href="https://codepen.io/jdsteinbach/pen/jGEqVV/">Transitioning Gradient: SVG Mask</a> on CodePen.</p>
<h2>Gotchas</h2>
<p>Of course, no CSS trick ever works perfectly. We ran into a few snags and trade-offs implementing this technique.</p>
<h3>Performance</h3>
<p>It is true, <code class="inline">color</code> (background, border, or fill) isn’t the most performant property to transition, but it’s not the worst either. We’re including <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/will-change"><code class="inline">will-change</code></a> to get some GPU acceleration help and improve the transition. Also, we’re not going to transition 318 layers simultaneously! In our app, we’re only changing a single instance of this gradient (2 layers). If you use this technique with 1 dozen masked rectangles, your mileage will certainly vary - good luck.</p>
<h3>Banding</h3>
<p>Depending on the mask you draw, you may see visible banding on the gradient. We found this when the gradient was rotated 45°. This is a more complicated issue to solve, but here are the things that helped us improve the visual rendering of the gradient.</p>
<p>We used some CSS on the SVG to smooth it out: <code class="inline">filter: blur(3px)</code>. Different values will give you more or less improvement on the banding issue, but they introduce a performance hit. We started with the blur value at <code class="inline">10px</code> but transitioning the color inside the blurred SVG ended up being <em>really</em> costly and dropped the transition performance well below 60FPS. We dropped the blur down to 3px - now the banding was a bit more noticeable (especially on non-retina screens) but the transition performance was good again.</p>
<p>Using a CSS filter also introduced a new constraint: the blur filter starts from the edge of the container, so the outer <code class="inline">3px</code> of the SVG are “blurred in” and the gradient doesn’t extend edge-to-edge properly. Our solution to this was to change the absolute position values on the SVG: <code class="inline">-3px</code> all around. This required <code class="inline">overflow: hidden</code> on the containing element. In this situation that was the page background, so the <code class="inline">overflow</code> restriction didn’t harm anything, but that’s not true in every situation.</p>
<h2>Conclusion</h2>
<p>We can’t currently transition a CSS gradient, but by using an SVG mask, we can create a gradient and transition all its colors. I’d love to see browser vendors enable transitions on gradients at some point in the future. That transition would likely function similar to <code class="inline">clip-path: polygon()</code> and SVG <code class="inline">path</code> values: browsers require those values to have the same number of points in order to transition them. That would be a reasonable limitation on transitioned gradients. Until then, however, an SVG mask provides the most performant way to transition multiple colors in a gradient.</p>
