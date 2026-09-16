# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A Jekyll site published by GitHub Pages at https://denimpatel.github.io/AI/. No JavaScript
framework, no npm, no build step beyond Jekyll. There are no automated tests, but CI
(`.github/workflows/ci.yml`) runs a build, an internal link check, and a content linter on
every push and PR — see Commands below. A separate monthly job checks external links too.

Content is roughly 250,000 words across ~60 pages, and the great majority of it is ten
long interactive guides made of hand-written `<canvas>` and vanilla JS. Treat those guide
pages as the crown jewels: they are fragile, they are not covered by any test, and a change
you cannot see rendered is a change you cannot verify. The statistics guide's numerics have
a self-check (`scripts/check-stats-viz.js`) and every guide page can be smoke-tested in a
real browser (`scripts/smoke-guides.js`) — use them.

## Commands

```bash
export LANG=C.UTF-8 LC_ALL=C.UTF-8    # see "UTF-8" below — the build fails without this

bundle install                         # first time only; installs the github-pages gem set
bundle exec jekyll build --safe --trace
bundle exec jekyll serve               # local preview at http://localhost:4000/AI/

# link check — run before and after any move; the failure count must not increase
bundle exec htmlproofer _site --disable-external --swap-urls '^/AI:' \
  --ignore-empty-alt --no-enforce-https

# content linter — warn-only on files that existed before your change, fails only on
# new/changed files (diffed against origin/main); see scripts/lint-content.rb for the
# full rule list (front-matter completeness/quoting, part numbers, stale "N-part"
# counters, series permalink round-trips, bare hrefs, {% raw %} leaks, redirect_from
# coverage of series `legacy` URLs).
ruby scripts/lint-content.rb

# numerics self-check for the statistics domain layer (no test framework in the repo;
# asserts known CDF/quantile/test/Kalman values against assets/js/stats-viz.js)
node scripts/check-stats-viz.js

# rendered-page smoke test: loads built guide pages from _site in a real browser,
# fails on console/page errors and blank canvases. Local dev aid, NOT in CI. Pass a
# path prefix to scope it, e.g. `node scripts/smoke-guides.js math/statistics`.
node scripts/smoke-guides.js
```

CI (`.github/workflows/ci.yml`) runs all three of the above on every push and PR — this is
the same command set to run locally before committing. `.github/workflows/link-check.yml`
runs monthly with external link checking turned on (`--disable-external` dropped), since
the 31 hotlinked images have no local fallback.

`--safe` matches the GitHub Pages sandbox and rejects non-whitelisted plugins, so always
build with it. `--swap-urls '^/AI:'` strips the `baseurl` so html-proofer can resolve links
against `_site`.

**UTF-8:** Ruby defaults to a US-ASCII external encoding in this environment, and the build
dies with `Invalid US-ASCII character "\xE2"` on the site's em-dashes. Export `LANG` and
`LC_ALL` as above. GitHub Pages builds with UTF-8, so this is a local-only concern.

## Architecture

### `_data/` is the source of truth, not the pages

Almost nothing structural is written by hand in a page. Before editing markup, check whether
the thing you want to change is generated:

| File | Owns |
|---|---|
| `_data/sections.yml` | The four subjects (`ai`, `vision`, `robotics`, `math`) — drives the global nav, the homepage doors, and every section hub |
| `_data/series/*.yml` | Each guide's ordered part list: numbering, titles, permalinks, blurbs, and the `legacy` URL each part redirects from |
| `_data/note_groups.yml` | Grouping and ordering of the field-note listings |
| `_data/{timeline,products,benchmarks,labs,quotes}.yml` | The AI record content, rendered by both `/ai/<page>/` and the homepage teaser |

The homepage counters are computed from these files. **Never hardcode a count** — the
previous hardcoded "85 releases" had drifted from the actual 73.

**Part numbers live only in `_data/series/*.yml`.** Do not restate them in a page's
`description` or `title`; five descriptions previously carried numbers that contradicted
the nav. `scripts/lint-content.rb` checks both for new/changed pages.

To add a part to a guide: add the entry to the series YAML *and* create the page. The nav,
the prev/next block, the hub card grid, and the homepage counter all follow automatically.

### Three page shapes

1. **Markdown + layout** (`ai/*.md`, `about.md`, hub pages). Uses `_layouts/page.html`,
   `section-hub.html` or `series-hub.html`. Normal Jekyll.
