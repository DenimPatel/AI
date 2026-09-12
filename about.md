---
layout: page
title: About
permalink: /about/
kicker: Colophon
subtitle: What this site is, who keeps it, and how it is put together.
description: About this site — a running record of AI plus interactive guides to LLM training, multi-view geometry, nonlinear optimization and robotics.
---

<p class="section-lede" style="max-width:68ch;">This site started as a single page tracking AI milestones and grew into three things that sit side by side:</p>

<h3 class="era-heading">The record</h3>
<p><a href="{{ '/ai/' | relative_url }}">AI</a> collects what happened and when — a history timeline, a product ship-log, benchmark score progressions, profiles of the labs, the papers behind the milestones, and quotes from the people involved. It is compiled from public model cards, technical reports and independent leaderboards; the sourcing caveats are noted on each page.</p>

<h3 class="era-heading">The guides</h3>
<p><a href="{{ '/vision/' | relative_url }}">Vision &amp; Geometry</a> and the <a href="{{ '/ai/llm-training/' | relative_url }}">LLM training guide</a> are long interactive walkthroughs. Nothing in them is a static diagram: the cameras drag, the tokenizer trains in your browser, the optimizer iterates when you step it. Each guide is built around one running example carried from the first part to the last.</p>

<h3 class="era-heading">The field notes</h3>
<p><a href="{{ '/robotics/' | relative_url }}">Robotics</a> holds tutorials on ROS and robot navigation, migrated from the <a href="https://roboticswithdenim.wordpress.com/">Robotics At Once</a> blog, in their original blog voice.</p>

<div class="stats-rule" style="margin-top:16px;"></div>

<h3 class="era-heading">Colophon</h3>
<p>Built with Jekyll and hosted on GitHub Pages. No JavaScript frameworks and no build step beyond Jekyll itself — the interactive figures are hand-written canvas and vanilla JS, and the math is rendered with KaTeX. Page structure, series ordering and every counter on the homepage are generated from data files in <code>_data/</code>, so the site cannot drift out of sync with itself.</p>

<p style="margin: 24px 0 0; font-size: 14px; opacity: 0.8;">Denim Patel, M.S. Robotics, Worcester Polytechnic Institute. <a href="https://github.com/DenimPatel/AI">Source on GitHub</a>.</p>
