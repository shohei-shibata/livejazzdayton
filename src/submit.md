---
layout: layout.liquid
title: Add an Event
description: Submit new events to be listed on the Live Jazz Dayton calendar.
---

# Submit an Event
Use one of the forms below to request an event to be listed on this website. The event will be added upon administrator review.

## Option 1
Is the event already listed on another website (Facebook, Eventbrite, etc.)? If so, just send me the link and I'll take care of the rest.
<form name="event-submit-short-form" method="POST" action="/success" data-netlify="true">
	<h3>About You</h3>
	<div class="form-field-container">
		<label for="name">Your name: </label>
		<input name="name" type="text" required>
	</div>
	<div class="form-field-container">
		<label for="email">Email: </label>
		<input name="email" type="email" required>
	</div>
	<h3>About the Event</h3>
	<div class="form-field-container">
		<label for="event-url">Event URL: </label>
		<input name="event-url" type="text" placeholder="Example: https://facebook.com/events/58903240023" required>
	</div>
	<input name="submit" type="submit" value="Submit" class="btn">
</form>

## Option 2
You can also enter in the details of the event below.

<form name="event-submit-full-form" method="POST" action="/success" data-netlify="true">
	<h3>About You</h3>
	<div class="form-field-container">
		<label for="name">Your name: </label>
		<input name="name" type="text" required>
	</div>
	<div class="form-field-container">
		<label for="email">Email: </label>
		<input name="email" type="email" required>
	</div>
	<h3>About the Event</h3>
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
