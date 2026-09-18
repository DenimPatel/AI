# AI

A Jekyll site published by GitHub Pages at https://denimpatel.github.io/AI/. It is the
"everything else" half of a two-repo split:

- **This repo** — the running record of the AI field (timeline, product releases,
  benchmarks, labs, quotes, key papers), the field notes on ROS, robot navigation and
  computer vision, and the blog at `/blog/` that gathers those notes plus new perspective
  pieces.
- **[interactive-courses](https://github.com/DenimPatel/interactive-courses)** — all the
  interactive guides (LLM training and serving, building with LLMs, agents, generative
  media, multimodal, multi-view geometry, nonlinear optimization, linear algebra,
  calculus, probability, statistics), published at
  https://denimpatel.github.io/interactive-courses/.

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

CI (`.github/workflows/ci.yml`) runs all three of the above on every push and PR.
`.github/workflows/pages.yml` builds and deploys the site. A separate monthly job
(`.github/workflows/link-check.yml`) checks external links too, since the site hotlinks
all 31 raster images to an external blog with no local fallback.

## Adding content

Almost nothing structural is written by hand in a page — `_data/` is the source of truth
(see `CLAUDE.md` for the full map). Use the scaffolding scripts rather than copy-pasting
an existing page:

| To add... | Run |
|---|---|
| A field note or blog post | `scripts/new-note.sh <section> <group> <slug>` |

For a pure-opinion blog post that fits neither subject, use section `blog` and group
`perspective`: `scripts/new-note.sh blog perspective <slug>`. It renders under
"Perspectives" on `/blog/`.

New interactive guide pages do **not** belong here any more — they go in the
[interactive-courses](https://github.com/DenimPatel/interactive-courses) repo, where
`scripts/new-part.sh` and `scripts/new-series.sh` live. After adding, removing or
renaming a guide part there, run this repo's sync script so the homepage counters and the
old-URL redirect stubs pick up the change:

```bash
ruby scripts/sync-guides.rb /path/to/interactive-courses
```

That regenerates `_data/guide_index.yml` (the homepage part counts) and the ~300 static
redirect stubs under the old `/AI/...` guide paths. Commit the result.

See `CLAUDE.md` for everything else: the page shapes, `baseurl`/`relative_url` rules,
the cross-repo link rules, and front-matter conventions.
