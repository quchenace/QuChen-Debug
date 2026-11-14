import { t as defineComponent, a5 as openBlock, l as createElementBlock, V as normalizeStyle, i as createBaseVNode, S as normalizeClass, ak as toDisplayString, k as createCommentVNode, _ as _export_sfc } from "./main-DAqTdO6U.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "StatusDot",
  props: {
    status: {},
    label: {},
    size: { default: 6 }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("span", {
        class: "sd",
        style: normalizeStyle({ fontSize: __props.size + "px" })
      }, [
        createBaseVNode("span", {
          class: normalizeClass(["sd-dot", "sd-" + __props.status]),
          style: normalizeStyle({ width: __props.size + "px", height: __props.size + "px" })
        }, null, 6),
        __props.label ? (openBlock(), createElementBlock("span", {
          key: 0,
          class: "sd-label",
          style: normalizeStyle({ fontSize: Math.max(11, __props.size) + "px" })
        }, toDisplayString(__props.label), 5)) : createCommentVNode("", true)
      ], 4);
    };
  }
});
const StatusDot = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b3ca6fc8"]]);
export {
  StatusDot as S
};
