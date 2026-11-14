import { t as defineComponent, aD as watch, a3 as onUnmounted, j as createBlock, aF as withCtx, ad as resolveComponent, a5 as openBlock, i as createBaseVNode, ak as toDisplayString, l as createElementBlock, k as createCommentVNode, ab as renderList, F as Fragment, aG as withDirectives, aA as vModelText, S as normalizeClass, a9 as ref, g as computed, _ as _export_sfc } from "./main-DAqTdO6U.js";
const _hoisted_1 = { class: "kw-head" };
const _hoisted_2 = { class: "kw-title" };
const _hoisted_3 = { class: "kw-body" };
const _hoisted_4 = {
  key: 0,
  class: "kw-detail"
};
const _hoisted_5 = { class: "kw-conseq" };
const _hoisted_6 = { class: "kw-input-row" };
const _hoisted_7 = { class: "kw-input-hint" };
const _hoisted_8 = ["disabled", "placeholder"];
const _hoisted_9 = {
  key: 0,
  class: "kw-err"
};
const _hoisted_10 = {
  key: 1,
  class: "kw-countdown"
};
const _hoisted_11 = { class: "kw-foot" };
const _hoisted_12 = ["disabled"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "KeywordConfirm",
  props: {
    visible: { type: Boolean },
    title: {},
    consequences: {},
    detail: {},
    keyword: { default: "确认执行" },
    countdownSeconds: { default: 0 }
  },
  emits: ["confirm", "cancel"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const typed = ref("");
    const countdown = ref(0);
    let timer = null;
    const inputErr = computed(() => typed.value !== "" && typed.value !== props.keyword);
    const canConfirm = computed(() => typed.value === props.keyword && countdown.value === 0);
    watch(() => props.visible, (v) => {
      if (v) {
        typed.value = "";
        if (props.countdownSeconds > 0) {
          countdown.value = props.countdownSeconds;
          timer = setInterval(() => {
            countdown.value--;
            if (countdown.value <= 0 && timer) {
              clearInterval(timer);
              timer = null;
            }
          }, 1e3);
        }
      } else if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }, { immediate: true });
    function onConfirm() {
      if (typed.value !== props.keyword || countdown.value !== 0) return;
      emit("confirm");
    }
    function onCancel() {
      emit("cancel");
    }
    function reset() {
      typed.value = "";
      countdown.value = 0;
    }
    onUnmounted(() => {
      if (timer) clearInterval(timer);
    });
    return (_ctx, _cache) => {
      const _component_el_dialog = resolveComponent("el-dialog");
      return openBlock(), createBlock(_component_el_dialog, {
        "model-value": __props.visible,
        width: "440px",
        "show-close": false,
        class: "kw-dialog",
        "append-to-body": "",
        onClose: onCancel,
        onClosed: reset
      }, {
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_1, [
            _cache[1] || (_cache[1] = createBaseVNode("div", { class: "kw-icon" }, "⚠", -1)),
            createBaseVNode("div", _hoisted_2, toDisplayString(__props.title), 1)
          ]),
          createBaseVNode("div", _hoisted_3, [
            __props.detail ? (openBlock(), createElementBlock("div", _hoisted_4, toDisplayString(__props.detail), 1)) : createCommentVNode("", true),
            createBaseVNode("div", _hoisted_5, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(__props.consequences, (c, i) => {
                return openBlock(), createElementBlock("div", {
                  key: i,
                  class: "kw-conseq-item"
                }, "• " + toDisplayString(c), 1);
              }), 128))
            ]),
            _cache[2] || (_cache[2] = createBaseVNode("div", { class: "kw-warn" }, "此操作不可自动回滚,请确认已了解风险", -1)),
            createBaseVNode("div", _hoisted_6, [
              createBaseVNode("span", _hoisted_7, "输入「" + toDisplayString(__props.keyword) + "」以确认:", 1),
              withDirectives(createBaseVNode("input", {
                class: normalizeClass(["kw-input", { err: inputErr.value }]),
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => typed.value = $event),
                disabled: countdown.value > 0,
                placeholder: "输入 " + __props.keyword
              }, null, 10, _hoisted_8), [
                [vModelText, typed.value]
              ]),
              inputErr.value ? (openBlock(), createElementBlock("div", _hoisted_9, "关键字不匹配")) : createCommentVNode("", true),
              countdown.value > 0 ? (openBlock(), createElementBlock("div", _hoisted_10, toDisplayString(countdown.value) + " 秒后可确认", 1)) : createCommentVNode("", true)
            ])
          ]),
          createBaseVNode("div", _hoisted_11, [
            createBaseVNode("button", {
              class: "kw-btn ghost",
              onClick: onCancel
            }, "取消"),
            createBaseVNode("button", {
              class: "kw-btn danger",
              disabled: !canConfirm.value,
              onClick: onConfirm
            }, toDisplayString(countdown.value > 0 ? countdown.value + "s" : "确认执行"), 9, _hoisted_12)
          ])
        ]),
        _: 1
      }, 8, ["model-value"]);
    };
  }
});
const KeywordConfirm = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-60dec124"]]);
export {
  KeywordConfirm as K
};
