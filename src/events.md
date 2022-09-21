---
layout: layout.liquid
title: Events
description: A full listing of upcoming live jazz events in and around Dayton, Ohio.
pagination:
  data: events
  size: 5
---

# Upcoming Events

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

Do you know of an event that is not listed?
<a href="https://docs.google.com/forms/d/1NyrLlwjvzLAs2NoT3FGgvo0-WkU7SNp43AoPIaG0LPo/viewform" target="_blank" class="btn btn-inline">Submit an Event</a>

[<< Back Home](/)

