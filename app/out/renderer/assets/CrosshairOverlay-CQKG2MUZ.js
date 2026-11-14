import { L as LegacyCrosshairPreview } from "./LegacyCrosshairPreview-DwpWYNlI.js";
import { t as defineComponent, a1 as onMounted, a3 as onUnmounted, a5 as openBlock, l as createElementBlock, i as createBaseVNode, j as createBlock, F as Fragment, V as normalizeStyle, k as createCommentVNode, a7 as reactive, g as computed, _ as _export_sfc } from "./main-DAqTdO6U.js";
const _hoisted_1 = { class: "overlay-root" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CrosshairOverlay",
  setup(__props) {
    const DEFAULT = {
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
      dotOpacity: 0.8,
      dotThickness: 4,
      scaleX: 1,
      scaleY: 1
    };
    const cfg = reactive({ ...DEFAULT });
    let unsubSync = null;
    onMounted(() => {
      if (window.crosshairApi?.onSync) {
        unsubSync = window.crosshairApi.onSync((s) => {
          Object.assign(cfg, s);
        });
      }
      if (window.crosshairApi?.ready) {
        window.crosshairApi.ready();
      }
    });
    onUnmounted(() => {
      if (unsubSync) {
        unsubSync();
        unsubSync = null;
      }
    });
    const containerStyle = computed(() => ({
      "--cx": `${cfg.offsetX || 0}px`,
      "--cy": `${cfg.offsetY || 0}px`
    }));
    function rgba(hex, a) {
      const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r},${g},${b},${a})`;
    }
    const dotStyle = computed(() => {
      const s = {
        width: `${cfg.dotThickness}px`,
        height: `${cfg.dotThickness}px`,
        background: rgba(cfg.color, cfg.dotOpacity)
      };
      if (cfg.outlines) s.boxShadow = `0 0 0 ${cfg.outlineThickness}px rgba(0,0,0,${cfg.outlineOpacity})`;
      return s;
    });
    function lineStyle(dir) {
      const isH = dir === "left" || dir === "right";
      const len = isH ? Math.round(cfg.length * cfg.scaleX) : Math.round(cfg.length * cfg.scaleY);
      const thick = isH ? Math.round(cfg.thickness * cfg.scaleY) : Math.round(cfg.thickness * cfg.scaleX);
      const ht = thick / 2;
      const s = { position: "absolute", background: rgba(cfg.color, 1), borderRadius: "1px" };
      if (isH) {
        s.width = `${len}px`;
        s.height = `${thick}px`;
      } else {
        s.width = `${thick}px`;
        s.height = `${len}px`;
      }
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
    const ringStyle = computed(() => {
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
        transform: "translate(-50%, -50%)",
        left: "0",
        top: "0"
      };
      if (cfg.outlines) {
        s.boxShadow = `0 0 0 ${cfg.outlineThickness}px rgba(0,0,0,${cfg.outlineOpacity})`;
      }
      return s;
    });
    function chevronStyle(side) {
      const len = Math.round(cfg.length * cfg.scaleX);
      const thick = Math.round(cfg.thickness * cfg.scaleY);
      const ht = thick / 2;
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
        s.right = `${cfg.gap}px`;
        s.top = `calc(50% - ${ht}px)`;
      } else {
        s.left = `${cfg.gap}px`;
        s.top = `calc(50% - ${ht}px)`;
      }
      if (cfg.outlines) s.boxShadow = `0 0 0 ${cfg.outlineThickness}px rgba(0,0,0,${cfg.outlineOpacity})`;
      return s;
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", {
          class: "crosshair-container",
          style: normalizeStyle(containerStyle.value)
        }, [
          cfg.legacyPreset ? (openBlock(), createBlock(LegacyCrosshairPreview, {
            key: 0,
            settings: cfg.legacyPreset
          }, null, 8, ["settings"])) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            cfg.centerDot ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: "center-dot",
              style: normalizeStyle(dotStyle.value)
            }, null, 4)) : createCommentVNode("", true),
            cfg.shape === "chevron" ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              createBaseVNode("div", {
                class: "line chevron-left",
                style: normalizeStyle(chevronStyle("left"))
              }, null, 4),
              createBaseVNode("div", {
                class: "line chevron-right",
                style: normalizeStyle(chevronStyle("right"))
              }, null, 4)
            ], 64)) : cfg.shape === "circle" ? (openBlock(), createElementBlock("div", {
              key: 2,
              class: "hollow-ring",
              style: normalizeStyle(ringStyle.value)
            }, null, 4)) : cfg.shape !== "dot" ? (openBlock(), createElementBlock(Fragment, { key: 3 }, [
              createBaseVNode("div", {
                class: "line top",
                style: normalizeStyle(lineStyle("top"))
              }, null, 4),
              createBaseVNode("div", {
                class: "line bottom",
                style: normalizeStyle(lineStyle("bottom"))
              }, null, 4),
              createBaseVNode("div", {
                class: "line left",
                style: normalizeStyle(lineStyle("left"))
              }, null, 4),
              createBaseVNode("div", {
                class: "line right",
                style: normalizeStyle(lineStyle("right"))
              }, null, 4)
            ], 64)) : createCommentVNode("", true)
          ], 64))
        ], 4)
      ]);
    };
  }
});
const CrosshairOverlay = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e38acf88"]]);
export {
  CrosshairOverlay as default
};
