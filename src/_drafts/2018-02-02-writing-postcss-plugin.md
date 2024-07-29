---
title:  Writing Your First PostCSS Plugin
---

<h2>Why Use PostCSS?</h2>
<p>You may already be using Sass or Less to add logic to your CSS workflow: variables, if/else statements, functions, and mixins. However, there are some limitations to those preprocessors. What if you need to add a CSS property or two based on the presence of other CSS properties? </p>
<p>For example, we’ve worked a lot on <a href="https://dockyard.com/progressive-web-apps">progressive web apps</a> here at DockYard lately. We want that nice native-feeling elastic/inertia scrolling whenever we have an element with <code class="inline">overflow: scroll</code> (or <code class="inline">overflow-x</code> / <code class="inline">overflow-y</code>). Everywhere we make an element scrollable, we’d need to add <code class="inline">-webkit-overflow-scrolling: touch</code>. Preprocessors don’t have a way to detect what properties are in a given selector block, so we’d need a verbose mixin solution. Additionally, we don’t use a preprocessor on every project, so we needed a PostCSS solution.</p>
<p>For the sake of comparison, here’s how we might implement a Sass mixin for this scrolling behavior:</p>

```scss
@mixin overflow-scroll($direction: false) {
  $property: if($direction, 'overflow-#{$direction}', 'overflow');

  #{$property}: overflow;
  -webkit-overflow-scrolling: touch;
}
```

<p><em><a href="https://www.sassmeister.com/gist/3b69f51fab9ca39d6b1e9348d62f3187">See that mixin in use on Sassmeister</a></em>.</p>
<p>This approach works, but it has some significant shortcomings. First, you’re not writing spec CSS anymore: you’re writing a more verbose abstraction. Any dev who comes to this codebase has to learn another abstraction. Second, this isn’t well-automated. If you forget to use the mixin, you don’t get the extra property.</p>
<p>PostCSS, on the other hand, automates this fully with no need for a written abstraction. A PostCSS plugin can find any selector block with a scrolling overflow and insert the additional property automatically.</p>
<h2>What Is PostCSS?</h2>
<p>Before we get into the actual plugin writing process, let’s understand what PostCSS is. PostCSS allows us to manipulate our CSS with JavaScript functions. It does 3 things to accomplish that:</p>
<ol>
<li>PostCSS turns your CSS file into a JS object.
</li>
<li>PostCSS plugins can loop through the object and add/remove/modify selectors and properties.
</li>
<li>PostCSS converts that object back to a CSS file.
</li>
</ol>
<p>If you’re interested in practical value of PostCSS, you can read more about <a href="https://dockyard.com/blog/2016/02/11/transition-to-postcss">why DockYard transitioned to PostCSS</a> and <a href="https://dockyard.com/blog/2016/05/27/narwin-pack-the-postcss-package">our PostCSS package: Narwin-Pack</a>.</p>
<p>There are <a href="https://www.postcss.parts/">dozens of PostCSS plugins</a> already available, openly maintained, and published to npm.</p>
<p>What if you have a use case that’s not covered by an existing plugin? (Perhaps like the one we discussed above?)</p>
<h2>Writing a PostCSS Plugin</h2>
<p>The PostCSS team has done a great job removing obstacles to writing your own plugin. The rest of this tutorial assumes a few things about your skill level:</p>
<ol>
<li>that you’re comfortable with <a href="https://git-scm.com/book/en/v2">git</a> and the <a href="http://linuxcommand.org/lc3_learning_the_shell.php">command line</a>,
</li>
<li>that you can <a href="https://www.javascript.com/">write JavaScript functions</a>, and
</li>
<li>that you have <a href="https://nodejs.org/en/download/">node installed</a> and know how to <a href="https://www.npmjs.com/">install npm modules</a>
</li>
</ol>
<h3>Clone the PostCSS Plugin Boilerplate Repo</h3>
<p>Head over to your terminal and clone the <a href="https://github.com/postcss/postcss-plugin-boilerplate">PostCSS Plugin Boilerplate</a> repo</p>

