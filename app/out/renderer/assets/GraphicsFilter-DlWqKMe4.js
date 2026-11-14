import { t as defineComponent, aD as watch, a1 as onMounted, a3 as onUnmounted, l as createElementBlock, i as createBaseVNode, F as Fragment, ab as renderList, ak as toDisplayString, aG as withDirectives, aA as vModelText, aI as withModifiers, k as createCommentVNode, q as createTextVNode, S as normalizeClass, V as normalizeStyle, a9 as ref, a7 as reactive, g as computed, aj as shallowRef, a5 as openBlock, _ as _export_sfc } from "./main-DAqTdO6U.js";
import { c as computeLUT } from "./lutMath-Du8bBTzw.js";
const _hoisted_1 = { class: "flex h-full w-full overflow-hidden bg-[#05080f] text-gray-200 font-sans" };
const _hoisted_2 = { class: "w-[420px] flex-shrink-0 flex flex-col h-full bg-[#0A0F1C] border-r border-white/[0.04]" };
const _hoisted_3 = { class: "flex-1 overflow-y-auto px-5 pb-4 custom-scrollbar" };
const _hoisted_4 = { class: "mb-4 mt-4" };
const _hoisted_5 = { class: "flex items-center justify-between mb-3" };
const _hoisted_6 = { class: "flex items-center gap-2" };
const _hoisted_7 = ["disabled"];
const _hoisted_8 = ["disabled"];
const _hoisted_9 = { class: "grid grid-cols-2 gap-1.5" };
const _hoisted_10 = ["onClick", "disabled"];
const _hoisted_11 = { class: "truncate flex-1 text-left" };
const _hoisted_12 = ["onClick"];
const _hoisted_13 = {
  key: 1,
  class: "ml-1 text-[9px] text-teal-400"
};
const _hoisted_14 = { class: "mb-4" };
const _hoisted_15 = { class: "flex items-center justify-between mb-2" };
const _hoisted_16 = { class: "text-[11px] font-mono text-teal-400/80" };
const _hoisted_17 = { class: "mb-4" };
const _hoisted_18 = { class: "slider-group" };
const _hoisted_19 = { class: "slider-row" };
const _hoisted_20 = ["disabled", "title"];
const _hoisted_21 = { class: "slider-val" };
const _hoisted_22 = { class: "slider-row" };
const _hoisted_23 = ["disabled", "title"];
const _hoisted_24 = { class: "slider-val" };
const _hoisted_25 = { class: "slider-row" };
const _hoisted_26 = ["disabled", "title"];
const _hoisted_27 = { class: "slider-val" };
const _hoisted_28 = { class: "mb-4" };
const _hoisted_29 = { class: "slider-group" };
const _hoisted_30 = { class: "slider-row" };
const _hoisted_31 = ["disabled", "title"];
const _hoisted_32 = { class: "slider-val" };
const _hoisted_33 = { class: "slider-row" };
const _hoisted_34 = ["disabled", "title"];
const _hoisted_35 = { class: "slider-val" };
const _hoisted_36 = { class: "slider-row" };
const _hoisted_37 = ["disabled", "title"];
const _hoisted_38 = { class: "slider-val" };
const _hoisted_39 = { class: "mb-4" };
const _hoisted_40 = { class: "flex items-center justify-between mb-2" };
const _hoisted_41 = { class: "text-[11px] font-mono text-teal-400/80" };
const _hoisted_42 = { class: "mb-4" };
const _hoisted_43 = { class: "relative bg-black/40 rounded-lg border border-white/[0.05] p-3" };
const _hoisted_44 = ["y1", "y2"];
const _hoisted_45 = ["x1", "x2"];
const _hoisted_46 = ["points"];
const _hoisted_47 = ["cx", "cy", "stroke", "stroke-width"];
const _hoisted_48 = { class: "flex-shrink-0 px-5 py-3 bg-[#0A0F1C]/90 backdrop-blur-xl border-t border-white/[0.04] space-y-2" };
const _hoisted_49 = { class: "flex gap-2" };
const _hoisted_50 = ["disabled"];
const _hoisted_51 = {
  key: 0,
  class: "w-3 h-3 border-2 border-teal-400/15 border-t-teal-400 rounded-full animate-spin inline-block mr-1.5 align-middle"
};
const _hoisted_52 = ["disabled"];
const _hoisted_53 = { class: "flex gap-2" };
const _hoisted_54 = ["disabled"];
const _hoisted_55 = ["disabled"];
const _hoisted_56 = { class: "flex-1 relative overflow-hidden bg-black select-none" };
const _hoisted_57 = { class: "absolute inset-0" };
const _hoisted_58 = ["src"];
const _hoisted_59 = ["src"];
const _hoisted_60 = {
  style: { "position": "absolute", "width": "0", "height": "0", "overflow": "hidden" },
  "aria-hidden": "true"
};
const _hoisted_61 = { id: "gf-lut-dead" };
const _hoisted_62 = ["tableValues"];
const _hoisted_63 = ["tableValues"];
const _hoisted_64 = ["tableValues"];
const _hoisted_65 = { class: "absolute top-5 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-auto" };
const _hoisted_66 = { class: "flex items-center gap-0.5 px-1 py-0.5 rounded-full bg-black/50 backdrop-blur-xl border border-white/5" };
const _hoisted_67 = ["onClick"];
const _hoisted_68 = { class: "flex items-center gap-0.5 px-1 py-0.5 rounded-full bg-black/40 backdrop-blur-xl border border-white/3" };
const _hoisted_69 = ["onClick"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "GraphicsFilter",
  setup(__props) {
    const maps = ["航天基地"];
    const views = [{ id: "indoor", label: "室内" }, { id: "outdoor", label: "室外" }];
    const selectedMap = ref("航天基地");
    const selectedView = ref("indoor");
    const customImage = ref("");
    const displayImage = ref("");
    async function pickCustomImage() {
      try {
        const r = await window.sysApi?.readImageAsDataUrl?.();
        if (r?.success && r.dataUrl) {
          customImage.value = r.path || "custom";
          displayImage.value = r.dataUrl;
        }
      } catch {
      }
    }
    async function loadDisplayImage() {
      try {
        const r = await window.sysApi?.getScreenImage?.(selectedMap.value, selectedView.value);
        if (r?.success && r.dataUrl) displayImage.value = r.dataUrl;
      } catch (e) {
        console.error("[preview]", e);
      }
    }
    watch([selectedMap, selectedView], () => {
      if (!customImage.value) loadDisplayImage();
    });
    const split = ref(50);
    const d = reactive({ saturation: 50, temp: 6500 });
    const busy = ref(false);
    const resultMsg = ref("");
    const resultOk = ref(true);
    watch(() => d.saturation, () => updateLutPreview());
    watch(() => d.temp, () => updateLutPreview());
    const p = reactive({ brightness: 50, contrast: 50, gamma: 100, redGain: 50, greenGain: 50, blueGain: 50 });
    let paramTimer = null;
    function onParamInput() {
      if (paramTimer) clearTimeout(paramTimer);
      paramTimer = setTimeout(updateLutPreview, 30);
    }
    const curvePoints = reactive([{ x: 0, y: 0 }, { x: 100, y: 100 }]);
    const curvePolyStr = computed(() => curvePoints.map((pt) => `${pt.x},${100 - pt.y}`).join(" "));
    const dragIdx = ref(null);
    const curveSvg = ref(null);
    let activePointerId = null;
    function svgPoint(e) {
      const svg = curveSvg.value;
      if (!svg) return { x: 0, y: 0 };
      const r = svg.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width * 100;
      const y = (1 - (e.clientY - r.top) / r.height) * 100;
      return { x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) };
    }
    function hitRadius() {
      const svg = curveSvg.value;
      if (!svg) return 4;
      const r = svg.getBoundingClientRect();
      const sx = 100 / r.width, sy = 100 / r.height;
      return Math.max(sx, sy) * 8;
    }
    function onCurveDown(e) {
      const svg = curveSvg.value;
      if (!svg) return;
      const pt = svgPoint(e);
      const thr = hitRadius();
      let minD = Infinity, minI = -1;
      curvePoints.forEach((cp, i) => {
        const dd = Math.hypot(cp.x - pt.x, cp.y - pt.y);
        if (dd < minD) {
          minD = dd;
          minI = i;
        }
      });
      if (minI >= 0 && minD <= thr) {
        dragIdx.value = minI;
      } else {
        let nx = Math.round(pt.x);
        const taken = new Set(curvePoints.map((cp) => cp.x));
        while (taken.has(nx) && nx < 100) nx++;
        while (taken.has(nx) && nx > 0) nx--;
        if (taken.has(nx)) return;
        const np = { x: nx, y: Math.round(pt.y) };
        curvePoints.push(np);
        curvePoints.sort((a, b) => a.x - b.x);
        dragIdx.value = curvePoints.indexOf(np);
      }
      try {
        svg.setPointerCapture(e.pointerId);
        activePointerId = e.pointerId;
      } catch {
      }
      updateLutPreview();
    }
    function onCurveMove(e) {
      if (dragIdx.value === null) return;
      const pt = svgPoint(e);
      const i = dragIdx.value;
      if (i === 0) {
        curvePoints[0] = { x: 0, y: Math.round(Math.max(0, Math.min(100, pt.y))) };
      } else if (i === curvePoints.length - 1) {
        curvePoints[curvePoints.length - 1] = { x: 100, y: Math.round(Math.max(0, Math.min(100, pt.y))) };
      } else {
        const prev = curvePoints[i - 1].x + 1, next = curvePoints[i + 1].x - 1;
        curvePoints[i] = {
          x: Math.round(Math.max(prev, Math.min(next, pt.x))),
          y: Math.round(Math.max(0, Math.min(100, pt.y)))
        };
      }
      updateLutPreview();
    }
    function onCurveUp(e) {
      if (dragIdx.value === null) return;
      const svg = curveSvg.value;
      if (svg && activePointerId !== null) {
        try {
          svg.releasePointerCapture(activePointerId);
        } catch {
        }
      }
      activePointerId = null;
      dragIdx.value = null;
    }
    function onCurveDblClick(e) {
      if (curvePoints.length <= 2) return;
      const svg = curveSvg.value;
      if (!svg) return;
      const r = svg.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width * 100;
      const y = (1 - (e.clientY - r.top) / r.height) * 100;
      const thr = hitRadius();
      let minD = Infinity, minI = -1;
      curvePoints.forEach((cp, i) => {
        const dd = Math.hypot(cp.x - x, cp.y - y);
        if (dd < minD) {
          minD = dd;
          minI = i;
        }
      });
      if (minI > 0 && minI < curvePoints.length - 1 && minD <= thr) {
        curvePoints.splice(minI, 1);
        updateLutPreview();
      }
    }
    const presets = ref([]);
    const appliedPreset = ref("");
    const appliedPresetName = ref("");
    const pendingVcgtLut = shallowRef(null);
    async function loadPresets() {
      try {
        const list = await window.iccApi?.listPresets?.();
        if (list) presets.value = list;
      } catch {
      }
    }
    async function importIcc() {
      busy.value = true;
      resultMsg.value = "";
      try {
        const fp = await window.iccApi?.selectFile?.();
        if (!fp) {
          busy.value = false;
          return;
        }
        if (await window.iccApi?.import?.(fp)) {
          resultMsg.value = "✓ ICC 已导入";
          resultOk.value = true;
          await loadPresets();
        } else {
          resultMsg.value = "✗ 导入失败";
          resultOk.value = false;
        }
      } catch (e) {
        resultMsg.value = "✗ " + (e?.message || "异常");
        resultOk.value = false;
      } finally {
        busy.value = false;
      }
    }
    async function exportIcc() {
      busy.value = true;
      resultMsg.value = "";
      try {
        if (!window.sysApi?.exportIccProfile) {
          resultMsg.value = "✗ API 不可用";
          resultOk.value = false;
          return;
        }
        const r = await window.sysApi.exportIccProfile({
          brightness: p.brightness,
          contrast: p.contrast,
          gamma: p.gamma,
          redGain: p.redGain,
          greenGain: p.greenGain,
          blueGain: p.blueGain,
          temp: d.temp,
          // 色温必须进导出——预览一直含 temp，导出的 ICC 不能丢
          curvePoints: curvePoints.map((pt) => ({ x: pt.x, y: pt.y }))
        });
        resultMsg.value = r.success ? "✓ ICC 已导出" : "✗ " + (r.output || "失败");
        resultOk.value = r.success;
      } catch (e) {
        resultMsg.value = "✗ " + (e?.message || "异常");
        resultOk.value = false;
      } finally {
        busy.value = false;
      }
    }
    async function removePreset(pr) {
      if (!confirm(`删除预设 "${pr.name}"？`)) return;
      busy.value = true;
      await window.iccApi?.remove?.(pr.name);
      await loadPresets();
      busy.value = false;
    }
    async function selectPreset(pr) {
      appliedPreset.value = pr.path;
      appliedPresetName.value = pr.name;
      try {
        const lut = await window.iccApi?.previewPreset?.(pr.name);
        if (lut?.r?.length === 256) {
          pendingVcgtLut.value = lut;
          const table = (arr) => Array.from({ length: 32 }, (_, i) => arr[Math.round(i / 31 * 255)].toFixed(5)).join(" ");
          rTable.value = table(lut.r);
          gTable.value = table(lut.g);
          bTable.value = table(lut.b);
          updateFilterSvg();
        } else {
          pendingVcgtLut.value = null;
          updateLutPreview();
        }
      } catch {
        pendingVcgtLut.value = null;
        updateLutPreview();
      }
      resultMsg.value = `已选择预设：${pr.name}（点击"应用"生效到显示器）`;
      resultOk.value = true;
    }
    async function doApply() {
      busy.value = true;
      resultMsg.value = "";
      try {
        const labels = [];
        const warnings = [];
        if (appliedPreset.value) {
          if (d.temp !== 6500 && pendingVcgtLut.value && window.sysApi?.applyHardwareFilter) {
            const r = await window.sysApi.applyHardwareFilter({
              brightness: 50,
              contrast: 50,
              gamma: 100,
              redGain: 50,
              greenGain: 50,
              blueGain: 50,
              temp: d.temp,
              vcgtLut: pendingVcgtLut.value
            });
            if (r?.success) labels.push(`${appliedPresetName.value} + 色温`);
            else {
              resultMsg.value = `✗ ${r?.error || "ICC 应用失败"}`;
              resultOk.value = false;
              busy.value = false;
              return;
            }
          } else {
            const r = await window.iccApi?.applyProfileV2?.({ profile: appliedPresetName.value, saturation: 50 });
            if (r?.success) {
              labels.push(appliedPresetName.value);
              if (r?.note) warnings.push(r.note);
            } else {
              const detail = r?.output || r?.error || (r === void 0 ? "窗口 iccApi 不可用（preload 未暴露）" : JSON.stringify(r));
              resultMsg.value = `✗ ICC 应用失败 · ${detail}`;
              resultOk.value = false;
              busy.value = false;
              return;
            }
          }
        }
        if (!window.iccApi?.adjustVibrance) {
          resultMsg.value = "✗ 饱和度 API 不可用";
          resultOk.value = false;
          busy.value = false;
          return;
        }
        const v = await window.iccApi.adjustVibrance(d.saturation);
        if (v?.success && !v?.skipped) labels.push(`饱和度 ${d.saturation}`);
        else if (v?.skipped) {
          if (v.note) warnings.push(v.note);
        } else {
          resultMsg.value = `✗ 数字亮丽调节失败: ${v?.error || "未知错误"}`;
          resultOk.value = false;
          busy.value = false;
          return;
        }
        if (!appliedPreset.value && window.sysApi?.applyHardwareFilter) {
          const r = await window.sysApi.applyHardwareFilter({
            brightness: p.brightness,
            contrast: p.contrast,
            gamma: p.gamma,
            redGain: p.redGain,
            greenGain: p.greenGain,
            blueGain: p.blueGain,
            temp: d.temp,
            curvePoints: curvePoints.map((pt) => ({ x: pt.x, y: pt.y }))
          });
          if (r?.success) labels.push("自定义");
          else {
            resultMsg.value = `✗ ${r?.error || "自定义失败"}`;
            resultOk.value = false;
            busy.value = false;
            return;
          }
        }
        resultMsg.value = `✓ 已应用 — ${labels.join(" · ")}${warnings.length ? "\n" + warnings.join("\n") : ""}`;
        resultOk.value = true;
      } catch (e) {
        resultMsg.value = "✗ " + (e?.message || "异常");
        resultOk.value = false;
      } finally {
        busy.value = false;
      }
    }
    async function doClearMonitor() {
      busy.value = true;
      resultMsg.value = "";
      try {
        await window.iccApi?.reset?.();
        await window.iccApi?.adjustVibrance?.(50);
        d.saturation = 50;
        resultMsg.value = "✓ 已还原显示器 + 数字亮丽";
        resultOk.value = true;
      } catch (e) {
        resultMsg.value = "✗ " + (e?.message || "异常");
        resultOk.value = false;
      } finally {
        busy.value = false;
      }
    }
    function resetPreview() {
      appliedPreset.value = "";
      appliedPresetName.value = "";
      pendingVcgtLut.value = null;
      d.saturation = 50;
      d.temp = 6500;
      resetCustomParams();
    }
    function resetCustomParams() {
      p.brightness = 50;
      p.contrast = 50;
      p.gamma = 100;
      p.redGain = 50;
      p.greenGain = 50;
      p.blueGain = 50;
      curvePoints.length = 0;
      curvePoints.push({ x: 0, y: 0 }, { x: 100, y: 100 });
      updateLutPreview();
    }
    onMounted(async () => {
      ensureFilterSvg();
      await loadPresets();
      d.saturation = 50;
      d.temp = 6500;
      updateLutPreview();
      await loadDisplayImage();
    });
    onUnmounted(() => {
      if (paramTimer) clearTimeout(paramTimer);
      if (lutTimer) clearTimeout(lutTimer);
      if (filterSvgEl) {
        filterSvgEl.remove();
        filterSvgEl = null;
      }
    });
    const rTable = ref("0 1");
    const gTable = ref("0 1");
    const bTable = ref("0 1");
    const filterStyle = ref("none");
    let filterSvgEl = null;
    function ensureFilterSvg() {
      if (filterSvgEl) return;
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("style", "position:fixed;top:-9999px;left:-9999px;width:1px;height:1px;overflow:hidden");
      svg.innerHTML = '<defs><filter id="gf-lut-global" color-interpolation-filters="sRGB"><feComponentTransfer><feFuncR type="table" tableValues="0 1"/><feFuncG type="table" tableValues="0 1"/><feFuncB type="table" tableValues="0 1"/></feComponentTransfer></filter></defs>';
      document.body.appendChild(svg);
      filterSvgEl = svg;
    }
    function updateFilterSvg() {
      const k = (d.saturation - 50) / 50;
      const s = 1 + k;
      const luma = [0.2126, 0.7152, 0.0722];
      const m = [
        luma[0] * (1 - s) + s,
        luma[1] * (1 - s),
        luma[2] * (1 - s),
        0,
        0,
        luma[0] * (1 - s),
        luma[1] * (1 - s) + s,
        luma[2] * (1 - s),
        0,
        0,
        luma[0] * (1 - s),
        luma[1] * (1 - s),
        luma[2] * (1 - s) + s,
        0,
        0,
        0,
        0,
        0,
        1,
        0
      ].map((v) => +v.toFixed(6)).join(" ");
      const svgStr = `<svg xmlns='http://www.w3.org/2000/svg'><filter id='g'><feComponentTransfer><feFuncR type='table' tableValues='${rTable.value}'/><feFuncG type='table' tableValues='${gTable.value}'/><feFuncB type='table' tableValues='${bTable.value}'/></feComponentTransfer><feColorMatrix type='matrix' values='${m}'/></filter></svg>`;
      filterStyle.value = `url("data:image/svg+xml,${encodeURIComponent(svgStr)}#g")`;
    }
    function applyTemp(lut, tempK) {
      if (tempK === 6500) return lut;
      const delta = (tempK - 6500) / 1e3;
      const rGain = 1 - delta * 0.06;
      const bGain = 1 + delta * 0.06;
      const gGain = 1 - Math.abs(delta) * 0.012;
      const r = new Array(256), g = new Array(256), b = new Array(256);
      for (let i = 0; i < 256; i++) {
        r[i] = Math.max(0, Math.min(1, lut.r[i] * rGain));
        g[i] = Math.max(0, Math.min(1, lut.g[i] * gGain));
        b[i] = Math.max(0, Math.min(1, lut.b[i] * bGain));
      }
      return { r, g, b };
    }
    let lutTimer = null;
    function updateLutPreview() {
      if (lutTimer) return;
      lutTimer = setTimeout(() => {
        let base = pendingVcgtLut.value;
        if (!base) {
          base = computeLUT({
            brightness: p.brightness,
            contrast: p.contrast,
            gamma: p.gamma,
            redGain: p.redGain,
            greenGain: p.greenGain,
            blueGain: p.blueGain,
            curvePoints: curvePoints.map((pt) => ({ x: pt.x, y: pt.y }))
          });
        }
        const lut = applyTemp(base, d.temp);
        const table = (arr) => Array.from({ length: 32 }, (_, i) => arr[Math.round(i / 31 * 255)].toFixed(5)).join(" ");
        rTable.value = table(lut.r);
        gTable.value = table(lut.g);
        bTable.value = table(lut.b);
        updateFilterSvg();
        lutTimer = null;
      }, 30);
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          _cache[25] || (_cache[25] = createBaseVNode("div", { class: "flex-shrink-0 px-5 py-3 border-b border-white/[0.04] flex items-center justify-between" }, [
            createBaseVNode("span", { class: "text-[11px] font-semibold tracking-[0.15em] text-gray-500 uppercase" }, "实况色彩调校")
          ], -1)),
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("div", _hoisted_4, [
              createBaseVNode("div", _hoisted_5, [
                _cache[10] || (_cache[10] = createBaseVNode("span", { class: "text-[10px] font-semibold tracking-[0.15em] text-teal-400/80 uppercase" }, "ICC 色彩预设", -1)),
                createBaseVNode("div", _hoisted_6, [
                  createBaseVNode("button", {
                    onClick: importIcc,
                    disabled: busy.value,
                    class: "text-[10px] text-gray-500 hover:text-teal-400 transition-colors disabled:opacity-30"
                  }, "＋ 导入", 8, _hoisted_7),
                  createBaseVNode("button", {
                    onClick: exportIcc,
                    disabled: busy.value,
                    class: "text-[10px] text-gray-500 hover:text-teal-400 transition-colors disabled:opacity-30"
                  }, "导出 ICC", 8, _hoisted_8)
                ])
              ]),
              createBaseVNode("div", _hoisted_9, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(presets.value, (pr) => {
                  return openBlock(), createElementBlock("button", {
                    key: pr.path,
                    onClick: ($event) => selectPreset(pr),
                    disabled: busy.value,
                    class: normalizeClass(["group relative flex items-center justify-between px-2.5 py-2 rounded-md text-[10px] font-medium transition-all border", appliedPreset.value === pr.path ? "bg-teal-400/15 border-teal-400/30 text-teal-400" : "bg-white/[0.02] border-white/[0.05] text-gray-400 hover:text-teal-400 hover:border-teal-400/20"])
                  }, [
                    createBaseVNode("span", _hoisted_11, toDisplayString(pr.name), 1),
                    !pr.builtin ? (openBlock(), createElementBlock("span", {
                      key: 0,
                      onClick: withModifiers(($event) => removePreset(pr), ["stop"]),
                      class: "ml-1.5 opacity-0 group-hover:opacity-100 text-red-400/70 hover:text-red-400 transition-opacity"
                    }, "✕", 8, _hoisted_12)) : createCommentVNode("", true),
                    appliedPreset.value === pr.path ? (openBlock(), createElementBlock("span", _hoisted_13, "●")) : createCommentVNode("", true)
                  ], 10, _hoisted_10);
                }), 128))
              ])
            ]),
            createBaseVNode("div", _hoisted_14, [
              createBaseVNode("div", _hoisted_15, [
                _cache[11] || (_cache[11] = createBaseVNode("span", { class: "text-[10px] font-semibold tracking-[0.15em] text-gray-500 uppercase" }, "显卡饱和度", -1)),
                createBaseVNode("span", _hoisted_16, toDisplayString(d.saturation), 1)
              ]),
              withDirectives(createBaseVNode("input", {
                type: "range",
                min: "0",
                max: "100",
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => d.saturation = $event),
                class: "slider w-full"
              }, null, 512), [
                [
                  vModelText,
                  d.saturation,
                  void 0,
                  { number: true }
                ]
              ])
            ]),
            createBaseVNode("div", _hoisted_17, [
              createBaseVNode("div", { class: "flex items-center justify-between mb-2" }, [
                _cache[12] || (_cache[12] = createBaseVNode("span", { class: "text-[10px] font-semibold tracking-[0.15em] text-gray-500 uppercase" }, "色调与参数", -1)),
                createBaseVNode("button", {
                  onClick: resetCustomParams,
                  class: "reset-custom text-[10px] text-gray-500 hover:text-teal-400 transition-colors"
                }, "重置")
              ]),
              createBaseVNode("div", _hoisted_18, [
                createBaseVNode("div", _hoisted_19, [
                  _cache[13] || (_cache[13] = createBaseVNode("span", { class: "slider-label" }, "亮度", -1)),
                  withDirectives(createBaseVNode("input", {
                    type: "range",
                    min: "0",
                    max: "100",
                    step: "1",
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => p.brightness = $event),
                    class: "slider flex-1",
                    disabled: !!appliedPreset.value,
                    title: appliedPreset.value ? "预设模式下亮度由预设 LUT 决定" : "",
                    onInput: onParamInput
                  }, null, 40, _hoisted_20), [
                    [
                      vModelText,
                      p.brightness,
                      void 0,
                      { number: true }
                    ]
                  ]),
                  createBaseVNode("span", _hoisted_21, toDisplayString(p.brightness), 1)
                ]),
                createBaseVNode("div", _hoisted_22, [
                  _cache[14] || (_cache[14] = createBaseVNode("span", { class: "slider-label" }, "对比度", -1)),
                  withDirectives(createBaseVNode("input", {
                    type: "range",
                    min: "0",
                    max: "100",
                    step: "1",
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => p.contrast = $event),
                    class: "slider flex-1",
                    disabled: !!appliedPreset.value,
                    title: appliedPreset.value ? "预设模式下对比度由预设 LUT 决定" : "",
                    onInput: onParamInput
                  }, null, 40, _hoisted_23), [
                    [
                      vModelText,
                      p.contrast,
                      void 0,
                      { number: true }
                    ]
                  ]),
                  createBaseVNode("span", _hoisted_24, toDisplayString(p.contrast), 1)
                ]),
                createBaseVNode("div", _hoisted_25, [
                  _cache[15] || (_cache[15] = createBaseVNode("span", { class: "slider-label" }, "伽马值", -1)),
                  withDirectives(createBaseVNode("input", {
                    type: "range",
                    min: "50",
                    max: "250",
                    step: "1",
                    "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => p.gamma = $event),
                    class: "slider flex-1",
                    disabled: !!appliedPreset.value,
                    title: appliedPreset.value ? "预设模式下伽马由预设 LUT 决定" : "",
                    onInput: onParamInput
                  }, null, 40, _hoisted_26), [
                    [
                      vModelText,
                      p.gamma,
                      void 0,
                      { number: true }
                    ]
                  ]),
                  createBaseVNode("span", _hoisted_27, toDisplayString((p.gamma / 100).toFixed(2)), 1)
                ])
              ])
            ]),
            createBaseVNode("div", _hoisted_28, [
              _cache[19] || (_cache[19] = createBaseVNode("div", { class: "flex items-center justify-between mb-2" }, [
                createBaseVNode("span", { class: "text-[10px] font-semibold tracking-[0.15em] text-gray-500 uppercase" }, "通道增益")
              ], -1)),
              createBaseVNode("div", _hoisted_29, [
                createBaseVNode("div", _hoisted_30, [
                  _cache[16] || (_cache[16] = createBaseVNode("span", { class: "slider-label" }, [
                    createBaseVNode("span", { class: "text-red-400" }, "R")
                  ], -1)),
                  withDirectives(createBaseVNode("input", {
                    type: "range",
                    min: "0",
                    max: "100",
                    step: "1",
                    "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => p.redGain = $event),
                    class: "slider flex-1",
                    disabled: !!appliedPreset.value,
                    title: appliedPreset.value ? "预设模式下通道增益由预设 LUT 决定" : "",
                    onInput: onParamInput
                  }, null, 40, _hoisted_31), [
                    [
                      vModelText,
                      p.redGain,
                      void 0,
                      { number: true }
                    ]
                  ]),
                  createBaseVNode("span", _hoisted_32, toDisplayString(p.redGain), 1)
                ]),
                createBaseVNode("div", _hoisted_33, [
                  _cache[17] || (_cache[17] = createBaseVNode("span", { class: "slider-label" }, [
                    createBaseVNode("span", { class: "text-green-400" }, "G")
                  ], -1)),
                  withDirectives(createBaseVNode("input", {
                    type: "range",
                    min: "0",
                    max: "100",
                    step: "1",
                    "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => p.greenGain = $event),
                    class: "slider flex-1",
                    disabled: !!appliedPreset.value,
                    title: appliedPreset.value ? "预设模式下通道增益由预设 LUT 决定" : "",
                    onInput: onParamInput
                  }, null, 40, _hoisted_34), [
                    [
                      vModelText,
                      p.greenGain,
                      void 0,
                      { number: true }
                    ]
                  ]),
                  createBaseVNode("span", _hoisted_35, toDisplayString(p.greenGain), 1)
                ]),
                createBaseVNode("div", _hoisted_36, [
                  _cache[18] || (_cache[18] = createBaseVNode("span", { class: "slider-label" }, [
                    createBaseVNode("span", { class: "text-sky-400" }, "B")
                  ], -1)),
                  withDirectives(createBaseVNode("input", {
                    type: "range",
                    min: "0",
                    max: "100",
                    step: "1",
                    "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => p.blueGain = $event),
                    class: "slider flex-1",
                    disabled: !!appliedPreset.value,
                    title: appliedPreset.value ? "预设模式下通道增益由预设 LUT 决定" : "",
                    onInput: onParamInput
                  }, null, 40, _hoisted_37), [
                    [
                      vModelText,
                      p.blueGain,
                      void 0,
                      { number: true }
                    ]
                  ]),
                  createBaseVNode("span", _hoisted_38, toDisplayString(p.blueGain), 1)
                ])
              ])
            ]),
            createBaseVNode("div", _hoisted_39, [
              createBaseVNode("div", _hoisted_40, [
                _cache[20] || (_cache[20] = createBaseVNode("span", { class: "text-[10px] font-semibold tracking-[0.15em] text-gray-500 uppercase" }, "色温", -1)),
                createBaseVNode("span", _hoisted_41, toDisplayString(d.temp), 1)
              ]),
              withDirectives(createBaseVNode("input", {
                type: "range",
                min: "3000",
                max: "9000",
                step: "100",
                "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => d.temp = $event),
                class: "slider w-full"
              }, null, 512), [
                [
                  vModelText,
                  d.temp,
                  void 0,
                  { number: true }
                ]
              ]),
              _cache[21] || (_cache[21] = createBaseVNode("div", { class: "flex justify-between text-[9px] text-gray-600 mt-1 px-0.5" }, [
                createBaseVNode("span", null, "暖 3000K"),
                createBaseVNode("span", null, "6500K 标准"),
                createBaseVNode("span", null, "冷 9000K")
              ], -1))
            ]),
            createBaseVNode("div", _hoisted_42, [
              _cache[23] || (_cache[23] = createBaseVNode("div", { class: "flex items-center justify-between mb-2" }, [
                createBaseVNode("span", { class: "text-[10px] font-semibold tracking-[0.15em] text-gray-500 uppercase" }, "色调曲线"),
                createBaseVNode("span", { class: "text-[9px] text-gray-600" }, "单击添加 · 拖动调节 · 双击删除")
              ], -1)),
              createBaseVNode("div", _hoisted_43, [
                (openBlock(), createElementBlock("svg", {
                  ref_key: "curveSvg",
                  ref: curveSvg,
                  viewBox: `0 0 100 100`,
                  preserveAspectRatio: "none",
                  class: "w-full h-[200px] block touch-none cursor-crosshair",
                  onPointerdown: withModifiers(onCurveDown, ["stop"]),
                  onPointermove: withModifiers(onCurveMove, ["stop"]),
                  onPointerup: withModifiers(onCurveUp, ["stop"]),
                  onPointercancel: withModifiers(onCurveUp, ["stop"]),
                  onDblclick: withModifiers(onCurveDblClick, ["stop"])
                }, [
                  (openBlock(), createElementBlock(Fragment, null, renderList([25, 50, 75], (g) => {
                    return createBaseVNode("line", {
                      key: "hg" + g,
                      x1: "0",
                      y1: g,
                      x2: "100",
                      y2: g,
                      stroke: "rgba(255,255,255,0.04)",
                      "stroke-width": "0.3"
                    }, null, 8, _hoisted_44);
                  }), 64)),
                  (openBlock(), createElementBlock(Fragment, null, renderList([25, 50, 75], (g) => {
                    return createBaseVNode("line", {
                      key: "vg" + g,
                      x1: g,
                      y1: "0",
                      x2: g,
                      y2: "100",
                      stroke: "rgba(255,255,255,0.04)",
                      "stroke-width": "0.3"
                    }, null, 8, _hoisted_45);
                  }), 64)),
                  _cache[22] || (_cache[22] = createBaseVNode("line", {
                    x1: "0",
                    y1: "100",
                    x2: "100",
                    y2: "0",
                    stroke: "rgba(255,255,255,0.06)",
                    "stroke-width": "0.4",
                    "stroke-dasharray": "2,2"
                  }, null, -1)),
                  createBaseVNode("polyline", {
                    points: curvePolyStr.value,
                    fill: "none",
                    stroke: "#14b8a6",
                    "stroke-width": "0.8",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round",
                    "vector-effect": "non-scaling-stroke"
                  }, null, 8, _hoisted_46),
                  (openBlock(true), createElementBlock(Fragment, null, renderList(curvePoints, (pt, i) => {
                    return openBlock(), createElementBlock("circle", {
                      key: i,
                      cx: pt.x,
                      cy: 100 - pt.y,
                      r: "2",
                      fill: "#14b8a6",
                      stroke: dragIdx.value === i ? "#fff" : "rgba(20,184,166,0.4)",
                      "stroke-width": dragIdx.value === i ? 0.8 : 0.4,
                      "vector-effect": "non-scaling-stroke"
                    }, null, 8, _hoisted_47);
                  }), 128))
                ], 544))
              ])
            ])
          ]),
          createBaseVNode("div", _hoisted_48, [
            createBaseVNode("div", _hoisted_49, [
              createBaseVNode("button", {
                onClick: doApply,
                disabled: busy.value,
                class: "flex-1 py-2.5 rounded-lg text-[11px] font-semibold tracking-wide transition-all bg-teal-400/10 border border-teal-400/25 text-teal-400 hover:bg-teal-400/20 active:scale-[0.985] disabled:opacity-30 disabled:cursor-not-allowed"
              }, [
                busy.value ? (openBlock(), createElementBlock("span", _hoisted_51)) : createCommentVNode("", true),
                _cache[24] || (_cache[24] = createTextVNode("应用 ", -1))
              ], 8, _hoisted_50),
              createBaseVNode("button", {
                onClick: doClearMonitor,
                disabled: busy.value,
                class: "flex-1 py-2.5 rounded-lg text-[11px] font-medium tracking-wide transition-all bg-white/[0.02] border border-white/[0.06] text-gray-400 hover:text-gray-200 active:scale-[0.985] disabled:opacity-30 disabled:cursor-not-allowed"
              }, " 还原显卡 ", 8, _hoisted_52)
            ]),
            createBaseVNode("div", _hoisted_53, [
              createBaseVNode("button", {
                onClick: resetPreview,
                disabled: busy.value,
                class: "flex-1 py-2 rounded-lg text-[10px] font-medium tracking-wide transition-all bg-white/[0.02] border border-white/[0.06] text-gray-500 hover:text-gray-300 hover:border-white/[0.12] active:scale-[0.985] disabled:opacity-30"
              }, " 恢复预览 ", 8, _hoisted_54),
              createBaseVNode("button", {
                onClick: resetCustomParams,
                disabled: busy.value,
                class: "flex-1 py-2 rounded-lg text-[10px] font-medium tracking-wide transition-all bg-white/[0.02] border border-white/[0.06] text-gray-500 hover:text-gray-300 hover:border-white/[0.12] active:scale-[0.985] disabled:opacity-30"
              }, " 恢复设置 ", 8, _hoisted_55)
            ]),
            resultMsg.value ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: normalizeClass(["text-[11px] text-center py-1 rounded", resultOk.value ? "text-teal-400 bg-teal-400/[0.04]" : "text-red-400 bg-red-400/[0.04]"]),
              style: { "white-space": "pre-line", "word-break": "break-all", "line-height": "1.6" }
            }, toDisplayString(resultMsg.value), 3)) : createCommentVNode("", true)
          ])
        ]),
        createBaseVNode("div", _hoisted_56, [
          createBaseVNode("div", _hoisted_57, [
            createBaseVNode("img", {
              src: displayImage.value,
              class: "absolute inset-0 w-full h-full object-cover",
              alt: "filtered"
            }, null, 8, _hoisted_58),
            createBaseVNode("img", {
              src: displayImage.value,
              class: "absolute inset-0 w-full h-full object-cover",
              style: normalizeStyle({ filter: filterStyle.value, clipPath: `polygon(${split.value}% 0, 100% 0, 100% 100%, ${split.value}% 100%)` }),
              alt: "colored"
            }, null, 12, _hoisted_59)
          ]),
          (openBlock(), createElementBlock("svg", _hoisted_60, [
            createBaseVNode("filter", _hoisted_61, [
              createBaseVNode("feComponentTransfer", null, [
                createBaseVNode("feFuncR", {
                  type: "table",
                  tableValues: rTable.value
                }, null, 8, _hoisted_62),
                createBaseVNode("feFuncG", {
                  type: "table",
                  tableValues: gTable.value
                }, null, 8, _hoisted_63),
                createBaseVNode("feFuncB", {
                  type: "table",
                  tableValues: bTable.value
                }, null, 8, _hoisted_64)
              ])
            ])
          ])),
          createBaseVNode("div", {
            class: "absolute top-0 bottom-0 w-[2px] bg-white/60 shadow-[0_0_12px_rgba(0,0,0,0.6)] pointer-events-none z-10",
            style: normalizeStyle({ left: split.value + "%" })
          }, [..._cache[26] || (_cache[26] = [
            createBaseVNode("div", { class: "absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-12 rounded-lg bg-black/50 border border-white/25 backdrop-blur flex items-center justify-center" }, [
              createBaseVNode("svg", {
                width: "12",
                height: "20",
                viewBox: "0 0 12 20"
              }, [
                createBaseVNode("polygon", {
                  points: "0,10 12,4 12,16",
                  fill: "rgba(255,255,255,0.85)"
                }),
                createBaseVNode("polygon", {
                  points: "12,10 0,4 0,16",
                  fill: "rgba(255,255,255,0.85)"
                })
              ])
            ], -1)
          ])], 4),
          withDirectives(createBaseVNode("input", {
            type: "range",
            min: "0",
            max: "100",
            "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => split.value = $event),
            class: "absolute inset-0 w-full h-full z-20 opacity-0 cursor-col-resize"
          }, null, 512), [
            [
              vModelText,
              split.value,
              void 0,
              { number: true }
            ]
          ]),
          _cache[29] || (_cache[29] = createBaseVNode("div", { class: "absolute bottom-4 left-4 z-10 font-mono text-[10px] tracking-[0.15em] text-teal-400/40 bg-black/40 px-2 py-0.5 rounded pointer-events-none" }, [
            createBaseVNode("span", { class: "text-teal-400/60" }, "FILTERED")
          ], -1)),
          _cache[30] || (_cache[30] = createBaseVNode("div", { class: "absolute bottom-4 right-4 z-10 font-mono text-[10px] tracking-[0.15em] text-white/25 bg-black/40 px-2 py-0.5 rounded pointer-events-none" }, [
            createBaseVNode("span", { class: "text-teal-400/60" }, "ORIGINAL")
          ], -1)),
          createBaseVNode("div", _hoisted_65, [
            createBaseVNode("div", _hoisted_66, [
              (openBlock(), createElementBlock(Fragment, null, renderList(maps, (m) => {
                return createBaseVNode("button", {
                  key: m,
                  onClick: ($event) => selectedMap.value = m,
                  class: normalizeClass(["px-2.5 py-0.5 rounded-full text-[10px] font-medium transition-all tracking-wide", selectedMap.value === m ? "bg-teal-400/15 text-teal-400 border border-teal-400/20" : "text-gray-400 hover:text-gray-200 hover:bg-white/5"])
                }, toDisplayString(m), 11, _hoisted_67);
              }), 64))
            ]),
            createBaseVNode("div", _hoisted_68, [
              (openBlock(), createElementBlock(Fragment, null, renderList(views, (v) => {
                return createBaseVNode("button", {
                  key: v.id,
                  onClick: ($event) => selectedView.value = v.id,
                  class: normalizeClass(["px-2.5 py-0.5 rounded-full text-[10px] font-medium tracking-wide transition-all", selectedView.value === v.id && !customImage.value ? "bg-teal-400/10 text-teal-400" : "text-gray-500 hover:text-gray-300"])
                }, toDisplayString(v.label), 11, _hoisted_69);
              }), 64)),
              _cache[28] || (_cache[28] = createBaseVNode("span", { class: "w-px h-3 bg-white/5 mx-0.5" }, null, -1)),
              createBaseVNode("button", {
                onClick: pickCustomImage,
                class: "px-2 py-0.5 rounded-full text-[10px] font-medium tracking-wide text-gray-500 hover:text-teal-400 flex items-center gap-1"
              }, [..._cache[27] || (_cache[27] = [
                createBaseVNode("svg", {
                  width: "10",
                  height: "10",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "1.5"
                }, [
                  createBaseVNode("rect", {
                    x: "3",
                    y: "3",
                    width: "18",
                    height: "18",
                    rx: "2"
                  }),
                  createBaseVNode("circle", {
                    cx: "8.5",
                    cy: "8.5",
                    r: "1.5"
                  }),
                  createBaseVNode("polyline", { points: "21 15 16 10 5 21" })
                ], -1),
                createTextVNode("自定义", -1)
              ])]),
              customImage.value ? (openBlock(), createElementBlock("button", {
                key: 0,
                onClick: _cache[9] || (_cache[9] = ($event) => {
                  customImage.value = "";
                  loadDisplayImage();
                }),
                class: "px-1.5 py-0.5 rounded-full text-[10px] text-gray-500 hover:text-red-400"
              }, "✕")) : createCommentVNode("", true)
            ])
          ])
        ])
      ]);
    };
  }
});
const GraphicsFilter = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-98e8b899"]]);
export {
  GraphicsFilter as default
};
