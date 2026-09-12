---
layout: page
title: Benchmarks
section: ai
kicker: Scoreboard
permalink: /ai/benchmarks/
redirect_from:
  - /benchmarks.html
subtitle: How the frontier has moved on the evals that matter — general knowledge, graduate-level reasoning, real-world coding, and abstract generalization — release over release.
description: Benchmark score progressions on MMLU, GPQA Diamond, SWE-bench Verified and ARC-AGI, release over release.
---

<p class="section-lede" style="max-width:68ch;">Figures below are rounded and compiled from public model cards, technical reports, and independent leaderboards (LMSYS Chatbot Arena, Epoch AI, Artificial Analysis, METR). Labs use different evaluation harnesses and prompting setups, so treat exact decimal points as indicative, not authoritative — the trend line is the point.</p>

{% for b in site.data.benchmarks %}
<h3 class="era-heading"{% if forloop.first %} style="margin-top:8px;"{% endif %}>{{ b.name }} — {{ b.subtitle }}</h3>
<p>{{ b.note }}</p>

<table>
<thead><tr><th>Model</th><th>Released</th><th>{{ b.name }}</th></tr></thead>
<tbody>{% for r in b.rows %}
<tr><td>{{ r.model }}</td><td>{{ r.released }}</td><td>{{ r.score }}</td></tr>{% endfor %}
</tbody>
</table>
{% endfor %}

<p style="font-size:13px; opacity:0.7;">*o3's headline number used a high-compute configuration far more expensive per task than typical inference — a reminder that "SOTA" often carries an asterisk about cost.</p>

<div class="stats-rule" style="margin-top:16px;"></div>

<p style="margin: 24px 0 0; font-size: 13px; opacity: 0.7;"><em>2025–2026 figures are drawn from AI-news aggregators and leaderboard snapshots rather than primary technical reports, since they fall after most models' training cutoffs — treat them as directionally correct rather than precise.</em></p>
