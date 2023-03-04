---
title: Newsletter Content
noindex: "true"
eleventyExcludeFromCollections: true
---

# [Live Jazz Dayton] Newsletter {{ | newsletterPublishDate | dateLocaleString }}

Hey there! This is the {{ | newsletterPublishDate | dateLocalString }} edition of the newsletter.

Check out the full list of events at [livejazzdayton.com](https://livejazzdayton.com).

# Upcoming Events

<hr/>

	{%- for event in events limit:10 -%}
		{% include event-info-newsletter, 
			title: event.title,
			slug: event.slug,
			start: event.start,
			end: event.end,
			location: event.location.name,
			image: event.image,
			artists: event.artistsString,
      googleMapsUrl: event.googleMapsUrl,
      googleCalendar: event.links.googleCalendar
		%}
    <hr/>

	{%- endfor -%}


Thanks for reading!

Shohei