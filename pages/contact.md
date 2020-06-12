---
title: Get in Touch with Me!
author: James
layout: page
permalink: /contact/
menu_order: 50
menu_title: Contact
excerpt: Do you need to get in touch with James? Email him here.
---

<div id="form-message"></div>
<form class="form form--contact" id="contact-form" method="POST" action="https://api.jdsteinbach.com/mail/">
  <div class="catch-flies hidden" aria-hidden="true">
    <label for="web">Leave this field blank.</label>
    <input type="text" id="web" class="sweetinput" name="web" />
  </div>
  <div class="form__field">
    <label class="form__label" for="name">Your Name</label>
    <input type="text" id="name" class="form__input form__input--name" name="name" required />
  </div>
  <div class="form__field">
    <label class="form__label" for="email">Email Address</label>
    <input type="email" class="form__input form__input--email" id="email" name="email" required />
  </div>
  <div class="form__field">
    <label class="form__label" for="message">Your Message</label>
    <textarea name="message" id="message" rows="10" class="form__input form__input--message" required></textarea>
  </div>
  <button class="form__submit" type="submit">Send</button>
</form>
