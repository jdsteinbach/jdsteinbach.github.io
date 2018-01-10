---
title: Firefox Flexbox Bug - Percent-Based Padding/Margin
author: James Steinbach
layout: post.html
permalink: /css/firefox-flexbox-bug/
categories:
  - CSS
---

<style>
.parent {
  background: rgba(255,255,255,.5);
  margin: 1em auto;
  max-width: 90%;
  padding: 1em;
}
.parent::before, .parent::after {
  clear: both;
  content: '';
  display: block;
  width: 100%;
}
.child {
  background: #fff url(//unsplash.it/600/300) center top/contain no-repeat;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.5);
  float: left;
  margin-bottom: 4%;
  margin-right: 4%;
  padding-top: 24%;
  width: 48%;
}
.child:nth-child(2n) {
  margin-right: 0;
}
.child:nth-child(2n + 1) {
  clear: left;
}
.post-content .child p {
  color: #444;
  padding: .5em 1em;
  line-height: 1.3;
}
.parent-2 {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-direction: row;
      -ms-flex-direction: row;
          flex-direction: row;
  -webkit-flex-wrap: wrap;
      -ms-flex-wrap: wrap;
          flex-wrap: wrap;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
      -ms-flex-pack: justify;
          justify-content: space-between;
}
.child-2 {
  float: none;
  -webkit-box-flex: 0;
  -webkit-flex: 0 1 48%;
      -ms-flex: 0 1 48%;
          flex: 0 1 48%;
}
.child-3 {
  background: #fff;
  padding-top: 0;
}
.child-3::before {
  background: #fff url(//unsplash.it/600/300) center top/cover no-repeat;
  content: '';
  display: block;
  padding-top: 50%;
}
</style>

<p>You may be familiar with the trick of using <code>padding-top: X%</code> + background-image to create a box whose size (and contained media) is controlled by an aspect ratio. If not, <a href="http://alistapart.com/d/creating-intrinsic-ratios-for-video/example2.html" target="_blank">read this</a>.</p>
<p>The two rows below show this trick in action. In the first row, the 2-col layout is controlled by %-width and float. It behaves as expected in modern browsers. The downside, of course, is that the column heights don't line up.</p>
<div class="parent">
  <div class="child">
    <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.</p>
  </div>
  <div class="child">
    <p>Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Maecenas sed diam eget risus varius blandit sit amet non magna.</p>
  </div>
  <div class="child">
    <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.</p>
  </div>
  <div class="child">
    <p>Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Maecenas sed diam eget risus varius blandit sit amet non magna.</p>
  </div>
</div>
<p>To get the columns to line up like we want, we can bring in a little flexbox as in the 2nd row. Now our columns have the same height, but Firefox loses its ability to calculate %-based padding. It also loses its %-based margin-bottom.</p>
<div class="parent parent-2">
  <div class="child child-2">
    <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.</p>
  </div>
  <div class="child child-2">
    <p>Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Maecenas sed diam eget risus varius blandit sit amet non magna.</p>
  </div>
  <div class="child child-2">
    <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.</p>
  </div>
  <div class="child child-2">
    <p>Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Maecenas sed diam eget risus varius blandit sit amet non magna.</p>
  </div>
</div>
<p>The quickest solution (in my opinion) is to move the aspect-ratio-controlled box to something besides the flexbox -child. In the 3rd row, the aspect ratio <code>padding-top</code> and <code>background-image</code> have been moved to the <code>::before</code> pseudo-element. Firefox now calculates the %-based padding correctly.</p>
<p><i>Note: earlier, the <code>padding-top</code> value was 24% (50% of 48%) since it's calculated based on the element's parent's width. Since the pseudo-element is 100% of its parent's width, we use <code>padding-top: 50%;</code> to get the right value (50% of 100%).</i></p>
<div class="parent parent-2">
  <div class="child child-3">
    <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.</p>
  </div>
  <div class="child child-3">
    <p>Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Maecenas sed diam eget risus varius blandit sit amet non magna.</p>
  </div>
  <div class="child child-3">
    <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.</p>
  </div>
  <div class="child child-3">
    <p>Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Maecenas sed diam eget risus varius blandit sit amet non magna.</p>
  </div>
</div>
