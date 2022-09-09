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
			title: event.data.event.name,
			url: event.url,
			start: event.data.event.start,
			end: event.data.event.end,
			location: event.data.event.location.name,
			imagePath: event.data.event.imagePath
		%}
	{%- endfor -%}
</section>

<div class="align-right">
	<a href="/events">>> View All Events</a>
</div>

<br>

Do you know of an event that is not listed?
<a href="/submit" class="btn btn-inline">Submit an Event</a>

