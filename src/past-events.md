---
layout: layout.liquid
title: Events
description: List of past live jazz events in and around Dayton, Ohio.
pagination:
  data: pastEvents
  size: 5
---

# Past Events

What you have missed recently.

Last Update: {{ | lastUpdated }}

<section class="events-list">
	{%- for event in pagination.items -%}
		{% include event-card-past-event, 
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

<a class="btn" href="/">Back to Home</a>

