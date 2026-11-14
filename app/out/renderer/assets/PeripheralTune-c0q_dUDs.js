import { T as TweakShelf } from "./TweakShelf-BggrlQpq.js";
import { t as defineComponent, aD as watch, a1 as onMounted, $ as onDeactivated, Y as onBeforeUnmount, a5 as openBlock, l as createElementBlock, i as createBaseVNode, q as createTextVNode, aG as withDirectives, az as vModelSelect, ak as toDisplayString, F as Fragment, ab as renderList, V as normalizeStyle, S as normalizeClass, a9 as ref, a7 as reactive, g as computed, _ as _export_sfc, a3 as onUnmounted, aA as vModelText, k as createCommentVNode, as as unref, r as createVNode, p as createStaticVNode } from "./main-DAqTdO6U.js";
/* empty css                     */
import { s as sensitivityGames, c as convertSensitivity } from "./legacyInputTools-Cx_Or_Ch.js";
import { L as LocalInputPresets, s as sensitivityProfile } from "./LocalInputPresets-Cist2olO.js";
import "./index-CL4m76NE.js";
import "./StatusDot-C-XeYEe8.js";
import "./KeywordConfirm-CUMT0nLF.js";
const keyboardBlocks = [
  [
    [{ code: "Escape", label: "Esc" }, { code: "", label: "", w: 1 }, { code: "F1", label: "F1" }, { code: "F2", label: "F2" }, { code: "F3", label: "F3" }, { code: "F4", label: "F4" }, { code: "", label: "", w: 0.5 }, { code: "F5", label: "F5" }, { code: "F6", label: "F6" }, { code: "F7", label: "F7" }, { code: "F8", label: "F8" }, { code: "", label: "", w: 0.5 }, { code: "F9", label: "F9" }, { code: "F10", label: "F10" }, { code: "F11", label: "F11" }, { code: "F12", label: "F12" }],
    [{ code: "Backquote", label: "`" }, { code: "Digit1", label: "1" }, { code: "Digit2", label: "2" }, { code: "Digit3", label: "3" }, { code: "Digit4", label: "4" }, { code: "Digit5", label: "5" }, { code: "Digit6", label: "6" }, { code: "Digit7", label: "7" }, { code: "Digit8", label: "8" }, { code: "Digit9", label: "9" }, { code: "Digit0", label: "0" }, { code: "Minus", label: "-" }, { code: "Equal", label: "=" }, { code: "Backspace", label: "Backspace", w: 2 }],
    [{ code: "Tab", label: "Tab", w: 1.5 }, { code: "KeyQ", label: "Q" }, { code: "KeyW", label: "W" }, { code: "KeyE", label: "E" }, { code: "KeyR", label: "R" }, { code: "KeyT", label: "T" }, { code: "KeyY", label: "Y" }, { code: "KeyU", label: "U" }, { code: "KeyI", label: "I" }, { code: "KeyO", label: "O" }, { code: "KeyP", label: "P" }, { code: "BracketLeft", label: "[" }, { code: "BracketRight", label: "]" }, { code: "Backslash", label: "\\", w: 1.5 }],
    [{ code: "CapsLock", label: "Caps", w: 1.75 }, { code: "KeyA", label: "A" }, { code: "KeyS", label: "S" }, { code: "KeyD", label: "D" }, { code: "KeyF", label: "F" }, { code: "KeyG", label: "G" }, { code: "KeyH", label: "H" }, { code: "KeyJ", label: "J" }, { code: "KeyK", label: "K" }, { code: "KeyL", label: "L" }, { code: "Semicolon", label: ";" }, { code: "Quote", label: "'" }, { code: "Enter", label: "Enter", w: 2.25 }],
    [{ code: "ShiftLeft", label: "左 Shift", w: 2.25 }, { code: "KeyZ", label: "Z" }, { code: "KeyX", label: "X" }, { code: "KeyC", label: "C" }, { code: "KeyV", label: "V" }, { code: "KeyB", label: "B" }, { code: "KeyN", label: "N" }, { code: "KeyM", label: "M" }, { code: "Comma", label: "," }, { code: "Period", label: "." }, { code: "Slash", label: "/" }, { code: "ShiftRight", label: "右 Shift", w: 2.75 }],
    [{ code: "ControlLeft", label: "左 Ctrl", w: 1.25 }, { code: "MetaLeft", label: "左 Win", w: 1.25, system: true }, { code: "AltLeft", label: "左 Alt", w: 1.25 }, { code: "Space", label: "Space", w: 6.25 }, { code: "AltRight", label: "右 Alt", w: 1.25 }, { code: "MetaRight", label: "右 Win", w: 1.25, system: true }, { code: "ContextMenu", label: "菜单", w: 1.25 }, { code: "ControlRight", label: "右 Ctrl", w: 1.25 }]
  ],
  [
    [{ code: "PrintScreen", label: "PrtSc", system: true }, { code: "ScrollLock", label: "ScrLk" }, { code: "Pause", label: "Pause" }],
    [{ code: "Insert", label: "Ins" }, { code: "Home", label: "Home" }, { code: "PageUp", label: "PgUp" }],
    [{ code: "Delete", label: "Del" }, { code: "End", label: "End" }, { code: "PageDown", label: "PgDn" }],
    [{ code: "", label: "" }, { code: "", label: "" }, { code: "", label: "" }],
    [{ code: "", label: "" }, { code: "ArrowUp", label: "↑" }, { code: "", label: "" }],
    [{ code: "ArrowLeft", label: "←" }, { code: "ArrowDown", label: "↓" }, { code: "ArrowRight", label: "→" }]
  ],
  [
    [{ code: "NumLock", label: "Num" }, { code: "NumpadDivide", label: "/" }, { code: "NumpadMultiply", label: "*" }, { code: "NumpadSubtract", label: "-" }],
    [{ code: "Numpad7", label: "7" }, { code: "Numpad8", label: "8" }, { code: "Numpad9", label: "9" }, { code: "NumpadAdd", label: "+" }],
    [{ code: "Numpad4", label: "4" }, { code: "Numpad5", label: "5" }, { code: "Numpad6", label: "6" }, { code: "", label: "" }],
    [{ code: "Numpad1", label: "1" }, { code: "Numpad2", label: "2" }, { code: "Numpad3", label: "3" }, { code: "NumpadEnter", label: "Enter" }],
    [{ code: "Numpad0", label: "0", w: 2 }, { code: "NumpadDecimal", label: "." }, { code: "", label: "" }]
  ]
];
const knownCodes = new Set(keyboardBlocks.flat(2).map((key) => key.code).filter(Boolean));
function createKeyboardTestState() {
  return {
    held: /* @__PURE__ */ new Set(),
    tested: /* @__PURE__ */ new Set(),
    counts: /* @__PURE__ */ new Map(),
    down(code, repeat) {
      if (!knownCodes.has(code) || repeat || this.held.has(code)) return false;
      this.held.add(code);
      this.tested.add(code);
      this.counts.set(code, (this.counts.get(code) ?? 0) + 1);
      return true;
    },
    up(code) {
      this.held.delete(code);
    },
    releaseAll() {
      this.held.clear();
    },
    reset() {
      this.held.clear();
      this.tested.clear();
      this.counts.clear();
    }
  };
}
const _hoisted_1$3 = {
  class: "input-tool",
  "aria-labelledby": "keyboard-test-title"
};
const _hoisted_2$2 = { class: "tool-heading" };
const _hoisted_3$2 = { class: "inline-field" };
const _hoisted_4$2 = { class: "tool-actions" };
const _hoisted_5$2 = {
  class: "tool-status",
  role: "status"
};
const _hoisted_6$2 = { class: "keyboard-layout" };
const _hoisted_7$2 = ["data-code", "title"];
const _hoisted_8$2 = { class: "tool-metrics" };
const _hoisted_9$1 = { "data-testid": "keyboard-progress" };
const _hoisted_10$1 = { "data-testid": "keyboard-held" };
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "KeyboardTestPanel",
  setup(__props) {
    const layout = ref("full"), active = ref(false), lastKey = ref("");
    const stage = ref(null);
    const state = reactive(createKeyboardTestState());
    const blocks = computed(() => layout.value === "full" ? keyboardBlocks : keyboardBlocks.slice(0, 2));
    const keys = computed(() => blocks.value.flat(2).filter((key) => key.code));
    const testable = computed(() => keys.value.filter((key) => !key.system));
    const testedCount = computed(() => testable.value.filter((key) => state.tested.has(key.code)).length);
    const heldLabels = computed(() => keys.value.filter((key) => state.held.has(key.code)).map((key) => key.label).join(" + "));
    function start() {
      stage.value?.focus();
      active.value = true;
    }
    function pause() {
      active.value = false;
      state.releaseAll();
    }
    function stop() {
      stage.value?.blur();
      pause();
    }
    function reset() {
      stop();
      state.reset();
      lastKey.value = "";
    }
    function keydown(event) {
      if (!active.value) return;
      event.preventDefault();
      event.stopPropagation();
      if (state.down(event.code, event.repeat)) lastKey.value = event.code;
      if (event.code === "Escape") stop();
    }
    function keyup(event) {
      if (!active.value) return;
      event.preventDefault();
      event.stopPropagation();
      state.up(event.code);
    }
    function visibilityChanged() {
      if (document.hidden) stop();
    }
    watch(layout, reset);
    onMounted(() => {
      window.addEventListener("blur", stop);
      document.addEventListener("visibilitychange", visibilityChanged);
    });
    onDeactivated(reset);
    onBeforeUnmount(() => {
      reset();
      window.removeEventListener("blur", stop);
      document.removeEventListener("visibilitychange", visibilityChanged);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("section", _hoisted_1$3, [
        createBaseVNode("div", _hoisted_2$2, [
          _cache[4] || (_cache[4] = createBaseVNode("div", null, [
            createBaseVNode("h3", { id: "keyboard-test-title" }, "键盘按键测试"),
            createBaseVNode("p", null, "检查按键、组合键与左右修饰键的响应。")
          ], -1)),
          createBaseVNode("label", _hoisted_3$2, [
            _cache[3] || (_cache[3] = createTextVNode("键盘布局 ", -1)),
            withDirectives(createBaseVNode("select", {
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => layout.value = $event),
              "aria-label": "键盘布局"
            }, [..._cache[2] || (_cache[2] = [
              createBaseVNode("option", { value: "full" }, "104 键", -1),
              createBaseVNode("option", { value: "tkl" }, "87 键", -1)
            ])], 512), [
              [vModelSelect, layout.value]
            ])
          ])
        ]),
        createBaseVNode("div", _hoisted_4$2, [
          createBaseVNode("button", {
            class: "primary",
            onClick: start
          }, "开始测试"),
          createBaseVNode("button", { onClick: reset }, "清空记录"),
          createBaseVNode("span", _hoisted_5$2, toDisplayString(active.value ? "正在接收按键 · Esc 退出测试" : "点击开始或下方键盘，进入测试"), 1)
        ]),
        createBaseVNode("div", {
          ref_key: "stage",
          ref: stage,
          class: normalizeClass(["keyboard-stage", { listening: active.value }]),
          tabindex: "0",
          role: "group",
          "aria-label": "键盘测试区域，按 Esc 退出",
          onFocus: _cache[1] || (_cache[1] = ($event) => active.value = true),
          onBlur: pause,
          onKeydown: keydown,
          onKeyup: keyup,
          onPointerdown: start
        }, [
          createBaseVNode("div", _hoisted_6$2, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(blocks.value, (block, blockIndex) => {
              return openBlock(), createElementBlock("div", {
                key: blockIndex,
                class: "keyboard-block"
              }, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(block, (row, rowIndex) => {
                  return openBlock(), createElementBlock("div", {
                    key: rowIndex,
                    class: "keyboard-row"
                  }, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(row, (key, keyIndex) => {
                      return openBlock(), createElementBlock("span", {
                        key: keyIndex,
                        "data-code": key.code || void 0,
                        class: normalizeClass(["keycap", { gap: !key.code, system: key.system, tested: state.tested.has(key.code), held: state.held.has(key.code) }]),
                        style: normalizeStyle({ flexGrow: key.w ?? 1, flexBasis: `${(key.w ?? 1) * 30}px` }),
                        title: key.code ? `${key.label} · ${state.counts.get(key.code) ?? 0} 次` : void 0
                      }, toDisplayString(key.label), 15, _hoisted_7$2);
                    }), 128))
                  ]);
                }), 128))
              ]);
            }), 128))
          ])
        ], 34),
        createBaseVNode("div", _hoisted_8$2, [
          createBaseVNode("div", null, [
            _cache[5] || (_cache[5] = createBaseVNode("span", null, "已测试常规按键", -1)),
            createBaseVNode("strong", _hoisted_9$1, toDisplayString(testedCount.value) + " / " + toDisplayString(testable.value.length), 1)
          ]),
          createBaseVNode("div", null, [
            _cache[6] || (_cache[6] = createBaseVNode("span", null, "正在按住", -1)),
            createBaseVNode("strong", _hoisted_10$1, toDisplayString(heldLabels.value || "无"), 1)
          ]),
          createBaseVNode("div", null, [
            _cache[7] || (_cache[7] = createBaseVNode("span", null, "最近按键", -1)),
            createBaseVNode("strong", null, toDisplayString(lastKey.value || "等待输入"), 1)
          ])
        ]),
        _cache[8] || (_cache[8] = createBaseVNode("p", { class: "tool-note" }, "蓝色表示按住，绿色表示已测。Win、截图和部分系统组合键可能由 Windows 接管，Fn 通常不会产生页面按键事件，未亮起不代表损坏。记录仅保留在本页。", -1))
      ]);
    };
  }
});
const KeyboardTestPanel = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-a7c8ac46"]]);
function validateDpiSamples(samples, distanceCm) {
  if (!Number.isFinite(distanceCm) || distanceCm < 10 || distanceCm > 100) return { ok: false, reason: "测量距离要在 10–100 厘米之间。" };
  if (samples.length !== 3) return { ok: false, reason: "需要完成 3 次测量。" };
  const counts = samples.map((sample) => Math.abs(sample.x));
  for (let i = 0; i < samples.length; i++) {
    const sample = samples[i];
    if (!Number.isFinite(sample.x) || !Number.isFinite(sample.y) || counts[i] === 0) return { ok: false, reason: `第 ${i + 1} 次计数无效。`, sampleIndex: i };
    if (Math.abs(sample.y) / counts[i] > 0.2) return { ok: false, reason: `第 ${i + 1} 次纵向偏移超过 20%，请沿直线推。`, sampleIndex: i };
  }
  const median = counts.slice().sort((a, b) => a - b)[1];
  const deviations = counts.map((count) => Math.abs(count - median)), largest = Math.max(...deviations);
  if (largest / median > 0.05) return { ok: false, reason: "三次计数离散超过 5%，请重测差异最大的那次。", sampleIndex: deviations.indexOf(largest) };
  return { ok: true, medianCounts: median };
}
function measuredDpi(samples, distanceCm, declaredDpi) {
  const validation = validateDpiSamples(samples, distanceCm);
  if (!validation.ok || !Number.isFinite(declaredDpi) || declaredDpi <= 0) return null;
  const dpi = Math.round(validation.medianCounts / (distanceCm / 2.54));
  const deviationPercent = Math.round((dpi - declaredDpi) / declaredDpi * 1e3) / 10;
  return { dpi, deviationPercent, match: Math.abs(deviationPercent) <= 5 };
}
const _hoisted_1$2 = { class: "dpi-check" };
const _hoisted_2$1 = { class: "tool-fields" };
const _hoisted_3$1 = ["disabled"];
const _hoisted_4$1 = { class: "sample-list" };
const _hoisted_5$1 = { class: "tool-actions" };
const _hoisted_6$1 = ["disabled"];
const _hoisted_7$1 = {
  key: 0,
  class: "tool-status",
  role: "status",
  "data-testid": "dpi-result"
};
const _hoisted_8$1 = {
  key: 1,
  class: "tool-error",
  role: "status"
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "DpiCalibration",
  props: {
    dpi: {}
  },
  emits: ["apply"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const distance = ref(20), samples = ref([]), busy = ref(false), error = ref("");
    const validDistance = computed(() => Number.isFinite(distance.value) && distance.value >= 10 && distance.value <= 100);
    const validation = computed(() => validateDpiSamples(samples.value, distance.value));
    const result = computed(() => measuredDpi(samples.value, distance.value, props.dpi));
    let disposed = false;
    async function measure() {
      if (busy.value || !validDistance.value || samples.value.length >= 3) return;
      if (!window.sensitivityApi) {
        error.value = "当前预览无法使用鼠标测量，请在桌面应用内打开。";
        return;
      }
      busy.value = true;
      error.value = "";
      try {
        const sample = await window.sensitivityApi.measure();
        if (!disposed) samples.value.push({ x: sample.x, y: sample.y });
      } catch (e) {
        if (!disposed) error.value = e instanceof Error ? e.message : String(e);
      } finally {
        if (!disposed) busy.value = false;
      }
    }
    async function cancel() {
      try {
        await window.sensitivityApi?.cancel();
      } catch (e) {
        error.value = String(e);
      }
    }
    function reset() {
      samples.value = [];
      error.value = "";
    }
    function retry() {
      const i = validation.value.sampleIndex;
      if (i !== void 0) {
        samples.value.splice(i, 1);
        void measure();
      }
    }
    onUnmounted(() => {
      disposed = true;
      if (busy.value) void cancel();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$2, [
        _cache[3] || (_cache[3] = createBaseVNode("h4", null, "实际 DPI 自检", -1)),
        _cache[4] || (_cache[4] = createBaseVNode("p", { class: "tool-note" }, "用尺子标出一段直线。每次点击测量后，把鼠标放到起点，沿直线推到终点，按 Ctrl+Alt+F8 结束。重复三次，以中位计数计算 DPI。", -1)),
        createBaseVNode("div", _hoisted_2$1, [
          createBaseVNode("label", null, [
            _cache[2] || (_cache[2] = createTextVNode("测量距离（厘米）", -1)),
            withDirectives(createBaseVNode("input", {
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => distance.value = $event),
              "aria-label": "测量距离（厘米）",
              type: "number",
              min: "10",
              max: "100",
              disabled: busy.value || samples.value.length > 0
            }, null, 8, _hoisted_3$1), [
              [
                vModelText,
                distance.value,
                void 0,
                { number: true }
              ]
            ])
          ])
        ]),
        createBaseVNode("ol", _hoisted_4$1, [
          (openBlock(), createElementBlock(Fragment, null, renderList(3, (index) => {
            return createBaseVNode("li", { key: index }, "第 " + toDisplayString(index) + " 次：" + toDisplayString(samples.value[index - 1] ? `水平 ${samples.value[index - 1].x} / 纵向 ${samples.value[index - 1].y} counts` : "尚未测量"), 1);
          }), 64))
        ]),
        createBaseVNode("div", _hoisted_5$1, [
          createBaseVNode("button", {
            disabled: busy.value || samples.value.length === 3 || !validDistance.value,
            onClick: measure
          }, toDisplayString(busy.value ? "测量中，按 Ctrl+Alt+F8 结束" : `测量第 ${samples.value.length + 1} 次`), 9, _hoisted_6$1),
          busy.value ? (openBlock(), createElementBlock("button", {
            key: 0,
            onClick: cancel
          }, "取消测量")) : createCommentVNode("", true),
          samples.value.length && !busy.value ? (openBlock(), createElementBlock("button", {
            key: 1,
            onClick: reset
          }, "全部重测")) : createCommentVNode("", true),
          samples.value.length === 3 && !validation.value.ok && validation.value.sampleIndex !== void 0 ? (openBlock(), createElementBlock("button", {
            key: 2,
            onClick: retry
          }, "重测异常样本")) : createCommentVNode("", true),
          result.value ? (openBlock(), createElementBlock("button", {
            key: 3,
            onClick: _cache[1] || (_cache[1] = ($event) => emit("apply", result.value.dpi))
          }, "使用实测 DPI")) : createCommentVNode("", true)
        ]),
        result.value ? (openBlock(), createElementBlock("p", _hoisted_7$1, "实测约 " + toDisplayString(result.value.dpi) + " DPI，与填写值偏差 " + toDisplayString(result.value.deviationPercent) + "%。" + toDisplayString(result.value.match ? "与当前档位基本一致。" : "请先确认鼠标驱动档位和测量距离，再决定是否采用。"), 1)) : createCommentVNode("", true),
        error.value || samples.value.length === 3 && !validation.value.ok ? (openBlock(), createElementBlock("p", _hoisted_8$1, toDisplayString(error.value || validation.value.reason), 1)) : createCommentVNode("", true)
      ]);
    };
  }
});
const DpiCalibration = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-583aabe2"]]);
const _hoisted_1$1 = {
  class: "input-tool",
  "aria-labelledby": "sensitivity-title"
};
const _hoisted_2 = { class: "sensitivity-columns" };
const _hoisted_3 = { class: "tool-fields" };
const _hoisted_4 = ["value"];
const _hoisted_5 = ["min", "max"];
const _hoisted_6 = { class: "tool-fields" };
const _hoisted_7 = ["value"];
const _hoisted_8 = { class: "conversion-value" };
const _hoisted_9 = { "data-testid": "sensitivity-result" };
const _hoisted_10 = {
  key: 0,
  class: "tool-error",
  role: "status"
};
const _hoisted_11 = {
  key: 1,
  class: "tool-error",
  role: "status"
};
const _hoisted_12 = {
  key: 2,
  class: "tool-metrics"
};
const _hoisted_13 = { class: "tool-actions" };
const _hoisted_14 = ["disabled"];
const _hoisted_15 = {
  class: "tool-status",
  role: "status"
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "SensitivityConverter",
  setup(__props) {
    const fromId = ref("cs2"), toId = ref("valorant");
    const fromDpi = ref("800"), toDpi = ref("800"), sensitivity = ref("1"), feedback = ref("");
    const fromGame = computed(() => sensitivityGames.find((game) => game.id === fromId.value));
    const toGame = computed(() => sensitivityGames.find((game) => game.id === toId.value));
    const result = computed(() => convertSensitivity(fromId.value, toId.value, sensitivity.value, fromDpi.value, toDpi.value));
    watch([fromId, toId, sensitivity, fromDpi, toDpi], () => {
      feedback.value = "";
    });
    const profile = computed(() => ({ fromId: fromId.value, toId: toId.value, fromDpi: Number(fromDpi.value), toDpi: Number(toDpi.value), sensitivity: Number(sensitivity.value) }));
    function loadProfile(value) {
      fromId.value = String(value.fromId);
      toId.value = String(value.toId);
      fromDpi.value = String(value.fromDpi);
      toDpi.value = String(value.toDpi);
      sensitivity.value = String(value.sensitivity);
    }
    async function copy() {
      if (!result.value || result.value.outOfRange) return;
      try {
        await navigator.clipboard.writeText(String(result.value.sensitivity));
        feedback.value = "目标灵敏度已复制";
      } catch {
        feedback.value = "复制失败，请手动复制上方数值";
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("section", _hoisted_1$1, [
        _cache[15] || (_cache[15] = createBaseVNode("div", { class: "tool-heading" }, [
          createBaseVNode("div", null, [
            createBaseVNode("h3", { id: "sensitivity-title" }, "游戏灵敏度换算"),
            createBaseVNode("p", null, "按相同的 360° 转身距离换算，支持更换鼠标 DPI。")
          ]),
          createBaseVNode("span", { class: "tool-badge" }, "cm / 360°")
        ], -1)),
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("label", null, [
              _cache[6] || (_cache[6] = createTextVNode("来源游戏", -1)),
              withDirectives(createBaseVNode("select", {
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => fromId.value = $event),
                "aria-label": "来源游戏"
              }, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(unref(sensitivityGames), (game) => {
                  return openBlock(), createElementBlock("option", {
                    key: game.id,
                    value: game.id
                  }, toDisplayString(game.name), 9, _hoisted_4);
                }), 128))
              ], 512), [
                [vModelSelect, fromId.value]
              ])
            ]),
            createBaseVNode("label", null, [
              _cache[7] || (_cache[7] = createTextVNode("来源 DPI", -1)),
              withDirectives(createBaseVNode("input", {
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => fromDpi.value = $event),
                "aria-label": "来源 DPI",
                type: "number",
                min: "1",
                max: "100000"
              }, null, 512), [
                [vModelText, fromDpi.value]
              ])
            ]),
            createBaseVNode("label", null, [
              _cache[8] || (_cache[8] = createTextVNode("游戏内灵敏度", -1)),
              withDirectives(createBaseVNode("input", {
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => sensitivity.value = $event),
                "aria-label": "游戏内灵敏度",
                type: "number",
                min: fromGame.value.min,
                max: fromGame.value.max,
                step: "any"
              }, null, 8, _hoisted_5), [
                [vModelText, sensitivity.value]
              ])
            ])
          ]),
          createBaseVNode("div", _hoisted_6, [
            createBaseVNode("label", null, [
              _cache[9] || (_cache[9] = createTextVNode("目标游戏", -1)),
              withDirectives(createBaseVNode("select", {
                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => toId.value = $event),
                "aria-label": "目标游戏"
              }, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(unref(sensitivityGames), (game) => {
                  return openBlock(), createElementBlock("option", {
                    key: game.id,
                    value: game.id
                  }, toDisplayString(game.name), 9, _hoisted_7);
                }), 128))
              ], 512), [
                [vModelSelect, toId.value]
              ])
            ]),
            createBaseVNode("label", null, [
              _cache[10] || (_cache[10] = createTextVNode("目标 DPI", -1)),
              withDirectives(createBaseVNode("input", {
                "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => toDpi.value = $event),
                "aria-label": "目标 DPI",
                type: "number",
                min: "1",
                max: "100000"
              }, null, 512), [
                [vModelText, toDpi.value]
              ])
            ]),
            createBaseVNode("div", _hoisted_8, [
              _cache[11] || (_cache[11] = createBaseVNode("span", null, "目标灵敏度", -1)),
              createBaseVNode("strong", _hoisted_9, toDisplayString(result.value?.sensitivity ?? "—"), 1)
            ])
          ])
        ]),
        !result.value ? (openBlock(), createElementBlock("p", _hoisted_10, "请填写有效数值：DPI 大于 0 且不超过 100000，来源灵敏度范围 " + toDisplayString(fromGame.value.min) + "–" + toDisplayString(fromGame.value.max) + "。", 1)) : result.value.outOfRange ? (openBlock(), createElementBlock("p", _hoisted_11, "换算结果超出目标游戏的参考范围 " + toDisplayString(toGame.value.min) + "–" + toDisplayString(toGame.value.max) + "，请调整目标 DPI 后再换算。", 1)) : createCommentVNode("", true),
        result.value ? (openBlock(), createElementBlock("div", _hoisted_12, [
          createBaseVNode("div", null, [
            _cache[12] || (_cache[12] = createBaseVNode("span", null, "来源转一圈", -1)),
            createBaseVNode("strong", null, toDisplayString(result.value.sourceCm.toFixed(2)) + " cm", 1)
          ]),
          createBaseVNode("div", null, [
            _cache[13] || (_cache[13] = createBaseVNode("span", null, "目标转一圈", -1)),
            createBaseVNode("strong", null, toDisplayString(result.value.targetCm?.toFixed(2) ?? "—") + " cm", 1)
          ]),
          createBaseVNode("div", null, [
            _cache[14] || (_cache[14] = createBaseVNode("span", null, "数值取整偏差", -1)),
            createBaseVNode("strong", null, toDisplayString(result.value.driftPercent.toFixed(2)) + "%", 1)
          ])
        ])) : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_13, [
          createBaseVNode("button", {
            disabled: !result.value || result.value.outOfRange,
            onClick: copy
          }, "复制目标灵敏度", 8, _hoisted_14),
          createBaseVNode("span", _hoisted_15, toDisplayString(feedback.value), 1)
        ]),
        createVNode(LocalInputPresets, {
          title: "灵敏度",
          kind: "supreme-sensitivity-presets",
          value: profile.value,
          validate: unref(sensitivityProfile),
          onLoad: loadProfile
        }, null, 8, ["value", "validate"]),
        createVNode(DpiCalibration, {
          dpi: Number(fromDpi.value),
          onApply: _cache[5] || (_cache[5] = ($event) => fromDpi.value = String($event))
        }, null, 8, ["dpi"]),
        _cache[16] || (_cache[16] = createBaseVNode("p", { class: "tool-note" }, "适用于固定灵敏度下的腰射转身。开镜倍率、鼠标加速度和自定义 yaw 会改变结果。参考系数沿用旧版工具，应用到游戏后请实测确认；换算不会修改游戏配置。", -1))
      ]);
    };
  }
});
const SensitivityConverter = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-aba3cb8e"]]);
const _hoisted_1 = { class: "page peripheral-page" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PeripheralTune",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        _cache[0] || (_cache[0] = createStaticVNode('<div class="page-header" data-v-62946816><div class="page-icon" data-v-62946816><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="1.5" data-v-62946816><rect x="2" y="6" width="13" height="12" rx="2" data-v-62946816></rect><path d="M15 10h4l3 3v5h-7" data-v-62946816></path><circle cx="17.5" cy="17.5" r=".5" data-v-62946816></circle><circle cx="6" cy="12" r=".5" data-v-62946816></circle></svg></div><div class="page-title-block" data-v-62946816><h2 class="page-title" data-v-62946816>外设优化</h2><p class="page-desc" data-v-62946816>按键测试 · 灵敏度换算 · USB 电源 · 鼠标键盘响应</p></div></div>', 1)),
        createVNode(KeyboardTestPanel),
        createVNode(SensitivityConverter),
        createVNode(TweakShelf, {
          files: ["PeripheralTweaks.json"],
          title: "外设调优清单",
          dangerNote: "USB 电源管理改动可能影响外设供电稳定性,按需开启",
          overview: "",
          "device-probe": "peripheral"
        })
      ]);
    };
  }
});
const PeripheralTune = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-62946816"]]);
export {
  PeripheralTune as default
};
