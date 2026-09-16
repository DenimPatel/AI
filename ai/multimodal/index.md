---
layout: series-hub
title: Multimodal Models, Interactively
section: ai
series: multimodal
permalink: /ai/multimodal/
subtitle: Volume II of the Multimodal & Generative Media arc - how a model is made to see, how a vision encoder is bolted onto a language model, and how one trunk comes to read text, images, audio and video together, then how it grounds, acts and gets served.
description: "An interactive guide to multimodal models - the vision transformer, contrastive pretraining with CLIP and SigLIP, the shared embedding space and its failure modes, the modality zoo, adapter and projector architectures, resolution and the token budget, how a VLM is trained and why it hallucinates, early fusion and omni models, video and audio into one trunk, unified understanding and generation, grounding, vision-language-action and the serving economics."
---

<p class="section-lede" style="max-width:70ch;">A language model sees a sequence of token ids. The whole problem of multimodal modelling is how to turn a picture &mdash; or a second of speech, or a video clip &mdash; into something a transformer can attend to, and then how to make the model care about it. This volume starts with the simplest possible answer, a grid of patches fed through a transformer, and follows the design space out to the 2026 frontier, where one trunk consumes text, image, audio and video in the same early-fused token stream and answers in text, speech or pixels.</p>

<p class="section-lede" style="max-width:70ch;">It is the second half of a pair. <a href="{{ '/ai/generative-media/' | relative_url }}">Generative Media, Interactively</a> makes media; this volume reads it, and the two meet in the middle at the latent space both share. The prerequisites are the same foundation volumes &mdash; the <a href="{{ '/math/linear-algebra/' | relative_url }}">linear algebra</a> guide for the similarity and projection geometry that contrastive learning is built from, and the <a href="{{ '/math/probability/' | relative_url }}">probability</a> guides for the softmax and the likelihoods behind every caption. Where it needs the serving side of a multimodal request &mdash; the prefill/decode inversion an image token causes, the encoder cache, the disaggregated vision pool &mdash; it links straight into <a href="{{ '/ai/llm-serving/' | relative_url }}">LLM Serving, Interactively</a>, whose Part 18 states those costs and whose Part 13 sizes the pools. The from-scratch encoder it assumes lives in <a href="{{ '/ai/generative-media/' | relative_url }}">the sibling volume</a>.</p>
