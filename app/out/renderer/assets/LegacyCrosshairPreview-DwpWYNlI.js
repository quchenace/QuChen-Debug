import { t as defineComponent, a1 as onMounted, aD as watch, l as createElementBlock, V as normalizeStyle, a9 as ref, g as computed, a5 as openBlock, R as nextTick, _ as _export_sfc } from "./main-DAqTdO6U.js";
const __vite_glob_0_0 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAFLUlEQVR4Aeyd6ZLcIAyEx7nz/o+bY8KXiiosa3yMAQPqlBWEEAJ199g/98ND/1wjIAG4pv/xkAAkAOcIOG9fbwAJwDkCztvXG0ACcI6A0/atbb0BDAmnowTglHhrWwIwJJyOEoBT4q1tCcCQcDpKAE6Jt7YlAEPC6SgBOCM+bVcCSBFxNpcAnBGetisBpIg4m0sAzghP25UAUkSczSUAZ4Sn7UoAKSLO5hKAE8JzbUoAOWScxCUAJ0Tn2pQAcsg4iUsATojOtSkB5JBxEpcAnBCda1MCyCHjJC4BTE70XnsSwB5Ck69LAJMTvNeeBLCH0OTrEsDkBO+1JwHsITT5ugQwOcF77UkAewhNvi4BTErw0bYkgKNITZonAUxK7NG2JICjSE2aJwFMSuzRtiSAo0hNmicBTErs0bYkgKNITZonAUxG7Nl2JICziE2WLwFMRujZdiSAs4hNli8BTEbo2XYkgLOITZYvAUxG6Nl2JICziE2WLwFMQuirbUgAryI3yb6eBfAMGNeyUHr1qXUedVcPvDvYswDuxsbF+SMIYAlMlLJQ6tBT6jzqHDrwrqQRBHAXNi7OvUsAfBP3zAiI8yx2dYxrxv7VurZ/rWYcy/m2v9l4lwCaNaiDthG4WwB8I3NmN2fd/KLj8/l8YEWLvi0W3x0/Z293nZhdTb1bAFfvr/0XEbhbALlvIXFrLfYtVmRcluWxLEuRWpki8d3xc5bZXj98twDqd6gTNhG4SwD87PbMLh7nWezqGNeM/at1bf9azTiW821/s/EuATRrUAdtIzCCAHLfzVfi22j8X32ldm7P/6odeiMIoEPY5rlSzwLIfSdLxHMMlqidq5E786V4qU09C6BUj6qzgYAEsAGOhyUJwAPLGz1KABvgeFiSADywvNGjBLABjoclCcADyxs9SgAb4PS4VPpOEkBpRAerJwEMRljp60oApREdrJ4EMBhhpa8rAZRGdLB6EsBghJW+rgRQGtHB6kkAgxBW65oSQC1kB6krAQxCVK1rSgC1kB2krgQwCFG1rikB1EJ2kLoSwCBE1bqmBFAL2UHqSgCdE1X7ehJAbYQ7ry8BdE5Q7etJALUR7ry+BNA5QbWvJwHURrjz+hJA5wTVvp4EUBvhzutLAJ0S1OpaEkArpDs9RwLolJhW15IAWiHd6TkSQKfEtLqWBNAK6U7PkQA6JabVtSSAVkh3eo4E0Bkxra8jAbRGvLPzJIDOCGl9HQmgNeKdnScBdEZI6+tIAK0R7+w8CaAzQlpfRwJojXhn55USwOfQ17dg3/8Z/tfgl6ofSs393NXdCARxRwSFfboLqFnPBVxA/Rga5C9d2JwYPsaajcQxi7HH/FDi78PfzsFhjX0YczPi7KEOhh/n2DoxM9vLnHyba7yIAIBCAhb7vNJ5hX8J9c3n9Y5PLiNzDB/SQuq7h1xqUIv6lkDcjP3k2Jxci/GrZ832UYO83HmWp/EgAgBKKoDyy2JuPvGckUe+/dpzeRY/UhPSMdtjowg3JCqMEGllzYcsiDX7GRJ+B2MkFtzHr/CfzVnDQujdQ54FqYvZnJF6GD7nr63HNfB/hGTbE1w9VxAA9JQ8wMWoywjoGL7F8G0fI3PWYiOWrkEwluYxT+PEqIHZGj41WZMVQGBNAJCNUZ51vsG8mnkVE8MgghEjzucAPzZIY42ROD61MIsRN8sRy1kYeVZjbT/rspMIQDDAG8Bsh3wMHzOwIZl8YukeYmtme23kHHwszWeNumk8na/tTXOGmd990T8AAAD//2VdFJgAAAAGSURBVAMAD6PEYNcb6xMAAAAASUVORK5CYII=";
const __vite_glob_0_1 = "" + new URL("MMW2.0-BT2heeQw.png", import.meta.url).href;
const __vite_glob_0_2 = "" + new URL("SSCJ-H8CkzQZU.png", import.meta.url).href;
const __vite_glob_0_3 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAEuUlEQVR4Aeyd27IbKwxEnXvy/5+bKyu1VeVie2rAA1hIfco6MCA0qHvZyVs+3vRfagUEQGr7bzcBIACSK5C8ff0CCIDkCiRvX78AAiC5Aknbt7b1C2BKJB0FQFLjrW0BYEokHQVAUuOtbQFgSiQdBUBS461tAWBKJB0FQDLj63YFQK1IsmcBkMzwul0BUCuS7FkAJDO8blcA1IokexYAyQyv2xUAtSLJngVAEsOP2hQAR8okWRcASYw+alMAHCmTZF0AJDH6qE0BcKRMknUBkMToozYFwJEySdYFQHCjz9oTAGcKBd8XAMENPmtPAJwpFHxfAAQ3+Kw9AXCmUPB9ARDc4LP2BMCZQsH3BUBQg1vbEgCtSgXNEwBBjW1tSwC0KhU0TwAENba1LQHQqlTQPAEQ1NjWtgRAq1JB8wRAMGN72xEAvYoFyxcAwQztbUcA9CoWLF8ABDO0tx0B0KtYsHwBEMzQ3nYEQK9iwfIFQBBDn21DADyrXJBzmQD4WzzriZIe/5MFAIzvdfOZM73veHl+FgBeLrTXC6QC4OwrzT7h1awZ90oFwAwBd6+ZCoAPJ26xT5ykhdpOBUAo596auToIgKsKbn5eAGxu4NXrpwLg7G/47BNXRd3pfCoAMAaDj4L9bJEKAP6G3xKZIEgFQCZjW3vNAgBf/FZNLO+ZM3Z2mzELABiCoT3BGbcx6mKZABilWag6AiCUnf3NCIB+zUKdEACh7OxvRgD0axbqhAAIZWd/MwKgX7NQJwTAZnaOvq4AGK3oZvUEwGaGjb6uABit6Gb1BMBmho2+rgAYrehm9QTAZoaNvq4AGK3oZvUEwCaGzbqmAJil7CZ1BcAmRs26pgCYpewmdQXAJkbNuqYAmKXsJnUFwCZGzbqmAJil7CZ1BYBzo2ZfTwDMVth5fQHg3KDZ1xMAsxV2Xl8AODdo9vUEwGyFndcXAM4Nmn09ATBbYef1BYBTg1ZdSwCsUtrpewSAU2NWXUsArFLa6XsEgFNjVl1LAKxS2ul7BIBTY1ZdSwCsUtrpewSAM2NWX0cArFbc2fsEgDNDVl9HAKxW3Nn7BIAzQ1ZfRwCsVtzZ+wSAM0NWX0cArFbc2ftGAfCl9PW9xI+3YP6tzEfVL6Vif17V3Q4GcUeAIj6/Sqio70VcRP1UGuRf07Bn1pgT7NnIOmFrnLF5KfH/wz/KxYQ9zhE8W7DOGeoQzO9zbJ81CzvLM/n2rPGiAgiKCcT9nJ90fsK/lvo25+edObmMPBPMMa2kvvuQSw1qUd8SWLfgPDn2TK6t8a1nz85Rg7yj91mexkYFEJRUBOWbxbPNWT8K8si3b/tRnq231MR0ws7YKMNNiQkjRlpZm2MWxlr8Kgl/SjCyVqa33+V/9sweUZbefcizReoS9sxIPYI573+0f1+D+c+SbGfKVJ8rCiB6bR7iEtRlRHSCua0xt3OMPLN3H6zVexhM1Hk81+usUYOwPebUZE8xQIFHAGA2QXn2+TOYn2Z+ilkjMIKRYJ0/DpjfB6axx8g6c2oRtsa6xZGxvIsgz2o8Os++olMBDEZ4E5jjmE8wJ0xsTCaftfoMa4/CztrIe5gTdT571K3X6+dHZ+ucbZ5ffdF/AAAA///yr6T4AAAABklEQVQDAKJOV2CTTLDhAAAAAElFTkSuQmCC";
const __vite_glob_0_4 = "data:image/png;base64,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";
const __vite_glob_0_5 = "data:image/png;base64,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";
const __vite_glob_0_6 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAACXBIWXMAAA7EAAAOxAGVKw4bAAADzUlEQVR4nO3Yz2tUVxjG8ec9905mokYiMRmzsErVwdIg2KagErooahZdaBYideVf4MqtCF0HhHZR+le4KC7EZFVIoC0USmn9HTXFxI4tSnBwJjPndZEJwUjVzcyU8zwfmMXccy+cO/fLnXOvuTuEV+j1BKS3FAA5BUBOAZBTAOQUADkFQE4BkFMA5BQAOQVATgGQUwDkFAA5BUBOAZBTAOQUADkFQE4BkFMA5BQAOQVATgGQUwDkFAA5BUBOAZBTAOQUADkFQE4BkFMA5BQAOQVATgGQUwDkFAA5BUBOAZBTAOQUADkFQE4BkFMA5BQAOQVATgGQUwDkFAA5BUBOAZBTAOQUADkFQE4BkFMA5PJeT6CTvvr6Ut/sibPfe8jyz3784fKdsSP3gzvc7L8PckfMAnb89eD0/Y/Hz+xcXvz11qmT092bdXclHcDLUv9gtTJ2HkXg5zwLg9XlWwAi3n7niwAKf06cnHgxWv4iFApJ3yWTDsDcY15/iWZWwtNK5dzTjyrvd6ADaAFoAPlqo9bJOfZa0gG8Jm763ty0Lcfr94XN+ycq7QDWL6IDW/6uorjyDHAHQkBtaAT1bdsBAyw6+p9UUVx5DrjDLaA2XEZj60AvZ98VaQcAwEOANSPG5meuH3h8bzqLXl/N84FfDh27evfTiT4vZgiNVRyau3F139LCt5l7vZ7lgz8d/vzawifHEENI+jdK+uRggJvBWi3sfnT7GxSyGRhgBgwtPbp2130KBlirhT0Pb05bqTgHBywAQ08Wry/EONnrU+i0pANwIJg7WlmOxT2VCwce32sAqAMY+Gf0gy9hBjjgWYaHew9e3L+8cAVry7/Bf3ftnkRI+gEAQOIBAIDFCBQDfj9yfPLOyvikucPbawDPMqAFxLyA346emLq98nwK7fEXw2XADCHGZq/PoZOSDsCsvQw0oFYeRm10eGNw/SnA1/4mauUR1EZHNsZb7U/ikg4gWsibpdID9GPvGxcze8fBOQAHVvtK2zs0vf+FpAMAsHxwfva7ZqFQMm9v8Y1BA6IDAetvht2je/ttQHvbjurSHzj8Ydcm3G3pr3Lkrczd372XJEt3AHIKgJwCIKcAyCkAcgqAnAIgpwDIKQByCoCcAiCnAMgpAHIKgJwCIKcAyCkAcgqAnAIgpwDIKQByCoCcAiCnAMgpAHIKgJwCIKcAyCkAcgqAnAIgpwDIKQByCoCcAiCnAMgpAHIKgJwCIKcAyCkAcgqAnAIgpwDIKQByCoCcAiCnAMgpAHIKgJwCIKcAyCkAcgqAnAIgpwDIvQK0HNZ+AFrzKgAAAABJRU5ErkJggg==";
const __vite_glob_0_7 = "data:image/png;base64,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";
const __vite_glob_0_8 = "data:image/png;base64,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";
const __vite_glob_0_9 = "data:image/png;base64,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";
function q(s, e, r, h, W) {
  const M = Math.max(1, Number(W) || 1);
  s.clearRect(0, 0, Math.ceil(r * M), Math.ceil(h * M)), E(s, e, r, h, M), s.save(), s.scale(M, M), s.translate(r / 2 + (Number(e.offsetX) || 0), h / 2 + (Number(e.offsetY) || 0)), e.style === "classic" && s.rotate((Number(e.rotation) || 0) * Math.PI / 180), e.style === "classic" ? S(s, e) : e.style === "circle" ? N(s, e) : e.style === "dot" && g(s, e, Number(e.dotSize) || 0), (e.style === "classic" || e.style === "circle") && e.dotEnabled && g(s, e, Number(e.dotSize) || 0), s.restore();
  function E(t, i, o, n, l) {
    if (!i.edgeTop && !i.edgeBottom && !i.edgeLeft && !i.edgeRight) return;
    const d = Math.max(0, Number(i.edgeSize) || 0);
    if (d <= 0) return;
    const a = Math.max(0, Math.min(1, Number(i.edgeOpacity) || 0));
    if (a <= 0) return;
    const u = i.edgeColor || i.color, c = d / 2, p = o / 2, P = n / 2;
    t.save(), t.scale(l, l), t.globalAlpha = a, t.fillStyle = u, t.strokeStyle = u, i.edgeTop && m(t, i, p, c, d, "top"), i.edgeBottom && m(t, i, p, n - c, d, "bottom"), i.edgeLeft && m(t, i, c, P, d, "left"), i.edgeRight && m(t, i, o - c, P, d, "right"), t.restore();
  }
  function m(t, i, o, n, l, d) {
    const a = l / 2, u = Math.max(1, Number(i.lineWidth) || 1), c = String(i.edgeShape || "line");
    if (t.save(), t.translate(o, n), c === "line") d === "top" || d === "bottom" ? t.fillRect(-u / 2, -a, u, l) : t.fillRect(-a, -u / 2, l, u);
    else if (c === "square") t.fillRect(-a, -a, l, l);
    else if (c === "circle") t.beginPath(), t.arc(0, 0, a, 0, Math.PI * 2), t.fill();
    else if (c === "ring") {
      const p = Math.max(1, Math.min(u, a));
      t.lineWidth = p, t.beginPath(), t.arc(0, 0, Math.max(p / 2, a - p / 2), 0, Math.PI * 2), t.stroke();
    } else if (c === "diamond") t.beginPath(), t.moveTo(0, -a), t.lineTo(a, 0), t.lineTo(0, a), t.lineTo(-a, 0), t.closePath(), t.fill();
    else if (c === "triangle") {
      const p = d === "top" ? [[-a, -a], [a, -a], [0, a]] : d === "bottom" ? [[-a, a], [a, a], [0, -a]] : d === "left" ? [[-a, -a], [-a, a], [a, 0]] : [[a, -a], [a, a], [-a, 0]];
      t.beginPath(), t.moveTo(p[0][0], p[0][1]), t.lineTo(p[1][0], p[1][1]), t.lineTo(p[2][0], p[2][1]), t.closePath(), t.fill();
    } else if (c === "cross") t.fillRect(-u / 2, -a, u, l), t.fillRect(-a, -u / 2, l, u);
    else if (c === "x") t.lineWidth = u, t.beginPath(), t.moveTo(-a, -a), t.lineTo(a, a), t.moveTo(a, -a), t.lineTo(-a, a), t.stroke();
    else if (c === "star") {
      const P = a * 0.45;
      t.beginPath();
      for (let v = 0; v < 10; v += 1) {
        const T = v % 2 === 0 ? a : P, k = Math.PI / 5 * v - Math.PI / 2, z = Math.cos(k) * T, G = Math.sin(k) * T;
        v === 0 ? t.moveTo(z, G) : t.lineTo(z, G);
      }
      t.closePath(), t.fill();
    } else d === "top" || d === "bottom" ? t.fillRect(-u / 2, -a, u, l) : t.fillRect(-a, -u / 2, l, u);
    t.restore();
  }
  function S(t, i) {
    const o = Math.max(0, Number(i.lineLength) || 0), n = Math.max(0, Number(i.lineGap) || 0), l = Math.max(1, Number(i.lineWidth) || 1);
    if (!(o <= 0) && (i.outlineEnabled && i.outlineWidth > 0 && y(t, i, o, n, l + (Number(i.outlineWidth) || 0) * 2, i.outlineColor, i.opacity), y(t, i, o, n, l, i.color, i.opacity), i.outerEnabled && i.outerLength > 0)) {
      const d = Math.max(0, Number(i.outerLength) || 0), a = Math.max(0, Number(i.outerGap) || 0), u = Math.max(1, Number(i.outerWidth) || 1);
      i.outlineEnabled && i.outlineWidth > 0 && y(t, i, d, a, u + (Number(i.outlineWidth) || 0) * 2, i.outlineColor, i.opacity), y(t, i, d, a, u, i.color, i.opacity);
    }
  }
  function y(t, i, o, n, l, d, a) {
    t.save(), t.globalAlpha = Math.max(0, Math.min(1, Number(a) || 0)), t.fillStyle = d;
    const u = l / 2, c = Math.max(0, Math.min(u, l / 2));
    i.tStyle || R(t, -u, -n - o, l, o, c), R(t, -u, n, l, o, c), R(t, -n - o, -u, o, l, c), R(t, n, -u, o, l, c), t.restore();
  }
  function N(t, i) {
    const o = Math.max(0, Number(i.circleRadius) || 0), n = Math.max(1, Number(i.circleWidth) || 1);
    o <= 0 || (i.outlineEnabled && i.outlineWidth > 0 && f(t, o, n + (Number(i.outlineWidth) || 0) * 2, i.outlineColor, i.opacity), f(t, o, n, i.color, i.opacity));
  }
  function f(t, i, o, n, l) {
    t.save(), t.globalAlpha = Math.max(0, Math.min(1, Number(l) || 0)), t.strokeStyle = n, t.lineWidth = o, t.beginPath(), t.arc(0, 0, i, 0, Math.PI * 2), t.stroke(), t.restore();
  }
  function g(t, i, o) {
    const n = Math.max(0, o);
    if (n <= 0) return;
    const l = (Number(i.opacity) || 0) * (Number(i.dotOpacity) || 0);
    i.outlineEnabled && i.outlineWidth > 0 && C(t, n + (Number(i.outlineWidth) || 0) * 2, i.outlineColor, l), C(t, n, i.color, l);
  }
  function C(t, i, o, n) {
    t.save(), t.globalAlpha = Math.max(0, Math.min(1, Number(n) || 0)), t.fillStyle = o, t.beginPath(), t.arc(0, 0, i / 2, 0, Math.PI * 2), t.fill(), t.restore();
  }
  function R(t, i, o, n, l, d) {
    if (typeof t.roundRect == "function") {
      t.beginPath(), t.roundRect(i, o, n, l, d), t.fill();
      return;
    }
    t.fillRect(i, o, n, l);
  }
}
const O = "crosshair-preset-v1", K = /* @__PURE__ */ new Set(["classic", "cross", "dot", "circle", "circle-dot", "thin-cross", "img:Glasses", "img:Smiley", "img:T字准星", "img:aragornN", "img:ropz", "img:s1mple", "img:MMW2.0", "img:donk", "img:cat", "img:SSCJ"]);
function b(s, e, r, h) {
  const W = Number(s);
  return Number.isFinite(W) ? Math.min(h, Math.max(r, W)) : e;
}
function Q(s) {
  const e = K.has(s) ? s : "classic";
  return e === "cross" || e === "thin-cross" ? "classic" : e === "circle-dot" ? "circle" : e;
}
function I(s, e) {
  const r = String(s || "").trim();
  if (/^#[0-9a-fA-F]{6}$/.test(r)) return r.toLowerCase();
  if (/^#[0-9a-fA-F]{3}$/.test(r)) {
    const [, h, W, M] = r;
    return `#${h}${h}${W}${W}${M}${M}`.toLowerCase();
  }
  return e;
}
function U() {
  return { schema: O, style: "cross", size: 36, color: "#35d0ff", opacity: 0.9, dotEnabled: false, dotSize: 3, dotOpacity: 0.9, lineLength: 6, lineWidth: 2, lineGap: 3, tStyle: false, outerEnabled: false, outerLength: 0, outerWidth: 2, outerGap: 8, outlineEnabled: true, outlineWidth: 1, outlineColor: "#000000", circleRadius: 12, circleWidth: 2, rotation: 0 };
}
function A(s) {
  const e = s && typeof s == "object" ? s : {}, r = U(), h = String(e.style || "").trim(), W = Q(e.style), M = Math.round(b(e.size, r.size, 8, 160)), E = Math.round(b(e.lineWidth, r.lineWidth, 1, 12)), m = Math.round(b(e.opacity, r.opacity, 0.1, 1) * 100) / 100, S = Math.round(b(e.gap, r.lineGap, 0, 50)), y = !!e.centerDot, N = Math.round(b(e.centerDotSize, r.dotSize, 1, 20)), f = !!e.outline, g = Math.round(b(e.outlineThickness, r.outlineWidth, 0.5, 6) * 10) / 10;
  return { schema: O, style: W, size: M, color: I(e.color, r.color), opacity: m, dotEnabled: "dotEnabled" in e ? !!e.dotEnabled : h === "circle-dot" || y, dotSize: Math.round(b(e.dotSize, N, 0, 20)), dotOpacity: Math.round(b(e.dotOpacity, m, 0.1, 1) * 100) / 100, lineLength: Math.round(b(e.lineLength, h === "cross" || h === "thin-cross" ? Math.round(M / 2) : r.lineLength, 0, 60)), lineWidth: E, lineGap: Math.round(b(e.lineGap, h === "cross" || h === "thin-cross" ? S : r.lineGap, 0, 40)), tStyle: !!e.tStyle, outerEnabled: !!e.outerEnabled, outerLength: Math.round(b(e.outerLength, r.outerLength, 0, 40)), outerWidth: Math.round(b(e.outerWidth, r.outerWidth, 1, 12)), outerGap: Math.round(b(e.outerGap, r.outerGap, 0, 60)), outlineEnabled: "outlineEnabled" in e ? !!e.outlineEnabled : f, outlineWidth: Math.round(b(e.outlineWidth, g, 0, 6) * 10) / 10, outlineColor: I(e.outlineColor, r.outlineColor), circleRadius: Math.round(b(e.circleRadius, h === "circle-dot" ? Math.round(M / 2) : r.circleRadius, 4, 80)), circleWidth: Math.round(b(e.circleWidth, h === "circle-dot" ? E : r.circleWidth, 1, 12)), rotation: Math.round(b(e.rotation, r.rotation, 0, 360)) };
}
const _hoisted_1 = ["src"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "LegacyCrosshairPreview",
  props: {
    settings: {}
  },
  setup(__props) {
    const props = __props;
    const canvas = ref();
    const images = /* @__PURE__ */ Object.assign({ "../assets/legacy-crosshairs/crosshairs/Glasses.png": __vite_glob_0_0, "../assets/legacy-crosshairs/crosshairs/MMW2.0.png": __vite_glob_0_1, "../assets/legacy-crosshairs/crosshairs/SSCJ.png": __vite_glob_0_2, "../assets/legacy-crosshairs/crosshairs/Smiley.png": __vite_glob_0_3, "../assets/legacy-crosshairs/crosshairs/T字准星.png": __vite_glob_0_4, "../assets/legacy-crosshairs/crosshairs/aragornN.png": __vite_glob_0_5, "../assets/legacy-crosshairs/crosshairs/cat.png": __vite_glob_0_6, "../assets/legacy-crosshairs/crosshairs/donk.png": __vite_glob_0_7, "../assets/legacy-crosshairs/crosshairs/ropz.png": __vite_glob_0_8, "../assets/legacy-crosshairs/crosshairs/s1mple.png": __vite_glob_0_9 });
    const imageUrl = computed(() => props.settings.style?.startsWith("img:") ? images[`../assets/legacy-crosshairs/crosshairs/${props.settings.style.slice(4)}.png`] : void 0);
    function draw() {
      const context = canvas.value?.getContext("2d");
      if (!context || !canvas.value) return;
      const ratio = Math.max(1, window.devicePixelRatio || 1);
      canvas.value.width = Math.ceil(240 * ratio);
      canvas.value.height = Math.ceil(240 * ratio);
      q(context, props.settings, 240, 240, ratio);
    }
    onMounted(draw);
    watch(() => props.settings, () => {
      void nextTick(draw);
    }, { deep: true });
    return (_ctx, _cache) => {
      return imageUrl.value ? (openBlock(), createElementBlock("img", {
        key: 0,
        src: imageUrl.value,
        alt: "",
        class: "legacy-image",
        style: normalizeStyle({ width: `${__props.settings.size}px`, height: `${__props.settings.size}px`, opacity: __props.settings.opacity })
      }, null, 12, _hoisted_1)) : (openBlock(), createElementBlock("canvas", {
        key: 1,
        ref_key: "canvas",
        ref: canvas,
        width: "240",
        height: "240",
        class: "legacy-canvas",
        "aria-hidden": "true"
      }, null, 512));
    };
  }
});
const LegacyCrosshairPreview = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f0e7e02d"]]);
export {
  A,
  LegacyCrosshairPreview as L
};
