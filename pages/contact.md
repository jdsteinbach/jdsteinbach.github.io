---
title: Get in Touch with Me!
author: James
layout: page
permalink: /contact/
menu_order: 50
menu_title: Contact
---

<p class="form-message"></p>
<form id="contact-form" method="POST" action="//api.jdsteinbach.com/mail/">
  <div class="field-group">
    <label for="name">Your Name</label>
    <input type="text" id="name" class="name" name="name" required>
  </div>
  <div class="field-group">
    <label for="email">Email Address</label>
    <input type="email" class="email" id="email" name="email" required>
  </div>
  <div class="field-group">
    <label for="message">Your Message</label>
    <textarea name="message" id="message" cols="30" rows="5" class="message" required></textarea>
  </div>
  <input id="contact-form-submit" type="submit" value="Send">
</form>
