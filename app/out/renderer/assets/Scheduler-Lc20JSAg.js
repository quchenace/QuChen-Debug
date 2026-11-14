import { g as computed, a7 as reactive, a9 as ref, t as defineComponent, a5 as openBlock, l as createElementBlock, i as createBaseVNode, aG as withDirectives, aA as vModelText, q as createTextVNode, k as createCommentVNode, ak as toDisplayString, _ as _export_sfc, D as inject, aD as watch, a1 as onMounted, a3 as onUnmounted, S as normalizeClass, F as Fragment, ab as renderList, aI as withModifiers, az as vModelSelect, ax as vModelCheckbox, as as unref, y as h, p as createStaticVNode, r as createVNode, aF as withCtx, j as createBlock, V as normalizeStyle, L as isRef, b as Transition, R as nextTick } from "./main-DAqTdO6U.js";
import { E as EmbeddedSection } from "./EmbeddedSection-SxpWnTdG.js";
import { c as ElInput, E as ElButton, j as ElTableColumn, i as ElTable, f as ElOption, g as ElSelect, h as ElSwitch } from "./index-CL4m76NE.js";
function createSchedulerEditor(api) {
  const topology = ref(), selected = ref(), current = ref(), status = ref();
  const busy = ref(false), error = ref(""), message = ref(""), threads = ref([]), threadId = ref(0), matchBy = ref("path");
  const draft = reactive({ mode: "affinity", cpuSetIds: [], priority: "Normal", ideal: null });
  const groups = computed(() => [...new Set(topology.value?.cpuSets.map((c) => c.group) ?? [])]);
  const idealCpus = computed(() => topology.value?.cpuSets.filter((c) => !c.allocated && c.group === draft.ideal?.group && draft.cpuSetIds.includes(c.id)) ?? []);
  const native = () => {
    const value = api();
    if (!value) throw Error("调度接口未加载，请重启软件");
    return value;
  };
  async function loadStatus() {
    status.value = await native().status();
  }
  async function run(work, mutation = false) {
    if (busy.value) return;
    busy.value = true;
    error.value = "";
    message.value = "";
    try {
      await work();
    } catch (e) {
      error.value = String(e).replace(/^Error:\s*/, "");
    } finally {
      if (mutation) try {
        await loadStatus();
      } catch (e) {
        error.value ||= String(e);
      }
      busy.value = false;
    }
  }
  async function refresh() {
    await run(async () => {
      const [t, s] = await Promise.all([native().topology(), native().status()]);
      topology.value = t;
      status.value = s;
      if (!selected.value) selectAll();
    });
  }
  function hydrate(snapshot) {
    current.value = snapshot;
    draft.mode = snapshot.cpuSetIds.length || groups.value.length !== 1 ? "cpuSets" : "affinity";
    draft.priority = ["Idle", "BelowNormal", "Normal", "AboveNormal", "High"].includes(snapshot.priority) ? snapshot.priority : "Normal";
    draft.cpuSetIds = snapshot.cpuSetIds.length ? [...snapshot.cpuSetIds] : topology.value.cpuSets.filter((c) => !c.allocated && (snapshot.affinity === null || !!(BigInt(snapshot.affinity) & 1n << BigInt(c.logicalIndex)))).map((c) => c.id);
    draft.ideal = null;
    threads.value = [];
    threadId.value = 0;
  }
  async function selectPid(pid, name) {
    await run(async () => {
      selected.value = void 0;
      current.value = void 0;
      draft.cpuSetIds = [];
      draft.ideal = null;
      threads.value = [];
      threadId.value = 0;
      if (!topology.value) topology.value = await native().topology();
      const p = (await native().processes()).find((p2) => p2.pid === pid && p2.name.toLowerCase() === name.toLowerCase());
      if (!p) throw Error("此进程已退出或不可访问，请刷新进程树后重试");
      const snapshot = await native().inspect(p);
      hydrate(snapshot);
      selected.value = p;
    });
  }
  function selectAll() {
    draft.cpuSetIds = topology.value?.cpuSets.filter((c) => !c.allocated).map((c) => c.id) ?? [];
  }
  function selectPerformance() {
    const cpus = topology.value?.cpuSets.filter((c) => !c.allocated) ?? [], best = Math.max(...cpus.map((c) => c.efficiency));
    draft.cpuSetIds = cpus.filter((c) => c.efficiency === best).map((c) => c.id);
  }
  async function loadThreads() {
    if (!selected.value) return;
    await run(async () => {
      threads.value = (await native().threads(selected.value)).sort((a, b) => b.cpuMs - a.cpuMs);
    });
  }
  function chooseThread() {
    const t = threads.value.find((t2) => t2.tid === threadId.value);
    draft.ideal = t ? { ...t.ideal } : null;
  }
  async function apply() {
    if (!selected.value || !draft.cpuSetIds.length) return;
    await run(async () => {
      current.value = await native().apply(selected.value, JSON.parse(JSON.stringify(draft)));
      message.value = "调度已应用，回读验证通过，原始设置已保存。";
    }, true);
  }
  async function saveRule() {
    if (!selected.value || draft.ideal || !draft.cpuSetIds.length) return;
    await run(async () => {
      const p = selected.value, target = matchBy.value === "path" ? p.path : p.name;
      const previous = status.value?.rules.find((r) => r.match === matchBy.value && r.target.toLowerCase() === target.toLowerCase());
      await native().saveRule({ id: previous?.id ?? crypto.randomUUID(), enabled: true, match: matchBy.value, target, draft: JSON.parse(JSON.stringify(draft)) });
      message.value = "规则已保存，启用自动规则后生效。";
    }, true);
  }
  async function toggleRules() {
    await run(async () => {
      await native().setEnabled(!status.value?.enabled);
    }, true);
  }
  async function changeRule(rule) {
    await run(async () => {
      await native().saveRule({ ...JSON.parse(JSON.stringify(rule)), enabled: !rule.enabled });
    }, true);
  }
  async function removeRule(id) {
    await run(async () => {
      await native().deleteRule(id);
    }, true);
  }
  async function restore(id) {
    await run(async () => {
      await native().restore(id);
      message.value = "原始调度设置已恢复。";
      if (selected.value) try {
        hydrate(await native().inspect(selected.value));
      } catch {
        selected.value = void 0;
        current.value = void 0;
      }
    }, true);
  }
  async function forgetExited(id) {
    await run(async () => {
      await native().forgetExited(id);
      message.value = "已确认原进程退出，清理对应记录。";
    }, true);
  }
  return { topology, selected, current, status, busy, error, message, threads, threadId, matchBy, draft, groups, idealCpus, refresh, loadStatus, selectPid, selectAll, selectPerformance, loadThreads, chooseThread, apply, saveRule, toggleRules, changeRule, removeRule, restore, forgetExited };
}
const _hoisted_1$2 = { class: "mt-5 rounded-xl border border-white/10 p-5" };
const _hoisted_2$2 = ["disabled"];
const _hoisted_3$2 = { class: "mt-3 flex gap-3" };
const _hoisted_4$2 = ["disabled"];
const _hoisted_5$2 = ["disabled"];
const _hoisted_6$2 = ["disabled"];
const _hoisted_7$2 = {
  key: 0,
  class: "mt-3 text-xs text-amber-400"
};
const _hoisted_8$2 = { class: "mt-2 flex gap-3" };
const _hoisted_9$2 = ["disabled"];
const _hoisted_10$2 = {
  key: 1,
  class: "mt-3 text-xs text-red-400"
};
const _hoisted_11$2 = {
  key: 2,
  class: "mt-3 text-xs text-gray-300"
};
const _hoisted_12$2 = {
  key: 3,
  class: "mt-2 text-xs text-amber-400"
};
const _hoisted_13$2 = {
  key: 4,
  class: "mt-2 whitespace-pre-wrap break-all text-[10px] text-gray-500"
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "BackgroundThrottleCard",
  setup(__props) {
    const busy = ref(false), error = ref(""), state = ref(null), exclusions = ref("obs64.exe;discord.exe"), confirm = ref(false);
    async function act(action) {
      busy.value = true;
      error.value = "";
      confirm.value = false;
      try {
        const r = await window.nativeLatencyApi.background(action, exclusions.value.split(/[;；\n]/).map((s) => s.trim()).filter(Boolean));
        state.value = r;
        if (!r.success) error.value = r.error || "操作失败";
      } catch (e) {
        error.value = String(e);
      } finally {
        busy.value = false;
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$2, [
        _cache[7] || (_cache[7] = createBaseVNode("h3", { class: "text-sm text-gray-200" }, "临时后台节流", -1)),
        _cache[8] || (_cache[8] = createBaseVNode("p", { class: "my-2 text-xs text-gray-500" }, "复用原生助手，按前后台状态降低后台进程资源优先级；停止或本程序退出时请求恢复。本次会话启用，重开软件不会自动启动。", -1)),
        withDirectives(createBaseVNode("input", {
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => exclusions.value = $event),
          disabled: busy.value || state.value?.running,
          placeholder: "排除应用，例如 game.exe;obs64.exe",
          class: "mt-2 w-full rounded bg-black/20 p-2 text-xs text-gray-300"
        }, null, 8, _hoisted_2$2), [
          [vModelText, exclusions.value]
        ]),
        createBaseVNode("div", _hoisted_3$2, [
          createBaseVNode("button", {
            class: "btn-ghost text-xs",
            disabled: busy.value,
            onClick: _cache[1] || (_cache[1] = ($event) => act("status"))
          }, "读取状态", 8, _hoisted_4$2),
          createBaseVNode("button", {
            class: "btn-ghost text-xs",
            disabled: busy.value || state.value?.running,
            onClick: _cache[2] || (_cache[2] = ($event) => confirm.value = true)
          }, "启用临时节流", 8, _hoisted_5$2),
          createBaseVNode("button", {
            class: "btn-ghost text-xs",
            disabled: busy.value || !state.value?.running,
            onClick: _cache[3] || (_cache[3] = ($event) => act("stop"))
          }, "停止并恢复", 8, _hoisted_6$2)
        ]),
        confirm.value ? (openBlock(), createElementBlock("div", _hoisted_7$2, [
          _cache[6] || (_cache[6] = createTextVNode("将调整后台应用的资源优先级。请将录制、语音及其他需要保持性能的应用加入排除列表。", -1)),
          createBaseVNode("div", _hoisted_8$2, [
            createBaseVNode("button", {
              class: "btn-ghost text-xs",
              disabled: busy.value,
              onClick: _cache[4] || (_cache[4] = ($event) => act("start"))
            }, "确认启用", 8, _hoisted_9$2),
            createBaseVNode("button", {
              class: "btn-ghost text-xs",
              onClick: _cache[5] || (_cache[5] = ($event) => confirm.value = false)
            }, "取消")
          ])
        ])) : createCommentVNode("", true),
        error.value ? (openBlock(), createElementBlock("p", _hoisted_10$2, toDisplayString(error.value), 1)) : createCommentVNode("", true),
        state.value ? (openBlock(), createElementBlock("p", _hoisted_11$2, toDisplayString(state.value.running ? "运行中" : "未运行"), 1)) : createCommentVNode("", true),
        state.value?.recoveryNotice ? (openBlock(), createElementBlock("p", _hoisted_12$2, toDisplayString(state.value.recoveryNotice), 1)) : createCommentVNode("", true),
        state.value?.details ? (openBlock(), createElementBlock("pre", _hoisted_13$2, toDisplayString(state.value.details), 1)) : createCommentVNode("", true)
      ]);
    };
  }
});
const BackgroundThrottleCard = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-9a824c79"]]);
const _hoisted_1$1 = { class: "scene-page embedded-tool" };
const _hoisted_2$1 = { class: "scene-heading" };
const _hoisted_3$1 = ["disabled"];
const _hoisted_4$1 = {
  key: 1,
  role: "alert",
  class: "banner error"
};
const _hoisted_5$1 = {
  key: 2,
  class: "recovery"
};
const _hoisted_6$1 = { class: "muted" };
const _hoisted_7$1 = { class: "recovery-actions" };
const _hoisted_8$1 = ["disabled"];
const _hoisted_9$1 = ["disabled"];
const _hoisted_10$1 = {
  key: 3,
  class: "banner error"
};
const _hoisted_11$1 = { class: "recovery-actions" };
const _hoisted_12$1 = ["disabled"];
const _hoisted_13$1 = { class: "status-grid" };
const _hoisted_14$1 = { class: "scene-columns" };
const _hoisted_15$1 = { class: "panel profile-list" };
const _hoisted_16$1 = { class: "panel-title" };
const _hoisted_17$1 = ["disabled"];
const _hoisted_18$1 = {
  key: 0,
  class: "empty"
};
const _hoisted_19$1 = { class: "profile-title" };
const _hoisted_20$1 = { class: "tags" };
const _hoisted_21$1 = {
  key: 0,
  class: "delete-confirm"
};
const _hoisted_22$1 = ["disabled", "onClick"];
const _hoisted_23$1 = {
  key: 1,
  class: "profile-actions"
};
const _hoisted_24$1 = ["disabled", "onClick"];
const _hoisted_25$1 = ["disabled", "onClick"];
const _hoisted_26$1 = {
  key: 1,
  class: "hint"
};
const _hoisted_27$1 = { class: "panel-title" };
const _hoisted_28$1 = ["disabled"];
const _hoisted_29$1 = ["disabled"];
const _hoisted_30$1 = { class: "two" };
const _hoisted_31$1 = { class: "two" };
const _hoisted_32$1 = ["value"];
const _hoisted_33$1 = ["value"];
const _hoisted_34$1 = ["value"];
const _hoisted_35$1 = { class: "check" };
const _hoisted_36$1 = { class: "hint" };
const _hoisted_37$1 = { class: "two" };
const _hoisted_38$1 = { class: "check" };
const _hoisted_39$1 = {
  key: 0,
  class: "bands"
};
const _hoisted_40$1 = ["onUpdate:modelValue"];
const _hoisted_41$1 = {
  key: 1,
  class: "hint"
};
const _hoisted_42$1 = ["value"];
const _hoisted_43$1 = ["value"];
const _hoisted_44$1 = { class: "save-row" };
const _hoisted_45$1 = {
  class: "primary",
  type: "submit"
};
const _hoisted_46$1 = {
  key: 4,
  class: "banner error"
};
const _hoisted_47$1 = {
  key: 5,
  class: "panel notices",
  open: ""
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "GameScenePanel",
  setup(__props) {
    const api = window.gameScenesApi;
    const sectionActive = inject("embeddedSectionActive", ref(true));
    const emptyForm = () => ({ id: `scene_${crypto.randomUUID().replace(/-/g, "")}`, name: "", exe: "", rank: 50, priority: null, affinity: null, powerPlan: null, eq: null, iccPreset: null });
    const form = reactive(emptyForm());
    const state = ref({ enabled: false, profiles: [], active: null, waiting: [], pending: [], notices: [], error: null });
    const options = ref({ powerPlans: [], iccPresets: [], cpuCount: 0, eqConnected: false, conflicts: [] });
    const busy = ref(false), message = ref(""), messageError = ref(false), deleteId = ref(""), affinity = ref("");
    const confirmKeep = ref(false);
    const eqOn = ref(false), eqEnabled = ref(true), eqMaster = ref(0), bandsOn = ref(false), gains = ref(Array(10).fill(0));
    const locked = computed(() => state.value.enabled || state.value.pending.length > 0);
    const editing = computed(() => state.value.profiles.some((p) => p.id === form.id));
    const priorities = [{ value: "Idle", name: "空闲" }, { value: "BelowNormal", name: "低于正常" }, { value: "Normal", name: "正常" }, { value: "AboveNormal", name: "高于正常" }, { value: "High", name: "高" }];
    let timer;
    let loading = false, disposed = false;
    const errorText = (e) => e instanceof Error ? e.message : String(e);
    function resourceLabel(key) {
      return key === "power" ? "电源计划" : key === "gamma" ? "主屏 Gamma" : key.startsWith("eq:") ? "EQ 设置" : "进程调度";
    }
    function profileSummary(p) {
      return [p.priority && "优先级", p.affinity && "CPU 亲和性", p.powerPlan && "电源", p.eq && "EQ", p.iccPreset && "ICC"].filter(Boolean).join(" · ");
    }
    async function refresh() {
      if (loading || disposed || document.hidden || !sectionActive.value) return;
      loading = true;
      try {
        const r = await api.getState();
        if (r.state) state.value = r.state;
        if (!r.success) throw Error(r.error || "读取失败");
      } catch (e) {
        message.value = errorText(e);
        messageError.value = true;
      } finally {
        loading = false;
      }
    }
    async function loadOptions() {
      try {
        const r = await api.getOptions();
        if (!r.success || !r.options) throw Error(r.error || "选项读取失败");
        options.value = r.options;
      } catch (e) {
        message.value = errorText(e);
        messageError.value = true;
      }
    }
    async function run(work, success) {
      if (busy.value) return;
      busy.value = true;
      message.value = "";
      try {
        const r = await work();
        if (r.state) state.value = r.state;
        if (!r.success) throw Error(r.error || "操作失败");
        message.value = success;
        messageError.value = false;
      } catch (e) {
        message.value = errorText(e);
        messageError.value = true;
      } finally {
        busy.value = false;
      }
    }
    function newProfile() {
      Object.assign(form, emptyForm());
      affinity.value = "";
      eqOn.value = false;
      eqEnabled.value = true;
      eqMaster.value = 0;
      bandsOn.value = false;
      gains.value = Array(10).fill(0);
      deleteId.value = "";
    }
    function edit(p) {
      Object.assign(form, JSON.parse(JSON.stringify(p)));
      affinity.value = p.affinity === null ? "" : String(p.affinity);
      eqOn.value = !!p.eq;
      eqEnabled.value = p.eq?.enabled ?? true;
      eqMaster.value = p.eq?.master ?? 0;
      bandsOn.value = !!p.eq?.gains;
      gains.value = p.eq?.gains ? [...p.eq.gains] : Array(10).fill(0);
      deleteId.value = "";
    }
    async function save() {
      if (affinity.value.trim() && !/^\d+$/.test(affinity.value.trim())) {
        message.value = "亲和性掩码必须为正整数";
        messageError.value = true;
        return;
      }
      const profile = { ...form, affinity: affinity.value.trim() ? Number(affinity.value) : null, eq: eqOn.value ? { enabled: eqEnabled.value, master: eqMaster.value, ...bandsOn.value ? { gains: [...gains.value] } : {} } : null };
      await run(() => api.save(profile), "场景已保存，可手动启用自动联动");
    }
    async function remove(id) {
      await run(() => api.delete(id), "场景已删除");
      deleteId.value = "";
      if (!messageError.value && form.id === id) newProfile();
    }
    async function toggle() {
      const on = !state.value.enabled;
      await run(() => api.setEnabled(on), on ? "自动联动已启用" : "自动联动已关闭，恢复结果见状态与记录");
      await loadOptions();
    }
    async function keepCurrent() {
      await run(() => api.keepCurrent(), "已保留当前设置并放弃恢复记录");
      confirmKeep.value = false;
    }
    function visibility() {
      if (timer) clearInterval(timer);
      timer = void 0;
      if (disposed || document.hidden || !sectionActive.value) return;
      void refresh();
      timer = setInterval(() => {
        void refresh();
      }, 3e3);
    }
    watch(sectionActive, visibility);
    onMounted(() => {
      void loadOptions();
      visibility();
      document.addEventListener("visibilitychange", visibility);
    });
    onUnmounted(() => {
      disposed = true;
      if (timer) clearInterval(timer);
      document.removeEventListener("visibilitychange", visibility);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        createBaseVNode("header", _hoisted_2$1, [
          _cache[15] || (_cache[15] = createBaseVNode("div", null, [
            createBaseVNode("p", { class: "subtitle" }, "按游戏联动调度、电源、EQ 与 ICC，退出时恢复捕获的原值。")
          ], -1)),
          createBaseVNode("button", {
            class: "primary",
            disabled: busy.value || !state.value.enabled && (!state.value.profiles.length || !!state.value.pending.length),
            onClick: toggle
          }, toDisplayString(state.value.enabled ? "关闭并恢复" : "启用自动联动"), 9, _hoisted_3$1)
        ]),
        message.value ? (openBlock(), createElementBlock("div", {
          key: 0,
          role: "status",
          class: normalizeClass(["banner", { error: messageError.value }])
        }, toDisplayString(message.value), 3)) : createCommentVNode("", true),
        state.value.error ? (openBlock(), createElementBlock("div", _hoisted_4$1, toDisplayString(state.value.error), 1)) : createCommentVNode("", true),
        state.value.pending.length && !state.value.active ? (openBlock(), createElementBlock("section", _hoisted_5$1, [
          createBaseVNode("div", null, [
            createBaseVNode("strong", null, "有 " + toDisplayString(state.value.pending.length) + " 项待恢复设置", 1),
            _cache[16] || (_cache[16] = createBaseVNode("p", null, "异常退出或读取失败会保留恢复记录。恢复时检查当前值，保留之后的手动修改。", -1)),
            createBaseVNode("p", _hoisted_6$1, toDisplayString([...new Set(state.value.pending.map((p) => resourceLabel(p.key)))].join("、")), 1)
          ]),
          createBaseVNode("div", _hoisted_7$1, [
            createBaseVNode("button", {
              disabled: busy.value,
              onClick: _cache[0] || (_cache[0] = ($event) => run(() => unref(api).recover(), "恢复检查完成"))
            }, "检查并恢复", 8, _hoisted_8$1),
            createBaseVNode("button", {
              disabled: busy.value,
              onClick: _cache[1] || (_cache[1] = ($event) => confirmKeep.value = true)
            }, "保留当前设置", 8, _hoisted_9$1)
          ])
        ])) : createCommentVNode("", true),
        confirmKeep.value && state.value.pending.length && !state.value.active ? (openBlock(), createElementBlock("div", _hoisted_10$1, [
          createBaseVNode("p", null, "将放弃 " + toDisplayString(state.value.pending.length) + " 项恢复记录，保留当前系统设置。之后无法通过这些记录恢复原值。", 1),
          createBaseVNode("div", _hoisted_11$1, [
            createBaseVNode("button", {
              disabled: busy.value,
              onClick: keepCurrent
            }, "确认保留并放弃恢复", 8, _hoisted_12$1),
            createBaseVNode("button", {
              onClick: _cache[2] || (_cache[2] = ($event) => confirmKeep.value = false)
            }, "取消")
          ])
        ])) : createCommentVNode("", true),
        createBaseVNode("section", _hoisted_13$1, [
          createBaseVNode("div", null, [
            _cache[17] || (_cache[17] = createBaseVNode("span", null, "自动联动", -1)),
            createBaseVNode("strong", {
              class: normalizeClass({ on: state.value.enabled })
            }, toDisplayString(state.value.enabled ? "正在监视游戏" : "已关闭"), 3)
          ]),
          createBaseVNode("div", null, [
            _cache[18] || (_cache[18] = createBaseVNode("span", null, "当前占用", -1)),
            createBaseVNode("strong", null, toDisplayString(state.value.active?.name || "暂无"), 1)
          ]),
          createBaseVNode("div", null, [
            _cache[19] || (_cache[19] = createBaseVNode("span", null, "等待场景", -1)),
            createBaseVNode("strong", null, toDisplayString(state.value.waiting.join("、") || "暂无"), 1)
          ])
        ]),
        _cache[47] || (_cache[47] = createBaseVNode("p", { class: "hint" }, "只应用一个场景：顺序值较大者优先，同值按场景 ID 排序。保存后需手动启用，每次重启默认关闭。检测间隔约 3 秒。", -1)),
        createBaseVNode("div", _hoisted_14$1, [
          createBaseVNode("section", _hoisted_15$1, [
            createBaseVNode("div", _hoisted_16$1, [
              createBaseVNode("h2", null, [
                _cache[20] || (_cache[20] = createTextVNode("已保存场景 ", -1)),
                createBaseVNode("small", null, toDisplayString(state.value.profiles.length), 1)
              ]),
              createBaseVNode("button", {
                disabled: locked.value || busy.value,
                onClick: newProfile
              }, "新建", 8, _hoisted_17$1)
            ]),
            !state.value.profiles.length ? (openBlock(), createElementBlock("p", _hoisted_18$1, "还没有游戏场景。填写右侧配置并保存，然后手动启用自动联动。")) : createCommentVNode("", true),
            (openBlock(true), createElementBlock(Fragment, null, renderList(state.value.profiles, (p) => {
              return openBlock(), createElementBlock("article", {
                key: p.id,
                class: normalizeClass({ selected: form.id === p.id })
              }, [
                createBaseVNode("div", _hoisted_19$1, [
                  createBaseVNode("strong", null, toDisplayString(p.name), 1),
                  createBaseVNode("span", null, "顺序 " + toDisplayString(p.rank), 1)
                ]),
                createBaseVNode("code", null, toDisplayString(p.exe), 1),
                createBaseVNode("p", _hoisted_20$1, toDisplayString(profileSummary(p)), 1),
                deleteId.value === p.id ? (openBlock(), createElementBlock("div", _hoisted_21$1, [
                  _cache[21] || (_cache[21] = createBaseVNode("span", null, "确认删除这个场景？", -1)),
                  createBaseVNode("button", {
                    disabled: busy.value,
                    onClick: ($event) => remove(p.id)
                  }, "确认删除", 8, _hoisted_22$1),
                  createBaseVNode("button", {
                    onClick: _cache[3] || (_cache[3] = ($event) => deleteId.value = "")
                  }, "取消")
                ])) : (openBlock(), createElementBlock("div", _hoisted_23$1, [
                  createBaseVNode("button", {
                    disabled: locked.value || busy.value,
                    onClick: ($event) => edit(p)
                  }, "配置", 8, _hoisted_24$1),
                  createBaseVNode("button", {
                    disabled: locked.value || busy.value,
                    onClick: ($event) => deleteId.value = p.id
                  }, "删除", 8, _hoisted_25$1)
                ]))
              ], 2);
            }), 128)),
            locked.value ? (openBlock(), createElementBlock("p", _hoisted_26$1, "先关闭联动并完成恢复，再编辑或删除场景。")) : createCommentVNode("", true)
          ]),
          createBaseVNode("form", {
            class: "panel editor",
            onSubmit: withModifiers(save, ["prevent"])
          }, [
            createBaseVNode("div", _hoisted_27$1, [
              createBaseVNode("h2", null, toDisplayString(editing.value ? "编辑场景" : "新建场景"), 1),
              createBaseVNode("button", {
                type: "button",
                disabled: busy.value,
                onClick: loadOptions
              }, "刷新可用选项", 8, _hoisted_28$1)
            ]),
            createBaseVNode("fieldset", {
              disabled: locked.value || busy.value
            }, [
              createBaseVNode("label", null, [
                _cache[22] || (_cache[22] = createTextVNode("场景名称", -1)),
                withDirectives(createBaseVNode("input", {
                  "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => form.name = $event),
                  required: "",
                  maxlength: "80",
                  placeholder: "例如：竞技游戏"
                }, null, 512), [
                  [
                    vModelText,
                    form.name,
                    void 0,
                    { trim: true }
                  ]
                ])
              ]),
              createBaseVNode("div", _hoisted_30$1, [
                createBaseVNode("label", null, [
                  _cache[23] || (_cache[23] = createTextVNode("游戏进程文件名", -1)),
                  withDirectives(createBaseVNode("input", {
                    "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => form.exe = $event),
                    required: "",
                    maxlength: "132",
                    placeholder: "例如：game.exe"
                  }, null, 512), [
                    [
                      vModelText,
                      form.exe,
                      void 0,
                      { trim: true }
                    ]
                  ]),
                  _cache[24] || (_cache[24] = createBaseVNode("small", null, "仅文件名；不填写路径。", -1))
                ]),
                createBaseVNode("label", null, [
                  _cache[25] || (_cache[25] = createTextVNode("多游戏优先顺序", -1)),
                  withDirectives(createBaseVNode("input", {
                    "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => form.rank = $event),
                    type: "number",
                    min: "0",
                    max: "100",
                    required: ""
                  }, null, 512), [
                    [
                      vModelText,
                      form.rank,
                      void 0,
                      { number: true }
                    ]
                  ]),
                  _cache[26] || (_cache[26] = createBaseVNode("small", null, "0–100，较大者优先。", -1))
                ])
              ]),
              _cache[40] || (_cache[40] = createBaseVNode("h3", null, "进程调度", -1)),
              createBaseVNode("div", _hoisted_31$1, [
                createBaseVNode("label", null, [
                  _cache[28] || (_cache[28] = createTextVNode("CPU 优先级", -1)),
                  withDirectives(createBaseVNode("select", {
                    "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => form.priority = $event)
                  }, [
                    _cache[27] || (_cache[27] = createBaseVNode("option", { value: null }, "保持原值", -1)),
                    (openBlock(), createElementBlock(Fragment, null, renderList(priorities, (p) => {
                      return createBaseVNode("option", {
                        key: p.value,
                        value: p.value
                      }, toDisplayString(p.name), 9, _hoisted_32$1);
                    }), 64))
                  ], 512), [
                    [vModelSelect, form.priority]
                  ])
                ]),
                createBaseVNode("label", null, [
                  _cache[29] || (_cache[29] = createTextVNode("CPU 亲和性掩码", -1)),
                  withDirectives(createBaseVNode("input", {
                    "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => affinity.value = $event),
                    inputmode: "numeric",
                    placeholder: "留空保持原值"
                  }, null, 512), [
                    [vModelText, affinity.value]
                  ]),
                  createBaseVNode("small", null, "十进制位掩码，如 3 使用逻辑核 0、1。当前 " + toDisplayString(options.value.cpuCount || "—") + " 个逻辑处理器。", 1)
                ])
              ]),
              _cache[41] || (_cache[41] = createBaseVNode("h3", null, "电源计划", -1)),
              createBaseVNode("label", null, [
                _cache[31] || (_cache[31] = createTextVNode("游戏期间使用", -1)),
                withDirectives(createBaseVNode("select", {
                  "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => form.powerPlan = $event)
                }, [
                  _cache[30] || (_cache[30] = createBaseVNode("option", { value: null }, "保持原值", -1)),
                  (openBlock(true), createElementBlock(Fragment, null, renderList(options.value.powerPlans, (p) => {
                    return openBlock(), createElementBlock("option", {
                      key: p.guid,
                      value: p.guid.toLowerCase()
                    }, toDisplayString(p.name) + toDisplayString(p.isActive ? "（当前）" : ""), 9, _hoisted_33$1);
                  }), 128)),
                  form.powerPlan && !options.value.powerPlans.some((p) => p.guid.toLowerCase() === form.powerPlan) ? (openBlock(), createElementBlock("option", {
                    key: 0,
                    value: form.powerPlan
                  }, "原计划已不可用：" + toDisplayString(form.powerPlan), 9, _hoisted_34$1)) : createCommentVNode("", true)
                ], 512), [
                  [vModelSelect, form.powerPlan]
                ])
              ]),
              _cache[42] || (_cache[42] = createBaseVNode("h3", null, "音频 EQ", -1)),
              createBaseVNode("label", _hoisted_35$1, [
                withDirectives(createBaseVNode("input", {
                  "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => eqOn.value = $event),
                  type: "checkbox"
                }, null, 512), [
                  [vModelCheckbox, eqOn.value]
                ]),
                _cache[32] || (_cache[32] = createTextVNode("联动 EQ 设置", -1))
              ]),
              createBaseVNode("p", _hoisted_36$1, toDisplayString(options.value.eqConnected ? "引擎已连接，应用时仍会请求真实状态。" : "引擎未连接。启用前需在音频页面启动引擎，否则整个场景不会应用。") + " 场景不切换输出设备、不改变主电源/旁路状态。", 1),
              eqOn.value ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                createBaseVNode("div", _hoisted_37$1, [
                  createBaseVNode("label", null, [
                    _cache[34] || (_cache[34] = createTextVNode("均衡器", -1)),
                    withDirectives(createBaseVNode("select", {
                      "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => eqEnabled.value = $event)
                    }, [..._cache[33] || (_cache[33] = [
                      createBaseVNode("option", { value: true }, "开启", -1),
                      createBaseVNode("option", { value: false }, "关闭", -1)
                    ])], 512), [
                      [vModelSelect, eqEnabled.value]
                    ])
                  ]),
                  createBaseVNode("label", null, [
                    _cache[35] || (_cache[35] = createTextVNode("主增益（dB）", -1)),
                    withDirectives(createBaseVNode("input", {
                      "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => eqMaster.value = $event),
                      type: "number",
                      min: "-12",
                      max: "12",
                      step: "0.5",
                      required: ""
                    }, null, 512), [
                      [
                        vModelText,
                        eqMaster.value,
                        void 0,
                        { number: true }
                      ]
                    ])
                  ])
                ]),
                createBaseVNode("label", _hoisted_38$1, [
                  withDirectives(createBaseVNode("input", {
                    "onUpdate:modelValue": _cache[13] || (_cache[13] = ($event) => bandsOn.value = $event),
                    type: "checkbox"
                  }, null, 512), [
                    [vModelCheckbox, bandsOn.value]
                  ]),
                  _cache[36] || (_cache[36] = createTextVNode("设置 10 段增益", -1))
                ]),
                bandsOn.value ? (openBlock(), createElementBlock("div", _hoisted_39$1, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(gains.value, (_, i) => {
                    return openBlock(), createElementBlock("label", { key: i }, [
                      createTextVNode("频段 " + toDisplayString(i + 1), 1),
                      withDirectives(createBaseVNode("input", {
                        "onUpdate:modelValue": ($event) => gains.value[i] = $event,
                        type: "number",
                        min: "-12",
                        max: "12",
                        step: "0.5",
                        required: ""
                      }, null, 8, _hoisted_40$1), [
                        [
                          vModelText,
                          gains.value[i],
                          void 0,
                          { number: true }
                        ]
                      ])
                    ]);
                  }), 128))
                ])) : createCommentVNode("", true),
                bandsOn.value ? (openBlock(), createElementBlock("p", _hoisted_41$1, "各频段沿用音频页面当前频率，范围 -12～12 dB。")) : createCommentVNode("", true)
              ], 64)) : createCommentVNode("", true),
              _cache[43] || (_cache[43] = createBaseVNode("h3", null, "画质 / ICC", -1)),
              createBaseVNode("label", null, [
                _cache[38] || (_cache[38] = createTextVNode("主显示器校准", -1)),
                withDirectives(createBaseVNode("select", {
                  "onUpdate:modelValue": _cache[14] || (_cache[14] = ($event) => form.iccPreset = $event)
                }, [
                  _cache[37] || (_cache[37] = createBaseVNode("option", { value: null }, "保持原值", -1)),
                  (openBlock(true), createElementBlock(Fragment, null, renderList(options.value.iccPresets, (name) => {
                    return openBlock(), createElementBlock("option", {
                      key: name,
                      value: name
                    }, toDisplayString(name), 9, _hoisted_42$1);
                  }), 128)),
                  form.iccPreset && !options.value.iccPresets.includes(form.iccPreset) ? (openBlock(), createElementBlock("option", {
                    key: 0,
                    value: form.iccPreset
                  }, "预设已不可用：" + toDisplayString(form.iccPreset), 9, _hoisted_43$1)) : createCommentVNode("", true)
                ], 512), [
                  [vModelSelect, form.iccPreset]
                ])
              ]),
              _cache[44] || (_cache[44] = createBaseVNode("p", { class: "hint" }, "使用含 VCGT 的 ICC 预设，只调整主屏 Gamma。先关闭画质页面的 ICC 自动监视；无法精确读取或应用时会停止，并报告恢复结果。", -1)),
              createBaseVNode("div", _hoisted_44$1, [
                createBaseVNode("button", _hoisted_45$1, toDisplayString(busy.value ? "处理中…" : "保存场景"), 1),
                _cache[39] || (_cache[39] = createBaseVNode("span", null, "保存不会开启自动联动", -1))
              ])
            ], 8, _hoisted_29$1)
          ], 32)
        ]),
        options.value.conflicts.length ? (openBlock(), createElementBlock("section", _hoisted_46$1, [
          _cache[45] || (_cache[45] = createBaseVNode("strong", null, "自动控制冲突", -1)),
          (openBlock(true), createElementBlock(Fragment, null, renderList(options.value.conflicts, (c) => {
            return openBlock(), createElementBlock("p", { key: c }, toDisplayString(c), 1);
          }), 128))
        ])) : createCommentVNode("", true),
        state.value.notices.length ? (openBlock(), createElementBlock("details", _hoisted_47$1, [
          _cache[46] || (_cache[46] = createBaseVNode("summary", null, "恢复与冲突记录", -1)),
          (openBlock(true), createElementBlock(Fragment, null, renderList(state.value.notices, (n, i) => {
            return openBlock(), createElementBlock("p", { key: i }, toDisplayString(n), 1);
          }), 128))
        ])) : createCommentVNode("", true)
      ]);
    };
  }
});
const GameScenePanel = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-543abfd6"]]);
const _hoisted_1 = { class: "page scheduler-page" };
const _hoisted_2 = {
  key: 0,
  class: "dotnet-banner"
};
const _hoisted_3 = { class: "page-header" };
const _hoisted_4 = { class: "page-actions" };
const _hoisted_5 = { class: "stat-body" };
const _hoisted_6 = { class: "stat-number" };
const _hoisted_7 = { class: "stat-meta" };
const _hoisted_8 = { class: "stat-root" };
const _hoisted_9 = {
  key: 0,
  class: "stat-loader"
};
const _hoisted_10 = { class: "scheduler-body" };
const _hoisted_11 = { class: "panel tree-panel" };
const _hoisted_12 = { class: "panel-head" };
const _hoisted_13 = { class: "panel-tools" };
const _hoisted_14 = {
  key: 0,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};
