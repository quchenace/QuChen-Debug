import { t as defineComponent, aD as watch, a1 as onMounted, a5 as openBlock, l as createElementBlock, i as createBaseVNode, k as createCommentVNode, ak as toDisplayString, F as Fragment, ab as renderList, S as normalizeClass, q as createTextVNode, aG as withDirectives, az as vModelSelect, a9 as ref, g as computed, _ as _export_sfc } from "./main-DAqTdO6U.js";
const _hoisted_1 = { class: "reliability-page embedded-tool" };
const _hoisted_2 = {
  key: 0,
  class: "section-head"
};
const _hoisted_3 = ["disabled"];
const _hoisted_4 = {
  key: 1,
  role: "alert",
  class: "error"
};
const _hoisted_5 = { key: 2 };
const _hoisted_6 = { class: "section-head" };
const _hoisted_7 = ["disabled"];
const _hoisted_8 = {
  key: 0,
  class: "muted"
};
const _hoisted_9 = { key: 3 };
const _hoisted_10 = { class: "filter" };
const _hoisted_11 = {
  key: 0,
  class: "muted"
};
const _hoisted_12 = { class: "entry-head" };
const _hoisted_13 = { key: 0 };
const _hoisted_14 = { class: "snapshots" };
const _hoisted_15 = { class: "actions" };
const _hoisted_16 = ["disabled", "onClick"];
const _hoisted_17 = ["disabled", "onClick"];
const _hoisted_18 = { key: 1 };
const _hoisted_19 = ["disabled"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "OperationHistoryPanel",
  props: {
    mode: { default: "history" }
  },
  setup(__props) {
    const entries = ref([]), checks = ref([]), busy = ref(false), error = ref(""), filter = ref("all");
    const labels = { verified: "已回读验证", "restart-required": "需要重启", unverified: "待核验", unsupported: "当前不支持", failed: "失败或不一致" };
    const visibleLimit = ref(50);
    const filtered = computed(() => entries.value.filter((entry) => filter.value === "all" || (filter.value === "available" ? entry.undo === "available" : entry.verification === filter.value)));
    const visible = computed(() => filtered.value.slice(0, visibleLimit.value));
    watch(filter, () => {
      visibleLimit.value = 50;
    });
    const display = (value) => value === void 0 ? "未记录" : JSON.stringify(value, null, 2);
    async function work(action) {
      if (busy.value) return;
      busy.value = true;
      error.value = "";
      try {
        await action();
      } catch (e) {
        error.value = e instanceof Error ? e.message : String(e);
      } finally {
        busy.value = false;
      }
    }
    function refresh() {
      return work(async () => {
        entries.value = await window.reliabilityApi.list();
      });
    }
    function check() {
      return work(async () => {
        checks.value = await window.reliabilityApi.check();
      });
    }
    function verify(id) {
      return work(async () => {
        await window.reliabilityApi.verify(id);
        entries.value = await window.reliabilityApi.list();
      });
    }
    function undo(id) {
      return work(async () => {
        const result = await window.reliabilityApi.undo(id);
        entries.value = await window.reliabilityApi.list();
        if (!result.success) throw new Error(result.error || "恢复失败");
      });
    }
    onMounted(() => {
      if (__props.mode === "history") void refresh();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        __props.mode === "history" ? (openBlock(), createElementBlock("div", _hoisted_2, [
          _cache[2] || (_cache[2] = createBaseVNode("p", { class: "muted" }, "查看最近的修改及其实际状态，按需恢复本次操作前的设置。", -1)),
          createBaseVNode("button", {
            disabled: busy.value,
            onClick: refresh
          }, "刷新记录", 8, _hoisted_3)
        ])) : createCommentVNode("", true),
        error.value ? (openBlock(), createElementBlock("p", _hoisted_4, toDisplayString(error.value), 1)) : createCommentVNode("", true),
        __props.mode === "checks" ? (openBlock(), createElementBlock("section", _hoisted_5, [
          createBaseVNode("div", _hoisted_6, [
            _cache[3] || (_cache[3] = createBaseVNode("h3", null, "权限与设备状态", -1)),
            createBaseVNode("button", {
              disabled: busy.value,
              onClick: check
            }, "检查当前环境", 8, _hoisted_7)
          ]),
          !checks.value.length ? (openBlock(), createElementBlock("p", _hoisted_8, "按需检查权限、电源与 NVIDIA 驱动。音频链路可在「音频均衡器」中检查。")) : createCommentVNode("", true),
          (openBlock(true), createElementBlock(Fragment, null, renderList(checks.value, (item) => {
            return openBlock(), createElementBlock("article", {
              key: item.id,
              class: "check-row"
            }, [
              createBaseVNode("strong", null, toDisplayString(item.title), 1),
              createBaseVNode("span", {
                class: normalizeClass(item.status)
              }, toDisplayString(labels[item.status]), 3),
              createBaseVNode("p", null, toDisplayString(item.detail), 1)
            ]);
          }), 128))
        ])) : createCommentVNode("", true),
        __props.mode === "history" ? (openBlock(), createElementBlock("section", _hoisted_9, [
          _cache[9] || (_cache[9] = createBaseVNode("h3", null, [
            createTextVNode("操作历史 "),
            createBaseVNode("small", null, "最近 500 条")
          ], -1)),
          _cache[10] || (_cache[10] = createBaseVNode("p", { class: "muted" }, "记录电源、显卡、FPS、系统清单与部署操作。电源计划及 NVIDIA 单项全局设置支持逐次回读和撤销；其他操作显示执行结果与恢复说明。音频滑块不会逐帧写日志。", -1)),
          createBaseVNode("label", _hoisted_10, [
            _cache[5] || (_cache[5] = createTextVNode("筛选 ", -1)),
            withDirectives(createBaseVNode("select", {
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => filter.value = $event)
            }, [..._cache[4] || (_cache[4] = [
              createBaseVNode("option", { value: "all" }, "全部", -1),
              createBaseVNode("option", { value: "failed" }, "失败", -1),
              createBaseVNode("option", { value: "unverified" }, "待核验", -1),
              createBaseVNode("option", { value: "available" }, "可撤销", -1)
            ])], 512), [
              [vModelSelect, filter.value]
            ])
          ]),
          !visible.value.length ? (openBlock(), createElementBlock("p", _hoisted_11, "暂无符合条件的记录。新操作执行后会显示在这里。")) : createCommentVNode("", true),
          (openBlock(true), createElementBlock(Fragment, null, renderList(visible.value, (entry) => {
            return openBlock(), createElementBlock("article", {
              key: entry.id,
              class: "entry"
            }, [
              createBaseVNode("div", _hoisted_12, [
                createBaseVNode("strong", null, toDisplayString(entry.title), 1),
                createBaseVNode("span", {
                  class: normalizeClass(entry.verification)
                }, toDisplayString(entry.undo === "undone" ? "已恢复原状态" : labels[entry.verification]), 3)
              ]),
              createBaseVNode("time", null, toDisplayString(new Date(entry.startedAt).toLocaleString()), 1),
              createBaseVNode("p", null, toDisplayString(entry.detail), 1),
              entry.hasBefore || entry.expected !== void 0 ? (openBlock(), createElementBlock("details", _hoisted_13, [
                _cache[8] || (_cache[8] = createBaseVNode("summary", null, "查看修改内容", -1)),
                createBaseVNode("div", _hoisted_14, [
                  createBaseVNode("div", null, [
                    _cache[6] || (_cache[6] = createTextVNode("原状态", -1)),
                    createBaseVNode("pre", null, toDisplayString(display(entry.before)), 1)
                  ]),
                  createBaseVNode("div", null, [
                    _cache[7] || (_cache[7] = createTextVNode("目标状态", -1)),
                    createBaseVNode("pre", null, toDisplayString(display(entry.expected)), 1)
                  ])
                ])
              ])) : createCommentVNode("", true),
              createBaseVNode("div", _hoisted_15, [
                createBaseVNode("button", {
                  disabled: busy.value || entry.phase === "running",
                  onClick: ($event) => verify(entry.id)
                }, "重新核验", 8, _hoisted_16),
                ["available", "failed", "conflict"].includes(entry.undo) ? (openBlock(), createElementBlock("button", {
                  key: 0,
                  disabled: busy.value || entry.phase === "running",
                  onClick: ($event) => undo(entry.id)
                }, "恢复本次操作前状态", 8, _hoisted_17)) : (openBlock(), createElementBlock("small", _hoisted_18, toDisplayString(entry.undo === "undone" ? "已撤销并验证" : "无逐次恢复快照"), 1))
              ])
            ]);
          }), 128)),
          visible.value.length < filtered.value.length ? (openBlock(), createElementBlock("button", {
            key: 1,
            disabled: busy.value,
            onClick: _cache[1] || (_cache[1] = ($event) => visibleLimit.value += 50)
          }, "显示更多（" + toDisplayString(visible.value.length) + " / " + toDisplayString(filtered.value.length) + "）", 9, _hoisted_19)) : createCommentVNode("", true)
        ])) : createCommentVNode("", true)
      ]);
    };
  }
});
const OperationHistoryPanel = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-63a33f28"]]);
export {
  OperationHistoryPanel as default
};
