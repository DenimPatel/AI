---
layout: home
title: Home
---

<section class="hero">
  <h1>A running record<br>of artificial intelligence.</h1>
  <p>From the Turing Test to today's agents: the milestones, the products, and the people who said so at the time — kept on one page, and updated as the record grows.</p>
  <div class="hero-actions">
    <a href="#history" class="btn btn-primary">Read the timeline</a>
    <a href="{{ '/robotics/' | relative_url }}" class="btn btn-ghost">Field notes on robotics</a>
  </div>
</section>

<section style="padding: 32px 0 40px;">
  <div class="stats"></div>
  <p class="stats-row">
    <span>Est. 1950</span>
    <span>Compiled by Denim Patel</span>
    <span>Robotics &amp; AI notes</span>
    <span>Last updated Aug 2026</span>
  </p>
  <div class="stats-rule"></div>
  <div class="stats-grid">
    <p class="stat"><span>Milestones logged</span><span class="stat-fill"></span><span class="stat-value stat-value--accent">14</span></p>
    <p class="stat"><span>Product releases tracked</span><span class="stat-fill"></span><span class="stat-value">85</span></p>
    <p class="stat"><span>Voices quoted</span><span class="stat-fill"></span><span class="stat-value">26</span></p>
    <p class="stat"><span>Robotics field notes</span><span class="stat-fill"></span><span class="stat-value">18</span></p>
    <p class="stat"><span>Benchmarks tracked</span><span class="stat-fill"></span><span class="stat-value">4</span></p>
    <p class="stat"><span>Labs profiled</span><span class="stat-fill"></span><span class="stat-value">10</span></p>
  </div>
  <div class="stats-rule"></div>
</section>

<section id="history" class="section">
  <span class="section-kicker">The record</span>
  <h2 class="section-title">AI History Timeline</h2>
  <p class="section-lede">Key events in the development of artificial intelligence as a field — from the first formal proposals to the deep-learning era.</p>

  <h3 class="era-heading">Foundations · 1950–1958</h3>
  <div class="timeline-row"><div class="timeline-year">1950</div><p>Alan Turing introduces the <strong>Turing Test</strong>, proposing a machine's ability to exhibit intelligent behavior equivalent to, or indistinguishable from, that of a human.</p></div>
  <div class="timeline-row"><div class="timeline-year">1956</div><p>The <strong>Dartmouth Conference</strong>, organized by John McCarthy, Marvin Minsky, Nathaniel Rochester, and Claude Shannon, officially marks the birth of AI as a field of study.</p></div>
  <div class="timeline-row"><div class="timeline-year">1958</div><p>John McCarthy develops the <strong>Lisp</strong> programming language, which becomes the dominant language for AI research.</p></div>

  <h3 class="era-heading">Language &amp; winters · 1966–1987</h3>
  <div class="timeline-row"><div class="timeline-year">1966</div><p><strong>ELIZA</strong>, an early natural language processing program, is created by Joseph Weizenbaum, simulating conversation through pattern matching.</p></div>
  <div class="timeline-row"><div class="timeline-year">1973</div><p>The "<strong>AI Winter</strong>" begins, as funding for AI research declines due to unmet expectations and difficulties in solving complex problems.</p></div>
  <div class="timeline-row"><div class="timeline-year">1980</div><p>Rise of expert systems in the corporate world, such as <strong>MYCIN</strong>, designed to diagnose infectious diseases and recommend treatment.</p></div>
  <div class="timeline-row"><div class="timeline-year">1987</div><p>The "<strong>Second AI Winter</strong>" occurs, as interest and funding for AI declines again due to the limitations of early AI systems and a saturated market for expert systems.</p></div>

  <h3 class="era-heading">Games &amp; deep learning · 1997–2012</h3>
  <div class="timeline-row"><div class="timeline-year">1997</div><p>IBM's <strong>Deep Blue</strong> defeats world chess champion Garry Kasparov, marking a major achievement in AI's ability to handle complex, strategic games.</p></div>
  <div class="timeline-row"><div class="timeline-year">2006</div><p>Geoffrey Hinton and his team at the University of Toronto demonstrate the power of <strong>deep learning</strong>, reviving interest in neural networks.</p></div>
  <div class="timeline-row"><div class="timeline-year">2011</div><p>IBM <strong>Watson</strong> wins the quiz show <em>Jeopardy!</em>, showcasing advancements in natural language processing and AI's ability to interpret unstructured data.</p></div>
  <div class="timeline-row"><div class="timeline-year">2012</div><p><strong>AlexNet</strong>, a deep convolutional neural network developed by Alex Krizhevsky, wins the ImageNet competition, leading to breakthroughs in image recognition.</p></div>

  <h3 class="era-heading">Generative breakthroughs · 2016–2022</h3>
  <div class="timeline-row"><div class="timeline-year">2016</div><p>Google DeepMind's <strong>AlphaGo</strong> defeats world Go champion Lee Sedol, an achievement due to the complexity of the game and the use of reinforcement learning.</p></div>
  <div class="timeline-row"><div class="timeline-year">2020</div><p>OpenAI's <strong>GPT-3</strong>, a language model with 175 billion parameters, demonstrates state-of-the-art performance in various natural language processing tasks.</p></div>
  <div class="timeline-row"><div class="timeline-year">2022</div><p>DeepMind's <strong>AlphaFold</strong> predicts the 3D structures of almost all known proteins, solving a 50-year-old challenge in biology.</p></div>
