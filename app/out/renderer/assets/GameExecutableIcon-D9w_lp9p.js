import { t as defineComponent, aD as watch, a1 as onMounted, Y as onBeforeUnmount, a5 as openBlock, l as createElementBlock, i as createBaseVNode, a9 as ref, _ as _export_sfc } from "./main-DAqTdO6U.js";
const _hoisted_1 = ["src"];
const _hoisted_2 = {
  key: 1,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.4"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "GameExecutableIcon",
  props: {
    path: {}
  },
  setup(__props) {
    const props = __props, host = ref(), icon = ref(null);
    let observer, visible = false, generation = 0, alive = true;
    async function load() {
      const version = ++generation;
      icon.value = null;
      if (!visible || !window.gameGraphicsApi?.icon) return;
      try {
        const r = await window.gameGraphicsApi.icon(props.path);
        if (alive && version === generation && r.success && r.data?.startsWith("data:image/png;base64,")) icon.value = r.data;
      } catch {
      }
    }
    watch(() => props.path, load);
    onMounted(() => {
      if (typeof IntersectionObserver === "undefined") {
        visible = true;
        void load();
        return;
      }
      observer = new IntersectionObserver((entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          visible = true;
          observer?.disconnect();
          void load();
        }
      }, { rootMargin: "100px" });
      if (host.value) observer.observe(host.value);
    });
    onBeforeUnmount(() => {
      alive = false;
      generation++;
      observer?.disconnect();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("span", {
        ref_key: "host",
        ref: host,
        class: "exe-icon",
        "aria-hidden": "true"
      }, [
        icon.value ? (openBlock(), createElementBlock("img", {
          key: 0,
          src: icon.value,
          alt: "",
          onError: _cache[0] || (_cache[0] = ($event) => icon.value = null)
        }, null, 40, _hoisted_1)) : (openBlock(), createElementBlock("svg", _hoisted_2, [..._cache[1] || (_cache[1] = [
          createBaseVNode("rect", {
            x: "3",
            y: "4",
            width: "18",
            height: "15",
            rx: "3"
          }, null, -1),
          createBaseVNode("path", { d: "M3 9h18M7 6.5h1m2 0h1M8 22h8" }, null, -1)
        ])]))
      ], 512);
    };
  }
});
const GameExecutableIcon = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6d11973a"]]);
export {
  GameExecutableIcon as G
};
