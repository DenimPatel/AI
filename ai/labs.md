---
layout: page
title: Labs & Companies
section: ai
kicker: Who's building it
permalink: /ai/labs/
redirect_from:
  - /labs.html
subtitle: A who's-who of the organizations shipping frontier and open-weight models — what they focus on, and the release that put them on the map.
description: Profiles of the frontier and open-weight AI labs, with focus areas and defining releases.
---

{% assign cur = "" %}{% for lab in site.data.labs %}{% if lab.group != cur %}{% unless forloop.first %}
</div>{% endunless %}
<h3 class="era-heading"{% if forloop.first %} style="margin-top:8px;"{% endif %}>{{ lab.group }}</h3>
<div class="card-grid" style="margin-bottom: 32px;">{% assign cur = lab.group %}{% endif %}
  <div class="card elev-sm">
    <div class="card-kicker">{{ lab.meta }}</div>
    <div class="card-title">{{ lab.name }}</div>
    <p class="card-body">{{ lab.focus }}</p>
    <div class="card-meta">Defining release: {{ lab.defining }}</div>
  </div>{% if forloop.last %}
</div>{% endif %}{% endfor %}

<div class="stats-rule" style="margin-top:16px;"></div>

<p style="margin: 24px 0 0; font-size: 13px; opacity: 0.7;">Founding years and headquarters are approximate and can shift with reorganizations; "defining release" is a subjective pick of the model that best put each lab on the map.</p>