```sh
$ git clone git@github.com:postcss/postcss-plugin-boilerplate.git
```

<p>Next, run the wizard script from that repo:</p>

```sh
$ node ./postcss-plugin-boilerplate/start
```

<p>This script will ask you several questions in your terminal. It’ll pull your name and email address from your local git profile (if you’ve set that up), and then ask you for your Github username.</p>
<p>Next, you’ll choose your plugin name. It’ll begin with <code class="inline">postcss-</code> and you’ll complete the name. The wizard will then ask you to finish a sentence describing what your plugin will do. Finally, it’ll start a comma-separated list of tags for you to complete.</p>
<p><img src="https://i.imgur.com/mJlzNku.jpg" alt="'PostCSS Plugin Boilerplate wizard'"></p>
<p>Once you’ve finished this setup, you’ll have a boilerplate directory: the wizard created it with the same name that you chose for your plugin while answering the script’s questions. Let’s head over to that directory:</p>

```sh
$ cd postcss-test-plugin
```

<p>In it, you’ll find some familiar components of a node-based project: <code class="inline">index.js</code>, <code class="inline">package.json</code>, a <code class="inline">node_modules</code> directory. You’ll put your logic in <code class="inline">index.js</code>: the functions that manipulate the CSS. If you have any other node module dependencies for your plugin, <code class="inline">package.json</code> will manage them and install them in <code class="inline">node_modules</code>.</p>
<h3>The Boilerplate Code in <code class="inline">index.js</code></h3>
<p>Let’s start by looking at the boilerplate code provided in <code class="inline">index.js</code>:</p>

```js
var postcss = require('postcss');
```

<p>The first thing it does is grab the necessary prerequisite: the PostCSS library itself. The code that follows relies on having access to PostCSS.</p>

```js
module.exports = postcss.plugin('postcss-test-plugin', function (opts) {
    opts = opts || {};
    // Work with options here
    return function (root, result) {
        // Transform CSS AST here
    };
});
```

<p>This block of code is the part that actually contains instructions for manipulating your CSS. </p>
<p>The first thing we’ll need to do is walk through all the declaration blocks in the stylesheet. The <code class="inline">root</code> parameter inside the <code class="inline">return</code> function has a method for that: <code class="inline">.walkRules()</code>.</p>
<h3>Looping Through Each Selector Block</h3>
<p>We’ll upgrade the boilerplate with <code class="inline">.walkRules()</code> to loop through every declaration block and let us access the styles in it:</p>

```js
root.walkRules(function(rule) {
  // We'll put more code here in a moment…
});
```

<p>Now that we’re walking through each selector block, we need to see if it contains a <code class="inline">overflow</code> property. To access those properties, we’ll use the <code class="inline">.walkDecls()</code> method that’s part of the <code class="inline">rule</code> passed to the function above.</p>
<h3>Looping Through Each Property</h3>

```js
rule.walkDecls(function(decl) {
  // We work with each `decl` object here.
});
```
<p>Inside this loop, <code class="inline">decl</code> is an object representing a style declaration. It contains data about the property-value pair as well as some methods for manipulating it. The two most important things for our case are <code class="inline">decl.prop</code> (the property name) and <code class="inline">decl.value</code> (the property value).</p>
<h3>Finding Overflow Properties</h3>
<p>To detect if a <code class="inline">decl</code> is <code class="inline">overflow</code>-related, we could put an <code class="inline">if</code> statement inside this loop: <code class="inline">if (decl.prop.indexOf('overflow') === 0)</code>, but there’s a more efficient way to do that. PostCSS lets us filter for specific properties in the <code class="inline">.walkDecls()</code> method. You can find this in the <a href="http://api.postcss.org/Root.html#walkDecls">PostCSS API Documentation</a>. We don’t need that <code class="inline">if</code> statement if we filter for the <code class="inline">overflow</code> property like this:</p>

```js
rule.walkDecls('overflow', function(decl) {
  // We work with the `decl` object here.
});
```

