---
title: 'What If It Doesn&#8217;t Need to Move?'
author: James Steinbach
layout: post
permalink: /css/doesnt-move/
categories:
  - CSS
---
You&#8217;re probably familiar with sites that capitalize on awesome, shiny, motion-y, snappy, clever &#8220;UI Design.&#8221; [Codrops](http://tympanus.net/codrops/category/playground/) and [CodyHouse](http://codyhouse.co/library/) are two of my favorites. These sites (and others like them) specialize in creative animations and UI effects that are designed to impress, get clicks, and end up in newsletters. None of those goals are bad goals, but when we&#8217;re building sites in real life, we need to evaluate another goal: to make things easy for users.

## Don&#8217;t slow users down.

Sure, most sites have a little load time delay on each page. But there&#8217;s a world of difference between a second of load time and a second of load time followed by a half-second animation. Menus (especially on mobile) need to be quick too: don&#8217;t make users wait for a 5 pieces of a layout to shuffle like playing cards before menu links are available. I&#8217;m not against animation here, not at all! I&#8217;m recommending that we keep them subtle and fast. As [Rachel Nabors cautions us](http://24ways.org/2014/five-ways-to-animate-responsibly/), an animation can be &#8220;cute the first time but by the 70th time&hellip; It&#8217;s annoying!&#8221;

## Don&#8217;t distract users.

Button animations, amirite? You may have seen the recent demo page full of quirky, colorful button animations. In the demo, all the action happened on `:hover`. Please don&#8217;t do that. The point of a button is to encourage users to click and complete a task. If you put a 500ms animation on a button&#8217;s hover state, what have you done? At best, you&#8217;ve given people a reason to stop and watch the button &hellip; *instead of completing their task*. At worst, you distract and confuse them, causing some to fail to complete the task. Make your button `:hover` transitions subtle. If you absolutely must do something crazy, do it on *click*. Your users are just waiting for feedback at that point. If you&#8217;ve got a meaningful animation, let them watch it then!

## Don&#8217;t feel bad.

We&#8217;ve probably felt some false guilt about flashy animations at some point. You launch a project and the next day, you see a tweet about a crazy UI animation that your project doesn&#8217;t have. Other times, that pressure is external: a stakeholder or boss gets their hands on an animation library&#8217;s demo page and tells you that you need that kind of &#8220;pop&#8221; to take your work to the next level. Please fight off this guilt. I know, it&#8217;s hard defending your work and educating people who want flash without understanding UI design.

## Conclusion

I&#8217;m not an animation expert (I&#8217;m doing what I can to learn!) and I&#8217;m not mad at any creative web animation demo sites (they&#8217;re a lot of fun and spark some great ideas!). I do want us to take time to design *user* interface animations that provide a good *user* experience. There&#8217;s no shame in avoiding the glitz and glamour if you&#8217;re giving your users instructive, helpful transitions.