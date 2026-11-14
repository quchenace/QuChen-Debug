import { t as defineComponent, aD as watch, Y as onBeforeUnmount, a5 as openBlock, l as createElementBlock, i as createBaseVNode, ak as toDisplayString, k as createCommentVNode, F as Fragment, ab as renderList, q as createTextVNode, aG as withDirectives, az as vModelSelect, p as createStaticVNode, aA as vModelText, S as normalizeClass, a9 as ref, g as computed, _ as _export_sfc } from "./main-DAqTdO6U.js";
/* empty css                     */
const _hoisted_1 = {
  class: "input-tool",
  "aria-labelledby": "driver-inventory-title"
};
const _hoisted_2 = { class: "tool-actions" };
const _hoisted_3 = ["disabled"];
const _hoisted_4 = ["disabled"];
const _hoisted_5 = {
  class: "tool-status",
  role: "status"
};
const _hoisted_6 = {
  key: 0,
  class: "tool-error",
  role: "alert"
};
const _hoisted_7 = { key: 1 };
const _hoisted_8 = { class: "tool-metrics" };
const _hoisted_9 = {
  key: 0,
  class: "tool-error",
  role: "status"
};
const _hoisted_10 = { class: "tool-fields driver-filters" };
const _hoisted_11 = ["value"];
const _hoisted_12 = { class: "driver-count" };
const _hoisted_13 = { class: "driver-list" };
const _hoisted_14 = { class: "driver-heading" };
const _hoisted_15 = { class: "driver-meta" };
const _hoisted_16 = { class: "device-id" };
const _hoisted_17 = {
  key: 1,
  role: "status"
};
const _hoisted_18 = {
  key: 2,
  class: "tool-actions"
};
const _hoisted_19 = ["disabled"];
const _hoisted_20 = ["disabled"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "DriverInventoryPanel",
  props: {
    disabled: { type: Boolean }
  },
  setup(__props) {
    const report = ref(null), busy = ref(false), error = ref(""), feedback = ref("");
    const filter = ref("all"), deviceClass = ref("all"), search = ref(""), page = ref(1);
    let disposed = false;
    const classes = computed(() => [...new Set(report.value?.items.map((row) => row.deviceClass) ?? [])].sort());
    const filtered = computed(() => (report.value?.items ?? []).filter((row) => (deviceClass.value === "all" || row.deviceClass === deviceClass.value) && (filter.value === "all" || filter.value === "problem" && row.problem && row.present !== false || filter.value === "unsigned" && row.signed === false || filter.value === "unknown" && row.signed === null || filter.value === "offline" && row.present === false) && `${row.deviceName} ${row.deviceId} ${row.driverProvider} ${row.driverVersion} ${row.infName}`.toLowerCase().includes(search.value.trim().toLowerCase())));
    const pageCount = computed(() => Math.max(1, Math.ceil(filtered.value.length / 20)));
    const visible = computed(() => filtered.value.slice((page.value - 1) * 20, page.value * 20));
    watch([filter, deviceClass, search], () => {
      page.value = 1;
    });
    async function scan() {
      if (busy.value) return;
      busy.value = true;
      report.value = null;
      error.value = "";
      feedback.value = "";
      page.value = 1;
      try {
        if (!window.sysApi?.getDriverInventory) throw Error("驱动接口不可用，请重启更新后的软件");
        const reply = await window.sysApi.getDriverInventory();
        if (disposed) return;
        if (reply.success === false) throw Error(reply.error);
        report.value = reply.report;
      } catch (reason) {
        if (!disposed) error.value = reason instanceof Error ? reason.message : String(reason);
      } finally {
        if (!disposed) busy.value = false;
      }
    }
    async function copy() {
      if (!report.value) return;
      try {
        await navigator.clipboard.writeText(JSON.stringify(report.value, null, 2));
        feedback.value = "驱动清单已复制";
      } catch {
        feedback.value = "复制失败，请重试";
      }
    }
    onBeforeUnmount(() => {
      disposed = true;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("section", _hoisted_1, [
        _cache[14] || (_cache[14] = createBaseVNode("div", { class: "tool-heading" }, [
          createBaseVNode("div", null, [
            createBaseVNode("h3", { id: "driver-inventory-title" }, "设备与驱动审查"),
            createBaseVNode("p", null, "查看设备状态、驱动版本、INF 和签名信息。")
          ]),
          createBaseVNode("span", { class: "tool-badge" }, "只读检查")
        ], -1)),
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("button", {
            class: "primary",
            disabled: busy.value || __props.disabled,
            onClick: scan
          }, toDisplayString(busy.value ? "正在读取驱动…" : "读取设备与驱动"), 9, _hoisted_3),
          createBaseVNode("button", {
            disabled: !report.value || busy.value,
            onClick: copy
          }, "复制驱动清单", 8, _hoisted_4),
          createBaseVNode("span", _hoisted_5, toDisplayString(feedback.value), 1)
        ]),
        error.value ? (openBlock(), createElementBlock("p", _hoisted_6, toDisplayString(error.value), 1)) : createCommentVNode("", true),
        !report.value && !busy.value && !error.value ? (openBlock(), createElementBlock("p", _hoisted_7, "点击读取后查看本机设备与驱动信息，可筛选异常状态并复制清单。")) : createCommentVNode("", true),
        report.value ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
          createBaseVNode("div", _hoisted_8, [
            createBaseVNode("div", null, [
              _cache[5] || (_cache[5] = createBaseVNode("span", null, "设备 / 驱动记录", -1)),
              createBaseVNode("strong", null, toDisplayString(report.value.items.length), 1)
            ]),
            createBaseVNode("div", null, [
              _cache[6] || (_cache[6] = createBaseVNode("span", null, "当前设备状态异常", -1)),
              createBaseVNode("strong", null, toDisplayString(report.value.items.filter((row) => row.problem && row.present !== false).length), 1)
            ]),
            createBaseVNode("div", null, [
              _cache[7] || (_cache[7] = createBaseVNode("span", null, "签名信息未知", -1)),
              createBaseVNode("strong", null, toDisplayString(report.value.items.filter((row) => row.signed === null).length), 1)
            ])
          ]),
          createBaseVNode("p", null, "读取于 " + toDisplayString(new Date(report.value.checkedAt).toLocaleString()), 1),
          report.value.partial ? (openBlock(), createElementBlock("p", _hoisted_9, "部分数据未能读取，清单不完整。")) : createCommentVNode("", true),
          (openBlock(true), createElementBlock(Fragment, null, renderList(report.value.sources.filter((source) => source.status === "error"), (source) => {
            return openBlock(), createElementBlock("p", {
              key: source.name,
              class: "tool-error"
            }, toDisplayString(source.name === "devices" ? "设备状态" : "驱动信息") + "：" + toDisplayString(source.error || "读取失败"), 1);
          }), 128)),
          createBaseVNode("div", _hoisted_10, [
            createBaseVNode("label", null, [
              _cache[9] || (_cache[9] = createTextVNode("设备类别", -1)),
              withDirectives(createBaseVNode("select", {
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => deviceClass.value = $event),
                "aria-label": "设备类别"
              }, [
                _cache[8] || (_cache[8] = createBaseVNode("option", { value: "all" }, "全部类别", -1)),
                (openBlock(true), createElementBlock(Fragment, null, renderList(classes.value, (item) => {
                  return openBlock(), createElementBlock("option", {
                    key: item,
                    value: item
                  }, toDisplayString(item), 9, _hoisted_11);
                }), 128))
              ], 512), [
                [vModelSelect, deviceClass.value]
              ])
            ]),
            createBaseVNode("label", null, [
              _cache[11] || (_cache[11] = createTextVNode("状态筛选", -1)),
              withDirectives(createBaseVNode("select", {
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => filter.value = $event),
                "aria-label": "驱动状态筛选"
              }, [..._cache[10] || (_cache[10] = [
                createStaticVNode('<option value="all" data-v-12c35b6f>全部记录</option><option value="problem" data-v-12c35b6f>当前设备异常</option><option value="unsigned" data-v-12c35b6f>明确未签名</option><option value="unknown" data-v-12c35b6f>签名未知</option><option value="offline" data-v-12c35b6f>未连接设备</option>', 5)
              ])], 512), [
                [vModelSelect, filter.value]
              ])
            ]),
            createBaseVNode("label", null, [
              _cache[12] || (_cache[12] = createTextVNode("搜索驱动", -1)),
              withDirectives(createBaseVNode("input", {
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => search.value = $event),
                "aria-label": "搜索驱动",
                type: "search",
                placeholder: "设备、厂商、版本或 INF"
              }, null, 512), [
                [vModelText, search.value]
              ])
            ])
          ]),
          createBaseVNode("p", _hoisted_12, "匹配 " + toDisplayString(filtered.value.length) + " 条", 1),
          createBaseVNode("div", _hoisted_13, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(visible.value, (row) => {
              return openBlock(), createElementBlock("article", {
                key: row.id,
                class: "driver-row"
              }, [
                createBaseVNode("div", _hoisted_14, [
                  createBaseVNode("strong", null, toDisplayString(row.deviceName), 1),
                  createBaseVNode("span", {
                    class: normalizeClass({ warning: row.problem && row.present !== false })
                  }, toDisplayString(row.present === false ? "未连接" : row.problem ? `需关注 · 代码 ${row.problemCode ?? "未知"}` : row.problemCode === 0 ? "设备状态正常" : "设备状态未知"), 3)
                ]),
                createBaseVNode("p", null, toDisplayString(row.deviceClass) + " · " + toDisplayString(row.driverProvider || "厂商未知") + " · " + toDisplayString(row.driverVersion || "版本未知"), 1),
                createBaseVNode("div", _hoisted_15, [
                  createBaseVNode("span", null, "INF：" + toDisplayString(row.infName || "未提供"), 1),
                  createBaseVNode("span", null, "日期：" + toDisplayString(row.driverDate || "未知"), 1),
                  createBaseVNode("span", null, toDisplayString(row.signed === true ? "已签名" : row.signed === false ? "未签名" : "签名未知") + toDisplayString(row.signer ? ` · ${row.signer}` : ""), 1)
                ]),
                createBaseVNode("p", _hoisted_16, toDisplayString(row.deviceId), 1)
              ]);
            }), 128))
          ]),
          !filtered.value.length ? (openBlock(), createElementBlock("p", _hoisted_17, toDisplayString(report.value.items.length ? "没有符合条件的驱动记录。" : "本次没有读取到设备或驱动记录。"), 1)) : createCommentVNode("", true),
          filtered.value.length > 20 ? (openBlock(), createElementBlock("div", _hoisted_18, [
            createBaseVNode("button", {
              disabled: page.value === 1,
              onClick: _cache[3] || (_cache[3] = ($event) => page.value--)
            }, "上一页", 8, _hoisted_19),
            createBaseVNode("span", null, toDisplayString(page.value) + " / " + toDisplayString(pageCount.value), 1),
            createBaseVNode("button", {
              disabled: page.value >= pageCount.value,
              onClick: _cache[4] || (_cache[4] = ($event) => page.value++)
            }, "下一页", 8, _hoisted_20)
          ])) : createCommentVNode("", true),
          _cache[13] || (_cache[13] = createBaseVNode("p", { class: "tool-note" }, "设备禁用（代码 22）等状态可能是主动设置；签名状态来自系统报告，不等于文件安全鉴定。日期较早不代表驱动有故障。需要导出第三方驱动包时，请前往“备份中心”。", -1))
        ], 64)) : createCommentVNode("", true)
      ]);
    };
  }
});
const DriverInventoryPanel = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-12c35b6f"]]);
export {
  DriverInventoryPanel as default
};
