---
layout: layout.liquid
title: Submit an Event
description: Live Jazz Event Listing for Dayton, OH
---

# Submit an Event
Use this form to request an event to be listed on this website. The event will be added upon administrator review.

<form name="event-submit-form" method="POST" data-netlify="true">
	<div class="form-field-container">
		<label for="event-name">Event Name: </label>
		<input name="event-name" type="text" required>
	</div>
	<div class="form-field-container">
		<label for="description">Event Description: </label>
		<textarea name="description" rows="5"></textarea>
	</div>
	<div class="form-field-container">
		<label for="event-date">Event Date: </label>
		<input name="event-date" type="date" required>
	</div>
	<div class="form-field-container">
		<label for="start-time">Start Time: </label>
		<input name="start-time" type="time">
	</div>
	<div class="form-field-container">
		<label for="end-time">End Time: </label>
		<input name="end-time" type="time">
	</div>
	<div class="form-field-container">
		<label for="location-name">Location Name: </label>
		<input name="location-name" type="text" required>
	</div>
	<div class="form-field-container">
		<label for="location-address">Address: </label>
		<input name="location-address" type="textarea">
	</div>
	<div class="form-field-container">
		<label for="image">Upload an image (*.png or *.jpeg only): </label>
		<input name="image" type="file" accept="image/png, image/jpeg">
	</div>
	<input name="submit" type="submit" value="Submit" class="btn">
</form>
