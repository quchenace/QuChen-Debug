const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./GunCodes-DD_iCPag.js","./main-DAqTdO6U.js","./main-1Ii_wrN_.css","./GunCodes-_hUTaCCO.css"])))=>i.map(i=>d[i]);
import { _ as __vitePreload } from "./index-CL4m76NE.js";
import { t as defineComponent, a1 as onMounted, aD as watch, l as createElementBlock, i as createBaseVNode, p as createStaticVNode, S as normalizeClass, aG as withDirectives, aB as vShow, k as createCommentVNode, ak as toDisplayString, F as Fragment, ab as renderList, q as createTextVNode, j as createBlock, as as unref, g as computed, a9 as ref, R as nextTick, av as useRouter, au as useRoute, a5 as openBlock, s as defineAsyncComponent, _ as _export_sfc } from "./main-DAqTdO6U.js";
const _hoisted_1 = {
  "data-tour": "delta-password",
  class: "page"
};
const _hoisted_2 = { class: "page-header" };
const _hoisted_3 = {
  class: "tab-bar",
  role: "tablist",
  "aria-label": "三角洲工具"
};
const _hoisted_4 = ["aria-selected"];
const _hoisted_5 = ["aria-selected"];
const _hoisted_6 = ["aria-selected"];
const _hoisted_7 = {
  key: 0,
  class: "loading-indicator"
};
const _hoisted_8 = {
  key: 1,
  class: "error-banner"
};
const _hoisted_9 = {
  key: 2,
  class: "pw-grid"
};
const _hoisted_10 = { class: "pw-card-header" };
const _hoisted_11 = { class: "pw-map" };
const _hoisted_12 = { class: "pw-code" };
const _hoisted_13 = {
  key: 0,
  class: "pw-location"
};
const _hoisted_14 = {
  key: 1,
  class: "pw-images"
};
const _hoisted_15 = ["src", "alt", "onClick"];
const _hoisted_16 = ["onClick"];
const _hoisted_17 = {
  key: 3,
  class: "empty-state"
};
const _hoisted_18 = { class: "action-row" };
const _hoisted_19 = ["disabled"];
const _hoisted_20 = {
  key: 0,
  class: "update-info"
};
const _hoisted_21 = { class: "map-pane" };
const _hoisted_22 = {
  key: 0,
  class: "map-fallback"
};
const _hoisted_23 = { class: "error-banner" };
const _hoisted_24 = { class: "guns-pane" };
const MAP_URL = "https://df.qq.com/cp/a20240729directory/";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "DeltaPassword",
  setup(__props) {
    const GunCodes = defineAsyncComponent(() => __vitePreload(() => import("./GunCodes-DD_iCPag.js"), true ? __vite__mapDeps([0,1,2,3]) : void 0, import.meta.url));
    const route = useRoute(), router = useRouter();
    const activeTab = computed(() => route.query.tab === "password" ? "password" : route.query.tab === "guns" ? "guns" : "map");
    const gunsMounted = ref(false);
    let passwordRequested = false;
    const data = ref(null);
    const loading = ref(false);
    const error = ref("");
    onMounted(syncActiveTab);
    watch(activeTab, syncActiveTab);
    async function fetchPasswords() {
      loading.value = true;
      error.value = "";
      try {
        if (!window.sysApi) throw new Error("sysApi 未加载");
        data.value = await window.sysApi.fetchDeltaPassword();
        if (!data.value.success) error.value = data.value.error || "获取失败";
      } catch (err) {
        error.value = err instanceof Error ? err.message : "网络请求失败";
      } finally {
        loading.value = false;
      }
    }
    async function copyPassword(pw) {
      try {
        await navigator.clipboard.writeText(pw);
      } catch {
        const ta = document.createElement("textarea");
        ta.value = pw;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
    }
    function openImage(url) {
      window.open(url, "_blank");
    }
    const mapMounted = ref(false);
    const mapError = ref("");
    const mapWvRef = ref(null);
    function ensureMapMounted() {
      if (mapMounted.value) return;
      mapMounted.value = true;
      nextTick(() => attachMapEvents());
    }
    function activateTab(tab) {
      void router.replace({ query: { ...route.query, tab } });
    }
    function syncActiveTab() {
      if (activeTab.value === "map") ensureMapMounted();
      else if (activeTab.value === "guns") gunsMounted.value = true;
      else if (!passwordRequested) {
        passwordRequested = true;
        void fetchPasswords();
      }
    }
    function attachMapEvents() {
      const wv = mapWvRef.value;
      if (!wv || wv.__dfEventsAttached) return;
      wv.__dfEventsAttached = true;
      wv.addEventListener("did-fail-load", (e) => {
        if (e.errorCode === -3) return;
        if (e.isMainFrame === false) return;
        mapError.value = `地图站加载失败 (${e.errorCode})，请检查网络`;
      });
      wv.addEventListener("did-finish-load", () => {
        mapError.value = "";
      });
    }
    function openMapExternal() {
      window.sysApi?.openExternal(MAP_URL);
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          _cache[3] || (_cache[3] = createStaticVNode('<div class="page-icon" style="background:rgba(34,197,94,0.08);" data-v-48a48805><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="1.5" data-v-48a48805><rect x="3" y="11" width="18" height="11" rx="2" data-v-48a48805></rect><path d="M7 11V7a5 5 0 0 1 10 0v4" data-v-48a48805></path></svg></div><div data-v-48a48805><h2 class="page-title" data-v-48a48805>三角洲助手</h2><p class="page-desc" data-v-48a48805>地图、密码和改枪方案，一处查看</p></div>', 2)),
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("button", {
              class: normalizeClass(["tab-btn", { active: activeTab.value === "map" }]),
              role: "tab",
              "aria-selected": activeTab.value === "map",
              onClick: _cache[0] || (_cache[0] = ($event) => activateTab("map"))
            }, "地图站", 10, _hoisted_4),
            createBaseVNode("button", {
              class: normalizeClass(["tab-btn", { active: activeTab.value === "password" }]),
              role: "tab",
              "aria-selected": activeTab.value === "password",
              onClick: _cache[1] || (_cache[1] = ($event) => activateTab("password"))
            }, "每日密码", 10, _hoisted_5),
            createBaseVNode("button", {
              class: normalizeClass(["tab-btn", { active: activeTab.value === "guns" }]),
              role: "tab",
              "aria-selected": activeTab.value === "guns",
              onClick: _cache[2] || (_cache[2] = ($event) => activateTab("guns"))
            }, "改枪码", 10, _hoisted_6)
          ])
        ]),
        withDirectives(createBaseVNode("div", null, [
          loading.value ? (openBlock(), createElementBlock("div", _hoisted_7, "正在获取最新密码...")) : createCommentVNode("", true),
          error.value ? (openBlock(), createElementBlock("div", _hoisted_8, toDisplayString(error.value), 1)) : createCommentVNode("", true),
          data.value?.entries?.length ? (openBlock(), createElementBlock("div", _hoisted_9, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(data.value.entries, (entry) => {
              return openBlock(), createElementBlock("div", {
                class: "pw-card",
                key: entry.map
              }, [
                createBaseVNode("div", _hoisted_10, [
                  createBaseVNode("span", _hoisted_11, toDisplayString(entry.map), 1),
                  createBaseVNode("span", _hoisted_12, toDisplayString(entry.password), 1)
                ]),
                entry.location ? (openBlock(), createElementBlock("div", _hoisted_13, toDisplayString(entry.location), 1)) : createCommentVNode("", true),
                entry.images.length ? (openBlock(), createElementBlock("div", _hoisted_14, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(entry.images, (img, i) => {
                    return openBlock(), createElementBlock("img", {
                      key: i,
                      src: img,
                      alt: String(entry.map) + " 位置图 " + String(Number(i) + 1),
                      class: "pw-img",
                      onClick: ($event) => openImage(img),
                      loading: "lazy"
                    }, null, 8, _hoisted_15);
                  }), 128))
                ])) : createCommentVNode("", true),
                createBaseVNode("button", {
                  class: "copy-btn",
                  onClick: ($event) => copyPassword(entry.password)
                }, "复制密码 " + toDisplayString(entry.password), 9, _hoisted_16)
              ]);
            }), 128))
          ])) : createCommentVNode("", true),
          !loading.value && !data.value ? (openBlock(), createElementBlock("div", _hoisted_17, [..._cache[4] || (_cache[4] = [
            createBaseVNode("span", null, "点击下方按钮获取今日密码", -1)
          ])])) : createCommentVNode("", true),
          createBaseVNode("div", _hoisted_18, [
            createBaseVNode("button", {
              class: "fetch-btn",
              onClick: fetchPasswords,
              disabled: loading.value
            }, [
              _cache[5] || (_cache[5] = createBaseVNode("svg", {
                width: "16",
                height: "16",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                createBaseVNode("polyline", { points: "23 4 23 10 17 10" }),
                createBaseVNode("path", { d: "M20.49 15a9 9 0 1 1-2.12-9.36L23 10" })
              ], -1)),
              createTextVNode(" " + toDisplayString(loading.value ? "获取中..." : data.value ? "刷新密码" : "获取今日密码"), 1)
            ], 8, _hoisted_19),
            data.value?.date ? (openBlock(), createElementBlock("span", _hoisted_20, "更新日期: " + toDisplayString(data.value.date), 1)) : createCommentVNode("", true)
          ])
        ], 512), [
          [vShow, activeTab.value === "password"]
        ]),
        withDirectives(createBaseVNode("div", _hoisted_21, [
          mapError.value ? (openBlock(), createElementBlock("div", _hoisted_22, [
            createBaseVNode("div", _hoisted_23, toDisplayString(mapError.value), 1),
            createBaseVNode("button", {
              class: "fetch-btn",
              onClick: openMapExternal
            }, "在浏览器中打开地图站")
          ])) : createCommentVNode("", true),
          mapMounted.value ? (openBlock(), createElementBlock("webview", {
            key: 1,
            ref_key: "mapWvRef",
            ref: mapWvRef,
            src: MAP_URL,
            partition: "persist:dfmap",
            class: "map-webview"
          }, null, 512)) : createCommentVNode("", true)
        ], 512), [
          [vShow, activeTab.value === "map"]
        ]),
        withDirectives(createBaseVNode("div", _hoisted_24, [
          gunsMounted.value ? (openBlock(), createBlock(unref(GunCodes), {
            key: 0,
            embedded: ""
          })) : createCommentVNode("", true)
        ], 512), [
          [vShow, activeTab.value === "guns"]
        ])
      ]);
    };
  }
});
const DeltaPassword = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-48a48805"]]);
export {
  DeltaPassword as default
};
