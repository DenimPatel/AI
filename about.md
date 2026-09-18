---
layout: page
title: About
permalink: /about/
section: ""
kicker: Colophon
subtitle: What this site is, who keeps it, and how it is put together.
description: About this site — a running record of AI, plus field notes and a blog, with the interactive guides living on a companion site.
---

<p class="section-lede" style="max-width:68ch;">This site started as a single page tracking AI milestones. It now covers two very different kinds of writing, and they live in two repos.</p>

<h3 class="era-heading">The record</h3>
<p><a href="{{ '/ai/' | relative_url }}">AI</a> collects what happened and when — a history timeline, a product ship-log, benchmark score progressions, profiles of the labs, the papers behind the milestones, and quotes from the people involved. It is compiled from public model cards, technical reports and independent leaderboards; the sourcing caveats are noted on each page.</p>

<h3 class="era-heading">The field notes &amp; the blog</h3>
<p><a href="{{ '/robotics/' | relative_url }}">Robotics</a> holds tutorials on ROS and robot navigation, migrated from the <a href="https://roboticswithdenim.wordpress.com/">Robotics At Once</a> blog, in their original blog voice. The <a href="{{ '/vision/' | relative_url }}">vision notes</a> are their counterpart. Both feed the <a href="{{ '/blog/' | relative_url }}">blog</a>, which is where the informal, from-the-workbench writing lives — including new perspective pieces that do not belong to either subject.</p>

<h3 class="era-heading">The guides</h3>
<p>The long interactive walkthroughs — LLM training and serving, building with LLMs, agents, generative media, multi-view geometry, nonlinear optimization, linear algebra, calculus, probability and statistics — now live in their own repo at <a href="https://denimpatel.github.io/interactive-courses/">denimpatel.github.io/interactive-courses</a>. Nothing in them is a static diagram: the cameras drag, the tokenizer trains in your browser, the optimizer iterates when you step it. Each guide is built around one running example carried from the first part to the last. Older guide URLs on this site redirect there.</p>

<div class="stats-rule" style="margin-top:16px;"></div>

<h3 class="era-heading">Colophon</h3>
<p>Built with Jekyll and hosted on GitHub Pages. No JavaScript frameworks and no build step beyond Jekyll itself — the interactive figures are hand-written canvas and vanilla JS, and the math is rendered with KaTeX. Page structure and every counter on the homepage are generated from data files in <code>_data/</code>, so the site cannot drift out of sync with itself. The guide part counts come from <code>_data/guide_index.yml</code>, which is regenerated from the guides repo by <code>scripts/sync-guides.rb</code>.</p>

<p style="margin: 24px 0 0; font-size: 14px; opacity: 0.8;">Denim Patel, M.S. Robotics, Worcester Polytechnic Institute. <a href="https://github.com/DenimPatel/AI">Source on GitHub</a>.</p>
