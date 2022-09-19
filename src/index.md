---
layout: layout.liquid
title: Home
description: Live Jazz Event Listing for Dayton, Ohio
---

# Upcoming Events

Last Update: {{ | lastUpdated }}

<section class="events-list">
	{%- for event in events limit:3 -%}
		{% include event-card, 
			title: event.title,
			url: event.permalink,
			start: event.start,
			end: event.end,
			location: event.location.name,
			image: event.image,
			artists: event.artists
		%}
	{%- endfor -%}
</section>

<div class="align-right">
	<a href="/events">>> View All Events</a>
</div>

<br>

Do you know of an event that is not listed?
<a href="/submit" class="btn btn-inline">Submit an Event</a>

