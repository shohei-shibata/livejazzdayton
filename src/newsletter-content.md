---
title: Newsletter Content
noindex: "true"
eleventyExcludeFromCollections: true
---

Hey there! This is the {{ | lastUpdated }} edition of the newsletter.

You can see more at [livejazzdayton.com](https://livejazzdayton.com). There you can see events further in the future, and the listing there is updated daily. So check it often!

## Upcoming Events

<hr/>

	{%- for event in events limit:5 -%}
		{% include event-info-newsletter, 
			title: event.title,
			slug: event.slug,
			start: event.start,
			end: event.end,
			location: event.location.name,
			image: event.image,
			artists: event.artistsString,
      googleMapsUrl: event.googleMapsUrl,
      calendarLinks: event.calendarLinks,
		%}
    <hr/>

	{%- endfor -%}


Thanks for reading!

Shohei