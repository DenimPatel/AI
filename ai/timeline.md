---
layout: page
title: AI History Timeline
section: ai
kicker: The record
permalink: /ai/timeline/
subtitle: Key events in the development of artificial intelligence as a field — from the first formal proposals to the deep-learning era.
description: A timeline of key events in the development of artificial intelligence, from the Turing Test in 1950 to AlphaFold.
---

{% assign cur = "" %}{% for row in site.data.timeline %}{% if row.era != cur %}
<h3 class="era-heading">{{ row.era }}</h3>{% assign cur = row.era %}{% endif %}
<div class="timeline-row"><div class="timeline-year">{{ row.year }}</div><p>{{ row.text }}</p></div>{% endfor %}

<div class="stats-rule" style="margin-top:16px;"></div>

<p class="section-lede" style="max-width:68ch; margin-top:24px;">For the papers behind these milestones — with links to the originals — see <a href="{{ '/ai/papers/' | relative_url }}">Key Papers</a>. For products rather than research results, see the <a href="{{ '/ai/products/' | relative_url }}">product timeline</a>.</p>
