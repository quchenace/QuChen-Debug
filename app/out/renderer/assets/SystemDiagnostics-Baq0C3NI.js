const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./OperationHistoryPanel-DfC-62Xr.js","./main-DAqTdO6U.js","./main-1Ii_wrN_.css","./OperationHistoryPanel-BYRouT7R.css","./DriverInventoryPanel-D22GzU8F.js","./DriverInventoryPanel-dz5yYw_T.css","./input-tools-BlI1zGWT.css","./HardwareHealthPanel-D0e1kBKP.js","./index-CL4m76NE.js","./index-D-9i_H-0.css","./HardwareHealthPanel-3BjGdRnc.css","./NetworkDiagnosticsPanel-RQN1tJYY.js","./NetworkDiagnosticsPanel-CnkTqRjb.css","./FaultTimelinePanel-DRT9Hg2v.js","./FaultTimelinePanel-CSjh-h_2.css","./RepairCenter-D1LDgn7Y.js","./RepairCenter-Cd8Fnp_l.css"])))=>i.map(i=>d[i]);
import { a as DIAGNOSTICS_TABS, _ as __vitePreload, u as resolveDiagnosticsTab } from "./index-CL4m76NE.js";
import { t as defineComponent, aD as watch, l as createElementBlock, p as createStaticVNode, i as createBaseVNode, F as Fragment, ab as renderList, as as unref, q as createTextVNode, ak as toDisplayString, k as createCommentVNode, g as computed, au as useRoute, av as useRouter, a5 as openBlock, S as normalizeClass, aG as withDirectives, aB as vShow, j as createBlock, s as defineAsyncComponent, a7 as reactive, R as nextTick, _ as _export_sfc } from "./main-DAqTdO6U.js";
const _hoisted_1 = { class: "page diagnostics-page" };
const _hoisted_2 = {
  class: "diagnostics-tabs",
  role: "tablist",
  "aria-label": "系统诊断与修复分类"
};
const _hoisted_3 = ["id", "aria-selected", "aria-controls", "tabindex", "onClick", "onKeydown"];
const _hoisted_4 = { class: "diagnostics-intro" };
const _hoisted_5 = ["id", "aria-labelledby"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SystemDiagnostics",
  setup(__props) {
    const OperationHistoryPanel = defineAsyncComponent(() => __vitePreload(() => import("./OperationHistoryPanel-DfC-62Xr.js"), true ? __vite__mapDeps([0,1,2,3]) : void 0, import.meta.url));
    const DriverInventoryPanel = defineAsyncComponent(() => __vitePreload(() => import("./DriverInventoryPanel-D22GzU8F.js"), true ? __vite__mapDeps([4,1,2,5,6]) : void 0, import.meta.url));
    const HardwareHealthPanel = defineAsyncComponent(() => __vitePreload(() => import("./HardwareHealthPanel-D0e1kBKP.js"), true ? __vite__mapDeps([7,1,2,8,9,10,6]) : void 0, import.meta.url));
    const NetworkDiagnosticsPanel = defineAsyncComponent(() => __vitePreload(() => import("./NetworkDiagnosticsPanel-RQN1tJYY.js"), true ? __vite__mapDeps([11,1,2,12,6]) : void 0, import.meta.url));
    const FaultTimelinePanel = defineAsyncComponent(() => __vitePreload(() => import("./FaultTimelinePanel-DRT9Hg2v.js"), true ? __vite__mapDeps([13,1,2,14,6]) : void 0, import.meta.url));
    const RepairCenter = defineAsyncComponent(() => __vitePreload(() => import("./RepairCenter-D1LDgn7Y.js"), true ? __vite__mapDeps([15,8,1,2,9,16,6]) : void 0, import.meta.url));
    const route = useRoute(), router = useRouter();
    const active = computed(() => resolveDiagnosticsTab(route.query.tab ?? route.query.section));
    const current = computed(() => DIAGNOSTICS_TABS.find((tab) => tab.id === active.value));
    const visited = reactive(/* @__PURE__ */ new Set());
    watch(active, (value) => visited.add(value), { immediate: true });
    function select(tab) {
      return router.replace({ query: { tab } });
    }
    async function moveTab(event, id) {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      const index = DIAGNOSTICS_TABS.findIndex((tab) => tab.id === id), count = DIAGNOSTICS_TABS.length;
      const next = event.key === "Home" ? 0 : event.key === "End" ? count - 1 : (index + (event.key === "ArrowRight" ? 1 : -1) + count) % count;
      const target = DIAGNOSTICS_TABS[next].id;
      await select(target);
      await nextTick();
      document.getElementById(`diagnostics-tab-${target}`)?.focus();
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        _cache[0] || (_cache[0] = createStaticVNode('<header class="diagnostics-header" data-v-abf4f40d><div class="diagnostics-icon" aria-hidden="true" data-v-abf4f40d><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-v-abf4f40d><rect x="3" y="3" width="18" height="18" rx="4" data-v-abf4f40d></rect><path d="M5 12h4l2-5 3 10 2-5h3" data-v-abf4f40d></path></svg></div><div data-v-abf4f40d><h2 class="page-title" data-v-abf4f40d>系统诊断与修复</h2><p data-v-abf4f40d>先检查问题，再按需修复 · 设备驱动 · 硬件与网络 · 运行库与系统修复</p></div></header>', 1)),
        createBaseVNode("nav", _hoisted_2, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(DIAGNOSTICS_TABS), (tab) => {
            return openBlock(), createElementBlock("button", {
              id: `diagnostics-tab-${tab.id}`,
              key: tab.id,
              role: "tab",
              "aria-selected": active.value === tab.id,
              "aria-controls": `diagnostics-panel-${tab.id}`,
              tabindex: active.value === tab.id ? 0 : -1,
              class: normalizeClass({ active: active.value === tab.id }),
              onClick: ($event) => select(tab.id),
              onKeydown: ($event) => moveTab($event, tab.id)
            }, toDisplayString(tab.label), 43, _hoisted_3);
          }), 128))
        ]),
        createBaseVNode("p", _hoisted_4, [
          createTextVNode(toDisplayString(current.value.description), 1),
          active.value !== "repair" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
            createTextVNode(" 检查结果单独展示，不参与优化评分。")
          ], 64)) : createCommentVNode("", true)
        ]),
        (openBlock(true), createElementBlock(Fragment, null, renderList(unref(DIAGNOSTICS_TABS), (tab) => {
          return withDirectives((openBlock(), createElementBlock("section", {
            id: `diagnostics-panel-${tab.id}`,
            key: tab.id,
            role: "tabpanel",
            "aria-labelledby": `diagnostics-tab-${tab.id}`,
            class: "diagnostics-content"
          }, [
            visited.has(tab.id) ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              tab.id === "verification" ? (openBlock(), createBlock(unref(OperationHistoryPanel), {
                key: 0,
                mode: "checks"
              })) : tab.id === "drivers" ? (openBlock(), createBlock(unref(DriverInventoryPanel), { key: 1 })) : tab.id === "hardware" ? (openBlock(), createBlock(unref(HardwareHealthPanel), { key: 2 })) : tab.id === "network" ? (openBlock(), createBlock(unref(NetworkDiagnosticsPanel), { key: 3 })) : tab.id === "faults" ? (openBlock(), createBlock(unref(FaultTimelinePanel), { key: 4 })) : tab.id === "repair" ? (openBlock(), createBlock(unref(RepairCenter), {
                key: 5,
                embedded: ""
              })) : createCommentVNode("", true)
            ], 64)) : createCommentVNode("", true)
          ], 8, _hoisted_5)), [
            [vShow, active.value === tab.id]
          ]);
        }), 128))
      ]);
    };
  }
});
const SystemDiagnostics = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-abf4f40d"]]);
export {
  SystemDiagnostics as default
};
