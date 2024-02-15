---
layout: layout.liquid
title: Home
description: Live Jazz Event Listing for Dayton, Ohio
---

{% if announcements.size > 0 %}
<section class="announcements-list">
  <h1>Announcements</h1>
    {%- for announcement in announcements limit:3 -%}
      {% include announcement-card %}
    {%- endfor -%}
</section>
{% endif %}

<section class="events-list">
<h1>Upcoming Events</h1>
<p>Last Update: {{ | lastUpdated }}</p>
	{%- for event in events limit:3 -%}
		{% include event-card, 
			title: event.title,
			slug: event.slug,
			start: event.start,
			end: event.end,
			location: event.location.name,
			image: event.image,
			artists: event.artists
		%}
	{%- endfor -%}
<div class="align-right">
	<a href="/events">>> View All Events</a>
</div>

<br>

<p>
  Do you know of an event that is not listed?
  <a href="/events/add" class="btn btn-inline">Submit an Event</a>
</p>

</section>