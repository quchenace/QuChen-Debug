import { t as defineComponent, Y as onBeforeUnmount, a5 as openBlock, l as createElementBlock, i as createBaseVNode, aG as withDirectives, az as vModelSelect, F as Fragment, ab as renderList, ak as toDisplayString, k as createCommentVNode, S as normalizeClass, q as createTextVNode, a9 as ref, an as toRaw, _ as _export_sfc, aA as vModelText, a1 as onMounted, a3 as onUnmounted, p as createStaticVNode, r as createVNode, j as createBlock, g as computed } from "./main-DAqTdO6U.js";
import { d as ElMessage } from "./index-CL4m76NE.js";
import { S as StatusDot } from "./StatusDot-C-XeYEe8.js";
const _hoisted_1$2 = { class: "glass-card mt-6 rounded-2xl border border-white/10 bg-white/5 p-5" };
const _hoisted_2$2 = { class: "flex flex-wrap items-center gap-3" };
const _hoisted_3$2 = ["disabled"];
const _hoisted_4$2 = ["value"];
const _hoisted_5$2 = ["disabled"];
const _hoisted_6$2 = ["disabled"];
const _hoisted_7$2 = {
  key: 0,
  class: "mt-3 text-xs text-red-400"
};
const _hoisted_8$2 = {
  key: 1,
  class: "mt-4 text-xs text-gray-300"
};
const _hoisted_9$2 = { class: "mt-3 grid grid-cols-2 gap-3 md:grid-cols-4" };
const _hoisted_10$2 = { class: "block mt-1" };
const _hoisted_11$2 = {
  key: 0,
  class: "text-gray-500"
};
const _hoisted_12$2 = {
  key: 0,
  class: "mt-2 text-gray-500"
};
const _hoisted_13$2 = {
  key: 0,
  class: "mt-2 text-gray-500"
};
const _hoisted_14$2 = { class: "text-gray-500" };
const _hoisted_15$2 = { class: "mt-6 border-t border-white/10 pt-4" };
const _hoisted_16$2 = { class: "flex flex-wrap items-center gap-3" };
const _hoisted_17$2 = ["disabled"];
const _hoisted_18$1 = ["disabled"];
const _hoisted_19$1 = ["disabled"];
const _hoisted_20$1 = ["disabled"];
const _hoisted_21$1 = ["disabled"];
const _hoisted_22$1 = {
  key: 0,
  class: "mt-3 text-xs text-gray-400"
};
const _hoisted_23$1 = { key: 0 };
const _hoisted_24$1 = { key: 1 };
const _hoisted_25$1 = {
  key: 1,
  class: "mt-2 text-xs text-red-400"
};
const _hoisted_26$1 = {
  key: 2,
  class: "mt-3 whitespace-pre-wrap break-all text-[10px] text-gray-400"
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "NativeLatencyCard",
  setup(__props) {
    const seconds = ref(30), busy = ref(false), error = ref(""), summary = ref(null), baseline = ref(null);
    const resolution = ref(5e3), timerBusy = ref(false), timer = ref(null), timerError = ref("");
    const metrics = [{ key: "maxDpcUs", label: "DPC 最大" }, { key: "avgDpcUs", label: "DPC 平均" }, { key: "maxIsrUs", label: "ISR 最大" }, { key: "avgIsrUs", label: "ISR 平均" }];
    const format = (value) => value === null ? "未知" : `${value.toFixed(2)} μs`;
    function saveBaseline() {
      baseline.value = summary.value ? structuredClone(toRaw(summary.value)) : null;
    }
    async function run() {
      busy.value = true;
      error.value = "";
      try {
        const r = await window.nativeLatencyApi.run(seconds.value);
        if (r.success && r.summary) summary.value = r.summary;
        else error.value = r.cancelled ? "已取消采样" : r.error || "采样失败";
      } catch (e) {
        error.value = String(e);
      } finally {
        busy.value = false;
      }
    }
    async function cancel() {
      await window.nativeLatencyApi.cancel();
    }
    async function timerAction(action) {
      timerBusy.value = true;
      timerError.value = "";
      try {
        const r = await window.nativeLatencyApi.timer(action, resolution.value);
        if (r.success) timer.value = r;
        else timerError.value = r.error || "操作失败";
      } catch (e) {
        timerError.value = String(e);
      } finally {
        timerBusy.value = false;
      }
    }
    onBeforeUnmount(() => {
      if (busy.value) void cancel();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$2, [
        _cache[9] || (_cache[9] = createBaseVNode("h3", { class: "mb-3 font-mono text-sm text-gray-200" }, "DPC / ISR 长采样与驱动归因", -1)),
        _cache[10] || (_cache[10] = createBaseVNode("p", { class: "mb-3 text-xs text-gray-500" }, "采集驱动事件，保留原生计时校准状态；驱动耗时排行仅表示本次贡献，不代表故障根因。", -1)),
        createBaseVNode("div", _hoisted_2$2, [
          withDirectives(createBaseVNode("select", {
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => seconds.value = $event),
            disabled: busy.value,
            class: "rounded bg-gray-900 px-3 py-2 text-xs text-gray-300"
          }, [
            (openBlock(), createElementBlock(Fragment, null, renderList([5, 15, 30, 60, 120, 300], (s) => {
              return createBaseVNode("option", {
                key: s,
                value: s
              }, toDisplayString(s) + " 秒", 9, _hoisted_4$2);
            }), 64))
          ], 8, _hoisted_3$2), [
            [
              vModelSelect,
              seconds.value,
              void 0,
              { number: true }
            ]
          ]),
          createBaseVNode("button", {
            class: "btn-ghost text-xs",
            disabled: busy.value,
            onClick: run
          }, toDisplayString(busy.value ? "采集中…" : "开始 DPC / ISR 采样"), 9, _hoisted_5$2),
          busy.value ? (openBlock(), createElementBlock("button", {
            key: 0,
            class: "btn-ghost text-xs",
            onClick: cancel
          }, "取消采样")) : createCommentVNode("", true),
          createBaseVNode("button", {
            class: "btn-ghost text-xs",
            disabled: busy.value || !summary.value?.calibrated,
            onClick: saveBaseline
          }, "记为对照", 8, _hoisted_6$2)
        ]),
        error.value ? (openBlock(), createElementBlock("p", _hoisted_7$2, toDisplayString(error.value), 1)) : createCommentVNode("", true),
        summary.value ? (openBlock(), createElementBlock("div", _hoisted_8$2, [
          createBaseVNode("p", {
            class: normalizeClass(summary.value.calibrated ? "text-green-400" : "text-amber-400")
          }, toDisplayString(summary.value.calibrated ? "计时已校准" : "计时未校准，微秒结果不可用") + " · " + toDisplayString(summary.value.calibration) + " · " + toDisplayString(summary.value.confidence), 3),
          createBaseVNode("div", _hoisted_9$2, [
            (openBlock(), createElementBlock(Fragment, null, renderList(metrics, (m) => {
              return createBaseVNode("div", {
                key: m.key
              }, [
                createTextVNode(toDisplayString(m.label), 1),
                createBaseVNode("b", _hoisted_10$2, toDisplayString(format(summary.value[m.key])), 1),
                baseline.value ? (openBlock(), createElementBlock("span", _hoisted_11$2, "对照 " + toDisplayString(format(baseline.value[m.key])), 1)) : createCommentVNode("", true)
              ]);
            }), 64))
          ]),
          baseline.value ? (openBlock(), createElementBlock("p", _hoisted_12$2, "对照仅用于相同场景、时长和负载下比较。")) : createCommentVNode("", true),
          (openBlock(true), createElementBlock(Fragment, null, renderList([{ name: "DPC 驱动", items: summary.value.topDpcModules }, { name: "ISR 驱动", items: summary.value.topIsrModules }], (group) => {
            return openBlock(), createElementBlock("div", {
              key: group.name,
              class: "mt-4"
            }, [
              createBaseVNode("b", null, toDisplayString(group.name), 1),
              !group.items.length ? (openBlock(), createElementBlock("p", _hoisted_13$2, "本次未获得模块归因")) : createCommentVNode("", true),
              (openBlock(true), createElementBlock(Fragment, null, renderList(group.items, (m, i) => {
                return openBlock(), createElementBlock("div", {
                  key: i,
                  class: "mt-2 flex flex-wrap justify-between gap-2 border-b border-white/5 pb-2"
                }, [
                  createBaseVNode("span", null, toDisplayString(m.module), 1),
                  createBaseVNode("span", _hoisted_14$2, toDisplayString(m.details), 1)
                ]);
              }), 128))
            ]);
          }), 128))
        ])) : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_15$2, [
          _cache[7] || (_cache[7] = createBaseVNode("h3", { class: "text-sm text-gray-200" }, "临时计时器分辨率", -1)),
          _cache[8] || (_cache[8] = createBaseVNode("p", { class: "my-2 text-xs text-gray-500" }, "仅本次应用会话持有请求；关闭或异常退出后由原生助手监视父进程并释放。实际结果取决于 Windows 与其他进程的请求。", -1)),
          createBaseVNode("div", _hoisted_16$2, [
            withDirectives(createBaseVNode("select", {
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => resolution.value = $event),
              disabled: timerBusy.value || timer.value?.running,
              class: "rounded bg-gray-900 px-3 py-2 text-xs text-gray-300"
            }, [..._cache[6] || (_cache[6] = [
              createBaseVNode("option", { value: 5e3 }, "0.5 ms", -1),
              createBaseVNode("option", { value: 1e4 }, "1 ms", -1),
              createBaseVNode("option", { value: 156250 }, "15.625 ms", -1)
            ])], 8, _hoisted_17$2), [
              [
                vModelSelect,
                resolution.value,
                void 0,
                { number: true }
              ]
            ]),
            createBaseVNode("button", {
              class: "btn-ghost text-xs",
              disabled: timerBusy.value,
              onClick: _cache[2] || (_cache[2] = ($event) => timerAction("query"))
            }, "读取状态", 8, _hoisted_18$1),
            createBaseVNode("button", {
              class: "btn-ghost text-xs",
              disabled: timerBusy.value || timer.value?.running,
              onClick: _cache[3] || (_cache[3] = ($event) => timerAction("start"))
            }, "临时请求", 8, _hoisted_19$1),
            createBaseVNode("button", {
              class: "btn-ghost text-xs",
              disabled: timerBusy.value || !timer.value?.running,
              onClick: _cache[4] || (_cache[4] = ($event) => timerAction("stop"))
            }, "释放请求", 8, _hoisted_20$1),
            createBaseVNode("button", {
              class: "btn-ghost text-xs",
              disabled: timerBusy.value,
              onClick: _cache[5] || (_cache[5] = ($event) => timerAction("measure"))
            }, "测量唤醒精度", 8, _hoisted_21$1)
          ]),
          timer.value ? (openBlock(), createElementBlock("p", _hoisted_22$1, [
            createTextVNode(toDisplayString(timer.value.running ? "本会话请求运行中" : "本会话未持有请求"), 1),
            timer.value.current100ns ? (openBlock(), createElementBlock("span", _hoisted_23$1, " · 当前 " + toDisplayString(timer.value.current100ns / 1e4) + " ms", 1)) : createCommentVNode("", true),
            timer.value.achieved100ns ? (openBlock(), createElementBlock("span", _hoisted_24$1, " · 请求回读 " + toDisplayString(timer.value.achieved100ns / 1e4) + " ms", 1)) : createCommentVNode("", true)
          ])) : createCommentVNode("", true),
          timerError.value ? (openBlock(), createElementBlock("p", _hoisted_25$1, toDisplayString(timerError.value), 1)) : createCommentVNode("", true),
          timer.value?.measurement ? (openBlock(), createElementBlock("pre", _hoisted_26$1, toDisplayString(timer.value.measurement), 1)) : createCommentVNode("", true)
        ])
      ]);
    };
  }
});
const NativeLatencyCard = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-35fc6996"]]);
const _hoisted_1$1 = { class: "glass-card mt-6 rounded-xl border border-white/10 p-5" };
const _hoisted_2$1 = { class: "flex gap-3" };
const _hoisted_3$1 = ["disabled"];
const _hoisted_4$1 = ["disabled"];
const _hoisted_5$1 = {
  key: 0,
  class: "my-3 text-xs text-gray-300"
};
const _hoisted_6$1 = {
  key: 1,
  class: "my-3 text-xs text-red-400"
};
const _hoisted_7$1 = {
  key: 2,
  class: "my-3 text-xs text-amber-400"
};
const _hoisted_8$1 = { class: "text-xs text-gray-300" };
const _hoisted_9$1 = {
  key: 0,
  class: "my-2 text-[11px] text-gray-500"
};
const _hoisted_10$1 = { class: "mt-2 flex flex-wrap items-center gap-3" };
const _hoisted_11$1 = ["disabled", "onClick"];
const _hoisted_12$1 = ["disabled", "onClick"];
const _hoisted_13$1 = ["disabled", "onClick"];
const _hoisted_14$1 = {
  key: 3,
  class: "mt-4 rounded border border-amber-500/20 bg-amber-500/5 p-3 text-xs text-gray-300"
};
const _hoisted_15$1 = { class: "mt-3 flex gap-3" };
const _hoisted_16$1 = ["disabled"];
const _hoisted_17$1 = ["disabled"];
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "LowlevelTuningCard",
  setup(__props) {
    const targets = ref([]), pending = ref([]), busy = ref(false), message = ref(""), error = ref(""), core = ref(0);
    const selected = ref(null);
    async function work(fn) {
      busy.value = true;
      error.value = "";
      message.value = "";
      try {
        const r = await fn();
        pending.value = r.pending || [];
        if (r.targets) targets.value = r.targets;
        if (r.success) message.value = r.note || `发现 ${targets.value.length} 个目标`;
        else error.value = r.error || "操作失败";
      } catch (e) {
        error.value = String(e);
      } finally {
        busy.value = false;
      }
    }
    function scan() {
      return work(() => window.lowlevelApi.scan());
    }
    function restore() {
      selected.value = null;
      return work(() => window.lowlevelApi.restore());
    }
    function choose(target, group) {
      selected.value = { target, group };
    }
    async function apply() {
      const s = selected.value;
      if (!s) return;
      selected.value = null;
      await work(() => window.lowlevelApi.apply(s.target.id, s.group, core.value));
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        _cache[3] || (_cache[3] = createBaseVNode("h3", { class: "text-sm text-gray-200" }, "设备中断与网卡低延迟", -1)),
        _cache[4] || (_cache[4] = createBaseVNode("p", { class: "my-2 text-xs text-gray-500" }, "按旧版选项适配当前硬件；保存原值后写入并回读，配置通常重启后生效。每次应用一组，可在重启或异常退出后恢复。", -1)),
        createBaseVNode("div", _hoisted_2$1, [
          createBaseVNode("button", {
            class: "btn-ghost text-xs",
            disabled: busy.value,
            onClick: scan
          }, "扫描设备与恢复记录", 8, _hoisted_3$1),
          createBaseVNode("button", {
            class: "btn-ghost text-xs",
            disabled: busy.value || !pending.value.length,
            onClick: restore
          }, "恢复原值（" + toDisplayString(pending.value.length) + "）", 9, _hoisted_4$1)
        ]),
        message.value ? (openBlock(), createElementBlock("p", _hoisted_5$1, toDisplayString(message.value), 1)) : createCommentVNode("", true),
        error.value ? (openBlock(), createElementBlock("p", _hoisted_6$1, toDisplayString(error.value), 1)) : createCommentVNode("", true),
        pending.value.length ? (openBlock(), createElementBlock("p", _hoisted_7$1, "存在待恢复配置：" + toDisplayString(pending.value[0].label) + "；先恢复后可进行下一组操作。", 1)) : createCommentVNode("", true),
        (openBlock(true), createElementBlock(Fragment, null, renderList(targets.value, (t) => {
          return openBlock(), createElementBlock("div", {
            key: t.id,
            class: "mt-4 border-t border-white/5 pt-3"
          }, [
            createBaseVNode("b", _hoisted_8$1, toDisplayString(t.label), 1),
            t.kind === "nic" ? (openBlock(), createElementBlock("p", _hoisted_9$1, toDisplayString(t.properties?.map((p) => `${p.label}=${p.current}${p.off === null ? "（驱动未提供关闭值）" : ""}`).join(" · ") || "无受支持的驱动属性"), 1)) : createCommentVNode("", true),
            createBaseVNode("div", _hoisted_10$1, [
              createBaseVNode("button", {
                class: "btn-ghost text-xs",
                disabled: busy.value || pending.value.length > 0,
                onClick: ($event) => choose(t, "interrupt")
              }, toDisplayString(t.kind === "device" ? "MSI / 中断策略" : "关闭中断调节"), 9, _hoisted_11$1),
              t.kind === "nic" ? (openBlock(), createElementBlock("button", {
                key: 0,
                class: "btn-ghost text-xs",
                disabled: busy.value || pending.value.length > 0,
                onClick: ($event) => choose(t, "power")
              }, "关闭驱动节能选项", 8, _hoisted_12$1)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                _cache[2] || (_cache[2] = createBaseVNode("span", { class: "text-xs text-gray-500" }, "逻辑核", -1)),
                withDirectives(createBaseVNode("input", {
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => core.value = $event),
                  type: "number",
                  min: "0",
                  max: "63",
                  class: "w-16 rounded bg-gray-900 p-1 text-xs text-gray-300"
                }, null, 512), [
                  [
                    vModelText,
                    core.value,
                    void 0,
                    { number: true }
                  ]
                ]),
                createBaseVNode("button", {
                  class: "btn-ghost text-xs",
                  disabled: busy.value || pending.value.length > 0,
                  onClick: ($event) => choose(t, "bind")
                }, "绑定中断", 8, _hoisted_13$1)
              ], 64))
            ])
          ]);
        }), 128)),
        selected.value ? (openBlock(), createElementBlock("div", _hoisted_14$1, [
          createBaseVNode("p", null, "确认对 " + toDisplayString(selected.value.target.label) + " 应用 " + toDisplayString(selected.value.group === "bind" ? `中断核心 ${core.value}` : selected.value.group === "power" ? "驱动节能关闭" : "中断优化") + "？原值将保存在本机恢复记录中。中断策略可能影响设备兼容性，恢复也可能需要重启。", 1),
          createBaseVNode("div", _hoisted_15$1, [
            createBaseVNode("button", {
              class: "btn-ghost text-xs",
              disabled: busy.value,
              onClick: apply
            }, "备份并应用", 8, _hoisted_16$1),
            createBaseVNode("button", {
              class: "btn-ghost text-xs",
              disabled: busy.value,
              onClick: _cache[1] || (_cache[1] = ($event) => selected.value = null)
            }, "取消", 8, _hoisted_17$1)
          ])
        ])) : createCommentVNode("", true)
      ]);
    };
  }
});
const LowlevelTuningCard = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-b5050139"]]);
const _hoisted_1 = { class: "page guard-page" };
const _hoisted_2 = { class: "page-header" };
const _hoisted_3 = { class: "page-actions" };
const _hoisted_4 = ["disabled"];
const _hoisted_5 = { class: "glass-card rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl" };
const _hoisted_6 = { class: "flex flex-wrap items-center gap-x-8 gap-y-4" };
const _hoisted_7 = { class: "flex items-center gap-3" };
const _hoisted_8 = ["disabled", "aria-checked"];
const _hoisted_9 = { class: "flex items-center gap-3" };
const _hoisted_10 = { class: "font-mono text-xs text-gray-300 min-w-[54px]" };
const _hoisted_11 = { class: "flex items-center gap-4 ml-auto" };
const _hoisted_12 = { class: "status-chip neutral" };
const _hoisted_13 = { class: "text-gray-200" };
const _hoisted_14 = {
  key: 0,
  class: "mt-3 font-mono text-[10px] text-amber-400/80"
};
const _hoisted_15 = { class: "glass-card mt-6 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl" };
const _hoisted_16 = { class: "mb-3 flex items-center justify-between border-b border-white/10 pb-2" };
const _hoisted_17 = { class: "flex items-center gap-2" };
const _hoisted_18 = { class: "font-mono text-[10px] text-gray-500" };
const _hoisted_19 = ["disabled"];
const _hoisted_20 = ["disabled"];
const _hoisted_21 = {
  key: 0,
  class: "font-mono text-xs text-gray-500"
};
const _hoisted_22 = {
  key: 1,
  class: "font-mono text-xs text-gray-500"
};
const _hoisted_23 = {
  key: 2,
  class: "grid gap-1.5 md:grid-cols-2"
};
const _hoisted_24 = ["checked", "onChange", "disabled"];
const _hoisted_25 = { class: "min-w-0 flex-1 truncate font-mono text-xs text-gray-300" };
const _hoisted_26 = { class: "font-mono text-[10px] text-gray-500" };
const _hoisted_27 = { class: "glass-card mt-6 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl" };
const _hoisted_28 = { class: "mb-3 flex items-center justify-between border-b border-white/10 pb-2" };
const _hoisted_29 = { class: "font-mono text-[10px] text-gray-500 inline-flex items-center gap-1.5" };
const _hoisted_30 = {
  key: 0,
  class: "font-mono text-xs text-gray-500"
};
const _hoisted_31 = {
  key: 1,
  class: "flex flex-col gap-1.5"
};
const _hoisted_32 = { class: "min-w-0 flex-1" };
const _hoisted_33 = { class: "truncate font-mono text-xs text-red-300" };
const _hoisted_34 = {
  key: 0,
  class: "truncate font-mono text-[10px] text-gray-500"
};
const _hoisted_35 = ["onClick", "disabled"];
const _hoisted_36 = { class: "glass-card mt-6 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl" };
const _hoisted_37 = { class: "mb-3 flex items-center justify-between border-b border-white/10 pb-2" };
const _hoisted_38 = { class: "font-mono text-[10px] text-gray-500" };
const _hoisted_39 = {
  key: 0,
  class: "font-mono text-xs text-gray-500"
};
const _hoisted_40 = {
  key: 1,
  class: "flex max-h-72 flex-col gap-1 overflow-y-auto pr-1"
};
const _hoisted_41 = { class: "shrink-0 text-gray-600" };
const _hoisted_42 = {
  key: 0,
  class: "truncate text-gray-400"
};
const _hoisted_43 = {
  key: 1,
  class: "ml-auto shrink-0 text-gray-600"
};
const _hoisted_44 = { class: "glass-card mt-6 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl" };
const _hoisted_45 = { class: "flex items-center gap-3" };
const _hoisted_46 = ["disabled"];
const _hoisted_47 = {
  key: 0,
  class: "font-mono text-[10px] text-gray-600"
};
const _hoisted_48 = {
  key: 0,
  class: "mt-3 font-mono text-xs text-red-400"
};
const _hoisted_49 = { class: "mt-1 text-[11px] leading-relaxed text-gray-500" };
const _hoisted_50 = {
  key: 0,
  class: "mt-1 font-mono text-[10px] text-gray-600"
};
const _hoisted_51 = { class: "glass-card mt-6 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl" };
const _hoisted_52 = { class: "flex flex-wrap items-center gap-4" };
const _hoisted_53 = { class: "flex items-center gap-2" };
const _hoisted_54 = ["disabled"];
const _hoisted_55 = ["value"];
const _hoisted_56 = { class: "flex items-center gap-2" };
const _hoisted_57 = ["disabled"];
const _hoisted_58 = ["value"];
const _hoisted_59 = ["disabled"];
const _hoisted_60 = {
  key: 0,
  class: "font-mono text-[10px] text-amber-400/80"
};
const _hoisted_61 = {
  key: 0,
  class: "mt-3 font-mono text-xs text-red-400"
};
const _hoisted_62 = { class: "mt-4 flex flex-wrap items-center gap-3" };
const _hoisted_63 = { class: "font-mono text-sm text-gray-100" };
const _hoisted_64 = { class: "text-gray-50" };
const _hoisted_65 = { class: "font-mono text-[11px] text-gray-500" };
const _hoisted_66 = {
  key: 0,
  class: "font-mono text-[11px] text-gray-500"
};
const _hoisted_67 = {
  key: 1,
  class: "font-mono text-[10px] text-gray-600"
};
const _hoisted_68 = { class: "mt-3 grid grid-cols-6 gap-1.5 md:grid-cols-10" };
const _hoisted_69 = { class: "text-gray-600" };
const _hoisted_70 = { class: "glass-card mt-6 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl" };
const _hoisted_71 = { class: "flex items-center gap-3" };
const _hoisted_72 = ["disabled"];
const _hoisted_73 = {
  key: 0,
  class: "font-mono text-[10px] text-amber-400/80"
};
const _hoisted_74 = {
  key: 0,
  class: "mt-3 font-mono text-xs text-red-400"
};
const _hoisted_75 = { class: "mb-2 flex items-baseline gap-2 border-b border-white/5 pb-1" };
const _hoisted_76 = { class: "font-mono text-xs tracking-widest text-gray-300" };
const _hoisted_77 = { class: "font-mono text-[10px] text-gray-600" };
const _hoisted_78 = {
  key: 0,
  class: "font-mono text-[11px] text-gray-600"
};
const _hoisted_79 = {
  key: 1,
  class: "flex flex-col gap-1.5"
};
const _hoisted_80 = { class: "flex items-center gap-2" };
const _hoisted_81 = { class: "font-mono text-xs text-gray-300" };
const _hoisted_82 = {
  key: 0,
  class: "font-mono text-[10px] text-red-400"
};
const _hoisted_83 = {
  key: 0,
  class: "mt-0.5 text-[11px] leading-relaxed text-gray-500"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "GuardCenter",
  setup(__props) {
    const enabled = ref(false);
    const running = ref(false);
    const intervalSeconds = ref(30);
    const protectedCount = ref(0);
    const protectedItems = ref([]);
    const quarantined = ref([]);
    const events = ref([]);
    const candidates = ref([]);
    const selected = ref(/* @__PURE__ */ new Set());
    const busy = ref(false);
    const loaded = ref(false);
    const itemKey = (it) => `${it.file}::${it.category}::${it.name}`;
    function displayOf(key) {
      const parts = key.split("::");
      return parts.length === 3 ? parts[2] : key;
    }
    function metaOf(key) {
      const parts = key.split("::");
      return parts.length === 3 ? `${parts[0]} · ${parts[1]}` : "";
    }
    const KIND_META = {
      "guard-started": { label: "守护启动", cls: "text-sky-400" },
      "guard-detected": { label: "检测到重置", cls: "text-amber-400" },
      "guard-restored": { label: "已恢复", cls: "text-green-400" },
      "guard-skipped": { label: "已跳过", cls: "text-gray-500" },
      "guard-quarantined": { label: "熔断隔离", cls: "text-red-400" },
      "config-reloaded": { label: "配置重载", cls: "text-gray-400" },
      "guard-stopped": { label: "守护停止", cls: "text-gray-500" }
    };
    function kindMeta(kind) {
      return KIND_META[kind] || { label: kind, cls: "text-gray-400" };
    }
    async function loadAll() {
      busy.value = true;
      try {
        const [s, c, e] = await Promise.all([
          window.sysApi.guardStatus(),
          window.sysApi.guardCandidates(),
          window.sysApi.guardEvents(30)
        ]);
        if (s.success) {
          enabled.value = !!s.enabled;
          running.value = !!s.running;
          intervalSeconds.value = s.intervalSeconds ?? 30;
          protectedCount.value = s.protectedCount ?? 0;
          protectedItems.value = s.protectedItems ?? [];
          quarantined.value = s.quarantined ?? [];
        } else {
          ElMessage.error(s.error || "获取守护状态失败");
        }
        if (c.success) candidates.value = c.items ?? [];
        else ElMessage.error(c.error || "获取守护候选失败");
        if (e.success) events.value = e.events ?? [];
        else ElMessage.error(e.error || "获取巡检历史失败");
      } finally {
        busy.value = false;
        loaded.value = true;
      }
      const candKeys = new Set(candidates.value.map(itemKey));
      selected.value = new Set(protectedItems.value.map(itemKey).filter((k) => candKeys.has(k)));
    }
    async function refreshStatus() {
      const s = await window.sysApi.guardStatus();
      if (!s.success) return;
      enabled.value = !!s.enabled;
      running.value = !!s.running;
      intervalSeconds.value = s.intervalSeconds ?? intervalSeconds.value;
      protectedCount.value = s.protectedCount ?? protectedCount.value;
      protectedItems.value = s.protectedItems ?? protectedItems.value;
      quarantined.value = s.quarantined ?? quarantined.value;
    }
    async function toggleEnabled() {
      if (busy.value) return;
      busy.value = true;
      try {
        const target = !enabled.value;
        const r = await window.sysApi.guardSetEnabled(target, intervalSeconds.value);
        if (r.success) {
          enabled.value = target;
          ElMessage.success(target ? "守护已开启,巡检进程已启动" : "守护已停止,进程将在下轮巡检退出");
          setTimeout(refreshStatus, 1500);
        } else {
          ElMessage.error(r.error || "切换失败");
        }
      } finally {
        busy.value = false;
      }
    }
    async function onIntervalChange() {
      const r = await window.sysApi.guardSetEnabled(enabled.value, intervalSeconds.value);
      if (!r.success) ElMessage.error(r.error || "间隔保存失败");
    }
    function buildItems(next) {
      const candByKey = new Map(candidates.value.map((c) => [itemKey(c), c]));
      const out = protectedItems.value.filter((p) => !candByKey.has(itemKey(p)));
      for (const c of candidates.value) {
        if (next.has(itemKey(c))) out.push({ file: c.file, category: c.category, name: c.name });
      }
      return out;
    }
    async function saveItems(next) {
      busy.value = true;
      try {
        const items = buildItems(next);
        const r = await window.sysApi.guardSetItems(items);
        if (r.success) {
          selected.value = next;
          protectedCount.value = items.length;
          ElMessage.success(`已更新保护清单(${items.length} 项)`);
        } else {
          ElMessage.error(r.error || "保存清单失败");
        }
      } finally {
        busy.value = false;
      }
    }
    async function toggleItem(c) {
      if (busy.value) return;
      const next = new Set(selected.value);
      const k = itemKey(c);
      if (next.has(k)) next.delete(k);
      else next.add(k);
      await saveItems(next);
    }
    async function setAll(v) {
      if (busy.value) return;
      await saveItems(new Set(v ? candidates.value.map(itemKey) : []));
    }
    async function unquarantine(key) {
      if (busy.value) return;
      busy.value = true;
      try {
        const r = await window.sysApi.guardUnquarantine(key);
        if (r.success) {
          ElMessage.success("已解除隔离,后续巡检将重新评估该项");
          await refreshStatus();
        } else {
          ElMessage.error(r.error || "解除隔离失败");
        }
      } finally {
        busy.value = false;
      }
    }
    let pollTimer = null;
    onMounted(() => {
      loadAll();
      pollTimer = setInterval(refreshStatus, 1e4);
    });
    onUnmounted(() => {
      if (pollTimer) {
        clearInterval(pollTimer);
        pollTimer = null;
      }
    });
    const acBusy = ref(false);
    const acScanned = ref(false);
    const acInstalled = ref([]);
    const acRicochet = ref("");
    const acError = ref("");
    async function runAcScan() {
      if (acBusy.value) return;
      acBusy.value = true;
      acError.value = "";
      try {
        const r = await window.detectApi.scanAnticheat();
        if (r.success) {
          acInstalled.value = r.installed ?? [];
          acRicochet.value = r.ricochetNote ?? "";
          acScanned.value = true;
        } else {
          acError.value = "扫描失败，请稍后重试";
        }
      } catch (e) {
        acError.value = String(e?.message ?? e);
      } finally {
        acBusy.value = false;
      }
    }
    const DPC_WINDOWS = [500, 1e3, 2e3, 5e3, 1e4];
    const DPC_ROUNDS = [1, 2, 3, 5];
    const dpcWindowMs = ref(1e3);
    const dpcRounds = ref(1);
    const dpcBusy = ref(false);
    const dpcResult = ref(null);
    const dpcError = ref("");
    function dpcPct(rate) {
      return (rate * 100).toFixed(2) + "%";
    }
    function dpcTier(rate) {
      if (rate < 0.01) return 0;
      if (rate < 0.05) return 1;
      return 2;
    }
    function dpcBadgeText(rate) {
      return dpcTier(rate) === 0 ? "干净" : dpcTier(rate) === 1 ? "正常" : "异常";
    }
    function dpcBadgeCls(rate) {
      const t = dpcTier(rate);
      return t === 0 ? "ok" : t === 1 ? "warn" : "danger";
    }
    const dpcWorst = computed(() => {
      const cores = dpcResult.value?.cores ?? [];
      let worst = cores[0] ?? { index: -1, irqRate: 0 };
      for (const c of cores) if (c.irqRate > worst.irqRate) worst = c;
      return worst;
    });
    const dpcAvg = computed(() => {
      const cores = dpcResult.value?.cores ?? [];
      if (!cores.length) return 0;
      return cores.reduce((a, c) => a + c.irqRate, 0) / cores.length;
    });
    async function runDpcSample() {
      if (dpcBusy.value) return;
      dpcBusy.value = true;
      dpcError.value = "";
      try {
        const r = await window.detectApi.runDpcSample(dpcWindowMs.value, dpcRounds.value);
        if (r.success && Array.isArray(r.cores)) {
          dpcResult.value = r;
        } else {
          dpcError.value = r.error || "DPC 采样失败（系统不支持处理器性能接口）";
        }
      } catch (e) {
        dpcError.value = String(e?.message ?? e);
      } finally {
        dpcBusy.value = false;
      }
    }
    const auditBusy = ref(false);
    const auditReport = ref(null);
    const auditError = ref("");
    const AUDIT_SECTIONS = [
      { key: "capability", title: "能力" },
      { key: "machine", title: "机器状态" },
      { key: "persistent", title: "持久设置" },
      { key: "verdicts", title: "结论" }
    ];
    const EVIDENCE_META = {
      measured: { label: "实测", cls: "ok" },
      bench: { label: "台架", cls: "info" },
      mechanism: { label: "机制", cls: "neutral" },
      unverified: { label: "未验证", cls: "warn" }
    };
    function evidenceLabel(ev) {
      return EVIDENCE_META[ev]?.label ?? ev;
    }
    function evidenceCls(ev) {
      return EVIDENCE_META[ev]?.cls ?? "neutral";
    }
    async function runAudit() {
      if (auditBusy.value) return;
      auditBusy.value = true;
      auditError.value = "";
      try {
        const r = await window.detectApi.runAudit();
        if (r.success && r.report) {
          auditReport.value = r.report;
        } else {
          auditError.value = r.error || "审计失败，请稍后重试";
        }
      } catch (e) {
        auditError.value = String(e?.message ?? e);
      } finally {
        auditBusy.value = false;
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          _cache[5] || (_cache[5] = createStaticVNode('<div class="page-icon" data-v-141f0335><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="1.5" data-v-141f0335><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" data-v-141f0335></path><path d="M9 12l2 2 4-4" data-v-141f0335></path></svg></div><div class="page-title-block" data-v-141f0335><h2 class="page-title" data-v-141f0335>守护中心</h2><p class="page-desc" data-v-141f0335>优化项守护 · 防重置 · 巡检历史 · 连续失败熔断隔离 · 反作弊/DPC/系统审计检测</p></div>', 2)),
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("button", {
              class: "btn-ghost",
              onClick: loadAll,
              disabled: busy.value
            }, toDisplayString(busy.value ? "加载中…" : "刷新"), 9, _hoisted_4)
          ])
        ]),
        createBaseVNode("div", _hoisted_5, [
          createBaseVNode("div", _hoisted_6, [
            createBaseVNode("div", _hoisted_7, [
              _cache[7] || (_cache[7] = createBaseVNode("span", { class: "font-mono text-xs tracking-widest text-gray-400" }, "守护开关", -1)),
              createBaseVNode("button", {
                class: normalizeClass(["switch", { on: enabled.value }]),
                onClick: toggleEnabled,
                disabled: busy.value,
                role: "switch",
                "aria-checked": enabled.value
              }, [..._cache[6] || (_cache[6] = [
                createBaseVNode("span", { class: "switch-knob" }, null, -1)
              ])], 10, _hoisted_8),
              createBaseVNode("span", {
                class: normalizeClass(["font-mono text-xs", enabled.value ? "text-green-400" : "text-gray-500"])
              }, toDisplayString(enabled.value ? "已开启" : "已关闭"), 3)
            ]),
            createBaseVNode("div", _hoisted_9, [
              _cache[8] || (_cache[8] = createBaseVNode("span", { class: "font-mono text-xs tracking-widest text-gray-400" }, "巡检间隔", -1)),
              withDirectives(createBaseVNode("input", {
                class: "slider",
                type: "range",
                min: "10",
                max: "600",
                step: "10",
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => intervalSeconds.value = $event),
                onChange: onIntervalChange
              }, null, 544), [
                [
                  vModelText,
                  intervalSeconds.value,
                  void 0,
                  { number: true }
                ]
              ]),
              createBaseVNode("span", _hoisted_10, toDisplayString(intervalSeconds.value) + " 秒", 1)
            ]),
            createBaseVNode("div", _hoisted_11, [
              createBaseVNode("span", {
                class: normalizeClass(["status-chip", running.value ? "ok" : enabled.value ? "warn" : "idle"])
              }, [
                createVNode(StatusDot, {
                  status: running.value ? "running" : enabled.value ? "warn" : "idle",
                  size: 6,
                  label: running.value ? "守护进程运行中" : enabled.value ? "已开启但进程未运行" : "守护已停止"
                }, null, 8, ["status", "label"])
              ], 2),
              createBaseVNode("span", _hoisted_12, [
                _cache[9] || (_cache[9] = createTextVNode("受保护 ", -1)),
                createBaseVNode("b", _hoisted_13, toDisplayString(protectedCount.value), 1),
                _cache[10] || (_cache[10] = createTextVNode(" 项", -1))
              ])
            ])
          ]),
          enabled.value && !running.value ? (openBlock(), createElementBlock("div", _hoisted_14, " ⚠ 守护进程未运行(可能异常退出) — 关闭再开启开关可重新拉起 ")) : createCommentVNode("", true)
        ]),
        createBaseVNode("div", _hoisted_15, [
          createBaseVNode("div", _hoisted_16, [
            _cache[11] || (_cache[11] = createBaseVNode("span", { class: "font-mono text-xs tracking-widest text-gray-400" }, "守护清单", -1)),
            createBaseVNode("div", _hoisted_17, [
              createBaseVNode("span", _hoisted_18, toDisplayString(candidates.value.length) + " 个候选(已应用且可守护) · 已选 " + toDisplayString(selected.value.size), 1),
              createBaseVNode("button", {
                class: "btn-ghost text-xs",
                onClick: _cache[1] || (_cache[1] = ($event) => setAll(true)),
                disabled: busy.value || !candidates.value.length
              }, "全部保护", 8, _hoisted_19),
              createBaseVNode("button", {
                class: "btn-ghost text-xs",
                onClick: _cache[2] || (_cache[2] = ($event) => setAll(false)),
                disabled: busy.value || !selected.value.size
              }, "清空", 8, _hoisted_20)
            ])
          ]),
          !loaded.value ? (openBlock(), createElementBlock("div", _hoisted_21, "候选扫描中(注册表状态检测)…")) : candidates.value.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_22, " 暂无可守护项 — 先到「系统深度优化」应用低风险(≤2 级)且可逆的优化项,已应用的项会自动出现在这里 ")) : (openBlock(), createElementBlock("div", _hoisted_23, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(candidates.value, (c) => {
              return openBlock(), createElementBlock("label", {
                key: itemKey(c),
                class: normalizeClass(["flex cursor-pointer items-center gap-2.5 rounded-lg border border-white/5 bg-black/20 px-3 py-2 transition-colors hover:border-white/15", { "selected-row": selected.value.has(itemKey(c)) }])
              }, [
                createBaseVNode("input", {
                  type: "checkbox",
                  class: "check",
                  checked: selected.value.has(itemKey(c)),
                  onChange: ($event) => toggleItem(c),
                  disabled: busy.value
                }, null, 40, _hoisted_24),
                createBaseVNode("span", _hoisted_25, toDisplayString(c.name), 1),
                createBaseVNode("span", _hoisted_26, toDisplayString(c.category), 1),
                createBaseVNode("span", {
                  class: normalizeClass(["font-mono text-[10px]", c.level <= 1 ? "text-green-400/80" : "text-amber-400/80"])
                }, "Lv." + toDisplayString(c.level), 3)
              ], 2);
            }), 128))
          ]))
        ]),
        createBaseVNode("div", _hoisted_27, [
          createBaseVNode("div", _hoisted_28, [
            _cache[12] || (_cache[12] = createBaseVNode("span", { class: "font-mono text-xs tracking-widest text-gray-400" }, "熔断隔离", -1)),
            createBaseVNode("span", _hoisted_29, [
              quarantined.value.length ? (openBlock(), createBlock(StatusDot, {
                key: 0,
                status: "warn",
                size: 8
              })) : createCommentVNode("", true),
              createTextVNode(" " + toDisplayString(quarantined.value.length) + " 项 ", 1)
            ])
          ]),
          quarantined.value.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_30, "无隔离项 — 连续恢复失败 3 次的项会自动隔离,避免反复尝试")) : (openBlock(), createElementBlock("div", _hoisted_31, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(quarantined.value, (key) => {
              return openBlock(), createElementBlock("div", {
                key,
                class: "flex items-center gap-2.5 rounded-lg border border-red-500/15 bg-red-500/5 px-3 py-2"
              }, [
                createBaseVNode("div", _hoisted_32, [
                  createBaseVNode("div", _hoisted_33, toDisplayString(displayOf(key)), 1),
                  metaOf(key) ? (openBlock(), createElementBlock("div", _hoisted_34, toDisplayString(metaOf(key)), 1)) : createCommentVNode("", true)
                ]),
                createBaseVNode("button", {
                  class: "btn-danger text-xs",
                  onClick: ($event) => unquarantine(key),
                  disabled: busy.value
                }, "解除隔离", 8, _hoisted_35)
              ]);
            }), 128))
          ]))
        ]),
        createBaseVNode("div", _hoisted_36, [
          createBaseVNode("div", _hoisted_37, [
            _cache[13] || (_cache[13] = createBaseVNode("span", { class: "font-mono text-xs tracking-widest text-gray-400" }, "恢复历史", -1)),
            createBaseVNode("span", _hoisted_38, "最近 " + toDisplayString(events.value.length) + " 条", 1)
          ]),
          events.value.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_39, "暂无巡检事件(开启守护后每轮巡检会记录)")) : (openBlock(), createElementBlock("div", _hoisted_40, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(events.value, (ev, i) => {
              return openBlock(), createElementBlock("div", {
                key: i,
                class: "flex items-baseline gap-2.5 rounded px-1.5 py-1 font-mono text-[11px] hover:bg-white/5"
              }, [
                createBaseVNode("span", _hoisted_41, toDisplayString(new Date(ev.ts).toLocaleString()), 1),
                createBaseVNode("span", {
                  class: normalizeClass(["shrink-0", kindMeta(ev.kind).cls])
                }, toDisplayString(kindMeta(ev.kind).label), 3),
                ev.item ? (openBlock(), createElementBlock("span", _hoisted_42, toDisplayString(displayOf(ev.item)), 1)) : createCommentVNode("", true),
                ev.detail ? (openBlock(), createElementBlock("span", _hoisted_43, toDisplayString(ev.detail), 1)) : createCommentVNode("", true)
              ]);
            }), 128))
          ]))
        ]),
        createBaseVNode("div", _hoisted_44, [
          _cache[14] || (_cache[14] = createBaseVNode("div", { class: "mb-3 flex items-center justify-between border-b border-white/10 pb-2" }, [
            createBaseVNode("span", { class: "font-mono text-xs tracking-widest text-gray-400" }, "反作弊驱动检测"),
            createBaseVNode("span", { class: "font-mono text-[10px] text-gray-500" }, "服务键探测 · 只报告不干预")
          ], -1)),
          createBaseVNode("div", _hoisted_45, [
            createBaseVNode("button", {
              class: "btn-ghost text-xs",
              onClick: runAcScan,
              disabled: acBusy.value
            }, toDisplayString(acBusy.value ? "扫描中…" : "扫描"), 9, _hoisted_46),
            acScanned.value ? (openBlock(), createElementBlock("span", _hoisted_47, "结果按进程生命周期缓存，重启应用后重新检测")) : createCommentVNode("", true)
          ]),
          acError.value ? (openBlock(), createElementBlock("div", _hoisted_48, toDisplayString(acError.value), 1)) : acScanned.value ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            createBaseVNode("div", {
              class: normalizeClass(["mt-3 font-mono text-sm", acInstalled.value.length ? "text-amber-300" : "text-green-400"])
            }, toDisplayString(acInstalled.value.length ? "检测到：" + acInstalled.value.join("、") : "未检测到常见反作弊驱动"), 3),
            createBaseVNode("div", _hoisted_49, toDisplayString(acInstalled.value.length ? "属游戏反作弊正常组件，本工具不会干预" : "未发现常见内核态反作弊服务（Vanguard / Easy Anti-Cheat / BattlEye / ACE-Guard / nProtect / FACEIT）"), 1),
            acRicochet.value ? (openBlock(), createElementBlock("div", _hoisted_50, toDisplayString(acRicochet.value), 1)) : createCommentVNode("", true)
          ], 64)) : createCommentVNode("", true)
        ]),
        createBaseVNode("div", _hoisted_51, [
          _cache[20] || (_cache[20] = createBaseVNode("div", { class: "mb-3 flex items-center justify-between border-b border-white/10 pb-2" }, [
            createBaseVNode("span", { class: "font-mono text-xs tracking-widest text-gray-400" }, "DPC / ISR 占用采样"),
            createBaseVNode("span", { class: "font-mono text-[10px] text-gray-500" }, "每核 DPC+中断占用 · 只读")
          ], -1)),
          createBaseVNode("div", _hoisted_52, [
            createBaseVNode("label", _hoisted_53, [
              _cache[15] || (_cache[15] = createBaseVNode("span", { class: "font-mono text-xs text-gray-400" }, "窗口", -1)),
              withDirectives(createBaseVNode("select", {
                class: "select",
                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => dpcWindowMs.value = $event),
                disabled: dpcBusy.value
              }, [
                (openBlock(), createElementBlock(Fragment, null, renderList(DPC_WINDOWS, (o) => {
                  return createBaseVNode("option", {
                    key: o,
                    value: o
                  }, toDisplayString(o >= 1e3 ? o / 1e3 + " 秒" : o + " ms"), 9, _hoisted_55);
                }), 64))
              ], 8, _hoisted_54), [
                [
                  vModelSelect,
                  dpcWindowMs.value,
                  void 0,
                  { number: true }
                ]
              ])
            ]),
            createBaseVNode("label", _hoisted_56, [
              _cache[16] || (_cache[16] = createBaseVNode("span", { class: "font-mono text-xs text-gray-400" }, "次数", -1)),
              withDirectives(createBaseVNode("select", {
                class: "select",
                "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => dpcRounds.value = $event),
                disabled: dpcBusy.value
              }, [
                (openBlock(), createElementBlock(Fragment, null, renderList(DPC_ROUNDS, (o) => {
                  return createBaseVNode("option", {
                    key: o,
                    value: o
                  }, toDisplayString(o), 9, _hoisted_58);
                }), 64))
              ], 8, _hoisted_57), [
                [
                  vModelSelect,
                  dpcRounds.value,
                  void 0,
                  { number: true }
                ]
              ])
            ]),
            createBaseVNode("button", {
              class: "btn-ghost text-xs",
              onClick: runDpcSample,
              disabled: dpcBusy.value
            }, toDisplayString(dpcBusy.value ? "采样中…" : "开始采样"), 9, _hoisted_59),
            dpcBusy.value ? (openBlock(), createElementBlock("span", _hoisted_60, "最长约 " + toDisplayString(Math.min(50, dpcWindowMs.value * dpcRounds.value / 1e3)) + " 秒，请稍候…", 1)) : createCommentVNode("", true)
          ]),
          dpcError.value ? (openBlock(), createElementBlock("div", _hoisted_61, toDisplayString(dpcError.value), 1)) : dpcResult.value ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            createBaseVNode("div", _hoisted_62, [
              createBaseVNode("div", _hoisted_63, [
                _cache[17] || (_cache[17] = createTextVNode(" 最脏核 ", -1)),
                createBaseVNode("b", _hoisted_64, toDisplayString(dpcWorst.value.index), 1),
                _cache[18] || (_cache[18] = createBaseVNode("span", { class: "mx-1 text-gray-500" }, "·", -1)),
                createTextVNode(toDisplayString(dpcPct(dpcWorst.value.irqRate)) + " ", 1),
                createBaseVNode("span", {
                  class: normalizeClass(["ml-2 badge", dpcBadgeCls(dpcWorst.value.irqRate)])
                }, toDisplayString(dpcBadgeText(dpcWorst.value.irqRate)), 3)
              ]),
              createBaseVNode("span", _hoisted_65, "平均 " + toDisplayString(dpcPct(dpcAvg.value)), 1),
              typeof dpcResult.value.cpuBusy === "number" ? (openBlock(), createElementBlock("span", _hoisted_66, "整机 CPU 占用 " + toDisplayString(dpcPct(dpcResult.value.cpuBusy)), 1)) : createCommentVNode("", true),
              typeof dpcResult.value.elapsedMs === "number" ? (openBlock(), createElementBlock("span", _hoisted_67, "窗口 " + toDisplayString(Math.round(dpcResult.value.elapsedMs)) + " ms", 1)) : createCommentVNode("", true)
            ]),
            createBaseVNode("div", _hoisted_68, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(dpcResult.value.cores, (c) => {
                return openBlock(), createElementBlock("div", {
                  key: c.index,
                  class: normalizeClass(["rounded-lg border px-2 py-1.5 text-center font-mono text-[10px]", c.index === dpcWorst.value.index ? "border-red-500/30 bg-red-500/10 text-red-300" : "border-white/5 bg-black/20 text-gray-400"])
                }, [
                  createBaseVNode("div", _hoisted_69, "核" + toDisplayString(c.index), 1),
                  createBaseVNode("div", null, toDisplayString(dpcPct(c.irqRate)), 1)
                ], 2);
              }), 128))
            ]),
            _cache[19] || (_cache[19] = createBaseVNode("div", { class: "mt-3 font-mono text-[10px] text-gray-600" }, " 量级判定：<1% 干净 / <5% 正常 / ≥5% 异常；短窗口只能看出量级，需要精确值建议 5-10 秒 × 多轮 ", -1))
          ], 64)) : createCommentVNode("", true)
        ]),
        createVNode(NativeLatencyCard),
        createVNode(LowlevelTuningCard),
        createBaseVNode("div", _hoisted_70, [
          _cache[22] || (_cache[22] = createBaseVNode("div", { class: "mb-3 flex items-center justify-between border-b border-white/10 pb-2" }, [
            createBaseVNode("span", { class: "font-mono text-xs tracking-widest text-gray-400" }, "系统审计"),
            createBaseVNode("span", { class: "font-mono text-[10px] text-gray-500" }, "四段报告 · 证据分级 · 只读")
          ], -1)),
          createBaseVNode("div", _hoisted_71, [
            createBaseVNode("button", {
              class: "btn-ghost text-xs",
              onClick: runAudit,
              disabled: auditBusy.value
            }, toDisplayString(auditBusy.value ? "审计中…" : "一键审计"), 9, _hoisted_72),
            auditBusy.value ? (openBlock(), createElementBlock("span", _hoisted_73, "正在采集系统状态（DPC/降频/ReBAR/B1 开关），约数秒…")) : createCommentVNode("", true)
          ]),
          auditError.value ? (openBlock(), createElementBlock("div", _hoisted_74, toDisplayString(auditError.value), 1)) : auditReport.value ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            (openBlock(), createElementBlock(Fragment, null, renderList(AUDIT_SECTIONS, (sec) => {
              return createBaseVNode("div", {
                key: sec.key,
                class: "mt-4"
              }, [
                createBaseVNode("div", _hoisted_75, [
                  createBaseVNode("span", _hoisted_76, toDisplayString(sec.title), 1),
                  createBaseVNode("span", _hoisted_77, toDisplayString(auditReport.value[sec.key].length) + " 项", 1)
                ]),
                auditReport.value[sec.key].length === 0 ? (openBlock(), createElementBlock("div", _hoisted_78, "无数据（查询不可用）")) : (openBlock(), createElementBlock("div", _hoisted_79, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(auditReport.value[sec.key], (row, i) => {
                    return openBlock(), createElementBlock("div", {
                      key: i,
                      class: normalizeClass(["rounded-lg border px-3 py-2", row.warn ? "border-red-500/20 bg-red-500/5" : "border-white/5 bg-black/20"])
                    }, [
                      createBaseVNode("div", _hoisted_80, [
                        createBaseVNode("span", _hoisted_81, toDisplayString(row.label), 1),
                        createBaseVNode("span", {
                          class: normalizeClass(["badge", evidenceCls(row.evidence)])
                        }, toDisplayString(evidenceLabel(row.evidence)), 3),
                        row.warn ? (openBlock(), createElementBlock("span", _hoisted_82, "需关注")) : createCommentVNode("", true)
                      ]),
                      createBaseVNode("div", {
                        class: normalizeClass(["mt-0.5 font-mono text-sm", row.warn ? "text-red-200" : "text-gray-100"])
                      }, toDisplayString(row.value), 3),
                      row.note ? (openBlock(), createElementBlock("div", _hoisted_83, toDisplayString(row.note), 1)) : createCommentVNode("", true)
                    ], 2);
                  }), 128))
                ]))
              ]);
            }), 64)),
            _cache[21] || (_cache[21] = createBaseVNode("div", { class: "mt-3 font-mono text-[10px] text-gray-600" }, " 证据分级：实测=本机测得 / 台架=实验室台架数据 / 机制=系统机制明确 / 未验证=收益因机而异 ", -1))
          ], 64)) : createCommentVNode("", true)
        ])
      ]);
    };
  }
});
const GuardCenter = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-141f0335"]]);
export {
  GuardCenter as default
};
