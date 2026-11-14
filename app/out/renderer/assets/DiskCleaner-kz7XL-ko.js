import { t as defineComponent, aD as watch, a1 as onMounted, Y as onBeforeUnmount, l as createElementBlock, i as createBaseVNode, q as createTextVNode, aG as withDirectives, az as vModelSelect, F as Fragment, ab as renderList, aA as vModelText, ak as toDisplayString, k as createCommentVNode, a9 as ref, g as computed, a5 as openBlock, S as normalizeClass, _ as _export_sfc, V as normalizeStyle, a3 as onUnmounted, p as createStaticVNode, r as createVNode, a7 as reactive } from "./main-DAqTdO6U.js";
/* empty css                     */
const _hoisted_1$2 = {
  class: "input-tool cleanup-panel",
  "aria-labelledby": "cleanup-title"
};
const _hoisted_2$2 = { class: "tool-fields" };
const _hoisted_3$2 = ["disabled"];
const _hoisted_4$2 = { key: 0 };
const _hoisted_5$2 = ["disabled"];
const _hoisted_6$2 = ["value"];
const _hoisted_7$2 = { key: 1 };
const _hoisted_8$2 = ["disabled"];
const _hoisted_9$2 = { class: "tool-actions" };
const _hoisted_10$2 = ["disabled"];
const _hoisted_11$2 = ["disabled"];
const _hoisted_12$2 = ["disabled"];
const _hoisted_13$2 = {
  key: 0,
  class: "cleanup-state",
  role: "status"
};
const _hoisted_14$2 = { key: 0 };
const _hoisted_15$2 = {
  key: 1,
  class: "tool-error",
  role: "alert"
};
const _hoisted_16$2 = {
  key: 2,
  class: "cleanup-result"
};
const _hoisted_17$2 = { key: 0 };
const _hoisted_18$2 = { key: 1 };
const _hoisted_19$1 = {
  key: 0,
  class: "tool-error"
};
const _hoisted_20$1 = { class: "tool-fields" };
const _hoisted_21$1 = ["disabled"];
const _hoisted_22$1 = {
  key: 1,
  class: "cleanup-rules"
};
const _hoisted_23$1 = { class: "cleanup-rule-top" };
const _hoisted_24$1 = ["checked", "disabled", "onChange"];
const _hoisted_25$1 = { class: "tool-actions" };
const _hoisted_26$1 = ["disabled"];
const _hoisted_27$1 = ["disabled"];
const _hoisted_28 = ["disabled"];
const _hoisted_29 = {
  key: 2,
  class: "tool-note"
};
const _hoisted_30 = {
  key: 3,
  class: "tool-note"
};
const _hoisted_31 = { class: "cleanup-files" };
const _hoisted_32 = ["checked", "disabled", "onChange"];
const _hoisted_33 = {
  key: 4,
  class: "tool-actions"
};
const _hoisted_34 = ["disabled"];
const _hoisted_35 = ["disabled"];
const _hoisted_36 = {
  key: 4,
  class: "tool-note"
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "CleanupPanel",
  props: {
    externalBusy: { type: Boolean }
  },
  emits: ["busy"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const kind = ref("rules"), group = ref("temp"), threshold = ref(50), mode = ref("trash"), filter = ref(""), report = ref(null), selected = ref(/* @__PURE__ */ new Set()), error = ref(""), page = ref(1), pending = ref(false), stopping = ref(false), consumed = ref(false), now = ref(Date.now());
    const status = ref({ busy: false, phase: "idle", message: "", visited: 0, startedAt: 0 });
    const groups = [{ id: "temp", name: "临时文件（超过 24 小时）" }, { id: "shader", name: "显卡与 DirectX 着色器" }, { id: "browser", name: "浏览器缓存" }, { id: "system", name: "缩略图 / Prefetch" }, { id: "logs", name: "系统历史日志" }, { id: "crash", name: "崩溃与蓝屏转储" }, { id: "update", name: "Windows Update 缓存" }, { id: "all", name: "全部已知规则" }];
    const busy = computed(() => pending.value || status.value.busy), elapsed = computed(() => Math.max(0, Math.floor((now.value - status.value.startedAt) / 1e3))), totalBytes = computed(() => (report.value?.files || []).reduce((s, f) => s + f.size, 0));
    const selectedFiles = computed(() => (report.value?.files || []).filter((f) => selected.value.has(report.value?.kind === "large" ? f.id : f.ruleId))), selectedBytes = computed(() => selectedFiles.value.reduce((s, f) => s + f.size, 0));
    const filtered = computed(() => (report.value?.files || []).filter((f) => f.path.toLowerCase().includes(filter.value.toLowerCase())).sort((a, b) => b.size - a.size)), pages = computed(() => Math.max(1, Math.ceil(filtered.value.length / 20))), visible = computed(() => filtered.value.slice((page.value - 1) * 20, page.value * 20));
    let disposed = false, off, timer, lastReport = "";
    watch(busy, (v) => emit("busy", v));
    watch(filter, () => {
      page.value = 1;
    });
    watch([kind, group], () => {
      report.value = null;
      selected.value = /* @__PURE__ */ new Set();
      filter.value = "";
      page.value = 1;
      consumed.value = false;
    });
    function size(bytes) {
      const u = ["B", "KB", "MB", "GB", "TB"];
      let i = 0;
      while (bytes >= 1024 && i < u.length - 1) {
        bytes /= 1024;
        i++;
      }
      return bytes.toFixed(i ? 1 : 0) + " " + u[i];
    }
    function stateName(state) {
      return { ready: "已读取", missing: "未发现目录", partial: "读取不完整", blocked: "暂不可处理" }[state] || state;
    }
    function toggle(id) {
      const next = new Set(selected.value);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      selected.value = next;
    }
    function selectVisible() {
      selected.value = /* @__PURE__ */ new Set([...selected.value, ...visible.value.map((f) => f.id)]);
    }
    function receive(value) {
      if (disposed) return;
      status.value = value;
      now.value = Date.now();
      if (value.report && value.report.id !== lastReport) {
        lastReport = value.report.id;
        kind.value = value.report.kind;
        if (value.report.group) group.value = value.report.group;
        if (value.report.threshold) threshold.value = value.report.threshold;
        queueMicrotask(() => {
          if (!disposed) {
            report.value = value.report;
            selected.value = /* @__PURE__ */ new Set();
            consumed.value = false;
            page.value = 1;
          }
        });
      }
      if (!value.busy) stopping.value = false;
    }
    async function scan() {
      if (busy.value) return;
      pending.value = true;
      error.value = "";
      report.value = null;
      selected.value = /* @__PURE__ */ new Set();
      consumed.value = false;
      try {
        const r = await window.sysApi.cleanupScan(kind.value, group.value, threshold.value);
        if (!r.success) throw Error(r.error || "扫描失败");
        receive(await window.sysApi.cleanupStatus());
      } catch (e) {
        error.value = e.message;
      } finally {
        pending.value = false;
      }
    }
    async function clean() {
      if (!report.value || busy.value) return;
      pending.value = true;
      error.value = "";
      try {
        const r = await window.sysApi.cleanupClean({ scanId: report.value.id, mode: mode.value, ...report.value.kind === "large" ? { fileIds: [...selected.value] } : { ruleIds: [...selected.value] } });
        if (!r.cancelled || r.processed) consumed.value = true;
        showResult(r);
        receive(await window.sysApi.cleanupStatus());
      } catch (e) {
        error.value = e.message;
      } finally {
        pending.value = false;
      }
    }
    function showResult(r) {
      if (!r.success && !r.cancelled) error.value = r.message;
    }
    async function cancel() {
      stopping.value = true;
      try {
        await window.sysApi.cleanupCancel();
      } catch (e) {
        stopping.value = false;
        error.value = e.message;
      }
    }
    async function emptyRecycle() {
      if (busy.value) return;
      pending.value = true;
      error.value = "";
      try {
        showResult(await window.sysApi.cleanupEmptyRecycle());
        receive(await window.sysApi.cleanupStatus());
      } catch (e) {
        error.value = e.message;
      } finally {
        pending.value = false;
      }
    }
    onMounted(async () => {
      off = window.sysApi?.onCleanupProgress(receive);
      timer = setInterval(() => {
        if (status.value.busy) now.value = Date.now();
      }, 1e3);
      try {
        receive(await window.sysApi.cleanupStatus());
      } catch (e) {
        error.value = e.message;
      }
    });
    onBeforeUnmount(() => {
      disposed = true;
      off?.();
      if (timer) clearInterval(timer);
      emit("busy", false);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("section", _hoisted_1$2, [
        _cache[16] || (_cache[16] = createBaseVNode("div", { class: "tool-heading" }, [
          createBaseVNode("div", null, [
            createBaseVNode("h3", { id: "cleanup-title" }, "扫描与清理"),
            createBaseVNode("p", null, "先查看路径和容量，再选择处理。默认送入回收站，可在回收站还原。")
          ]),
          createBaseVNode("span", { class: "tool-badge" }, "按项确认")
        ], -1)),
        createBaseVNode("div", _hoisted_2$2, [
          createBaseVNode("label", null, [
            _cache[9] || (_cache[9] = createTextVNode("扫描内容", -1)),
            withDirectives(createBaseVNode("select", {
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => kind.value = $event),
              disabled: busy.value,
              "aria-label": "扫描内容"
            }, [..._cache[8] || (_cache[8] = [
              createBaseVNode("option", { value: "rules" }, "缓存与临时文件", -1),
              createBaseVNode("option", { value: "large" }, "大文件", -1)
            ])], 8, _hoisted_3$2), [
              [vModelSelect, kind.value]
            ])
          ]),
          kind.value === "rules" ? (openBlock(), createElementBlock("label", _hoisted_4$2, [
            _cache[10] || (_cache[10] = createTextVNode("清理分组", -1)),
            withDirectives(createBaseVNode("select", {
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => group.value = $event),
              disabled: busy.value,
              "aria-label": "清理分组"
            }, [
              (openBlock(), createElementBlock(Fragment, null, renderList(groups, (g) => {
                return createBaseVNode("option", {
                  key: g.id,
                  value: g.id
                }, toDisplayString(g.name), 9, _hoisted_6$2);
              }), 64))
            ], 8, _hoisted_5$2), [
              [vModelSelect, group.value]
            ])
          ])) : (openBlock(), createElementBlock("label", _hoisted_7$2, [
            _cache[11] || (_cache[11] = createTextVNode("大文件阈值（MB）", -1)),
            withDirectives(createBaseVNode("input", {
              type: "number",
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => threshold.value = $event),
              min: "10",
              max: "10240",
              disabled: busy.value,
              "aria-label": "大文件阈值"
            }, null, 8, _hoisted_8$2), [
              [
                vModelText,
                threshold.value,
                void 0,
                { number: true }
              ]
            ])
          ]))
        ]),
        createBaseVNode("div", _hoisted_9$2, [
          createBaseVNode("button", {
            class: "primary",
            disabled: busy.value || __props.externalBusy,
            onClick: scan
          }, "扫描预览", 8, _hoisted_10$2),
          busy.value ? (openBlock(), createElementBlock("button", {
            key: 0,
            disabled: stopping.value,
            onClick: cancel
          }, toDisplayString(stopping.value ? "正在停止…" : "取消任务"), 9, _hoisted_11$2)) : createCommentVNode("", true),
          createBaseVNode("button", {
            disabled: busy.value || __props.externalBusy,
            onClick: emptyRecycle
          }, "清空回收站", 8, _hoisted_12$2)
        ]),
        busy.value || status.value.message ? (openBlock(), createElementBlock("div", _hoisted_13$2, [
          createBaseVNode("strong", null, toDisplayString(busy.value ? "正在处理 · " + elapsed.value + " 秒" : "任务状态"), 1),
          createBaseVNode("p", null, toDisplayString(status.value.message), 1),
          busy.value ? (openBlock(), createElementBlock("p", _hoisted_14$2, toDisplayString(status.value.phase === "scan" ? "扫描只读取文件；可随时取消。" : "取消会在当前文件操作返回后停止，不会撤销已完成的操作。"), 1)) : createCommentVNode("", true)
        ])) : createCommentVNode("", true),
        error.value ? (openBlock(), createElementBlock("p", _hoisted_15$2, toDisplayString(error.value), 1)) : createCommentVNode("", true),
        status.value.result ? (openBlock(), createElementBlock("div", _hoisted_16$2, [
          status.value.result.recycledBytes ? (openBlock(), createElementBlock("p", _hoisted_17$2, "已送入回收站 " + toDisplayString(size(status.value.result.recycledBytes)) + "，尚未释放磁盘空间。", 1)) : createCommentVNode("", true),
          status.value.result.deletedBytes ? (openBlock(), createElementBlock("p", _hoisted_18$2, "已永久删除文件的逻辑大小 " + toDisplayString(size(status.value.result.deletedBytes)) + "；实际释放空间可能不同。", 1)) : createCommentVNode("", true),
          (openBlock(true), createElementBlock(Fragment, null, renderList(status.value.result.errors, (message) => {
            return openBlock(), createElementBlock("p", {
              key: message,
              class: "tool-error"
            }, toDisplayString(message), 1);
          }), 128))
        ])) : createCommentVNode("", true),
        report.value ? (openBlock(), createElementBlock(Fragment, { key: 3 }, [
          createBaseVNode("p", null, "扫描于 " + toDisplayString(new Date(report.value.at).toLocaleTimeString()) + " · " + toDisplayString(report.value.files.length) + " 个候选文件 · " + toDisplayString(size(totalBytes.value)) + "（文件逻辑大小）", 1),
          report.value.partial ? (openBlock(), createElementBlock("p", _hoisted_19$1, "这是部分结果，未读到的文件不在本次操作范围内。")) : createCommentVNode("", true),
          (openBlock(true), createElementBlock(Fragment, null, renderList(report.value.notes, (note) => {
            return openBlock(), createElementBlock("p", {
              key: note,
              class: "tool-note"
            }, toDisplayString(note), 1);
          }), 128)),
          createBaseVNode("div", _hoisted_20$1, [
            createBaseVNode("label", null, [
              _cache[13] || (_cache[13] = createTextVNode("处理方式", -1)),
              withDirectives(createBaseVNode("select", {
                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => mode.value = $event),
                disabled: busy.value,
                "aria-label": "处理方式"
              }, [..._cache[12] || (_cache[12] = [
                createBaseVNode("option", { value: "trash" }, "移入回收站（默认）", -1),
                createBaseVNode("option", { value: "delete" }, "永久删除（不可恢复）", -1)
              ])], 8, _hoisted_21$1), [
                [vModelSelect, mode.value]
              ])
            ]),
            createBaseVNode("label", null, [
              _cache[14] || (_cache[14] = createTextVNode("筛选路径或名称", -1)),
              withDirectives(createBaseVNode("input", {
                "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => filter.value = $event),
                type: "search",
                "aria-label": "筛选清理结果"
              }, null, 512), [
                [vModelText, filter.value]
              ])
            ])
          ]),
          report.value.kind === "rules" ? (openBlock(), createElementBlock("div", _hoisted_22$1, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(report.value.groups, (r) => {
              return openBlock(), createElementBlock("article", {
                key: r.id,
                class: "cleanup-rule"
              }, [
                createBaseVNode("div", _hoisted_23$1, [
                  createBaseVNode("label", null, [
                    createBaseVNode("input", {
                      type: "checkbox",
                      checked: selected.value.has(r.id),
                      disabled: busy.value || !r.count || r.state === "blocked",
                      onChange: ($event) => toggle(r.id)
                    }, null, 40, _hoisted_24$1),
                    createTextVNode(" " + toDisplayString(r.name), 1)
                  ]),
                  createBaseVNode("strong", null, toDisplayString(size(r.bytes)) + " · " + toDisplayString(r.count) + " 个文件", 1)
                ]),
                createBaseVNode("p", null, toDisplayString(r.description), 1),
                r.targets?.length ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(r.targets, (target) => {
                  return openBlock(), createElementBlock("p", {
                    key: target.path,
                    class: "cleanup-path"
                  }, [
                    createTextVNode(toDisplayString(target.path), 1),
                    _cache[15] || (_cache[15] = createBaseVNode("br", null, null, -1)),
                    createTextVNode(toDisplayString(stateName(target.state)) + " · " + toDisplayString(target.count) + " 项 · " + toDisplayString(size(target.bytes)) + toDisplayString(target.reason ? " · " + target.reason : ""), 1)
                  ]);
                }), 128)) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(r.roots, (root) => {
                  return openBlock(), createElementBlock("p", {
                    key: root,
                    class: "cleanup-path"
                  }, toDisplayString(root), 1);
                }), 128)),
                createBaseVNode("p", {
                  class: normalizeClass(r.state === "partial" || r.state === "blocked" ? "tool-error" : "tool-note")
                }, toDisplayString(stateName(r.state)) + toDisplayString(r.reason ? " · " + r.reason : "") + " · 跳过 " + toDisplayString(r.skipped) + " 项 · 读取失败 " + toDisplayString(r.errors) + " 项", 3)
              ]);
            }), 128))
          ])) : createCommentVNode("", true),
          createBaseVNode("div", _hoisted_25$1, [
            report.value.kind === "large" ? (openBlock(), createElementBlock("button", {
              key: 0,
              disabled: busy.value,
              onClick: selectVisible
            }, "选择本页", 8, _hoisted_26$1)) : createCommentVNode("", true),
            createBaseVNode("button", {
              disabled: busy.value,
              onClick: _cache[5] || (_cache[5] = ($event) => selected.value = /* @__PURE__ */ new Set())
            }, "取消选择", 8, _hoisted_27$1),
            createBaseVNode("button", {
              class: "primary",
              disabled: busy.value || __props.externalBusy || !selectedFiles.value.length || consumed.value,
              onClick: clean
            }, toDisplayString(mode.value === "trash" ? "移入回收站" : "永久删除") + " " + toDisplayString(selectedFiles.value.length) + " 个文件 · " + toDisplayString(size(selectedBytes.value)), 9, _hoisted_28)
          ]),
          consumed.value ? (openBlock(), createElementBlock("p", _hoisted_29, "本次扫描已用于操作，请重新扫描剩余文件。")) : createCommentVNode("", true),
          report.value.kind === "large" ? (openBlock(), createElementBlock("p", _hoisted_30, "大文件不代表垃圾。只选择确认不再需要的文件；默认不选中。")) : createCommentVNode("", true),
          createBaseVNode("p", null, "路径预览 " + toDisplayString(filtered.value.length) + " 项 · 第 " + toDisplayString(page.value) + " / " + toDisplayString(pages.value) + " 页", 1),
          createBaseVNode("div", _hoisted_31, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(visible.value, (file) => {
              return openBlock(), createElementBlock("label", {
                key: file.id,
                class: "cleanup-file"
              }, [
                report.value.kind === "large" ? (openBlock(), createElementBlock("input", {
                  key: 0,
                  type: "checkbox",
                  checked: selected.value.has(file.id),
                  disabled: busy.value,
                  onChange: ($event) => toggle(file.id)
                }, null, 40, _hoisted_32)) : createCommentVNode("", true),
                createBaseVNode("span", null, toDisplayString(file.path), 1),
                createBaseVNode("strong", null, toDisplayString(size(file.size)), 1)
              ]);
            }), 128))
          ]),
          pages.value > 1 ? (openBlock(), createElementBlock("div", _hoisted_33, [
            createBaseVNode("button", {
              disabled: page.value === 1,
              onClick: _cache[6] || (_cache[6] = ($event) => page.value--)
            }, "上一页", 8, _hoisted_34),
            createBaseVNode("button", {
              disabled: page.value === pages.value,
              onClick: _cache[7] || (_cache[7] = ($event) => page.value++)
            }, "下一页", 8, _hoisted_35)
          ])) : createCommentVNode("", true)
        ], 64)) : !busy.value ? (openBlock(), createElementBlock("p", _hoisted_36, "点击扫描查看真实目录和容量。缺失目录、权限失败、被占用和未完整扫描会单独显示。")) : createCommentVNode("", true)
      ]);
    };
  }
});
const CleanupPanel = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-9ef140ff"]]);
const _hoisted_1$1 = {
  class: "input-tool maintenance-panel",
  "aria-labelledby": "maintenance-title"
};
const _hoisted_2$1 = { class: "tool-actions" };
const _hoisted_3$1 = ["disabled"];
const _hoisted_4$1 = ["disabled"];
const _hoisted_5$1 = ["disabled"];
const _hoisted_6$1 = { role: "status" };
const _hoisted_7$1 = { key: 0 };
const _hoisted_8$1 = {
  key: 0,
  class: "tool-error",
  role: "alert"
};
const _hoisted_9$1 = {
  key: 0,
  class: "tool-metrics"
};
const _hoisted_10$1 = {
  key: 1,
  class: "tool-error"
};
const _hoisted_11$1 = {
  key: 2,
  class: "tool-error"
};
const _hoisted_12$1 = { class: "maintenance-roots" };
const _hoisted_13$1 = { class: "maintenance-track" };
const _hoisted_14$1 = { class: "tool-actions" };
const _hoisted_15$1 = ["disabled"];
const _hoisted_16$1 = {
  key: 0,
  class: "tool-note"
};
const _hoisted_17$1 = {
  key: 0,
  class: "tool-actions"
};
const _hoisted_18$1 = ["disabled"];
const _hoisted_19 = ["disabled"];
const _hoisted_20 = { class: "maintenance-restore" };
const _hoisted_21 = { class: "tool-fields" };
const _hoisted_22 = ["disabled"];
const _hoisted_23 = { value: "" };
const _hoisted_24 = ["value"];
const _hoisted_25 = { class: "tool-actions" };
const _hoisted_26 = ["disabled"];
const _hoisted_27 = ["disabled"];
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "DiskMaintenancePanel",
  props: {
    externalBusy: { type: Boolean }
  },
  emits: ["busy"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const status = ref({ busy: false, action: "", message: "尚未执行", startedAt: 0, visited: 0 }), pending = ref(false), cancelling = ref(false), error = ref(""), now = ref(Date.now()), plan = ref(null), consumed = ref(false), page = ref(1), resultErrors = ref([]);
    const analysis = ref(null), journals = ref([]), journalId = ref("");
    const busy = computed(() => pending.value || status.value.busy), elapsed = computed(() => Math.max(0, Math.floor((now.value - status.value.startedAt) / 1e3))), pages = computed(() => Math.max(1, Math.ceil((plan.value?.items.length || 0) / 20))), visible = computed(() => plan.value?.items.slice((page.value - 1) * 20, page.value * 20) || []);
    let lastJournalResult = "";
    let disposed = false, off, timer;
    watch(busy, (value) => emit("busy", value));
    function size(value) {
      const units = ["B", "KB", "MB", "GB", "TB"];
      let i = 0;
      while (value >= 1024 && i < 4) {
        value /= 1024;
        i++;
      }
      return value.toFixed(i ? 1 : 0) + " " + units[i];
    }
    function receive(value) {
      if (disposed) return;
      status.value = value;
      now.value = Date.now();
      if (!value.busy) cancelling.value = false;
      const result = value.result;
      if (result?.plan) {
        plan.value = result.plan;
        consumed.value = false;
        page.value = 1;
      }
      if (result?.folders) analysis.value = result;
      if (result?.errors) resultErrors.value = result.errors;
      if (result?.journalId) {
        journalId.value = result.journalId;
        consumed.value = true;
        const key = value.startedAt + ":" + value.action + ":" + result.journalId;
        if (!value.busy && key !== lastJournalResult) {
          lastJournalResult = key;
          void loadJournals();
        }
      }
      if (result?.error) error.value = result.error;
    }
    async function loadJournals() {
      try {
        const r = await window.sysApi.diskCleaner("desktop-journals");
        if (!r.success) throw Error(r.error || "记录读取失败");
        if (!disposed) journals.value = r.journals;
      } catch (e) {
        if (!disposed) error.value = e.message;
      }
    }
    async function run(action, params) {
      if (busy.value) return;
      pending.value = true;
      error.value = "";
      resultErrors.value = [];
      if (action === "disk-analysis") analysis.value = null;
      if (action === "desktop-preview") {
        plan.value = null;
        consumed.value = false;
      }
      try {
        const r = await window.sysApi.diskCleaner(action, params);
        if (!disposed) {
          if (r.error) error.value = r.error;
          receive(await window.sysApi.diskCleaner("maintenance-status"));
        }
      } catch (e) {
        if (!disposed) error.value = e.message;
      } finally {
        pending.value = false;
      }
    }
    async function cancel() {
      cancelling.value = true;
      try {
        await window.sysApi.diskCleaner("maintenance-cancel");
      } catch (e) {
        cancelling.value = false;
        error.value = e.message;
      }
    }
    onMounted(async () => {
      off = window.sysApi?.onDiskMaintenanceProgress?.(receive);
      timer = setInterval(() => {
        if (status.value.busy) now.value = Date.now();
      }, 1e3);
      try {
        const current = await window.sysApi?.diskCleaner("maintenance-status");
        if (current) receive(current);
        if (!current?.busy) await loadJournals();
      } catch (e) {
        if (!disposed) error.value = e.message;
      }
    });
    onBeforeUnmount(() => {
      disposed = true;
      off?.();
      if (timer) clearInterval(timer);
      emit("busy", false);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("section", _hoisted_1$1, [
        _cache[11] || (_cache[11] = createBaseVNode("div", { class: "tool-heading" }, [
          createBaseVNode("div", null, [
            createBaseVNode("h3", { id: "maintenance-title" }, "空间分析与桌面整理"),
            createBaseVNode("p", null, "查看系统盘目录占用，或预览桌面分类后的具体位置。")
          ]),
          createBaseVNode("span", { class: "tool-badge" }, "已有文件不覆盖")
        ], -1)),
        createBaseVNode("div", _hoisted_2$1, [
          createBaseVNode("button", {
            disabled: busy.value || __props.externalBusy,
            onClick: _cache[0] || (_cache[0] = ($event) => run("disk-analysis"))
          }, "磁盘空间分析", 8, _hoisted_3$1),
          createBaseVNode("button", {
            disabled: busy.value || __props.externalBusy,
            onClick: _cache[1] || (_cache[1] = ($event) => run("desktop-preview"))
          }, "预览桌面整理", 8, _hoisted_4$1),
          busy.value ? (openBlock(), createElementBlock("button", {
            key: 0,
            disabled: cancelling.value,
            onClick: cancel
          }, toDisplayString(cancelling.value ? "正在停止…" : "取消任务"), 9, _hoisted_5$1)) : createCommentVNode("", true)
        ]),
        createBaseVNode("p", _hoisted_6$1, [
          createTextVNode(toDisplayString(status.value.message), 1),
          busy.value ? (openBlock(), createElementBlock("span", _hoisted_7$1, " · 已用 " + toDisplayString(elapsed.value) + " 秒", 1)) : createCommentVNode("", true)
        ]),
        error.value ? (openBlock(), createElementBlock("p", _hoisted_8$1, toDisplayString(error.value), 1)) : createCommentVNode("", true),
        analysis.value ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          analysis.value.capacity ? (openBlock(), createElementBlock("div", _hoisted_9$1, [
            createBaseVNode("div", null, [
              createBaseVNode("span", null, toDisplayString(analysis.value.drive) + " 总容量", 1),
              createBaseVNode("strong", null, toDisplayString(size(analysis.value.capacity.total)), 1)
            ]),
            createBaseVNode("div", null, [
              _cache[7] || (_cache[7] = createBaseVNode("span", null, "已用", -1)),
              createBaseVNode("strong", null, toDisplayString(size(analysis.value.capacity.used)), 1)
            ]),
            createBaseVNode("div", null, [
              _cache[8] || (_cache[8] = createBaseVNode("span", null, "可用", -1)),
              createBaseVNode("strong", null, toDisplayString(size(analysis.value.capacity.free)), 1)
            ])
          ])) : createCommentVNode("", true),
          analysis.value.capacityError ? (openBlock(), createElementBlock("p", _hoisted_10$1, "磁盘容量读取失败：" + toDisplayString(analysis.value.capacityError), 1)) : createCommentVNode("", true),
          analysis.value.partial ? (openBlock(), createElementBlock("p", _hoisted_11$1, "统计不完整，以下是已读取到的文件大小。")) : createCommentVNode("", true),
          (openBlock(true), createElementBlock(Fragment, null, renderList(analysis.value.notes, (note) => {
            return openBlock(), createElementBlock("p", {
              key: note,
              class: "tool-note"
            }, toDisplayString(note), 1);
          }), 128)),
          createBaseVNode("div", _hoisted_12$1, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(analysis.value.roots, (root) => {
              return openBlock(), createElementBlock("p", {
                key: root.path
              }, toDisplayString(root.path) + " · " + toDisplayString(root.state === "ready" ? "已读取" : root.state === "missing" ? "目录不存在" : "未完整读取") + toDisplayString(root.reason ? " · " + root.reason : "") + " · 读取失败 " + toDisplayString(root.errors) + " 项", 1);
            }), 128))
          ]),
          createBaseVNode("p", null, "已统计 " + toDisplayString(analysis.value.totalFolders) + " 个分组，显示占用最多的 " + toDisplayString(analysis.value.folders.length) + " 项", 1),
          (openBlock(true), createElementBlock(Fragment, null, renderList(analysis.value.folders, (folder) => {
            return openBlock(), createElementBlock("div", {
              key: folder.path,
              class: "maintenance-folder"
            }, [
              createBaseVNode("div", null, [
                createBaseVNode("span", null, toDisplayString(folder.name), 1),
                createBaseVNode("strong", null, toDisplayString(size(folder.size)) + toDisplayString(folder.partial ? "（部分）" : ""), 1)
              ]),
              createBaseVNode("div", _hoisted_13$1, [
                createBaseVNode("i", {
                  style: normalizeStyle({ width: (analysis.value.folders[0]?.size ? folder.size / analysis.value.folders[0].size * 100 : 0) + "%" })
                }, null, 4)
              ])
            ]);
          }), 128))
        ], 64)) : createCommentVNode("", true),
        plan.value ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
          createBaseVNode("p", null, "实际桌面：" + toDisplayString(plan.value.desktop), 1),
          createBaseVNode("p", null, "将移动 " + toDisplayString(plan.value.items.length) + " 项，跳过 " + toDisplayString(plan.value.skipped) + " 项。仅包含本次预览中的文件。", 1),
          (openBlock(true), createElementBlock(Fragment, null, renderList(plan.value.notes, (note) => {
            return openBlock(), createElementBlock("p", {
              key: note,
              class: "tool-error"
            }, toDisplayString(note), 1);
          }), 128)),
          createBaseVNode("div", _hoisted_14$1, [
            createBaseVNode("button", {
              class: "primary",
              disabled: busy.value || __props.externalBusy || !plan.value.items.length || consumed.value,
              onClick: _cache[2] || (_cache[2] = ($event) => run("organize-desktop", { planId: plan.value.id }))
            }, "确认整理 " + toDisplayString(plan.value.items.length) + " 项", 9, _hoisted_15$1),
            consumed.value ? (openBlock(), createElementBlock("span", _hoisted_16$1, "清单已执行，请重新预览。")) : createCommentVNode("", true)
          ]),
          (openBlock(true), createElementBlock(Fragment, null, renderList(visible.value, (item) => {
            return openBlock(), createElementBlock("article", {
              key: item.id,
              class: "maintenance-move"
            }, [
              createBaseVNode("span", null, toDisplayString(item.source), 1),
              createBaseVNode("strong", null, "→ " + toDisplayString(item.target), 1),
              createBaseVNode("span", null, toDisplayString(size(item.size)), 1)
            ]);
          }), 128)),
          pages.value > 1 ? (openBlock(), createElementBlock("div", _hoisted_17$1, [
            createBaseVNode("button", {
              disabled: page.value === 1,
              onClick: _cache[3] || (_cache[3] = ($event) => page.value--)
            }, "上一页", 8, _hoisted_18$1),
            createBaseVNode("span", null, toDisplayString(page.value) + " / " + toDisplayString(pages.value), 1),
            createBaseVNode("button", {
              disabled: page.value === pages.value,
              onClick: _cache[4] || (_cache[4] = ($event) => page.value++)
            }, "下一页", 8, _hoisted_19)
          ])) : createCommentVNode("", true)
        ], 64)) : createCommentVNode("", true),
        (openBlock(true), createElementBlock(Fragment, null, renderList(resultErrors.value, (message) => {
          return openBlock(), createElementBlock("p", {
            key: message,
            class: "tool-error"
          }, toDisplayString(message), 1);
        }), 128)),
        createBaseVNode("div", _hoisted_20, [
          createBaseVNode("div", _hoisted_21, [
            createBaseVNode("label", null, [
              _cache[9] || (_cache[9] = createTextVNode("还原桌面整理记录", -1)),
              withDirectives(createBaseVNode("select", {
                "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => journalId.value = $event),
                disabled: busy.value || __props.externalBusy,
                "aria-label": "桌面整理记录"
              }, [
                createBaseVNode("option", _hoisted_23, toDisplayString(journals.value.length ? "请选择记录" : "暂无整理记录"), 1),
                (openBlock(true), createElementBlock(Fragment, null, renderList(journals.value, (j) => {
                  return openBlock(), createElementBlock("option", {
                    key: j.id,
                    value: j.id
                  }, toDisplayString(new Date(j.at).toLocaleString()) + " · " + toDisplayString(j.count) + " 项 · " + toDisplayString(j.remaining) + " 项待核对", 9, _hoisted_24);
                }), 128))
              ], 8, _hoisted_22), [
                [vModelSelect, journalId.value]
              ])
            ])
          ]),
          createBaseVNode("div", _hoisted_25, [
            createBaseVNode("button", {
              disabled: busy.value || __props.externalBusy,
              onClick: loadJournals
            }, "刷新记录", 8, _hoisted_26),
            createBaseVNode("button", {
              disabled: busy.value || __props.externalBusy || !journalId.value,
              onClick: _cache[6] || (_cache[6] = ($event) => run("desktop-undo", { journalId: journalId.value }))
            }, "按记录还原", 8, _hoisted_27)
          ]),
          _cache[10] || (_cache[10] = createBaseVNode("p", { class: "tool-note" }, "还原会核对文件身份和原位置。已修改的文件或被占用的原位置会保留，不会覆盖。", -1))
        ])
      ]);
    };
  }
});
const DiskMaintenancePanel = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-72aac0ac"]]);
const _hoisted_1 = { class: "page" };
const _hoisted_2 = { class: "beautify-section" };
const _hoisted_3 = { class: "beautify-header" };
const _hoisted_4 = ["disabled"];
const _hoisted_5 = { class: "beautify-grid" };
const _hoisted_6 = { class: "beautify-status-row" };
const _hoisted_7 = {
  key: 0,
  class: "beautify-version"
};
const _hoisted_8 = ["disabled"];
const _hoisted_9 = { class: "beautify-status-row" };
const _hoisted_10 = {
  key: 0,
  class: "beautify-version"
};
const _hoisted_11 = { class: "beautify-actions" };
const _hoisted_12 = ["disabled"];
const _hoisted_13 = ["disabled", "title"];
const _hoisted_14 = {
  key: 0,
  class: "progress-wrap",
  style: { "margin-top": "12px" }
};
const _hoisted_15 = { class: "progress-bar" };
const _hoisted_16 = { class: "progress-text" };
const _hoisted_17 = { class: "rt" };
const _hoisted_18 = {
  key: 0,
  class: "rt-sub"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "DiskCleaner",
  setup(__props) {
    const cleanupBusy = ref(false);
    const running = ref(false);
    const beautifyLoading = ref(false);
    const beautifyWorking = reactive({ installingTTB: false, installingNexus: false, applyPreset: false });
    const beautifyStatus = reactive({ translucenttb: { installed: false, running: false, version: "" }, nexus: { installed: false, running: false, version: "" } });
    const beautifyProgress = ref(null);
    const beautifyMsg = ref(null);
    function setBeautifyMsg(type, text, detail) {
      beautifyMsg.value = { type, text, detail };
      setTimeout(() => {
        beautifyMsg.value = null;
      }, 5e3);
    }
    let progressUnsub = null;
    onMounted(() => {
      loadBeautifyStatus();
      progressUnsub = subscribeProgress();
    });
    onUnmounted(() => {
      progressUnsub?.();
    });
    function subscribeProgress() {
      const unsub = window.sysApi?.onBeautifyProgress?.((payload) => {
        if (payload && typeof payload.percent === "number") {
          beautifyProgress.value = { percent: payload.percent, stage: payload.stage };
        }
      });
      return unsub ?? (() => {
      });
    }
    async function loadBeautifyStatus() {
      if (!window.sysApi) return;
      beautifyLoading.value = true;
      try {
        const r = await window.sysApi.getBeautifyStatus();
        if (r.success) {
          beautifyStatus.translucenttb = { installed: r.translucenttb.installed, running: r.translucenttb.running, version: r.translucenttb.version || "" };
          beautifyStatus.nexus = { installed: r.nexus.installed, running: r.nexus.running, version: r.nexus.version || "" };
        }
      } catch {
      } finally {
        beautifyLoading.value = false;
      }
    }
    async function doInstallTranslucentTB() {
      if (!window.sysApi || beautifyWorking.installingTTB) return;
      beautifyWorking.installingTTB = true;
      beautifyProgress.value = { percent: 0, stage: "准备安装..." };
      beautifyMsg.value = null;
      try {
        const r = await window.sysApi.installTranslucentTB();
        if (r.success) {
          setBeautifyMsg("success", "✅ TranslucentTB 安装成功");
          await loadBeautifyStatus();
        } else setBeautifyMsg("error", "❌ 安装失败", r.error);
      } catch (e) {
        setBeautifyMsg("error", "❌ 安装异常", e.message);
      } finally {
        beautifyWorking.installingTTB = false;
        setTimeout(() => {
          beautifyProgress.value = null;
        }, 2e3);
      }
    }
    async function doInstallNexus() {
      if (!window.sysApi || beautifyWorking.installingNexus) return;
      beautifyWorking.installingNexus = true;
      beautifyProgress.value = { percent: 0, stage: "准备安装..." };
      beautifyMsg.value = null;
      try {
        const r = await window.sysApi.installNexus();
        if (r.success) {
          setBeautifyMsg("success", "✅ Nexus 安装成功");
          await loadBeautifyStatus();
        } else setBeautifyMsg("error", "❌ 安装失败", r.error);
      } catch (e) {
        setBeautifyMsg("error", "❌ 安装异常", e.message);
      } finally {
        beautifyWorking.installingNexus = false;
        setTimeout(() => {
          beautifyProgress.value = null;
        }, 2e3);
      }
    }
    async function doApplyNexusPreset() {
      if (!window.sysApi || beautifyWorking.applyPreset) return;
      beautifyWorking.applyPreset = true;
      beautifyProgress.value = { percent: 0, stage: "准备应用预设..." };
      beautifyMsg.value = null;
      try {
        const r = await window.sysApi.applyNexusPreset();
        if (r.success) {
          setBeautifyMsg("success", "✅ Nexus UI 预设已应用");
        } else setBeautifyMsg("error", "❌ 应用失败", r.error);
      } catch (e) {
        setBeautifyMsg("error", "❌ 应用异常", e.message);
      } finally {
        beautifyWorking.applyPreset = false;
        setTimeout(() => {
          beautifyProgress.value = null;
        }, 2e3);
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        _cache[8] || (_cache[8] = createStaticVNode('<div class="page-header" data-v-fa5301dd><div class="page-icon" style="background:rgba(100,116,139,0.1);" data-v-fa5301dd><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="1.5" data-v-fa5301dd><path d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" data-v-fa5301dd></path></svg></div><div data-v-fa5301dd><h2 class="page-title" data-v-fa5301dd>C盘清理</h2><p class="page-desc" data-v-fa5301dd>临时文件清理 · 大文件扫描 · 磁盘空间分析</p></div></div>', 1)),
        createVNode(CleanupPanel, {
          "external-busy": running.value,
          onBusy: _cache[0] || (_cache[0] = ($event) => cleanupBusy.value = $event)
        }, null, 8, ["external-busy"]),
        createVNode(DiskMaintenancePanel, {
          "external-busy": cleanupBusy.value,
          onBusy: _cache[1] || (_cache[1] = ($event) => running.value = $event)
        }, null, 8, ["external-busy"]),
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            _cache[2] || (_cache[2] = createBaseVNode("span", { class: "beautify-title" }, "系统美化", -1)),
            _cache[3] || (_cache[3] = createBaseVNode("span", { class: "beautify-sub" }, "TranslucentTB 透明任务栏 · Winstep Nexus Dock · 离线安装", -1)),
            createBaseVNode("button", {
              class: "clear-btn",
              onClick: loadBeautifyStatus,
              disabled: beautifyLoading.value
            }, "检测状态", 8, _hoisted_4)
          ]),
          createBaseVNode("div", _hoisted_5, [
            createBaseVNode("div", {
              class: normalizeClass(["beautify-card", { installed: beautifyStatus.translucenttb.installed }])
            }, [
              _cache[4] || (_cache[4] = createBaseVNode("div", { class: "beautify-name" }, "TranslucentTB", -1)),
              createBaseVNode("div", _hoisted_6, [
                createBaseVNode("span", {
                  class: normalizeClass(["status-pill", beautifyStatus.translucenttb.installed ? "on" : "off"])
                }, toDisplayString(beautifyStatus.translucenttb.installed ? "已安装" : "未安装"), 3),
                createBaseVNode("span", {
                  class: normalizeClass(["status-pill small", beautifyStatus.translucenttb.running ? "on" : "off"])
                }, toDisplayString(beautifyStatus.translucenttb.running ? "运行中" : "未运行"), 3),
                beautifyStatus.translucenttb.version ? (openBlock(), createElementBlock("span", _hoisted_7, "v" + toDisplayString(beautifyStatus.translucenttb.version), 1)) : createCommentVNode("", true)
              ]),
              _cache[5] || (_cache[5] = createBaseVNode("div", { class: "beautify-desc" }, "让任务栏透明化，释放视觉占用。支持离线 .msix 优先 + winget 兜底。", -1)),
              createBaseVNode("button", {
                class: "chip-mini do-btn primary",
                onClick: doInstallTranslucentTB,
                disabled: beautifyWorking.installingTTB
              }, toDisplayString(beautifyWorking.installingTTB ? "安装中..." : "安装"), 9, _hoisted_8)
            ], 2),
            createBaseVNode("div", {
              class: normalizeClass(["beautify-card", { installed: beautifyStatus.nexus.installed }])
            }, [
              _cache[6] || (_cache[6] = createBaseVNode("div", { class: "beautify-name" }, "Winstep Nexus", -1)),
              createBaseVNode("div", _hoisted_9, [
                createBaseVNode("span", {
                  class: normalizeClass(["status-pill", beautifyStatus.nexus.installed ? "on" : "off"])
                }, toDisplayString(beautifyStatus.nexus.installed ? "已安装" : "未安装"), 3),
                createBaseVNode("span", {
                  class: normalizeClass(["status-pill small", beautifyStatus.nexus.running ? "on" : "off"])
                }, toDisplayString(beautifyStatus.nexus.running ? "运行中" : "未运行"), 3),
                beautifyStatus.nexus.version ? (openBlock(), createElementBlock("span", _hoisted_10, "v" + toDisplayString(beautifyStatus.nexus.version), 1)) : createCommentVNode("", true)
              ]),
              _cache[7] || (_cache[7] = createBaseVNode("div", { class: "beautify-desc" }, "功能强大的 Dock 工具，替代传统任务栏。需预置离线安装包。", -1)),
              createBaseVNode("div", _hoisted_11, [
                createBaseVNode("button", {
                  class: "chip-mini do-btn",
                  onClick: doInstallNexus,
                  disabled: beautifyWorking.installingNexus
                }, toDisplayString(beautifyWorking.installingNexus ? "安装中..." : "安装"), 9, _hoisted_12),
                createBaseVNode("button", {
                  class: "chip-mini do-btn",
                  onClick: doApplyNexusPreset,
                  disabled: beautifyWorking.applyPreset,
                  title: beautifyStatus.nexus.installed ? "应用预置 UI 预设" : "需先安装 Nexus"
                }, toDisplayString(beautifyWorking.applyPreset ? "应用中..." : "应用 UI 预设"), 9, _hoisted_13)
              ])
            ], 2)
          ]),
          beautifyProgress.value ? (openBlock(), createElementBlock("div", _hoisted_14, [
            createBaseVNode("div", _hoisted_15, [
              createBaseVNode("div", {
                class: "progress-fill",
                style: normalizeStyle({ width: beautifyProgress.value.percent + "%" })
              }, null, 4)
            ]),
            createBaseVNode("div", _hoisted_16, toDisplayString(beautifyProgress.value.percent) + "% — " + toDisplayString(beautifyProgress.value.stage), 1)
          ])) : createCommentVNode("", true),
          beautifyMsg.value ? (openBlock(), createElementBlock("div", {
            key: 1,
            class: normalizeClass(["result-panel", beautifyMsg.value.type]),
            style: { "margin-top": "12px" }
          }, [
            createBaseVNode("div", _hoisted_17, toDisplayString(beautifyMsg.value.text), 1),
            beautifyMsg.value.detail ? (openBlock(), createElementBlock("div", _hoisted_18, toDisplayString(beautifyMsg.value.detail), 1)) : createCommentVNode("", true)
          ], 2)) : createCommentVNode("", true)
        ])
      ]);
    };
  }
});
const DiskCleaner = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-fa5301dd"]]);
export {
  DiskCleaner as default
};
