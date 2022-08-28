---
layout: layout.liquid
title: Submit an Event
description: Live Jazz Event Listing for Dayton, OH
---

# Submit an Event

<form>
	<div>
		<label for="event-name">Event Name: </label>
		<input name="event-name" type="text" required>
	</div>
	<div>
		<label for="description">Event Description: </label>
		<input name="description" type="textarea">
	</div>
	<div>
		<label for="event-date">Event Date: </label>
		<input name="event-date" type="date" required>
	</div>
	<div>
		<label for="start-time">Start Time: </label>
		<input name="start-time" type="time">
	</div>
	<div>
		<label for="end-time">End Time: </label>
		<input name="end-time" type="time">
	</div>
	<div>
		<label for="location-name">Location Name: </label>
		<input name="location-name" type="text" required>
	</div>
	<div>
		<label for="location-address">Address: </label>
		<input name="location-address" type="textarea">
	</div>
	<div>
		<label for="image">Upload an image (*.png or *.jpeg only): </label>
		<input name="image" type="file" accept="image/png, image/jpeg">
	</div>
	<div>
		<input name="submit" type="submit" value="Submit" class="btn">
	</div>
</form>
