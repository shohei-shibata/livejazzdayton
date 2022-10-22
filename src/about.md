---
layout: layout.liquid
title: About
description: What is livejazzdayton.com?
---

<h1>About This Website</h1>

{%- if about -%}
  {%- for item in about -%}
    {{ item.content }}
  {%- endfor -%}
{%- endif -%}

<script type="text/javascript" src="https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js" data-name="bmc-button" data-slug="shohei_shibata" data-color="#dd3436" data-emoji=""  data-font="Poppins" data-text="Buy me a coffee" data-outline-color="#ffffff" data-font-color="#ffffff" data-coffee-color="#FFDD00" ></script>