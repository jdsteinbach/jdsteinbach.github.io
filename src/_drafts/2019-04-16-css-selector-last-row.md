---
title: CSS Selectors for the Entire Last Row of a Dynamic Grid
---

<p>Allow me to begin by describing a recent layout problem I needed to solve. I was working with a dynamic grid of items: the number of items in the grid was variable (provided by an API payload, not a predictable multiple of the column count). The grid items used <code class="inline">margin-bottom</code> to create vertical space (browser-support requirements didn’t allow CSS Grid and <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/row-gap"><code class="inline">row-gap</code></a>), so items in the bottom row of the grid needed that margin removed (or else there would have been too much space below the grid container). For example, we might be styling a grid of related products with a variable number. A calendar layout would match this use case too, since the final row of “days” would vary by month.</p>
<p>I needed a way to select elements in the final row of that grid. Here’s the CSS selector set I used to target elements in the last row.</p>
<h2>Finding Children that Could Be in the Final Row</h2>
<p>I started by finding all the elements that <em>could be</em> in the last row. The <code class="inline">:nth-last-child()</code> selector makes this possible. The <code class="inline">:nth-last-child()</code> behaves just like <code class="inline">:nth-child()</code> but calculates all element positions from the end of the parent element, not the beginning.</p>
<p>For example, this CSS finds the third element from the end of its parent:</p>

```css
.child:nth-last-child(3) { }
```

<p>This CSS targets every even-numbered child element, starting at the end:</p>

```css
.child:nth-last-child(even) { }
```

<p>This CSS selects the last four children in the parent element:</p>

```css
.child:nth-last-child(-n + 4) { }
```

<p>That’s the pattern we need to select the elements that could be in the final visible row. Here’s how that would work with a responsive grid that expands from two columns to four columns to six columns inside media queries:</p>

```css
/* Under 500px, select the last 2 elements */
@media (max-width: 499px) {
  .child:nth-last-child(-n + 2) { }
}
/* Between 500px - 799px, select the last 4 elements */
@media (min-width: 499px) and (max-width: 799px) {
  .child:nth-last-child(-n + 4) { }
}
/* At 800px & above, select the last 6 elements */
@media (min-width: 800px) {
    .child:nth-last-child(-n + 6) { }
}
```

<p>With these selectors, we’ve targeted any element that <em>could be</em> in that last row of the grid. We still have a small problem however. If the data doesn’t provide enough items to fill the final row, we’ve selected too many items. For example, if the payload from the API returned nine items, and our grid was six columns wide, we’d only have three items in the last row, but this CSS selector would select the final six items. In just a moment, we’ll add another selector that allows us to select <em>only</em> the final three items in that example.</p>
<p>Notes: I used strictly limited <code class="inline">min-width</code> &amp; <code class="inline">max-width</code> media queries because <code class="inline">:nth-child()</code> adds specificity that we don’t want to have to override at a new breakpoint.</p>
<p>For more information about these selectors, read our <a href="https://dockyard.com/blog/2017/12/20/first-child-last-child-nth-child-and-not-nth-child">DockYard introduction to these pseudo-classes</a>, or MDN’s <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child"><code class="inline">:nth-child()</code></a> and <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-last-child"><code class="inline">:nth-last-child()</code></a> docs.</p>
<h2>Finding the First Child in Every Row</h2>
<p>We can chain multiple pseudo-selectors onto a single CSS selector. This will allow us to find the element that’s possibly in both the final row <em>and</em> the first child of a row. We’ve already got the elements that <em>could be</em> in the final row. Now let’s select any element that’s first in its row. (For this example, we’re assuming six elements per row.)</p>
<p>The <code class="inline">:nth-child()</code> selector gives us access to every element that’s first in its row, as long as we know the number of columns. (In this example, we’re using six columns.)</p>

```css
.child:nth-child(6n + 1) { }
```

<p>Inside the <code class="inline">:nth-child()</code> function, <code class="inline">6n</code> finds every element whose position is divisible by six (<code class="inline">0</code>, <code class="inline">6</code>, <code class="inline">12</code>, so on). That’s the last element in every row, so we all <code class="inline">+ 1</code> and the selector now targets the next element position (<code class="inline">1</code>, <code class="inline">7</code>, <code class="inline">13</code>, so on). We’ve now selected the first element in every row:</p>
<ul>
<li>item 1 == <code class="inline">(6 * 0) + 1</code>
</li>
<li>item 7 == <code class="inline">(6 * 1) + 1</code>
</li>
<li>item 13 == <code class="inline">(6 * 2) + 1</code>
</li>
<li>item 19 == <code class="inline">(6 * 3) + 1</code>
</li>
</ul>
<p>We combine <code class="inline">:nth-child(6n + 1)</code> with <code class="inline">:nth-last-child(-n + 6)</code>, and now we have a single line of CSS that always selects the first element in the last row of content:</p>

```css
.child:nth-child(6n + 1):nth-last-child(-n + 6)
```

<p>There’s one more small adjustment we need to make. We’ve selected the first element in the last row, but we also need <em>all the other elements</em> in the last row. CSS’s <code class="inline">~</code> selector (<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/General_sibling_combinator">general sibling combinator</a>) lets us select all of those elements:</p>

```css
/* first row item & in the last row */
.child:nth-child(6n + 1):nth-last-child(-n + 6),
/* all the remaining children */
.child:nth-child(6n + 1):nth-last-child(-n + 6) ~ .child { }
```

<p>The first line in that selector finds just the element that is both “the first child in its row” and “within the last row count of items.” The second line finds all the elements that follow the first element in the final row.</p>
<p>For any grid column count, we can substitute the column count for <code class="inline">6</code>, and we can also wrap it in media queries for responsive selectors. Here’s our responsive CSS from earlier, upgraded with our awesome selector:</p>

```css
@media (max-width: 499px) {
    .child:nth-child(2n + 1):nth-last-child(-n + 2),
    .child:nth-child(2n + 1):nth-last-child(-n + 2) ~ .child { }
}
@media (min-width: 500px) and (max-width: 799px) {
    .child:nth-child(4n + 1):nth-last-child(-n + 4),
    .child:nth-child(4n + 1):nth-last-child(-n + 4) ~ .child { }
}
@media (min-width: 800px) {
    .child:nth-child(6n + 1):nth-last-child(-n + 6),
    .child:nth-child(6n + 1):nth-last-child(-n + 6) ~ .child { }
}
```

<p>Here’s a CodePen showing this CSS in action:</p>
<iframe style="width: 100%;" scrolling="no" title="Selecting the final row of elements in a dynamic grid by James Steinbach" src="//codepen.io/team/DockYard/embed/voZKbe/?height=300&amp;theme-id=0&amp;default-tab=html,result" allowtransparency="true" allowfullscreen="true" height="300" frameborder="no">
  See the Pen <a href='https://codepen.io/team/DockYard/pen/voZKbe/'>Selecting the final row of elements in a dynamic grid by James Steinbach</a> by DockYard
  (<a href='https://codepen.io/DockYard'>@DockYard</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe><p><em>Note: If you’re into Sass or a similar preprocessor, this repetitive code could be <a href="https://www.sassmeister.com/gist/07a4123ac28d17f8655a4372b8438835">DRYed out with a mixin</a>.</em></p>
<h2>A Better Way: Grid</h2>
<p>Of course, it’s worth pointing out that this exact problem would be a non-issue with CSS Grid. In CSS Grid, we’d use the <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/row-gap"><code class="inline">row-gap</code></a> property to create space only between rows: there’d be no need to find the final row items to override any spacing or layout CSS.</p>
