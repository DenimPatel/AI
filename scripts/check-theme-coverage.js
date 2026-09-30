#!/usr/bin/env node
/*
 * Every real page in this repo must carry the whole theme layer.
 *
 * WHY THIS IS NOT OBVIOUS. This site has two kinds of built page and only one
 * of them is a page:
 *
 *   - 31 real pages, rendered from Markdown through _layouts/default.html.
 *   - ~319 generated redirect stubs under ai/, math/ and vision/ plus the
 *     repo root, each a meta-refresh pointing at the companion
 *     interactive-courses site. They are built here so that old URLs keep
 *     working, and they have no <head> worth styling.
 *
 * A naive `grep -rl theme.css _site | wc -l` therefore reports a number that
 * looks like coverage and is not: it is diluted by ~319 stubs that could never
 * carry it. This counts the two populations separately and only requires the
 * real ones to be complete.
 *
 * WHAT "COMPLETE" MEANS. Five things, each of which fails in a way that is
 * invisible in the rendered page:
 *
 *   theme.css       without the token layer the page renders in the previous
 *                   warm theme, because styles.css only ever reads tokens.
 *   chrome.css      without it there is no theme toggle, no settings panel and
 *                   no mobile drawer, and the nav keeps the sidebar geometry.
 *   theme-boot.html without it nothing writes data-theme before first paint, so
 *                   a reader who chose Dark is shown a light frame first.
 *   theme-tokens.js the colour bridge, for any page that paints a canvas.
 *   id="main"       the skip link's target. A page without it gets a skip link
 *                   that moves focus nowhere, which is worse than none.
 *
 * Usage: node scripts/check-theme-coverage.js
 */
"use strict";

const fs = require("fs");
const path = require("path");

const root = "_site";

const REQUIRED = [
  ["css/theme.css", "token layer"],
  ["css/styles.css", "site stylesheet"],
  ["css/chrome.css", "nav, settings panel, mobile drawer"],
  ["js/theme-tokens.js", "colour bridge"],
  ["js/preferences.js", "preference store"],
  // Liquid expands {% include %} at build time, so the include NAME is not in
  // the output. What is in the output is what the include installs:
  // window.__icThemeBoot, the function site-nav.html re-invokes for any page
  // that booted late. That identifier is the marker to look for, and looking
  // for "theme-boot.html" instead reports 31 false failures on a correct site.
  ["__icThemeBoot", "no-flash boot script"],
  ['id="main"', "skip-link target"],
  ["ic-prefs-panel", "settings panel markup"],
  ["skip-link", "skip link"]
];

if (!fs.existsSync(root)) {
  console.error("FAIL: " + root + " does not exist — build the site first");
  process.exit(1);
}

function walk(dir, out) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith(".html")) out.push(p);
  }
  return out;
}

const all = walk(root, []);
const real = [];
const stubs = [];
for (const f of all) {
  (fs.readFileSync(f, "utf8").includes('http-equiv="refresh"') ? stubs : real).push(f);
}

const missing = [];
for (const file of real) {
  const html = fs.readFileSync(file, "utf8");
  for (const [needle, what] of REQUIRED) {
    if (!html.includes(needle)) {
      missing.push({ file: path.relative(root, file), needle, what });
    }
  }
}

if (missing.length) {
  console.log(
    "FAIL: " + missing.length + " missing piece(s) of the theme layer across " + real.length + " real pages\n"
  );
  for (const m of missing) console.log("  " + m.file + "  — missing " + m.needle + "  (" + m.what + ")");
  process.exit(1);
}

console.log(
  "PASS: all " + real.length + " real pages carry the theme layer " +
  "(" + stubs.length + " redirect stubs correctly excluded)"
);