const _hoisted_15 = { class: "process-table-container" };
const _hoisted_16 = { class: "mono" };
const _hoisted_17 = { class: "mono" };
const _hoisted_18 = { class: "cmd-text" };
const _hoisted_19 = {
  key: 0,
  class: "check-icon",
  width: "16",
  height: "16",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "3",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};
const _hoisted_20 = { class: "empty-state" };
const _hoisted_21 = { class: "panel config-panel" };
const _hoisted_22 = { class: "panel-body" };
const _hoisted_23 = {
  key: 0,
  role: "alert",
  class: "tuning-error"
};
const _hoisted_24 = {
  key: 1,
  role: "status",
  class: "tuning-success"
};
const _hoisted_25 = {
  key: 2,
  class: "tuning-error"
};
const _hoisted_26 = { class: "form-section" };
const _hoisted_27 = { class: "pid-row" };
const _hoisted_28 = { class: "pid-value" };
const _hoisted_29 = {
  key: 0,
  class: "pid-meta"
};
const _hoisted_30 = { class: "proc-name-text" };
const _hoisted_31 = { class: "parent-hint" };
const _hoisted_32 = {
  key: 1,
  class: "pid-meta empty"
};
const _hoisted_33 = { class: "form-section" };
const _hoisted_34 = { class: "opt-row" };
const _hoisted_35 = { class: "form-section" };
const _hoisted_36 = ["disabled"];
const _hoisted_37 = ["disabled"];
const _hoisted_38 = {
  key: 0,
  class: "hint-text"
};
const _hoisted_39 = { class: "section-title cores-title-row" };
const _hoisted_40 = { class: "cores-summary-pill" };
const _hoisted_41 = { class: "hint-text" };
const _hoisted_42 = { class: "cores-actions" };
const _hoisted_43 = {
  key: 0,
  class: "hint-text"
};
const _hoisted_44 = { class: "cores-grid" };
const _hoisted_45 = ["title"];
const _hoisted_46 = ["value", "disabled", "aria-label"];
const _hoisted_47 = { class: "core-num" };
const _hoisted_48 = {
  key: 1,
  class: "affinity-summary"
};
const _hoisted_49 = {
  key: 2,
  class: "affinity-summary dimmed"
};
const _hoisted_50 = { class: "thread-options" };
const _hoisted_51 = ["disabled"];
const _hoisted_52 = ["disabled"];
const _hoisted_53 = ["value"];
const _hoisted_54 = {
  key: 0,
  class: "hint-text"
};
const _hoisted_55 = ["disabled"];
const _hoisted_56 = ["value"];
const _hoisted_57 = { class: "action-row" };
const _hoisted_58 = ["disabled"];
const _hoisted_59 = {
  key: 0,
  width: "15",
  height: "15",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};
