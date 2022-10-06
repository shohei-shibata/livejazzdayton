---
layout: layout.liquid
title: Home
description: Live Jazz Event Listing for Dayton, Ohio
---

{% if links.size > 0 %}
<section class="links-list">
  <h1>Links</h1>
  <p>Other websites by the Dayton jazz community. Please check them out!</p>

  <p>If you have suggestions for links to add, let me know!
  <a href="https://docs.google.com/forms/d/17Bu7NbTSGHFeTOCW6Ss5xVEnmjY4VHblqwwUgMsYCT4" target="_blank" class="btn btn-inline">Submit a Link</a>
  </p>
  <div class="links-list-container">

		{%- for link in links -%}
			{%- unless link.url == "Invalid URL" -%}
				{% include link-card %}
			{%- endunless -%}
		{%- endfor -%}

  </div>

  <a class="btn" href="/">Back to Home</a>

</section>
{% endif %}