</section>

<section id="products" class="section">
  <span class="section-kicker">Ship log</span>
  <h2 class="section-title">Product Timeline</h2>
  <p class="section-lede">Highlights from the race between closed, API-only frontier models and the open-weight models chasing them. The full log — 85 releases back to 2010 — lives on the <a href="{{ '/product_timeline.html' | relative_url }}">product timeline page</a>.</p>
  <div class="tag-legend">
    <span class="tag tag-accent">Open-weight</span>
    <span class="tag tag-neutral">Closed / API-only</span>
  </div>

  <h3 class="era-heading" style="margin-top:28px;">Rise of modern AI · 2016–2019</h3>
  <div class="release-row"><span class="release-date">2016</span><p>Google releases <strong>TensorFlow</strong> to the public.</p></div>
  <div class="release-row"><span class="release-date">2017</span><p>Google introduces the <strong>Transformer</strong> architecture.</p></div>
  <div class="release-row"><span class="release-date">2018</span><p>OpenAI releases <strong>GPT-1</strong>.</p></div>
  <div class="release-row"><span class="release-date">2019</span><p>OpenAI releases <strong>GPT-2</strong>.</p></div>

  <h3 class="era-heading">Language model revolution · 2020–2022</h3>
  <div class="release-row"><span class="release-date">2020</span><p>OpenAI releases <strong>GPT-3</strong>.</p></div>
  <div class="release-row"><span class="release-date">2021</span><p>DeepMind releases <strong>AlphaFold 2</strong>.</p></div>
  <div class="release-row"><span class="release-date">2022</span><p>Stability AI releases <strong>Stable Diffusion</strong>.</p></div>

  <h3 class="era-heading">AI goes mainstream · 2023</h3>
  <div class="release-row"><span class="release-date">Mar 2023</span><p>OpenAI releases <strong>GPT-4</strong>.</p><span class="tag tag-neutral">Closed</span></div>
  <div class="release-row"><span class="release-date">Mar 2023</span><p>Anthropic releases <strong>Claude</strong>.</p><span class="tag tag-neutral">Closed</span></div>
  <div class="release-row"><span class="release-date">Jul 2023</span><p>Meta releases <strong>Llama 2</strong> — first widely-licensed open model to rival a closed frontier model.</p><span class="tag tag-accent">Open</span></div>
  <div class="release-row"><span class="release-date">Dec 2023</span><p>Google releases <strong>Gemini</strong>.</p><span class="tag tag-neutral">Closed</span></div>

  <h3 class="era-heading">Open models enter the frontier race · 2024</h3>
  <div class="release-row"><span class="release-date">Apr 2024</span><p>Meta releases <strong>Llama 3</strong>.</p><span class="tag tag-accent">Open</span></div>
  <div class="release-row"><span class="release-date">May 2024</span><p>OpenAI releases <strong>GPT-4o</strong>.</p><span class="tag tag-neutral">Closed</span></div>
  <div class="release-row"><span class="release-date">Sep 2024</span><p>OpenAI releases <strong>o1-preview</strong>, the first mainstream reasoning model.</p><span class="tag tag-neutral">Closed</span></div>
  <div class="release-row"><span class="release-date">Dec 2024</span><p>DeepSeek releases <strong>DeepSeek-V3</strong> — frontier-class results at a fraction of the training cost.</p><span class="tag tag-accent">Open</span></div>

  <h3 class="era-heading">Open-weight shock &amp; reasoning race · 2025</h3>
  <div class="release-row"><span class="release-date">Jan 2025</span><p>DeepSeek releases <strong>R1</strong>, matching o1 on reasoning at a fraction of the cost — the "DeepSeek moment."</p><span class="tag tag-accent">Open</span></div>
  <div class="release-row"><span class="release-date">Feb 2025</span><p>Anthropic launches <strong>Claude Code</strong> as a research preview.</p><span class="tag tag-neutral">Closed</span></div>
  <div class="release-row"><span class="release-date">May 2025</span><p>Anthropic ships the <strong>Claude 4</strong> family alongside Claude Code's general availability.</p><span class="tag tag-neutral">Closed</span></div>
  <div class="release-row"><span class="release-date">Aug 2025</span><p>OpenAI releases <strong>GPT-5</strong>, unifying its reasoning and non-reasoning lines.</p><span class="tag tag-neutral">Closed</span></div>

  <h3 class="era-heading">Frontier consolidation · 2026</h3>
  <div class="release-row"><span class="release-date">Jan 2026</span><p><strong>OpenClaw</strong>, an open-source personal agent, crosses 100,000 GitHub stars in its first week.</p><span class="tag tag-accent">Open</span></div>
  <div class="release-row"><span class="release-date">Jun 2026</span><p>Anthropic releases <strong>Claude Fable 5</strong>, its first "Mythos"-family model.</p><span class="tag tag-neutral">Closed</span></div>
  <div class="release-row"><span class="release-date">Jul 2026</span><p>Anthropic releases <strong>Claude Opus 5</strong>, topping the Intelligence and Agentic indexes.</p><span class="tag tag-neutral">Closed</span></div>
  <div class="release-row"><span class="release-date">Aug 2026</span><p>Independent surveys put <strong>Claude Code</strong> at 39% adoption among professional developers worldwide.</p><span class="tag tag-neutral">Closed</span></div>

  <p style="margin-top: 20px;"><a href="{{ '/product_timeline.html' | relative_url }}" class="btn btn-secondary">View the full product timeline</a></p>