2. **Standalone interactive guides** (`ai/llm-training/*/index.html`,
   `vision/{multi-view-geometry,nonlinear-optimization}/*/index.html`,
   `math/{linear-algebra,calculus,calculus-in-motion,probability,probability-in-action,statistics}/*/index.html`).
   These have **no
   `layout:`** — each is a complete `<!DOCTYPE html>` document with its own `<head>` and its
   own page-specific `<style>` block. They pull in shared chrome explicitly:
   ```liquid
   {% include site-nav.html %}
   {% include series-nav.html series=site.data.series.<series_id> %}
   ...
   {% include series-prevnext.html series=site.data.series.<series_id> %}
   ```
   Because they bypass `_layouts/default.html`, anything added to that layout will **not**
   appear on them. Changes to global chrome usually need to touch `_includes/site-nav.html`
   (shared) rather than the layout.
3. **Field notes** (`robotics/**/index.md`, `vision/notes/*/index.md`). Layout comes from
   `defaults:` in `_config.yml`, not from front matter. Each carries `section`, `group`,
   `order` and `date_label`; `_includes/note-list.html` generates the listings from those.

### `{% raw %}` blocks in the guides

The guides wrap their JS in `{% raw %}` so Liquid ignores `${...}` template literals. Prose
containing `{{ '/path/' | relative_url }}` sometimes falls **inside** those blocks, where it
renders as literal `{{ }}` text — a class of bug that shipped to production. If a link must
sit inside a raw region, step out for that line:

```liquid
{% endraw %}<p>... <a href="{{ '/vision/…/' | relative_url }}">link</a> ...</p>{% raw %}
```

### URLs and `baseurl`

The site is served under `baseurl: /AI`, so **every** link must go through `relative_url`;
a bare `href="/foo/"` will 404 in production. Runtime JS must get its URLs from Liquid too —
the guides do this by emitting `var VOCAB_URL = "{{ '/assets/data/…' | relative_url }}";`,
which resolves to an absolute `/AI/...` path and is therefore independent of page depth.

**Never break a URL.** Every page that has ever had a public URL carries it in
`redirect_from:`, and `jekyll-redirect-from` emits a stub at the old path. If you move a
page, add its old permalink to `redirect_from` and rewrite inbound internal links to the new
path so no internal link takes a redirect hop.

### Front matter must be quoted

Four files previously had unquoted `description:` values containing `": "`, which is invalid
YAML and silently broke their meta descriptions. Quote every string value.

## Assets

`assets/css/styles.css` is the whole design system; `llm-guide.css` and `llm-guide.js` are
LLM-series only. The four JSON files under `assets/data/` are fetched at runtime by the LLM
guides. There are no local images — **all 31 raster images are hotlinked to
`roboticswithdenim.wordpress.com`** and will disappear if that blog goes down.

The multi-view-geometry and nonlinear-optimization pages each carry a large inline `<style>`
block. These look duplicated but are not: pages deliberately override shared selectors with
per-page values (`.mvg-plot3d` height varies 320/340/380/420px across pages), and only 32
rules are byte-identical across all 20 MVG files. Extracting them to a shared stylesheet
reorders the cascade for a small payoff — this was considered and rejected.

## Adding new content

Use the scaffolding scripts rather than copy-pasting an existing page — each writes from a
template in `_templates/`, leaves `REPLACE_*` placeholders, and never edits an existing file
(`scripts/new-series.sh` is the one exception: it rewrites `_data/sections.yml` through a
YAML round-trip to register the new series, which can reformat comments/quoting elsewhere
in the file — diff it before committing).

- `scripts/new-part.sh <series_id> <slug>` — appends a part to `_data/series/<series_id>.yml`
  and writes the page from `_templates/guide-part.html`.
- `scripts/new-note.sh <section> <group> <slug>` — writes a field note from
  `_templates/note.md`.
- `scripts/new-series.sh <section> <series_id>` — creates a new `_data/series/<id>.yml`, a
  hub page (`layout: series-hub`), and registers it under `_data/sections.yml`.

### The guide kit

`_includes/guide-head.html`, `_includes/guide-footer.html`, `assets/css/guide.css`,
`assets/js/guide-core.js`, `assets/js/guide-math.js` and `assets/js/guide-plot3d.js` are a
subject-neutral version of the pattern the LLM Training series already uses
(`_includes/llm-head.html`, `assets/css/llm-guide.css`, `assets/js/llm-guide.js`) — canvas
setup, bar/line charts, an animation loop, slider binding, the vector/matrix math and the
Plotly cube scene that the vision guides re-derive per page. `_templates/guide-part.html`
wires a new page to it.

