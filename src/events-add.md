---
layout: layout.liquid
title: Add Event
permalink: events/add/index.htm
---

# Submit a New Event

Please fill out the form below. The event will be added to the site once approved by the admin.

I've also made a few templates to help you fill out the form:

### Event Templates

<div class="event-template-buttons-container">
  <button class="btn-secondary">
    <a
      href="/events/add?name=1st%20Sunday%20Jazz%20Jam&start=2024-01-01T19:00:00&artists=Kelli%20Campbell&locationName=Wholly%20Grounds&address=825%20Wayne%20Ave,%20Dayton,%20OH%2045410,%20USA&websiteUrl=https://www.facebook.com/groups/666549373851752&ticketUrl=https://checkout.square.site/merchant/ML3WYYVXDQ2ZY/checkout/FJDPRT4PQY7JCC7FVIDOZFBX&imageUrl=https://trello.com/1/cards/65b234ddd8bf3784bbc933a2/attachments/65b653fe9fe9432e10f99ae7/previews/65b653ff9fe9432e10f99c6e/download/422891944_1133493891398564_8095374200702984370_n.jpg"
      >
      1st Sunday Jazz Jam (Wholly Grounds)
      </a>
  </button>
  <button class="btn-secondary">
    <a
      href="/events/add?name=3rd Saturday Jazz Jam (Springfield)&start=2024-01-01T19:00:00&artists=Connor Smith&locationName=COhatch Springfield&address=101 S Fountain Ave, Springfield, OH 45502, USA&imageUrl=https://trello.com/1/cards/65b238b06f4fb2d045e801ab/attachments/65b238b06f4fb2d045e80211/previews/65b238b06f4fb2d045e80218/download/image.png"
      >
      3rd Saturday Jazz Jam (Springfield)
      </a>
  </button>
  <button class="btn-secondary">
    <a
      href="/events/add?name=Jazz @ Gather&start=2024-01-01T19:00:00&locationName=Gather&address=37 W 4th St, Dayton, OH 45402, USA"
      >
      Jazz @ Gather
      </a>
  </button>
</div>

### Venue Templates

<div class="event-template-buttons-container">
  <button class="btn-secondary">
    <a
      href="/events/add?locationName=The Hidden Gem Music Club&address=507 Miamisburg Centerville Rd, Dayton, OH 45459"
      >
      The Hidden Gem Music Club
      </a>
  </button><button class="btn-secondary">
    <a
      href="/events/add?locationName=The Hidden Gem Music Club&address=507 Miamisburg Centerville Rd, Dayton, OH 45459"
      >
      Gather
      </a>
  </button>
  <button class="btn-secondary">
    <a
      href="/events/add?locationName=Wholly Grounds&address=825 Wayne Ave, Dayton, OH 45410"
      >
      Wholly Grounds
      </a>
  </button>
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
