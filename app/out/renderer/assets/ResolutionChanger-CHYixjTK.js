import { t as defineComponent, aD as watch, a5 as openBlock, l as createElementBlock, i as createBaseVNode, q as createTextVNode, aG as withDirectives, aA as vModelText, az as vModelSelect, F as Fragment, ab as renderList, ak as toDisplayString, a9 as ref, g as computed, _ as _export_sfc, Y as onBeforeUnmount, k as createCommentVNode, a1 as onMounted, p as createStaticVNode, r as createVNode, S as normalizeClass, ax as vModelCheckbox, a7 as reactive } from "./main-DAqTdO6U.js";
import { r as resolutionAtHeight } from "./legacyInputTools-Cx_Or_Ch.js";
/* empty css                     */
const _hoisted_1$2 = {
  class: "input-tool",
  "aria-labelledby": "resolution-calculator-title"
};
const _hoisted_2$2 = { class: "tool-fields" };
const _hoisted_3$2 = { class: "resolution-results" };
const _hoisted_4$2 = ["disabled", "onClick"];
const _hoisted_5$2 = {
  class: "tool-status",
  role: "status"
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ResolutionCalculator",
  setup(__props) {
    const width = ref("1920"), height = ref("1080"), ratio = ref("input"), feedback = ref("");
    const rows = computed(() => [1080, 1440, 2160].map((target) => ({ height: target, result: resolutionAtHeight(width.value, height.value, target, ratio.value) })));
    watch([width, height, ratio], () => {
      feedback.value = "";
    });
    async function copy(result) {
      if (!result) return;
      const text = `${result.width}x${result.height}`;
      try {
        await navigator.clipboard.writeText(text);
        feedback.value = `已复制 ${text}`;
      } catch {
        feedback.value = "复制失败，请手动复制上方分辨率";
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("section", _hoisted_1$2, [
        _cache[7] || (_cache[7] = createBaseVNode("div", { class: "tool-heading" }, [
          createBaseVNode("div", null, [
            createBaseVNode("h3", { id: "resolution-calculator-title" }, "分辨率比例换算"),
            createBaseVNode("p", null, "按当前宽高比或指定比例，计算不同高度的分辨率。")
          ]),
          createBaseVNode("span", { class: "tool-badge" }, "比例计算")
        ], -1)),
        createBaseVNode("div", _hoisted_2$2, [
          createBaseVNode("label", null, [
            _cache[3] || (_cache[3] = createTextVNode("参考宽度", -1)),
            withDirectives(createBaseVNode("input", {
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => width.value = $event),
              "aria-label": "参考宽度",
              type: "number",
              min: "320",
              max: "10000",
              step: "1"
            }, null, 512), [
              [vModelText, width.value]
            ])
          ]),
          createBaseVNode("label", null, [
            _cache[4] || (_cache[4] = createTextVNode("参考高度", -1)),
            withDirectives(createBaseVNode("input", {
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => height.value = $event),
              "aria-label": "参考高度",
              type: "number",
              min: "320",
              max: "10000",
              step: "1"
            }, null, 512), [
              [vModelText, height.value]
            ])
          ]),
          createBaseVNode("label", null, [
            _cache[6] || (_cache[6] = createTextVNode("目标比例", -1)),
            withDirectives(createBaseVNode("select", {
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => ratio.value = $event),
              "aria-label": "目标比例"
            }, [..._cache[5] || (_cache[5] = [
              createBaseVNode("option", { value: "input" }, "跟随输入宽高比", -1),
              createBaseVNode("option", { value: "4:3" }, "4:3", -1),
              createBaseVNode("option", { value: "16:9" }, "16:9", -1),
              createBaseVNode("option", { value: "16:10" }, "16:10", -1)
            ])], 512), [
              [vModelSelect, ratio.value]
            ])
          ])
        ]),
        createBaseVNode("div", _hoisted_3$2, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(rows.value, (row) => {
            return openBlock(), createElementBlock("div", {
              key: row.height,
              class: "resolution-result"
            }, [
              createBaseVNode("span", null, toDisplayString(row.height) + " 高度", 1),
              createBaseVNode("strong", null, toDisplayString(row.result ? `${row.result.width} × ${row.result.height}` : "输入无效或结果超出范围"), 1),
              createBaseVNode("button", {
                disabled: !row.result,
                onClick: ($event) => copy(row.result)
              }, "复制 " + toDisplayString(row.result ? `${row.result.width}x${row.height}` : "结果"), 9, _hoisted_4$2)
            ]);
          }), 128))
        ]),
        createBaseVNode("p", _hoisted_5$2, toDisplayString(feedback.value), 1),
        _cache[8] || (_cache[8] = createBaseVNode("p", { class: "tool-note" }, "输入和输出范围为 320–10000 整数像素，结果宽度取最近的偶数。此处仅计算和复制，不切换显示模式；使用前需确认显示器与驱动支持。", -1))
      ]);
    };
  }
});
const ResolutionCalculator = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-d5ac395e"]]);
const _hoisted_1$1 = { class: "display-check-panel" };
const _hoisted_2$1 = { class: "check-heading" };
const _hoisted_3$1 = { class: "check-actions" };
const _hoisted_4$1 = ["disabled"];
const _hoisted_5$1 = ["disabled", "onClick"];
const _hoisted_6$1 = {
  key: 0,
  role: "status"
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "DisplayCheckPanel",
  setup(__props) {
    const displays = ref([]);
    const busy = ref(false);
    const message = ref("");
    let disposed = false;
    async function refresh() {
      busy.value = true;
      try {
        displays.value = await window.sysApi.listCheckDisplays();
        message.value = displays.value.length ? "" : "没有读到显示器，请连接后刷新。";
      } catch {
        message.value = "显示器读取失败，请重试。";
      } finally {
        busy.value = false;
      }
    }
    async function start(id) {
      busy.value = true;
      try {
        const result = await window.sysApi.openDisplayCheck(id);
        if (disposed) return;
        message.value = result.success ? "检测窗口已打开：方向键或空格翻页，Esc 退出。" : result.error || "打开失败";
      } catch {
        message.value = "检测窗口打开失败，请重试。";
      } finally {
        busy.value = false;
      }
    }
    async function close() {
      try {
        await window.sysApi.closeDisplayCheck();
        message.value = "检测窗口已关闭。";
      } catch {
        message.value = "关闭失败，请在检测窗口按 Esc。";
      }
    }
    onBeforeUnmount(() => {
      disposed = true;
      window.sysApi?.closeDisplayCheck?.().catch(() => {
      });
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("section", _hoisted_1$1, [
        createBaseVNode("div", _hoisted_2$1, [
          _cache[0] || (_cache[0] = createBaseVNode("div", null, [
            createBaseVNode("h3", null, "显示器检测"),
            createBaseVNode("p", null, "9 张纯色 · 13 张图案 · 坏点、漏光、灰阶与几何检查")
          ], -1)),
          createBaseVNode("div", _hoisted_3$1, [
            createBaseVNode("button", {
              disabled: busy.value,
              onClick: refresh
            }, toDisplayString(busy.value ? "处理中…" : "读取显示器"), 9, _hoisted_4$1),
            createBaseVNode("button", { onClick: close }, "关闭检测")
          ])
        ]),
        (openBlock(true), createElementBlock(Fragment, null, renderList(displays.value, (d) => {
          return openBlock(), createElementBlock("div", {
            key: d.id,
            class: "check-display"
          }, [
            createBaseVNode("div", null, [
              createBaseVNode("strong", null, toDisplayString(d.name) + toDisplayString(d.primary ? " · 主显示器" : ""), 1),
              createBaseVNode("p", null, toDisplayString(d.width) + " × " + toDisplayString(d.height) + " · " + toDisplayString(d.refreshRate > 0 ? d.refreshRate + " Hz" : "刷新率未知") + " · 缩放 " + toDisplayString(Math.round(d.scaleFactor * 100)) + "%", 1)
            ]),
            createBaseVNode("button", {
              disabled: busy.value,
              onClick: ($event) => start(d.id)
            }, "开始检测", 8, _hoisted_5$1)
          ]);
        }), 128)),
        _cache[1] || (_cache[1] = createBaseVNode("p", { class: "check-guide" }, "在需要检查的屏幕打开全屏测试画面，← → / 空格翻页，Esc 退出。纯色检查亮暗点，灰阶检查层次，网格检查边缘裁切。检测不修改显示设置。", -1)),
        message.value ? (openBlock(), createElementBlock("p", _hoisted_6$1, toDisplayString(message.value), 1)) : createCommentVNode("", true)
      ]);
    };
  }
});
const DisplayCheckPanel = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-a86a7669"]]);
const _hoisted_1 = {
  "data-tour": "resolution-changer",
  class: "page"
};
const _hoisted_2 = { class: "content-grid" };
const _hoisted_3 = { class: "card" };
const _hoisted_4 = { class: "info-list" };
const _hoisted_5 = { class: "info-item" };
const _hoisted_6 = { class: "iv" };
const _hoisted_7 = { class: "info-item" };
const _hoisted_8 = { class: "iv gold" };
const _hoisted_9 = { class: "info-item" };
const _hoisted_10 = { class: "iv" };
const _hoisted_11 = ["disabled"];
const _hoisted_12 = { class: "res-inputs" };
const _hoisted_13 = { class: "res-field" };
const _hoisted_14 = { class: "res-field" };
const _hoisted_15 = { class: "res-field" };
const _hoisted_16 = { class: "preset-grid" };
const _hoisted_17 = ["onClick"];
const _hoisted_18 = { class: "pn" };
const _hoisted_19 = { class: "pd" };
const _hoisted_20 = ["disabled"];
const _hoisted_21 = { class: "rt" };
const _hoisted_22 = { class: "card" };
const _hoisted_23 = { class: "toggle-list" };
const _hoisted_24 = { class: "toggle-info" };
const _hoisted_25 = { class: "tl" };
const _hoisted_26 = { class: "td" };
const _hoisted_27 = {
  key: 0,
  class: "na-tag"
};
const _hoisted_28 = { class: "switch" };
const _hoisted_29 = ["onUpdate:modelValue", "disabled"];
const _hoisted_30 = { class: "select-group" };
const _hoisted_31 = { class: "info-list" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ResolutionChanger",
  setup(__props) {
    const loading = ref(false);
    const scanning = ref(false);
    const currentRes = ref("未检测");
    const currentHz = ref(0);
    const displayMode = ref("全屏");
    const customW = ref(1920);
    const customH = ref(1080);
    const customHz = ref(60);
    const scalingMode = ref("aspect");
    const result = ref(null);
    const dispToggles = reactive([
      { key: "gsync", label: "G-Sync / FreeSync", desc: "自适应同步", value: false, available: false },
      { key: "hdr", label: "HDR 输出", desc: "高动态范围", value: false, available: false },
      { key: "10bit", label: "10-bit 色深", desc: "需要显示器支持", value: false, available: false },
      { key: "overclock", label: "显示器超频", desc: "超出出厂刷新率", value: false, available: false }
    ]);
    const presetRes = [
      { label: "1080P", w: 1920, h: 1080, hz: 60 },
      { label: "1080P 高刷", w: 1920, h: 1080, hz: 144 },
      { label: "2K", w: 2560, h: 1440, hz: 60 },
      { label: "2K 高刷", w: 2560, h: 1440, hz: 165 },
      { label: "4K", w: 3840, h: 2160, hz: 60 },
      { label: "超宽 2K", w: 3440, h: 1440, hz: 144 }
    ];
    const notes = [
      "修改分辨率前确认显示器支持该参数",
      "过高刷新率可能导致黑屏",
      "若设置后黑屏，请按 Win+Ctrl+Shift+B 重启显卡驱动，或重启电脑",
      "建议逐步提升刷新率测试稳定性"
    ];
    function selectRes(p) {
      customW.value = p.w;
      customH.value = p.h;
      customHz.value = p.hz;
    }
    async function detectDisplay() {
      scanning.value = true;
      try {
        if (!window.sysApi) return;
        const displays = await window.sysApi.getDisplayInfo();
        if (displays && displays.length > 0) {
          const d = displays[0];
          currentRes.value = `${d.width}×${d.height}`;
          currentHz.value = d.refreshRate || 60;
          displayMode.value = d.name || "显示器";
          customW.value = d.width;
          customH.value = d.height;
          customHz.value = d.refreshRate || 60;
        } else {
          currentRes.value = "检测失败";
        }
      } catch {
        currentRes.value = "检测异常";
      } finally {
        scanning.value = false;
      }
    }
    async function applyRes() {
      loading.value = true;
      try {
        if (!window.sysApi?.setDisplayMode) {
          result.value = { success: false, logs: ["✗ setDisplayMode API 不可用"] };
          return;
        }
        const w = Math.floor(Number(customW.value));
        const h = Math.floor(Number(customH.value));
        const hz = Math.floor(Number(customHz.value));
        if (!Number.isFinite(w) || w < 640 || w > 7680 || !Number.isFinite(h) || h < 480 || h > 4320 || !Number.isFinite(hz) || hz < 23 || hz > 480) {
          result.value = { success: false, logs: ["✗ 非法的分辨率/刷新率（宽度 640-7680，高度 480-4320，刷新率 23-480Hz）"] };
          return;
        }
        const r = await window.sysApi.setDisplayMode(w, h, hz);
        result.value = { success: !!r.success, logs: [r.success ? "✓ 分辨率已设置" : `✗ ${r.error || "设置失败"}`] };
        if (r.success) detectDisplay();
      } catch (e) {
        result.value = { success: false, logs: [`✗ ${e.message}`] };
      } finally {
        loading.value = false;
      }
    }
    onMounted(() => {
      detectDisplay();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        _cache[18] || (_cache[18] = createStaticVNode('<div class="page-header" data-v-0ba8900f><div class="page-icon" style="background:rgba(245,158,11,0.08);" data-v-0ba8900f><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="1.5" data-v-0ba8900f><rect x="2" y="3" width="20" height="14" rx="2" data-v-0ba8900f></rect><path d="M8 21h8M12 17v4" data-v-0ba8900f></path></svg></div><div data-v-0ba8900f><h2 class="page-title" data-v-0ba8900f>分辨率修改</h2><p class="page-desc" data-v-0ba8900f>宽高比换算 · 自定义分辨率、刷新率与显示模式设置</p></div></div>', 1)),
        createVNode(ResolutionCalculator),
        createVNode(DisplayCheckPanel),
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            _cache[10] || (_cache[10] = createBaseVNode("div", { class: "section-title" }, "当前显示设置", -1)),
            createBaseVNode("div", _hoisted_4, [
              createBaseVNode("div", _hoisted_5, [
                _cache[4] || (_cache[4] = createBaseVNode("span", { class: "il" }, "当前分辨率", -1)),
                createBaseVNode("span", _hoisted_6, toDisplayString(currentRes.value), 1)
              ]),
              createBaseVNode("div", _hoisted_7, [
                _cache[5] || (_cache[5] = createBaseVNode("span", { class: "il" }, "刷新率", -1)),
                createBaseVNode("span", _hoisted_8, toDisplayString(currentHz.value > 0 ? currentHz.value + " Hz" : "—"), 1)
              ]),
              createBaseVNode("div", _hoisted_9, [
                _cache[6] || (_cache[6] = createBaseVNode("span", { class: "il" }, "显示器", -1)),
                createBaseVNode("span", _hoisted_10, toDisplayString(displayMode.value), 1)
              ])
            ]),
            createBaseVNode("button", {
              class: "scan-btn",
              onClick: detectDisplay,
              disabled: scanning.value
            }, toDisplayString(scanning.value ? "检测中..." : "检测显示器"), 9, _hoisted_11),
            _cache[11] || (_cache[11] = createBaseVNode("div", {
              class: "section-title",
              style: { "margin-top": "16px" }
            }, "自定义分辨率", -1)),
            createBaseVNode("div", _hoisted_12, [
              createBaseVNode("div", _hoisted_13, [
                _cache[7] || (_cache[7] = createBaseVNode("span", { class: "rf" }, "宽度", -1)),
                withDirectives(createBaseVNode("input", {
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => customW.value = $event),
                  class: "ri",
                  type: "number",
                  min: "640",
                  max: "7680",
                  step: "2"
                }, null, 512), [
                  [
                    vModelText,
                    customW.value,
                    void 0,
                    { number: true }
                  ]
                ])
              ]),
              createBaseVNode("div", _hoisted_14, [
                _cache[8] || (_cache[8] = createBaseVNode("span", { class: "rf" }, "高度", -1)),
                withDirectives(createBaseVNode("input", {
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => customH.value = $event),
                  class: "ri",
                  type: "number",
                  min: "480",
                  max: "4320",
                  step: "2"
                }, null, 512), [
                  [
                    vModelText,
                    customH.value,
                    void 0,
                    { number: true }
                  ]
                ])
              ]),
              createBaseVNode("div", _hoisted_15, [
                _cache[9] || (_cache[9] = createBaseVNode("span", { class: "rf" }, "刷新率", -1)),
                withDirectives(createBaseVNode("input", {
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => customHz.value = $event),
                  class: "ri",
                  type: "number",
                  min: "30",
                  max: "500",
                  step: "1"
                }, null, 512), [
                  [
                    vModelText,
                    customHz.value,
                    void 0,
                    { number: true }
                  ]
                ])
              ])
            ]),
            createBaseVNode("div", _hoisted_16, [
              (openBlock(), createElementBlock(Fragment, null, renderList(presetRes, (p) => {
                return createBaseVNode("button", {
                  key: p.label,
                  class: "preset-btn",
                  onClick: ($event) => selectRes(p)
                }, [
                  createBaseVNode("span", _hoisted_18, toDisplayString(p.label), 1),
                  createBaseVNode("span", _hoisted_19, toDisplayString(p.w) + "×" + toDisplayString(p.h) + " @" + toDisplayString(p.hz) + "Hz", 1)
                ], 8, _hoisted_17);
              }), 64))
            ]),
            createBaseVNode("button", {
              class: "action-btn gold",
              onClick: applyRes,
              disabled: loading.value
            }, toDisplayString(loading.value ? "应用分辨率..." : "应用自定义分辨率"), 9, _hoisted_20),
            result.value ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: normalizeClass(["result-panel", result.value.success ? "success" : "error"])
            }, [
              createBaseVNode("div", _hoisted_21, toDisplayString(result.value.success ? "分辨率已更改" : "修改失败"), 1),
              (openBlock(true), createElementBlock(Fragment, null, renderList(result.value.logs, (l, i) => {
                return openBlock(), createElementBlock("div", {
                  key: i,
                  class: "log-line"
                }, toDisplayString(l), 1);
              }), 128))
            ], 2)) : createCommentVNode("", true)
          ]),
          createBaseVNode("div", _hoisted_22, [
            _cache[15] || (_cache[15] = createBaseVNode("div", { class: "section-title" }, "高级显示设置", -1)),
            createBaseVNode("div", _hoisted_23, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(dispToggles, (t) => {
                return openBlock(), createElementBlock("div", {
                  class: normalizeClass(["toggle-row", { na: !t.available }]),
                  key: t.key
                }, [
                  createBaseVNode("div", _hoisted_24, [
                    createBaseVNode("span", _hoisted_25, toDisplayString(t.label), 1),
                    createBaseVNode("span", _hoisted_26, toDisplayString(t.desc), 1),
                    !t.available ? (openBlock(), createElementBlock("span", _hoisted_27, "当前版本暂不支持")) : createCommentVNode("", true)
                  ]),
                  createBaseVNode("label", _hoisted_28, [
                    withDirectives(createBaseVNode("input", {
                      type: "checkbox",
                      "onUpdate:modelValue": ($event) => t.value = $event,
                      disabled: !t.available
                    }, null, 8, _hoisted_29), [
                      [vModelCheckbox, t.value]
                    ]),
                    _cache[12] || (_cache[12] = createBaseVNode("span", { class: "slider" }, null, -1))
                  ])
                ], 2);
              }), 128))
            ]),
            _cache[16] || (_cache[16] = createBaseVNode("div", {
              class: "section-title",
              style: { "margin-top": "16px" }
            }, "缩放模式", -1)),
            createBaseVNode("div", _hoisted_30, [
              withDirectives(createBaseVNode("select", {
                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => scalingMode.value = $event),
                class: "cyber-select",
                disabled: ""
              }, [..._cache[13] || (_cache[13] = [
                createBaseVNode("option", { value: "aspect" }, "保持纵横比", -1),
                createBaseVNode("option", { value: "fullscreen" }, "全屏拉伸", -1),
                createBaseVNode("option", { value: "noscale" }, "无缩放（居中）", -1),
                createBaseVNode("option", { value: "integer" }, "整数缩放", -1)
              ])], 512), [
                [vModelSelect, scalingMode.value]
              ]),
              _cache[14] || (_cache[14] = createBaseVNode("div", { class: "na-hint" }, "当前版本暂不支持", -1))
            ]),
            _cache[17] || (_cache[17] = createBaseVNode("div", {
              class: "section-title",
              style: { "margin-top": "16px" }
            }, "注意事项", -1)),
            createBaseVNode("div", _hoisted_31, [
              (openBlock(), createElementBlock(Fragment, null, renderList(notes, (n) => {
                return createBaseVNode("div", {
                  class: "info-row",
                  key: n
                }, toDisplayString(n), 1);
              }), 64))
            ])
          ])
        ])
      ]);
    };
  }
});
const ResolutionChanger = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0ba8900f"]]);
export {
  ResolutionChanger as default
};
