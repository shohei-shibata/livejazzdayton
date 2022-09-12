---
layout: layout.liquid
title: Home
description: Live Jazz Event Listing for Dayton, OH
pagination:
  data: collections.futureEvents
  size: 5
---

# Upcoming Events

Last Update: {{ | lastUpdated }}

<section class="events-list">
	{%- for event in pagination.items -%}
		{% include event-card, 
			title: event.data.event.name,
			url: event.url,
			start: event.data.event.start,
			end: event.data.event.end,
			location: event.data.event.location.name,
			imagePath: event.data.event.imagePath
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
<a href="/submit" class="btn btn-inline">Submit an Event</a>

[<< Back Home](/)