<p>This isn’t quite right, however. It’s only going to find the <code class="inline">overflow</code> property. If we want to account for <code class="inline">overflow-x</code> and <code class="inline">overflow-y</code> also (and we do), we need to adjust that filter a bit. This <code class="inline">prop</code> parameter doesn’t take an array of property names (I tried <code class="inline">['overflow', 'overflow-x', 'overflow-y']</code>, but no luck). To match multiple properties, we’ll have to use a bit of RegEx: <code class="inline">/^overflow-?/</code>. Here’s a quick explanation for that syntax: the <code class="inline">^</code> means the property name has to start with <code class="inline">overflow</code>; the <code class="inline">-?</code> means “there might or might not be a <code class="inline">-</code> after the word <code class="inline">overflow</code>. Notice that we don’t use <code class="inline">''</code> around the regex. This brings us to:</p>

```js
rule.walkDecls(/^overflow-?/, function(decl) {
  // We work with the `decl` object here.
});
```

<h3>Preventing Duplicate Properties</h3>
<p>It’s taken a bit of time, but now we’re almost there: this code will loop through all the selector blocks in our stylesheet, then loop through all the <code class="inline">overflow</code>-related properties in those selectors. All that’s left to do is insert our property. The next block of code will check to see if the <code class="inline">overflow</code>-related property’s value is <code class="inline">scroll</code> and if so, add the property that makes it feel more native.</p>

```js
if (decl.value === 'scroll') {
  rule.append({
    prop: '-webkit-overflow-scrolling',
    value: 'touch'
  });
}
```

<p>In this case, we are resorting to an <code class="inline">if</code> statement. The loop we wrote a moment ago filtered properties so this function only runs on <code class="inline">decl</code> objects where the property starts with <code class="inline">overflow-?</code>. Now, if <code class="inline">decl.value</code> is <code class="inline">scroll</code>, we’ll add a property-value pair to the parent <code class="inline">rule</code> object. We’re <em>almost</em> done now. It’s possible that someone might have <em>already</em> included the <code class="inline">-webkit-overflow-scrolling</code> property. We don’t want to duplicate it. PostCSS has a function that lets us check to see if a given property is already in a selector block:</p>

```js
var hasTouch = rule.some(function(i) {
  return i.prop === '-webkit-overflow-scrolling';
});
if (!hasTouch) {
  rule.append({
    prop: '-webkit-overflow-scrolling',
    value: 'touch'
  });
}
```

<p>Now we’ve got a better function: if a developer intentionally put the <code class="inline">-webkit-overflow-scrolling</code> where it was needed, we won’t duplicate it.</p>
<h2>Conclusion</h2>
<p>In just 20 lines of code, we’ve created a useful PostCSS plugin.</p>

```js
var postcss = require('postcss');
module.exports = postcss.plugin('postcss-test-plugin', function() {
  return function(root) {
    root.walkRules(function(rule) {
      rule.walkDecls(/^overflow-?/, function(decl) {
        if (decl.value === 'scroll') {
          var hasTouch = rule.some(function(i) {
            return i.prop === '-webkit-overflow-scrolling';
          });
          if (!hasTouch) {
            rule.append({
              prop: '-webkit-overflow-scrolling',
              value: 'touch'
            });
          }
        }
      });
    });
  };
});
```

<p>Of course, there are more complications that we’d consider for production purposes: </p>
<ul>
<li>We could add a CSS comment syntax that allows developers to exclude certain selector blocks from getting elastic scrolling added.
</li>
<li>We may want to allow option parameters so that this plugin only automates elastic scrolling on the <code class="inline">x</code> or <code class="inline">y</code> axis.
</li>
<li>We need to work on <code class="inline">index.test.js</code> so we can ensure this keeps working through any code updates.
</li>
</ul>
<p>But, all things considered, we did put together a working plugin pretty quickly. Hopefully, you’re able to take this walk-through and put together your own PostCSS plugins in the future!</p>