**This is additive only.** The 26 existing multi-view-geometry and nonlinear-optimization
pages keep their own inline `<style>` blocks and per-page scripts exactly as they are —
don't migrate them to the guide kit opportunistically, even though the classes and
functions look like an obvious match. Likewise `llm-guide.css`/`llm-guide.js` stay as they
are; the 16 LLM-training pages keep using `window.LLMG`, not `window.Guide`/`window.GuideMath`.
The guide kit exists so a genuinely new guide page is cheap to start, not to unify what
already ships. `vision/guide-kit-demo/` is a small demo series proving the kit renders —
not real content, kept as a working example and a build-time smoke test. The LLM Serving
series (`_data/series/llm_serving.yml`, `/ai/llm-serving/`) is the guide kit's first real
consumer: it adds generic helpers to `guide-core.js` (stacked bars, heatmaps, formatting,
hit-testing) and its own `assets/js/serving-sim.js` on top.

The Linear Algebra series (`_data/series/linear_algebra.yml`, `/math/linear-algebra/`) is
the guide kit's second real consumer and its first user of `guide-plot3d.js`. It adds two
small generic helpers to `guide-core.js` (`drawArrow`, `dragHandles`) plus matrix
typesetting classes to `guide.css` (`.g-matrix*`), and its own `assets/js/linalg-viz.js`
(`window.LinAlg`) on top: an N-dimensional matrix library (LU, QR, SVD, pseudoinverse,
eigen) and a reusable 2D cartesian `plane` widget that most of its demos are built from.
The same split rule applies — generic primitives to the kit, domain-shaped code to the
series file. `LinAlg.mat.svd` is one-sided Jacobi, not `eig(AᵀA)`, because the latter
squares the condition number and Part 19 deliberately constructs near-singular matrices.

The Probability guides (`_data/series/probability.yml`, `_data/series/probability_in_action.yml`, `/math/probability/` and `/math/probability-in-action/`) are the guide kit's **third real consumer** and its first two-volume series. Both volumes are registered in `_data/sections.yml`; each hub is a `series-hub` page, and each volume groups its parts under `acts:` in its series YAML. They add `assets/js/prob-viz.js` (`window.Prob`) on top of the kit: a seeded RNG and the standard discrete/continuous families, the special functions (`erf`, `erfinv`, `lgamma`, `regIncGamma`, `regIncBeta`, `logChoose`), `Prob.hist`, a multivariate normal with marginal/conditional extraction and covariance ellipses, Markov chains, entropy/KL/mutual-information measures, the histogram/Kalman/EKF/particle filters, and Metropolis/Gibbs/HMC. Kit-side they add exactly three generic helpers to `guide-core.js` (`Guide.fmtPct`, `Guide.gaussianFrom` — a seeded Box–Muller over a `seededRandom` stream — and `Guide.drawColumns`, the vertical counterpart to `drawBars`) and `.g-legend`/`.g-legend-item`/`.g-swatch` to `guide.css`.

`Prob.plot` is deliberately **not** `LinAlg.plane`. The plane widget captures `xRange`/`yRange` at construction with no setter, and probability demos rescale constantly — a σ slider changes the pdf's height, a bin-width slider changes a histogram's range. `Prob.plot` keeps the same method vocabulary (`clear`, `axes`, `grid`, `curve`, `bars`, `points`, `vline`, `handles`) and adds `setRange`, `area` (tail and interval shading) and `steps` (CDF staircases). Every stochastic demo draws through `Prob.rng` (which wraps `Guide.seededRandom`), never `Math.random()`; `GuideMath.gaussianNoise` is intentionally unused for sampling because it cannot be seeded.

