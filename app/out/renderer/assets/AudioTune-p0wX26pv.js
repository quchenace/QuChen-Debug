import { T as TweakShelf } from "./TweakShelf-BggrlQpq.js";
import { t as defineComponent, a5 as openBlock, l as createElementBlock, p as createStaticVNode, r as createVNode, _ as _export_sfc } from "./main-DAqTdO6U.js";
import "./index-CL4m76NE.js";
import "./StatusDot-C-XeYEe8.js";
import "./KeywordConfirm-CUMT0nLF.js";
const _hoisted_1 = { class: "page audio-tune-page" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AudioTune",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        _cache[0] || (_cache[0] = createStaticVNode('<div class="page-header" data-v-50d2ad4e><div class="page-icon" data-v-50d2ad4e><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="1.5" data-v-50d2ad4e><path d="M9 18V5l12-2v13" data-v-50d2ad4e></path><circle cx="6" cy="18" r="3" data-v-50d2ad4e></circle><circle cx="18" cy="16" r="3" data-v-50d2ad4e></circle></svg></div><div class="page-title-block" data-v-50d2ad4e><h2 class="page-title" data-v-50d2ad4e>音频优化</h2><p class="page-desc" data-v-50d2ad4e>系统音频调度 · 服务 · 增强设置</p></div></div>', 1)),
        createVNode(TweakShelf, {
          files: ["AudioTweaks.json"],
          title: "音频优化",
          dangerNote: "修改系统音频调度与服务设置,可随时还原",
          overview: "",
          "device-probe": "audio"
        })
      ]);
    };
  }
});
const AudioTune = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-50d2ad4e"]]);
export {
  AudioTune as default
};
