# AI

A Jekyll site published by GitHub Pages at https://denimpatel.github.io/AI/. It's a running
record of the AI field (timeline, product releases, benchmarks, labs, quotes, key papers),
two long interactive guides on multi-view geometry and nonlinear optimization, a 15-part
interactive guide on how a language model is trained, and a set of field notes on ROS and
robot navigation.

No JavaScript framework, no npm, no build step beyond Jekyll.

## Building it

```bash
export LANG=C.UTF-8 LC_ALL=C.UTF-8    # Ruby defaults to US-ASCII here; the build dies on
                                        # the site's em-dashes without this

bundle install                         # first time only
bundle exec jekyll build --safe --trace
bundle exec jekyll serve               # local preview at http://localhost:4000/AI/
```

Run the link check before and after any page move — the failure count must not increase:

```bash
bundle exec htmlproofer _site --disable-external --swap-urls '^/AI:' \
  --ignore-empty-alt --no-enforce-https
```

And the content linter, which enforces the conventions below (warn-only on files that
already existed before your change, fails only on new/changed files):

```bash
ruby scripts/lint-content.rb
```

CI (`.github/workflows/ci.yml`) runs all three of the above on every push and PR. A
separate monthly job (`.github/workflows/link-check.yml`) checks external links too,
since the site hotlinks all 31 raster images to an external blog with no local fallback.

## Adding content

Almost nothing structural is written by hand in a page — `_data/` is the source of truth
(see `CLAUDE.md` for the full map). Use the scaffolding scripts rather than copy-pasting
an existing page:

| To add... | Run |
|---|---|
| A part to an existing interactive guide series | `scripts/new-part.sh <series_id> <slug>` |
| A field note | `scripts/new-note.sh <section> <group> <slug>` |
| A brand-new guide series | `scripts/new-series.sh <section> <series_id>` |

Each writes from a template in `_templates/` and leaves `REPLACE_*` placeholders for you
to fill in; none of them touch an existing file (`new-series.sh` does rewrite
`_data/sections.yml` through a YAML round-trip to register the series — diff it before
committing).

New interactive guide pages should build on the "guide kit" — `_includes/guide-head.html`,
`_includes/guide-footer.html`, `assets/css/guide.css`, `assets/js/guide-core.js`,
`assets/js/guide-math.js`, `assets/js/guide-plot3d.js` — rather than pasting a new
`<style>`/`<script>` block. See `CLAUDE.md` for the full architecture and the guide kit's
scope (it is for *new* pages only — the 19 existing multi-view-geometry and
nonlinear-optimization pages keep their inline styles and are never migrated).

See `CLAUDE.md` for everything else: the three page shapes, the `{% raw %}` gotchas,
`baseurl`/`relative_url` rules, and front-matter conventions.