The Statistics series (`_data/series/statistics.yml`, `/math/statistics/`, 32 parts plus a
`glossary` appendix) is the guide kit's **fourth real consumer**, and the first to reuse
another series' domain layer. It builds on the Probability volumes' prerequisites without
linking into them page-by-page (nothing in the series links to a Probability URL that did
not yet exist when it was authored), and now that both volumes ship in the same site the hub
pages cross-link at the `/math/` and `/math/statistics/` level. It adds one small generic
helper to `guide-core.js` —
`Guide.niceTicks(min, max, target)`, the standard 1/2/5×10ᵏ nice-number tick algorithm that
`drawLines` should have had; `Stats.plot.axes` is its first consumer. Everything else
domain-shaped lives in `assets/js/stats-viz.js` (`window.Stats`): the special functions the
repo otherwise lacks (`erf`/`erfinv`, `lgamma`/`lbeta`, regularized incomplete beta/gamma,
without which no exact t/χ²/F tail area is possible), seeded samplers and `{pdf,cdf,quantile,
mean,var}` for every distribution the series draws from, summary statistics, `chol`,
estimators (OLS/ridge/lasso/MLE/observed Fisher), resampling (bootstrap/BCa/permutation/
jackknife), classical tests, Bayesian helpers (conjugate updates, Metropolis, Gibbs, Laplace,
R-hat), recursive filters (histogram1d, Kalman, EKF, particle), ML and causal metrics, and
`Stats.plot(canvas, opts)` — a canvas widget modelled directly on `LinAlg.plane`, with the
same `px/py/wx/wy` mapping and `handles(specsOrFn, onChange)` world-coordinate contract,
plus `axes` (real numeric ticks), `columns` (vertical histogram) and `ellipse(cov, mean, k)`.

**`assets/js/linalg-viz.js` is loaded by the statistics pages too** (before `stats-viz.js`),
for `LinAlg.mat.*` (solve/inverse/eigSym/svd/pinv) and for `LinAlg.plane` where a plain 2D
plane or a live matrix readout is wanted; `LinAlg.plane.ellipse(A)` already draws the image
of the unit circle under a matrix, so handing it `chol(Σ)·k` is a covariance ellipse for
free. No file was changed to enable this — it is a genuinely generic matrix library and
re-implementing LU/QR/SVD inside `stats-viz.js` would be pure duplication — but it does make
`linalg-viz.js` de facto shared, so treat its public surface as stable.

The series also carries two Node scripts that are *not* wired into CI (Ruby-only):
`scripts/check-stats-viz.js` asserts known values for the special functions, distribution
tails, conjugate updates, the scalar Kalman update, OLS, bootstrap/permutation and the
metrics; `scripts/smoke-guides.js` loads built pages from `_site` in Playwright (resolving a
browser from the npx cache or installed Chrome), failing on console/page errors and blank
canvases. Its glossary appendix is a filterable term index plus the distribution table, the
test-selection table and the estimator/interval card.

`assets/js/guide-quiz.js` (`window.GuideQuiz`) adds a "check your understanding" quiz
section every `/math/` part page ends with, right before `.g-next`. It is generic — the UI,
scoring and progress-tracking are identical across every series — so it sits at the kit
level alongside `guide-core.js`, not inside a per-series file. Two question kinds only:
`choice` (one correct option out of a list, revealed instantly on click) and `numeric` (a
value checked against `answer` within `tolerance` or `relativeTolerance`, default `1e-6`).
Each page authors its own `QUIZ_QUESTIONS` array inline, next to the demo it tests — quiz
content is page-specific prose, like the cheat-sheet and further-reading list, not
structural data, so it does not live in `_data/`. Progress is one versioned localStorage
key (`guide:quiz:v1`), read/written defensively for private-mode browsers, and drives the
page's own "X/Y answered" badge — there is no cross-page rollup. A page wires it up with:
```liquid
<script src="{{ '/assets/js/guide-quiz.js' | relative_url }}"></script>
<script>window.__GUIDE_PAGE_ID__ = {{ page.permalink | jsonify }};</script>
{% raw %}<script>
var QUIZ_QUESTIONS = [ /* {id, kind:'choice'|'numeric', prompt, options|answer, ...} */ ];
GuideQuiz.init(document.getElementById('quiz-root'), QUIZ_QUESTIONS, window.__GUIDE_PAGE_ID__);
</script>{% endraw %}
```
`window.__GUIDE_PAGE_ID__` is emitted from a plain (non-`raw`) script tag specifically so
no line inside the `{% raw %}` block ever needs to combine `{{` with `relative_url` — lint
rule 7 doesn't come into play. `_templates/guide-part.html` scaffolds an empty quiz section
by default (`GuideQuiz` renders "coming soon" for an empty array), so every new part gets
the slot; fill in real questions before shipping the page.

## Conventions

- The `theme:` key is explicitly `null`. The `github-pages` gem injects
  `jekyll-theme-primer` by default; every layout here is local, so it is disabled.
- `Gemfile.lock` is gitignored — GitHub Pages resolves its own gem set.
- Robotics notes keep their original informal blog voice ("hey buddy"). Don't rewrite it.
