---
layout: page
title: Voices on AI
section: ai
kicker: In their words
permalink: /ai/voices/
redirect_from:
  - /AI-quotes.html
subtitle: A collection of thought-provoking quotes about AI from scientists, researchers, technology pioneers, and industry leaders.
description: Quotes about artificial intelligence from scientists, researchers, technology pioneers and industry leaders.
---

{% assign cur = "" %}{% for q in site.data.quotes %}{% if q.category != cur %}{% unless forloop.first %}
</div>{% endunless %}
<h3 class="era-heading"{% if forloop.first %} style="margin-top:8px;"{% endif %}>{{ q.category }}</h3>
<div class="card-grid" style="margin-bottom: 32px;">{% assign cur = q.category %}{% endif %}
  <div class="card elev-sm"><blockquote>"{{ q.quote }}"</blockquote><div class="card-meta">{{ q.who }} &middot; {{ q.year }}</div></div>{% if forloop.last %}
</div>{% endif %}{% endfor %}
