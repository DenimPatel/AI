---
layout: page
title: Product Timeline
section: ai
kicker: Ship log
permalink: /ai/products/
redirect_from:
  - /product_timeline.html
subtitle: A chronological timeline of significant AI product releases and milestones — including the race between closed, API-only frontier models and the open-weight models chasing (and sometimes matching) them.
description: A chronological timeline of significant AI product releases, and the race between closed frontier models and the open-weight models chasing them.
---

<div class="tag-legend">
  <span class="tag tag-accent">Open-weight</span>
  <span class="tag tag-neutral">Closed / API-only</span>
</div>

{% assign cur = "" %}{% for r in site.data.products %}{% if r.era != cur %}
<h3 class="era-heading"{% if forloop.first %} style="margin-top:28px;"{% endif %}>{{ r.era }}</h3>{% assign cur = r.era %}{% endif %}
<div class="release-row"><span class="release-date">{{ r.date }}</span><p>{{ r.text }}</p>{% if r.weights == "open" %}<span class="tag tag-accent">Open</span>{% elsif r.weights == "closed" %}<span class="tag tag-neutral">Closed</span>{% elsif r.weights == "mixed" %}<span class="tag tag-accent">Open</span><span class="tag tag-neutral">Closed</span>{% endif %}</div>{% endfor %}

