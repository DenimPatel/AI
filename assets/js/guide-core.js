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
      accent: css('--color-accent') || '#0088b0',
      accent2: css('--color-accent-2') || '#d6006c',
      accent400: css('--color-accent-400') || '#62c5ee',
      accent500: css('--color-accent-500') || '#38a6cf',
      accent700: css('--color-accent-700') || '#006786',
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
    return { ctx: ctx, resize: resize };
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

  global.Guide = {
    css: css, colors: colors, setupCanvas: setupCanvas,
    drawBars: drawBars, drawLines: drawLines,
    loop: loop, bindSliders: bindSliders
  };
})(window);
