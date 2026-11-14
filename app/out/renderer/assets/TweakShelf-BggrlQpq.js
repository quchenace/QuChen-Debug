import { a9 as ref, t as defineComponent, a5 as openBlock, l as createElementBlock, i as createBaseVNode, V as normalizeStyle, ak as toDisplayString, q as createTextVNode, k as createCommentVNode, F as Fragment, S as normalizeClass, ab as renderList, g as computed, _ as _export_sfc, a1 as onMounted, aD as watch, a3 as onUnmounted, aG as withDirectives, aA as vModelText, j as createBlock, aI as withModifiers, r as createVNode, R as nextTick } from "./main-DAqTdO6U.js";
import { d as ElMessage, e as ElMessageBox } from "./index-CL4m76NE.js";
import { S as StatusDot } from "./StatusDot-C-XeYEe8.js";
import { K as KeywordConfirm } from "./KeywordConfirm-CUMT0nLF.js";
const tweakFocus = ref(null);
const _hoisted_1$1 = { class: "ov" };
const _hoisted_2$1 = { class: "ov-card" };
const _hoisted_3$1 = { class: "ov-ring" };
const _hoisted_4$1 = {
  width: "64",
  height: "64",
  viewBox: "0 0 64 64"
};
const _hoisted_5$1 = { class: "ov-ring-text" };
const _hoisted_6$1 = { class: "ov-info" };
const _hoisted_7$1 = { class: "ov-title" };
const _hoisted_8$1 = { class: "ov-risk" };
const _hoisted_9$1 = { class: "ov-risk-item ok" };
const _hoisted_10$1 = { class: "ov-risk-item mid" };
const _hoisted_11$1 = { class: "ov-risk-item hi" };
const _hoisted_12$1 = { class: "ov-summary" };
const _hoisted_13$1 = ["disabled"];
const _hoisted_14$1 = {
  key: 0,
  class: "ov-device"
};
const _hoisted_15$1 = { class: "ov-device-label" };
const _hoisted_16$1 = ["title"];
const _hoisted_17$1 = {
  key: 1,
  class: "ov-device"
};
const _hoisted_18$1 = { class: "ov-device-label" };
const _hoisted_19$1 = {
  key: 2,
  class: "ov-device"
};
const _hoisted_20$1 = { class: "ov-device-label" };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ShelfOverview",
  props: {
    categories: {},
    states: {},
    busy: { type: Boolean },
    devices: {},
    deviceMode: { default: "" }
  },
  emits: ["refresh-remaining"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const groupNames = computed(() => {
      const s = /* @__PURE__ */ new Set();
      for (const cat of props.categories) for (const g of cat.groups) s.add(g.Name);
      return s;
    });
    const total = computed(() => props.categories.reduce((n, c) => n + c.groups.length, 0));
    const confirmed = computed(() => props.states.filter((s) => groupNames.value.has(s.name) && s.detectable).length);
    const remaining = computed(() => total.value - confirmed.value);
    const softwareApplied = computed(() => props.states.filter((s) => groupNames.value.has(s.name) && s.softwareApplied).length);
    const atTarget = computed(() => props.states.filter((s) => groupNames.value.has(s.name) && s.applied).length);
    const deviceLabel = computed(() => {
      switch (props.deviceMode) {
        case "peripheral":
          return "键鼠设备";
        case "audio":
          return "音频设备";
        case "network":
          return "网卡";
        case "gpu":
          return "GPU/CPU";
        default:
          return "设备";
      }
    });
    const riskCounts = computed(() => {
      const r = { safe: 0, medium: 0, high: 0 };
      for (const cat of props.categories) for (const g of cat.groups) {
        const lv = g.Level || 1;
        if (lv >= 3) r.high++;
        else if (lv === 2) r.medium++;
        else r.safe++;
      }
      return r;
    });
    const ringDash = computed(() => `${total.value ? confirmed.value / total.value * 163.4 : 0} 163.4`);
    const ringOffset = computed(() => 0);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        createBaseVNode("div", _hoisted_2$1, [
          createBaseVNode("div", _hoisted_3$1, [
            (openBlock(), createElementBlock("svg", _hoisted_4$1, [
              _cache[1] || (_cache[1] = createBaseVNode("circle", {
                cx: "32",
                cy: "32",
                r: "26",
                class: "ov-ring-bg"
              }, null, -1)),
              createBaseVNode("circle", {
                cx: "32",
                cy: "32",
                r: "26",
                class: "ov-ring-fg",
                style: normalizeStyle({ strokeDasharray: ringDash.value, strokeDashoffset: ringOffset.value })
              }, null, 4)
            ])),
            createBaseVNode("div", _hoisted_5$1, [
              createBaseVNode("b", null, toDisplayString(confirmed.value), 1),
              createBaseVNode("span", null, "/" + toDisplayString(total.value), 1)
            ])
          ]),
          createBaseVNode("div", _hoisted_6$1, [
            createBaseVNode("div", _hoisted_7$1, "状态确认 " + toDisplayString(confirmed.value) + "/" + toDisplayString(total.value), 1),
            _cache[5] || (_cache[5] = createBaseVNode("div", { class: "ov-sub" }, "未确认项目可单独重新读取", -1)),
            createBaseVNode("div", _hoisted_8$1, [
              createBaseVNode("span", _hoisted_9$1, "安全 " + toDisplayString(riskCounts.value.safe), 1),
              createBaseVNode("span", _hoisted_10$1, "中等 " + toDisplayString(riskCounts.value.medium), 1),
              createBaseVNode("span", _hoisted_11$1, "高风险 " + toDisplayString(riskCounts.value.high), 1)
            ]),
            createBaseVNode("div", _hoisted_12$1, [
              _cache[2] || (_cache[2] = createTextVNode(" 本软件已应用 ", -1)),
              createBaseVNode("b", null, toDisplayString(softwareApplied.value), 1),
              _cache[3] || (_cache[3] = createTextVNode(" 项 · 当前符合目标 ", -1)),
              createBaseVNode("b", null, toDisplayString(atTarget.value), 1),
              _cache[4] || (_cache[4] = createTextVNode(" 项 ", -1))
            ])
          ]),
          remaining.value > 0 ? (openBlock(), createElementBlock("button", {
            key: 0,
            class: "ov-read-btn",
            disabled: __props.busy,
            onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("refresh-remaining"))
          }, " ↻ 读取剩余未确认项目 " + toDisplayString(remaining.value), 9, _hoisted_13$1)) : createCommentVNode("", true)
        ]),
        __props.deviceMode && __props.devices.status === "ok" ? (openBlock(), createElementBlock("div", _hoisted_14$1, [
          createBaseVNode("span", _hoisted_15$1, toDisplayString(deviceLabel.value), 1),
          __props.deviceMode === "peripheral" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
            createBaseVNode("span", {
              class: normalizeClass(["ov-device-item", { absent: !__props.devices.info?.keyboard }])
            }, " ⌨ 键盘 " + toDisplayString(__props.devices.info?.keyboard ? "✓" : "未检测到"), 3),
            createBaseVNode("span", {
              class: normalizeClass(["ov-device-item", { absent: !__props.devices.info?.mouse }])
            }, " 🖱 鼠标 " + toDisplayString(__props.devices.info?.mouse ? "✓" : "未检测到"), 3)
          ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            createBaseVNode("span", {
              class: normalizeClass(["ov-device-item", { absent: !__props.devices.info?.present }])
            }, toDisplayString(deviceLabel.value) + " " + toDisplayString(__props.devices.info?.present ? "✓" : "未检测到"), 3),
            (openBlock(true), createElementBlock(Fragment, null, renderList(__props.devices.info?.devices.slice(0, 2), (d) => {
              return openBlock(), createElementBlock("span", {
                key: d.name,
                class: "ov-device-name",
                title: d.name
              }, toDisplayString(d.name), 9, _hoisted_16$1);
            }), 128))
          ], 64))
        ])) : __props.deviceMode && __props.devices.status === "loading" ? (openBlock(), createElementBlock("div", _hoisted_17$1, [
          createBaseVNode("span", _hoisted_18$1, toDisplayString(deviceLabel.value), 1),
          _cache[6] || (_cache[6] = createBaseVNode("span", { class: "ov-device-muted" }, "检测中…", -1))
        ])) : __props.deviceMode && __props.devices.status === "fail" ? (openBlock(), createElementBlock("div", _hoisted_19$1, [
          createBaseVNode("span", _hoisted_20$1, toDisplayString(deviceLabel.value), 1),
          _cache[7] || (_cache[7] = createBaseVNode("span", { class: "ov-device-fail" }, "检测失败（受限模式）", -1))
        ])) : createCommentVNode("", true)
      ]);
    };
  }
});
const ShelfOverview = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-c3629a12"]]);
const _hoisted_1 = { class: "shelf" };
const _hoisted_2 = {
  key: 0,
  class: "shelf-head"
};
const _hoisted_3 = {
  key: 0,
  class: "shelf-title"
};
const _hoisted_4 = {
  key: 1,
  class: "shelf-presets"
};
const _hoisted_5 = ["disabled", "onClick"];
const _hoisted_6 = {
  key: 2,
  class: "shelf-actions"
};
const _hoisted_7 = ["disabled", "onClick"];
const _hoisted_8 = ["disabled"];
const _hoisted_9 = { class: "shelf-filter" };
const _hoisted_10 = {
  key: 0,
  class: "shelf-levels"
};
const _hoisted_11 = ["onClick"];
const _hoisted_12 = {
  key: 1,
  class: "shelf-levels"
};
const _hoisted_13 = {
  key: 2,
  class: "shelf-note"
};
const _hoisted_14 = {
  key: 3,
  class: "shelf-loading"
};
const _hoisted_15 = {
  key: 4,
  class: "shelf-empty"
};
const _hoisted_16 = { class: "shelf-cats" };
const _hoisted_17 = ["onClick"];
const _hoisted_18 = { class: "cat-left" };
const _hoisted_19 = { class: "cat-name" };
const _hoisted_20 = { class: "cat-count" };
const _hoisted_21 = { class: "cat-right" };
const _hoisted_22 = ["disabled", "onClick"];
const _hoisted_23 = ["disabled", "onClick"];
const _hoisted_24 = {
  key: 0,
  class: "cat-body"
};
const _hoisted_25 = ["data-key"];
const _hoisted_26 = ["onClick"];
const _hoisted_27 = { class: "tweak-name" };
const _hoisted_28 = { class: "detail-chevron" };
const _hoisted_29 = { class: "state-text" };
const _hoisted_30 = {
  key: 0,
  class: "mini-tag applied"
};
const _hoisted_31 = {
  key: 1,
  class: "mini-tag on"
};
const _hoisted_32 = {
  key: 2,
  class: "mini-tag unk"
};
const _hoisted_33 = {
  key: 2,
  class: "mini-tag unk"
};
const _hoisted_34 = {
  key: 0,
  class: "undetectable-mark",
  title: "无法检测当前系统状态"
};
const _hoisted_35 = ["disabled", "onClick"];
const _hoisted_36 = { class: "tweak-desc" };
const _hoisted_37 = {
  key: 0,
  class: "tweak-error",
  role: "alert"
};
const _hoisted_38 = {
  key: 1,
  class: "tweak-desc"
};
const _hoisted_39 = {
  key: 0,
  class: "td-desc"
};
const _hoisted_40 = {
  key: 1,
  class: "td-brake"
};
const _hoisted_41 = {
  key: 2,
  class: "td-alert"
};
const _hoisted_42 = ["checked", "disabled", "onChange"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "TweakShelf",
  props: {
    files: {},
    title: { default: "" },
    presets: { default: () => [] },
    actions: { default: () => [] },
    dangerNote: { default: "" },
    isLaptop: { type: Boolean, default: false },
    overview: { type: Boolean, default: false },
    deviceProbe: { default: "" }
  },
  setup(__props) {
    const props = __props;
    const categories = ref([]);
    const states = ref([]);
    const expandedCats = ref(/* @__PURE__ */ new Set());
    const detailOpen = ref(/* @__PURE__ */ new Set());
    const search = ref("");
    const levelFilter = ref(0);
    const riskFilter = ref("all");
    const devices = ref({ status: "off" });
    const remainingKeys = computed(() => {
      const keys = [];
      for (const cat of effectiveCats.value) for (const g of cat.groups) {
        if (!detectable(cat.name, g.Name)) keys.push(key(cat.name, g.Name));
      }
      return keys;
    });
    const loaded = ref(false);
    const busy = ref(false);
    const working = ref({});
    const operationErrors = ref({});
    let timer = null;
    const focusKey = ref("");
    let focusTimer = null;
    function applyFocus() {
      const f = tweakFocus.value;
      if (!f) return;
      const base = props.files.map((x) => x.replace(/\.json$/, ""));
      const cat = effectiveCats.value.find((c) => base.includes(c.name) && c.groups.some((g) => g.Name === f.name));
      if (!cat) return;
      tweakFocus.value = null;
      const s = new Set(expandedCats.value);
      s.add(cat.name);
      expandedCats.value = s;
      focusKey.value = key(cat.name, f.name);
      nextTick(() => {
        const el = document.querySelector(`[data-key="${CSS.escape(key(cat.name, f.name))}"]`);
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
      });
      if (focusTimer) clearTimeout(focusTimer);
      focusTimer = setTimeout(() => {
        focusKey.value = "";
      }, 2500);
    }
    const key = (cat, group) => `${cat}::${group}`;
    const stateOn = (cat, group) => states.value.some((s) => s.category === cat && s.name === group && s.applied);
    const detectable = (cat, group) => states.value.some((s) => s.category === cat && s.name === group && s.detectable);
    const onCount = (cat) => cat.groups.filter((g) => stateOn(cat.name, g.Name)).length;
    const softwareAppliedOn = (cat, group) => states.value.some((s) => s.category === cat && s.name === group && s.softwareApplied);
    const switchOn = (cat, group) => stateOn(cat, group) || !detectable(cat, group) && softwareAppliedOn(cat, group);
    const rowError = (cat, group) => operationErrors.value[key(cat, group)] || states.value.find((s) => s.category === cat && s.name === group)?.error;
    function resultError(result) {
      return result.error || result.states?.filter((s) => !s.success).map((s) => `${s.key.split("::").slice(1).join("::") || s.key}: ${s.error || "操作失败"}`).join("\n") || "操作失败";
    }
    function rememberResult(keys, result) {
      const errors = { ...operationErrors.value };
      for (const k of keys) {
        const item = result.states?.find((s) => s.key === k);
        if (item?.success || result.success) delete errors[k];
        else errors[k] = item?.error || result.error || "操作失败";
      }
      operationErrors.value = errors;
    }
    const kwState = ref(false);
    const kwPayload = ref(null);
    const kwTitle = ref("");
    const kwDetail = ref("");
    const kwConsequences = ref([]);
    let pendingFlipEl = null;
    function syncCheckbox(el, cat, g) {
      if (!el) return;
      const on = switchOn(cat.name, g.Name);
      nextTick(() => {
        if (el.checked !== on) el.checked = on;
      });
    }
    function openKw(a) {
      if (a.type === "flip" && a.g) {
        kwTitle.value = "高风险确认";
        kwDetail.value = `「${a.g.Name}」是 Lv${a.g.Level} 高风险项,确定开启?`;
        kwConsequences.value = [];
        if (a.g.WillBrake?.length) kwConsequences.value.push("可能影响: " + a.g.WillBrake.join("、"));
        if (a.g.Alert?.length) kwConsequences.value.push("注意: " + a.g.Alert.join("、"));
        if (!kwConsequences.value.length) kwConsequences.value.push("该调优项可能影响系统稳定性");
      } else if (a.type === "applyCat" && a.cat) {
        const dangerKeys = a.cat.groups.filter((g) => (g.Level || 1) >= 3);
        kwTitle.value = "批量开启确认";
        kwDetail.value = `「${a.cat.name}」包含 ${dangerKeys.length} 个 Lv3+ 高风险项`;
        kwConsequences.value = dangerKeys.map((g) => `「${g.Name}」${g.WillBrake?.length ? "可能影响: " + g.WillBrake[0] : g.Alert?.length ? "注意: " + g.Alert[0] : "(无附加说明)"}`);
      } else if (a.type === "applyPreset" && a.preset) {
        kwTitle.value = "预设确认";
        kwDetail.value = `「${a.preset.label}」包含 ${a.presetHigh?.length ?? 0} 个 Lv3+ 高风险项,可能影响系统安全`;
        kwConsequences.value = a.presetHigh?.length ? a.presetHigh.map((h) => `「${h.name}」(Lv${h.level})`) : ["可能影响系统安全"];
      }
      kwPayload.value = a;
      kwState.value = true;
    }
    function kwCancel() {
      if (!kwState.value) return;
      kwState.value = false;
      const a = kwPayload.value;
      if (a?.type === "flip" && a.cat && a.g) syncCheckbox(pendingFlipEl, a.cat, a.g);
      pendingFlipEl = null;
    }
    async function kwConfirm() {
      const a = kwPayload.value;
      const flipEl = pendingFlipEl;
      pendingFlipEl = null;
      kwState.value = false;
      if (!a) return;
      if (a.type === "flip" && a.cat && a.g) await doFlip(a.cat, a.g, flipEl);
      else if (a.type === "applyCat" && a.cat) await doApplyCat(a.cat, a.on === true);
      else if (a.type === "applyPreset" && a.preset) await doApplyPreset(a.preset);
    }
    const effectiveCats = computed(() => {
      if (!props.isLaptop) return categories.value;
      return categories.value.map((cat) => ({ ...cat, groups: cat.groups.filter((g) => !g.NoSupport?.includes("LAPTOP")) })).filter((cat) => cat.groups.length > 0);
    });
    const filteredCats = computed(() => {
      const q = search.value.trim().toLowerCase();
      return effectiveCats.value.map((cat) => ({
        ...cat,
        groups: cat.groups.filter((g) => {
          if (!props.overview && levelFilter.value && (g.Level || 1) !== levelFilter.value) return false;
          if (props.overview) {
            const r = riskFilter.value === "safe" ? 1 : riskFilter.value === "medium" ? 2 : 0;
            if (riskFilter.value === "high" && (g.Level || 1) < 3) return false;
            if (r && (g.Level || 1) !== r) return false;
          }
          if (q) {
            const hay = (g.Name + " " + (g.Description || "") + " " + (props.overview ? (g.Paths || []).join(" ") : "")).toLowerCase();
            if (!hay.includes(q)) return false;
          }
          return true;
        })
      })).filter((cat) => cat.groups.length > 0);
    });
    const catColor = (order) => ["#38bdf8", "#a78bfa", "#34d399", "#fbbf24", "#f87171", "#22d3ee", "#f472b6", "#818cf8", "#4ade80"][order % 9];
    let autoExpanded = false;
    async function loadAll() {
      if (!props.files.length || busy.value) return;
      try {
        const [c, s] = await Promise.all([
          window.sysApi.shelfLoad(props.files),
          window.sysApi.shelfStates(props.files)
        ]);
        if (c.success && c.categories) categories.value = c.categories;
        else ElMessage.error(c.error || "加载调优项失败");
        if (s.success && s.states) states.value = s.states;
        else ElMessage.error(s.error || "读取状态失败");
        if (!autoExpanded && categories.value.length > 0) {
          autoExpanded = true;
          if (expandedCats.value.size === 0) {
            const s2 = /* @__PURE__ */ new Set();
            categories.value.forEach((cat) => s2.add(cat.name));
            expandedCats.value = s2;
          }
        }
      } catch (e) {
        ElMessage.error("刷新状态失败:" + String(e?.message || e));
      } finally {
        loaded.value = true;
      }
    }
    async function readRemaining() {
      const n = remainingKeys.value.length;
      if (!n || busy.value) return;
      busy.value = true;
      try {
        const r = await window.sysApi.shelfStates(props.files, [...remainingKeys.value]);
        if (r.success && r.states) {
          const others = states.value.filter((s) => !remainingKeys.value.includes(key(s.category, s.name)));
          states.value = [...others, ...r.states];
          const stillMissing = r.states.filter((s) => !s.detectable).length;
          if (stillMissing > 0) ElMessage.warning(`仍有 ${stillMissing} 项无法读取,可能需要管理员权限`);
          else if (n > 0) ElMessage.info("状态已重新读取");
        } else ElMessage.error(r.error || "重新读取失败");
      } catch (e) {
        ElMessage.error("重新读取失败:" + String(e?.message || e));
      } finally {
        busy.value = false;
      }
    }
    async function retryRead(cat, g) {
      const k = key(cat.name, g.Name);
      working.value = { ...working.value, [k]: true };
      try {
        const r = await window.sysApi.shelfStates(props.files, [k]);
        if (r.success && r.states?.length) {
          states.value = states.value.map((s) => key(s.category, s.name) === k ? r.states[0] : s);
          ElMessage.info("状态已重新读取");
        } else ElMessage.error(r.error || "重新读取失败");
      } catch (e) {
        ElMessage.error(String(e?.message || e));
      } finally {
        working.value = { ...working.value, [k]: false };
      }
    }
    const toggleCat = (name) => {
      const s = new Set(expandedCats.value);
      s.has(name) ? s.delete(name) : s.add(name);
      expandedCats.value = s;
    };
    const toggleDetail = (cat, group) => {
      const k = key(cat, group);
      const s = new Set(detailOpen.value);
      s.has(k) ? s.delete(k) : s.add(k);
      detailOpen.value = s;
    };
    async function flipGroup(cat, g, e) {
      key(cat.name, g.Name);
      const isOn = switchOn(cat.name, g.Name);
      if (!isOn && (g.Level || 1) >= 3) {
        pendingFlipEl = e?.target instanceof HTMLInputElement ? e.target : null;
        openKw({ type: "flip", cat, g });
        return;
      }
      pendingFlipEl = null;
      await doFlip(cat, g, e?.target instanceof HTMLInputElement ? e.target : null);
    }
    async function doFlip(cat, g, el) {
      const k = key(cat.name, g.Name);
      const isOn = switchOn(cat.name, g.Name);
      working.value = { ...working.value, [k]: true };
      try {
        const r = isOn ? await window.sysApi.shelfRestore(props.files, [k]) : await window.sysApi.shelfApply(props.files, [k]);
        rememberResult([k], r);
        if (r.success) ElMessage.success(isOn ? "还原操作已执行" : "应用操作已执行");
        else ElMessage.error(resultError(r));
      } catch (e) {
        const error = String(e?.message || e);
        rememberResult([k], { success: false, error });
        ElMessage.error(error);
      } finally {
        working.value = { ...working.value, [k]: false };
        await loadAll();
        syncCheckbox(el ?? null, cat, g);
      }
    }
    async function applyCat(cat, on) {
      const eff = effectiveCats.value.find((c) => c.name === cat.name);
      const groups = eff?.groups ?? cat.groups;
      const keys = groups.map((g) => key(cat.name, g.Name));
      if (!keys.length) return;
      const dangerKeys = groups.filter((g) => (g.Level || 1) >= 3);
      if (on && dangerKeys.length) {
        openKw({ type: "applyCat", cat: { ...cat, groups }, on: true });
        return;
      }
      await doApplyCat({ ...cat, groups }, on);
    }
    async function doApplyCat(cat, on) {
      const keys = cat.groups.map((g) => key(cat.name, g.Name));
      if (!keys.length) return;
      busy.value = true;
      try {
        const r = on ? await window.sysApi.shelfApply(props.files, keys) : await window.sysApi.shelfRestore(props.files, keys);
        rememberResult(keys, r);
        if (r.success) ElMessage.success(on ? "批量应用操作已执行" : "批量还原操作已执行");
        else ElMessage.warning(resultError(r));
      } catch (e) {
        ElMessage.error(String(e?.message || e));
      } finally {
        busy.value = false;
        await loadAll();
      }
    }
    async function applyPreset(p) {
      const all = effectiveCats.value.flatMap((cat) => cat.groups.map((g) => ({ cat: cat.name, g })));
      const picked = all.filter(({ g }) => p.levels === "all" || p.levels.includes(g.Level || 1));
      if (!picked.length) {
        ElMessage.info("该预设无匹配项");
        return;
      }
      if (p.dangerous) {
        openKw({
          type: "applyPreset",
          preset: p,
          presetHigh: picked.filter(({ g }) => (g.Level || 1) >= 3).map(({ g }) => ({ name: g.Name, level: g.Level || 1 }))
        });
        return;
      }
      await doApplyPreset(p);
    }
    async function doApplyPreset(p) {
      const all = effectiveCats.value.flatMap((cat) => cat.groups.map((g) => ({ cat: cat.name, g })));
      const picked = all.filter(({ g }) => p.levels === "all" || p.levels.includes(g.Level || 1));
      if (!picked.length) {
        ElMessage.info("该预设无匹配项");
        return;
      }
      busy.value = true;
      try {
        const r = await window.sysApi.shelfApply(props.files, picked.map(({ cat, g }) => key(cat, g.Name)));
        rememberResult(picked.map(({ cat, g }) => key(cat, g.Name)), r);
        if (r.success) ElMessage.success(`预设「${p.label}」已应用`);
        else ElMessage.warning(resultError(r));
      } catch (e) {
        ElMessage.error(String(e?.message || e));
      } finally {
        busy.value = false;
        await loadAll();
      }
    }
    async function runAction(a) {
      if (a.danger) {
        try {
          await ElMessageBox.confirm(`确定执行「${a.label}」?`, "动作确认", { type: "warning", confirmButtonText: "执行", cancelButtonText: "取消" });
        } catch {
          return;
        }
      }
      busy.value = true;
      try {
        const r = await window.sysApi.shelfAction(a.id);
        if (r.success) ElMessage.success(r.message || "完成");
        else ElMessage.error(r.message || "执行失败");
      } finally {
        busy.value = false;
      }
    }
    async function loadDevices() {
      if (!props.deviceProbe || !window.sysApi.shelfDevices) return;
      devices.value = { status: "loading" };
      try {
        const r = await window.sysApi.shelfDevices(props.deviceProbe);
        if (r.success && r.info) devices.value = { status: "ok", info: r.info };
        else devices.value = { status: "fail", error: r.error };
      } catch (e) {
        devices.value = { status: "fail", error: String(e?.message || e) };
      }
    }
    onMounted(() => {
      loadAll();
      applyFocus();
      if (props.overview) loadDevices();
      timer = setInterval(() => {
        loadAll();
        if (props.overview) loadDevices();
      }, 3e4);
    });
    watch([tweakFocus, loaded], applyFocus);
    onUnmounted(() => {
      if (timer) clearInterval(timer);
      if (focusTimer) clearTimeout(focusTimer);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        __props.title || __props.presets?.length || __props.actions?.length ? (openBlock(), createElementBlock("div", _hoisted_2, [
          __props.title ? (openBlock(), createElementBlock("span", _hoisted_3, toDisplayString(__props.title), 1)) : createCommentVNode("", true),
          __props.presets?.length ? (openBlock(), createElementBlock("div", _hoisted_4, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(__props.presets, (p) => {
              return openBlock(), createElementBlock("button", {
                key: p.id,
                class: normalizeClass(["preset-btn", { danger: p.dangerous }]),
                disabled: busy.value,
                onClick: ($event) => applyPreset(p)
              }, toDisplayString(p.label), 11, _hoisted_5);
            }), 128))
          ])) : createCommentVNode("", true),
          __props.actions?.length ? (openBlock(), createElementBlock("div", _hoisted_6, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(__props.actions, (a) => {
              return openBlock(), createElementBlock("button", {
                key: a.id,
                class: normalizeClass(["action-btn", { danger: a.danger }]),
                disabled: busy.value,
                onClick: ($event) => runAction(a)
              }, toDisplayString(a.label), 11, _hoisted_7);
            }), 128))
          ])) : createCommentVNode("", true),
          createBaseVNode("button", {
            class: "refresh-btn",
            disabled: busy.value,
            onClick: loadAll
          }, "刷新状态", 8, _hoisted_8)
        ])) : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_9, [
          withDirectives(createBaseVNode("input", {
            class: "shelf-search",
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => search.value = $event),
            placeholder: "搜索调优项…"
          }, null, 512), [
            [vModelText, search.value]
          ]),
          !props.overview ? (openBlock(), createElementBlock("div", _hoisted_10, [
            (openBlock(), createElementBlock(Fragment, null, renderList([1, 2, 3, 4], (lv) => {
              return createBaseVNode("button", {
                key: lv,
                class: normalizeClass(["level-chip", { active: levelFilter.value === lv }]),
                onClick: ($event) => levelFilter.value = levelFilter.value === lv ? 0 : lv
              }, " Lv" + toDisplayString(lv), 11, _hoisted_11);
            }), 64))
          ])) : (openBlock(), createElementBlock("div", _hoisted_12, [
            createBaseVNode("button", {
              class: normalizeClass(["level-chip", { active: riskFilter.value === "all" }]),
              onClick: _cache[1] || (_cache[1] = ($event) => riskFilter.value = "all")
            }, "全部", 2),
            createBaseVNode("button", {
              class: normalizeClass(["level-chip", { active: riskFilter.value === "safe" }]),
              onClick: _cache[2] || (_cache[2] = ($event) => riskFilter.value = "safe")
            }, "安全", 2),
            createBaseVNode("button", {
              class: normalizeClass(["level-chip", { active: riskFilter.value === "medium" }]),
              onClick: _cache[3] || (_cache[3] = ($event) => riskFilter.value = "medium")
            }, "中等", 2),
            createBaseVNode("button", {
              class: normalizeClass(["level-chip hi", { active: riskFilter.value === "high" }]),
              onClick: _cache[4] || (_cache[4] = ($event) => riskFilter.value = "high")
            }, "高风险", 2)
          ]))
        ]),
        props.overview ? (openBlock(), createBlock(ShelfOverview, {
          key: 1,
          categories: effectiveCats.value,
          states: states.value,
          busy: busy.value,
          devices: devices.value,
          "device-mode": props.deviceProbe,
          onRefreshRemaining: readRemaining
        }, null, 8, ["categories", "states", "busy", "devices", "device-mode"])) : createCommentVNode("", true),
        __props.dangerNote ? (openBlock(), createElementBlock("div", _hoisted_13, "⚠ " + toDisplayString(__props.dangerNote), 1)) : createCommentVNode("", true),
        _cache[8] || (_cache[8] = createBaseVNode("div", { class: "tweak-desc" }, "关闭开关执行该项预设的还原操作，不等同于恢复修改前的全部设置。", -1)),
        !loaded.value ? (openBlock(), createElementBlock("div", _hoisted_14, "加载中…")) : categories.value.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_15, "暂无调优项")) : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_16, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(filteredCats.value, (cat) => {
            return openBlock(), createElementBlock("div", {
              class: "cat-card",
              key: cat.name
            }, [
              createBaseVNode("div", {
                class: "cat-header",
                onClick: ($event) => toggleCat(cat.name)
              }, [
                createBaseVNode("div", _hoisted_18, [
                  createBaseVNode("span", {
                    class: "cat-dot",
                    style: normalizeStyle({ background: catColor(cat.order) })
                  }, null, 4),
                  createBaseVNode("span", _hoisted_19, toDisplayString(cat.name), 1),
                  createBaseVNode("span", _hoisted_20, toDisplayString(onCount(cat)) + "/" + toDisplayString(cat.groups.length) + " 已开启", 1)
                ]),
                createBaseVNode("div", _hoisted_21, [
                  createBaseVNode("button", {
                    class: "chip-mini",
                    disabled: busy.value,
                    onClick: withModifiers(($event) => applyCat(cat, true), ["stop"])
                  }, "全部开启", 8, _hoisted_22),
                  createBaseVNode("button", {
                    class: "chip-mini",
                    disabled: busy.value,
                    onClick: withModifiers(($event) => applyCat(cat, false), ["stop"])
                  }, "全部还原", 8, _hoisted_23),
                  (openBlock(), createElementBlock("svg", {
                    class: normalizeClass(["chevron", { open: expandedCats.value.has(cat.name) }]),
                    width: "16",
                    height: "16",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "#94a3b8",
                    "stroke-width": "2"
                  }, [..._cache[6] || (_cache[6] = [
                    createBaseVNode("path", { d: "M6 9l6 6 6-6" }, null, -1)
                  ])], 2))
                ])
              ], 8, _hoisted_17),
              expandedCats.value.has(cat.name) ? (openBlock(), createElementBlock("div", _hoisted_24, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(cat.groups, (g) => {
                  return openBlock(), createElementBlock("div", {
                    class: normalizeClass(["tweak-row", { applied: stateOn(cat.name, g.Name), working: working.value[cat.name + "::" + g.Name], "focus-highlight": focusKey.value === key(cat.name, g.Name) }]),
                    key: g.Name,
                    "data-key": key(cat.name, g.Name)
                  }, [
                    createBaseVNode("div", {
                      class: "tweak-info",
                      onClick: ($event) => toggleDetail(cat.name, g.Name)
                    }, [
                      createBaseVNode("div", _hoisted_27, [
                        createTextVNode(toDisplayString(g.Name) + " ", 1),
                        createBaseVNode("span", {
                          class: normalizeClass(["level-badge", "lv" + (g.Level || 1)])
                        }, "Lv" + toDisplayString(g.Level || 1), 3),
                        createBaseVNode("span", _hoisted_28, toDisplayString(detailOpen.value.has(key(cat.name, g.Name)) ? "▼" : "▶"), 1),
                        createBaseVNode("span", _hoisted_29, [
                          working.value[cat.name + "::" + g.Name] ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                            createTextVNode("⏳ 处理中")
                          ], 64)) : props.overview ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                            softwareAppliedOn(cat.name, g.Name) ? (openBlock(), createElementBlock("span", _hoisted_30, toDisplayString(detectable(cat.name, g.Name) ? "本软件已应用" : "本软件已执行 · 状态未确认"), 1)) : createCommentVNode("", true),
                            stateOn(cat.name, g.Name) ? (openBlock(), createElementBlock("span", _hoisted_31, "当前符合目标")) : createCommentVNode("", true),
                            !detectable(cat.name, g.Name) ? (openBlock(), createElementBlock("span", _hoisted_32, "未确认")) : createCommentVNode("", true),
                            detectable(cat.name, g.Name) && !softwareAppliedOn(cat.name, g.Name) ? (openBlock(), createBlock(StatusDot, {
                              key: 3,
                              status: stateOn(cat.name, g.Name) ? "done" : "idle",
                              label: stateOn(cat.name, g.Name) ? "已开启" : "关闭",
                              size: 7
                            }, null, 8, ["status", "label"])) : createCommentVNode("", true)
                          ], 64)) : !detectable(cat.name, g.Name) ? (openBlock(), createElementBlock("span", _hoisted_33, toDisplayString(softwareAppliedOn(cat.name, g.Name) ? "本软件已执行 · 状态未确认" : "状态未确认"), 1)) : (openBlock(), createBlock(StatusDot, {
                            key: 3,
                            status: stateOn(cat.name, g.Name) ? "done" : "idle",
                            label: stateOn(cat.name, g.Name) ? "已开启" : "关闭",
                            size: 7
                          }, null, 8, ["status", "label"]))
                        ]),
                        !detectable(cat.name, g.Name) ? (openBlock(), createElementBlock("span", _hoisted_34, "?")) : createCommentVNode("", true),
                        props.overview && !detectable(cat.name, g.Name) ? (openBlock(), createElementBlock("button", {
                          key: 1,
                          class: "retry-btn",
                          disabled: busy.value || working.value[cat.name + "::" + g.Name],
                          onClick: withModifiers(($event) => retryRead(cat, g), ["stop"])
                        }, " 重新读取 ", 8, _hoisted_35)) : createCommentVNode("", true)
                      ]),
                      createBaseVNode("div", _hoisted_36, toDisplayString(g.Description || ""), 1),
                      rowError(cat.name, g.Name) ? (openBlock(), createElementBlock("div", _hoisted_37, toDisplayString(rowError(cat.name, g.Name)), 1)) : !detectable(cat.name, g.Name) ? (openBlock(), createElementBlock("div", _hoisted_38, "无法确认当前系统状态；开关按本软件的执行记录显示，可关闭开关尝试还原。")) : createCommentVNode("", true),
                      detailOpen.value.has(key(cat.name, g.Name)) && (g.Description || g.WillBrake?.length || g.Alert?.length) ? (openBlock(), createElementBlock("div", {
                        key: 2,
                        class: "tweak-detail",
                        onClick: _cache[5] || (_cache[5] = withModifiers(() => {
                        }, ["stop"]))
                      }, [
                        g.Description ? (openBlock(), createElementBlock("div", _hoisted_39, toDisplayString(g.Description), 1)) : createCommentVNode("", true),
                        g.WillBrake?.length ? (openBlock(), createElementBlock("div", _hoisted_40, "⚠ 可能影响: " + toDisplayString(g.WillBrake.join("、")), 1)) : createCommentVNode("", true),
                        g.Alert?.length ? (openBlock(), createElementBlock("div", _hoisted_41, "! 注意: " + toDisplayString(g.Alert.join("、")), 1)) : createCommentVNode("", true)
                      ])) : createCommentVNode("", true)
                    ], 8, _hoisted_26),
                    createBaseVNode("label", {
                      class: normalizeClass(["toggle-switch", { loading: working.value[cat.name + "::" + g.Name] }])
                    }, [
                      createBaseVNode("input", {
                        type: "checkbox",
                        checked: switchOn(cat.name, g.Name),
                        disabled: busy.value || working.value[cat.name + "::" + g.Name],
                        onChange: ($event) => flipGroup(cat, g, $event)
                      }, null, 40, _hoisted_42),
                      _cache[7] || (_cache[7] = createBaseVNode("span", { class: "toggle-slider" }, null, -1))
                    ], 2)
                  ], 10, _hoisted_25);
                }), 128))
              ])) : createCommentVNode("", true)
            ]);
          }), 128))
        ]),
        createVNode(KeywordConfirm, {
          visible: kwState.value,
          title: kwTitle.value,
          detail: kwDetail.value,
          consequences: kwConsequences.value,
          keyword: "确认执行",
          onConfirm: kwConfirm,
          onCancel: kwCancel
        }, null, 8, ["visible", "title", "detail", "consequences"])
      ]);
    };
  }
});
const TweakShelf = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e46ec3e7"]]);
export {
  TweakShelf as T,
  tweakFocus as t
};
