---
layout: home
title: Home
permalink: /
section: ""
description: A running record of artificial intelligence — milestones, products, benchmarks and voices — alongside interactive guides to LLM training and serving, multi-view geometry, nonlinear optimization, linear algebra, calculus, probability, statistics and robotics.
---

{%- assign notes = site.pages | where_exp: "p", "p.date_label" -%}
{%- assign guideparts = site.data.guide_index.total_parts -%}
{%- assign guidecount = site.data.guide_index.total_guides -%}

<section class="hero">
  <h1>A running record<br>of artificial intelligence.</h1>
  <p>From the Turing Test to today's agents: the milestones, the products, and the people who said so at the time — plus {{ guideparts }} parts of interactive guides that build the underlying machinery from scratch.</p>
  <div class="hero-actions">
    <a href="{{ '/ai/' | relative_url }}" class="btn btn-primary">Read the record</a>
    <a href="https://denimpatel.github.io/interactive-courses/" class="btn btn-ghost">Try the interactive guides</a>
  </div>
</section>

<section style="padding: 32px 0 40px;">
  <div class="stats"></div>
  <p class="stats-row">
    <span>Est. 1950</span>
    <span>Compiled by Denim Patel</span>
    <span>Robotics &amp; AI notes</span>
    <span>Last updated {{ site.time | date: "%b %Y" }}</span>
  </p>
  <div class="stats-rule"></div>
  <div class="stats-grid">
    <p class="stat"><span>Milestones logged</span><span class="stat-fill"></span><span class="stat-value stat-value--accent js-count" data-count="{{ site.data.timeline | size }}">0</span></p>
    <p class="stat"><span>Product releases tracked</span><span class="stat-fill"></span><span class="stat-value js-count" data-count="{{ site.data.products | size }}">0</span></p>
    <p class="stat"><span>Voices quoted</span><span class="stat-fill"></span><span class="stat-value js-count" data-count="{{ site.data.quotes | size }}">0</span></p>
    <p class="stat"><span>Interactive guide parts</span><span class="stat-fill"></span><span class="stat-value js-count" data-count="{{ guideparts }}">0</span></p>
    <p class="stat"><span>Field notes</span><span class="stat-fill"></span><span class="stat-value js-count" data-count="{{ notes | size }}">0</span></p>
    <p class="stat"><span>Labs profiled</span><span class="stat-fill"></span><span class="stat-value js-count" data-count="{{ site.data.labs | size }}">0</span></p>
  </div>
  <div class="stats-rule"></div>
</section>

<section class="section">
  <span class="section-kicker">Four ways in</span>
  <h2 class="section-title">Start here</h2>
  <div class="card-grid" style="margin-bottom: 8px;">
    {%- for s in site.data.sections %}
    <a class="card elev-sm reveal" style="text-decoration:none; color:inherit; transition-delay: {{ forloop.index0 | times: 0.06 }}s;" href="{{ s.url | relative_url }}">
      <div class="card-kicker">{{ s.kicker }}</div>
      <div class="card-title">{{ s.title }}</div>
      <p class="card-body">{{ s.blurb }}</p>
    </a>
    {%- endfor %}
  </div>
</section>

<section class="section">
  <span class="section-kicker">The record</span>
  <h2 class="section-title">Latest in AI</h2>
  <p class="section-lede">The most recent entries from the <a href="{{ '/ai/products/' | relative_url }}">product timeline</a>. The full log runs to {{ site.data.products | size }} entries, back to 2010.</p>
  {%- assign recent = site.data.products | slice: -6, 6 | reverse %}
  {%- for r in recent %}
  <div class="release-row"><span class="release-date">{{ r.date }}</span><p>{{ r.text }}</p>{% if r.weights == "open" %}<span class="tag tag-accent">Open</span>{% elsif r.weights == "closed" %}<span class="tag tag-neutral">Closed</span>{% elsif r.weights == "mixed" %}<span class="tag tag-accent">Open</span><span class="tag tag-neutral">Closed</span>{% endif %}</div>
  {%- endfor %}
  <p style="margin-top: 20px;"><a href="{{ '/ai/products/' | relative_url }}" class="btn btn-secondary">View the full product timeline</a></p>
</section>

<section class="section">
  <span class="section-kicker">Interactive guides</span>
  <h2 class="section-title">Built from scratch, step by step</h2>
  <p class="section-lede">{{ guidecount }} long-form guides, {{ guideparts }} parts, now on their own site. Every part is interactive — you drag the point along the curve, run the training loop, and watch the solver converge.</p>
  <div class="card-grid card-grid--tight" style="margin-bottom: 24px;">
    {%- for g in site.data.guide_index.guides %}
    <a class="card reveal" style="text-decoration:none; color:inherit; transition-delay: {{ forloop.index0 | times: 0.05 }}s;" href="{{ g.url }}">
      <div class="card-kicker">Interactive &middot; {{ g.parts }} parts</div>
      <div class="card-title">{{ g.title }}</div>
      <p class="card-body">{{ g.blurb }}</p>
    </a>
    {%- endfor %}
  </div>
  <p><a href="https://denimpatel.github.io/interactive-courses/" class="btn btn-secondary">Open the interactive guides &rarr;</a></p>
</section>

<section class="section" style="padding-bottom: 40px;">
  <span class="section-kicker">In their words</span>
  <h2 class="section-title">Voices on AI</h2>
  <p class="section-lede">{{ site.data.quotes | size }} quotes from scientists, researchers and industry leaders, on the <a href="{{ '/ai/voices/' | relative_url }}">full quotes page</a>.</p>
  <div class="card-grid" style="margin-bottom: 24px;">
    {%- assign shown = "" | split: "," %}
    {%- for q in site.data.quotes %}
    {%- unless shown contains q.category %}
    {%- assign shown = shown | push: q.category %}
    <div class="card elev-sm reveal" style="transition-delay: {{ forloop.index0 | times: 0.04 }}s;">
      <div class="card-kicker">{{ q.category }}</div>
      <blockquote>"{{ q.quote }}"</blockquote>
      <div class="card-meta">{{ q.who }} &middot; {{ q.year }}</div>
    </div>
    {%- endunless %}
    {%- endfor %}
  </div>
  <p><a href="{{ '/ai/voices/' | relative_url }}" class="btn btn-secondary">View all {{ site.data.quotes | size }} quotes</a></p>
</section>
