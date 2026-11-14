import { t as defineComponent, Y as onBeforeUnmount, a5 as openBlock, l as createElementBlock, ak as toDisplayString, k as createCommentVNode, i as createBaseVNode, F as Fragment, ab as renderList, S as normalizeClass, a9 as ref, _ as _export_sfc } from "./main-DAqTdO6U.js";
const _hoisted_1 = { class: "support-page embedded-tool" };
const _hoisted_2 = {
  key: 0,
  class: "feedback error",
  role: "alert"
};
const _hoisted_3 = {
  key: 1,
  class: "feedback",
  role: "status"
};
const _hoisted_4 = {
  key: 2,
  class: "panel"
};
const _hoisted_5 = { class: "section-head" };
const _hoisted_6 = ["disabled"];
const _hoisted_7 = {
  key: 0,
  class: "empty"
};
const _hoisted_8 = { class: "chain" };
const _hoisted_9 = { class: "node-head" };
const _hoisted_10 = { class: "timestamp" };
const _hoisted_11 = { class: "parameter-check" };
const _hoisted_12 = { key: 0 };
const _hoisted_13 = {
  key: 0,
  class: "error"
};
const _hoisted_14 = {
  key: 3,
  class: "panel"
};
const _hoisted_15 = { class: "section-head" };
const _hoisted_16 = ["disabled"];
const _hoisted_17 = {
  key: 0,
  class: "empty"
};
const _hoisted_18 = { class: "timestamp" };
const _hoisted_19 = {
  class: "report-preview",
  tabindex: "0",
  "aria-label": "完整脱敏报告预览"
};
const _hoisted_20 = { class: "export-row" };
const _hoisted_21 = ["disabled"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SupportDiagnosticsPanel",
  props: {
    mode: { default: "audio" }
  },
  setup(__props) {
    const diagnosis = ref(null);
    const report = ref(null);
    const busy = ref("");
    const error = ref("");
    const notice = ref("");
    let disposed = false;
    const statusLabel = { ready: "状态已读取", unknown: "未知", missing: "未找到", bypassed: "已旁路 / 关闭", error: "需检查" };
    const parameterLabels = { match: "一致", mismatch: "不一致", unknown: "无法确认", unavailable: "无目标" };
    async function run(kind, action) {
      if (busy.value || disposed) return;
      busy.value = kind;
      error.value = "";
      notice.value = "";
      try {
        if (!window.supportApi) throw new Error("诊断服务不可用，请重新启动应用后重试");
        await action();
      } catch (e) {
        if (!disposed) error.value = e instanceof Error ? e.message : "操作失败，请重试";
      } finally {
        if (!disposed) busy.value = "";
      }
    }
    async function diagnose() {
      await run("audio", async () => {
        const result = await window.supportApi.diagnoseAudio();
        if (!disposed) diagnosis.value = result;
      });
    }
    async function preview() {
      await run("preview", async () => {
        const result = await window.supportApi.previewReport();
        if (!disposed) {
          report.value = result;
          notice.value = "报告已在本地生成，请检查完整预览后导出。";
        }
      });
    }
    async function exportPreview() {
      if (!report.value) {
        error.value = "请先生成并查看报告预览";
        return;
      }
      await run("export", async () => {
        const result = await window.supportApi.exportReport(report.value.id);
        if (disposed) return;
        if (result.cancelled) notice.value = "已取消导出，预览仍然保留。";
        else if (result.success) notice.value = "已将预览内容保存到所选位置。";
        else error.value = result.error || "导出失败，请重试";
      });
    }
    onBeforeUnmount(() => {
      disposed = true;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        error.value ? (openBlock(), createElementBlock("p", _hoisted_2, toDisplayString(error.value), 1)) : createCommentVNode("", true),
        notice.value ? (openBlock(), createElementBlock("p", _hoisted_3, toDisplayString(notice.value), 1)) : createCommentVNode("", true),
        __props.mode === "audio" ? (openBlock(), createElementBlock("section", _hoisted_4, [
          createBaseVNode("div", _hoisted_5, [
            _cache[0] || (_cache[0] = createBaseVNode("div", null, [
              createBaseVNode("h2", null, "音频链路"),
              createBaseVNode("p", null, "读取设备与引擎状态；不会启动 EQ、切换设备或录音。")
            ], -1)),
            createBaseVNode("button", {
              disabled: !!busy.value,
              onClick: diagnose
            }, toDisplayString(busy.value === "audio" ? "正在诊断…" : "读取音频状态"), 9, _hoisted_6)
          ]),
          !diagnosis.value ? (openBlock(), createElementBlock("p", _hoisted_7, "尚未诊断。请连接耳机或扬声器，按需播放一段熟悉的声音后开始检查。")) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            createBaseVNode("div", _hoisted_8, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(diagnosis.value.chain, (node) => {
                return openBlock(), createElementBlock("article", {
                  key: node.id,
                  class: normalizeClass(["node", node.status])
                }, [
                  createBaseVNode("div", _hoisted_9, [
                    createBaseVNode("h3", null, toDisplayString(node.label), 1),
                    createBaseVNode("span", null, toDisplayString(statusLabel[node.status]), 1)
                  ]),
                  createBaseVNode("p", null, toDisplayString(node.detail), 1)
                ], 2);
              }), 128))
            ]),
            _cache[2] || (_cache[2] = createBaseVNode("p", { class: "signal" }, "信号：未知 · 没有音量测量证据，设备存在或 EQ 开启均不等于已经有声音。", -1)),
            createBaseVNode("p", _hoisted_10, "读取于 " + toDisplayString(new Date(diagnosis.value.checkedAt).toLocaleTimeString()) + " · 状态不会自动刷新", 1),
            createBaseVNode("div", _hoisted_11, [
              createBaseVNode("h3", null, "保存目标与实际参数 · " + toDisplayString(parameterLabels[diagnosis.value.parameterCheck.status]), 1),
              createBaseVNode("p", null, toDisplayString(diagnosis.value.parameterCheck.detail), 1),
              diagnosis.value.parameterCheck.rows.length ? (openBlock(), createElementBlock("table", _hoisted_12, [
                _cache[1] || (_cache[1] = createBaseVNode("thead", null, [
                  createBaseVNode("tr", null, [
                    createBaseVNode("th", null, "参数"),
                    createBaseVNode("th", null, "保存目标"),
                    createBaseVNode("th", null, "实际回读"),
                    createBaseVNode("th", null, "比较")
                  ])
                ], -1)),
                createBaseVNode("tbody", null, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(diagnosis.value.parameterCheck.rows, (row) => {
                    return openBlock(), createElementBlock("tr", {
                      key: row.parameter
                    }, [
                      createBaseVNode("td", null, toDisplayString(row.parameter), 1),
                      createBaseVNode("td", null, toDisplayString(row.expected), 1),
                      createBaseVNode("td", null, toDisplayString(row.actual), 1),
                      createBaseVNode("td", null, toDisplayString(parameterLabels[row.status]), 1)
                    ]);
                  }), 128))
                ])
              ])) : createCommentVNode("", true)
            ]),
            diagnosis.value.errors.length ? (openBlock(), createElementBlock("ul", _hoisted_13, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(diagnosis.value.errors, (message) => {
                return openBlock(), createElementBlock("li", { key: message }, toDisplayString(message), 1);
              }), 128))
            ])) : createCommentVNode("", true),
            _cache[3] || (_cache[3] = createBaseVNode("h3", null, "逐段定位", -1)),
            createBaseVNode("ol", null, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(diagnosis.value.steps, (step) => {
                return openBlock(), createElementBlock("li", { key: step }, toDisplayString(step), 1);
              }), 128))
            ])
          ], 64))
        ])) : createCommentVNode("", true),
        __props.mode === "report" ? (openBlock(), createElementBlock("section", _hoisted_14, [
          createBaseVNode("div", _hoisted_15, [
            _cache[4] || (_cache[4] = createBaseVNode("div", null, [
              createBaseVNode("h2", null, "本地故障报告"),
              createBaseVNode("p", null, "包括软件与系统版本、组件能力、引擎状态、最近操作和有限日志。默认脱敏，不上传。")
            ], -1)),
            createBaseVNode("button", {
              disabled: !!busy.value,
              onClick: preview
            }, toDisplayString(busy.value === "preview" ? "正在生成…" : report.value ? "重新生成预览" : "生成报告预览"), 9, _hoisted_16)
          ]),
          !report.value ? (openBlock(), createElementBlock("p", _hoisted_17, "生成后会显示完整导出内容。请检查是否还有不希望分享的信息，再选择保存位置。")) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            createBaseVNode("p", _hoisted_18, toDisplayString(new Date(report.value.createdAt).toLocaleString()) + " · " + toDisplayString((report.value.bytes / 1024).toFixed(1)) + " KiB · 预览 15 分钟内有效", 1),
            createBaseVNode("pre", _hoisted_19, toDisplayString(report.value.content), 1),
            createBaseVNode("div", _hoisted_20, [
              _cache[5] || (_cache[5] = createBaseVNode("p", null, "导出内容与以上预览完全一致。保存成功后，可自行选择是否分享该文件。", -1)),
              createBaseVNode("button", {
                disabled: !!busy.value,
                onClick: exportPreview
              }, toDisplayString(busy.value === "export" ? "正在导出…" : "导出已预览内容"), 9, _hoisted_21)
            ])
          ], 64))
        ])) : createCommentVNode("", true)
      ]);
    };
  }
});
const SupportDiagnosticsPanel = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-71606f03"]]);
export {
  SupportDiagnosticsPanel as default
};
