---
layout: layout.liquid
title: Add Event
permalink: events/add/index.htm
---

# Submit a New Event

Please fill out the form below. The event will be added to the site once approved by the admin.

Here are a few templates to help you fill out the form:

### Event Templates

<div class="event-template-buttons-container">
  {%- for item in eventTemplates -%}
    {%- if item.type == "event" -%}
    {% capture queryString %}
    /events/add?name={{ item.name }}&start={{ item.start }}&artists={{ item.artists }}&locationName={{ item.locationName }}&address={{ item.address }}&websiteUrl={{ item.websiteUrl }}&ticketUrl={{ item.ticketUrl }}&imageUrl={{ item.imageUrl }}
    {% endcapture %}
    {% include btn-secondary,
      name: item.name,
      url: queryString
    %}
    {%- endif -%}
  {%- endfor -%}
</div>

### Venue Templates

<div class="event-template-buttons-container">
  {%- for item in eventTemplates -%}
    {%- if item.type == "venue" -%}
    {% capture queryString %}
    /events/add?locationName={{ item.locationName }}&address={{ item.address }}
    {% endcapture %}
    {% include btn-secondary,
      name: item.locationName,
      url: queryString
    %}
    {%- endif -%}
  {%- endfor -%}
</div>

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
		<input name="username" id="username" type="text" required>
	</div>
	<div class="form-field-container">
		<label for="email">Email*: </label>
		<input name="email" id="email" type="email" required>
	</div>
  <h3>About the event</h3>
	<div class="form-field-container">
		<label for="name">Title*: </label>
		<input name="name" id="name" type="text" required>
	</div>
	<div class="form-field-container">
		<label for="start">Start date/time*: </label>
		<input name="start" id="start" type="datetime-local" required>
	</div>
	<div class="form-field-container">
		<label for="hours">Duration (HH:MM): </label>
    <div class="form-field-group-duration">
      <input name="hours" id="hours" type="number" value="2" min="0">
      :
      <input 
        name="minutes" 
        id="minutes"
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
      id="artists"
      type="text" 
      placeholder="Please separate names with a comma"
      required
    >
	</div>
	<div class="form-field-container">
		<label for="locationName">Venue Name: </label>
		<input name="locationName" id="locationName" type="text">
	</div>
	<div class="form-field-container">
		<label for="address">Venue Address*: </label>
		<input name="address" id="address" type="text" required>
	</div>
	<div class="form-field-container">
		<label for="desc">Description: </label>
		<textarea name="desc" id="desc" rows="10"></textarea>
	</div>
	<div class="form-field-container">
		<label for="websiteUrl">Event website link: </label>
		<input name="websiteUrl" id="websiteUrl" type="url">
	</div>
	<div class="form-field-container">
		<label for="ticketUrl">Ticket purchase link: </label>
		<input name="ticketUrl" id="ticketUrl" type="url">
	</div>
	<div class="form-field-container">
		<label for="imageUrl">Image URL: </label>
		<input name="imageUrl" id="imageUrl" type="url">
	</div>
	<input name="submit" type="submit" value="Submit" class="btn">
</form>

<script>
  {% include event-form.js %}
</script>
