---
layout: page
title: Key Papers
section: ai
kicker: The literature
permalink: /ai/papers/
subtitle: The landmark papers behind the milestones — from McCulloch & Pitts in 1943 to the transformer and beyond, each with a link to the original and what it changed.
description: An annotated bibliography of landmark AI papers, each with a link to the original and a note on what it contributed.
---

<p class="section-lede" style="max-width:68ch;">Grouped by era, and roughly parallel to the <a href="{{ '/ai/timeline/' | relative_url }}">history timeline</a> — that page tracks what happened, this one tracks what was written down.</p>

{% assign cur = "" %}{% for p in site.data.papers %}{% if p.era != cur %}
## {{ p.era }}
{% assign cur = p.era %}{% endif %}
- "{{ p.title }}" ({{ p.authors }}, {{ p.year }}){% if p.aka %} - {{ p.aka }}{% endif %} - [paper]({{ p.url }})
{% for point in p.points %}  - {{ point }}
{% endfor %}
{% endfor %}
