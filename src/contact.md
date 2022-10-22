---
layout: layout.liquid
title: Contact Form
description: Submit a message to the admin of Live Jazz Dayton website.
---

# Contact Me

Use the form below to send me a message! Any suggestions to improve this website, or anything else that is on your mind. I'd love to hear from you.

If you are interested in building a website, or need help with an existing one, I may be able to help! Feel free to contact me if you are interested in my services as a web developer.

<form 
  class="contact-form" 
  name="contact-form" 
  method="POST" 
  action="/success" 
  data-netlify="true"
>
  <input 
    type="hidden" 
    name="subject" 
    value="Live Jazz Dayton Contact Form Submission" 
  />
	<div class="form-field-container">
		<label for="name">Your name: </label>
		<input name="name" type="text" required>
	</div>
	<div class="form-field-container">
		<label for="email">Email: </label>
		<input name="email" type="email" required>
	</div>
	<div class="form-field-container">
		<label for="message">Message: </label>
		<textarea name="message" rows="10"></textarea>
	</div>
	<input name="submit" type="submit" value="Submit" class="btn">
</form>
