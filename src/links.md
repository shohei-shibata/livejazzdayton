---
layout: layout.liquid
title: Home
description: Live Jazz Event Listing for Dayton, Ohio
---

{% if links.size > 0 %}
<section class="links-list">
  <h1>Links</h1>
  <p>Other websites you might find helpful</p>
    {%- for link in links -%}
      {%- unless link.url == "Invalid URL" -%}
        {% include link-card %}
      {%- endunless -%}
    {%- endfor -%}

  <p>If you have suggestions for links to add, let me know!
  <a href="https://docs.google.com/forms/d/17Bu7NbTSGHFeTOCW6Ss5xVEnmjY4VHblqwwUgMsYCT4" target="_blank" class="btn btn-inline">Submit a Link</a>
  </p>
</section>
{% endif %}