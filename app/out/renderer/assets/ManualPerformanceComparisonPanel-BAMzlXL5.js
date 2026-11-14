import { t as defineComponent, D as inject, aD as watch, a1 as onMounted, a3 as onUnmounted, a5 as openBlock, l as createElementBlock, i as createBaseVNode, ak as toDisplayString, k as createCommentVNode, q as createTextVNode, aG as withDirectives, aA as vModelText, az as vModelSelect, F as Fragment, ab as renderList, a7 as reactive, a9 as ref, g as computed, _ as _export_sfc } from "./main-DAqTdO6U.js";
const _hoisted_1 = { class: "performance-page embedded-tool" };
const _hoisted_2 = {
  key: 0,
  role: "alert",
  class: "message error"
};
const _hoisted_3 = {
  key: 1,
  role: "status",
  class: "message"
};
const _hoisted_4 = { class: "panel" };
const _hoisted_5 = ["disabled"];
const _hoisted_6 = { class: "form-grid" };
const _hoisted_7 = { class: "actions" };
const _hoisted_8 = ["disabled"];
const _hoisted_9 = ["disabled"];
const _hoisted_10 = ["disabled"];
const _hoisted_11 = {
  key: 0,
  class: "capture-state"
};
const _hoisted_12 = { key: 0 };
const _hoisted_13 = { class: "panel" };
const _hoisted_14 = { class: "compare-controls" };
const _hoisted_15 = ["disabled"];
const _hoisted_16 = ["value"];
const _hoisted_17 = ["disabled"];
const _hoisted_18 = ["value"];
const _hoisted_19 = ["disabled"];
const _hoisted_20 = {
  key: 0,
  class: "comparison"
};
const _hoisted_21 = { class: "actions" };
const _hoisted_22 = ["disabled"];
const _hoisted_23 = { class: "metrics" };
const _hoisted_24 = { class: "panel" };
const _hoisted_25 = ["disabled"];
const _hoisted_26 = {
  key: 0,
  class: "empty"
};
const _hoisted_27 = { class: "record-title" };
const _hoisted_28 = { class: "phase" };
const _hoisted_29 = { class: "muted" };
const _hoisted_30 = { class: "conditions" };
const _hoisted_31 = { class: "metrics" };
const _hoisted_32 = { class: "muted" };
const _hoisted_33 = { class: "actions" };
const _hoisted_34 = ["disabled", "onClick"];
const _hoisted_35 = ["disabled", "onClick"];
const _hoisted_36 = ["disabled", "onClick"];
const _hoisted_37 = ["disabled"];
const _hoisted_38 = ["disabled", "onClick"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ManualPerformanceComparisonPanel",
  setup(__props) {
    const api = window.performanceApi;
    const sectionActive = inject("embeddedSectionActive", ref(true));
    const input = reactive({ game: "", process: "", conditions: "", phase: "before" });
    const records = ref([]), state = ref({ active: false, elapsedSeconds: 0, frameCount: 0, issues: [] });
    const busy = ref(false), error = ref(""), notice = ref(""), before = ref(""), after = ref(""), comparison = ref(null);
    const pendingDelete = ref("");
    const befores = computed(() => records.value.filter((r) => r.phase === "before")), afters = computed(() => records.value.filter((r) => r.phase === "after"));
    let timer = null, disposed = false, polling = false;
    const fmt = (value, digits = 1) => Number.isFinite(value) ? value.toFixed(digits) : "—";
    const sign = (value) => `${value > 0 ? "+" : ""}${fmt(value)}`;
    async function load() {
      records.value = await api.list();
    }
    async function refresh() {
      if (polling || disposed || !sectionActive.value) return;
      polling = true;
      try {
        const next = await api.status();
        if (next.lastSavedId !== state.value.lastSavedId) {
          await load();
          if (next.lastSavedId) notice.value = "测试已保存，可在下方选择对比";
        }
        state.value = next;
      } catch (e) {
        error.value = e.message;
      } finally {
        polling = false;
      }
    }
    async function run(action) {
      if (busy.value) return;
      busy.value = true;
      error.value = "";
      notice.value = "";
      try {
        await action();
      } catch (e) {
        error.value = e.message || "操作失败";
      } finally {
        busy.value = false;
      }
    }
    function start() {
      void run(async () => {
        state.value = await api.start({ ...input });
        notice.value = "采集中，请切换到游戏并重复相同测试路线；180 秒自动结束保存。";
      });
    }
    function stop() {
      void run(async () => {
        const record = await api.stop();
        await load();
        state.value = await api.status();
        notice.value = record.issues.length ? "已保存，但记录存在限制，不能生成提升结论" : "已保存真实逐帧记录";
      });
    }
    function cancel() {
      void run(async () => {
        await api.cancel();
        state.value = await api.status();
        notice.value = "已取消，本次未保存的帧已丢弃";
      });
    }
    function compare() {
      comparison.value = null;
      void run(async () => {
        comparison.value = await api.compare(before.value, after.value);
      });
    }
    watch([before, after], () => {
      comparison.value = null;
    });
    function exportComparison() {
      const selected = comparison.value;
      if (!selected) return;
      void run(async () => {
        const result = await api.exportComparison(selected.before.id, selected.after.id);
        notice.value = result.canceled ? "已取消导出" : `客户报告已保存到 ${result.path}，可离线查看或用浏览器打印为 PDF`;
      });
    }
    function remove(id) {
      void run(async () => {
        await api.remove(id);
        pendingDelete.value = "";
        comparison.value = null;
        if (before.value === id) before.value = "";
        if (after.value === id) after.value = "";
        await load();
        notice.value = "记录已删除";
      });
    }
    function exportRecord(id) {
      void run(async () => {
        const result = await api.exportRecord(id);
        notice.value = result.canceled ? "已取消导出" : `已导出到 ${result.path}`;
      });
    }
    function reuse(record) {
      Object.assign(input, {
        game: record.game,
        process: record.process,
        conditions: record.conditions,
        phase: "after"
      });
      notice.value = "已复制相同条件，请完成优化后按相同路线采集";
    }
    async function poll() {
      timer = null;
      if (disposed || document.hidden || !sectionActive.value) return;
      await refresh();
      if (!disposed && !document.hidden && sectionActive.value && !timer) timer = setTimeout(poll, 1e3);
    }
    function visibility() {
      if (timer) clearTimeout(timer);
      timer = null;
      if (!document.hidden && sectionActive.value) void poll();
    }
    watch(sectionActive, visibility);
    onMounted(() => {
      void run(async () => {
        await load();
        await refresh();
      });
      document.addEventListener("visibilitychange", visibility);
      timer = setTimeout(poll, 1e3);
    });
    onUnmounted(() => {
      disposed = true;
      if (timer) clearTimeout(timer);
      document.removeEventListener("visibilitychange", visibility);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        _cache[33] || (_cache[33] = createBaseVNode("p", { class: "muted" }, "用同一游戏、画质和测试路线记录真实帧间隔，观察当前优化方案的效果。", -1)),
        error.value ? (openBlock(), createElementBlock("div", _hoisted_2, toDisplayString(error.value), 1)) : createCommentVNode("", true),
        notice.value ? (openBlock(), createElementBlock("div", _hoisted_3, toDisplayString(notice.value), 1)) : createCommentVNode("", true),
        createBaseVNode("section", _hoisted_4, [
          _cache[14] || (_cache[14] = createBaseVNode("h2", null, "记录一次测试", -1)),
          _cache[15] || (_cache[15] = createBaseVNode("p", { class: "muted" }, " 先启动游戏，填写任务管理器中的进程名。固定分辨率、画质、帧率限制、地图与路线；避免菜单、加载和切换场景。记录上限为 180 秒 / 120000 帧，最多保存 20 条。 ", -1)),
          createBaseVNode("fieldset", {
            disabled: busy.value || state.value.active
          }, [
            createBaseVNode("div", _hoisted_6, [
              createBaseVNode("label", null, [
                _cache[8] || (_cache[8] = createTextVNode("游戏名称", -1)),
                withDirectives(createBaseVNode("input", {
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => input.game = $event),
                  maxlength: "80",
                  placeholder: "例如：无畏契约"
                }, null, 512), [
                  [vModelText, input.game]
                ])
              ]),
              createBaseVNode("label", null, [
                _cache[9] || (_cache[9] = createTextVNode("游戏进程", -1)),
                withDirectives(createBaseVNode("input", {
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => input.process = $event),
                  maxlength: "124",
                  placeholder: "例如：game.exe"
                }, null, 512), [
                  [vModelText, input.process]
                ])
              ]),
              createBaseVNode("label", null, [
                _cache[11] || (_cache[11] = createTextVNode("记录阶段", -1)),
                withDirectives(createBaseVNode("select", {
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => input.phase = $event)
                }, [..._cache[10] || (_cache[10] = [
                  createBaseVNode("option", { value: "before" }, "优化前", -1),
                  createBaseVNode("option", { value: "after" }, "优化后", -1)
                ])], 512), [
                  [vModelSelect, input.phase]
                ])
              ])
            ]),
            createBaseVNode("label", null, [
              _cache[12] || (_cache[12] = createTextVNode("测试条件", -1)),
              withDirectives(createBaseVNode("textarea", {
                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => input.conditions = $event),
                maxlength: "500",
                rows: "2",
                placeholder: "例如：1920×1080，高画质，关闭帧率上限，训练场同一路线 60 秒"
              }, null, 512), [
                [vModelText, input.conditions]
              ])
            ])
          ], 8, _hoisted_5),
          createBaseVNode("div", _hoisted_7, [
            !state.value.active ? (openBlock(), createElementBlock("button", {
              key: 0,
              disabled: busy.value,
              onClick: start
            }, toDisplayString(busy.value ? "处理中…" : "开始采集"), 9, _hoisted_8)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              createBaseVNode("button", {
                disabled: busy.value,
                onClick: stop
              }, "结束并保存", 8, _hoisted_9),
              createBaseVNode("button", {
                class: "secondary",
                disabled: busy.value,
                onClick: cancel
              }, " 取消本次采集 ", 8, _hoisted_10)
            ], 64))
          ]),
          state.value.active ? (openBlock(), createElementBlock("div", _hoisted_11, [
            createBaseVNode("b", null, "● " + toDisplayString(state.value.input?.game) + " · " + toDisplayString(state.value.input?.process), 1),
            createBaseVNode("span", null, toDisplayString(fmt(state.value.elapsedSeconds, 0)) + " 秒 / " + toDisplayString(state.value.frameCount) + " 帧", 1),
            !state.value.frameCount ? (openBlock(), createElementBlock("p", _hoisted_12, " 等待游戏帧。若一直为 0，请检查进程名、游戏是否正在渲染及采集权限。 ")) : createCommentVNode("", true),
            _cache[13] || (_cache[13] = createBaseVNode("p", null, "切换页面或隐藏窗口后采集仍会继续；180 秒自动保存。至少 20 秒和 300 帧才可对比。", -1)),
            (openBlock(true), createElementBlock(Fragment, null, renderList(state.value.issues, (issue) => {
              return openBlock(), createElementBlock("p", {
                key: issue,
                class: "warning"
              }, toDisplayString(issue), 1);
            }), 128))
          ])) : createCommentVNode("", true)
        ]),
        createBaseVNode("section", _hoisted_13, [
          _cache[26] || (_cache[26] = createBaseVNode("h2", null, "对比记录", -1)),
          _cache[27] || (_cache[27] = createBaseVNode("p", { class: "muted" }, " 平均 FPS = 帧数 ÷ 有效帧间隔总时长；1% Low = 最慢 1% 帧的平均间隔倒数。P50/P95/P99 描述帧间隔分布，方差越小表示间隔越稳定。 ", -1)),
          createBaseVNode("div", _hoisted_14, [
            createBaseVNode("label", null, [
              _cache[17] || (_cache[17] = createTextVNode("优化前", -1)),
              withDirectives(createBaseVNode("select", {
                "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => before.value = $event),
                disabled: busy.value
              }, [
                _cache[16] || (_cache[16] = createBaseVNode("option", { value: "" }, "选择记录", -1)),
                (openBlock(true), createElementBlock(Fragment, null, renderList(befores.value, (r) => {
                  return openBlock(), createElementBlock("option", {
                    key: r.id,
                    value: r.id
                  }, toDisplayString(r.game) + " · " + toDisplayString(new Date(r.createdAt).toLocaleString()), 9, _hoisted_16);
                }), 128))
              ], 8, _hoisted_15), [
                [vModelSelect, before.value]
              ])
            ]),
            createBaseVNode("label", null, [
              _cache[19] || (_cache[19] = createTextVNode("优化后", -1)),
              withDirectives(createBaseVNode("select", {
                "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => after.value = $event),
                disabled: busy.value
              }, [
                _cache[18] || (_cache[18] = createBaseVNode("option", { value: "" }, "选择记录", -1)),
                (openBlock(true), createElementBlock(Fragment, null, renderList(afters.value, (r) => {
                  return openBlock(), createElementBlock("option", {
                    key: r.id,
                    value: r.id
                  }, toDisplayString(r.game) + " · " + toDisplayString(new Date(r.createdAt).toLocaleString()), 9, _hoisted_18);
                }), 128))
              ], 8, _hoisted_17), [
                [vModelSelect, after.value]
              ])
            ]),
            createBaseVNode("button", {
              disabled: busy.value || !before.value || !after.value,
              onClick: compare
            }, "生成对比", 8, _hoisted_19)
          ]),
          comparison.value ? (openBlock(), createElementBlock("div", _hoisted_20, [
            createBaseVNode("h3", null, toDisplayString(comparison.value.before.game) + " · 实测变化", 1),
            createBaseVNode("div", _hoisted_21, [
              createBaseVNode("button", {
                disabled: busy.value,
                onClick: exportComparison
              }, "导出客户报告", 8, _hoisted_22),
              _cache[20] || (_cache[20] = createBaseVNode("span", { class: "muted" }, "含实测指标、帧间隔曲线与测试条件 · 离线 HTML", -1))
            ]),
            createBaseVNode("div", _hoisted_23, [
              createBaseVNode("div", null, [
                _cache[21] || (_cache[21] = createBaseVNode("span", null, "平均 FPS", -1)),
                createBaseVNode("strong", null, toDisplayString(sign(comparison.value.averageFpsChangePercent)) + "%", 1),
                createBaseVNode("small", null, toDisplayString(fmt(comparison.value.before.metrics.averageFps)) + " → " + toDisplayString(fmt(comparison.value.after.metrics.averageFps)), 1)
              ]),
              createBaseVNode("div", null, [
                _cache[22] || (_cache[22] = createBaseVNode("span", null, "1% Low", -1)),
                createBaseVNode("strong", null, toDisplayString(sign(comparison.value.low1ChangePercent)) + "%", 1),
                createBaseVNode("small", null, toDisplayString(fmt(comparison.value.before.metrics.low1Percent)) + " → " + toDisplayString(fmt(comparison.value.after.metrics.low1Percent)), 1)
              ]),
              createBaseVNode("div", null, [
                _cache[23] || (_cache[23] = createBaseVNode("span", null, "帧间隔方差变化", -1)),
                createBaseVNode("strong", null, toDisplayString(sign(comparison.value.varianceChangeMs2)) + " ms²", 1),
                _cache[24] || (_cache[24] = createBaseVNode("small", null, "负值表示波动减小", -1))
              ])
            ]),
            _cache[25] || (_cache[25] = createBaseVNode("p", { class: "muted" }, " 两次测量的差异不能单独证明某项优化导致变化。温度、后台负载和测试路线仍可能影响结果；建议重复测试。 ", -1))
          ])) : createCommentVNode("", true)
        ]),
        createBaseVNode("section", _hoisted_24, [
          createBaseVNode("h2", null, [
            _cache[28] || (_cache[28] = createTextVNode(" 已保存记录 ", -1)),
            createBaseVNode("small", null, toDisplayString(records.value.length) + " / 20", 1),
            createBaseVNode("button", {
              class: "secondary reload",
              disabled: busy.value,
              onClick: _cache[6] || (_cache[6] = ($event) => run(load))
            }, "刷新", 8, _hoisted_25)
          ]),
          !records.value.length ? (openBlock(), createElementBlock("div", _hoisted_26, " 尚无测试记录。先采集“优化前”，应用需要验证的优化，再使用相同条件采集“优化后”。 ")) : createCommentVNode("", true),
          (openBlock(true), createElementBlock(Fragment, null, renderList(records.value, (record) => {
            return openBlock(), createElementBlock("article", {
              key: record.id,
              class: "record"
            }, [
              createBaseVNode("div", _hoisted_27, [
                createBaseVNode("h3", null, [
                  createTextVNode(toDisplayString(record.game) + " ", 1),
                  createBaseVNode("span", _hoisted_28, toDisplayString(record.phase === "before" ? "优化前" : "优化后"), 1)
                ]),
                createBaseVNode("time", null, toDisplayString(new Date(record.createdAt).toLocaleString()), 1)
              ]),
              createBaseVNode("p", _hoisted_29, toDisplayString(record.process) + " · " + toDisplayString(fmt(record.elapsedSeconds)) + " 秒 · " + toDisplayString(record.metrics.frameCount) + " 帧 ", 1),
              createBaseVNode("p", _hoisted_30, toDisplayString(record.conditions), 1),
              createBaseVNode("div", _hoisted_31, [
                createBaseVNode("div", null, [
                  _cache[29] || (_cache[29] = createBaseVNode("span", null, "平均 FPS", -1)),
                  createBaseVNode("strong", null, toDisplayString(fmt(record.metrics.averageFps)), 1)
                ]),
                createBaseVNode("div", null, [
                  _cache[30] || (_cache[30] = createBaseVNode("span", null, "1% Low", -1)),
                  createBaseVNode("strong", null, toDisplayString(fmt(record.metrics.low1Percent)), 1)
                ]),
                createBaseVNode("div", null, [
                  _cache[31] || (_cache[31] = createBaseVNode("span", null, "帧间隔方差", -1)),
                  createBaseVNode("strong", null, toDisplayString(fmt(record.metrics.varianceMs2)) + " ms²", 1)
                ])
              ]),
              createBaseVNode("p", _hoisted_32, " P50 " + toDisplayString(fmt(record.metrics.p50Ms, 2)) + " / P95 " + toDisplayString(fmt(record.metrics.p95Ms, 2)) + " / P99 " + toDisplayString(fmt(record.metrics.p99Ms, 2)) + " ms · PresentMon 帧间隔（不等同于显示器实际显示帧率） ", 1),
              (openBlock(true), createElementBlock(Fragment, null, renderList(record.issues, (issue) => {
                return openBlock(), createElementBlock("p", {
                  key: issue,
                  class: "warning"
                }, toDisplayString(issue), 1);
              }), 128)),
              createBaseVNode("div", _hoisted_33, [
                createBaseVNode("button", {
                  class: "secondary",
                  disabled: busy.value || state.value.active,
                  onClick: ($event) => reuse(record)
                }, " 使用相同条件测优化后", 8, _hoisted_34),
                createBaseVNode("button", {
                  class: "secondary",
                  disabled: busy.value,
                  onClick: ($event) => exportRecord(record.id)
                }, " 导出逐帧 JSON", 8, _hoisted_35),
                pendingDelete.value === record.id ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                  _cache[32] || (_cache[32] = createBaseVNode("span", null, "删除后不可恢复", -1)),
                  createBaseVNode("button", {
                    class: "danger",
                    disabled: busy.value,
                    onClick: ($event) => remove(record.id)
                  }, "确认删除", 8, _hoisted_36),
                  createBaseVNode("button", {
                    class: "secondary",
                    disabled: busy.value,
                    onClick: _cache[7] || (_cache[7] = ($event) => pendingDelete.value = "")
                  }, " 保留 ", 8, _hoisted_37)
                ], 64)) : (openBlock(), createElementBlock("button", {
                  key: 1,
                  class: "secondary",
                  disabled: busy.value,
                  onClick: ($event) => pendingDelete.value = record.id
                }, " 删除 ", 8, _hoisted_38))
              ])
            ]);
          }), 128))
        ])
      ]);
    };
  }
});
const ManualPerformanceComparisonPanel = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-35af30ca"]]);
export {
  ManualPerformanceComparisonPanel as default
};