</section>

<section id="benchmarks" class="section">
  <span class="section-kicker">Scoreboard</span>
  <h2 class="section-title">Benchmarks</h2>
  <p class="section-lede">How the frontier has moved on the evals that matter — general knowledge, graduate-level reasoning, real-world coding, and abstract generalization. Full tables, with sourcing notes, on the <a href="{{ '/benchmarks.html' | relative_url }}">benchmarks page</a>.</p>
  <div class="card-grid card-grid--tight" style="margin-bottom: 24px;">
    <div class="card"><div class="card-kicker">MMLU</div><div class="card-title">General knowledge</div><p class="card-body">~44% (GPT-3, 2020) → ~90% (Gemini Ultra, 2023) — the field hit the human-expert ceiling by 2024.</p></div>
    <div class="card"><div class="card-kicker">GPQA Diamond</div><div class="card-title">Graduate-level reasoning</div><p class="card-body">~35% (GPT-4, 2023) → ~85%+ (GPT-5, 2025) on PhD-level science questions.</p></div>
    <div class="card"><div class="card-kicker">SWE-bench Verified</div><div class="card-title">Real-world coding</div><p class="card-body">~49% (Claude 3.5 Sonnet, 2024) → ~80%+ (2026) resolving genuine GitHub issues.</p></div>
    <div class="card"><div class="card-kicker">ARC-AGI</div><div class="card-title">Abstract generalization</div><p class="card-body">~5% (GPT-4, 2023) → ~76–88% (o3, 2024) on puzzles designed to resist pattern-matching.</p></div>
  </div>
  <a href="{{ '/benchmarks.html' | relative_url }}" class="btn btn-secondary">View all benchmarks</a>
</section>

<section id="labs" class="section">
  <span class="section-kicker">Who's building it</span>
  <h2 class="section-title">Labs &amp; Companies</h2>
  <p class="section-lede">A who's-who of the organizations shipping frontier and open-weight models. All 10, with focus areas and defining releases, on the <a href="{{ '/labs.html' | relative_url }}">labs page</a>.</p>
  <div class="tag-legend">
    <span class="tag tag-neutral">Frontier</span>
    <span class="tag tag-accent">Open-weight</span>
  </div>
  <div class="card-grid card-grid--tight" style="margin-bottom: 24px;">
    <div class="card"><div class="card-kicker">San Francisco · 2015</div><div class="card-title">OpenAI</div><p class="card-body">GPT series, ChatGPT, o-series reasoning models.</p></div>
    <div class="card"><div class="card-kicker">San Francisco · 2021</div><div class="card-title">Anthropic</div><p class="card-body">Claude family, Claude Code, Constitutional AI.</p></div>
    <div class="card"><div class="card-kicker">London &amp; Mountain View</div><div class="card-title">Google DeepMind</div><p class="card-body">Gemini, AlphaGo, AlphaFold.</p></div>
    <div class="card"><div class="card-kicker">Menlo Park</div><div class="card-title">Meta AI</div><p class="card-body">Llama family, PyTorch, open-weight frontier models.</p></div>
    <div class="card"><div class="card-kicker">Hangzhou · 2023</div><div class="card-title">DeepSeek</div><p class="card-body">Frontier-class reasoning at a fraction of the cost.</p></div>
    <div class="card"><div class="card-kicker">Paris · 2023</div><div class="card-title">Mistral AI</div><p class="card-body">Europe's leading open-weight lab.</p></div>
  </div>
  <a href="{{ '/labs.html' | relative_url }}" class="btn btn-secondary">View all labs</a>
