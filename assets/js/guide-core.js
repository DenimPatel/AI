/* Guide kit — subject-neutral canvas/DOM helpers for NEW interactive guide pages.
 * Promoted from assets/js/llm-guide.js (which is untouched — the existing LLM-training
 * pages keep using window.LLMG; new pages should use window.Guide instead).
 * Load before any page-specific <script>. */
(function (global) {
  "use strict";

  function css(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }

  function colors() {
    return {
      accent: css('--color-accent') || '#2b5fff',
      accent2: css('--color-accent-2') || '#d6006c',
      accent400: css('--color-accent-400') || '#5d85fd',
      accent500: css('--color-accent-500') || '#93aefe',
      accent700: css('--color-accent-700') || '#0b3cd0',
      text: css('--color-text') || '#201e1d',
      divider: css('--color-divider') || '#ccc',
      font: css('--font-body') || 'sans-serif',
      mono: css('--font-mono') || 'monospace'
    };
  }

  // DPR-aware canvas: sets backing resolution to CSS-size * devicePixelRatio,
  // scales the context so drawing code keeps using the "logical" width/height
  // passed in, and re-runs `onResize(logicalW, logicalH)` when the element resizes.
  function setupCanvas(canvas, logicalW, logicalH, onResize) {
    var ctx = canvas.getContext('2d');
    function resize() {
      var rect = canvas.getBoundingClientRect();
      var cssW = rect.width || logicalW;
      var cssH = cssW * (logicalH / logicalW);
      var dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(cssW * dpr);
      canvas.height = Math.round(cssH * dpr);
      canvas.style.height = cssH + 'px';
      ctx.setTransform(dpr * (cssW / logicalW), 0, 0, dpr * (cssW / logicalW), 0, 0);
      if (onResize) onResize(logicalW, logicalH);
    }
    var ro = (typeof ResizeObserver !== 'undefined') ? new ResizeObserver(resize) : null;
    if (ro) ro.observe(canvas); else window.addEventListener('resize', resize);
    resize();
    // Remember the logical coordinate system so hitTest() can map pointer events
    // back into it (setupCanvas applies a DPR + CSS-scale transform, so raw
    // offsetX is in backing-store pixels, not logical units).
    canvas.__gLogW = logicalW;
    canvas.__gLogH = logicalH;
    return { ctx: ctx, resize: resize };
  }

  // Map a pointer/mouse event to logical canvas coordinates. `canvas` must be one
  // passed through setupCanvas (which records __gLogW/__gLogH).
  function hitTest(canvas, ev) {
    var rect = canvas.getBoundingClientRect();
    var logW = canvas.__gLogW || rect.width || 1;
    var logH = canvas.__gLogH || rect.height || 1;
    var clientX = ev.clientX != null ? ev.clientX : (ev.touches && ev.touches[0] ? ev.touches[0].clientX : 0);
    var clientY = ev.clientY != null ? ev.clientY : (ev.touches && ev.touches[0] ? ev.touches[0].clientY : 0);
    return {
      x: (clientX - rect.left) * (logW / (rect.width || logW)),
      y: (clientY - rect.top) * (logH / (rect.height || logH))
    };
  }

  // Numerically-stable softmax (copied from llm-guide.js so a stochastic demo can
  // sample deterministically from a seeded RNG).
  function softmax(xs, temperature) {
    temperature = temperature || 1.0;
    var scaled = xs.map(function (x) { return x / temperature; });
    var max = Math.max.apply(null, scaled);
    var exps = scaled.map(function (x) { return Math.exp(x - max); });
    var sum = exps.reduce(function (a, b) { return a + b; }, 0);
    return exps.map(function (e) { return e / sum; });
  }

  // Deterministic 32-bit LCG (copied from llm-guide.js). Every stochastic demo in
  // the serving series must use this, never Math.random(), so a reload is stable.
  function seededRandom(seed) {
    var s = seed >>> 0;
    return function () {
      s = (s * 1664525 + 1013904223) >>> 0;
      return s / 4294967296;
    };
  }

  function fmtBytes(n, digits) {
    digits = digits == null ? 1 : digits;
    var abs = Math.abs(n);
    var units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
    var i = 0;
    while (abs >= 1024 && i < units.length - 1) { abs /= 1024; n /= 1024; i++; }
    return (i === 0 ? Math.round(n) : n.toFixed(digits)) + ' ' + units[i];
  }

  function fmtNum(n, digits) {
    digits = digits == null ? 0 : digits;
    return n.toFixed(digits).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  // Fraction -> percent string: fmtPct(0.952, 1) === "95.2%".
  function fmtPct(x, digits) {
    digits = digits == null ? 0 : digits;
    return (x * 100).toFixed(digits) + '%';
  }

  // One standard normal drawn from a *seeded* stream (Box–Muller). The seeded
  // counterpart to GuideMath.gaussianNoise, which calls Math.random().
  function gaussianFrom(rng) {
    var u = Math.max(rng(), 1e-9), v = rng();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  }

  function fmtMs(ms) {
    if (ms == null) return '—';
    if (ms < 1) return (ms * 1000).toFixed(0) + ' µs';
    if (ms < 1000) return (ms < 10 ? ms.toFixed(2) : ms.toFixed(0)) + ' ms';
    if (ms < 60000) return (ms / 1000).toFixed(2) + ' s';
    var m = Math.floor(ms / 60000), s = Math.round((ms % 60000) / 1000);
    return m + 'm ' + s + 's';
  }

  // Horizontal stacked bars, one row per entry. rows: [{label, segments:[{value,color,name}]}].
  // Used by every memory/latency breakdown. Returns {scale, barH, padL} so callers can
  // draw a capacity line or a legend on top of the same geometry.
  function drawStacked(ctx, W, H, rows, opts) {
    opts = opts || {};
    var c = colors();
    ctx.clearRect(0, 0, W, H);
    if (!rows || !rows.length) return { scale: 1, barH: 0, padL: 0 };
    var padL = opts.padL != null ? opts.padL : 110, padR = opts.padR != null ? opts.padR : 16;
    var padT = opts.padT != null ? opts.padT : 10, padB = opts.padB != null ? opts.padB : 24;
    var gap = opts.gap != null ? opts.gap : 12;
    var totals = rows.map(function (r) {
      return r.segments.reduce(function (a, s) { return a + Math.max(0, s.value); }, 0);
    });
    var maxTotal = opts.maxTotal != null ? opts.maxTotal : Math.max.apply(null, totals) || 1;
    var plotW = W - padL - padR;
    var barH = Math.max(6, (H - padT - padB - gap * (rows.length - 1)) / rows.length);
    ctx.font = (opts.fontSize || 12) + 'px ' + c.font;
    var palette = opts.palette || [c.accent, c.accent2, c.accent400, c.accent700, '#c9a227', '#7a5c9e', '#5f8a3a', '#b0552d'];
    rows.forEach(function (r, i) {
      var y = padT + i * (barH + gap);
      var x = padL;
      r.segments.forEach(function (s, j) {
        var w = plotW * (Math.max(0, s.value) / maxTotal);
        ctx.fillStyle = s.color || palette[j % palette.length];
        ctx.fillRect(x, y, w, barH);
        if (opts.showSegmentLabels && w > 34) {
          ctx.fillStyle = opts.segmentLabelColor || '#fff';
          ctx.textAlign = 'center';
          ctx.fillText(fmtBytes(s.value), x + w / 2, y + barH * 0.68);
        }
        x += w;
      });
      ctx.fillStyle = c.text;
      ctx.textAlign = 'right';
      ctx.fillText(r.label, padL - 8, y + barH * 0.72);
    });
    ctx.textAlign = 'right';
    ctx.fillStyle = c.text;
    ctx.font = '11px ' + c.font;
    if (opts.axisLabel) {
      ctx.textAlign = 'center';
      ctx.fillText(opts.axisLabel, padL + plotW / 2, H - 4);
    }
    return { scale: plotW / maxTotal, barH: barH, padL: padL, padT: padT };
  }

  // Heatmap for expert loads, attention masks and block tables. `matrix` is a 2D
  // array of numbers (rows x cols). opts: {min, max, colorLow, colorHigh, rowLabels, colLabels}.
  function drawHeatmap(ctx, W, H, matrix, opts) {
    opts = opts || {};
    var c = colors();
    ctx.clearRect(0, 0, W, H);
    if (!matrix || !matrix.length) return;
    var rows = matrix.length, cols = matrix[0].length;
    var padL = opts.padL != null ? opts.padL : (opts.rowLabels ? 54 : 4);
    var padB = opts.padB != null ? opts.padB : (opts.colLabels ? 26 : 4);
    var padT = opts.padT != null ? opts.padT : 6, padR = 6;
    var cellW = (W - padL - padR) / cols, cellH = (H - padT - padB) / rows;
    var vals = [];
    matrix.forEach(function (row) { row.forEach(function (v) { vals.push(v); }); });
    var min = opts.min != null ? opts.min : Math.min.apply(null, vals);
    var max = opts.max != null ? opts.max : Math.max.apply(null, vals) || 1;
    var lo = opts.colorLow || [234, 240, 255], hi = opts.colorHigh || [43, 95, 255];
    function color(v) {
      var t = (max === min) ? 0 : (v - min) / (max - min);
      t = Math.max(0, Math.min(1, t));
      return 'rgb(' + Math.round(lo[0] + (hi[0] - lo[0]) * t) + ',' +
        Math.round(lo[1] + (hi[1] - lo[1]) * t) + ',' + Math.round(lo[2] + (hi[2] - lo[2]) * t) + ')';
    }
    for (var r = 0; r < rows; r++) {
      for (var q = 0; q < cols; q++) {
        ctx.fillStyle = color(matrix[r][q]);
        ctx.fillRect(padL + q * cellW, padT + r * cellH, Math.max(1, cellW + 0.5), Math.max(1, cellH + 0.5));
      }
    }
    ctx.fillStyle = c.text;
    ctx.font = (opts.fontSize || 10) + 'px ' + c.font;
    if (opts.rowLabels) {
      ctx.textAlign = 'right';
      for (var i = 0; i < rows; i++) {
        if (rows <= 24 || i % Math.ceil(rows / 24) === 0) {
          ctx.fillText(opts.rowLabels[i] != null ? opts.rowLabels[i] : i,
            padL - 6, padT + i * cellH + cellH * 0.7);
        }
      }
    }
    if (opts.colLabels) {
      ctx.textAlign = 'center';
      for (var k = 0; k < cols; k++) {
        if (cols <= 24 || k % Math.ceil(cols / 24) === 0) {
          ctx.fillText(opts.colLabels[k] != null ? opts.colLabels[k] : k,
            padL + k * cellW + cellW / 2, H - padB + 14);
        }
      }
    }
    return { cellW: cellW, cellH: cellH, padL: padL, padT: padT };
  }

  // Horizontal bar chart. data: [{label, value}], sorted by caller if desired.
  function drawBars(ctx, W, H, data, opts) {
    opts = opts || {};
    var c = colors();
    ctx.clearRect(0, 0, W, H);
    var padL = opts.padL != null ? opts.padL : 90, padR = opts.padR != null ? opts.padR : 40;
    var padT = opts.padT != null ? opts.padT : 12, padB = opts.padB != null ? opts.padB : 10;
    var maxV = opts.maxV != null ? opts.maxV : Math.max.apply(null, data.map(function (d) { return d.value; })) || 1;
    var barH = (H - padT - padB) / data.length - (opts.gap != null ? opts.gap : 8);
    var gap = opts.gap != null ? opts.gap : 8;
    ctx.font = (opts.fontSize || 12) + 'px ' + c.font;
    data.forEach(function (d, i) {
      var y = padT + i * (barH + gap);
      var w = Math.max(0, (W - padL - padR) * (d.value / maxV));
      ctx.fillStyle = d.color || (i === 0 ? c.accent : c.accent400);
      ctx.fillRect(padL, y, w, barH);
      ctx.fillStyle = c.text;
      ctx.textAlign = 'right';
      ctx.fillText(d.label, padL - 8, y + barH * 0.7);
      ctx.textAlign = 'left';
      ctx.fillText(d.valueLabel != null ? d.valueLabel : d.value, padL + w + 6, y + barH * 0.7);
    });
  }

  // Simple line chart. series: [{points:[{x,y}], color}], x/y in data units; xRange/yRange = [min,max].
  function drawLines(ctx, W, H, series, xRange, yRange, opts) {
    opts = opts || {};
    var c = colors();
    ctx.clearRect(0, 0, W, H);
    var padL = opts.padL != null ? opts.padL : 44, padR = opts.padR != null ? opts.padR : 16;
    var padT = opts.padT != null ? opts.padT : 12, padB = opts.padB != null ? opts.padB : 28;
    var plotW = W - padL - padR, plotH = H - padT - padB;
    function px(x) { return padL + plotW * (x - xRange[0]) / (xRange[1] - xRange[0]); }
    function py(y) { return padT + plotH * (1 - (y - yRange[0]) / (yRange[1] - yRange[0])); }
    ctx.strokeStyle = c.divider; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(padL, padT); ctx.lineTo(padL, padT + plotH); ctx.lineTo(padL + plotW, padT + plotH); ctx.stroke();
    ctx.fillStyle = c.text; ctx.font = '11px ' + c.font;
    if (opts.xLabel) { ctx.textAlign = 'center'; ctx.fillText(opts.xLabel, padL + plotW / 2, H - 4); }
    if (opts.yLabel) {
      ctx.save(); ctx.translate(12, padT + plotH / 2); ctx.rotate(-Math.PI / 2);
      ctx.textAlign = 'center'; ctx.fillText(opts.yLabel, 0, 0); ctx.restore();
    }
    series.forEach(function (s) {
      ctx.strokeStyle = s.color || c.accent; ctx.lineWidth = s.width || 2;
      ctx.beginPath();
      s.points.forEach(function (p, i) {
        var X = px(p.x), Y = py(Math.max(yRange[0], Math.min(yRange[1], p.y)));
        if (i === 0) ctx.moveTo(X, Y); else ctx.lineTo(X, Y);
      });
      ctx.stroke();
      if (s.dashed) ctx.setLineDash([]);
    });
    return { px: px, py: py, padL: padL, padT: padT, plotW: plotW, plotH: plotH };
  }

  // Vertical bar / histogram chart (drawBars is horizontal only). data is either
  // [{x, y}] with x a bucket centre, or [{x0, x1, y}] with explicit edges.
  // Returns the same mapper bundle as drawLines so a caller can overlay a curve.
  function drawColumns(ctx, W, H, data, opts) {
    opts = opts || {};
    var c = colors();
    ctx.clearRect(0, 0, W, H);
    data = data || [];
    var padL = opts.padL != null ? opts.padL : 44, padR = opts.padR != null ? opts.padR : 16;
    var padT = opts.padT != null ? opts.padT : 12, padB = opts.padB != null ? opts.padB : 28;
    var plotW = W - padL - padR, plotH = H - padT - padB;
    var xs = [], ys = [0];
    data.forEach(function (d) {
      if (d.x0 != null) { xs.push(d.x0); xs.push(d.x1); } else { xs.push(d.x); }
      ys.push(d.y);
    });
    if (!xs.length) xs = [0, 1];
    var xRange = opts.xRange || [Math.min.apply(null, xs), Math.max.apply(null, xs)];
    if (xRange[0] === xRange[1]) xRange = [xRange[0] - 0.5, xRange[0] + 0.5];
    var yRange = opts.yRange || [opts.minY != null ? opts.minY : Math.min(0, Math.min.apply(null, ys)),
      opts.maxY != null ? opts.maxY : Math.max.apply(null, ys) || 1];
    if (yRange[0] === yRange[1]) yRange = [0, yRange[0] || 1];
    function px(x) { return padL + plotW * (x - xRange[0]) / (xRange[1] - xRange[0]); }
    function py(y) { return padT + plotH * (1 - (y - yRange[0]) / (yRange[1] - yRange[0])); }
    var baseY = py(0);
    var autoW = (xRange[1] - xRange[0]) / Math.max(1, data.length);
    data.forEach(function (d) {
      var x0, x1;
      if (d.x0 != null) { x0 = px(d.x0); x1 = px(d.x1); }
      else { var half = px(xRange[0] + autoW / 2) - px(xRange[0]); x0 = px(d.x) - half; x1 = px(d.x) + half; }
      var y1 = py(d.y);
      ctx.fillStyle = d.color || opts.color || c.accent;
      ctx.fillRect(x0, Math.min(baseY, y1), Math.max(1, x1 - x0), Math.max(1, Math.abs(baseY - y1)));
    });
    ctx.strokeStyle = c.divider; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(padL, baseY); ctx.lineTo(padL + plotW, baseY); ctx.stroke();
    if (opts.xLabel) { ctx.fillStyle = c.text; ctx.font = '11px ' + c.font; ctx.textAlign = 'center'; ctx.fillText(opts.xLabel, padL + plotW / 2, H - 4); }
    return { px: px, py: py, padL: padL, padT: padT, plotW: plotW, plotH: plotH };
  }

  // requestAnimationFrame-driven loop with a play/pause button.
  // opts: { onStep(dt), button: <el>, interval: ms-between-steps (default: every frame) }
  // Returns { start, stop, toggle, running }.
  function loop(opts) {
    opts = opts || {};
    var running = false;
    var rafId = null;
    var last = null;
    var acc = 0;
    var interval = opts.interval || 0;

    function frame(t) {
      if (!running) return;
      if (last == null) last = t;
      var dt = t - last;
      last = t;
      acc += dt;
      if (interval <= 0) {
        opts.onStep && opts.onStep(dt);
      } else {
        while (acc >= interval) {
          opts.onStep && opts.onStep(interval);
          acc -= interval;
        }
      }
      rafId = window.requestAnimationFrame(frame);
    }

    function start() {
      if (running) return;
      running = true;
      last = null;
      acc = 0;
      rafId = window.requestAnimationFrame(frame);
      if (opts.button) opts.button.textContent = opts.pauseLabel || 'Pause';
    }
    function stop() {
      running = false;
      if (rafId != null) window.cancelAnimationFrame(rafId);
      rafId = null;
      if (opts.button) opts.button.textContent = opts.playLabel || 'Play';
    }
    function toggle() { running ? stop() : start(); }

    if (opts.button) {
      opts.button.textContent = opts.playLabel || 'Play';
      opts.button.addEventListener('click', toggle);
    }

    return { start: start, stop: stop, toggle: toggle, running: function () { return running; } };
  }

  // Wire up a NodeList/array of <input type=range> elements (each with a data-val
  // sibling <span class="val"> to mirror into, optionally) so `update()` runs on
  // every input event, and the displayed value is kept current.
  function bindSliders(els, update) {
    Array.prototype.forEach.call(els, function (el) {
      var valEl = el.parentElement ? el.parentElement.querySelector('.val') : null;
      function sync() {
        if (valEl) valEl.textContent = el.value;
        update(el);
      }
      el.addEventListener('input', sync);
      sync();
    });
  }

  // "Nice" tick locations for a numeric axis: multiples of 1, 2 or 5 times a
  // power of ten, spaced so that roughly `target` ticks fall in [min, max].
  // The standard algorithm `drawLines` should always have had. Returns an array
  // of values (possibly empty when the range is degenerate or non-finite).
  function niceTicks(min, max, target) {
    target = Math.max(1, target || 6);
    if (!isFinite(min) || !isFinite(max) || max <= min) return [];
    var raw = (max - min) / target;
    if (!isFinite(raw) || raw <= 0) return [];
    var mag = Math.pow(10, Math.floor(Math.log10(raw)));
    var norm = raw / mag;
    var step = (norm < 1.5 ? 1 : (norm < 3 ? 2 : (norm < 7 ? 5 : 10))) * mag;
    var ticks = [];
    var v = Math.ceil(min / step) * step;
    for (var i = 0; i < 1000 && v <= max + step * 1e-9; i++) {
      ticks.push(Math.abs(v) < step * 1e-9 ? 0 : v);
      v += step;
    }
    return ticks;
  }

  // Arrow from (x0,y0) to (x1,y1) with a filled head and an optional label.
  // opts: {color, width=2, head=9, dashed, label, labelColor, labelOffset}.
  function drawArrow(ctx, x0, y0, x1, y1, opts) {
    opts = opts || {};
    var c = colors();
    var color = opts.color || c.accent;
    var dx = x1 - x0, dy = y1 - y0;
    var len = Math.hypot(dx, dy);
    if (len < 0.5) return;
    var head = Math.min(opts.head || 9, len * 0.6);
    var ux = dx / len, uy = dy / len;
    var bx = x1 - ux * head, by = y1 - uy * head;
    ctx.save();
    ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = opts.width || 2;
    ctx.lineCap = 'round';
    if (opts.dashed) ctx.setLineDash([6, 5]);
    ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(bx, by); ctx.stroke();
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(bx - uy * head * 0.45, by + ux * head * 0.45);
    ctx.lineTo(bx + uy * head * 0.45, by - ux * head * 0.45);
    ctx.closePath(); ctx.fill();
    if (opts.label) {
      var off = opts.labelOffset || 12;
      ctx.fillStyle = opts.labelColor || c.text;
      ctx.font = '12px ' + c.font;
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(opts.label, x1 + ux * off, y1 + uy * off);
      ctx.textAlign = 'start'; ctx.textBaseline = 'alphabetic';
    }
    ctx.restore();
  }

  // Pointer-drag manager over Guide.hitTest. getHandles() returns the current
  // handles in *logical canvas coordinates*: [{x, y, r, id}]. onDrag(id, x, y, ev)
  // fires on pointermove; the canvas cursor is set to grab/grabbing. Returns
  // {destroy()}. Pages that need a plane's world coordinates convert inside
  // onDrag via plane.wx/wy.
  function dragHandles(canvas, getHandles, onDrag, opts) {
    opts = opts || {};
    var activeId = null;

    function findHandle(ev) {
      var p = hitTest(canvas, ev);
      var hs = getHandles() || [];
      var best = null, bestD = Infinity;
      for (var i = 0; i < hs.length; i++) {
        var h = hs[i];
        var d = Math.hypot(p.x - h.x, p.y - h.y);
        var r = h.r == null ? 12 : h.r;
        if (d <= r && d < bestD) { best = h; bestD = d; }
      }
      return best;
    }

    function down(ev) {
      var h = findHandle(ev);
      if (!h) return;
      activeId = h.id;
      canvas.style.cursor = 'grabbing';
      if (ev.preventDefault) ev.preventDefault();
      window.addEventListener('pointermove', move);
      window.addEventListener('pointerup', up);
      if (opts.onStart) opts.onStart(h.id, ev);
    }
    function move(ev) {
      if (activeId == null) return;
      var p = hitTest(canvas, ev);
      if (onDrag) onDrag(activeId, p.x, p.y, ev);
      if (ev.preventDefault) ev.preventDefault();
    }
    function up(ev) {
      if (activeId == null) return;
      var id = activeId; activeId = null;
      canvas.style.cursor = opts.cursor || 'grab';
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      if (opts.onEnd) opts.onEnd(id, ev);
    }

    canvas.addEventListener('pointerdown', down);
    canvas.style.touchAction = 'none';
    canvas.style.cursor = opts.cursor || 'grab';

    return {
      destroy: function () {
        canvas.removeEventListener('pointerdown', down);
        window.removeEventListener('pointermove', move);
        window.removeEventListener('pointerup', up);
      }
    };
  }

  global.Guide = {
    css: css, colors: colors, setupCanvas: setupCanvas, hitTest: hitTest,
    drawBars: drawBars, drawLines: drawLines, drawColumns: drawColumns, drawStacked: drawStacked, drawHeatmap: drawHeatmap,
    drawArrow: drawArrow, dragHandles: dragHandles, niceTicks: niceTicks,
    softmax: softmax, seededRandom: seededRandom, gaussianFrom: gaussianFrom,
    fmtBytes: fmtBytes, fmtNum: fmtNum, fmtPct: fmtPct, fmtMs: fmtMs,
    loop: loop, bindSliders: bindSliders
  };
})(window);
