---
layout: layout.liquid
title: Contact Form
description: Live Jazz Event Listing for Dayton, OH
---

# Contact Admin
Use the form below to send me a message! Any suggestions to improve this website, or anything else that is on your mind. I'd love to hear from you.

<form name="contact-form" method="POST" action="/success" data-netlify="true">
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
