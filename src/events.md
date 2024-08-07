---
layout: layout.liquid
title: Events
description: A full listing of upcoming live jazz events in and around Dayton, Ohio.
pagination:
  data: events
  size: 5
---

# Upcoming Events

Do you want to know what you have missed? You can view them at <a href="/past-events">Past Events</a>

Last Update: {{ | lastUpdated }}

<section class="events-list">
	{%- for event in pagination.items -%}
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
	<div id="pagination">
		<div id="pagination-link-previous">
			{%- if pagination.href.previous -%}
				<a 
					href={{ pagination.href.previous }}
				>
					<< Previous Page
				</a>
			{%- endif -%}
		</div>
		<div id="pagination-current-page">
		  Page {{ pagination.pageNumber | plus:1 }} / {{ pagination.hrefs | size }}
		</div>
		<div id="pagination-link-next">
			{%- if pagination.href.next -%}
				<a 
					href={{ pagination.href.next }}
				>
					Next Page >>
				</a>
			{%- endif -%}
		</div>
	</div>
</section>

# Submit an Event

Do you know of an event that is not listed?
<a href="/events/add" class="btn btn-inline">Submit an Event</a>

