import { d as ElMessage } from "./index-CL4m76NE.js";
import { T as TweakShelf } from "./TweakShelf-BggrlQpq.js";
import { t as defineComponent, Y as onBeforeUnmount, ad as resolveComponent, a5 as openBlock, l as createElementBlock, i as createBaseVNode, p as createStaticVNode, r as createVNode, aF as withCtx, q as createTextVNode, ak as toDisplayString, k as createCommentVNode, F as Fragment, ab as renderList, S as normalizeClass, a9 as ref, g as computed, _ as _export_sfc } from "./main-DAqTdO6U.js";
import "./StatusDot-C-XeYEe8.js";
import "./KeywordConfirm-CUMT0nLF.js";
const _hoisted_1 = { class: "page" };
const _hoisted_2 = { class: "header" };
const _hoisted_3 = { class: "speed-card" };
const _hoisted_4 = { class: "radar-wrap" };
const _hoisted_5 = {
  viewBox: "0 0 200 200",
  class: "radar-svg"
};
const _hoisted_6 = ["stroke-dasharray"];
const _hoisted_7 = { class: "radar-center" };
const _hoisted_8 = { class: "radar-num" };
const _hoisted_9 = { class: "radar-label" };
const _hoisted_10 = { class: "chips" };
const _hoisted_11 = { class: "chip" };
const _hoisted_12 = { class: "chip-val" };
const _hoisted_13 = { class: "chip-grade" };
const _hoisted_14 = { class: "chip" };
const _hoisted_15 = { class: "chip-val" };
const _hoisted_16 = { class: "chip" };
const _hoisted_17 = { class: "chip-val" };
const _hoisted_18 = { class: "chip" };
const _hoisted_19 = { class: "chip-val" };
const _hoisted_20 = ["disabled"];
const _hoisted_21 = {
  key: 1,
  class: "err"
};
const _hoisted_22 = {
  key: 0,
  class: "detail-grid"
};
const _hoisted_23 = { class: "detail-panel" };
const _hoisted_24 = { class: "node-name" };
const _hoisted_25 = { class: "detail-panel" };
const _hoisted_26 = { class: "node-name" };
const _hoisted_27 = { class: "detail-panel" };
const _hoisted_28 = { class: "node-row" };
const _hoisted_29 = { class: "node-ms" };
const _hoisted_30 = { class: "node-row" };
const _hoisted_31 = { class: "node-ms" };
const _hoisted_32 = { class: "node-row" };
const _hoisted_33 = {
  key: 1,
  class: "report"
};
const _hoisted_34 = { class: "report-head" };
const _hoisted_35 = { class: "report-summary" };
const _hoisted_36 = { class: "report-list" };
const _hoisted_37 = { class: "depth-block" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "NetworkTuner",
  setup(__props) {
    const testing = ref(false);
    const result = ref(null);
    const error = ref("");
    const stage = ref("准备中");
    const stageProgress = computed(() => ({ 准备中: 0, 节点延迟: 0.15, 下载带宽: 0.35, 上传带宽: 0.55, "DNS 解析": 0.75, 负载延迟汇总: 0.9, 完成: 1 })[stage.value] ?? 0);
    async function cancel() {
      await window.sysApi?.cancelNetworkSpeedTest?.();
    }
    const unsubscribe = window.sysApi?.onNetworkSpeedProgress?.((value) => {
      if (testing.value) stage.value = value;
    });
    onBeforeUnmount(() => {
      unsubscribe?.();
      if (testing.value) window.sysApi?.cancelNetworkSpeedTest?.().catch(() => {
      });
    });
    const stageLabel = computed(() => {
      if (!testing.value) return result.value ? "测试完成" : "等待测试";
      return `${stage.value}…`;
    });
    const pingGrade = computed(() => {
      if (!result.value) return "";
      const p = result.value.ping;
      return p <= 30 ? "优秀" : p <= 60 ? "良好" : p <= 100 ? "一般" : "较差";
    });
    const gradeText = computed(() => ({ excellent: "优秀", good: "良好", fair: "一般", poor: "较差" })[result.value?.grade ?? "fair"]);
    const gradeSummary = computed(() => {
      const r = result.value;
      if (!r) return "";
      if (r.grade === "excellent") return "网络状态优秀，适合低延迟竞技游戏";
      if (r.grade === "good") return "网络状态良好，整体稳定";
      if (r.grade === "fair") return "网络状态一般，建议关注波动项";
      return "网络状态较差，建议排查网络问题";
    });
    async function start() {
      if (testing.value) return;
      testing.value = true;
      error.value = "";
      result.value = null;
      stage.value = "准备中";
      try {
        const r = await window.sysApi.networkSpeedTest();
        if (r.success && r.result) {
          result.value = r.result;
          stage.value = "完成";
        } else error.value = r.error || "测速失败";
      } catch (e) {
        error.value = String(e?.message || e);
        ElMessage.error("测速失败:" + error.value);
      } finally {
        testing.value = false;
      }
    }
    return (_ctx, _cache) => {
      const _component_router_link = resolveComponent("router-link");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          _cache[1] || (_cache[1] = createStaticVNode('<div class="icon" data-v-c13a90e7><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#a855f7" stroke-width="1.5" data-v-c13a90e7><circle cx="12" cy="12" r="10" data-v-c13a90e7></circle><path d="M2 12h20" data-v-c13a90e7></path><path d="M12 2a15.3 15.3 0 0 1 4 10" data-v-c13a90e7></path></svg></div><div data-v-c13a90e7><h2 data-v-c13a90e7>网络测速与调优</h2><p data-v-c13a90e7>延迟与带宽 · 网络配置优化</p></div>', 2)),
          createVNode(_component_router_link, {
            to: "/system-diagnostics?tab=network",
            class: "text-sm text-sky-400 ml-auto"
          }, {
            default: withCtx(() => [..._cache[0] || (_cache[0] = [
              createTextVNode("网络诊断 →", -1)
            ])]),
            _: 1
          })
        ]),
        createBaseVNode("div", _hoisted_3, [
          createBaseVNode("div", _hoisted_4, [
            (openBlock(), createElementBlock("svg", _hoisted_5, [
              _cache[2] || (_cache[2] = createBaseVNode("circle", {
                cx: "100",
                cy: "100",
                r: "90",
                fill: "none",
                stroke: "rgba(168,85,247,0.12)",
                "stroke-width": "1.5"
              }, null, -1)),
              _cache[3] || (_cache[3] = createBaseVNode("circle", {
                cx: "100",
                cy: "100",
                r: "60",
                fill: "none",
                stroke: "rgba(168,85,247,0.08)",
                "stroke-width": "1",
                "stroke-dasharray": "6 4"
              }, null, -1)),
              _cache[4] || (_cache[4] = createBaseVNode("circle", {
                cx: "100",
                cy: "100",
                r: "30",
                fill: "none",
                stroke: "rgba(168,85,247,0.06)",
                "stroke-width": "1"
              }, null, -1)),
              createBaseVNode("circle", {
                cx: "100",
                cy: "100",
                r: "90",
                fill: "none",
                stroke: "rgba(56,189,248,0.6)",
                "stroke-width": "4",
                "stroke-dasharray": `${stageProgress.value * 565.5} 565.5`,
                "stroke-linecap": "round",
                transform: "rotate(-90 100 100)",
                style: { "transition": "stroke-dasharray .8s" }
              }, null, 8, _hoisted_6)
            ])),
            createBaseVNode("div", _hoisted_7, [
              createBaseVNode("span", _hoisted_8, [
                createTextVNode(toDisplayString(result.value ? Math.round(result.value.ping) : testing.value ? "…" : "--"), 1),
                _cache[5] || (_cache[5] = createBaseVNode("small", null, "ms", -1))
              ]),
              createBaseVNode("span", _hoisted_9, toDisplayString(stageLabel.value), 1)
            ])
          ]),
          createBaseVNode("div", _hoisted_10, [
            createBaseVNode("div", _hoisted_11, [
              _cache[6] || (_cache[6] = createBaseVNode("span", { class: "chip-label" }, "延迟 Ping", -1)),
              createBaseVNode("span", _hoisted_12, toDisplayString(result.value ? Math.round(result.value.ping) + "ms" : "--"), 1),
              createBaseVNode("span", _hoisted_13, toDisplayString(pingGrade.value), 1)
            ]),
            createBaseVNode("div", _hoisted_14, [
              _cache[8] || (_cache[8] = createBaseVNode("span", { class: "chip-label" }, "下载速度", -1)),
              createBaseVNode("span", _hoisted_15, [
                createTextVNode(toDisplayString(result.value ? result.value.down.toFixed(1) : "--"), 1),
                _cache[7] || (_cache[7] = createBaseVNode("small", null, "Mbps", -1))
              ])
            ]),
            createBaseVNode("div", _hoisted_16, [
              _cache[10] || (_cache[10] = createBaseVNode("span", { class: "chip-label" }, "上传速度", -1)),
              createBaseVNode("span", _hoisted_17, [
                createTextVNode(toDisplayString(result.value ? result.value.up.toFixed(1) : "--"), 1),
                _cache[9] || (_cache[9] = createBaseVNode("small", null, "Mbps", -1))
              ])
            ]),
            createBaseVNode("div", _hoisted_18, [
              _cache[11] || (_cache[11] = createBaseVNode("span", { class: "chip-label" }, "抖动/丢包", -1)),
              createBaseVNode("span", _hoisted_19, toDisplayString(result.value ? Math.round(result.value.jitter) + "ms " + result.value.loss + "%" : "--"), 1)
            ])
          ]),
          createBaseVNode("button", {
            class: "start-btn",
            disabled: testing.value,
            onClick: start
          }, toDisplayString(testing.value ? "测试中…" : result.value ? "重新测速" : "开始测速"), 9, _hoisted_20),
          testing.value ? (openBlock(), createElementBlock("button", {
            key: 0,
            class: "start-btn",
            onClick: cancel
          }, "取消测速")) : createCommentVNode("", true),
          error.value ? (openBlock(), createElementBlock("div", _hoisted_21, toDisplayString(error.value), 1)) : createCommentVNode("", true)
        ]),
        result.value ? (openBlock(), createElementBlock("div", _hoisted_22, [
          createBaseVNode("div", _hoisted_23, [
            _cache[12] || (_cache[12] = createBaseVNode("div", { class: "panel-title" }, [
              createBaseVNode("span", { class: "dot purple" }),
              createTextVNode(" 节点延迟")
            ], -1)),
            (openBlock(true), createElementBlock(Fragment, null, renderList(result.value.nodeLatencies, (n) => {
              return openBlock(), createElementBlock("div", {
                class: "node-row",
                key: n.name
              }, [
                createBaseVNode("span", _hoisted_24, toDisplayString(n.name), 1),
                createBaseVNode("span", {
                  class: normalizeClass(["node-ms", { na: n.ms === null }])
                }, toDisplayString(n.ms === null ? "无响应" : n.ms + "ms"), 3)
              ]);
            }), 128))
          ]),
          createBaseVNode("div", _hoisted_25, [
            _cache[13] || (_cache[13] = createBaseVNode("div", { class: "panel-title" }, [
              createBaseVNode("span", { class: "dot blue" }),
              createTextVNode(" DNS 解析")
            ], -1)),
            (openBlock(true), createElementBlock(Fragment, null, renderList(result.value.dns, (d) => {
              return openBlock(), createElementBlock("div", {
                class: "node-row",
                key: d.host
              }, [
                createBaseVNode("span", _hoisted_26, toDisplayString(d.host), 1),
                createBaseVNode("span", {
                  class: normalizeClass(["node-ms", { na: d.ms === null }])
                }, toDisplayString(d.ms === null ? "失败" : d.ms + "ms"), 3)
              ]);
            }), 128))
          ]),
          createBaseVNode("div", _hoisted_27, [
            _cache[17] || (_cache[17] = createBaseVNode("div", { class: "panel-title" }, [
              createBaseVNode("span", { class: "dot orange" }),
              createTextVNode(" 负载延迟")
            ], -1)),
            createBaseVNode("div", _hoisted_28, [
              _cache[14] || (_cache[14] = createBaseVNode("span", { class: "node-name" }, "空闲基线", -1)),
              createBaseVNode("span", _hoisted_29, toDisplayString(Math.round(result.value.minPing)) + "ms", 1)
            ]),
            createBaseVNode("div", _hoisted_30, [
              _cache[15] || (_cache[15] = createBaseVNode("span", { class: "node-name" }, "负载下", -1)),
              createBaseVNode("span", _hoisted_31, toDisplayString(result.value.loadedLatency === null ? "—" : Math.round(result.value.loadedLatency) + "ms"), 1)
            ]),
            createBaseVNode("div", _hoisted_32, [
              _cache[16] || (_cache[16] = createBaseVNode("span", { class: "node-name" }, "抬升", -1)),
              createBaseVNode("span", {
                class: normalizeClass(["node-ms", result.value.bufferbloat === "poor" ? "bad" : ""])
              }, toDisplayString(result.value.loadedLatencyDelta === null ? "—" : "+" + Math.round(result.value.loadedLatencyDelta) + "ms"), 3)
            ])
          ])
        ])) : createCommentVNode("", true),
        result.value ? (openBlock(), createElementBlock("div", _hoisted_33, [
          createBaseVNode("div", _hoisted_34, [
            createBaseVNode("span", {
              class: normalizeClass(["report-grade", result.value.grade])
            }, toDisplayString(gradeText.value), 3),
            createBaseVNode("span", _hoisted_35, toDisplayString(gradeSummary.value), 1)
          ]),
          createBaseVNode("ul", _hoisted_36, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(result.value.suggestions, (s, i) => {
              return openBlock(), createElementBlock("li", { key: i }, toDisplayString(s), 1);
            }), 128))
          ])
        ])) : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_37, [
          createVNode(TweakShelf, {
            files: ["NetDepthTweaks.json"],
            title: "网络深度优化",
            dangerNote: "DNS 预设三项互斥,同时只开一个;RSC/ECN 改动网络行为,可随时还原",
            overview: "",
            "device-probe": "network"
          })
        ])
      ]);
    };
  }
});
const NetworkTuner = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c13a90e7"]]);
export {
  NetworkTuner as default
};
