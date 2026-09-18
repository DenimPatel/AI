---
layout: section-hub
title: "Blog"
description: "Personal perspective pieces and the field notes from robotics and vision, in their original informal, from-the-workbench voice."
section: "blog"
permalink: "/blog/"
---

<p class="section-lede" style="max-width:68ch;">This is the home for the informal writing: the robotics and vision field notes that were migrated from the old WordPress blog, plus new perspective pieces. Nothing here is a structured guide or a timeline entry &mdash; it is what I was actually thinking about while building the thing, kept in its original voice.</p>

{%- assign robotics_notes = site.pages | where: "section", "robotics" | where_exp: "p", "p.date_label" -%}
{%- if robotics_notes.size > 0 %}
<h2 class="era-heading" style="font-size:20px; margin-top:36px;">Robotics</h2>
{% include note-list.html section="robotics" %}
{%- endif %}

{%- assign vision_notes = site.pages | where: "section", "vision" | where_exp: "p", "p.date_label" -%}
{%- if vision_notes.size > 0 %}
<h2 class="era-heading" style="font-size:20px; margin-top:36px;">Vision &amp; Geometry</h2>
{% include note-list.html section="vision" %}
{%- endif %}

{%- assign opinion = site.pages | where: "section", "blog" | where_exp: "p", "p.date_label" -%}
{%- if opinion.size > 0 %}
<h2 class="era-heading" style="font-size:20px; margin-top:36px;">Perspectives</h2>
{% include note-list.html section="blog" %}
{%- endif %}

<p style="margin-top:32px;">The interactive guides &mdash; LLM training and serving, building with LLMs, agents, generative media, multi-view geometry, nonlinear optimization, linear algebra, calculus, probability and statistics &mdash; now live at <a href="https://denimpatel.github.io/interactive-courses/">denimpatel.github.io/interactive-courses</a>.</p>
