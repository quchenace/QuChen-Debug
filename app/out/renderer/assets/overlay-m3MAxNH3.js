import { t as defineComponent, av as useRouter, a1 as onMounted, ad as resolveComponent, a5 as openBlock, l as createElementBlock, r as createVNode, n as createRouter, m as createMemoryHistory, h as createApp } from "./main-DAqTdO6U.js";
import CrosshairOverlay from "./CrosshairOverlay-CQKG2MUZ.js";
import "./LegacyCrosshairPreview-DwpWYNlI.js";
const _hoisted_1 = { class: "overlay-app" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "OverlayApp",
  setup(__props) {
    const router2 = useRouter();
    onMounted(() => {
      router2.push("/overlay/crosshair");
    });
    return (_ctx, _cache) => {
      const _component_router_view = resolveComponent("router-view");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(_component_router_view)
      ]);
    };
  }
});
const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    {
      path: "/overlay/crosshair",
      name: "overlay-crosshair",
      component: CrosshairOverlay
    }
  ]
});
const app = createApp(_sfc_main);
app.use(router);
app.mount("#app");
