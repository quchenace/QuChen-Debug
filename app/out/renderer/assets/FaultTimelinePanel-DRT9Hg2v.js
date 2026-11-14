import { t as defineComponent, aD as watch, Y as onBeforeUnmount, a5 as openBlock, l as createElementBlock, i as createBaseVNode, q as createTextVNode, aG as withDirectives, az as vModelSelect, ak as toDisplayString, k as createCommentVNode, F as Fragment, ab as renderList, S as normalizeClass, aA as vModelText, a9 as ref, g as computed, _ as _export_sfc } from "./main-DAqTdO6U.js";
/* empty css                     */
const _hoisted_1 = {
  class: "input-tool fault-panel",
  "aria-labelledby": "fault-timeline-title"
};
const _hoisted_2 = { class: "tool-actions" };
const _hoisted_3 = { class: "inline-field" };
const _hoisted_4 = ["disabled"];
const _hoisted_5 = ["disabled"];
const _hoisted_6 = ["disabled"];
const _hoisted_7 = {
  class: "tool-status",
  role: "status"
};
const _hoisted_8 = {
  key: 0,
  role: "status"
};
const _hoisted_9 = {
  key: 1,
  class: "tool-error",
  role: "alert"
};
const _hoisted_10 = {
  key: 2,
  class: "tool-note"
};
const _hoisted_11 = { class: "tool-metrics" };
const _hoisted_12 = { class: "report-date" };
const _hoisted_13 = {
  key: 0,
  class: "tool-error",
  role: "status"
};
const _hoisted_14 = { class: "fault-sources" };
const _hoisted_15 = { key: 0 };
const _hoisted_16 = { class: "dump-config" };
const _hoisted_17 = { key: 0 };
const _hoisted_18 = { key: 1 };
const _hoisted_19 = { class: "tool-fields timeline-filters" };
const _hoisted_20 = ["value"];
const _hoisted_21 = {
  key: 1,
  class: "empty-results",
  role: "status"
};
const _hoisted_22 = { class: "timeline-list" };
const _hoisted_23 = ["aria-expanded", "onClick"];
const _hoisted_24 = { class: "category-tag" };
const _hoisted_25 = { class: "event-id" };
const _hoisted_26 = {
  key: 0,
  class: "timeline-detail"
};
const _hoisted_27 = {
  key: 0,
  class: "dump-path"
};
const _hoisted_28 = {
  key: 2,
  class: "tool-actions"
};
const _hoisted_29 = ["disabled"];
const _hoisted_30 = ["disabled"];
const pageSize = 20;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "FaultTimelinePanel",
  setup(__props) {
    const categories = { bsod: "蓝屏", power: "异常关机", application: "应用崩溃", driver: "驱动", hardware: "硬件事件", update: "更新", dump: "转储文件", other: "其他" };
    const severities = { critical: "关键事件", error: "错误事件", warning: "警告事件", information: "信息线索" };
    const days = ref(7), busy = ref(false), error = ref(""), feedback = ref("");
    const report = ref(null), filter = ref("all"), search = ref(""), selected = ref(""), page = ref(1);
    let disposed = false;
    const filtered = computed(() => (report.value?.items ?? []).filter((row) => (filter.value === "all" || row.category === filter.value) && `${row.title} ${row.provider} ${row.eventId} ${row.message} ${row.path}`.toLowerCase().includes(search.value.trim().toLowerCase())));
    const pageCount = computed(() => Math.max(1, Math.ceil(filtered.value.length / pageSize)));
    const visible = computed(() => filtered.value.slice((page.value - 1) * pageSize, page.value * pageSize));
    const dumpMode = computed(() => {
      const mode = report.value?.crashConfig.enabled;
      const modes = { 0: "未启用", 1: "完整内存转储", 2: "内核内存转储", 3: "小内存转储", 7: "自动内存转储", 10: "活动内存转储" };
      return mode === null || mode === void 0 ? "无法确认" : modes[mode] ?? "未知";
    });
    function sourceName(name) {
      return { System: "系统事件", Application: "应用事件", BugCheck: "蓝屏事件查询", Reliability: "可靠性记录", CrashControl: "转储配置", Minidump: "小内存转储", MemoryDump: "系统内存转储" }[name] ?? name;
    }
    function date(value) {
      return new Date(value).toLocaleString();
    }
    function count(category) {
      return report.value?.items.filter((row) => row.category === category).length ?? 0;
    }
    watch([filter, search], () => {
      page.value = 1;
      selected.value = "";
    });
    async function scan() {
      if (busy.value) return;
      busy.value = true;
      error.value = "";
      feedback.value = "";
      report.value = null;
      page.value = 1;
      selected.value = "";
      try {
        if (!window.sysApi?.getFaultTimeline) throw Error("诊断接口不可用，请重启更新后的软件");
        const reply = await window.sysApi.getFaultTimeline(days.value);
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
      if (!report.value || busy.value) return;
      try {
        await navigator.clipboard.writeText(JSON.stringify(report.value, null, 2));
        if (!disposed) feedback.value = "诊断报告已复制";
      } catch {
        if (!disposed) feedback.value = "复制失败，请重试";
      }
    }
    onBeforeUnmount(() => {
      disposed = true;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("section", _hoisted_1, [
        _cache[15] || (_cache[15] = createBaseVNode("div", { class: "tool-heading" }, [
          createBaseVNode("div", null, [
            createBaseVNode("h3", { id: "fault-timeline-title" }, "故障线索与蓝屏记录"),
            createBaseVNode("p", null, "汇总异常关机、应用崩溃、驱动事件和转储文件，按时间排查。")
          ]),
          createBaseVNode("span", { class: "tool-badge" }, "只读诊断")
        ], -1)),
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("label", _hoisted_3, [
            _cache[6] || (_cache[6] = createTextVNode("检查范围", -1)),
            withDirectives(createBaseVNode("select", {
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => days.value = $event),
              "aria-label": "故障检查范围",
              disabled: busy.value
            }, [..._cache[5] || (_cache[5] = [
              createBaseVNode("option", { value: 1 }, "最近 1 天", -1),
              createBaseVNode("option", { value: 7 }, "最近 7 天", -1),
              createBaseVNode("option", { value: 30 }, "最近 30 天", -1)
            ])], 8, _hoisted_4), [
              [
                vModelSelect,
                days.value,
                void 0,
                { number: true }
              ]
            ])
          ]),
          createBaseVNode("button", {
            class: "primary",
            disabled: busy.value,
            onClick: scan
          }, toDisplayString(busy.value ? "正在读取…" : "读取故障线索"), 9, _hoisted_5),
          createBaseVNode("button", {
            disabled: !report.value || busy.value,
            onClick: copy
          }, "复制诊断报告", 8, _hoisted_6),
          createBaseVNode("span", _hoisted_7, toDisplayString(feedback.value), 1)
        ]),
        busy.value ? (openBlock(), createElementBlock("p", _hoisted_8, "正在读取本机记录，最多等待 45 秒。可继续使用其他页面。")) : createCommentVNode("", true),
        error.value ? (openBlock(), createElementBlock("p", _hoisted_9, toDisplayString(error.value), 1)) : createCommentVNode("", true),
        !report.value && !busy.value && !error.value ? (openBlock(), createElementBlock("p", _hoisted_10, "点击读取后显示记录，不会执行修复或更改转储设置。")) : createCommentVNode("", true),
        report.value ? (openBlock(), createElementBlock(Fragment, { key: 3 }, [
          createBaseVNode("div", _hoisted_11, [
            createBaseVNode("div", null, [
              _cache[7] || (_cache[7] = createBaseVNode("span", null, "蓝屏事件线索", -1)),
              createBaseVNode("strong", null, toDisplayString(count("bsod")) + " 条", 1)
            ]),
            createBaseVNode("div", null, [
              _cache[8] || (_cache[8] = createBaseVNode("span", null, "异常关机线索", -1)),
              createBaseVNode("strong", null, toDisplayString(count("power")) + " 条", 1)
            ]),
            createBaseVNode("div", null, [
              _cache[9] || (_cache[9] = createBaseVNode("span", null, "近期转储文件", -1)),
              createBaseVNode("strong", null, toDisplayString(count("dump")) + " 个", 1)
            ])
          ]),
          createBaseVNode("p", _hoisted_12, "本次范围：最近 " + toDisplayString(report.value.days) + " 天 · 读取于 " + toDisplayString(date(report.value.checkedAt)) + " · " + toDisplayString(report.value.items.length) + " 条记录", 1),
          report.value.partial ? (openBlock(), createElementBlock("p", _hoisted_13, "部分来源未能读取，以下结果不完整；没有记录不能证明系统没有故障。")) : createCommentVNode("", true),
          createBaseVNode("div", _hoisted_14, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(report.value.sources, (source) => {
              return openBlock(), createElementBlock("div", {
                key: source.name,
                class: normalizeClass(["source-row", { failed: source.status === "error" }])
              }, [
                createBaseVNode("strong", null, toDisplayString(sourceName(source.name)), 1),
                createBaseVNode("span", null, toDisplayString(source.status === "error" ? "读取失败" : source.status === "missing" ? "不存在" : `已读取 · ${source.count} 条`) + toDisplayString(source.limited ? "（已达采样上限）" : ""), 1),
                source.error ? (openBlock(), createElementBlock("p", _hoisted_15, toDisplayString(source.error), 1)) : createCommentVNode("", true)
              ], 2);
            }), 128))
          ]),
          createBaseVNode("div", _hoisted_16, [
            createBaseVNode("span", null, [
              _cache[10] || (_cache[10] = createTextVNode("转储配置：", -1)),
              createBaseVNode("strong", null, toDisplayString(dumpMode.value), 1)
            ]),
            report.value.crashConfig.miniDir ? (openBlock(), createElementBlock("p", _hoisted_17, "小转储目录：" + toDisplayString(report.value.crashConfig.miniDir), 1)) : createCommentVNode("", true),
            report.value.crashConfig.dumpFile ? (openBlock(), createElementBlock("p", _hoisted_18, "系统转储路径：" + toDisplayString(report.value.crashConfig.dumpFile), 1)) : createCommentVNode("", true)
          ]),
          createBaseVNode("div", _hoisted_19, [
            createBaseVNode("label", null, [
              _cache[12] || (_cache[12] = createTextVNode("记录分类", -1)),
              withDirectives(createBaseVNode("select", {
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => filter.value = $event),
                "aria-label": "故障分类"
              }, [
                _cache[11] || (_cache[11] = createBaseVNode("option", { value: "all" }, "全部记录", -1)),
                (openBlock(), createElementBlock(Fragment, null, renderList(categories, (label, key) => {
                  return createBaseVNode("option", {
                    key,
                    value: key
                  }, toDisplayString(label), 9, _hoisted_20);
                }), 64))
              ], 512), [
                [vModelSelect, filter.value]
              ])
            ]),
            createBaseVNode("label", null, [
              _cache[13] || (_cache[13] = createTextVNode("查找记录", -1)),
              withDirectives(createBaseVNode("input", {
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => search.value = $event),
                "aria-label": "查找故障记录",
                placeholder: "事件 ID、来源或关键字",
                type: "search"
              }, null, 512), [
                [vModelText, search.value]
              ])
            ])
          ]),
          !filtered.value.length ? (openBlock(), createElementBlock("p", _hoisted_21, toDisplayString(report.value.items.length ? "没有符合筛选条件的记录。" : "本次已读取的来源中没有匹配记录。"), 1)) : createCommentVNode("", true),
          createBaseVNode("div", _hoisted_22, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(visible.value, (row) => {
              return openBlock(), createElementBlock("article", {
                key: row.id,
                class: "timeline-entry"
              }, [
                createBaseVNode("button", {
                  class: "timeline-row",
                  "aria-expanded": selected.value === row.id,
                  onClick: ($event) => selected.value = selected.value === row.id ? "" : row.id
                }, [
                  createBaseVNode("time", null, toDisplayString(date(row.timeCreated)), 1),
                  createBaseVNode("span", _hoisted_24, toDisplayString(categories[row.category]), 1),
                  createBaseVNode("strong", null, toDisplayString(row.title), 1),
                  createBaseVNode("span", _hoisted_25, toDisplayString(row.type === "event" ? `事件 ${row.eventId}` : row.type === "dump" ? "文件信息" : "可靠性记录"), 1)
                ], 8, _hoisted_23),
                selected.value === row.id ? (openBlock(), createElementBlock("div", _hoisted_26, [
                  createBaseVNode("p", null, toDisplayString(row.logName || "本机记录") + " · " + toDisplayString(row.provider) + " · " + toDisplayString(severities[row.severity]), 1),
                  createBaseVNode("pre", null, toDisplayString(row.message || "该记录没有可用的详细说明。"), 1),
                  row.path ? (openBlock(), createElementBlock("p", _hoisted_27, toDisplayString(row.path), 1)) : createCommentVNode("", true)
                ])) : createCommentVNode("", true)
              ]);
            }), 128))
          ]),
          filtered.value.length > pageSize ? (openBlock(), createElementBlock("div", _hoisted_28, [
            createBaseVNode("button", {
              disabled: page.value === 1,
              onClick: _cache[3] || (_cache[3] = ($event) => page.value--)
            }, "上一页", 8, _hoisted_29),
            createBaseVNode("span", null, toDisplayString(page.value) + " / " + toDisplayString(pageCount.value), 1),
            createBaseVNode("button", {
              disabled: page.value >= pageCount.value,
              onClick: _cache[4] || (_cache[4] = ($event) => page.value++)
            }, "下一页", 8, _hoisted_30)
          ])) : createCommentVNode("", true),
          _cache[14] || (_cache[14] = createBaseVNode("p", { class: "tool-note" }, "事件记录用于定位时间和相关来源，不能单独确定故障原因。Kernel-Power 41 不等于蓝屏；这里只列出转储文件信息，尚未分析内存转储内容。各来源有采样上限，可缩短时间范围查看。", -1))
        ], 64)) : createCommentVNode("", true)
      ]);
    };
  }
});
const FaultTimelinePanel = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4261853f"]]);
export {
  FaultTimelinePanel as default
};
