import { t as defineComponent, l as createElementBlock, i as createBaseVNode, q as createTextVNode, F as Fragment, ab as renderList, a5 as openBlock, ak as toDisplayString, _ as _export_sfc, a1 as onMounted, aD as watch, a3 as onUnmounted, p as createStaticVNode, as as unref, S as normalizeClass, aG as withDirectives, aA as vModelText, aH as withKeys, k as createCommentVNode, r as createVNode, j as createBlock, V as normalizeStyle, ax as vModelCheckbox, a9 as ref, a7 as reactive, g as computed } from "./main-DAqTdO6U.js";
import { o as object, L as LocalInputPresets } from "./LocalInputPresets-Cist2olO.js";
import { A, L as LegacyCrosshairPreview } from "./LegacyCrosshairPreview-DwpWYNlI.js";
import "./legacyInputTools-Cx_Or_Ch.js";
const _hoisted_1$1 = { class: "legacy-editor" };
const _hoisted_2$1 = { class: "legacy-fields" };
const _hoisted_3$1 = ["value"];
const _hoisted_4$1 = ["value"];
const _hoisted_5$1 = ["value", "onInput"];
const _hoisted_6$1 = ["min", "max", "step", "value", "onChange"];
const _hoisted_7$1 = ["checked", "onChange"];
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "LegacyCrosshairEditor",
  props: {
    modelValue: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const styles = [{ value: "classic", label: "十字线" }, { value: "circle", label: "圆环" }, { value: "dot", label: "圆点" }, ...["Glasses", "Smiley", "T字准星", "aragornN", "ropz", "s1mple", "MMW2.0", "donk", "cat", "SSCJ"].map((name) => ({ value: `img:${name}`, label: name }))];
    const colors = [{ key: "color", label: "准星颜色" }, { key: "outlineColor", label: "描边颜色" }];
    const numbers = [
      { key: "size", label: "图片大小", min: 8, max: 160 },
      { key: "opacity", label: "不透明度", min: 0.1, max: 1, step: 0.05 },
      { key: "lineLength", label: "线条长度", min: 0, max: 60 },
      { key: "lineWidth", label: "线条宽度", min: 1, max: 12 },
      { key: "lineGap", label: "线条间距", min: 0, max: 40 },
      { key: "dotSize", label: "圆点大小", min: 0, max: 20 },
      { key: "dotOpacity", label: "圆点不透明度", min: 0.1, max: 1, step: 0.05 },
      { key: "outerLength", label: "外线长度", min: 0, max: 40 },
      { key: "outerWidth", label: "外线宽度", min: 1, max: 12 },
      { key: "outerGap", label: "外线间距", min: 0, max: 60 },
      { key: "outlineWidth", label: "描边宽度", min: 0, max: 6, step: 0.1 },
      { key: "circleRadius", label: "圆环半径", min: 4, max: 80 },
      { key: "circleWidth", label: "圆环宽度", min: 1, max: 12 },
      { key: "rotation", label: "旋转角度", min: 0, max: 360 }
    ];
    const switches = [{ key: "dotEnabled", label: "中心圆点" }, { key: "tStyle", label: "T 字准星" }, { key: "outerEnabled", label: "外层线条" }, { key: "outlineEnabled", label: "轮廓描边" }];
    function set(key, value) {
      emit("update:modelValue", A({ ...props.modelValue, [key]: value }));
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("details", _hoisted_1$1, [
        _cache[2] || (_cache[2] = createBaseVNode("summary", null, "编辑高级准星参数", -1)),
        createBaseVNode("div", _hoisted_2$1, [
          createBaseVNode("label", null, [
            _cache[1] || (_cache[1] = createTextVNode("形状", -1)),
            createBaseVNode("select", {
              "aria-label": "高级准星形状",
              value: __props.modelValue.style,
              onChange: _cache[0] || (_cache[0] = ($event) => set("style", $event.target.value))
            }, [
              (openBlock(), createElementBlock(Fragment, null, renderList(styles, (style) => {
                return createBaseVNode("option", {
                  key: style.value,
                  value: style.value
                }, toDisplayString(style.label), 9, _hoisted_4$1);
              }), 64))
            ], 40, _hoisted_3$1)
          ]),
          (openBlock(), createElementBlock(Fragment, null, renderList(colors, (field) => {
            return createBaseVNode("label", {
              key: field.key
            }, [
              createTextVNode(toDisplayString(field.label), 1),
              createBaseVNode("input", {
                type: "color",
                value: __props.modelValue[field.key],
                onInput: ($event) => set(field.key, $event.target.value)
              }, null, 40, _hoisted_5$1)
            ]);
          }), 64)),
          (openBlock(), createElementBlock(Fragment, null, renderList(numbers, (field) => {
            return createBaseVNode("label", {
              key: field.key
            }, [
              createTextVNode(toDisplayString(field.label), 1),
              createBaseVNode("input", {
                type: "number",
                min: field.min,
                max: field.max,
                step: field.step ?? 1,
                value: __props.modelValue[field.key],
                onChange: ($event) => set(field.key, Number($event.target.value))
              }, null, 40, _hoisted_6$1)
            ]);
          }), 64)),
          (openBlock(), createElementBlock(Fragment, null, renderList(switches, (field) => {
            return createBaseVNode("label", {
              key: field.key,
              class: "check"
            }, [
              createTextVNode(toDisplayString(field.label), 1),
              createBaseVNode("input", {
                type: "checkbox",
                checked: __props.modelValue[field.key],
                onChange: ($event) => set(field.key, $event.target.checked)
              }, null, 40, _hoisted_7$1)
            ]);
          }), 64))
        ])
      ]);
    };
  }
});
const LegacyCrosshairEditor = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-8e69212a"]]);
function crosshairProfile(value) {
  const input = object(value);
  if (!["cross", "dot", "circle", "chevron"].includes(input.shape)) throw new Error("准星形状无效。");
  if (typeof input.color !== "string" || !/^#[0-9a-f]{6}$/i.test(input.color)) throw new Error("准星颜色无效。");
  const output = { shape: input.shape, color: input.color };
  const ranges = { offsetX: [-50, 50], offsetY: [-50, 50], thickness: [1, 12], length: [2, 40], gap: [0, 15], outlineOpacity: [0.1, 1], outlineThickness: [1, 6], dotOpacity: [0.05, 1], dotThickness: [2, 15], scaleX: [0.5, 3], scaleY: [0.5, 3] };
  for (const [key, [min, max]] of Object.entries(ranges)) {
    if (typeof input[key] !== "number" || !Number.isFinite(input[key]) || input[key] < min || input[key] > max) throw new Error(`准星参数 ${key} 超出范围。`);
    output[key] = input[key];
  }
  for (const key of ["outlines", "centerDot"]) {
    if (typeof input[key] !== "boolean") throw new Error("准星开关参数无效。");
    output[key] = input[key];
  }
  output.legacyPreset = input.legacyPreset ? A(object(input.legacyPreset)) : null;
  return output;
}
function decodeLegacyCrosshair(code) {
  if (!code.startsWith("HXC1-") || code.length > 16384) throw new Error("准星配置码无效或过长。");
  const raw = atob(code.slice(5).trim());
  const payload = object(JSON.parse(new TextDecoder().decode(Uint8Array.from(raw, (c) => c.charCodeAt(0)))));
  if (payload.app !== "hikari-crosshair" || payload.v !== 1) throw new Error("不是受支持的准星配置码。");
  return A(object(payload.params));
}
function encodeLegacyCrosshair(value) {
  const payload = JSON.stringify({ app: "hikari-crosshair", v: 1, params: A(value) });
  return "HXC1-" + btoa(Array.from(new TextEncoder().encode(payload), (byte) => String.fromCharCode(byte)).join(""));
}
const _hoisted_1 = { class: "page" };
const _hoisted_2 = { class: "page-header" };
const _hoisted_3 = { style: { "margin-left": "auto", "display": "flex", "gap": "8px", "align-items": "center" } };
const _hoisted_4 = {
  key: 0,
  class: "import-panel"
};
const _hoisted_5 = { class: "import-row" };
const _hoisted_6 = { class: "preview-bar" };
const _hoisted_7 = { class: "preview-bg" };
const _hoisted_8 = {
  key: 1,
  class: "preview-ch"
};
const _hoisted_9 = {
  key: 2,
  class: "prev-info"
};
const _hoisted_10 = {
  key: 1,
  class: "import-panel"
};
const _hoisted_11 = { class: "grid-col" };
const _hoisted_12 = { class: "card" };
const _hoisted_13 = { class: "shape-row" };
const _hoisted_14 = ["onClick"];
const _hoisted_15 = { class: "shape-icon" };
const _hoisted_16 = { class: "shape-label" };
const _hoisted_17 = { class: "card" };
const _hoisted_18 = { class: "color-pick-row" };
const _hoisted_19 = { class: "hex-val" };
const _hoisted_20 = { class: "quick-colors" };
const _hoisted_21 = ["onClick"];
const _hoisted_22 = { class: "card" };
const _hoisted_23 = { class: "preset-grid" };
const _hoisted_24 = ["onClick"];
const _hoisted_25 = { class: "preset-icon" };
const _hoisted_26 = { class: "grid-col" };
const _hoisted_27 = { class: "section-title" };
const _hoisted_28 = { class: "slider-list" };
const _hoisted_29 = { class: "slider-row" };
const _hoisted_30 = ["disabled"];
const _hoisted_31 = { class: "val" };
const _hoisted_32 = { class: "slider-row" };
const _hoisted_33 = ["disabled"];
const _hoisted_34 = { class: "val" };
const _hoisted_35 = { class: "slider-row" };
const _hoisted_36 = ["disabled"];
const _hoisted_37 = { class: "val" };
const _hoisted_38 = {
  key: 0,
  class: "dimmed-hint"
};
const _hoisted_39 = { class: "grid-col" };
const _hoisted_40 = { class: "card" };
const _hoisted_41 = { class: "section-title" };
const _hoisted_42 = { class: "toggle-inline" };
const _hoisted_43 = {
  key: 0,
  class: "slider-list"
};
const _hoisted_44 = { class: "slider-row" };
const _hoisted_45 = { class: "val" };
const _hoisted_46 = { class: "slider-row" };
const _hoisted_47 = { class: "val" };
const _hoisted_48 = { class: "card" };
const _hoisted_49 = { class: "section-title" };
const _hoisted_50 = { class: "toggle-inline" };
const _hoisted_51 = {
  key: 0,
  class: "slider-list"
};
const _hoisted_52 = { class: "slider-row" };
const _hoisted_53 = { class: "val" };
const _hoisted_54 = { class: "slider-row" };
const _hoisted_55 = { class: "val" };
const _hoisted_56 = { class: "card" };
const _hoisted_57 = { class: "offset-row" };
const _hoisted_58 = { class: "offset-item" };
const _hoisted_59 = { class: "stepper" };
const _hoisted_60 = { class: "stepper-val" };
const _hoisted_61 = { class: "offset-item" };
const _hoisted_62 = { class: "stepper" };
const _hoisted_63 = { class: "stepper-val" };
const _hoisted_64 = { class: "card" };
const _hoisted_65 = { class: "slider-list" };
const _hoisted_66 = { class: "slider-row" };
const _hoisted_67 = { class: "val" };
const _hoisted_68 = { class: "slider-row" };
const _hoisted_69 = { class: "val" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CrosshairControl",
  setup(__props) {
    const DEFAULT = {
      legacyPreset: null,
      shape: "cross",
      color: "#00ff00",
      offsetX: 0,
      offsetY: 0,
      thickness: 2,
      length: 12,
      gap: 4,
      outlines: true,
      outlineOpacity: 0.5,
      outlineThickness: 1,
      centerDot: false,
      dotOpacity: 1,
      dotThickness: 3,
      scaleX: 1,
      scaleY: 1
    };
    const overlayOn = ref(false);
    const showImport = ref(false);
    const importCode = ref("");
    const importMsg = ref("");
    const importOk = ref(false);
    const cfg = reactive({ ...DEFAULT });
    const quickColors = ["#00ff00", "#ff0000", "#00bfff", "#ffff00", "#ff00ff", "#ffffff", "#00ffff"];
    const shapes = [
      { id: "cross", icon: "┼", label: "十字线" },
      { id: "dot", icon: "●", label: "圆点" },
      { id: "circle", icon: "○", label: "空心圆" },
      { id: "chevron", icon: "⋀", label: "V 形" }
    ];
    const presets = [
      { id: "valorant", icon: "┼", label: "Valorant" },
      { id: "cs2", icon: "┼", label: "CS2 经典" },
      { id: "dot", icon: "●", label: "纯圆点" },
      { id: "crosshair", icon: "┼", label: "细十字" },
      { id: "circle", icon: "○", label: "空心圆" },
      { id: "chevron", icon: "⋀", label: "V 形" }
    ];
    function rgba(hex, a) {
      return `rgba(${parseInt(hex.slice(1, 3), 16)},${parseInt(hex.slice(3, 5), 16)},${parseInt(hex.slice(5, 7), 16)},${a})`;
    }
    const previewDot = computed(() => {
      const s = { width: `${cfg.dotThickness}px`, height: `${cfg.dotThickness}px`, background: rgba(cfg.color, cfg.dotOpacity) };
      if (cfg.outlines) s.boxShadow = `0 0 0 ${cfg.outlineThickness}px rgba(0,0,0,${cfg.outlineOpacity})`;
      return s;
    });
    function previewLine(dir) {
      const isH = dir === "left" || dir === "right";
      const s = { position: "absolute", background: rgba(cfg.color, 1), borderRadius: "1px" };
      const len = isH ? Math.round(cfg.length * cfg.scaleX) : Math.round(cfg.length * cfg.scaleY);
      const thick = isH ? Math.round(cfg.thickness * cfg.scaleY) : Math.round(cfg.thickness * cfg.scaleX);
      if (isH) {
        s.width = `${len}px`;
        s.height = `${thick}px`;
      } else {
        s.width = `${thick}px`;
        s.height = `${len}px`;
      }
      const ht = thick / 2;
      if (dir === "top") {
        s.bottom = `${cfg.gap}px`;
        s.left = `calc(50% - ${ht}px)`;
      }
      if (dir === "bottom") {
        s.top = `${cfg.gap}px`;
        s.left = `calc(50% - ${ht}px)`;
      }
      if (dir === "left") {
        s.right = `${cfg.gap}px`;
        s.top = `calc(50% - ${ht}px)`;
      }
      if (dir === "right") {
        s.left = `${cfg.gap}px`;
        s.top = `calc(50% - ${ht}px)`;
      }
      if (cfg.outlines) s.boxShadow = `0 0 0 ${cfg.outlineThickness}px rgba(0,0,0,${cfg.outlineOpacity})`;
      return s;
    }
    function previewChevron(side) {
      const len = Math.round(cfg.length * cfg.scaleX);
      const thick = Math.round(cfg.thickness * cfg.scaleY);
      const gap = cfg.gap;
      const color = rgba(cfg.color, 1);
      const angle = side === "left" ? -35 : 35;
      const s = {
        position: "absolute",
        width: `${len}px`,
        height: `${thick}px`,
        background: color,
        borderRadius: "1px",
        transformOrigin: side === "left" ? "right center" : "left center",
        transform: `rotate(${angle}deg)`
      };
      if (side === "left") {
        s.right = `${gap}px`;
        s.top = `calc(50% - ${thick / 2}px)`;
      } else {
        s.left = `${gap}px`;
        s.top = `calc(50% - ${thick / 2}px)`;
      }
      if (cfg.outlines) s.boxShadow = `0 0 0 ${cfg.outlineThickness}px rgba(0,0,0,${cfg.outlineOpacity})`;
      return s;
    }
    const previewRing = computed(() => {
      const sizeX = Math.round(cfg.length * 2 * cfg.scaleX);
      const sizeY = Math.round(cfg.length * 2 * cfg.scaleY);
      const thick = Math.round(cfg.thickness * ((cfg.scaleX + cfg.scaleY) / 2));
      const color = rgba(cfg.color, 1);
      const s = {
        position: "absolute",
        width: `${sizeX}px`,
        height: `${sizeY}px`,
        borderRadius: "50%",
        border: `${thick}px solid ${color}`,
        background: "transparent",
        transform: "translate(-50%, -50%)"
      };
      if (cfg.outlines) {
        s.boxShadow = `0 0 0 ${cfg.outlineThickness}px rgba(0,0,0,${cfg.outlineOpacity})`;
      }
      return s;
    });
    const SHAPE_MAP = { cross: 0, dot: 1, circle: 2, chevron: 3 };
    const SHAPE_REV = ["cross", "dot", "circle", "chevron"];
    function encode(s) {
      try {
        const buf = new Uint8Array(11);
        const si = SHAPE_MAP[s.shape] ?? 0;
        buf[0] = si << 6 | (s.thickness & 15) << 2 | s.length >> 4 & 3;
        buf[1] = (s.length & 15) << 4 | s.gap & 15;
        buf[2] = (s.outlines ? 1 : 0) << 7 | (s.centerDot ? 1 : 0) << 6 | (s.outlineThickness & 7) << 3 | s.dotThickness >> 1 & 7;
        const scaleX_scaled = Math.round((s.scaleX - 0.5) / 0.1);
        const scaleX_clamped = Math.max(0, Math.min(31, Math.round(scaleX_scaled)));
        buf[3] = s.dotThickness & 1 | // bit0: dotThick_lo
        scaleX_clamped << 1 | // bits 1-5: scaleX
        0 << 6 | // bit6: pad (0)
        0 << 7;
        const r = parseInt(s.color.slice(1, 3), 16), g = parseInt(s.color.slice(3, 5), 16), b = parseInt(s.color.slice(5, 7), 16);
        buf[4] = r;
        buf[5] = g;
        buf[6] = b;
        buf[7] = s.offsetX + 50;
        buf[8] = s.offsetY + 50;
        const oo = Math.round(s.outlineOpacity * 20);
        const do_hi = Math.round(s.dotOpacity * 20) >> 2;
        buf[9] = (oo & 31) << 3 | do_hi & 7;
        const do_low = Math.round(s.dotOpacity * 20) & 3;
        const scaleY_scaled = Math.round((s.scaleY - 0.5) / 0.1);
        const scaleY_clamped = Math.max(0, Math.min(31, Math.round(scaleY_scaled)));
        buf[10] = do_low & 3 | // bits 0-1: dotOpacity_lo
        scaleY_clamped << 2 | // bits 2-6: scaley
        0 << 7;
        const bin = Array.from(buf, (b2) => String.fromCharCode(b2)).join("");
        return "WUJI-" + btoa(bin);
      } catch {
        return "";
      }
    }
    function decode(code) {
      try {
        let b64 = code.trim();
        if (b64.startsWith("WUJI-")) b64 = b64.slice(5);
        const bin = atob(b64);
        if (bin.length < 10) return null;
        const b = Uint8Array.from(bin, (c) => c.charCodeAt(0));
        const si = b[0] >> 6 & 3;
        const thick = b[0] >> 2 & 15;
        const len = (b[0] & 3) << 4 | b[1] >> 4 & 15;
        const gap = b[1] & 15;
        const outlines = !!(b[2] & 128);
        const centerDot = !!(b[2] & 64);
        const outThick = b[2] >> 3 & 7;
        const dotThick_lo = b[3] & 1;
        const scaleX_code = b[3] >> 1 & 31;
        const dotThick = (b[2] & 7) << 1 | dotThick_lo;
        const scaleX = 0.5 + scaleX_code * 0.1;
        const color = "#" + [b[4], b[5], b[6]].map((v) => v.toString(16).padStart(2, "0")).join("");
        const ox = b[7] - 50, oy = b[8] - 50;
        const oo = (b[9] >> 3 & 31) / 20;
        const do_hi = (b[9] & 7) << 2;
        const do_low = b[10] & 3;
        const scaleY_code = b[10] >> 2 & 31;
        const dd = (do_hi | do_low) / 20;
        const scaleY = 0.5 + scaleY_code * 0.1;
        return {
          ...DEFAULT,
          shape: SHAPE_REV[si] ?? "cross",
          thickness: Math.max(1, Math.min(12, thick)),
          length: Math.max(2, Math.min(40, len)),
          gap: Math.max(0, Math.min(15, gap)),
          outlines,
          centerDot,
          outlineThickness: Math.max(1, Math.min(6, outThick)),
          dotThickness: Math.max(2, Math.min(15, dotThick)),
          outlineOpacity: Math.max(0.1, Math.min(1, oo)),
          dotOpacity: Math.max(0.05, Math.min(1, dd)),
          color,
          offsetX: Math.max(-50, Math.min(50, ox)),
          offsetY: Math.max(-50, Math.min(50, oy)),
          scaleX: Math.max(0.5, Math.min(3, scaleX)),
          scaleY: Math.max(0.5, Math.min(3, scaleY))
        };
      } catch {
        return null;
      }
    }
    function doExport() {
      const c = cfg.legacyPreset ? encodeLegacyCrosshair(cfg.legacyPreset) : encode({ ...cfg });
      if (!c) {
        importMsg.value = "导出失败";
        importOk.value = false;
        return;
      }
      importCode.value = c;
      navigator.clipboard.writeText(c).then(() => {
        importMsg.value = "已复制到剪贴板! 可直接粘贴导入";
        importOk.value = true;
      }).catch(() => {
        importMsg.value = "⚠ 手动复制上方文本框内的准星码";
        importOk.value = false;
      });
    }
    function doImport() {
      if (!importCode.value.trim()) {
        importMsg.value = "请粘贴准星码";
        importOk.value = false;
        return;
      }
      if (importCode.value.trim().startsWith("HXC1-")) {
        try {
          cfg.legacyPreset = decodeLegacyCrosshair(importCode.value.trim());
          importMsg.value = "准星导入成功！";
          importOk.value = true;
          pushToOverlay();
        } catch (e) {
          importMsg.value = e instanceof Error ? e.message : "配置码无效";
          importOk.value = false;
        }
        return;
      }
      const d = decode(importCode.value);
      if (!d) {
        importMsg.value = "准星码无效";
        importOk.value = false;
        return;
      }
      Object.assign(cfg, d, { legacyPreset: null });
      importMsg.value = "导入成功!";
      importOk.value = true;
      pushToOverlay();
    }
    function applySavedProfile(value) {
      Object.assign(cfg, crosshairProfile(value));
      pushToOverlay();
    }
    function overlaySettings() {
      return JSON.parse(JSON.stringify(cfg));
    }
    function pushToOverlay() {
      if (overlayOn.value && window.crosshairApi) window.crosshairApi.update(overlaySettings());
    }
    const PRESET_MAP = {
      valorant: { shape: "cross", color: "#00ff00", thickness: 2, length: 8, gap: 3, centerDot: true, dotThickness: 2, outlines: true, outlineThickness: 1 },
      cs2: { shape: "cross", color: "#00ff00", thickness: 2, length: 10, gap: 2, centerDot: false, outlines: false },
      dot: { shape: "dot", color: "#ff0000", centerDot: true, dotThickness: 4, dotOpacity: 0.9 },
      crosshair: { shape: "cross", color: "#00bfff", thickness: 1, length: 20, gap: 8, outlines: true, outlineThickness: 2 },
      circle: { shape: "circle", color: "#00ff00", thickness: 2, length: 8, gap: 0, centerDot: true, dotThickness: 6, outlines: true },
      chevron: { shape: "chevron", color: "#00ff00", thickness: 3, length: 18, gap: 6, centerDot: false, outlines: true, outlineThickness: 2 }
    };
    function loadPreset(id) {
      const p = PRESET_MAP[id];
      if (p) {
        const sx = cfg.scaleX, sy = cfg.scaleY;
        Object.assign(cfg, p);
        cfg.scaleX = sx;
        cfg.scaleY = sy;
      }
    }
    async function toggleOverlay() {
      if (!window.crosshairApi) return;
      if (overlayOn.value) {
        await window.crosshairApi.toggle(false);
        overlayOn.value = false;
      } else {
        const r = await window.crosshairApi.toggle(true);
        if (r.success) {
          overlayOn.value = true;
          window.crosshairApi.update(overlaySettings());
        }
      }
    }
    let unwatch = null;
    let unsubSync = null;
    let unsubState = null;
    onMounted(async () => {
      if (window.crosshairApi) {
        try {
          const saved = await window.crosshairApi.getConfig?.();
          if (saved && typeof saved === "object" && Object.keys(saved).length > 0) {
            Object.assign(cfg, saved);
          }
        } catch {
        }
        const state = await window.crosshairApi.getState();
        if (state.isOpen) overlayOn.value = true;
        unsubSync = window.crosshairApi.onSync((s) => {
        });
        unsubState = window.crosshairApi.onState?.((s) => {
          overlayOn.value = s.isOpen;
        }) ?? null;
      }
      unwatch = watch(() => ({ ...cfg }), (v) => {
        if (overlayOn.value && window.crosshairApi) window.crosshairApi.update(overlaySettings());
      }, { deep: true });
    });
    onUnmounted(() => {
      unwatch?.();
      unsubSync?.();
      unsubState?.();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          _cache[22] || (_cache[22] = createStaticVNode('<div class="page-icon" style="background:rgba(244,63,94,0.08);" data-v-85887abe><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f43f5e" stroke-width="1.5" data-v-85887abe><circle cx="12" cy="12" r="10" data-v-85887abe></circle><line x1="12" y1="2" x2="12" y2="22" data-v-85887abe></line><line x1="2" y1="12" x2="22" y2="12" data-v-85887abe></line></svg></div><div data-v-85887abe><h2 class="page-title" data-v-85887abe>游戏准星</h2><p class="page-desc" data-v-85887abe>专业电竞级屏幕覆盖 · 对标 Valorant / CS2</p></div>', 2)),
          createBaseVNode("div", _hoisted_3, [
            _cache[21] || (_cache[21] = createBaseVNode("span", {
              class: "shortcut-hint",
              title: "全局快捷键"
            }, [
              createBaseVNode("kbd", null, "Ctrl"),
              createTextVNode("+"),
              createBaseVNode("kbd", null, "Alt"),
              createTextVNode("+"),
              createBaseVNode("kbd", null, "O"),
              createTextVNode(" 切换 ")
            ], -1)),
            createBaseVNode("button", {
              class: "action-btn silver",
              onClick: _cache[0] || (_cache[0] = ($event) => cfg.legacyPreset = unref(A)({}))
            }, "高级预设"),
            createBaseVNode("button", {
              class: "action-btn silver",
              onClick: _cache[1] || (_cache[1] = ($event) => showImport.value = !showImport.value)
            }, "准星码"),
            createBaseVNode("button", {
              "data-tour": "crosshair-toggle",
              class: normalizeClass(["action-btn", overlayOn.value ? "red" : "green"]),
              onClick: toggleOverlay
            }, toDisplayString(overlayOn.value ? "⏹ 关闭覆盖" : "▶ 启用覆盖"), 3)
          ])
        ]),
        showImport.value ? (openBlock(), createElementBlock("div", _hoisted_4, [
          createBaseVNode("div", _hoisted_5, [
            withDirectives(createBaseVNode("input", {
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => importCode.value = $event),
              placeholder: "粘贴准星码 (WUJI-... / HXC1-...)",
              class: "code-input",
              onKeyup: withKeys(doImport, ["enter"])
            }, null, 544), [
              [vModelText, importCode.value]
            ]),
            createBaseVNode("button", {
              class: "mini-btn",
              onClick: doImport
            }, "导入"),
            createBaseVNode("button", {
              class: "mini-btn",
              onClick: doExport
            }, "导出到剪贴板")
          ]),
          importMsg.value ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(["import-msg", importOk.value ? "ok" : "err"])
          }, toDisplayString(importMsg.value), 3)) : createCommentVNode("", true)
        ])) : createCommentVNode("", true),
        createVNode(LocalInputPresets, {
          title: "准星",
          kind: "supreme-crosshair-presets",
          value: { ...cfg },
          validate: unref(crosshairProfile),
          onLoad: applySavedProfile
        }, null, 8, ["value", "validate"]),
        createBaseVNode("div", _hoisted_6, [
          createBaseVNode("div", _hoisted_7, [
            cfg.legacyPreset ? (openBlock(), createBlock(LegacyCrosshairPreview, {
              key: 0,
              settings: cfg.legacyPreset
            }, null, 8, ["settings"])) : (openBlock(), createElementBlock("div", _hoisted_8, [
              cfg.centerDot ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: "pv-dot",
                style: normalizeStyle(previewDot.value)
              }, null, 4)) : createCommentVNode("", true),
              cfg.shape === "chevron" ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                createBaseVNode("div", {
                  class: "pv-chevron-l",
                  style: normalizeStyle(previewChevron("left"))
                }, null, 4),
                createBaseVNode("div", {
                  class: "pv-chevron-r",
                  style: normalizeStyle(previewChevron("right"))
                }, null, 4)
              ], 64)) : cfg.shape === "circle" ? (openBlock(), createElementBlock("div", {
                key: 2,
                class: "pv-ring",
                style: normalizeStyle(previewRing.value)
              }, null, 4)) : cfg.shape !== "dot" ? (openBlock(), createElementBlock(Fragment, { key: 3 }, [
                createBaseVNode("div", {
                  class: "pv-line top",
                  style: normalizeStyle(previewLine("top"))
                }, null, 4),
                createBaseVNode("div", {
                  class: "pv-line bottom",
                  style: normalizeStyle(previewLine("bottom"))
                }, null, 4),
                createBaseVNode("div", {
                  class: "pv-line left",
                  style: normalizeStyle(previewLine("left"))
                }, null, 4),
                createBaseVNode("div", {
                  class: "pv-line right",
                  style: normalizeStyle(previewLine("right"))
                }, null, 4)
              ], 64)) : createCommentVNode("", true)
            ])),
            cfg.offsetX || cfg.offsetY ? (openBlock(), createElementBlock("div", _hoisted_9, "偏移 X:" + toDisplayString(cfg.offsetX) + " Y:" + toDisplayString(cfg.offsetY), 1)) : createCommentVNode("", true)
          ])
        ]),
        cfg.legacyPreset ? (openBlock(), createElementBlock("div", _hoisted_10, [
          _cache[23] || (_cache[23] = createTextVNode("已载入高级准星参数，预览与屏幕准星同步显示。", -1)),
          createBaseVNode("button", {
            class: "mini-btn",
            onClick: _cache[3] || (_cache[3] = ($event) => cfg.legacyPreset = null)
          }, "切换到基础编辑器"),
          createVNode(LegacyCrosshairEditor, {
            modelValue: cfg.legacyPreset,
            "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => cfg.legacyPreset = $event)
          }, null, 8, ["modelValue"])
        ])) : createCommentVNode("", true),
        createBaseVNode("div", {
          class: normalizeClass(["content-grid", { "legacy-active": cfg.legacyPreset }])
        }, [
          createBaseVNode("div", _hoisted_11, [
            createBaseVNode("div", _hoisted_12, [
              _cache[24] || (_cache[24] = createBaseVNode("div", { class: "section-title" }, "🎯 准星形状", -1)),
              createBaseVNode("div", _hoisted_13, [
                (openBlock(), createElementBlock(Fragment, null, renderList(shapes, (s) => {
                  return createBaseVNode("button", {
                    key: s.id,
                    class: normalizeClass(["shape-btn", { active: cfg.shape === s.id }]),
                    onClick: ($event) => cfg.shape = s.id
                  }, [
                    createBaseVNode("span", _hoisted_15, toDisplayString(s.icon), 1),
                    createBaseVNode("span", _hoisted_16, toDisplayString(s.label), 1)
                  ], 10, _hoisted_14);
                }), 64))
              ])
            ]),
            createBaseVNode("div", _hoisted_17, [
              _cache[25] || (_cache[25] = createBaseVNode("div", { class: "section-title" }, "🎨 颜色", -1)),
              createBaseVNode("div", _hoisted_18, [
                withDirectives(createBaseVNode("input", {
                  type: "color",
                  "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => cfg.color = $event),
                  class: "color-picker"
                }, null, 512), [
                  [vModelText, cfg.color]
                ]),
                createBaseVNode("span", _hoisted_19, toDisplayString(cfg.color), 1)
              ]),
              createBaseVNode("div", _hoisted_20, [
                (openBlock(), createElementBlock(Fragment, null, renderList(quickColors, (c) => {
                  return createBaseVNode("button", {
                    key: c,
                    class: normalizeClass(["q-color", { active: cfg.color === c }]),
                    style: normalizeStyle({ background: c }),
                    onClick: ($event) => cfg.color = c
                  }, null, 14, _hoisted_21);
                }), 64))
              ])
            ]),
            createBaseVNode("div", _hoisted_22, [
              _cache[26] || (_cache[26] = createBaseVNode("div", { class: "section-title" }, "🔰 快速预设", -1)),
              createBaseVNode("div", _hoisted_23, [
                (openBlock(), createElementBlock(Fragment, null, renderList(presets, (p) => {
                  return createBaseVNode("button", {
                    key: p.id,
                    class: "preset-card",
                    onClick: ($event) => loadPreset(p.id)
                  }, [
                    createBaseVNode("span", _hoisted_25, toDisplayString(p.icon), 1),
                    createBaseVNode("span", null, toDisplayString(p.label), 1)
                  ], 8, _hoisted_24);
                }), 64))
              ])
            ])
          ]),
          createBaseVNode("div", _hoisted_26, [
            createBaseVNode("div", {
              class: normalizeClass(["card", { dimmed: cfg.shape === "dot" }])
            }, [
              createBaseVNode("div", _hoisted_27, toDisplayString(cfg.shape === "chevron" ? "⋀ V形参数" : "┼ 线条参数"), 1),
              createBaseVNode("div", _hoisted_28, [
                createBaseVNode("div", _hoisted_29, [
                  _cache[27] || (_cache[27] = createBaseVNode("span", { class: "lbl" }, "粗细", -1)),
                  withDirectives(createBaseVNode("input", {
                    type: "range",
                    min: "1",
                    max: "12",
                    step: "1",
                    "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => cfg.thickness = $event),
                    disabled: cfg.shape === "dot"
                  }, null, 8, _hoisted_30), [
                    [
                      vModelText,
                      cfg.thickness,
                      void 0,
                      { number: true }
                    ]
                  ]),
                  createBaseVNode("span", _hoisted_31, toDisplayString(cfg.thickness) + "px", 1)
                ]),
                createBaseVNode("div", _hoisted_32, [
                  _cache[28] || (_cache[28] = createBaseVNode("span", { class: "lbl" }, "长度", -1)),
                  withDirectives(createBaseVNode("input", {
                    type: "range",
                    min: "2",
                    max: "40",
                    step: "1",
                    "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => cfg.length = $event),
                    disabled: cfg.shape === "dot"
                  }, null, 8, _hoisted_33), [
                    [
                      vModelText,
                      cfg.length,
                      void 0,
                      { number: true }
                    ]
                  ]),
                  createBaseVNode("span", _hoisted_34, toDisplayString(cfg.length) + "px", 1)
                ]),
                createBaseVNode("div", _hoisted_35, [
                  _cache[29] || (_cache[29] = createBaseVNode("span", { class: "lbl" }, "中心间距", -1)),
                  withDirectives(createBaseVNode("input", {
                    type: "range",
                    min: "0",
                    max: "15",
                    step: "1",
                    "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => cfg.gap = $event),
                    disabled: cfg.shape === "dot"
                  }, null, 8, _hoisted_36), [
                    [
                      vModelText,
                      cfg.gap,
                      void 0,
                      { number: true }
                    ]
                  ]),
                  createBaseVNode("span", _hoisted_37, toDisplayString(cfg.gap) + "px", 1)
                ])
              ]),
              cfg.shape === "dot" ? (openBlock(), createElementBlock("div", _hoisted_38, "纯圆点模式 — 线条参数禁用")) : createCommentVNode("", true)
            ], 2)
          ]),
          createBaseVNode("div", _hoisted_39, [
            createBaseVNode("div", _hoisted_40, [
              createBaseVNode("div", _hoisted_41, [
                _cache[31] || (_cache[31] = createTextVNode("● 中心圆点 ", -1)),
                createBaseVNode("label", _hoisted_42, [
                  withDirectives(createBaseVNode("input", {
                    type: "checkbox",
                    "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => cfg.centerDot = $event)
                  }, null, 512), [
                    [vModelCheckbox, cfg.centerDot]
                  ]),
                  _cache[30] || (_cache[30] = createBaseVNode("span", { class: "tg" }, null, -1))
                ])
              ]),
              cfg.centerDot ? (openBlock(), createElementBlock("div", _hoisted_43, [
                createBaseVNode("div", _hoisted_44, [
                  _cache[32] || (_cache[32] = createBaseVNode("span", { class: "lbl" }, "不透明度", -1)),
                  withDirectives(createBaseVNode("input", {
                    type: "range",
                    min: "0.05",
                    max: "1",
                    step: "0.05",
                    "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => cfg.dotOpacity = $event)
                  }, null, 512), [
                    [
                      vModelText,
                      cfg.dotOpacity,
                      void 0,
                      { number: true }
                    ]
                  ]),
                  createBaseVNode("span", _hoisted_45, toDisplayString(Math.round(cfg.dotOpacity * 100)) + "%", 1)
                ]),
                createBaseVNode("div", _hoisted_46, [
                  _cache[33] || (_cache[33] = createBaseVNode("span", { class: "lbl" }, "大小", -1)),
                  withDirectives(createBaseVNode("input", {
                    type: "range",
                    min: "2",
                    max: "15",
                    step: "1",
                    "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => cfg.dotThickness = $event)
                  }, null, 512), [
                    [
                      vModelText,
                      cfg.dotThickness,
                      void 0,
                      { number: true }
                    ]
                  ]),
                  createBaseVNode("span", _hoisted_47, toDisplayString(cfg.dotThickness) + "px", 1)
                ])
              ])) : createCommentVNode("", true)
            ]),
            createBaseVNode("div", _hoisted_48, [
              createBaseVNode("div", _hoisted_49, [
                _cache[35] || (_cache[35] = createTextVNode("◌ 轮廓描边 ", -1)),
                createBaseVNode("label", _hoisted_50, [
                  withDirectives(createBaseVNode("input", {
                    type: "checkbox",
                    "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => cfg.outlines = $event)
                  }, null, 512), [
                    [vModelCheckbox, cfg.outlines]
                  ]),
                  _cache[34] || (_cache[34] = createBaseVNode("span", { class: "tg" }, null, -1))
                ])
              ]),
              cfg.outlines ? (openBlock(), createElementBlock("div", _hoisted_51, [
                createBaseVNode("div", _hoisted_52, [
                  _cache[36] || (_cache[36] = createBaseVNode("span", { class: "lbl" }, "不透明度", -1)),
                  withDirectives(createBaseVNode("input", {
                    type: "range",
                    min: "0.1",
                    max: "1",
                    step: "0.05",
                    "onUpdate:modelValue": _cache[13] || (_cache[13] = ($event) => cfg.outlineOpacity = $event)
                  }, null, 512), [
                    [
                      vModelText,
                      cfg.outlineOpacity,
                      void 0,
                      { number: true }
                    ]
                  ]),
                  createBaseVNode("span", _hoisted_53, toDisplayString(Math.round(cfg.outlineOpacity * 100)) + "%", 1)
                ]),
                createBaseVNode("div", _hoisted_54, [
                  _cache[37] || (_cache[37] = createBaseVNode("span", { class: "lbl" }, "粗细", -1)),
                  withDirectives(createBaseVNode("input", {
                    type: "range",
                    min: "1",
                    max: "6",
                    step: "1",
                    "onUpdate:modelValue": _cache[14] || (_cache[14] = ($event) => cfg.outlineThickness = $event)
                  }, null, 512), [
                    [
                      vModelText,
                      cfg.outlineThickness,
                      void 0,
                      { number: true }
                    ]
                  ]),
                  createBaseVNode("span", _hoisted_55, toDisplayString(cfg.outlineThickness) + "px", 1)
                ])
              ])) : createCommentVNode("", true)
            ]),
            createBaseVNode("div", _hoisted_56, [
              _cache[40] || (_cache[40] = createBaseVNode("div", { class: "section-title" }, "↔ 位置偏移", -1)),
              createBaseVNode("div", _hoisted_57, [
                createBaseVNode("div", _hoisted_58, [
                  _cache[38] || (_cache[38] = createBaseVNode("span", { class: "lbl" }, "X", -1)),
                  createBaseVNode("div", _hoisted_59, [
                    createBaseVNode("button", {
                      onClick: _cache[15] || (_cache[15] = ($event) => cfg.offsetX = Math.max(-50, cfg.offsetX - 1))
                    }, "−"),
                    createBaseVNode("span", _hoisted_60, toDisplayString(cfg.offsetX), 1),
                    createBaseVNode("button", {
                      onClick: _cache[16] || (_cache[16] = ($event) => cfg.offsetX = Math.min(50, cfg.offsetX + 1))
                    }, "+")
                  ])
                ]),
                createBaseVNode("div", _hoisted_61, [
                  _cache[39] || (_cache[39] = createBaseVNode("span", { class: "lbl" }, "Y", -1)),
                  createBaseVNode("div", _hoisted_62, [
                    createBaseVNode("button", {
                      onClick: _cache[17] || (_cache[17] = ($event) => cfg.offsetY = Math.max(-50, cfg.offsetY - 1))
                    }, "−"),
                    createBaseVNode("span", _hoisted_63, toDisplayString(cfg.offsetY), 1),
                    createBaseVNode("button", {
                      onClick: _cache[18] || (_cache[18] = ($event) => cfg.offsetY = Math.min(50, cfg.offsetY + 1))
                    }, "+")
                  ])
                ])
              ])
            ]),
            createBaseVNode("div", _hoisted_64, [
              _cache[43] || (_cache[43] = createBaseVNode("div", { class: "section-title" }, "↕ 拉伸缩放", -1)),
              createBaseVNode("div", _hoisted_65, [
                createBaseVNode("div", _hoisted_66, [
                  _cache[41] || (_cache[41] = createBaseVNode("span", { class: "lbl" }, "X 轴", -1)),
                  withDirectives(createBaseVNode("input", {
                    type: "range",
                    min: "0.5",
                    max: "3",
                    step: "0.1",
                    "onUpdate:modelValue": _cache[19] || (_cache[19] = ($event) => cfg.scaleX = $event)
                  }, null, 512), [
                    [
                      vModelText,
                      cfg.scaleX,
                      void 0,
                      { number: true }
                    ]
                  ]),
                  createBaseVNode("span", _hoisted_67, toDisplayString(cfg.scaleX.toFixed(1)) + "x", 1)
                ]),
                createBaseVNode("div", _hoisted_68, [
                  _cache[42] || (_cache[42] = createBaseVNode("span", { class: "lbl" }, "Y 轴", -1)),
                  withDirectives(createBaseVNode("input", {
                    type: "range",
                    min: "0.5",
                    max: "3",
                    step: "0.1",
                    "onUpdate:modelValue": _cache[20] || (_cache[20] = ($event) => cfg.scaleY = $event)
                  }, null, 512), [
                    [
                      vModelText,
                      cfg.scaleY,
                      void 0,
                      { number: true }
                    ]
                  ]),
                  createBaseVNode("span", _hoisted_69, toDisplayString(cfg.scaleY.toFixed(1)) + "x", 1)
                ])
              ])
            ]),
            _cache[44] || (_cache[44] = createStaticVNode('<div class="info-list" style="margin-top:8px;" data-v-85887abe><div class="info-row" data-v-85887abe>覆盖层在所有窗口最前端</div><div class="info-row" data-v-85887abe>鼠标穿透，不影响游戏操作</div><div class="info-row warn" data-v-85887abe>部分游戏反作弊可能检测覆盖层</div><div class="info-row warn" style="color:rgba(251,191,36,0.7);display:flex;align-items:center;gap:6px;" data-v-85887abe><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-v-85887abe><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" data-v-85887abe></path><line x1="12" y1="9" x2="12" y2="13" data-v-85887abe></line><line x1="12" y1="17" x2="12.01" y2="17" data-v-85887abe></line></svg><span data-v-85887abe>仅在全屏窗口化（无边框）模式下生效，<br data-v-85887abe>全屏独占模式无法显示</span></div></div>', 1))
          ])
        ], 2)
      ]);
    };
  }
});
const CrosshairControl = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-85887abe"]]);
export {
  CrosshairControl as default
};
