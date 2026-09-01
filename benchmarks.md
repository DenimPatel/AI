---
layout: page
title: Benchmarks
kicker: Scoreboard
subtitle: How the frontier has moved on the evals that matter — general knowledge, graduate-level reasoning, real-world coding, and abstract generalization — release over release.
---

[← Back to home]({{ '/' | relative_url }})

<p class="section-lede" style="max-width:68ch;">Figures below are rounded and compiled from public model cards, technical reports, and independent leaderboards (LMSYS Chatbot Arena, Epoch AI, Artificial Analysis, METR). Labs use different evaluation harnesses and prompting setups, so treat exact decimal points as indicative, not authoritative — the trend line is the point.</p>

<h3 class="era-heading" style="margin-top:8px;">MMLU — general knowledge</h3>
<p>57 subjects spanning STEM, humanities, law and medicine, tested zero- or few-shot. Estimated human-expert baseline is ~89.8%. By mid-2024, frontier models had clustered near that ceiling and labs shifted attention to harder evals below.</p>

| Model | Released | MMLU |
|---|---|---|
| GPT-3 | 2020 | ~44% |
| GPT-4 | Mar 2023 | ~86% |
| Claude 2 | Jul 2023 | ~79% |
| Gemini Ultra | Dec 2023 | ~90% |
| Claude 3 Opus | Mar 2024 | ~87% |
| Llama 3.1 405B | Jul 2024 | ~88% |
| GPT-4o | May 2024 | ~89% |
| Claude 3.5 Sonnet | Jun 2024 | ~89% |

<h3 class="era-heading">GPQA Diamond — graduate-level reasoning</h3>
<p>PhD-level science questions in biology, physics and chemistry, written so domain experts can't answer them by searching. A cleaner test of reasoning than of recall.</p>

| Model | Released | GPQA Diamond |
|---|---|---|
| GPT-4 | Mar 2023 | ~35% |
| Claude 3.5 Sonnet | Jun 2024 | ~59% |
| OpenAI o1 | Sep 2024 | ~78% |
| Claude 3.7 Sonnet | Feb 2025 | ~78% |
| Claude 4 (Opus) | May 2025 | ~83% |
| GPT-5 | Aug 2025 | ~85%+ |

<h3 class="era-heading">SWE-bench Verified — real-world coding</h3>
<p>Resolving genuine GitHub issues end to end: read the repo, write the patch, pass the tests. The closest proxy on this page for "can it do a developer's job," and the benchmark the agentic-coding race has organized around.</p>

| Model / agent | Released | SWE-bench Verified |
|---|---|---|
| Claude 3.5 Sonnet (computer use) | Oct 2024 | ~49% |
| Claude 3.7 Sonnet | Feb 2025 | ~63% |
| Claude 4 (Opus / Sonnet) | May 2025 | ~72–73% |
| GPT-5 | Aug 2025 | ~74% |
| Frontier models per 2026 aggregators | 2026 | ~80%+ |

<h3 class="era-heading">ARC-AGI — abstract generalization</h3>
<p>Visual puzzles solvable by most humans in minutes but historically resistant to pattern-matching by LLMs, since each puzzle is novel rather than drawn from training-adjacent data. Designed specifically to be hard to game.</p>

| Model | Released | ARC-AGI-1 (public eval) |
|---|---|---|
| GPT-4 | 2023 | ~5% |
| Claude 3.5 Sonnet | 2024 | ~14% |
| OpenAI o3 (preview, high-compute) | Dec 2024 | ~76–88%* |
| Frontier models through 2025 | 2025 | closing on that range, prompting a harder ARC-AGI-2 |

<p style="font-size:13px; opacity:0.7;">*o3's headline number used a high-compute configuration far more expensive per task than typical inference — a reminder that "SOTA" often carries an asterisk about cost.</p>

<div class="stats-rule" style="margin-top:16px;"></div>

<p style="margin: 24px 0 0; font-size: 13px; opacity: 0.7;"><em>2025–2026 figures are drawn from AI-news aggregators and leaderboard snapshots rather than primary technical reports, since they fall after most models' training cutoffs — treat them as directionally correct rather than precise.</em></p>
<p class="back-link" style="margin-top:8px;"><a href="{{ '/' | relative_url }}">&larr; Back to home</a></p>
