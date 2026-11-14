import { T as TweakShelf } from "./TweakShelf-BggrlQpq.js";
import { t as defineComponent, a5 as openBlock, l as createElementBlock, p as createStaticVNode, r as createVNode, _ as _export_sfc } from "./main-DAqTdO6U.js";
import "./index-CL4m76NE.js";
import "./StatusDot-C-XeYEe8.js";
import "./KeywordConfirm-CUMT0nLF.js";
const _hoisted_1 = { class: "page privacy-page" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PrivacyGuard",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        _cache[0] || (_cache[0] = createStaticVNode('<div class="page-header" data-v-2c50fc50><div class="page-icon" data-v-2c50fc50><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="1.5" data-v-2c50fc50><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" data-v-2c50fc50></path><polyline points="9 12 11 14 15 10" data-v-2c50fc50></polyline></svg></div><div class="page-title-block" data-v-2c50fc50><h2 class="page-title" data-v-2c50fc50>隐私防护</h2><p class="page-desc" data-v-2c50fc50>遥测 · 广告 ID · App 权限 · Windows AI(Recall/Copilot)· 摄像头 · OneDrive</p></div><div class="page-actions" data-v-2c50fc50><span class="page-hint" data-v-2c50fc50>调优项按需开启,关闭遥测类可显著减少后台数据收集</span></div></div>', 1)),
        createVNode(TweakShelf, {
          files: ["PrivacyTweaks.json"],
          title: "隐私防护清单",
          dangerNote: "关闭安全相关项(Defender/防火墙类)会降低防护,请确认了解风险",
          overview: ""
        })
      ]);
    };
  }
});
const PrivacyGuard = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2c50fc50"]]);
export {
  PrivacyGuard as default
};
