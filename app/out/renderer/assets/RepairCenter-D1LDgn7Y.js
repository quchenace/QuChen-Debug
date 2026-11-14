import { e as ElMessageBox, d as ElMessage } from "./index-CL4m76NE.js";
import { t as defineComponent, aD as watch, a1 as onMounted, Y as onBeforeUnmount, a5 as openBlock, l as createElementBlock, i as createBaseVNode, ak as toDisplayString, k as createCommentVNode, q as createTextVNode, F as Fragment, ab as renderList, aG as withDirectives, az as vModelSelect, S as normalizeClass, a9 as ref, g as computed, _ as _export_sfc, a3 as onUnmounted, ad as resolveComponent, r as createVNode, aF as withCtx } from "./main-DAqTdO6U.js";
/* empty css                     */
const _hoisted_1$1 = {
  class: "input-tool runtime-panel",
  "aria-labelledby": "runtime-title"
};
const _hoisted_2$1 = { class: "tool-actions" };
const _hoisted_3$1 = ["disabled"];
const _hoisted_4$1 = ["disabled"];
const _hoisted_5$1 = {
  class: "tool-status",
  role: "status"
};
const _hoisted_6$1 = {
  key: 0,
  class: "tool-error",
  role: "alert"
};
const _hoisted_7$1 = {
  key: 1,
  class: "runtime-progress",
  role: "status"
};
const _hoisted_8$1 = { key: 0 };
const _hoisted_9$1 = { key: 0 };
const _hoisted_10$1 = {
  key: 1,
  class: "tool-error"
};
const _hoisted_11$1 = { key: 2 };
const _hoisted_12$1 = { class: "tool-actions" };
const _hoisted_13$1 = { class: "inline-field" };
const _hoisted_14$1 = ["value"];
const _hoisted_15$1 = { class: "runtime-count" };
const _hoisted_16$1 = { class: "runtime-list" };
const _hoisted_17$1 = ["data-runtime-id"];
const _hoisted_18$1 = { class: "runtime-name" };
const _hoisted_19$1 = { class: "runtime-arch" };
const _hoisted_20$1 = { class: "runtime-detail" };
const _hoisted_21$1 = ["disabled", "onClick"];
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "RuntimeLibrariesPanel",
  props: {
    disabled: { type: Boolean }
  },
  emits: ["busy", "finished"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const report = ref(null), scanning = ref(false), invoking = ref(false), feedback = ref(""), error = ref(""), group = ref("all"), now = ref(Date.now());
    const status = ref({ busy: false, id: "", phase: "idle", message: "", startedAt: 0 });
    const blocked = computed(() => props.disabled || scanning.value || invoking.value || status.value.busy);
    const groups = computed(() => [...new Set(report.value?.items.map((x) => x.group))]);
    const visibleItems = computed(() => report.value?.items.filter((x) => group.value === "all" || x.group === group.value) || []);
    const elapsed = computed(() => Math.max(0, Math.floor((now.value - status.value.startedAt) / 1e3)));
    const labels = { present: "已检出", older: "旧版本", missing: "未检出", unknown: "状态未知", pending: "等待重启", unsupported: "此安装方式不适用" };
    const phases = { idle: "等待任务", scan: "核对环境", download: "准备下载", verify: "验证安装包", confirm: "等待确认", install: "安装中", readback: "复查中", done: "任务结束" };
    let disposed = false, unsubscribe, timer;
    watch(() => status.value.busy || invoking.value, (value) => emit("busy", value));
    function receive(value) {
      if (disposed) return;
      status.value = value;
      now.value = Date.now();
      if (value.result?.report) report.value = value.result.report;
      if (value.phase === "done") emit("finished");
    }
    async function scan() {
      if (blocked.value) return;
      scanning.value = true;
      report.value = null;
      error.value = "";
      feedback.value = "";
      try {
        const result = await window.sysApi.getRuntimeLibraries();
        if (disposed) return;
        if (!result.success || !result.report) throw Error(result.error || "运行库检测失败");
        report.value = result.report;
      } catch (e) {
        if (!disposed) error.value = e.message;
      } finally {
        scanning.value = false;
      }
    }
    async function install(id) {
      if (blocked.value) return;
      invoking.value = true;
      error.value = "";
      feedback.value = "";
      try {
        const result = await window.sysApi.installRuntimeLibrary(id);
        if (disposed) return;
        if (result.report) report.value = result.report;
        if (!result.success && !result.cancelled) error.value = result.message;
        else feedback.value = result.message;
        receive(await window.sysApi.getRuntimeInstallStatus());
      } catch (e) {
        if (!disposed) error.value = e.message;
      } finally {
        invoking.value = false;
      }
    }
    async function copy() {
      try {
        await navigator.clipboard.writeText(JSON.stringify(report.value, null, 2));
        feedback.value = "报告已复制";
      } catch {
        feedback.value = "复制失败，请重试";
      }
    }
    onMounted(async () => {
      unsubscribe = window.sysApi?.onRuntimeProgress?.(receive);
      timer = setInterval(() => {
        if (status.value.busy) now.value = Date.now();
      }, 1e3);
      try {
        const current = await window.sysApi?.getRuntimeInstallStatus?.();
        if (current) receive(current);
      } catch (e) {
        if (!disposed) error.value = `无法读取任务状态：${e.message}`;
      }
    });
    onBeforeUnmount(() => {
      disposed = true;
      unsubscribe?.();
      if (timer) clearInterval(timer);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("section", _hoisted_1$1, [
        _cache[4] || (_cache[4] = createBaseVNode("div", { class: "tool-heading" }, [
          createBaseVNode("div", null, [
            createBaseVNode("h3", { id: "runtime-title" }, "应用与游戏运行库"),
            createBaseVNode("p", null, "检查 VC++、.NET 和旧版 DirectX 组件，按应用需要逐项安装。")
          ]),
          createBaseVNode("span", { class: "tool-badge" }, "Microsoft 官方来源")
        ], -1)),
        createBaseVNode("div", _hoisted_2$1, [
          createBaseVNode("button", {
            class: "primary",
            disabled: blocked.value,
            onClick: scan
          }, toDisplayString(scanning.value ? "正在检测运行库…" : "检测运行库"), 9, _hoisted_3$1),
          createBaseVNode("button", {
            disabled: !report.value || blocked.value,
            onClick: copy
          }, "复制运行库报告", 8, _hoisted_4$1),
          createBaseVNode("span", _hoisted_5$1, toDisplayString(feedback.value), 1)
        ]),
        error.value ? (openBlock(), createElementBlock("p", _hoisted_6$1, toDisplayString(error.value), 1)) : createCommentVNode("", true),
        status.value.busy || status.value.result ? (openBlock(), createElementBlock("div", _hoisted_7$1, [
          createBaseVNode("strong", null, [
            createTextVNode(toDisplayString(phases[status.value.phase]), 1),
            status.value.busy ? (openBlock(), createElementBlock("span", _hoisted_8$1, " · 已用 " + toDisplayString(elapsed.value) + " 秒", 1)) : createCommentVNode("", true)
          ]),
          createBaseVNode("p", null, toDisplayString(status.value.message), 1),
          status.value.busy && elapsed.value > 120 ? (openBlock(), createElementBlock("p", _hoisted_9$1, "任务仍在处理，请等待安装程序返回。切换页面后可在此继续查看状态。")) : createCommentVNode("", true),
          status.value.result?.restartRequired ? (openBlock(), createElementBlock("p", _hoisted_10$1, "需要手动重启后再次检测。")) : createCommentVNode("", true)
        ])) : createCommentVNode("", true),
        !report.value && !scanning.value ? (openBlock(), createElementBlock("p", _hoisted_11$1, "点击检测后显示本机结果。缺少按需组件不等于系统损坏，无需安装全部运行库。")) : createCommentVNode("", true),
        report.value ? (openBlock(), createElementBlock(Fragment, { key: 3 }, [
          createBaseVNode("p", null, "读取于 " + toDisplayString(new Date(report.value.checkedAt).toLocaleString()) + " · " + toDisplayString(report.value.system.arch || "架构未知") + " · Windows " + toDisplayString(report.value.system.build || "版本未知"), 1),
          (openBlock(true), createElementBlock(Fragment, null, renderList(report.value.errors, (message) => {
            return openBlock(), createElementBlock("p", {
              key: message,
              class: "tool-error"
            }, toDisplayString(message), 1);
          }), 128)),
          createBaseVNode("div", _hoisted_12$1, [
            createBaseVNode("label", _hoisted_13$1, [
              _cache[2] || (_cache[2] = createTextVNode("运行库分类", -1)),
              withDirectives(createBaseVNode("select", {
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => group.value = $event),
                "aria-label": "运行库分类"
              }, [
                _cache[1] || (_cache[1] = createBaseVNode("option", { value: "all" }, "全部", -1)),
                (openBlock(true), createElementBlock(Fragment, null, renderList(groups.value, (name) => {
                  return openBlock(), createElementBlock("option", {
                    key: name,
                    value: name
                  }, toDisplayString(name), 9, _hoisted_14$1);
                }), 128))
              ], 512), [
                [vModelSelect, group.value]
              ])
            ]),
            createBaseVNode("span", _hoisted_15$1, toDisplayString(report.value.items.filter((x) => x.state === "present").length) + " 项已检出 · " + toDisplayString(report.value.items.filter((x) => x.state === "missing" || x.state === "older").length) + " 项可按需补齐", 1)
          ]),
          createBaseVNode("div", _hoisted_16$1, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(visibleItems.value, (item) => {
              return openBlock(), createElementBlock("article", {
                key: item.id,
                class: "runtime-row",
                "data-runtime-id": item.id
              }, [
                createBaseVNode("div", _hoisted_18$1, [
                  createBaseVNode("strong", null, toDisplayString(item.title), 1),
                  createBaseVNode("span", _hoisted_19$1, toDisplayString(item.arch === "system" ? "系统组件" : item.arch), 1),
                  createBaseVNode("p", null, toDisplayString(item.version || "未检出版本"), 1)
                ]),
                createBaseVNode("div", _hoisted_20$1, [
                  createBaseVNode("span", {
                    class: normalizeClass(["runtime-state", item.state])
                  }, toDisplayString(labels[item.state]), 3),
                  createBaseVNode("p", null, toDisplayString(item.detail || "需要成功读取后才能判断。"), 1)
                ]),
                createBaseVNode("button", {
                  disabled: blocked.value || !item.installable,
                  onClick: ($event) => install(item.id)
                }, toDisplayString(item.id === "dotnet-framework-35" && report.value.system.build < 28e3 ? "启用 Windows 功能" : "获取官方安装包"), 9, _hoisted_21$1)
              ], 8, _hoisted_17$1);
            }), 128))
          ]),
          _cache[3] || (_cache[3] = createBaseVNode("p", { class: "tool-note" }, "下载后会验证 Microsoft 数字签名，并显示安装确认。Windows 功能通过系统工具启用；所有安装均在结束后重新检测。已检出状态不验证每个库文件的完整性。", -1))
        ], 64)) : createCommentVNode("", true)
      ]);
    };
  }
});
const RuntimeLibrariesPanel = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-80f39413"]]);
function initialRepairTaskState() {
  return { seq: 0, busy: false, scenarioId: "", runId: "", startedAt: 0, finishedAt: 0, logs: [], result: null, error: "" };
}
function newestRepairTaskState(current, incoming) {
  return incoming.seq > current.seq ? incoming : current;
}
const _hoisted_1 = { class: "page-header" };
const _hoisted_2 = {
  key: 0,
  class: "page-icon"
};
const _hoisted_3 = {
  key: 1,
  class: "page-title-block"
};
const _hoisted_4 = { class: "page-actions" };
const _hoisted_5 = ["disabled"];
const _hoisted_6 = { class: "grid gap-4 md:grid-cols-2" };
const _hoisted_7 = { class: "flex items-center justify-between" };
const _hoisted_8 = { class: "flex items-center gap-2" };
const _hoisted_9 = { class: "font-mono text-sm font-bold text-white" };
const _hoisted_10 = { class: "font-mono text-[10px] text-gray-500" };
const _hoisted_11 = { class: "mt-1 text-xs text-gray-400" };
const _hoisted_12 = { class: "mt-3 flex flex-col gap-1.5" };
const _hoisted_13 = { class: "font-mono text-xs text-gray-300" };
const _hoisted_14 = { class: "mt-4 flex items-center gap-2" };
const _hoisted_15 = ["disabled", "onClick"];
const _hoisted_16 = ["disabled", "onClick"];
const _hoisted_17 = {
  key: 0,
  class: "mt-2 font-mono text-[10px] text-red-400/80"
};
const _hoisted_18 = {
  key: 0,
  class: "mt-4 text-xs text-gray-400"
};
const _hoisted_19 = {
  key: 1,
  role: "alert",
  class: "mt-4 text-xs text-red-400"
};
const _hoisted_20 = {
  key: 2,
  class: "glass-card mt-6 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl"
};
const _hoisted_21 = { class: "mb-3 flex items-center justify-between border-b border-white/10 pb-2" };
const _hoisted_22 = { class: "flex items-center gap-2 font-mono text-xs tracking-widest text-gray-400" };
const _hoisted_23 = {
  key: 0,
  class: "live-dot"
};
const _hoisted_24 = { class: "font-mono text-[10px] text-gray-500" };
const _hoisted_25 = { class: "flex items-center gap-2 font-mono text-xs" };
const _hoisted_26 = { class: "text-gray-300" };
const _hoisted_27 = {
  key: 0,
  class: "text-gray-600"
};
const _hoisted_28 = {
  key: 0,
  class: "mt-1 ml-5 space-y-0.5 font-mono text-[11px] text-gray-500"
};
const _hoisted_29 = {
  key: 3,
  class: "glass-card mt-6 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl"
};
const _hoisted_30 = { class: "mb-3 flex items-center justify-between border-b border-white/10 pb-2" };
const _hoisted_31 = { class: "font-mono text-xs tracking-widest text-gray-400" };
const _hoisted_32 = { class: "flex items-center gap-2 font-mono text-xs" };
const _hoisted_33 = { class: "text-gray-300" };
const _hoisted_34 = { class: "text-gray-500" };
const _hoisted_35 = {
  key: 0,
  class: "text-red-400"
};
const _hoisted_36 = {
  key: 0,
  class: "mt-1 ml-5 space-y-0.5 font-mono text-[11px] text-gray-500"
};
const _hoisted_37 = { class: "glass-card mt-6 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl" };
const _hoisted_38 = {
  key: 0,
  class: "font-mono text-xs text-gray-500"
};
const _hoisted_39 = {
  key: 1,
  class: "flex flex-col gap-2"
};
const _hoisted_40 = { class: "flex flex-col" };
const _hoisted_41 = { class: "font-mono text-xs text-gray-300" };
const _hoisted_42 = { class: "font-mono text-[10px] text-gray-500" };
const _hoisted_43 = ["disabled", "onClick"];
const _hoisted_44 = { class: "glass-card mt-6 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl" };
const _hoisted_45 = {
  key: 0,
  class: "font-mono text-xs text-gray-500"
};
const _hoisted_46 = {
  key: 1,
  class: "flex flex-col gap-1"
};
const _hoisted_47 = { class: "text-gray-300" };
const _hoisted_48 = { class: "text-gray-500" };
const _hoisted_49 = { class: "ml-auto text-gray-600" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "RepairCenter",
  props: {
    embedded: { type: Boolean }
  },
  setup(__props) {
    const scenarios = ref([]);
    const points = ref([]);
    const history = ref([]);
    const task = ref(initialRepairTaskState());
    const syncing = ref(true), pending = ref(false), statusError = ref("");
    const lastResult = computed(() => task.value.result);
    const running = computed(() => syncing.value || pending.value || task.value.busy);
    const runtimeBusy = ref(false);
    const activeScenario = computed(() => scenarios.value.find((s) => s.id === task.value.scenarioId));
    const liveLogs = computed(() => task.value.logs);
    const unsubscribeRepair = ref(null);
    let disposed = false;
    function receiveTask(next) {
      if (disposed) return;
      const previous = task.value;
      task.value = newestRepairTaskState(previous, next);
      if (task.value !== previous && next.finishedAt && !next.busy) {
        void loadHistory();
        void loadPoints();
      }
    }
    async function loadTask() {
      try {
        const r = await window.sysApi.getRepairStatus();
        if (r.success && r.state) {
          receiveTask(r.state);
          statusError.value = "";
        } else statusError.value = r.error || "读取修复任务状态失败";
      } catch (e) {
        statusError.value = String(e.message || e);
      } finally {
        syncing.value = false;
      }
    }
    function riskLabel(r) {
      return r === 1 ? "低风险" : r === 2 ? "中风险" : "高风险";
    }
    function riskClass(r) {
      return r === 1 ? "bg-green-500/15 text-green-400" : r === 2 ? "bg-amber-500/15 text-amber-400" : "bg-red-500/15 text-red-400";
    }
    function liveOf(itemId) {
      return liveLogs.value.filter((l) => l.itemId === itemId).map((l) => l.log);
    }
    async function loadScenarios() {
      const r = await window.sysApi.getRepairScenarios();
      if (r.success && r.scenarios) scenarios.value = r.scenarios;
    }
    async function loadPoints() {
      const r = await window.sysApi.listRestorePoints();
      if (r.success && r.points) points.value = r.points;
    }
    async function loadHistory() {
      const r = await window.sysApi.getRepairHistory(30);
      if (r.success && r.entries) history.value = r.entries;
    }
    async function runScenario(s, forced) {
      if (running.value || runtimeBusy.value) return;
      if (s.risk === 3 && !forced) {
        try {
          await ElMessageBox.confirm(
            "该场景包含高风险操作(bcdedit/netsh 深度重置),执行后可能需要重启系统。确定继续?",
            "高风险场景确认",
            { type: "warning", confirmButtonText: "确认执行", cancelButtonText: "取消" }
          );
        } catch {
          return;
        }
      }
      if (running.value || runtimeBusy.value) return;
      pending.value = true;
      try {
        const r = await window.sysApi.runRepairScenario(s.id, { confirmRisk3: forced || s.risk === 3, createRestorePoint: true });
        if (r.success && r.result) {
          ElMessage.success("修复完成,详见下方日志");
          loadHistory();
          loadPoints();
        } else {
          ElMessage.error(r.error || "执行失败");
        }
      } catch (e) {
        ElMessage.error(String(e?.message || e));
      } finally {
        await loadTask();
        pending.value = false;
      }
    }
    async function restorePoint(p) {
      try {
        await ElMessageBox.confirm(
          `将系统还原到「${p.description || "未命名还原点"}」?系统会重启完成还原,请先保存所有工作。`,
          "系统还原确认",
          { type: "warning", confirmButtonText: "开始还原", cancelButtonText: "取消" }
        );
      } catch {
        return;
      }
      const r = await window.sysApi.restorePointRestore(p.sequenceNumber);
      if (r.success) ElMessage.success(r.message || "已提交");
      else ElMessage.error(r.message || r.error || "还原失败");
    }
    function loadAll() {
      void loadScenarios();
      void loadPoints();
      void loadHistory();
      void loadTask();
    }
    onMounted(() => {
      unsubscribeRepair.value = window.sysApi.onRepairState(receiveTask);
      loadAll();
    });
    onUnmounted(() => {
      disposed = true;
      if (unsubscribeRepair.value) unsubscribeRepair.value();
      unsubscribeRepair.value = null;
    });
    return (_ctx, _cache) => {
      const _component_router_link = resolveComponent("router-link");
      return openBlock(), createElementBlock("div", {
        "data-tour": "repair-center",
        class: normalizeClass(["repair-page", { page: !__props.embedded, "repair-embedded": __props.embedded }])
      }, [
        createBaseVNode("div", _hoisted_1, [
          !__props.embedded ? (openBlock(), createElementBlock("div", _hoisted_2, [..._cache[1] || (_cache[1] = [
            createBaseVNode("svg", {
              width: "28",
              height: "28",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "var(--accent)",
              "stroke-width": "1.5"
            }, [
              createBaseVNode("path", { d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" })
            ], -1)
          ])])) : createCommentVNode("", true),
          !__props.embedded ? (openBlock(), createElementBlock("div", _hoisted_3, [..._cache[2] || (_cache[2] = [
            createBaseVNode("h2", { class: "page-title" }, "修复中心", -1),
            createBaseVNode("p", { class: "page-desc" }, "运行库补齐 · 场景修复 · 系统还原点", -1)
          ])])) : createCommentVNode("", true),
          createBaseVNode("div", _hoisted_4, [
            createVNode(_component_router_link, {
              class: "btn-ghost",
              to: "/system-diagnostics?tab=faults"
            }, {
              default: withCtx(() => [..._cache[3] || (_cache[3] = [
                createTextVNode("故障诊断", -1)
              ])]),
              _: 1
            }),
            createBaseVNode("button", {
              class: "btn-ghost",
              onClick: loadAll,
              disabled: running.value || runtimeBusy.value
            }, "刷新", 8, _hoisted_5)
          ])
        ]),
        createVNode(RuntimeLibrariesPanel, {
          disabled: running.value,
          onBusy: _cache[0] || (_cache[0] = ($event) => runtimeBusy.value = $event),
          onFinished: loadHistory
        }, null, 8, ["disabled"]),
        createBaseVNode("div", _hoisted_6, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(scenarios.value, (s) => {
            return openBlock(), createElementBlock("div", {
              key: s.id,
              class: "glass-card rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl"
            }, [
              createBaseVNode("div", _hoisted_7, [
                createBaseVNode("div", _hoisted_8, [
                  createBaseVNode("span", _hoisted_9, toDisplayString(s.title), 1),
                  createBaseVNode("span", {
                    class: normalizeClass(["rounded px-1.5 py-0.5 font-mono text-[10px]", riskClass(s.risk)])
                  }, toDisplayString(riskLabel(s.risk)), 3)
                ]),
                createBaseVNode("span", _hoisted_10, toDisplayString(s.items.length) + " 项修复", 1)
              ]),
              createBaseVNode("p", _hoisted_11, toDisplayString(s.desc), 1),
              createBaseVNode("div", _hoisted_12, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(s.items, (item) => {
                  return openBlock(), createElementBlock("div", {
                    key: item.id,
                    class: "flex items-center justify-between rounded-lg border border-white/5 bg-black/20 px-3 py-2"
                  }, [
                    createBaseVNode("span", _hoisted_13, toDisplayString(item.title), 1),
                    createBaseVNode("span", {
                      class: normalizeClass(["font-mono text-[10px]", item.risk === 3 ? "text-red-400" : "text-gray-500"])
                    }, toDisplayString(item.risk === 3 ? "高危险" : ""), 3)
                  ]);
                }), 128))
              ]),
              createBaseVNode("div", _hoisted_14, [
                createBaseVNode("button", {
                  class: "btn-primary flex-1",
                  disabled: running.value || runtimeBusy.value,
                  onClick: ($event) => runScenario(s, false)
                }, "检测并修复", 8, _hoisted_15),
                s.risk === 3 ? (openBlock(), createElementBlock("button", {
                  key: 0,
                  class: "btn-danger",
                  disabled: running.value || runtimeBusy.value,
                  onClick: ($event) => runScenario(s, true)
                }, "确认后执行", 8, _hoisted_16)) : createCommentVNode("", true)
              ]),
              s.risk === 3 ? (openBlock(), createElementBlock("div", _hoisted_17, "⚠ 高风险场景,涉及 bcdedit/netsh 深度重置,执行后需重启")) : createCommentVNode("", true)
            ]);
          }), 128))
        ]),
        syncing.value ? (openBlock(), createElementBlock("p", _hoisted_18, "正在恢复修复任务状态…")) : createCommentVNode("", true),
        task.value.error || statusError.value ? (openBlock(), createElementBlock("p", _hoisted_19, toDisplayString(task.value.error || statusError.value), 1)) : createCommentVNode("", true),
        (task.value.busy || task.value.error) && activeScenario.value ? (openBlock(), createElementBlock("div", _hoisted_20, [
          createBaseVNode("div", _hoisted_21, [
            createBaseVNode("span", _hoisted_22, [
              task.value.busy ? (openBlock(), createElementBlock("span", _hoisted_23)) : createCommentVNode("", true),
              createTextVNode(" " + toDisplayString(task.value.busy ? "正在执行" : "执行未完成") + " · " + toDisplayString(activeScenario.value.title), 1)
            ]),
            createBaseVNode("span", _hoisted_24, toDisplayString(liveLogs.value.length) + " 条日志", 1)
          ]),
          (openBlock(true), createElementBlock(Fragment, null, renderList(activeScenario.value.items, (item) => {
            return openBlock(), createElementBlock("div", {
              key: item.id,
              class: "mb-3"
            }, [
              createBaseVNode("div", _hoisted_25, [
                createBaseVNode("span", {
                  class: normalizeClass(liveOf(item.id).length ? "text-amber-400" : "text-gray-600")
                }, toDisplayString(liveOf(item.id).length ? "▸" : "…"), 3),
                createBaseVNode("span", _hoisted_26, toDisplayString(item.title), 1),
                !liveOf(item.id).length ? (openBlock(), createElementBlock("span", _hoisted_27, toDisplayString(task.value.busy ? "等待执行…" : "未收到执行日志"), 1)) : createCommentVNode("", true)
              ]),
              liveOf(item.id).length ? (openBlock(), createElementBlock("div", _hoisted_28, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(liveOf(item.id), (l, i) => {
                  return openBlock(), createElementBlock("div", { key: i }, toDisplayString(l), 1);
                }), 128))
              ])) : createCommentVNode("", true)
            ]);
          }), 128))
        ])) : createCommentVNode("", true),
        lastResult.value && !running.value ? (openBlock(), createElementBlock("div", _hoisted_29, [
          createBaseVNode("div", _hoisted_30, [
            createBaseVNode("span", _hoisted_31, "执行结果 · " + toDisplayString(lastResult.value.scenarioId) + " #" + toDisplayString(lastResult.value.runId), 1),
            createBaseVNode("span", {
              class: normalizeClass(["font-mono text-xs", lastResult.value.restoredPoint ? "text-green-400" : "text-gray-500"])
            }, toDisplayString(lastResult.value.restoredPoint ? "已创建还原点" : "未创建还原点"), 3)
          ]),
          (openBlock(true), createElementBlock(Fragment, null, renderList(lastResult.value.items, (item) => {
            return openBlock(), createElementBlock("div", {
              key: item.itemId,
              class: "mb-3"
            }, [
              createBaseVNode("div", _hoisted_32, [
                createBaseVNode("span", {
                  class: normalizeClass(item.ok ? "text-green-400" : "text-red-400")
                }, toDisplayString(item.ok ? "✓" : "✗"), 3),
                createBaseVNode("span", _hoisted_33, toDisplayString(item.title), 1),
                createBaseVNode("span", _hoisted_34, toDisplayString(item.problem ? "发现问题" : "正常"), 1),
                item.error ? (openBlock(), createElementBlock("span", _hoisted_35, "· " + toDisplayString(item.error), 1)) : createCommentVNode("", true)
              ]),
              item.logs.length ? (openBlock(), createElementBlock("div", _hoisted_36, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(item.logs, (l, i) => {
                  return openBlock(), createElementBlock("div", { key: i }, toDisplayString(l), 1);
                }), 128))
              ])) : createCommentVNode("", true)
            ]);
          }), 128))
        ])) : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_37, [
          createBaseVNode("div", { class: "mb-3 flex items-center justify-between border-b border-white/10 pb-2" }, [
            _cache[4] || (_cache[4] = createBaseVNode("span", { class: "font-mono text-xs tracking-widest text-gray-400" }, "系统还原点", -1)),
            createBaseVNode("button", {
              class: "btn-ghost text-xs",
              onClick: loadPoints
            }, "刷新")
          ]),
          points.value.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_38, "暂无还原点(系统保护可能未开启,优化前可手动创建)")) : (openBlock(), createElementBlock("div", _hoisted_39, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(points.value, (p) => {
              return openBlock(), createElementBlock("div", {
                key: p.sequenceNumber,
                class: "flex items-center justify-between rounded-lg border border-white/5 bg-black/20 px-3 py-2"
              }, [
                createBaseVNode("div", _hoisted_40, [
                  createBaseVNode("span", _hoisted_41, toDisplayString(p.description || "未命名还原点"), 1),
                  createBaseVNode("span", _hoisted_42, toDisplayString(new Date(p.creationTime).toLocaleString()), 1)
                ]),
                createBaseVNode("button", {
                  class: "btn-danger text-xs",
                  disabled: running.value || runtimeBusy.value,
                  onClick: ($event) => restorePoint(p)
                }, "恢复到此", 8, _hoisted_43)
              ]);
            }), 128))
          ]))
        ]),
        createBaseVNode("div", _hoisted_44, [
          _cache[5] || (_cache[5] = createBaseVNode("div", { class: "mb-3 border-b border-white/10 pb-2 font-mono text-xs tracking-widest text-gray-400" }, "修复历史", -1)),
          history.value.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_45, "暂无修复记录")) : (openBlock(), createElementBlock("div", _hoisted_46, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(history.value, (h, i) => {
              return openBlock(), createElementBlock("div", {
                key: i,
                class: "flex items-center gap-2 font-mono text-[11px]"
              }, [
                createBaseVNode("span", {
                  class: normalizeClass(h.result === "ok" ? "text-green-400" : "text-red-400")
                }, toDisplayString(h.result === "ok" ? "✓" : "✗"), 3),
                createBaseVNode("span", _hoisted_47, toDisplayString(h.opId), 1),
                createBaseVNode("span", _hoisted_48, toDisplayString(h.action), 1),
                createBaseVNode("span", _hoisted_49, toDisplayString(new Date(h.ts).toLocaleString()), 1)
              ]);
            }), 128))
          ]))
        ])
      ], 2);
    };
  }
});
const RepairCenter = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4202f723"]]);
export {
  RepairCenter as default
};