<p style="margin-top:20px; font-size:13px; opacity:0.7;"><em>(2026 entries are drawn from AI-news aggregators rather than primary announcements, since they fall after most models' training cutoffs — treat exact dates/version numbers as approximate.)</em></p>

## Anthropic's Growth & the Rise of Agents
- **Anthropic's revenue exploded.** From roughly $1 billion in annualized revenue in December 2024, Anthropic grew to $9B by end of 2025, $14B in February 2026, $30B in April 2026, $47B in May 2026, and $65B by July 2026 — CEO Dario Amodei described it as 80x annualized growth in a single quarter.
- **Its valuation followed.** $4.1B (Mar 2023) → $61.5B (Mar 2025) → $380B (Feb 2026) → $965B after a $65B Series H (May 2026), briefly making Anthropic the world's most valuable private AI company, ahead of OpenAI.
- **Claude Code became a business on its own.** Launched as a research preview in February 2025 and reaching general availability in May 2025, Claude Code grew more than 10x in usage within three months, crossed a $2.5B revenue run-rate by February 2026, and helped double Anthropic's $1M+ enterprise customers to over 1,000.
- **Agentic coding tools became the main battleground.** Devin (2024), Claude Code, OpenAI's Codex CLI, Cursor, and GitHub Copilot all raced to move beyond autocomplete into autonomously writing features, fixing bugs, running tests, and opening pull requests — by mid-2026 roughly 90% of developers used at least one AI coding tool at work.
- **Personal, always-on agents went mainstream outside coding too.** OpenClaw (born as Clawdbot/Moltbot in late 2025) showed the same agentic pattern — an LLM given tools, memory, and a persistent loop — could run entirely on personal hardware and act inside everyday chat apps, not just in a dev terminal.
- **Anthropic pushed a more capable, more restricted tier.** The "Mythos" family and its public release, Claude Fable 5 (June 2026), showed frontier labs beginning to ship models powerful enough to trigger their own safety classifiers and, briefly, government export scrutiny — a preview of how the next capability jump may be gated differently than prior ones.

## How the Coding Interface Itself Evolved
The model race gets the headlines, but the bigger day-to-day change for developers has been *how* they talk to AI while coding — from predicting the next few keystrokes to handing off an entire goal and walking away.

**Era 1 — Inline autocomplete (2021–2022): AI finishes your line**
- **2021 Jun**: GitHub launches Copilot, trained with OpenAI — ghost-text suggestions that complete a line or block as you type, with no chat and no memory beyond the open file
- **2022 Jun**: Copilot reaches general availability in VS Code, establishing "autocomplete-as-you-type" as the default mental model for AI coding help

**Era 2 — Chat enters the editor (2022–2023): AI answers questions about your code**
- GitHub adds Copilot Chat, a sidebar you can ask questions in, but changes still land as suggestions you accept line by line
- **2023 Mar**: Anysphere launches **Cursor**, forking VS Code to put an AI chat panel and its own "Tab" autocomplete directly into the editor with whole-repo context — you're now talking *about* the codebase, not just accepting predicted text

**Era 3 — The agent loop is invented, outside the IDE (2023): AI is given a goal, not a prompt**
- **2023 Mar**: AutoGPT and BabyAGI popularize the *reason → act → observe* loop — give the model a goal, let it choose its own steps, call tools, and keep going until done. Neither was a coding tool, but every later coding agent copies this pattern
- AutoGPT passes 100,000 GitHub stars within weeks, showing developers how much appetite there was for AI that acts instead of just suggesting

**Era 4 — Multi-file "Composer" and agent mode arrive in coding tools (2024–2025): AI edits, not suggestions**
- Cursor ships **Composer**, letting the model plan and edit across multiple files in one pass instead of one accepted suggestion at a time
- **2024 (late)**: Cursor's "YOLO mode" lets the agent run terminal commands and refactor across a codebase without approving every single step — the first mainstream "let it just work" toggle
- **2024 Mar**: Devin markets itself as an autonomous "AI software engineer" that takes a goal and works largely unsupervised
- **2025 Feb**: Anthropic launches **Claude Code** — no IDE at all, just a terminal and a natural-language goal, with the agent reading, editing, running, and committing code in its own loop
- **2025 Feb**: GitHub formalizes **Agent Mode** inside VS Code Copilot, letting it execute multi-step tasks rather than only suggest edits
- **2025 Feb**: Andrej Karpathy coins **"vibe coding"** — describing handing a goal to an agent loop (e.g., Cursor Composer) and "forgetting the code even exists" — later naming the more deliberate version of this practice "agentic engineering"

**Era 5 — Background and cloud agents (2025–2026): AI runs the loop without you watching**
- **2025 Oct**: Cursor 2.0 ships **Composer**, a coding model purpose-built for low-latency agent loops rather than one-shot completions
- **2026 Feb**: Cursor 2.5 adds **async subagents** — multiple agent loops running in parallel on different parts of one task
- **2026 Apr–May**: Cursor 3.0/3.5 move agents into a dedicated **Agents Window** with **Cloud Agents** that run in an isolated VM — you hand off a goal, close your laptop, and come back to a finished, tested pull request

**The throughline:** the unit of AI collaboration kept growing — keystroke → line → file → whole repo → a goal handed to a loop → a goal handed to a cloud agent you check on later. Each era didn't just add a feature, it changed what a developer's attention was actually needed for.

## Open vs. Closed: The State of the Race
- **The gap has shrunk.** Open-weight models trailed closed frontier models by roughly two years in the GPT-3 era; by 2025–2026 that gap had narrowed to a matter of months, with DeepSeek-R1 and Llama 4 landing within striking distance of the latest o-series and Claude/Gemini releases on many benchmarks.
- **Training costs collapsed.** DeepSeek's efficiency-focused training (V3, R1) showed frontier-class results were achievable for a fraction of the compute cost previously assumed necessary, reshaping assumptions across the industry.
- **Licensing is trending more open.** Newer open releases (DeepSeek V4, Gemma 4, the open Qwen line) have moved toward permissive licenses like Apache 2.0 and MIT, rather than the more restrictive custom licenses used by early Llama releases.
- **It's increasingly a geographic race too.** US labs (OpenAI, Anthropic, Google, xAI) still lead most closed frontier benchmarks, while Chinese labs (DeepSeek, Alibaba's Qwen, Z.ai's GLM) have become the dominant force in high-quality open-weight releases — making "open vs. closed" partly a proxy for a broader US–China AI competition.

---
*Last updated August 2026*
