import { t as defineComponent, a1 as onMounted, l as createElementBlock, i as createBaseVNode, p as createStaticVNode, F as Fragment, ab as renderList, aG as withDirectives, aA as vModelText, S as normalizeClass, ak as toDisplayString, k as createCommentVNode, q as createTextVNode, a9 as ref, g as computed, a5 as openBlock, _ as _export_sfc } from "./main-DAqTdO6U.js";
const _hoisted_1 = {
  "data-tour": "streamers",
  class: "page"
};
const _hoisted_2 = { class: "page-header" };
const _hoisted_3 = ["disabled"];
const _hoisted_4 = { class: "tabs" };
const _hoisted_5 = ["onClick"];
const _hoisted_6 = {
  key: 0,
  class: "cat-panel"
};
const _hoisted_7 = { class: "cat-search-row" };
const _hoisted_8 = { class: "cat-chips" };
const _hoisted_9 = ["onClick"];
const _hoisted_10 = {
  key: 0,
  class: "cat-loading"
};
const _hoisted_11 = {
  key: 1,
  class: "cache-banner"
};
const _hoisted_12 = {
  key: 2,
  class: "cache-banner"
};
const _hoisted_13 = {
  key: 3,
  class: "error-banner"
};
const _hoisted_14 = {
  key: 4,
  class: "room-grid"
};
const _hoisted_15 = ["onClick"];
const _hoisted_16 = { class: "cover-wrap" };
const _hoisted_17 = ["src"];
const _hoisted_18 = { class: "online" };
const _hoisted_19 = { class: "room-info" };
const _hoisted_20 = ["title"];
const _hoisted_21 = { class: "room-name" };
const _hoisted_22 = {
  key: 5,
  class: "load-more"
};
const _hoisted_23 = ["disabled"];
const _hoisted_24 = {
  key: 0,
  class: "tabs sub"
};
const _hoisted_25 = ["onClick"];
const _hoisted_26 = {
  key: 1,
  class: "streamer-grid"
};
const _hoisted_27 = ["onClick"];
const _hoisted_28 = { class: "avatar" };
const _hoisted_29 = { class: "info" };
const _hoisted_30 = { class: "name" };
const _hoisted_31 = {
  key: 0,
  class: "tagline"
};
const _hoisted_32 = {
  key: 2,
  class: "empty"
};
const _hoisted_33 = {
  key: 3,
  class: "error-banner"
};
const _hoisted_34 = {
  key: 7,
  class: "loading"
};
const _hoisted_35 = {
  key: 8,
  class: "empty"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Streamers",
  setup(__props) {
    const PLATFORMS = [
      { id: "all", name: "全部平台" },
      { id: "douyu", name: "斗鱼" },
      { id: "huya", name: "虎牙" },
      { id: "bilibili", name: "哔哩哔哩" },
      { id: "douyin", name: "抖音" }
    ];
    const activePlatform = ref("all");
    const loading = ref(false);
    const loaded = ref(false);
    const error = ref("");
    const fromCache = ref(false);
    const rooms = ref([]);
    const page = ref(1);
    const hasMore = ref(false);
    const loadingMore = ref(false);
    const categories = ref([]);
    const catLoading = ref(false);
    const catSearch = ref("");
    const catLimit = ref(30);
    const activeCatId = ref("");
    const activeParentId = ref("");
    const douyinGroups = ref([]);
    const douyinTab = ref(0);
    const douyinLoading = ref(false);
    const douyinError = ref("");
    const isLivePlatform = computed(() => ["douyu", "huya", "bilibili"].includes(activePlatform.value));
    const filteredCats = computed(() => {
      const q = catSearch.value.trim().toLowerCase();
      if (!q) return categories.value;
      return categories.value.filter((c) => c.name.toLowerCase().includes(q));
    });
    const visibleCats = computed(() => {
      if (catSearch.value.trim()) return filteredCats.value.slice(0, 60);
      return filteredCats.value.slice(0, catLimit.value);
    });
    onMounted(() => {
      reload();
    });
    function platformName(p) {
      return { douyu: "斗鱼", huya: "虎牙", bilibili: "B站", douyin: "抖音" }[p] || p;
    }
    function manualPlatformName(p) {
      return { douyin: "抖音", huya: "虎牙", bilibili: "B站", douyu: "斗鱼", kuaishou: "快手" }[p] || p;
    }
    function formatOnline(r) {
      const unit = r.platform === "bilibili" ? "在线" : "热度";
      if (r.online >= 1e4) return `${(r.online / 1e4).toFixed(1)}万 ${unit}`;
      return `${r.online} ${unit}`;
    }
    async function reload() {
      if (activePlatform.value === "douyin") return loadDouyin();
      rooms.value = [];
      page.value = 1;
      hasMore.value = false;
      error.value = "";
      if (activePlatform.value === "all") return loadHot();
      return loadRooms(true);
    }
    async function switchPlatform(id) {
      if (activePlatform.value === id) return;
      activePlatform.value = id;
      activeCatId.value = "";
      activeParentId.value = "";
      catSearch.value = "";
      rooms.value = [];
      loaded.value = false;
      error.value = "";
      if (["douyu", "huya", "bilibili"].includes(id)) {
        if (!categoriesLoadedFor(id)) void loadCategories(id);
        else {
          const cached = catCacheByPlatform.get(id);
          if (cached) {
            categories.value = cached;
          }
        }
      }
      await reload();
    }
    const catCacheByPlatform = /* @__PURE__ */ new Map();
    function categoriesLoadedFor(p) {
      return catCacheByPlatform.has(p);
    }
    async function loadCategories(p) {
      catLoading.value = true;
      try {
        const r = await window.sysApi.streamerCategories(p);
        if (r?.success) {
          catCacheByPlatform.set(p, r.categories || []);
          categories.value = r.categories || [];
          fromCache.value = !!r.fromCache;
        }
      } catch {
      } finally {
        catLoading.value = false;
      }
    }
    async function loadHot() {
      loading.value = true;
      error.value = "";
      try {
        const r = await window.sysApi.streamerHot();
        if (r?.success) {
          rooms.value = r.rooms || [];
          if (r.warning) error.value = `部分平台拉取失败（${r.warning}），已展示可用平台`;
        } else error.value = r?.error || "获取失败";
      } catch (e) {
        error.value = e?.message || "网络请求失败";
      } finally {
        loading.value = false;
        loaded.value = true;
      }
    }
    async function loadRooms(reset = false) {
      if (loading.value || loadingMore.value) return false;
      if (reset) {
        rooms.value = [];
        page.value = 1;
        loading.value = true;
      } else loadingMore.value = true;
      error.value = "";
      try {
        const r = await window.sysApi.streamerRooms({
          platform: activePlatform.value,
          categoryId: activeCatId.value,
          parentId: activeParentId.value,
          page: page.value
        });
        if (r?.success) {
          const incoming = r.rooms || [];
          const key = (x) => `${x.platform}:${x.room}`;
          rooms.value = reset ? incoming : [...rooms.value, ...incoming.filter((n) => !rooms.value.some((o) => key(o) === key(n)))];
          hasMore.value = !!r.hasMore;
          return true;
        } else {
          error.value = r?.error || "获取失败";
          hasMore.value = false;
          return false;
        }
      } catch (e) {
        error.value = e?.message || "网络请求失败";
        return false;
      } finally {
        loading.value = false;
        loadingMore.value = false;
        loaded.value = true;
      }
    }
    async function loadMore() {
      const prev = page.value;
      page.value++;
      const ok = await loadRooms(false);
      if (!ok) page.value = prev;
    }
    async function selectCat(id, parentId) {
      activeCatId.value = id;
      activeParentId.value = parentId;
      await loadRooms(true);
    }
    async function loadDouyin() {
      douyinLoading.value = true;
      douyinError.value = "";
      loading.value = true;
      try {
        const r = await window.sysApi.fetchStreamers();
        if (r?.success) {
          douyinGroups.value = r.groups || [];
          fromCache.value = !!r.fromCache;
          if (douyinTab.value >= douyinGroups.value.length) douyinTab.value = 0;
        } else douyinError.value = r?.error || "获取失败";
      } catch (e) {
        douyinError.value = e?.message || "网络请求失败";
      } finally {
        douyinLoading.value = false;
        loading.value = false;
        loaded.value = true;
      }
    }
    function open(url) {
      window.sysApi?.openExternal(url);
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          _cache[5] || (_cache[5] = createStaticVNode('<div class="page-icon" style="background:rgba(168,85,247,0.08);" data-v-f17a981d><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#a855f7" stroke-width="1.5" data-v-f17a981d><polygon points="23 7 16 12 23 17 23 7" data-v-f17a981d></polygon><rect x="1" y="5" width="15" height="14" rx="2" data-v-f17a981d></rect></svg></div><div data-v-f17a981d><h2 class="page-title" data-v-f17a981d>主播直播</h2><p class="page-desc" data-v-f17a981d>实时抓取斗鱼 / 虎牙 / B站直播 · 全游戏板块 · 点击直达直播间</p></div>', 2)),
          createBaseVNode("button", {
            class: "refresh-btn",
            onClick: reload,
            disabled: loading.value,
            title: "刷新"
          }, [..._cache[4] || (_cache[4] = [
            createBaseVNode("svg", {
              width: "16",
              height: "16",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "2"
            }, [
              createBaseVNode("polyline", { points: "23 4 23 10 17 10" }),
              createBaseVNode("path", { d: "M20.49 15a9 9 0 1 1-2.12-9.36L23 10" })
            ], -1)
          ])], 8, _hoisted_3)
        ]),
        createBaseVNode("div", _hoisted_4, [
          (openBlock(), createElementBlock(Fragment, null, renderList(PLATFORMS, (p) => {
            return createBaseVNode("span", {
              class: normalizeClass(["tab", { active: activePlatform.value === p.id }]),
              key: p.id,
              onClick: ($event) => switchPlatform(p.id)
            }, toDisplayString(p.name), 11, _hoisted_5);
          }), 64))
        ]),
        isLivePlatform.value ? (openBlock(), createElementBlock("div", _hoisted_6, [
          createBaseVNode("div", _hoisted_7, [
            withDirectives(createBaseVNode("input", {
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => catSearch.value = $event),
              class: "cat-search",
              placeholder: "搜索游戏板块，如：三角洲行动 / 无畏契约 / CS2…"
            }, null, 512), [
              [vModelText, catSearch.value]
            ])
          ]),
          createBaseVNode("div", _hoisted_8, [
            createBaseVNode("span", {
              class: normalizeClass(["chip", { active: !activeCatId.value }]),
              onClick: _cache[1] || (_cache[1] = ($event) => selectCat("", ""))
            }, "全部热门", 2),
            (openBlock(true), createElementBlock(Fragment, null, renderList(visibleCats.value, (c) => {
              return openBlock(), createElementBlock("span", {
                class: normalizeClass(["chip", { active: activeCatId.value === c.id }]),
                key: c.id,
                onClick: ($event) => selectCat(c.id, c.parentId || "")
              }, toDisplayString(c.name), 11, _hoisted_9);
            }), 128)),
            !catSearch.value.trim() && filteredCats.value.length > catLimit.value ? (openBlock(), createElementBlock("span", {
              key: 0,
              class: "chip more",
              onClick: _cache[2] || (_cache[2] = ($event) => catLimit.value += 60)
            }, " 还有 " + toDisplayString(filteredCats.value.length - catLimit.value) + " 个板块… ", 1)) : createCommentVNode("", true)
          ]),
          catLoading.value ? (openBlock(), createElementBlock("div", _hoisted_10, "正在加载板块…")) : createCommentVNode("", true)
        ])) : createCommentVNode("", true),
        activePlatform.value === "douyin" && !douyinGroups.value.length && !douyinError.value ? (openBlock(), createElementBlock("div", _hoisted_11, " 抖音直播无公开接口，展示运营维护的推荐名单 ")) : createCommentVNode("", true),
        fromCache.value ? (openBlock(), createElementBlock("div", _hoisted_12, " 网络不可用，正在展示缓存数据")) : createCommentVNode("", true),
        error.value ? (openBlock(), createElementBlock("div", _hoisted_13, [
          createTextVNode(toDisplayString(error.value), 1),
          createBaseVNode("button", {
            class: "retry",
            onClick: reload
          }, "重试")
        ])) : createCommentVNode("", true),
        activePlatform.value !== "douyin" && rooms.value.length ? (openBlock(), createElementBlock("div", _hoisted_14, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(rooms.value, (r) => {
            return openBlock(), createElementBlock("div", {
              class: "room-card",
              key: r.room,
              onClick: ($event) => open(r.room)
            }, [
              createBaseVNode("div", _hoisted_16, [
                r.cover ? (openBlock(), createElementBlock("img", {
                  key: 0,
                  src: r.cover,
                  class: "cover",
                  loading: "lazy",
                  onError: _cache[3] || (_cache[3] = ($event) => $event.target.style.display = "none")
                }, null, 40, _hoisted_17)) : createCommentVNode("", true),
                createBaseVNode("span", _hoisted_18, toDisplayString(formatOnline(r)), 1),
                createBaseVNode("span", {
                  class: normalizeClass(["platform-badge", r.platform])
                }, toDisplayString(platformName(r.platform)), 3)
              ]),
              createBaseVNode("div", _hoisted_19, [
                createBaseVNode("div", {
                  class: "room-title",
                  title: r.title
                }, toDisplayString(r.title || r.name), 9, _hoisted_20),
                createBaseVNode("div", _hoisted_21, toDisplayString(r.name), 1)
              ])
            ], 8, _hoisted_15);
          }), 128))
        ])) : createCommentVNode("", true),
        activePlatform.value !== "douyin" && hasMore.value && rooms.value.length ? (openBlock(), createElementBlock("div", _hoisted_22, [
          createBaseVNode("button", {
            class: "btn-more",
            onClick: loadMore,
            disabled: loadingMore.value
          }, toDisplayString(loadingMore.value ? "加载中…" : "加载更多"), 9, _hoisted_23)
        ])) : createCommentVNode("", true),
        activePlatform.value === "douyin" ? (openBlock(), createElementBlock(Fragment, { key: 6 }, [
          douyinGroups.value.length ? (openBlock(), createElementBlock("div", _hoisted_24, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(douyinGroups.value, (g, i) => {
              return openBlock(), createElementBlock("span", {
                class: normalizeClass(["tab", { active: douyinTab.value === i }]),
                key: g.game,
                onClick: ($event) => douyinTab.value = i
              }, [
                createTextVNode(toDisplayString(g.game) + " ", 1),
                createBaseVNode("em", null, toDisplayString(g.streamers.length), 1)
              ], 10, _hoisted_25);
            }), 128))
          ])) : createCommentVNode("", true),
          douyinGroups.value[douyinTab.value] ? (openBlock(), createElementBlock("div", _hoisted_26, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(douyinGroups.value[douyinTab.value].streamers, (s) => {
              return openBlock(), createElementBlock("div", {
                class: "streamer-card",
                key: s.room,
                onClick: ($event) => open(s.room)
              }, [
                createBaseVNode("div", _hoisted_28, toDisplayString(s.name.charAt(0)), 1),
                createBaseVNode("div", _hoisted_29, [
                  createBaseVNode("div", _hoisted_30, toDisplayString(s.name), 1),
                  s.tagline ? (openBlock(), createElementBlock("div", _hoisted_31, toDisplayString(s.tagline), 1)) : createCommentVNode("", true)
                ]),
                createBaseVNode("div", {
                  class: normalizeClass(["platform", s.platform])
                }, toDisplayString(manualPlatformName(s.platform)), 3)
              ], 8, _hoisted_27);
            }), 128))
          ])) : createCommentVNode("", true),
          !douyinGroups.value.length && !douyinError.value && !douyinLoading.value ? (openBlock(), createElementBlock("div", _hoisted_32, "数据维护中，敬请期待")) : createCommentVNode("", true),
          douyinError.value ? (openBlock(), createElementBlock("div", _hoisted_33, toDisplayString(douyinError.value), 1)) : createCommentVNode("", true)
        ], 64)) : createCommentVNode("", true),
        loading.value ? (openBlock(), createElementBlock("div", _hoisted_34, "正在获取直播数据…")) : createCommentVNode("", true),
        !loading.value && !error.value && activePlatform.value !== "douyin" && !rooms.value.length && loaded.value ? (openBlock(), createElementBlock("div", _hoisted_35, " 该板块暂时没有开播的主播 ")) : createCommentVNode("", true)
      ]);
    };
  }
});
const Streamers = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f17a981d"]]);
export {
  Streamers as default
};
