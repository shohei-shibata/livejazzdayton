---
layout: layout.liquid
title: Home
description: Live Jazz Event Listing for Dayton, OH
---

## Upcoming Events

<section class="events-list">
	{%- for event in collections.futureEvents -%}
		{% include event-card, 
			title: event.data.title,
			url: event.url,
			event-date: event.data.event-date,
			location: event.data.location
		%}
	{%- endfor -%}
</section>

