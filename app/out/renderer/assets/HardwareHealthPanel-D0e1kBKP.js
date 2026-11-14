import { t as defineComponent, av as useRouter, aD as watch, Y as onBeforeUnmount, a5 as openBlock, l as createElementBlock, i as createBaseVNode, F as Fragment, ab as renderList, S as normalizeClass, ak as toDisplayString, k as createCommentVNode, q as createTextVNode, aG as withDirectives, az as vModelSelect, aA as vModelText, as as unref, a9 as ref, g as computed, _ as _export_sfc } from "./main-DAqTdO6U.js";
import { e as ElMessageBox } from "./index-CL4m76NE.js";
/* empty css                     */
const _hoisted_1 = {
  class: "input-tool hardware-health",
  "aria-labelledby": "hardware-health-title"
};
const _hoisted_2 = {
  class: "tool-actions section-picker",
  "aria-label": "专项检查分类"
};
const _hoisted_3 = ["aria-pressed", "disabled", "onClick"];
const _hoisted_4 = { class: "tool-actions" };
const _hoisted_5 = ["disabled"];
const _hoisted_6 = ["disabled"];
const _hoisted_7 = ["disabled"];
const _hoisted_8 = {
  class: "tool-status",
  role: "status"
};
const _hoisted_9 = {
  key: 0,
  role: "status"
};
const _hoisted_10 = {
  key: 1,
  class: "tool-error",
  role: "alert"
};
const _hoisted_11 = { key: 2 };
const _hoisted_12 = {
  key: 0,
  class: "tool-error",
  role: "status"
};
const _hoisted_13 = {
  key: 1,
  class: "tool-error",
  role: "status"
};
const _hoisted_14 = {
  class: "health-sources",
  "aria-label": "数据来源状态"
};
const _hoisted_15 = ["title"];
const _hoisted_16 = { class: "tool-fields health-filters" };
const _hoisted_17 = ["value"];
const _hoisted_18 = { class: "health-group-title" };
const _hoisted_19 = {
  key: 0,
  class: "health-empty"
};
const _hoisted_20 = { class: "health-row-heading" };
const _hoisted_21 = { class: "health-facts" };
const _hoisted_22 = {
  key: 2,
  role: "status"
};
const _hoisted_23 = {
  key: 3,
  class: "tool-actions"
};
const _hoisted_24 = ["disabled"];
const _hoisted_25 = ["disabled"];
const _hoisted_26 = {
  key: 4,
  class: "tool-actions"
};
const _hoisted_27 = {
  key: 5,
  class: "tool-actions"
};
const _hoisted_28 = {
  key: 6,
  class: "tool-actions"
};
const _hoisted_29 = ["disabled"];
const _hoisted_30 = ["disabled"];
const _hoisted_31 = {
  key: 7,
  class: "tool-actions"
};
const _hoisted_32 = ["disabled"];
const _hoisted_33 = ["disabled"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "HardwareHealthPanel",
  props: {
    disabled: { type: Boolean }
  },
  setup(__props) {
    const router = useRouter();
    const sections = [{ id: "disk", label: "磁盘与分区" }, { id: "pagefile", label: "分页文件" }, { id: "battery", label: "电池" }, { id: "bluetooth", label: "蓝牙" }, { id: "audio", label: "音频设备" }, { id: "policies", label: "系统策略" }, { id: "updates", label: "更新历史" }];
    const section = ref("disk"), busy = ref(false), error = ref(""), feedback = ref(""), page = ref(1), search = ref(""), groupId = ref("all");
    sections.push({ id: "system-status", label: "时间与索引" }, { id: "storage-extra", label: "SMART 与压缩" });
    const reportBusy = ref(false);
    const reports = ref({});
    const report = computed(() => reports.value[section.value] ?? null);
    const currentLabel = computed(() => sections.find((item) => item.id === section.value).label);
    const names = { policies: "策略值", management: "域加入信息", history: "更新历史", hotfixes: "系统补丁", updateServices: "更新服务", reboot: "待重启线索", updatePolicies: "更新策略", disks: "磁盘", physical: "物理存储", counters: "设备计数器", volumes: "卷", partitions: "分区", bitlocker: "BitLocker", trim: "TRIM", system: "管理方式", memory: "内存", pageSettings: "分页配置", pageUsage: "分页使用", crash: "转储配置", batteries: "电池设备", batteryStatic: "设计容量", batteryFull: "满充容量", batteryCycles: "循环次数", devices: "设备", services: "服务", drivers: "驱动", endpoints: "音频端点" };
    const sourceName = (name) => names[name] || name;
    Object.assign(names, { time: "时间服务", timeStatus: "同步状态", timePeers: "时间源", search: "搜索服务", searchCatalog: "索引目录", smart: "ATA 属性", smartPrediction: "磁盘预测", compact: "系统压缩" });
    const filtered = computed(() => (report.value?.groups ?? []).filter((group) => groupId.value === "all" || group.id === groupId.value).flatMap((group) => group.rows.filter((row) => `${row.title} ${row.status} ${row.facts.map((fact) => `${fact.label} ${fact.value}`).join(" ")}`.toLowerCase().includes(search.value.trim().toLowerCase())).map((row) => ({ group, row }))));
    const emptyGroups = computed(() => (report.value?.groups ?? []).filter((group) => !group.rows.length && !search.value.trim() && (groupId.value === "all" || group.id === groupId.value)));
    const visibleGroups = computed(() => {
      const visible = filtered.value.slice((page.value - 1) * 20, page.value * 20);
      return (report.value?.groups ?? []).flatMap((group) => {
        const rows = visible.filter((item) => item.group.id === group.id).map((item) => item.row);
        return rows.length || page.value === 1 && emptyGroups.value.includes(group) ? [{ ...group, rows }] : [];
      });
    });
    const pageCount = computed(() => Math.max(1, Math.ceil(filtered.value.length / 20)));
    let disposed = false;
    watch([groupId, search], () => {
      page.value = 1;
    });
    watch(section, () => {
      groupId.value = "all";
      search.value = "";
      error.value = "";
      feedback.value = "";
      page.value = 1;
    });
    async function scan() {
      if (busy.value) return;
      const selected = section.value;
      busy.value = true;
      error.value = "";
      feedback.value = "";
      delete reports.value[selected];
      page.value = 1;
      try {
        if (!window.sysApi?.getHardwareHealth) throw Error("专项检查接口不可用，请重启更新后的软件");
        const reply = await window.sysApi.getHardwareHealth(selected);
        if (disposed) return;
        if (reply.success === false) throw Error(reply.error);
        reports.value[selected] = reply.report;
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
        if (!disposed) feedback.value = "专项报告已复制";
      } catch {
        if (!disposed) feedback.value = "复制失败，请重试";
      }
    }
    async function maintain(action) {
      if (busy.value || reportBusy.value) return;
      const descriptions = { "compact-enable": "压缩 Windows 系统文件以节省空间。可能耗时数分钟，可通过解除系统压缩还原。", "compact-disable": "解压 Windows 系统文件，需要额外磁盘空间，可能耗时数分钟。", "time-sync": "启动 Windows 时间服务并向当前配置的时间源请求同步。", "search-reindex": "请求 Windows 重新索引，过程中搜索结果可能暂时不完整，并增加磁盘使用。" };
      try {
        await ElMessageBox.confirm(descriptions[action], "确认系统维护", { confirmButtonText: "执行", cancelButtonText: "取消", type: "warning" });
      } catch {
        return;
      }
      reportBusy.value = true;
      error.value = "";
      feedback.value = "系统维护正在执行，请等待…";
      try {
        const result = await window.sysApi.systemMaintenance(action);
        if (!result.success) throw Error(result.error || "维护失败");
        feedback.value = action === "search-reindex" ? "已提交重新索引请求；后台完成后请重新检查。" : `执行完成：${result.output || "请重新检查状态"}`;
        reportBusy.value = false;
        await scan();
        feedback.value = action === "search-reindex" ? "已提交重新索引请求，后台仍可能正在运行。" : `执行完成：${result.output || ""}`;
      } catch (e) {
        error.value = e instanceof Error ? e.message : String(e);
        feedback.value = "";
      } finally {
        reportBusy.value = false;
      }
    }
    async function batteryReport() {
      if (reportBusy.value || busy.value) return;
      reportBusy.value = true;
      error.value = "";
      feedback.value = "";
      try {
        if (!window.sysApi?.openBatteryReport) throw Error("电池报告接口不可用，请重启更新后的软件");
        const result = await window.sysApi.openBatteryReport();
        if (disposed) return;
        if (!result.success) throw Error(`${result.error || "报告生成失败"}${result.path ? `；路径：${result.path}` : ""}`);
        feedback.value = `报告已生成并打开：${result.path}`;
      } catch (reason) {
        if (!disposed) error.value = reason instanceof Error ? reason.message : String(reason);
      } finally {
        if (!disposed) reportBusy.value = false;
      }
    }
    onBeforeUnmount(() => {
      disposed = true;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("section", _hoisted_1, [
        _cache[13] || (_cache[13] = createBaseVNode("div", { class: "tool-heading" }, [
          createBaseVNode("div", null, [
            createBaseVNode("h3", { id: "hardware-health-title" }, "硬件与系统专项检查"),
            createBaseVNode("p", null, "按需读取硬件、系统策略和 Windows 更新记录。")
          ]),
          createBaseVNode("span", { class: "tool-badge" }, "只读检查")
        ], -1)),
        createBaseVNode("div", _hoisted_2, [
          (openBlock(), createElementBlock(Fragment, null, renderList(sections, (item) => {
            return createBaseVNode("button", {
              key: item.id,
              class: normalizeClass({ primary: section.value === item.id }),
              "aria-pressed": section.value === item.id,
              disabled: busy.value || reportBusy.value,
              onClick: ($event) => section.value = item.id
            }, toDisplayString(item.label), 11, _hoisted_3);
          }), 64))
        ]),
        createBaseVNode("div", _hoisted_4, [
          createBaseVNode("button", {
            class: "primary",
            disabled: busy.value || reportBusy.value || __props.disabled,
            onClick: scan
          }, toDisplayString(busy.value ? "正在读取专项检查…" : `检查${currentLabel.value}`), 9, _hoisted_5),
          createBaseVNode("button", {
            disabled: !report.value || busy.value,
            onClick: copy
          }, "复制专项报告", 8, _hoisted_6),
          section.value === "battery" ? (openBlock(), createElementBlock("button", {
            key: 0,
            disabled: busy.value || reportBusy.value || __props.disabled,
            onClick: batteryReport
          }, toDisplayString(reportBusy.value ? "正在生成电池报告…" : "生成并打开系统电池报告"), 9, _hoisted_7)) : createCommentVNode("", true),
          createBaseVNode("span", _hoisted_8, toDisplayString(feedback.value), 1)
        ]),
        busy.value ? (openBlock(), createElementBlock("p", _hoisted_9, "正在读取" + toDisplayString(currentLabel.value) + "，最多等待 60 秒。此过程不改变设备或系统配置。", 1)) : createCommentVNode("", true),
        error.value ? (openBlock(), createElementBlock("p", _hoisted_10, toDisplayString(error.value), 1)) : createCommentVNode("", true),
        !report.value && !busy.value && !error.value ? (openBlock(), createElementBlock("p", _hoisted_11, "选择分类后点击检查。每项独立读取，不影响优化评分。")) : createCommentVNode("", true),
        report.value ? (openBlock(), createElementBlock(Fragment, { key: 3 }, [
          createBaseVNode("p", null, "读取于 " + toDisplayString(new Date(report.value.checkedAt).toLocaleString()) + " · " + toDisplayString(currentLabel.value), 1),
          report.value.partial ? (openBlock(), createElementBlock("p", _hoisted_12, "部分来源读取失败或不支持，未读取的数据不代表正常。")) : createCommentVNode("", true),
          report.value.truncated ? (openBlock(), createElementBlock("p", _hoisted_13, "数据达到读取上限，本次报告不完整。")) : createCommentVNode("", true),
          createBaseVNode("div", _hoisted_14, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(report.value.sources, (source) => {
              return openBlock(), createElementBlock("span", {
                key: source.name,
                class: normalizeClass({ unavailable: source.status === "error" }),
                title: source.error
              }, toDisplayString(sourceName(source.name)) + " · " + toDisplayString(source.status === "ok" ? "已读取" : source.status === "notApplicable" ? "不适用" : "未读到"), 11, _hoisted_15);
            }), 128))
          ]),
          (openBlock(true), createElementBlock(Fragment, null, renderList(report.value.sources.filter((row) => row.status === "error"), (source) => {
            return openBlock(), createElementBlock("p", {
              key: source.name,
              class: "tool-error"
            }, toDisplayString(sourceName(source.name)) + "：" + toDisplayString(source.error || "读取失败或未提供数据"), 1);
          }), 128)),
          createBaseVNode("div", _hoisted_16, [
            createBaseVNode("label", null, [
              _cache[11] || (_cache[11] = createTextVNode("查看分组", -1)),
              withDirectives(createBaseVNode("select", {
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => groupId.value = $event),
                "aria-label": "查看专项分组"
              }, [
                _cache[10] || (_cache[10] = createBaseVNode("option", { value: "all" }, "全部分组", -1)),
                (openBlock(true), createElementBlock(Fragment, null, renderList(report.value.groups, (group) => {
                  return openBlock(), createElementBlock("option", {
                    key: group.id,
                    value: group.id
                  }, toDisplayString(group.title), 9, _hoisted_17);
                }), 128))
              ], 512), [
                [vModelSelect, groupId.value]
              ])
            ]),
            createBaseVNode("label", null, [
              _cache[12] || (_cache[12] = createTextVNode("搜索检查结果", -1)),
              withDirectives(createBaseVNode("input", {
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => search.value = $event),
                "aria-label": "搜索专项结果",
                type: "search",
                placeholder: "设备、状态或配置内容"
              }, null, 512), [
                [vModelText, search.value]
              ])
            ])
          ]),
          createBaseVNode("p", null, "匹配 " + toDisplayString(filtered.value.length) + " 条记录", 1),
          (openBlock(true), createElementBlock(Fragment, null, renderList(visibleGroups.value, (group) => {
            return openBlock(), createElementBlock(Fragment, {
              key: group.id
            }, [
              createBaseVNode("h4", _hoisted_18, toDisplayString(group.title), 1),
              !group.rows.length ? (openBlock(), createElementBlock("p", _hoisted_19, toDisplayString(group.empty), 1)) : createCommentVNode("", true),
              (openBlock(true), createElementBlock(Fragment, null, renderList(group.rows, (row) => {
                return openBlock(), createElementBlock("article", {
                  key: row.id,
                  class: "health-row"
                }, [
                  createBaseVNode("div", _hoisted_20, [
                    createBaseVNode("strong", null, toDisplayString(row.title), 1),
                    createBaseVNode("span", null, toDisplayString(row.status), 1)
                  ]),
                  createBaseVNode("dl", _hoisted_21, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(row.facts, (fact, index) => {
                      return openBlock(), createElementBlock("div", { key: index }, [
                        createBaseVNode("dt", null, toDisplayString(fact.label), 1),
                        createBaseVNode("dd", null, toDisplayString(fact.value), 1)
                      ]);
                    }), 128))
                  ])
                ]);
              }), 128))
            ], 64);
          }), 128)),
          !filtered.value.length && !emptyGroups.value.length ? (openBlock(), createElementBlock("p", _hoisted_22, "没有符合筛选条件的记录。")) : createCommentVNode("", true),
          pageCount.value > 1 ? (openBlock(), createElementBlock("div", _hoisted_23, [
            createBaseVNode("button", {
              disabled: page.value === 1,
              onClick: _cache[2] || (_cache[2] = ($event) => page.value--)
            }, "上一页", 8, _hoisted_24),
            createBaseVNode("span", null, toDisplayString(page.value) + " / " + toDisplayString(pageCount.value), 1),
            createBaseVNode("button", {
              disabled: page.value >= pageCount.value,
              onClick: _cache[3] || (_cache[3] = ($event) => page.value++)
            }, "下一页", 8, _hoisted_25)
          ])) : createCommentVNode("", true),
          (openBlock(true), createElementBlock(Fragment, null, renderList(report.value.notes, (note) => {
            return openBlock(), createElementBlock("p", {
              key: note,
              class: "tool-note"
            }, toDisplayString(note), 1);
          }), 128)),
          section.value === "audio" ? (openBlock(), createElementBlock("div", _hoisted_26, [
            createBaseVNode("button", {
              onClick: _cache[4] || (_cache[4] = ($event) => unref(router).push("/audio-eq"))
            }, "打开均衡器与声音诊断")
          ])) : createCommentVNode("", true),
          section.value === "pagefile" ? (openBlock(), createElementBlock("div", _hoisted_27, [
            createBaseVNode("button", {
              onClick: _cache[5] || (_cache[5] = ($event) => unref(router).push("/system-diagnostics?tab=faults"))
            }, "查看故障与蓝屏记录")
          ])) : createCommentVNode("", true),
          section.value === "system-status" ? (openBlock(), createElementBlock("div", _hoisted_28, [
            createBaseVNode("button", {
              disabled: busy.value || reportBusy.value,
              onClick: _cache[6] || (_cache[6] = ($event) => maintain("time-sync"))
            }, "立即同步时间", 8, _hoisted_29),
            createBaseVNode("button", {
              disabled: busy.value || reportBusy.value,
              onClick: _cache[7] || (_cache[7] = ($event) => maintain("search-reindex"))
            }, "重新建立搜索索引", 8, _hoisted_30)
          ])) : createCommentVNode("", true),
          section.value === "storage-extra" ? (openBlock(), createElementBlock("div", _hoisted_31, [
            createBaseVNode("button", {
              disabled: busy.value || reportBusy.value,
              onClick: _cache[8] || (_cache[8] = ($event) => maintain("compact-enable"))
            }, "启用系统压缩", 8, _hoisted_32),
            createBaseVNode("button", {
              disabled: busy.value || reportBusy.value,
              onClick: _cache[9] || (_cache[9] = ($event) => maintain("compact-disable"))
            }, "解除系统压缩", 8, _hoisted_33)
          ])) : createCommentVNode("", true)
        ], 64)) : createCommentVNode("", true)
      ]);
    };
  }
});
const HardwareHealthPanel = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e96d2077"]]);
export {
  HardwareHealthPanel as default
};
