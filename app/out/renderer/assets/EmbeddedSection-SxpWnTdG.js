import { t as defineComponent, a9 as ref, aD as watch, l as createElementBlock, i as createBaseVNode, ak as toDisplayString, k as createCommentVNode, q as createTextVNode, aG as withDirectives, aB as vShow, ac as renderSlot, a5 as openBlock, D as inject, ag as routeLocationKey, R as nextTick, a6 as provide, _ as _export_sfc } from "./main-DAqTdO6U.js";
const _hoisted_1 = ["id"];
const _hoisted_2 = ["aria-expanded", "aria-controls"];
const _hoisted_3 = { key: 0 };
const _hoisted_4 = { class: "embedded-section-action" };
const _hoisted_5 = { "aria-hidden": "true" };
const _hoisted_6 = ["id"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "EmbeddedSection",
  props: {
    id: {},
    title: {},
    description: {},
    initiallyOpen: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const opened = ref(props.initiallyOpen ?? false);
    const mounted = ref(opened.value);
    provide("embeddedSectionActive", opened);
    watch(opened, (value) => {
      if (value) mounted.value = true;
    }, { flush: "sync" });
    const section = ref(null);
    const route = inject(routeLocationKey, void 0);
    watch(() => route?.query.section, async (target) => {
      if (target !== props.id) return;
      opened.value = true;
      await nextTick();
      section.value?.scrollIntoView({ block: "start" });
    }, { immediate: true });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("section", {
        id: __props.id,
        ref_key: "section",
        ref: section,
        class: "embedded-section"
      }, [
        createBaseVNode("button", {
          class: "embedded-section-head",
          "aria-expanded": opened.value,
          "aria-controls": `${__props.id}-content`,
          onClick: _cache[0] || (_cache[0] = ($event) => opened.value = !opened.value)
        }, [
          createBaseVNode("span", null, [
            createBaseVNode("strong", null, toDisplayString(__props.title), 1),
            __props.description ? (openBlock(), createElementBlock("small", _hoisted_3, toDisplayString(__props.description), 1)) : createCommentVNode("", true)
          ]),
          createBaseVNode("span", _hoisted_4, [
            createTextVNode(toDisplayString(opened.value ? "收起" : "展开") + " ", 1),
            createBaseVNode("span", _hoisted_5, toDisplayString(opened.value ? "−" : "+"), 1)
          ])
        ], 8, _hoisted_2),
        mounted.value ? withDirectives((openBlock(), createElementBlock("div", {
          key: 0,
          id: `${__props.id}-content`,
          class: "embedded-section-content"
        }, [
          renderSlot(_ctx.$slots, "default", {}, void 0, true)
        ], 8, _hoisted_6)), [
          [vShow, opened.value]
        ]) : createCommentVNode("", true)
      ], 8, _hoisted_1);
    };
  }
});
const EmbeddedSection = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e6e880e6"]]);
export {
  EmbeddedSection as E
};