const _hoisted_60 = {
  key: 1,
  class: "spin",
  width: "15",
  height: "15",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5",
  "stroke-linecap": "round"
};
const _hoisted_61 = ["disabled"];
const _hoisted_62 = { class: "form-section log-section" };
const _hoisted_63 = {
  key: 0,
  class: "log-empty"
};
const _hoisted_64 = { class: "log-icon" };
const _hoisted_65 = { class: "log-text" };
const _hoisted_66 = { class: "scheduler-rules" };
const _hoisted_67 = { class: "tuning-actions" };
const _hoisted_68 = ["disabled"];
const _hoisted_69 = ["disabled"];
const _hoisted_70 = {
  key: 0,
  class: "hint-text"
};
const _hoisted_71 = { class: "hint-text" };
const _hoisted_72 = ["disabled", "onClick"];
const _hoisted_73 = ["disabled", "onClick"];
const _hoisted_74 = {
  key: 1,
  class: "hint-text"
};
const _hoisted_75 = { class: "scheduler-recovery" };
const _hoisted_76 = { class: "hint-text" };
const _hoisted_77 = {
  key: 0,
  class: "tuning-error"
};
const _hoisted_78 = ["disabled", "onClick"];
const _hoisted_79 = ["disabled", "onClick"];
const _hoisted_80 = {
  key: 0,
  class: "hint-text"
};
const _hoisted_81 = ["open"];
const _hoisted_82 = { class: "panel game-link-panel" };
const _hoisted_83 = { class: "panel-head game-link-head" };
const _hoisted_84 = { class: "game-link-tools" };
const _hoisted_85 = { class: "link-status-text" };
const _hoisted_86 = { class: "panel-body" };
const _hoisted_87 = { class: "form-section" };
const _hoisted_88 = {
  key: 0,
  class: "active-list"
};
const _hoisted_89 = { class: "mono" };
const _hoisted_90 = {
  key: 0,
  class: "active-tag ok"
};
const _hoisted_91 = {
  key: 1,
  class: "active-tag deleted"
};
const _hoisted_92 = {
  key: 0,
  class: "hint-text"
};
const _hoisted_93 = {
  key: 1,
  class: "hint-text"
};
const _hoisted_94 = { class: "form-section" };
const _hoisted_95 = { class: "section-title" };
const _hoisted_96 = { class: "link-extra" };
const _hoisted_97 = { class: "profile-exe" };
const _hoisted_98 = { class: "mono" };
const _hoisted_99 = { class: "opt-row" };
const _hoisted_100 = {
  key: 0,
  class: "mono accent-text"
};
const _hoisted_101 = {
  key: 1,
  class: "dim-text"
};
const _hoisted_102 = { class: "note-text" };
const _hoisted_103 = ["disabled", "onClick"];
const _hoisted_104 = { class: "form-section" };
const _hoisted_105 = { class: "link-form" };
const _hoisted_106 = { class: "link-field" };
const _hoisted_107 = { class: "link-field" };
const _hoisted_108 = { class: "opt-row" };
const _hoisted_109 = { class: "link-field" };
const _hoisted_110 = { class: "link-field" };
const _hoisted_111 = { class: "link-form-action" };
const _hoisted_112 = ["disabled"];
const _hoisted_113 = {
  key: 0,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5"
};
const _hoisted_114 = {
  key: 1,
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2.5"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Scheduler",
  setup(__props) {
    const processTree = ref([]);
    const loading = ref(false);
    const search = ref("");
    const selectedRow = ref(null);
    const pid = ref(null);
    const tuning = createSchedulerEditor(() => window.schedulerPlusApi);
    const { draft, busy, selected: selectedProcess, current: currentScheduling, status: tuningStatus, error: tuningError, message: tuningMessage, groups: cpuGroups, threads, threadId, idealCpus, matchBy } = tuning;
    const priority = computed({ get: () => draft.priority, set: (value) => {
      draft.priority = value;
    } });
    const totalCores = computed(() => tuning.topology.value?.cpuSets.map((cpu) => ({ ...cpu, index: cpu.logicalIndex })) ?? []);
    const logPanel = ref(null);
    const toast = ref("");
    const toastOk = ref(true);
    const logs = ref([]);
    const needDotNet = ref(false);
    function installDotNet() {
      window.sysApi?.openExternal("https://dotnet.microsoft.com/download/dotnet/8.0");
    }
    const profiles = ref([]);
    const linkStatus = reactive({
      enabled: false,
      running: false,
      active: []
    });
    const linkBusy = ref(false);
    const formExe = ref("");
    const formPriority = ref("Normal");
    const formAffinityHex = ref("");
    const formNote = ref("");
    let linkStatusTimer = null;
    const ANTI_CHEAT_EXES = [
      "sguard64.exe",
      "sguard32.exe",
      "sace.exe",
      "saceclient.exe",
      "anticheatexpert.exe",
      "eac.exe",
      "easyanticheat.exe",
      "beservice.exe",
      "beservice_x64.exe",
      "vgc.exe",
      "vanguard.exe",
      "gameguard.des",
      "npggnt.des",
      "tenprotect.exe",
      "ace-base.sys",
      "nprotectgameguard.exe"
    ];
    function parseAffinityHex(raw) {
      const t = raw.trim().replace(/^0x/i, "");
      if (!t || !/^[0-9a-f]+$/i.test(t)) return null;
      const n = parseInt(t, 16);
      if (!Number.isInteger(n) || n <= 0 || n >= 2 ** 64) return null;
      return n;
    }
    function validateProfileForm() {
      const exe = formExe.value.trim().toLowerCase();
      if (!exe) return "exe 不能为空";
      if (exe.includes("\\") || exe.includes("/")) return "exe 只能是文件名,不能含路径";
      if (ANTI_CHEAT_EXES.includes(exe)) return "反作弊进程不可作为游戏 Profile";
      if (formAffinityHex.value.trim() && parseAffinityHex(formAffinityHex.value) === null) {
        return "亲和性掩码不合法(16 进制且非 0)";
      }
      return null;
    }
    function profileById(id) {
      return profiles.value.find((p) => p.id === id);
    }
    async function refreshLinkStatus() {
      try {
        const r = await window.sysApi?.gameLinkStatus?.();
        if (r?.success) {
          linkStatus.enabled = !!r.enabled;
          linkStatus.running = !!r.running;
          linkStatus.active = r.active ?? [];
        }
      } catch {
      }
    }
    async function refreshGameLink() {
      try {
        if (!window.sysApi?.gameProfiles || !window.sysApi?.gameLinkStatus) return;
        const [pr, st] = await Promise.all([
          window.sysApi.gameProfiles(),
          window.sysApi.gameLinkStatus()
        ]);
        if (pr.success && pr.profiles) profiles.value = pr.profiles;
        if (st.success) {
          linkStatus.enabled = !!st.enabled;
          linkStatus.running = !!st.running;
          linkStatus.active = st.active ?? [];
        }
      } catch (e) {
        showToast(`游戏联动加载失败:${e.message}`, false);
      }
    }
    async function setGameLinkEnabled(on) {
      if (linkBusy.value) return;
      linkBusy.value = true;
      try {
        const r = await window.sysApi.gameLinkSetEnabled(on);
        showToast(r.success ? on ? "游戏联动已开启" : "游戏联动已停止" : r.error || "状态保存失败", r.success);
        await refreshLinkStatus();
      } catch (e) {
        showToast(`操作异常:${e.message}`, false);
      } finally {
        linkBusy.value = false;
      }
    }
    async function addProfile() {
      const err = validateProfileForm();
      if (err) {
        showToast(err, false);
        return;
      }
      if (linkBusy.value) return;
      linkBusy.value = true;
      try {
        const affinityRaw = formAffinityHex.value.trim();
        const profile = {
          id: `new-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          exe: formExe.value.trim().toLowerCase(),
          priority: formPriority.value,
          affinity: affinityRaw ? parseAffinityHex(affinityRaw) : null,
          // 空 → null,不传 0
          note: formNote.value.trim() || void 0
        };
        const r = await window.sysApi.gameProfileSave(profile);
        if (r.success) {
          showToast(`Profile「${profile.exe}」已保存`, true);
          formExe.value = "";
          formPriority.value = "Normal";
          formAffinityHex.value = "";
          formNote.value = "";
          await refreshGameLink();
        } else {
          showToast(r.error || "保存失败", false);
        }
      } catch (e) {
        showToast(`操作异常:${e.message}`, false);
      } finally {
        linkBusy.value = false;
      }
    }
    async function deleteProfile(p) {
      if (linkBusy.value) return;
      linkBusy.value = true;
      try {
        const r = await window.sysApi.gameProfileDelete(p.id);
        if (r.success) {
          showToast(`已删除「${p.exe}」`, true);
          await refreshGameLink();
        } else {
          showToast(r.error || "删除失败", false);
        }
      } catch (e) {
        showToast(`操作异常:${e.message}`, false);
      } finally {
        linkBusy.value = false;
      }
    }
    const priorityOptions = [
      { value: "Idle", label: "Idle 空闲  (4)" },
      { value: "BelowNormal", label: "BelowNormal 低于正常  (6)" },
      { value: "Normal", label: "Normal 正常  (8)" },
      { value: "AboveNormal", label: "AboveNormal 高于正常  (10)" },
      { value: "High", label: "High 高  (13)" }
    ];
    const selectedCores = computed(
      () => totalCores.value.filter((c) => draft.cpuSetIds.includes(c.id)).map((c) => c.index)
    );
    function maskToHex(mask) {
      const u = typeof mask === "bigint" ? mask < 0n ? mask + (1n << 64n) : mask : mask < 0 ? mask + 18446744073709552e3 : mask;
      return u.toString(16).toUpperCase();
    }
    const affinityMaskHex = computed(() => {
      let mask = BigInt(0);
      for (const c of totalCores.value) {
        if (draft.cpuSetIds.includes(c.id)) mask |= BigInt(1) << BigInt(c.index);
      }
      return maskToHex(mask);
    });
    const filteredTree = computed(() => {
      if (!search.value.trim()) return processTree.value;
      const q = search.value.toLowerCase();
      return filterTree(processTree.value, q);
    });
    const SearchIcon = h("svg", { width: 14, height: 14, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": 2, style: "vertical-align:middle" }, [
      h("circle", { cx: 11, cy: 11, r: 7 }),
      h("path", { d: "m21 21-4.3-4.3" })
    ]);
    function filterTree(nodes, query) {
      return nodes.map((n) => {
        const selfMatch = n.Name.toLowerCase().includes(query) || String(n.ProcessId).includes(query);
        const filteredChildren = filterTree(n.children, query);
        if (selfMatch || filteredChildren.length > 0) {
          return { ...n, children: filteredChildren };
        }
        return null;
      }).filter((n) => n !== null);
    }
    function countNodes(nodes) {
      return nodes.reduce((sum, n) => sum + 1 + countNodes(n.children), 0);
    }
    function rowClassName({ row }) {
      return selectedRow.value?.ProcessId === row.ProcessId ? "selected-row" : "";
    }
    async function onRowClick(row) {
      if (busy.value) return;
      selectedRow.value = row;
      pid.value = row.ProcessId;
      await tuning.selectPid(row.ProcessId, row.Name);
      if (selectedProcess.value) showToast(`已读取 ${row.Name} 的当前设置`, true);
    }
    function fmtMem(_row, _column, cellValue) {
      if (!cellValue) return "0.00";
      return (cellValue / (1024 * 1024)).toFixed(2) + " MB";
    }
    function procColor(name) {
      if (!name) return "#64748b";
      const palette = ["#38bdf8", "#a855f7", "#22c55e", "#f97316", "#ec4899", "#eab308", "#06b6d4", "#f43f5e"];
      let hash = 0;
      for (let i = 0; i < Math.min(name.length, 8); i++) hash += name.charCodeAt(i);
      return palette[hash % palette.length];
    }
    function logIcon(type) {
      return type === "ok" ? "✓" : type === "err" ? "✗" : "•";
    }
    function selectAllCores() {
      if (!busy.value) tuning.selectAll();
    }
    function clearCores() {
      if (!busy.value) draft.cpuSetIds = [];
    }
    function invertCores() {
      if (!busy.value) draft.cpuSetIds = totalCores.value.filter((c) => !c.allocated && !draft.cpuSetIds.includes(c.id)).map((c) => c.id);
    }
    function resetCores() {
      selectAllCores();
    }
    async function loadProcessTree() {
      loading.value = true;
      try {
        const result = await window.sysApi.getProcessTree();
        if (result.success && result.data) {
          processTree.value = result.data;
          addLog("info", `已加载 ${countNodes(processTree.value)} 个进程（${processTree.value.length} 个根节点）`);
        } else {
          showToast(`进程列表加载失败：${result.error || "未知错误"}`, false);
          addLog("err", `加载失败：${result.error || "未知错误"}`);
        }
      } catch (e) {
        showToast(`操作异常：${e.message}`, false);
        addLog("err", `异常：${e.message}`);
      } finally {
        loading.value = false;
      }
    }
    async function apply() {
      if (!selectedProcess.value || !selectedCores.value.length || busy.value) return;
      addLog("info", `调度 PID ${selectedProcess.value.pid} · ${draft.mode} · ${priority.value} · ${selectedCores.value.length} 核`);
      await tuning.apply();
    }
    async function refreshScheduler() {
      await Promise.all([loadProcessTree(), tuning.refresh()]);
    }
    watch(tuningError, (text) => {
      if (text) {
        addLog("err", text);
        showToast(text, false);
        needDotNet.value = /\.NET|运行时/.test(text);
      }
    });
    watch(tuningMessage, (text) => {
      if (text) {
        addLog("ok", text);
        showToast(text, true);
      }
    });
    function showToast(msg, ok) {
      toast.value = msg;
      toastOk.value = ok;
      setTimeout(() => {
        if (toast.value === msg) toast.value = "";
      }, 2800);
    }
    function addLog(type, text) {
      logs.value.push({ type, text });
      nextTick(() => {
        if (logPanel.value) {
          logPanel.value.scrollTop = logPanel.value.scrollHeight;
        }
      });
    }
    onMounted(async () => {
      await Promise.all([tuning.refresh(), loadProcessTree(), refreshGameLink()]);
      if (totalCores.value.length) addLog("info", `系统就绪 · 读取到 ${totalCores.value.length} 个真实逻辑核心`);
      let statusPending = false;
      linkStatusTimer = setInterval(() => {
        void refreshLinkStatus();
        if (!busy.value && !statusPending) {
          statusPending = true;
          void tuning.loadStatus().catch((e) => {
            tuningError.value = String(e);
          }).finally(() => {
            statusPending = false;
          });
        }
      }, 3500);
    });
    onUnmounted(() => {
      if (linkStatusTimer) {
        clearInterval(linkStatusTimer);
        linkStatusTimer = null;
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        needDotNet.value ? (openBlock(), createElementBlock("div", _hoisted_2, [
          _cache[16] || (_cache[16] = createBaseVNode("div", { class: "dotnet-info" }, [
            createBaseVNode("div", { class: "dotnet-title" }, "⚠ 缺少 .NET 8 运行时"),
            createBaseVNode("div", { class: "dotnet-desc" }, "进程调度依赖微软官方 .NET 运行时（约 20MB，安装一次即可，不影响其他软件）。已安装后无需重启软件即可重试。")
          ], -1)),
          createBaseVNode("button", {
            class: "dotnet-btn",
            onClick: installDotNet
          }, "去安装 .NET 8")
        ])) : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_3, [
          _cache[19] || (_cache[19] = createStaticVNode('<div class="page-icon" data-v-c04eb57b><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="1.5" data-v-c04eb57b><rect x="3" y="3" width="7" height="7" rx="1.5" data-v-c04eb57b></rect><rect x="14" y="3" width="7" height="7" rx="1.5" data-v-c04eb57b></rect><rect x="3" y="14" width="7" height="7" rx="1.5" data-v-c04eb57b></rect><rect x="14" y="14" width="7" height="7" rx="1.5" data-v-c04eb57b></rect></svg></div><div class="page-title-block" data-v-c04eb57b><h2 class="page-title" data-v-c04eb57b>进程调度器</h2><p class="page-desc" data-v-c04eb57b>实时进程树 · 优先级与 CPU 亲和性调控 · 类任务管理器体验</p></div>', 2)),
          createBaseVNode("div", _hoisted_4, [
            createBaseVNode("div", {
              class: normalizeClass(["stat-card", loading.value ? "loading" : "ready"])
            }, [
              createBaseVNode("div", _hoisted_5, [
                createBaseVNode("span", _hoisted_6, toDisplayString(loading.value ? "—" : countNodes(processTree.value)), 1),
                createBaseVNode("div", _hoisted_7, [
                  _cache[17] || (_cache[17] = createBaseVNode("span", { class: "stat-label" }, "进程", -1)),
                  _cache[18] || (_cache[18] = createBaseVNode("span", { class: "stat-divider" }, null, -1)),
                  createBaseVNode("span", _hoisted_8, toDisplayString(loading.value ? "…" : processTree.value.length) + " 根节点", 1)
                ])
              ]),
              loading.value ? (openBlock(), createElementBlock("div", _hoisted_9)) : createCommentVNode("", true)
            ], 2)
          ])
        ]),
        createBaseVNode("div", _hoisted_10, [
          createBaseVNode("div", _hoisted_11, [
            createBaseVNode("div", _hoisted_12, [
              _cache[22] || (_cache[22] = createStaticVNode('<div class="panel-title" data-v-c04eb57b><svg class="panel-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" data-v-c04eb57b><rect x="3" y="3" width="6" height="6" rx="1" data-v-c04eb57b></rect><rect x="15" y="3" width="6" height="6" rx="1" data-v-c04eb57b></rect><rect x="3" y="15" width="6" height="6" rx="1" data-v-c04eb57b></rect><rect x="15" y="15" width="6" height="6" rx="1" data-v-c04eb57b></rect></svg> 进程树 </div>', 1)),
              createBaseVNode("div", _hoisted_13, [
                createVNode(unref(ElInput), {
                  modelValue: search.value,
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => search.value = $event),
                  placeholder: "按进程名或 PID 搜索…",
                  clearable: "",
                  "prefix-icon": unref(SearchIcon),
                  class: "search-input"
                }, null, 8, ["modelValue", "prefix-icon"]),
                createVNode(unref(ElButton), {
                  class: "icon-btn",
                  loading: loading.value,
                  disabled: unref(busy),
                  onClick: refreshScheduler,
                  title: "刷新进程列表"
                }, {
                  default: withCtx(() => [
                    !loading.value ? (openBlock(), createElementBlock("svg", _hoisted_14, [..._cache[20] || (_cache[20] = [
                      createBaseVNode("path", { d: "M21 12a9 9 0 1 1-2.64-6.36M21 3v6h-6" }, null, -1)
                    ])])) : createCommentVNode("", true),
                    _cache[21] || (_cache[21] = createBaseVNode("span", { class: "btn-text" }, "刷新", -1))
                  ]),
                  _: 1
                }, 8, ["loading", "disabled"])
              ])
            ]),
            createBaseVNode("div", _hoisted_15, [
              (openBlock(), createBlock(unref(ElTable), {
                key: "tree-" + processTree.value.length,
                data: filteredTree.value,
                "row-key": "ProcessId",
                "tree-props": { children: "children" },
                onRowClick,
                "row-class-name": rowClassName,
                "default-expand-all": "",
                indent: 28,
                border: "",
                stripe: "",
                height: "100%",
                class: "process-table"
              }, {
                empty: withCtx(() => [
                  createBaseVNode("div", _hoisted_20, [
                    _cache[25] || (_cache[25] = createBaseVNode("svg", {
                      width: "48",
                      height: "48",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "rgba(226,232,240,0.15)",
                      "stroke-width": "1.5"
                    }, [
                      createBaseVNode("rect", {
                        x: "3",
                        y: "3",
                        width: "7",
                        height: "7",
                        rx: "1.5"
                      }),
                      createBaseVNode("rect", {
                        x: "14",
                        y: "3",
                        width: "7",
                        height: "7",
                        rx: "1.5"
                      }),
                      createBaseVNode("rect", {
                        x: "3",
                        y: "14",
                        width: "7",
                        height: "7",
                        rx: "1.5"
                      }),
                      createBaseVNode("rect", {
                        x: "14",
                        y: "14",
                        width: "7",
                        height: "7",
                        rx: "1.5"
                      })
                    ], -1)),
                    createBaseVNode("p", null, toDisplayString(search.value ? "无匹配进程" : "暂无进程数据"), 1),
                    !search.value ? (openBlock(), createBlock(unref(ElButton), {
                      key: 0,
                      link: "",
                      type: "primary",
                      onClick: withModifiers(loadProcessTree, ["stop"])
                    }, {
                      default: withCtx(() => [..._cache[24] || (_cache[24] = [
                        createTextVNode("点击刷新加载", -1)
                      ])]),
                      _: 1
                    })) : createCommentVNode("", true)
                  ])
                ]),
                default: withCtx(() => [
                  createVNode(unref(ElTableColumn), {
                    prop: "Name",
                    label: "映像名称",
                    "min-width": "240",
                    "show-overflow-tooltip": true
                  }),
                  createVNode(unref(ElTableColumn), {
                    prop: "ProcessId",
                    label: "PID",
                    width: "80",
                    align: "right",
                    sortable: ""
                  }, {
                    default: withCtx(({ row }) => [
                      createBaseVNode("span", _hoisted_16, toDisplayString(row.ProcessId), 1)
                    ]),
                    _: 1
                  }),
                  createVNode(unref(ElTableColumn), {
                    prop: "WorkingSetSize",
                    label: "内存",
                    width: "90",
                    align: "right"
                  }, {
                    default: withCtx(({ row }) => [
                      createBaseVNode("span", _hoisted_17, toDisplayString(fmtMem(null, null, row.WorkingSetSize)), 1)
                    ]),
                    _: 1
                  }),
                  createVNode(unref(ElTableColumn), {
                    prop: "CommandLine",
                    label: "启动参数",
                    "min-width": "320",
                    "show-overflow-tooltip": ""
                  }, {
                    default: withCtx(({ row }) => [
                      createBaseVNode("span", _hoisted_18, toDisplayString(row.CommandLine || "—"), 1)
                    ]),
                    _: 1
                  }),
                  createVNode(unref(ElTableColumn), {
                    label: "",
                    width: "46",
                    align: "center"
                  }, {
                    default: withCtx(({ row }) => [
                      selectedRow.value?.ProcessId === row.ProcessId ? (openBlock(), createElementBlock("svg", _hoisted_19, [..._cache[23] || (_cache[23] = [
                        createBaseVNode("polyline", { points: "20 6 9 17 4 12" }, null, -1)
                      ])])) : createCommentVNode("", true)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["data"]))
            ])
          ]),
          createBaseVNode("div", _hoisted_21, [
            _cache[47] || (_cache[47] = createStaticVNode('<div class="panel-head" data-v-c04eb57b><div class="panel-title" data-v-c04eb57b><svg class="panel-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" data-v-c04eb57b><circle cx="12" cy="12" r="3" data-v-c04eb57b></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" data-v-c04eb57b></path></svg> 调度设置 </div></div>', 1)),
            createBaseVNode("div", _hoisted_22, [
              unref(tuningError) ? (openBlock(), createElementBlock("p", _hoisted_23, toDisplayString(unref(tuningError)), 1)) : createCommentVNode("", true),
              unref(tuningMessage) ? (openBlock(), createElementBlock("p", _hoisted_24, toDisplayString(unref(tuningMessage)), 1)) : createCommentVNode("", true),
              unref(tuningStatus)?.legacyConflict ? (openBlock(), createElementBlock("p", _hoisted_25, "游戏联动正在管理设置，请先停止联动并完成恢复。")) : createCommentVNode("", true),
              createBaseVNode("section", _hoisted_26, [
                _cache[29] || (_cache[29] = createBaseVNode("div", { class: "section-title" }, [
                  createBaseVNode("span", { class: "sec-marker" }),
                  createTextVNode(" 目标进程 ")
                ], -1)),
                createBaseVNode("div", {
                  class: normalizeClass(["pid-display", { filled: !!pid.value }])
                }, [
                  createBaseVNode("div", _hoisted_27, [
                    _cache[26] || (_cache[26] = createBaseVNode("svg", {
                      width: "14",
                      height: "14",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      "stroke-width": "2"
                    }, [
                      createBaseVNode("circle", {
                        cx: "12",
                        cy: "12",
                        r: "10"
                      }),
                      createBaseVNode("path", { d: "M12 6v6l4 2" })
                    ], -1)),
                    _cache[27] || (_cache[27] = createBaseVNode("span", { class: "pid-label" }, "PID", -1)),
                    createBaseVNode("span", _hoisted_28, toDisplayString(pid.value ?? "—"), 1)
                  ]),
                  selectedRow.value ? (openBlock(), createElementBlock("div", _hoisted_29, [
                    createBaseVNode("span", {
                      class: "proc-dot",
                      style: normalizeStyle({ background: procColor(selectedRow.value.Name) })
                    }, null, 4),
                    createBaseVNode("span", _hoisted_30, toDisplayString(selectedRow.value.Name), 1),
                    createBaseVNode("span", _hoisted_31, "父 PID " + toDisplayString(selectedRow.value.ParentProcessId), 1)
                  ])) : (openBlock(), createElementBlock("div", _hoisted_32, [..._cache[28] || (_cache[28] = [
                    createBaseVNode("span", { class: "hint-text" }, "点击左侧进程树任意一行自动填入", -1)
                  ])]))
                ], 2)
              ]),
              createBaseVNode("section", _hoisted_33, [
                _cache[30] || (_cache[30] = createBaseVNode("div", { class: "section-title" }, [
                  createBaseVNode("span", { class: "sec-marker" }),
                  createTextVNode(" 进程优先级 ")
                ], -1)),
                createVNode(unref(ElSelect), {
                  modelValue: priority.value,
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => priority.value = $event),
                  disabled: unref(busy),
                  class: "cyber-select",
                  "popper-class": "cyber-popper"
                }, {
                  default: withCtx(() => [
                    (openBlock(), createElementBlock(Fragment, null, renderList(priorityOptions, (opt) => {
                      return createVNode(unref(ElOption), {
                        key: opt.value,
                        label: opt.label,
                        value: opt.value
                      }, {
                        default: withCtx(() => [
                          createBaseVNode("span", _hoisted_34, [
                            createBaseVNode("span", {
                              class: normalizeClass(["opt-dot", opt.value])
                            }, null, 2),
                            createBaseVNode("span", null, toDisplayString(opt.label), 1)
                          ])
                        ]),
                        _: 2
                      }, 1032, ["label", "value"]);
                    }), 64))
                  ]),
                  _: 1
                }, 8, ["modelValue", "disabled"]),
                _cache[31] || (_cache[31] = createBaseVNode("p", { class: "hint-text" }, "RealTime（实时）已禁用以防系统死锁", -1))
              ]),
              createBaseVNode("section", _hoisted_35, [
                _cache[36] || (_cache[36] = createBaseVNode("label", {
                  class: "section-title",
                  for: "scheduler-mode"
                }, [
                  createBaseVNode("span", { class: "sec-marker" }),
                  createTextVNode("调度方式")
                ], -1)),
                withDirectives(createBaseVNode("select", {
                  id: "scheduler-mode",
                  class: "tuning-select",
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => unref(draft).mode = $event),
                  disabled: unref(busy)
                }, [
                  createBaseVNode("option", {
                    value: "affinity",
                    disabled: unref(cpuGroups).length !== 1
                  }, "传统亲和性", 8, _hoisted_37),
                  _cache[32] || (_cache[32] = createBaseVNode("option", { value: "cpuSets" }, "CPU Sets（支持跨处理器组）", -1))
                ], 8, _hoisted_36), [
                  [vModelSelect, unref(draft).mode]
                ]),
                unref(currentScheduling) ? (openBlock(), createElementBlock("p", _hoisted_38, "当前优先级 " + toDisplayString(unref(currentScheduling).priority) + " · CPU Sets " + toDisplayString(unref(currentScheduling).cpuSetIds.length ? unref(currentScheduling).cpuSetIds.join(", ") : "未指定"), 1)) : createCommentVNode("", true),
                createBaseVNode("div", _hoisted_39, [
                  _cache[33] || (_cache[33] = createBaseVNode("span", null, [
                    createBaseVNode("span", { class: "sec-marker" }),
                    createTextVNode(" CPU 核心绑定 ")
                  ], -1)),
                  createBaseVNode("span", _hoisted_40, toDisplayString(selectedCores.value.length) + " / " + toDisplayString(totalCores.value.length) + " 核已选 ", 1)
                ]),
                createBaseVNode("p", _hoisted_41, toDisplayString(unref(draft).mode === "affinity" ? "勾选允许使用的逻辑核心。多处理器组请使用 CPU Sets。" : "选择进程默认 CPU Sets；已有亲和性及线程设置仍可能限制实际调度。"), 1),
                createBaseVNode("div", _hoisted_42, [
                  createBaseVNode("button", {
                    class: "mini-btn",
                    onClick: selectAllCores
                  }, "全选"),
                  createBaseVNode("button", {
                    class: "mini-btn",
                    onClick: clearCores
                  }, "全不选"),
                  createBaseVNode("button", {
                    class: "mini-btn",
                    onClick: invertCores
                  }, "反选"),
                  createBaseVNode("button", {
                    class: "mini-btn accent",
                    onClick: resetCores
                  }, "默认全选"),
                  createBaseVNode("button", {
                    class: "mini-btn",
                    onClick: _cache[3] || (_cache[3] = //@ts-ignore
                    (...args) => unref(tuning).selectPerformance && unref(tuning).selectPerformance(...args))
                  }, "最高性能类别")
                ]),
                (openBlock(true), createElementBlock(Fragment, null, renderList(unref(cpuGroups), (group) => {
                  return openBlock(), createElementBlock("div", { key: group }, [
                    unref(cpuGroups).length > 1 ? (openBlock(), createElementBlock("p", _hoisted_43, "处理器组 " + toDisplayString(group), 1)) : createCommentVNode("", true),
                    createBaseVNode("div", _hoisted_44, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(totalCores.value.filter((c) => c.group === group), (core) => {
                        return openBlock(), createElementBlock("label", {
                          key: core.id,
                          class: normalizeClass(["core-chip", { active: unref(draft).cpuSetIds.includes(core.id) }]),
                          title: `组 ${core.group} · 物理核 ${core.coreIndex} · 缓存 ${core.cacheIndex} · NUMA ${core.numaIndex} · 效率类别 ${core.efficiency}${core.allocated ? " · 已被独占" : ""}`
                        }, [
                          withDirectives(createBaseVNode("input", {
                            type: "checkbox",
                            "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => unref(draft).cpuSetIds = $event),
                            value: core.id,
                            disabled: unref(busy) || core.allocated,
                            class: "core-checkbox",
                            "aria-label": `组 ${core.group} CPU ${core.index}`
                          }, null, 8, _hoisted_46), [
                            [vModelCheckbox, unref(draft).cpuSetIds]
                          ]),
                          createBaseVNode("span", _hoisted_47, toDisplayString(core.index), 1)
                        ], 10, _hoisted_45);
                      }), 128))
                    ])
                  ]);
                }), 128)),
                selectedCores.value.length ? (openBlock(), createElementBlock("div", _hoisted_48, [
                  _cache[34] || (_cache[34] = createBaseVNode("svg", {
                    width: "11",
                    height: "11",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2.5"
                  }, [
                    createBaseVNode("polyline", { points: "20 6 9 17 4 12" })
                  ], -1)),
                  createBaseVNode("span", null, "已选 " + toDisplayString(selectedCores.value.length) + " 核 · " + toDisplayString(unref(draft).mode === "affinity" ? "Mask 0x" + affinityMaskHex.value : "CPU Sets"), 1)
                ])) : (openBlock(), createElementBlock("div", _hoisted_49, [..._cache[35] || (_cache[35] = [
                  createBaseVNode("svg", {
                    width: "11",
                    height: "11",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2"
                  }, [
                    createBaseVNode("circle", {
                      cx: "12",
                      cy: "12",
                      r: "10"
                    }),
                    createBaseVNode("line", {
                      x1: "12",
                      y1: "8",
                      x2: "12",
                      y2: "12"
                    }),
                    createBaseVNode("line", {
                      x1: "12",
                      y1: "16",
                      x2: "12.01",
                      y2: "16"
                    })
                  ], -1),
                  createBaseVNode("span", null, "未选择任何核心", -1)
                ])]))
              ]),
              createBaseVNode("details", _hoisted_50, [
                _cache[39] || (_cache[39] = createBaseVNode("summary", null, "高级：关键线程与核心详情", -1)),
                _cache[40] || (_cache[40] = createBaseVNode("p", { class: "hint-text" }, "悬停核心可查看真实拓扑。理想处理器仅为调度提示；线程 ID 会随进程重启变化。", -1)),
                createBaseVNode("button", {
                  class: "mini-btn",
                  disabled: unref(busy) || !unref(selectedProcess),
                  onClick: _cache[5] || (_cache[5] = //@ts-ignore
                  (...args) => unref(tuning).loadThreads && unref(tuning).loadThreads(...args))
                }, "读取可访问线程", 8, _hoisted_51),
                _cache[41] || (_cache[41] = createBaseVNode("label", {
                  class: "hint-text",
                  for: "scheduler-thread"
                }, "关键线程", -1)),
                withDirectives(createBaseVNode("select", {
                  id: "scheduler-thread",
                  class: "tuning-select",
                  "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => isRef(threadId) ? threadId.value = $event : null),
                  disabled: unref(busy),
                  onChange: _cache[7] || (_cache[7] = //@ts-ignore
                  (...args) => unref(tuning).chooseThread && unref(tuning).chooseThread(...args))
                }, [
                  _cache[37] || (_cache[37] = createBaseVNode("option", { value: 0 }, "不修改线程", -1)),
                  (openBlock(true), createElementBlock(Fragment, null, renderList(unref(threads), (thread) => {
                    return openBlock(), createElementBlock("option", {
                      key: thread.tid,
                      value: thread.tid
                    }, "TID " + toDisplayString(thread.tid) + " · " + toDisplayString(Math.round(thread.cpuMs)) + " ms · 组 " + toDisplayString(thread.ideal.group), 9, _hoisted_53);
                  }), 128))
                ], 40, _hoisted_52), [
                  [vModelSelect, unref(threadId)]
                ]),
                unref(draft).ideal ? (openBlock(), createElementBlock("label", _hoisted_54, [
                  _cache[38] || (_cache[38] = createTextVNode("理想逻辑处理器", -1)),
                  withDirectives(createBaseVNode("select", {
                    class: "tuning-select",
                    "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => unref(draft).ideal.logicalIndex = $event),
                    disabled: unref(busy)
                  }, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(unref(idealCpus), (cpu) => {
                      return openBlock(), createElementBlock("option", {
                        key: cpu.id,
                        value: cpu.logicalIndex
                      }, "组 " + toDisplayString(cpu.group) + " / CPU " + toDisplayString(cpu.logicalIndex), 9, _hoisted_56);
                    }), 128))
                  ], 8, _hoisted_55), [
                    [vModelSelect, unref(draft).ideal.logicalIndex]
                  ])
                ])) : createCommentVNode("", true)
              ]),
              createBaseVNode("div", _hoisted_57, [
                createBaseVNode("button", {
                  class: "action-btn primary",
                  "data-testid": "scheduler-apply",
                  onClick: apply,
                  disabled: unref(busy) || !unref(selectedProcess) || !selectedCores.value.length || unref(tuningStatus)?.legacyConflict
                }, [
                  !unref(busy) ? (openBlock(), createElementBlock("svg", _hoisted_59, [..._cache[42] || (_cache[42] = [
                    createBaseVNode("path", { d: "M5 3l14 9-14 9V3z" }, null, -1)
                  ])])) : (openBlock(), createElementBlock("svg", _hoisted_60, [..._cache[43] || (_cache[43] = [
                    createBaseVNode("path", { d: "M21 12a9 9 0 1 1-2.64-6.36" }, null, -1)
                  ])])),
                  createBaseVNode("span", null, toDisplayString(unref(busy) ? "执行中…" : "应用调度"), 1)
                ], 8, _hoisted_58),
                createBaseVNode("button", {
                  class: "action-btn ghost",
                  onClick: resetCores,
                  disabled: unref(busy)
                }, [..._cache[44] || (_cache[44] = [
                  createBaseVNode("svg", {
                    width: "14",
                    height: "14",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "2",
                    "stroke-linecap": "round",
                    "stroke-linejoin": "round"
                  }, [
                    createBaseVNode("path", { d: "M3 12a9 9 0 1 0 3-6.7" }),
                    createBaseVNode("polyline", { points: "3 4 3 10 9 10" })
                  ], -1),
                  createBaseVNode("span", null, "重置核心", -1)
                ])], 8, _hoisted_61)
              ]),
              createBaseVNode("section", _hoisted_62, [
                _cache[46] || (_cache[46] = createBaseVNode("div", { class: "section-title" }, [
                  createBaseVNode("span", { class: "sec-marker" }),
                  createTextVNode(" 操作日志 ")
                ], -1)),
                createBaseVNode("div", {
                  class: "log-panel",
                  ref_key: "logPanel",
                  ref: logPanel
                }, [
                  !logs.value.length ? (openBlock(), createElementBlock("div", _hoisted_63, [..._cache[45] || (_cache[45] = [
                    createBaseVNode("svg", {
                      width: "22",
                      height: "22",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      "stroke-width": "1.5"
                    }, [
                      createBaseVNode("path", { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" }),
                      createBaseVNode("polyline", { points: "14 2 14 8 20 8" })
                    ], -1),
                    createBaseVNode("span", null, "暂无日志", -1)
                  ])])) : createCommentVNode("", true),
                  (openBlock(true), createElementBlock(Fragment, null, renderList(logs.value, (l, i) => {
                    return openBlock(), createElementBlock("div", {
                      key: i,
                      class: normalizeClass(["log-line", l.type])
                    }, [
                      createBaseVNode("span", _hoisted_64, toDisplayString(logIcon(l.type)), 1),
                      createBaseVNode("span", _hoisted_65, toDisplayString(l.text), 1)
                    ], 2);
                  }), 128))
                ], 512)
              ])
            ])
          ])
        ]),
        createVNode(EmbeddedSection, {
          id: "scheduler-rules",
          title: "自动调度规则与恢复",
          description: "将右侧设置保存为规则，或恢复此前修改的原始设置"
        }, {
          default: withCtx(() => [
            createBaseVNode("section", _hoisted_66, [
              createBaseVNode("h3", null, "自动规则 · " + toDisplayString(unref(tuningStatus)?.enabled ? "运行中" : "已停止"), 1),
              _cache[49] || (_cache[49] = createBaseVNode("p", { class: "hint-text" }, "保存后需手动启用，每次启动软件默认停止。相同进程只应用一次，外部修改会提示冲突。", -1)),
              createBaseVNode("div", _hoisted_67, [
                createBaseVNode("button", {
                  class: "mini-btn",
                  disabled: unref(busy) || !unref(tuningStatus)?.enabled && unref(tuningStatus)?.legacyConflict,
                  onClick: _cache[9] || (_cache[9] = //@ts-ignore
                  (...args) => unref(tuning).toggleRules && unref(tuning).toggleRules(...args))
                }, toDisplayString(unref(tuningStatus)?.enabled ? "停止自动规则" : "启用自动规则"), 9, _hoisted_68),
                withDirectives(createBaseVNode("select", {
                  class: "tuning-select",
                  "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => isRef(matchBy) ? matchBy.value = $event : null),
                  "aria-label": "规则匹配方式"
                }, [..._cache[48] || (_cache[48] = [
                  createBaseVNode("option", { value: "path" }, "完整路径（推荐）", -1),
                  createBaseVNode("option", { value: "exe" }, "EXE 文件名", -1)
                ])], 512), [
                  [vModelSelect, unref(matchBy)]
                ]),
                createBaseVNode("button", {
                  class: "mini-btn accent",
                  disabled: unref(busy) || !unref(selectedProcess) || !!unref(draft).ideal || !selectedCores.value.length,
                  onClick: _cache[11] || (_cache[11] = //@ts-ignore
                  (...args) => unref(tuning).saveRule && unref(tuning).saveRule(...args))
                }, "保存当前设置为规则", 8, _hoisted_69)
              ]),
              unref(draft).ideal ? (openBlock(), createElementBlock("p", _hoisted_70, "关键线程设置仅用于本次进程，不能保存为自动规则。")) : createCommentVNode("", true),
              (openBlock(true), createElementBlock(Fragment, null, renderList(unref(tuningStatus)?.rules, (rule) => {
                return openBlock(), createElementBlock("div", {
                  key: rule.id,
                  class: "tuning-record"
                }, [
                  createBaseVNode("div", null, [
                    createBaseVNode("strong", null, toDisplayString(rule.target), 1),
                    createBaseVNode("p", _hoisted_71, toDisplayString(rule.match === "path" ? "完整路径" : "文件名") + " · " + toDisplayString(rule.enabled ? "启用" : "停用") + " · " + toDisplayString(rule.draft.mode) + " · " + toDisplayString(rule.draft.cpuSetIds.length) + " 核 · " + toDisplayString(rule.draft.priority), 1)
                  ]),
                  createBaseVNode("button", {
                    class: "mini-btn",
                    disabled: unref(busy),
                    onClick: ($event) => unref(tuning).changeRule(rule)
                  }, toDisplayString(rule.enabled ? "停用" : "启用"), 9, _hoisted_72),
                  createBaseVNode("button", {
                    class: "mini-btn",
                    disabled: unref(busy),
                    onClick: ($event) => unref(tuning).removeRule(rule.id)
                  }, "删除", 8, _hoisted_73)
                ]);
              }), 128)),
              !unref(tuningStatus)?.rules.length ? (openBlock(), createElementBlock("p", _hoisted_74, "暂无规则。")) : createCommentVNode("", true),
              (openBlock(true), createElementBlock(Fragment, null, renderList(unref(tuningStatus)?.matches, (match) => {
                return openBlock(), createElementBlock("p", {
                  key: match.process.pid,
                  class: "hint-text"
                }, toDisplayString(match.process.name) + " · " + toDisplayString(match.message), 1);
              }), 128))
            ]),
            createBaseVNode("section", _hoisted_75, [
              _cache[50] || (_cache[50] = createBaseVNode("h3", null, "原始设置恢复", -1)),
              _cache[51] || (_cache[51] = createBaseVNode("p", { class: "hint-text" }, "应用前保存原值。停止自动规则后可恢复；进程退出后可清理对应记录。", -1)),
              (openBlock(true), createElementBlock(Fragment, null, renderList(unref(tuningStatus)?.records, (record) => {
                return openBlock(), createElementBlock("div", {
                  key: record.id,
                  class: "tuning-record"
                }, [
                  createBaseVNode("div", null, [
                    createBaseVNode("strong", null, toDisplayString(record.original.name) + " · PID " + toDisplayString(record.original.pid), 1),
                    createBaseVNode("p", _hoisted_76, toDisplayString({ pending: "待恢复", applied: "已应用", failed: "应用未完成" }[record.phase]) + " · 原始 " + toDisplayString(record.original.priority), 1),
                    record.error ? (openBlock(), createElementBlock("p", _hoisted_77, toDisplayString(record.error), 1)) : createCommentVNode("", true)
                  ]),
                  createBaseVNode("button", {
                    class: "mini-btn",
                    disabled: unref(busy) || unref(tuningStatus)?.enabled,
                    onClick: ($event) => unref(tuning).restore(record.id)
                  }, "恢复原始设置", 8, _hoisted_78),
                  createBaseVNode("button", {
                    class: "mini-btn",
                    disabled: unref(busy) || unref(tuningStatus)?.enabled,
                    onClick: ($event) => unref(tuning).forgetExited(record.id)
                  }, "清理已退出记录", 8, _hoisted_79)
                ]);
              }), 128)),
              !unref(tuningStatus)?.records.length ? (openBlock(), createElementBlock("p", _hoisted_80, "暂无恢复记录。")) : createCommentVNode("", true)
            ])
          ]),
          _: 1
        }),
        createVNode(EmbeddedSection, {
          id: "game-link",
          title: "游戏联动",
          description: "按游戏应用调度、电源、音频与画质配置，退出时恢复原值"
        }, {
          default: withCtx(() => [
            createVNode(GameScenePanel),
            profiles.value.length || linkStatus.enabled ? (openBlock(), createElementBlock("details", {
              key: 0,
              class: "legacy-game-link",
              open: linkStatus.enabled
            }, [
              createBaseVNode("summary", null, "已有基础调度配置（" + toDisplayString(profiles.value.length) + "）" + toDisplayString(linkStatus.enabled ? " · 正在运行，请先关闭再启用上方联动" : ""), 1),
              createBaseVNode("div", _hoisted_82, [
                createBaseVNode("div", _hoisted_83, [
                  _cache[52] || (_cache[52] = createBaseVNode("div", { class: "panel-title" }, [
                    createBaseVNode("svg", {
                      class: "panel-icon",
                      width: "16",
                      height: "16",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "var(--accent)",
                      "stroke-width": "2",
                      "stroke-linejoin": "round"
                    }, [
                      createBaseVNode("path", { d: "M6 11h4M8 9v4" }),
                      createBaseVNode("path", { d: "M15.5 10.5h.01M18.5 13.5h.01" }),
                      createBaseVNode("path", { d: "M17.32 5H6.68a4 4 0 0 0-3.98 3.6c-.18 1.66-.36 3.86-.44 5.4a2.4 2.4 0 0 0 4.1 1.9c.5-.52 1.1-.9 1.86-.9h3.56c.76 0 1.36.38 1.86.9a2.4 2.4 0 0 0 4.1-1.9c-.08-1.54-.26-3.74-.44-5.4A4 4 0 0 0 17.32 5Z" })
                    ]),
                    createTextVNode(" 已有基础调度配置 ")
                  ], -1)),
                  createBaseVNode("div", _hoisted_84, [
                    createBaseVNode("span", {
                      class: normalizeClass(["link-status-dot", linkStatus.running ? "on" : "off"])
                    }, null, 2),
                    createBaseVNode("span", _hoisted_85, toDisplayString(linkStatus.running ? "运行中" : "已停止"), 1),
                    createVNode(unref(ElSwitch), {
                      class: "cyber-switch",
                      "model-value": linkStatus.enabled,
                      loading: linkBusy.value,
                      onChange: setGameLinkEnabled
                    }, null, 8, ["model-value", "loading"])
                  ])
                ]),
                createBaseVNode("div", _hoisted_86, [
                  createBaseVNode("section", _hoisted_87, [
                    _cache[54] || (_cache[54] = createBaseVNode("div", { class: "section-title" }, [
                      createBaseVNode("span", { class: "sec-marker" }),
                      createTextVNode(" 活跃进程 "),
                      createBaseVNode("span", { class: "link-extra" }, "游戏启动后按 Profile 自动套用优先级与亲和性")
                    ], -1)),
                    linkStatus.enabled ? (openBlock(), createElementBlock("div", _hoisted_88, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(linkStatus.active, (a) => {
                        return openBlock(), createElementBlock("div", {
                          key: a.profileId + ":" + a.exe,
                          class: "active-chip"
                        }, [
                          _cache[53] || (_cache[53] = createBaseVNode("span", {
                            class: "proc-dot",
                            style: { "background": "#22c55e" }
                          }, null, -1)),
                          createBaseVNode("span", _hoisted_89, toDisplayString(a.exe), 1),
                          profileById(a.profileId) ? (openBlock(), createElementBlock("span", _hoisted_90, "已联动")) : (openBlock(), createElementBlock("span", _hoisted_91, "Profile 已删除"))
                        ]);
                      }), 128)),
                      !linkStatus.active.length ? (openBlock(), createElementBlock("div", _hoisted_92, "暂无活跃游戏进程")) : createCommentVNode("", true)
                    ])) : (openBlock(), createElementBlock("div", _hoisted_93, "总开关关闭,未监控游戏进程"))
                  ]),
                  createBaseVNode("section", _hoisted_94, [
                    createBaseVNode("div", _hoisted_95, [
                      _cache[55] || (_cache[55] = createBaseVNode("span", { class: "sec-marker" }, null, -1)),
                      _cache[56] || (_cache[56] = createTextVNode(" Profile 列表 ", -1)),
                      createBaseVNode("span", _hoisted_96, toDisplayString(profiles.value.length) + " 个配置", 1)
                    ]),
                    createVNode(unref(ElTable), {
                      data: profiles.value,
                      border: "",
                      stripe: "",
                      class: "process-table profile-table"
                    }, {
                      empty: withCtx(() => [..._cache[57] || (_cache[57] = [
                        createBaseVNode("div", { class: "empty-state" }, [
                          createBaseVNode("p", null, "暂无 Profile,在下方表单添加游戏联动配置")
                        ], -1)
                      ])]),
                      default: withCtx(() => [
                        createVNode(unref(ElTableColumn), {
                          prop: "exe",
                          label: "游戏 exe",
                          "min-width": "160"
                        }, {
                          default: withCtx(({ row }) => [
                            createBaseVNode("span", _hoisted_97, [
                              createBaseVNode("span", {
                                class: "proc-dot",
                                style: normalizeStyle({ background: procColor(row.exe) })
                              }, null, 4),
                              createBaseVNode("span", _hoisted_98, toDisplayString(row.exe), 1)
                            ])
                          ]),
                          _: 1
                        }),
                        createVNode(unref(ElTableColumn), {
                          prop: "priority",
                          label: "优先级",
                          width: "140"
                        }, {
                          default: withCtx(({ row }) => [
                            createBaseVNode("span", _hoisted_99, [
                              createBaseVNode("span", {
                                class: normalizeClass(["opt-dot", row.priority])
                              }, null, 2),
                              createBaseVNode("span", null, toDisplayString(row.priority ?? "默认"), 1)
                            ])
                          ]),
                          _: 1
                        }),
                        createVNode(unref(ElTableColumn), {
                          label: "亲和性",
                          width: "120"
                        }, {
                          default: withCtx(({ row }) => [
                            row.affinity != null ? (openBlock(), createElementBlock("span", _hoisted_100, "0x" + toDisplayString(maskToHex(row.affinity)), 1)) : (openBlock(), createElementBlock("span", _hoisted_101, "不限制"))
                          ]),
                          _: 1
                        }),
                        createVNode(unref(ElTableColumn), {
                          prop: "note",
                          label: "说明",
                          "min-width": "200",
                          "show-overflow-tooltip": ""
                        }, {
                          default: withCtx(({ row }) => [
                            createBaseVNode("span", _hoisted_102, toDisplayString(row.note || "—"), 1)
                          ]),
                          _: 1
                        }),
                        createVNode(unref(ElTableColumn), {
                          label: "操作",
                          width: "76",
                          align: "center"
                        }, {
                          default: withCtx(({ row }) => [
                            createBaseVNode("button", {
                              class: "link-del-btn",
                              disabled: linkBusy.value,
                              onClick: ($event) => deleteProfile(row)
                            }, "删除", 8, _hoisted_103)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["data"])
                  ]),
                  createBaseVNode("section", _hoisted_104, [
                    _cache[63] || (_cache[63] = createBaseVNode("div", { class: "section-title" }, [
                      createBaseVNode("span", { class: "sec-marker" }),
                      createTextVNode(" 添加 Profile ")
                    ], -1)),
                    createBaseVNode("div", _hoisted_105, [
                      createBaseVNode("div", _hoisted_106, [
                        _cache[58] || (_cache[58] = createBaseVNode("label", { class: "field-label" }, "游戏 exe(文件名)", -1)),
                        createVNode(unref(ElInput), {
                          modelValue: formExe.value,
                          "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => formExe.value = $event),
                          class: "cyber-input",
                          placeholder: "如 game.exe,不含路径",
                          clearable: ""
                        }, null, 8, ["modelValue"])
                      ]),
                      createBaseVNode("div", _hoisted_107, [
                        _cache[59] || (_cache[59] = createBaseVNode("label", { class: "field-label" }, "优先级", -1)),
                        createVNode(unref(ElSelect), {
                          modelValue: formPriority.value,
                          "onUpdate:modelValue": _cache[13] || (_cache[13] = ($event) => formPriority.value = $event),
                          class: "cyber-select",
                          "popper-class": "cyber-popper"
                        }, {
                          default: withCtx(() => [
                            (openBlock(), createElementBlock(Fragment, null, renderList(priorityOptions, (opt) => {
                              return createVNode(unref(ElOption), {
                                key: opt.value,
                                label: opt.label,
                                value: opt.value
                              }, {
                                default: withCtx(() => [
                                  createBaseVNode("span", _hoisted_108, [
                                    createBaseVNode("span", {
                                      class: normalizeClass(["opt-dot", opt.value])
                                    }, null, 2),
                                    createBaseVNode("span", null, toDisplayString(opt.label), 1)
                                  ])
                                ]),
                                _: 2
                              }, 1032, ["label", "value"]);
                            }), 64))
                          ]),
                          _: 1
                        }, 8, ["modelValue"])
                      ]),
                      createBaseVNode("div", _hoisted_109, [
                        _cache[60] || (_cache[60] = createBaseVNode("label", { class: "field-label" }, "亲和性掩码(可选)", -1)),
                        createVNode(unref(ElInput), {
                          modelValue: formAffinityHex.value,
                          "onUpdate:modelValue": _cache[14] || (_cache[14] = ($event) => formAffinityHex.value = $event),
                          class: "cyber-input mono-input",
                          placeholder: "如 0xFF 或 FF",
                          clearable: ""
                        }, null, 8, ["modelValue"])
                      ]),
                      createBaseVNode("div", _hoisted_110, [
                        _cache[61] || (_cache[61] = createBaseVNode("label", { class: "field-label" }, "说明(可选)", -1)),
                        createVNode(unref(ElInput), {
                          modelValue: formNote.value,
                          "onUpdate:modelValue": _cache[15] || (_cache[15] = ($event) => formNote.value = $event),
                          class: "cyber-input",
                          placeholder: "备注信息",
                          clearable: ""
                        }, null, 8, ["modelValue"])
                      ]),
                      createBaseVNode("div", _hoisted_111, [
                        createBaseVNode("button", {
                          class: "action-btn primary link-add-btn",
                          disabled: linkBusy.value,
                          onClick: addProfile
                        }, [
                          _cache[62] || (_cache[62] = createBaseVNode("svg", {
                            width: "14",
                            height: "14",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "currentColor",
                            "stroke-width": "2.2",
                            "stroke-linecap": "round"
                          }, [
                            createBaseVNode("path", { d: "M12 5v14M5 12h14" })
                          ], -1)),
                          createBaseVNode("span", null, toDisplayString(linkBusy.value ? "保存中…" : "添加 Profile"), 1)
                        ], 8, _hoisted_112)
                      ])
                    ]),
                    _cache[64] || (_cache[64] = createBaseVNode("p", { class: "hint-text" }, "校验规则与后端一致:exe 只能填文件名、反作弊进程拒绝、掩码为 16 进制且非 0", -1))
                  ])
                ])
              ])
            ], 8, _hoisted_81)) : createCommentVNode("", true)
          ]),
          _: 1
        }),
        createVNode(Transition, { name: "toast" }, {
          default: withCtx(() => [
            toast.value ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: normalizeClass(["toast", toastOk.value ? "ok" : "err"])
            }, [
              toastOk.value ? (openBlock(), createElementBlock("svg", _hoisted_113, [..._cache[65] || (_cache[65] = [
                createBaseVNode("polyline", { points: "20 6 9 17 4 12" }, null, -1)
              ])])) : (openBlock(), createElementBlock("svg", _hoisted_114, [..._cache[66] || (_cache[66] = [
                createBaseVNode("circle", {
                  cx: "12",
                  cy: "12",
                  r: "10"
                }, null, -1),
                createBaseVNode("line", {
                  x1: "12",
                  y1: "8",
                  x2: "12",
                  y2: "12"
                }, null, -1),
                createBaseVNode("line", {
                  x1: "12",
                  y1: "16",
                  x2: "12.01",
                  y2: "16"
                }, null, -1)
              ])])),
              createBaseVNode("span", null, toDisplayString(toast.value), 1)
            ], 2)) : createCommentVNode("", true)
          ]),
          _: 1
        }),
        createVNode(BackgroundThrottleCard)
      ]);
    };
  }
});
const Scheduler = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c04eb57b"]]);
export {
  Scheduler as default
};
