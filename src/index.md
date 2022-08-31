---
layout: layout.liquid
title: Home
description: Live Jazz Event Listing for Dayton, OH
---

# Upcoming Events

Last Update: {{ | lastUpdated }}

<section class="events-list">
	{%- for event in collections.futureEvents -%}
		{% include event-card, 
			title: event.data.title,
			url: event.url,
			event-date: event.data.event-date,
			start-time: event.data.start-time,
			end-time: event.data.end-time,
			location: event.data.location,
			image: event.data.image
		%}
	{%- endfor -%}
</section>

<div class="align-right">
	<a href="/events">>> Show More Events</a>
</div>

<br>

Do you know of an event that is not listed?
<a href="/submit" class="btn btn-inline">Submit an Event</a>

