---
title: Guidelines for Good Float Labels
author: James Steinbach
layout: post
permalink: /ui/float-labels/
categories:
  - UI/UX
  - CSS
excerpt: Float labels are much better than placeholder-only forms, but it still takes work to make them really good.
---

A few years ago, as minimalism was on its rise into web development (and probably for a while before then), designers &amp; developers started (mis)using the HTML `placeholder` attribute to mimic a hidden `label`. Everything was fine and minimal and clean, until we remembered accessibility. Without `label`s, users who had difficulty seeing their screens (for a host of reasons: visual impairment, bright sunshine, dirty glasses, bumpy trains) struggled to read placeholders since browsers default to a pale, barely readable, non-WCAG-compliant gray for that text. And all users (regardless of quality of vision) were forced to memorize the `placeholder` since it disappeared when they started typing!

Matt Smith came up with a cool UI pattern that essentially involved using a real `label` positioned above the form field, then moving it out of the way (usually animated to above the form field) when the user focused in the form field. He called this the ["float label pattern"](http://mds.is/float-label-pattern/). Brad Frost picked up on it and gave us a good look at its [pros &amp; cons and some best practices](http://bradfrost.com/blog/post/float-label-pattern/).

More recently, the float label pattern has gotten some pushback. Adam Silver published a list of reasons (9 when I wrote this) why ["floating labels are a bad idea."](http://mailchi.mp/c717a758bdf9/floating-labels-are-a-bad-idea?e=7f88cc9fce) He raises some valid concerns: I'd like to walk through those now and provide some advice for overcoming some potential shortcomings in your float labels implementation. For simplicity's sake, I'm going to follow his numbered headings.

## 1. There's no space for a hint - _depending on how you implement hints_.

The first recommendation I'd offer here is "design enough space between fields to display hints legibly." There's no limitation inherent in float labels that prevents nicely designed hints. The bad example image in this point on Adam's post shows about `15px` between form fields. That's not a float-label necessity, however. You can add hint elements between fields, keep a clear visual hierarchy, maintain consistent vertical rhythm, and still use float labels. Just move the next field down to create the necessary space!

A second consideration here, however, is the timing of hints. Consider what hints you're planning to display: do they contain descriptive information that a user _needs_ to know before they enter any data? (If so, see the design recommendation above.) Or are they validation messages that aren't strictly necessary for your users to see before they interact with the field? If that's the case, remember that ["the right time to inform about the success/failure of provided data is right after the user has submitted the information."](https://medium.com/@andrew.burton/form-validation-best-practices-8e3bec7d0549) For validation messages, it's better to give the user sufficient opportunity to enter valid information _before_ scolding them for entering invalid information.

For example, if we offer a user an email input field with a validation function running on every `keyup`, we're going to frustrate users. Most of my email addresses have 15 or more characters before I get to the TLD: I don't need to be told I'm "wrong" during all but the final three keystrokes.

If you're delaying validation till _after_ a user has enough of an opportunity to enter a successful answer, great. Now return to the first paragraph in this section: design those validations messages to fit nicely between fields.

## 2. They have small text - _unless you give them bigger text_.

This criticism of float labels is just a reminder to keep your text large enough. Some designers/devs might implement float labels in a way that reduces the perceived font-size of the label down to 10-12px. Be careful not to do that. Push back on design comps that demand such small fonts.

To get real practical, all it takes is `font:size: 18px` on `input`s and full-size `label`s, with a reduction to `16px` in the `label`'s floated state. You can have clear visual hierarchy _and_ labels that are always big enough for users to read.

## 3. They need landing space to move into - _so design it for them_.

Again, this criticism is just a warning to account for all your UI needs up front. If you're trying to implement float labels and don't have anywhere to put the label when it moves, that's a design failure, not a UI pattern failure.

Whether you make the fields large enough to contain the labels, or move the labels above the fields (my preference), it's certainly possible to have float labels with good space to move into.

## 4. Animation is a problem - _so solve it the way you'd solve any animation issue on the web_.

Without a more nuanced discussion, this advice would seem to indicate that we should _never_ animate (or transition, most likely in this case) anything on the web. Animation can be distracting and it can be tasteful _and_ it can be turned off.

Take some time to learn about good animation. I highly recommend [Val Head's "Animation &amp; UX Resources"](http://valhead.com/ui-animation/) and [Rachel Nabors' blog](http://rachelnabors.com/archive/). Read up on techniques for [allowing users to turn off animation](http://alistapart.com/article/designing-safer-web-animation-for-motion-sensitivity) on your sites, and get familair with the [`prefers-reduced-motion` media query](https://css-tricks.com/introduction-reduced-motion-media-query/) on your sites.

## 5. They have poor contrast - _unless you give them good contrast_.

Once again, this warning is against bad color contrast (which can happen on _any_ part of your site, not just forms!), not float labels. You can quickly test the accessibility (WCAG) compliance of any foreground-background color combination with the [WebAIM Color Contrast Checker](http://webaim.org/resources/contrastchecker/). If your float label design relies on colors that don't pass necessary validation, get better colors.

## 6. They may be mistaken for a value - _unless you make them visually distinct_.

Don't use the same color for user-submitted values as you do for the labels. This is a fairly quick fix, in my opinion.

## 7. They are located inconsistently - _yeah_.

This point is a good one, in my opinion. The float label pattern works consistently on text-like `input` (`text`, `email`, `date`, etc), `textarea`s, and `select` (with some extra work probably). However `radio` and `checkbox` fields don't have the same browser default UI and don't lend themselves to float labels at all.

This is a good point to balance against the reasons why you're choosing float labels in the first place. Ask yourself questions like:

* Does this form have `radio` or `checkbox` fields at all?
* How "consistent" do the [`legend`s for those fields](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/legend) need to look compared to the text-like fields?

If you decide to go with float labels and you do have `radio` and `checkbox` fields, you have two options for their `legend`: make it look like the floated version of your float labels, or make it look like the unfloated version of your float labels. Ultimately, either option will be "consistent" with the design. It probably won't change like the float labels, but you can maintain some consistency.

## 8. The label may be cropped - _yep, especially with user-generated forms_.

This concern is important. I've built a lot of WP sites that use form plugins: site editors can build forms and write whatever they want in the label. I can spend my time reminding them to use short labels and long descriptions (hints / validations messages), but I usually can't fully enforce that. I don't like building sites that are easy for someone to break with unexpectedly long content, so in this situation, I'd usually say, "nah, no float labels here." On the other hand, if you're in full control of the `label` content (especially in an app dev situation), this concern may not apply to your form.

## 9. It ignores the standards - _unless it's becoming a new standard_.

Honestly this criticism confuses me. It seems to be saying, "since normally `placeholder`s are inside fields, we shouldn't put a `label` there either." Or maybe, "since labels are conventionally outside of fields, we should follow that." I'm not trying to put words in Adam's mouth/post, but since this point is so short, it's hard to know exactly how its logic plays out (other than "don't use float labels").

There is a good deal of wisdom in respecting established conventions. If a user base broadly expects labels above fields, and placeholders inside them, you do run the risk of making your form unnecessarily challenging to them. But how can you know how your users respond? Not by reading blog posts (including this one)! You need to run A/B tests on _your_ users. Test float labels against standard `label`/`placeholder` patterns. Test different color &amp; font-size combinations within the float label pattern. Test different transition/animation easing &amp; duration values. You'll never understand your users by reading other people's opinions (or even test results): you'll only understand them by doing your own user testing.

## Conclusion

There are a lot of potential pitfalls and UX mistakes you could make with float labels. Those problems are _not_ unavoidable issues that all float label implementations have, however. You should be aware of them - they should help you design forms to be inclusive and accessible for all your users.