const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./ManualPerformanceComparisonPanel-BAMzlXL5.js","./main-DAqTdO6U.js","./main-1Ii_wrN_.css","./ManualPerformanceComparisonPanel-B48aMpoj.css"])))=>i.map(i=>d[i]);
import { _ as __vitePreload } from "./index-CL4m76NE.js";
import { t as defineComponent, au as useRoute, D as inject, aD as watch, a1 as onMounted, a3 as onUnmounted, a5 as openBlock, l as createElementBlock, i as createBaseVNode, S as normalizeClass, ak as toDisplayString, k as createCommentVNode, F as Fragment, ab as renderList, q as createTextVNode, aG as withDirectives, az as vModelSelect, r as createVNode, as as unref, j as createBlock, s as defineAsyncComponent, a9 as ref, g as computed, _ as _export_sfc } from "./main-DAqTdO6U.js";
import { G as GameExecutableIcon } from "./GameExecutableIcon-D9w_lp9p.js";
const hardwareMetrics = {
  cpuUsage: { label: "CPU 占用", unit: "%" },
  cpuTemp: { label: "CPU 温度", unit: "°C" },
  gpuUsage: { label: "GPU 占用", unit: "%" },
  gpuTemp: { label: "GPU 温度", unit: "°C" },
  ramUsage: { label: "内存占用", unit: "%" },
  vramUsage: { label: "显存占用", unit: "%" },
  gpuPower: { label: "GPU 功耗", unit: "W" }
};
const _hoisted_1$1 = {
  class: "sessions",
  "aria-label": "游戏自动记录与性能报告"
};
const _hoisted_2 = { class: "session-heading" };
const _hoisted_3 = ["aria-checked", "disabled"];
const _hoisted_4 = { class: "session-toolbar" };
const _hoisted_5 = ["disabled"];
const _hoisted_6 = ["disabled"];
const _hoisted_7 = {
  key: 0,
  class: "session-error",
  role: "alert"
};
const _hoisted_8 = {
  key: 1,
  role: "status",
  class: "session-notice"
};
const _hoisted_9 = {
  key: 2,
  class: "live-sessions"
};
const _hoisted_10 = {
  key: 0,
  class: "capture-warning",
  role: "status"
};
const _hoisted_11 = {
  key: 3,
  class: "waiting"
};
const _hoisted_12 = {
  key: 4,
  class: "date-overview"
};
const _hoisted_13 = { class: "day-overview" };
const _hoisted_14 = {
  class: "date-timeline",
  "aria-label": "选择记录日期"
};
const _hoisted_15 = ["aria-pressed", "onClick"];
const _hoisted_16 = { class: "session-layout" };
const _hoisted_17 = { class: "session-history" };
const _hoisted_18 = { class: "history-list" };
const _hoisted_19 = ["onClick"];
const _hoisted_20 = {
  key: 0,
  class: "empty"
};
const _hoisted_21 = { class: "session-report" };
const _hoisted_22 = { class: "report-game-heading" };
const _hoisted_23 = { class: "session-metrics" };
const _hoisted_24 = { class: "hardware-report" };
const _hoisted_25 = { class: "hardware-cards" };
const _hoisted_26 = { key: 0 };
const _hoisted_27 = { key: 1 };
const _hoisted_28 = {
  key: 0,
  class: "energy-line"
};
const _hoisted_29 = {
  key: 1,
  class: "energy-line"
};
const _hoisted_30 = { class: "session-chart" };
const _hoisted_31 = { class: "chart-heading" };
const _hoisted_32 = ["value"];
const _hoisted_33 = {
  key: 0,
  class: "chart-legend"
};
const _hoisted_34 = ["aria-label"];
const _hoisted_35 = ["d"];
const _hoisted_36 = ["d"];
const _hoisted_37 = ["cx", "cy", "r"];
const _hoisted_38 = ["d"];
const _hoisted_39 = ["cx", "cy"];
const _hoisted_40 = {
  x: "40",
  y: "17"
};
const _hoisted_41 = {
  x: "660",
  y: "178"
};
const _hoisted_42 = {
  key: 2,
  class: "sensor-empty"
};
const _hoisted_43 = { class: "chart-caption" };
const _hoisted_44 = {
  key: 0,
  class: "hardware-device"
};
const _hoisted_45 = { class: "history-reference" };
const _hoisted_46 = { class: "reference-values" };
const _hoisted_47 = { key: 1 };
const _hoisted_48 = {
  key: 1,
  class: "session-issues"
};
const _hoisted_49 = { class: "record-details" };
const _hoisted_50 = { key: 0 };
const _hoisted_51 = { class: "report-actions" };
const _hoisted_52 = ["disabled"];
const _hoisted_53 = ["disabled"];
const _hoisted_54 = ["disabled"];
const _hoisted_55 = ["disabled"];
const _hoisted_56 = {
  key: 2,
  class: "delete-confirm"
};
const _hoisted_57 = ["disabled"];
const _hoisted_58 = {
  key: 1,
  class: "report-empty"
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "PerformanceComparisonPanel",
  setup(__props) {
    const ManualPanel = defineAsyncComponent(() => __vitePreload(() => import("./ManualPerformanceComparisonPanel-BAMzlXL5.js"), true ? __vite__mapDeps([0,1,2,3]) : void 0, import.meta.url));
    const api = window.gameSessionApi, route = useRoute();
    const sectionActive = inject("embeddedSectionActive", ref(true));
    const status = ref({ enabled: true, active: [], error: "", gameCount: 0 });
    const records = ref([]), selected = ref(""), report = ref(null), reference = ref(null);
    const error = ref(""), notice = ref(""), busy = ref(false), filter = ref(""), manualOpen = ref(false), deleting = ref("");
    const games = computed(() => [...new Set(records.value.map((r) => r.game.name))]);
    const selectedDay = ref(""), chartMetric = ref("fps"), hoverSeconds = ref(null);
    const dateKey = (n) => {
      const d = new Date(n);
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    };
    const days = computed(() => [...new Set(records.value.map((r) => dateKey(r.startedAt)))].sort().reverse());
    const dayRows = computed(() => records.value.filter((r) => !selectedDay.value || dateKey(r.startedAt) === selectedDay.value));
    const daySeconds = computed(() => dayRows.value.reduce((n, r) => n + (r.endedAt - r.startedAt) / 1e3, 0));
    const visible = computed(() => dayRows.value.filter((r) => !filter.value || r.game.name === filter.value));
    const sensorKeys = Object.keys(hardwareMetrics).filter((k) => k !== "gpuPower");
    const fpsScope = (r) => !r.metrics.frameCount ? "未采集到有效 FPS" : r.issues.length ? "FPS 部分记录 / 采集受限" : "FPS 记录完整";
    function hardwareScope(r) {
      const missing = sensorKeys.filter((key) => !r.hardware?.metrics[key]);
      return missing.length ? missing.map((key) => hardwareMetrics[key].label).join("、") + "未获取" : "所列硬件指标已获取";
    }
    const fmt = (n) => Number.isFinite(n) ? n.toFixed(1) : "—";
    const pct = (n) => `${n > 0 ? "+" : ""}${fmt(n)}%`;
    const date = (n) => new Date(n).toLocaleString("zh-CN");
    const duration = (seconds) => `${Math.floor(seconds / 60)} 分 ${Math.floor(seconds % 60)} 秒`;
    const reason = (r) => ({ "game-exit": "游戏已退出", disabled: "手动关闭记录", "app-exit": "软件已退出", recovered: "异常退出恢复", limit: "达到 12 小时上限" })[r.reason];
    let disposed = false, timer, unsubscribe, polling = false, request = 0;
    async function choose(id) {
      selected.value = id;
      deleting.value = "";
      report.value = null;
      reference.value = null;
      hoverSeconds.value = null;
      const version = ++request;
      try {
        const result = await api.report(id);
        if (!disposed && version === request) {
          report.value = result.record;
          reference.value = result.reference;
          selectedDay.value = dateKey(result.record.startedAt);
        }
      } catch (e) {
        if (version === request) error.value = e.message || String(e);
      }
    }
    async function load(preferred) {
      const rows = await api.list();
      if (disposed) return;
      records.value = rows;
      if (preferred) filter.value = "";
      const id = [preferred, selected.value, String(route.query.session || ""), rows[0]?.id].find((id2) => id2 && rows.some((r) => r.id === id2));
      if (id) {
        if (id !== report.value?.id) await choose(id);
      } else {
        selected.value = "";
        report.value = null;
        reference.value = null;
      }
    }
    async function poll() {
      if (polling || disposed || !sectionActive.value || document.hidden) return;
      polling = true;
      try {
        const state = await api.status();
        if (disposed) return;
        const changed = state.lastSavedId !== status.value.lastSavedId;
        status.value = state;
        if (changed) await load(state.lastSavedId);
      } catch (e) {
        error.value = e.message || String(e);
      } finally {
        polling = false;
      }
    }
    async function action(fn) {
      if (busy.value) return;
      busy.value = true;
      error.value = "";
      notice.value = "";
      try {
        await fn();
        await poll();
      } catch (e) {
        error.value = e.message || String(e);
      } finally {
        busy.value = false;
      }
    }
    function toggle() {
      void action(async () => {
        await api.setEnabled(!status.value.enabled);
        await load();
      });
    }
    function refreshGames() {
      void action(async () => {
        const count = await api.refreshGames();
        notice.value = `已识别 ${count} 个游戏程序`;
      });
    }
    function addGame() {
      void action(async () => {
        const result = await api.addGame();
        if (!result.canceled) notice.value = `已添加 ${result.name}，下次检测到运行时自动记录`;
      });
    }
    function exportReport(format) {
      if (!report.value) return;
      const id = report.value.id;
      void action(async () => {
        const result = await api.exportReport(id, format);
        if (!result.canceled) notice.value = `已保存：${result.path}`;
      });
    }
    function remove() {
      const id = deleting.value;
      void action(async () => {
        await api.remove(id);
        selected.value = "";
        deleting.value = "";
        await load();
      });
    }
    function selectVisible() {
      const first = visible.value[0];
      if (first) void choose(first.id);
      else {
        request++;
        selected.value = "";
        report.value = null;
        reference.value = null;
        deleting.value = "";
      }
    }
    function chooseDay(day) {
      selectedDay.value = day;
      selectVisible();
    }
    const chart = computed(() => {
      const r = report.value;
      if (!r) return null;
      const key = chartMetric.value, raw = key === "fps" ? r.points.map((p) => ({ seconds: p.seconds, value: p.frames * 1e3 / p.totalMs })) : (r.hardware?.points || []).flatMap((p) => {
        const value = p.values[key];
        return typeof value === "number" ? [{ seconds: p.seconds, value }] : [];
      });
      if (!raw.length) return null;
      const step = key === "fps" ? r.pointIntervalSeconds || 60 : r.hardware?.intervalSeconds || 5, max = Math.max(1, ...raw.map((p) => p.value)), end = Math.max(step, (r.endedAt - r.startedAt) / 1e3);
      let previous = -1e5;
      const points = raw.map((p) => {
        const point = { ...p, x: 40 + 700 * p.seconds / end, y: 155 - 125 * p.value / max, gap: p.seconds - previous > (key === "fps" ? step : step * 2) };
        previous = p.seconds;
        return point;
      });
      const average = key === "fps" ? r.metrics.averageFps : r.hardware?.metrics[key]?.average;
      return { max, end, step, points, unit: key === "fps" ? "FPS" : hardwareMetrics[key].unit, average, path: points.map((p) => `${p.gap ? "M" : "L"}${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(" ") };
    });
    const hovered = computed(() => hoverSeconds.value !== null && chart.value ? chart.value.points.reduce((a, b) => Math.abs(b.seconds - hoverSeconds.value) < Math.abs(a.seconds - hoverSeconds.value) ? b : a) : null);
    function hoverChart(event) {
      const rect = event.currentTarget.getBoundingClientRect();
      if (chart.value) hoverSeconds.value = Math.max(0, Math.min(chart.value.end, ((event.clientX - rect.left) / rect.width * 780 - 40) / 700 * chart.value.end));
    }
    watch(chartMetric, () => hoverSeconds.value = null);
    watch(() => route.query.session, (id) => {
      if (typeof id === "string") {
        filter.value = "";
        void choose(id);
      }
    });
    watch(sectionActive, (active) => {
      if (active) void action(async () => {
        await load();
        await poll();
      });
    });
    onMounted(async () => {
      unsubscribe = api.onReport((e) => {
        void load(e.id).catch((e2) => {
          error.value = e2.message;
        });
      });
      await action(async () => {
        await load();
        await poll();
      });
      function next() {
        if (disposed) return;
        timer = setTimeout(async () => {
          await poll();
          next();
        }, 2e3);
      }
      next();
    });
    onUnmounted(() => {
      disposed = true;
      request++;
      if (timer) clearTimeout(timer);
      unsubscribe?.();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("section", _hoisted_1$1, [
        createBaseVNode("div", _hoisted_2, [
          _cache[9] || (_cache[9] = createBaseVNode("div", null, [
            createBaseVNode("div", { class: "eyebrow" }, "GAME SESSIONS"),
            createBaseVNode("h3", null, "退出游戏，自动保存游玩报告。"),
            createBaseVNode("p", null, "打开QuChen调试后照常玩游戏，无需提前测试。保留最近 100 次记录。")
          ], -1)),
          createBaseVNode("button", {
            class: normalizeClass(["record-switch", { enabled: status.value.enabled }]),
            role: "switch",
            "aria-checked": status.value.enabled,
            disabled: busy.value,
            onClick: toggle
          }, toDisplayString(status.value.enabled ? "● 自动记录已开启" : "自动记录已关闭"), 11, _hoisted_3)
        ]),
        createBaseVNode("div", _hoisted_4, [
          createBaseVNode("span", null, "已识别 " + toDisplayString(status.value.gameCount) + " 个游戏程序", 1),
          createBaseVNode("button", {
            disabled: busy.value,
            onClick: refreshGames
          }, "重新识别", 8, _hoisted_5),
          createBaseVNode("button", {
            disabled: busy.value,
            onClick: addGame
          }, "添加未识别游戏", 8, _hoisted_6)
        ]),
        _cache[43] || (_cache[43] = createBaseVNode("p", { class: "session-hint" }, "最小化到托盘也可记录；完全退出软件后停止。只记录已识别或手动添加的游戏。返回游戏大厅或切桌面会继续记录。", -1)),
        error.value || status.value.error ? (openBlock(), createElementBlock("p", _hoisted_7, toDisplayString(error.value || status.value.error), 1)) : createCommentVNode("", true),
        notice.value ? (openBlock(), createElementBlock("p", _hoisted_8, toDisplayString(notice.value), 1)) : createCommentVNode("", true),
        status.value.active.length ? (openBlock(), createElementBlock("div", _hoisted_9, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(status.value.active, (active) => {
            return openBlock(), createElementBlock("div", {
              key: active.id,
              class: "live-session"
            }, [
              _cache[10] || (_cache[10] = createBaseVNode("span", { class: "live-dot" }, null, -1)),
              createBaseVNode("div", null, [
                createBaseVNode("strong", null, toDisplayString(active.game.name), 1),
                createBaseVNode("p", null, toDisplayString(active.saving ? "正在保存，失败时会重试" : active.frameCount ? "正在后台记录" : "已识别进程，等待游戏帧数据") + " · " + toDisplayString(duration(active.elapsedSeconds)) + " · " + toDisplayString(active.frameCount.toLocaleString()) + " 帧", 1),
                !active.saving && !active.frameCount && active.elapsedSeconds >= 30 ? (openBlock(), createElementBlock("p", _hoisted_10, "尚未收到游戏 FPS 数据。请确认游戏已进入画面；采集受限时会保留已获取的硬件数据，退出后仍会保存报告。")) : createCommentVNode("", true)
              ])
            ]);
          }), 128))
        ])) : (openBlock(), createElementBlock("div", _hoisted_11, toDisplayString(status.value.enabled ? "等待游戏启动。游戏真正退出后，报告会自动出现在这里。" : "记录已暂停，已有历史记录仍可查看。"), 1)),
        records.value.length ? (openBlock(), createElementBlock("section", _hoisted_12, [
          createBaseVNode("div", _hoisted_13, [
            _cache[12] || (_cache[12] = createBaseVNode("strong", null, "游玩时间轴", -1)),
            createBaseVNode("span", null, toDisplayString(selectedDay.value) + " · " + toDisplayString(dayRows.value.length) + " 场记录", 1),
            createBaseVNode("span", null, [
              _cache[11] || (_cache[11] = createTextVNode("记录时长合计 ", -1)),
              createBaseVNode("b", null, toDisplayString(duration(daySeconds.value)), 1)
            ])
          ]),
          createBaseVNode("nav", _hoisted_14, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(days.value, (day) => {
              return openBlock(), createElementBlock("button", {
                key: day,
                "aria-pressed": selectedDay.value === day,
                class: normalizeClass({ chosen: selectedDay.value === day }),
                onClick: ($event) => chooseDay(day)
              }, [
                _cache[13] || (_cache[13] = createBaseVNode("i", null, null, -1)),
                createTextVNode(toDisplayString(day), 1)
              ], 10, _hoisted_15);
            }), 128))
          ])
        ])) : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_16, [
          createBaseVNode("aside", _hoisted_17, [
            createBaseVNode("header", null, [
              _cache[14] || (_cache[14] = createBaseVNode("h4", null, "游玩记录", -1)),
              createBaseVNode("span", null, toDisplayString(records.value.length) + " / 100", 1)
            ]),
            withDirectives(createBaseVNode("select", {
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => filter.value = $event),
              "aria-label": "筛选游戏",
              onChange: selectVisible
            }, [
              _cache[15] || (_cache[15] = createBaseVNode("option", { value: "" }, "全部游戏", -1)),
              (openBlock(true), createElementBlock(Fragment, null, renderList(games.value, (game) => {
                return openBlock(), createElementBlock("option", { key: game }, toDisplayString(game), 1);
              }), 128))
            ], 544), [
              [vModelSelect, filter.value]
            ]),
            createBaseVNode("div", _hoisted_18, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(visible.value, (record) => {
                return openBlock(), createElementBlock("button", {
                  key: record.id,
                  class: normalizeClass(["session-row", { selected: selected.value === record.id }]),
                  onClick: ($event) => choose(record.id)
                }, [
                  createBaseVNode("strong", null, toDisplayString(record.game.name), 1),
                  createBaseVNode("span", null, toDisplayString(date(record.startedAt)), 1),
                  createBaseVNode("small", null, toDisplayString(duration((record.endedAt - record.startedAt) / 1e3)) + " · " + toDisplayString(fpsScope(record)), 1),
                  createBaseVNode("small", null, toDisplayString(hardwareScope(record)), 1),
                  createBaseVNode("b", null, toDisplayString(record.metrics.frameCount ? fmt(record.metrics.averageFps) + " FPS" : "未采集到有效帧"), 1)
                ], 10, _hoisted_19);
              }), 128)),
              !visible.value.length ? (openBlock(), createElementBlock("p", _hoisted_20, [..._cache[16] || (_cache[16] = [
                createTextVNode("还没有游玩记录。", -1),
                createBaseVNode("br", null, null, -1),
                createTextVNode("完成首次记录后，即可查看本场表现。", -1)
              ])])) : createCommentVNode("", true)
            ])
          ]),
          createBaseVNode("article", _hoisted_21, [
            report.value ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              createBaseVNode("header", _hoisted_22, [
                createVNode(GameExecutableIcon, {
                  path: report.value.game.exePath
                }, null, 8, ["path"]),
                createBaseVNode("div", null, [
                  _cache[17] || (_cache[17] = createBaseVNode("div", { class: "eyebrow" }, "本次游玩报告", -1)),
                  createBaseVNode("h4", null, toDisplayString(report.value.game.name), 1),
                  createBaseVNode("p", null, toDisplayString(date(report.value.startedAt)) + " · " + toDisplayString(reason(report.value)), 1)
                ])
              ]),
              createBaseVNode("div", _hoisted_23, [
                createBaseVNode("div", null, [
                  _cache[18] || (_cache[18] = createBaseVNode("span", null, "平均 FPS", -1)),
                  createBaseVNode("strong", null, toDisplayString(report.value.metrics.frameCount ? fmt(report.value.metrics.averageFps) : "—"), 1)
                ]),
                createBaseVNode("div", null, [
                  _cache[19] || (_cache[19] = createBaseVNode("span", null, [
                    createTextVNode("1% Low "),
                    createBaseVNode("small", null, "估计")
                  ], -1)),
                  createBaseVNode("strong", null, toDisplayString(report.value.metrics.frameCount ? fmt(report.value.metrics.low1Percent) : "—"), 1)
                ]),
                createBaseVNode("div", null, [
                  _cache[20] || (_cache[20] = createBaseVNode("span", null, [
                    createTextVNode("0.1% Low "),
                    createBaseVNode("small", null, "估计")
                  ], -1)),
                  createBaseVNode("strong", null, toDisplayString(report.value.metrics.frameCount && report.value.metrics.low01Percent !== void 0 ? fmt(report.value.metrics.low01Percent) : "—"), 1)
                ]),
                createBaseVNode("div", null, [
                  _cache[22] || (_cache[22] = createBaseVNode("span", null, "P99 帧间隔", -1)),
                  createBaseVNode("strong", null, [
                    createTextVNode(toDisplayString(report.value.metrics.frameCount ? fmt(report.value.metrics.p99Ms) : "—") + " ", 1),
                    _cache[21] || (_cache[21] = createBaseVNode("small", null, "ms", -1))
                  ])
                ])
              ]),
              createBaseVNode("section", _hoisted_24, [
                _cache[24] || (_cache[24] = createBaseVNode("div", { class: "hardware-heading" }, [
                  createBaseVNode("h5", null, "本场硬件状态"),
                  createBaseVNode("small", null, "整机 / 所列显卡有效采样均值")
                ], -1)),
                createBaseVNode("div", _hoisted_25, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(unref(sensorKeys), (key) => {
                    return openBlock(), createElementBlock("div", {
                      key,
                      class: "hardware-card"
                    }, [
                      createBaseVNode("span", null, toDisplayString(unref(hardwareMetrics)[key].label), 1),
                      createBaseVNode("strong", null, [
                        createTextVNode(toDisplayString(report.value.hardware?.metrics[key] ? fmt(report.value.hardware.metrics[key].average) : "—") + " ", 1),
                        createBaseVNode("small", null, toDisplayString(unref(hardwareMetrics)[key].unit), 1)
                      ]),
                      report.value.hardware?.metrics[key] ? (openBlock(), createElementBlock("footer", _hoisted_26, [
                        createBaseVNode("span", null, "最高 " + toDisplayString(fmt(report.value.hardware.metrics[key].max)), 1),
                        createBaseVNode("span", null, "最低 " + toDisplayString(fmt(report.value.hardware.metrics[key].min)), 1)
                      ])) : (openBlock(), createElementBlock("footer", _hoisted_27, "未获取有效传感器数据"))
                    ]);
                  }), 128))
                ]),
                report.value.hardware?.device.sensorStatus ? (openBlock(), createElementBlock("p", _hoisted_28, toDisplayString(report.value.hardware.device.sensorStatus), 1)) : createCommentVNode("", true),
                report.value.hardware?.gpuEnergyKwh != null ? (openBlock(), createElementBlock("p", _hoisted_29, [
                  _cache[23] || (_cache[23] = createTextVNode("GPU 采样耗能约 ", -1)),
                  createBaseVNode("b", null, toDisplayString(report.value.hardware.gpuEnergyKwh.toFixed(4)) + " kWh", 1),
                  createTextVNode(" · 已覆盖 " + toDisplayString(duration(report.value.hardware.coveredPowerSeconds)) + " · 非整机用电量", 1)
                ])) : createCommentVNode("", true)
              ]),
              createBaseVNode("div", _hoisted_30, [
                createBaseVNode("div", _hoisted_31, [
                  _cache[26] || (_cache[26] = createBaseVNode("h5", null, "整场性能曲线", -1)),
                  withDirectives(createBaseVNode("select", {
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => chartMetric.value = $event),
                    "aria-label": "选择曲线指标"
                  }, [
                    _cache[25] || (_cache[25] = createBaseVNode("option", { value: "fps" }, "FPS 帧率", -1)),
                    (openBlock(true), createElementBlock(Fragment, null, renderList(unref(hardwareMetrics), (metric, key) => {
                      return openBlock(), createElementBlock("option", {
                        key,
                        value: key
                      }, toDisplayString(metric.label), 9, _hoisted_32);
                    }), 128))
                  ], 512), [
                    [vModelSelect, chartMetric.value]
                  ])
                ]),
                chartMetric.value === "fps" ? (openBlock(), createElementBlock("div", _hoisted_33, [
                  createBaseVNode("span", null, "分段最高 " + toDisplayString(report.value.metrics.frameCount && report.value.metrics.peakFps !== void 0 ? fmt(report.value.metrics.peakFps) : "—"), 1),
                  createBaseVNode("span", null, "分段最低 " + toDisplayString(report.value.metrics.frameCount && report.value.metrics.minimumFps !== void 0 ? fmt(report.value.metrics.minimumFps) : "—"), 1),
                  createBaseVNode("span", null, "1% Low " + toDisplayString(report.value.metrics.frameCount ? fmt(report.value.metrics.low1Percent) : "—"), 1)
                ])) : createCommentVNode("", true),
                chart.value ? (openBlock(), createElementBlock("svg", {
                  key: 1,
                  viewBox: "0 0 780 185",
                  role: "img",
                  "aria-label": chartMetric.value === "fps" ? "本次游玩 FPS 趋势" : unref(hardwareMetrics)[chartMetric.value].label + "趋势",
                  onMousemove: hoverChart,
                  onMouseleave: _cache[2] || (_cache[2] = ($event) => hoverSeconds.value = null)
                }, [
                  _cache[27] || (_cache[27] = createBaseVNode("path", {
                    d: "M40 25V155H750",
                    fill: "none",
                    stroke: "currentColor",
                    opacity: ".2"
                  }, null, -1)),
                  chart.value.average !== void 0 ? (openBlock(), createElementBlock("path", {
                    key: 0,
                    d: `M40 ${155 - 125 * chart.value.average / chart.value.max}H750`,
                    stroke: "#68bc85",
                    "stroke-dasharray": "5 5",
                    opacity: ".6"
                  }, null, 8, _hoisted_35)) : createCommentVNode("", true),
                  createBaseVNode("path", {
                    d: chart.value.path,
                    fill: "none",
                    stroke: "#36c8ff",
                    "stroke-width": "2"
                  }, null, 8, _hoisted_36),
                  (openBlock(true), createElementBlock(Fragment, null, renderList(chart.value.points, (point, i) => {
                    return openBlock(), createElementBlock("circle", {
                      key: i,
                      cx: point.x,
                      cy: point.y,
                      r: chart.value.points.length > 150 ? 0 : 2,
                      fill: "#36c8ff"
                    }, null, 8, _hoisted_37);
                  }), 128)),
                  hovered.value ? (openBlock(), createElementBlock("path", {
                    key: 1,
                    d: `M${hovered.value.x} 25V155`,
                    stroke: "#d6f0ff",
                    opacity: ".5"
                  }, null, 8, _hoisted_38)) : createCommentVNode("", true),
                  hovered.value ? (openBlock(), createElementBlock("circle", {
                    key: 2,
                    cx: hovered.value.x,
                    cy: hovered.value.y,
                    r: "4",
                    fill: "#fff"
                  }, null, 8, _hoisted_39)) : createCommentVNode("", true),
                  createBaseVNode("text", _hoisted_40, toDisplayString(fmt(chart.value.max)) + " " + toDisplayString(chart.value.unit), 1),
                  _cache[28] || (_cache[28] = createBaseVNode("text", {
                    x: "40",
                    y: "178"
                  }, "0 分钟", -1)),
                  createBaseVNode("text", _hoisted_41, toDisplayString(fmt(chart.value.end / 60)) + " 分钟", 1)
                ], 40, _hoisted_34)) : (openBlock(), createElementBlock("p", _hoisted_42, "本场未获取该指标数据，旧记录不会补造数据。")),
                createBaseVNode("p", _hoisted_43, toDisplayString(hovered.value && chart.value ? `${duration(hovered.value.seconds)} · ${fmt(hovered.value.value)} ${chart.value.unit}` : chart.value ? `曲线分段 ${chart.value.step} 秒 · 移动鼠标查看采样值 · 无数据时留空` : "可切换其他曲线查看"), 1)
              ]),
              report.value.hardware ? (openBlock(), createElementBlock("div", _hoisted_44, [
                createBaseVNode("span", null, [
                  _cache[29] || (_cache[29] = createTextVNode("处理器 ", -1)),
                  createBaseVNode("b", null, toDisplayString(report.value.hardware.device.cpu || "未获取"), 1)
                ]),
                createBaseVNode("span", null, [
                  _cache[30] || (_cache[30] = createTextVNode("采样显卡 ", -1)),
                  createBaseVNode("b", null, toDisplayString(report.value.hardware.device.gpu || "未获取"), 1)
                ]),
                createBaseVNode("span", null, [
                  _cache[31] || (_cache[31] = createTextVNode("系统 ", -1)),
                  createBaseVNode("b", null, toDisplayString(report.value.hardware.device.os || "未获取"), 1)
                ]),
                createBaseVNode("span", null, [
                  _cache[32] || (_cache[32] = createTextVNode("显卡驱动 ", -1)),
                  createBaseVNode("b", null, toDisplayString(report.value.hardware.device.driver || "未获取"), 1)
                ]),
                createBaseVNode("span", null, [
                  _cache[33] || (_cache[33] = createTextVNode("内存 ", -1)),
                  createBaseVNode("b", null, toDisplayString(report.value.hardware.device.ramGB ? fmt(report.value.hardware.device.ramGB) + " GB" : "未获取"), 1)
                ]),
                createBaseVNode("span", null, [
                  _cache[34] || (_cache[34] = createTextVNode("显存 ", -1)),
                  createBaseVNode("b", null, toDisplayString(report.value.hardware.device.vramGB ? fmt(report.value.hardware.device.vramGB) + " GB" : "未获取"), 1)
                ])
              ])) : createCommentVNode("", true),
              createBaseVNode("div", _hoisted_45, [
                _cache[37] || (_cache[37] = createBaseVNode("h5", null, "与最近一次可比游玩记录对照", -1)),
                reference.value ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                  createBaseVNode("p", null, toDisplayString(date(reference.value.previous.startedAt)), 1),
                  createBaseVNode("div", _hoisted_46, [
                    createBaseVNode("span", null, [
                      _cache[35] || (_cache[35] = createTextVNode("平均 FPS ", -1)),
                      createBaseVNode("b", null, toDisplayString(pct(reference.value.averageFpsChangePercent)), 1)
                    ]),
                    createBaseVNode("span", null, [
                      _cache[36] || (_cache[36] = createTextVNode("1% Low ", -1)),
                      createBaseVNode("b", null, toDisplayString(pct(reference.value.low1ChangePercent)), 1)
                    ])
                  ]),
                  createBaseVNode("p", null, toDisplayString(reference.value.settingsChanged ? "两场软件优化档案标记不同。" : "两场软件优化档案标记相同。"), 1)
                ], 64)) : (openBlock(), createElementBlock("p", _hoisted_47, "暂无可比历史记录。本场会保存为后续参考，首次记录不等于优化前基准。")),
                _cache[38] || (_cache[38] = createBaseVNode("small", null, "仅自动匹配同游戏、版本标记、机器与显卡驱动标记一致且 FPS 记录完整的会话。地图、画质和后台负载可能不同，变化不代表优化效果。", -1))
              ]),
              report.value.issues.length ? (openBlock(), createElementBlock("ul", _hoisted_48, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(report.value.issues, (issue) => {
                  return openBlock(), createElementBlock("li", { key: issue }, toDisplayString(issue), 1);
                }), 128))
              ])) : createCommentVNode("", true),
              createBaseVNode("details", _hoisted_49, [
                _cache[39] || (_cache[39] = createBaseVNode("summary", null, "采集说明与记录范围", -1)),
                (openBlock(true), createElementBlock(Fragment, null, renderList([...report.value.notes, ...report.value.hardware?.notes || []], (note) => {
                  return openBlock(), createElementBlock("p", { key: note }, toDisplayString(note), 1);
                }), 128)),
                createBaseVNode("p", null, toDisplayString(report.value.context.settingsLabel) + "。" + toDisplayString(report.value.hardware?.device.cpuTempSource ? "CPU 温度来源：" + report.value.hardware.device.cpuTempSource : "未获取 CPU 核心/封装温度来源。"), 1),
                report.value.hardware?.device.gpuSource ? (openBlock(), createElementBlock("p", _hoisted_50, "显卡采样来源：" + toDisplayString(report.value.hardware.device.gpuSource), 1)) : createCommentVNode("", true),
                createBaseVNode("p", null, "记录 " + toDisplayString(duration((report.value.endedAt - report.value.startedAt) / 1e3)) + " · " + toDisplayString(report.value.metrics.frameCount.toLocaleString()) + " 帧 · 有效帧间隔合计 " + toDisplayString(fmt(report.value.metrics.sampledSeconds)) + " 秒", 1)
              ]),
              createBaseVNode("div", _hoisted_51, [
                createBaseVNode("button", {
                  disabled: busy.value,
                  onClick: _cache[3] || (_cache[3] = ($event) => exportReport("html"))
                }, "导出完整报告", 8, _hoisted_52),
                createBaseVNode("button", {
                  disabled: busy.value,
                  onClick: _cache[4] || (_cache[4] = ($event) => exportReport("csv"))
                }, "导出趋势 CSV", 8, _hoisted_53),
                createBaseVNode("button", {
                  disabled: busy.value,
                  onClick: _cache[5] || (_cache[5] = ($event) => exportReport("json"))
                }, "导出 JSON", 8, _hoisted_54),
                createBaseVNode("button", {
                  class: "delete",
                  disabled: busy.value,
                  onClick: _cache[6] || (_cache[6] = ($event) => deleting.value = report.value.id)
                }, "删除记录", 8, _hoisted_55)
              ]),
              deleting.value === report.value.id ? (openBlock(), createElementBlock("div", _hoisted_56, [
                _cache[40] || (_cache[40] = createTextVNode("删除这场记录？", -1)),
                createBaseVNode("button", {
                  disabled: busy.value,
                  onClick: remove
                }, "确认删除", 8, _hoisted_57),
                createBaseVNode("button", {
                  onClick: _cache[7] || (_cache[7] = ($event) => deleting.value = "")
                }, "取消")
              ])) : createCommentVNode("", true)
            ], 64)) : (openBlock(), createElementBlock("div", _hoisted_58, [..._cache[41] || (_cache[41] = [
              createBaseVNode("span", null, "↗", -1),
              createBaseVNode("h4", null, "让实际游玩留下记录", -1),
              createBaseVNode("p", null, [
                createTextVNode("首次报告看本场表现；后续会话自动寻找可比历史。"),
                createBaseVNode("br"),
                createTextVNode("不需要手动开始测试，也不会生成不存在的优化前数据。")
              ], -1)
            ])]))
          ])
        ]),
        createBaseVNode("details", {
          class: "manual-records",
          onToggle: _cache[8] || (_cache[8] = ($event) => manualOpen.value = $event.target.open)
        }, [
          _cache[42] || (_cache[42] = createBaseVNode("summary", null, "高级：手动测试与旧记录", -1)),
          manualOpen.value ? (openBlock(), createBlock(unref(ManualPanel), { key: 0 })) : createCommentVNode("", true)
        ], 32)
      ]);
    };
  }
});
const PerformanceComparisonPanel = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-d012c59c"]]);
const _hoisted_1 = {
  class: "game-performance-page",
  "data-tour": "performance-lab"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "GamePerformance",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        _cache[0] || (_cache[0] = createBaseVNode("header", { class: "page-header" }, [
          createBaseVNode("span", {
            class: "page-icon",
            "aria-hidden": "true"
          }, [
            createBaseVNode("svg", {
              width: "28",
              height: "28",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "1.5"
            }, [
              createBaseVNode("path", { d: "M4 3h12l4 4v14H4zM16 3v5h4M7 16l3-4 3 2 4-4" })
            ])
          ]),
          createBaseVNode("div", null, [
            createBaseVNode("h2", null, "游戏性能报告"),
            createBaseVNode("p", null, "自动记录游玩 · 硬件与帧率曲线 · 历史对照")
          ])
        ], -1)),
        createVNode(PerformanceComparisonPanel)
      ]);
    };
  }
});
const GamePerformance = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5f93462b"]]);
export {
  GamePerformance as default
};
