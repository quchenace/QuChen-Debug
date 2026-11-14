import { t as defineComponent, a1 as onMounted, aD as watch, l as createElementBlock, i as createBaseVNode, p as createStaticVNode, r as createVNode, aF as withCtx, F as Fragment, ab as renderList, as as unref, j as createBlock, af as resolveDynamicComponent, a9 as ref, g as computed, ad as resolveComponent, au as useRoute, av as useRouter, a5 as openBlock, q as createTextVNode, S as normalizeClass, ak as toDisplayString, _ as _export_sfc } from "./main-DAqTdO6U.js";
import { t as tweakFocus, T as TweakShelf } from "./TweakShelf-BggrlQpq.js";
import { D as DEEPTUNE_TABS } from "./index-CL4m76NE.js";
import "./StatusDot-C-XeYEe8.js";
import "./KeywordConfirm-CUMT0nLF.js";
const _hoisted_1 = { class: "page deeptune-page" };
const _hoisted_2 = { class: "page-header" };
const _hoisted_3 = { class: "tab-bar" };
const _hoisted_4 = ["onClick"];
const _hoisted_5 = ["data-tutorial-tab"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "DeepTune",
  setup(__props) {
    const route = useRoute();
    const router = useRouter();
    const VALID_IDS = new Set(DEEPTUNE_TABS.map((t) => t.id));
    const activeTab = ref("system");
    function syncFromQuery() {
      const q = String(route.query.tab ?? "");
      if (q && VALID_IDS.has(q)) activeTab.value = q;
      else activeTab.value = "system";
    }
    function switchTab(id) {
      activeTab.value = id;
      tweakFocus.value = null;
      router.replace({ query: { tab: id } });
    }
    function syncFocusFromQuery() {
      const f = String(route.query.focus ?? "");
      if (!f) return;
      const [cat, ...nameParts] = f.split("::");
      if (cat && nameParts.length) tweakFocus.value = { cat, name: nameParts.join("::") };
    }
    const currentTab = computed(() => DEEPTUNE_TABS.find((t) => t.id === activeTab.value) ?? DEEPTUNE_TABS[0]);
    const currentComponent = computed(() => currentTab.value.component);
    onMounted(() => {
      syncFromQuery();
      syncFocusFromQuery();
    });
    watch(() => route.query.tab, syncFromQuery);
    watch(() => route.query.focus, syncFocusFromQuery);
    return (_ctx, _cache) => {
      const _component_router_link = resolveComponent("router-link");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          _cache[1] || (_cache[1] = createStaticVNode('<div class="page-icon" data-v-0ce52c25><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="1.5" data-v-0ce52c25><path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6" data-v-0ce52c25></path></svg></div><div class="page-title-block" data-v-0ce52c25><h2 class="page-title" data-v-0ce52c25>系统深度优化</h2><p class="page-desc" data-v-0ce52c25>帧率 · 网络 · 外设 · 音频 · 隐私 · 守护 · 系统深度</p></div>', 2)),
          createVNode(_component_router_link, {
            class: "share-settings-btn",
            to: "/community?publish=system"
          }, {
            default: withCtx(() => [..._cache[0] || (_cache[0] = [
              createTextVNode("分享我的设置", -1)
            ])]),
            _: 1
          })
        ]),
        createBaseVNode("div", _hoisted_3, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(DEEPTUNE_TABS), (t) => {
            return openBlock(), createElementBlock("button", {
              key: t.id,
              class: normalizeClass(["tab-btn", { active: activeTab.value === t.id }]),
              onClick: ($event) => switchTab(t.id)
            }, toDisplayString(t.label), 11, _hoisted_4);
          }), 128))
        ]),
        (openBlock(), createElementBlock("div", {
          key: activeTab.value,
          "data-tutorial-tab": activeTab.value
        }, [
          activeTab.value === "system" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
            createVNode(TweakShelf, {
              files: ["ExplorerTweaks.json"],
              title: "资源管理器调优",
              overview: ""
            }),
            _cache[2] || (_cache[2] = createBaseVNode("div", { class: "tweak-gap" }, null, -1)),
            createVNode(TweakShelf, {
              files: ["TaskTweaks.json"],
              title: "计划任务裁剪",
              dangerNote: "禁用计划任务可能影响对应功能(Office 更新/Xbox 等),可随时还原",
              overview: ""
            }),
            _cache[3] || (_cache[3] = createBaseVNode("div", { class: "tweak-gap" }, null, -1)),
            createVNode(TweakShelf, {
              files: ["ServiceTweaks2.json"],
              title: "服务补全",
              dangerNote: "禁用服务前请确认不影响日常使用,可随时还原",
              overview: ""
            })
          ], 64)) : (openBlock(), createBlock(resolveDynamicComponent(currentComponent.value), { key: 1 }))
        ], 8, _hoisted_5))
      ]);
    };
  }
});
const DeepTune = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0ce52c25"]]);
export {
  DeepTune as default
};