</section>

<section id="voices" class="section">
  <span class="section-kicker">In their words</span>
  <h2 class="section-title">Voices on AI</h2>
  <p class="section-lede">A running collection of quotes from scientists, researchers and industry leaders — one per category below, 26 in total on the <a href="{{ '/AI-quotes.html' | relative_url }}">full quotes page</a>.</p>
  <div class="card-grid" style="margin-bottom: 24px;">
    <div class="card elev-sm">
      <div class="card-kicker">Scientific perspectives</div>
      <blockquote>"Artificial intelligence is the science of making machines do things that would require intelligence if done by men."</blockquote>
      <div class="card-meta">Marvin Minsky · 1968</div>
    </div>
    <div class="card elev-sm">
      <div class="card-kicker">Researchers &amp; academics</div>
      <blockquote>"AI is not magic. It's just math."</blockquote>
      <div class="card-meta">Fei-Fei Li · 2019</div>
    </div>
    <div class="card elev-sm">
      <div class="card-kicker">Tech CEOs &amp; industry leaders</div>
      <blockquote>"AI is going to change the world more than anything in the history of mankind."</blockquote>
      <div class="card-meta">Satya Nadella · 2019</div>
    </div>
    <div class="card elev-sm">
      <div class="card-kicker">Philosophical views</div>
      <blockquote>"The question of whether a computer can think is no more interesting than the question of whether a submarine can swim."</blockquote>
      <div class="card-meta">Edsger Dijkstra · 1984</div>
    </div>
    <div class="card elev-sm">
      <div class="card-kicker">Modern insights</div>
      <blockquote>"AI is probably the most important thing humanity has ever worked on."</blockquote>
      <div class="card-meta">Sam Altman · 2023</div>
    </div>
    <div class="card elev-sm">
      <div class="card-kicker">Ethical considerations</div>
      <blockquote>"The real risk with AI isn't malice but competence."</blockquote>
      <div class="card-meta">Stuart Russell · 2015</div>
    </div>
    <div class="card elev-sm">
      <div class="card-kicker">Future perspectives</div>
      <blockquote>"The future is not something we enter. The future is something we create."</blockquote>
      <div class="card-meta">Demis Hassabis · 2016</div>
    </div>
    <div class="card elev-sm">
      <div class="card-kicker">Research leaders</div>
      <blockquote>"The question isn't whether AI will change society. The question is who will benefit."</blockquote>
      <div class="card-meta">Kate Crawford · 2021</div>
    </div>
  </div>
  <p><a href="{{ '/AI-quotes.html' | relative_url }}" class="btn btn-secondary">View all 26 quotes</a></p>
</section>

<section id="robotics" class="section" style="padding-bottom: 40px;">
  <span class="section-kicker">Field notes</span>
  <h2 class="section-title">Robotics</h2>
  <p class="section-lede">Tutorials and notes on ROS, navigation, computer vision, and the math behind robotics, migrated from the <a href="https://roboticswithdenim.wordpress.com/">Robotics At Once</a> blog.</p>
  <div class="card-grid card-grid--tight" style="margin-bottom: 24px;">
    <div class="card"><div class="card-kicker">ROS</div><div class="card-title">Robot Operating System</div><p class="card-body">9 notes on workspaces, packages, nodes and pub/sub.</p></div>
    <div class="card"><div class="card-kicker">Navigation</div><div class="card-title">Odometry &amp; kinematics</div><p class="card-body">3 notes on how a robot tracks and plans its motion.</p></div>
    <div class="card"><div class="card-kicker">Computer vision</div><div class="card-title">Seeing the world</div><p class="card-body">3 notes on image basics and where to learn more.</p></div>
    <div class="card"><div class="card-kicker">Math</div><div class="card-title">Linear algebra &amp; quaternions</div><p class="card-body">2 notes on the math underneath it all.</p></div>
    <div class="card"><div class="card-kicker">Interactive</div><div class="card-title">Nonlinear optimization</div><p class="card-body">Gradient descent, Newton, Gauss-Newton &amp; Levenberg-Marquardt, built step by step around robot localization.</p></div>
  </div>
  <a href="{{ '/robotics/' | relative_url }}" class="btn btn-secondary">View all robotics notes</a>
  <a href="{{ '/nonlinear-optimization.html' | relative_url }}" class="btn btn-ghost">Try the optimization guide →</a>
</section>
