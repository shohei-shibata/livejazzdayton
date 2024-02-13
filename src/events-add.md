---
layout: layout.liquid
title: Add Event
permalink: events/add/index.htm
---

# Submit a New Event

Please fill out the form below. The event will be added to the site once approved by the admin.

<form 
  class="new-event-form" 
  name="new-event-form" 
  method="POST" 
  action="/.netlify/functions/createEvent" 
>
  <input 
    type="hidden" 
    name="subject" 
    value="New Event Submission" 
  />
  <h3>About you</h3>
	<div class="form-field-container">
		<label for="username">Name*: </label>
		<input name="username" type="text" required>
	</div>
	<div class="form-field-container">
		<label for="email">Email*: </label>
		<input name="email" type="email" required>
	</div>
  <h3>About the event</h3>
	<div class="form-field-container">
		<label for="name">Title*: </label>
		<input name="name" type="text" required>
	</div>
	<div class="form-field-container">
		<label for="start">Start date/time*: </label>
		<input name="start" type="datetime-local" required>
	</div>
	<div class="form-field-container">
		<label for="hours">Duration (HH:MM): </label>
    <div class="form-field-group-duration">
      <input name="hours" type="number" value="2" min="0">
      :
      <input 
        name="minutes" 
        type="number" 
        value="0" 
        min="0" 
        max="59"
      >
    </div>
	</div>
	<div class="form-field-container">
		<label for="artists">Who is playing?*: </label>
		<input 
      name="artists" 
      type="text" 
      placeholder="Please separate names with a comma"
      required
    >
	</div>
	<div class="form-field-container">
		<label for="locationName">Venue Name: </label>
		<input name="locationName" type="text">
	</div>
	<div class="form-field-container">
		<label for="address">Venue Address*: </label>
		<input name="address" type="text" required>
	</div>
	<div class="form-field-container">
		<label for="desc">Description: </label>
		<textarea name="desc" rows="10"></textarea>
	</div>
	<div class="form-field-container">
		<label for="websiteUrl">Event website link: </label>
		<input name="websiteUrl" type="url">
	</div>
	<div class="form-field-container">
		<label for="ticketUrl">Ticket purchase link: </label>
		<input name="ticketUrl" type="url">
	</div>
	<div class="form-field-container">
		<label for="imageUrl">Image URL: </label>
		<input name="imageUrl" type="url">
	</div>
	<input name="submit" type="submit" value="Submit" class="btn">
</form>
