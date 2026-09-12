# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A Jekyll site published by GitHub Pages at https://denimpatel.github.io/AI/. No JavaScript
framework, no npm, no build step beyond Jekyll. There are no automated tests, but CI
(`.github/workflows/ci.yml`) runs a build, an internal link check, and a content linter on
every push and PR — see Commands below. A separate monthly job checks external links too.

Content is roughly 250,000 words across ~60 pages, and the great majority of it is four
long interactive guides made of hand-written `<canvas>` and vanilla JS. Treat those guide
pages as the crown jewels: they are fragile, they are not covered by any test, and a change
you cannot see rendered is a change you cannot verify.

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
| `_data/sections.yml` | The three subjects (`ai`, `vision`, `robotics`) — drives the global nav, the homepage doors, and every section hub |
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
   `vision/{multi-view-geometry,nonlinear-optimization}/*/index.html`). These have **no
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
rules are byte-identical across all 13 MVG files. Extracting them to a shared stylesheet
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

**This is additive only.** The 19 existing multi-view-geometry and nonlinear-optimization
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

## Conventions

- The `theme:` key is explicitly `null`. The `github-pages` gem injects
  `jekyll-theme-primer` by default; every layout here is local, so it is disabled.
- `Gemfile.lock` is gitignored — GitHub Pages resolves its own gem set.
- Robotics notes keep their original informal blog voice ("hey buddy"). Don't rewrite it.
