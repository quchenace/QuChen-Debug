import { t as defineComponent, Y as onBeforeUnmount, l as createElementBlock, i as createBaseVNode, p as createStaticVNode, ak as toDisplayString, k as createCommentVNode, F as Fragment, ab as renderList, aI as withModifiers, S as normalizeClass, q as createTextVNode, V as normalizeStyle, a9 as ref, g as computed, a5 as openBlock, _ as _export_sfc } from "./main-DAqTdO6U.js";
const _hoisted_1 = {
  class: "page",
  "data-tour": "system-deployer"
};
const _hoisted_2 = { class: "page-header" };
const _hoisted_3 = { class: "page-desc" };
const _hoisted_4 = {
  key: 0,
  class: "error-text",
  role: "alert"
};
const _hoisted_5 = {
  key: 1,
  class: "load-stage"
};
const _hoisted_6 = {
  key: 0,
  class: "preset-section"
};
const _hoisted_7 = { class: "preset-grid" };
const _hoisted_8 = ["onClick"];
const _hoisted_9 = { class: "preset-rank" };
const _hoisted_10 = { class: "preset-body" };
const _hoisted_11 = { class: "preset-meta" };
const _hoisted_12 = {
  key: 0,
  class: "preset-glow"
};
const _hoisted_13 = ["disabled"];
const _hoisted_14 = {
  key: 1,
  class: "preset-sep"
};
const _hoisted_15 = {
  key: 0,
  width: "36",
  height: "36",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.2"
};
const _hoisted_16 = {
  key: 1,
  class: "spinner"
};
const _hoisted_17 = { class: "drop-text" };
const _hoisted_18 = {
  key: 2,
  class: "drop-hint"
};
const _hoisted_19 = {
  key: 3,
  class: "error-text"
};
const _hoisted_20 = {
  key: 2,
  class: "preview-card"
};
const _hoisted_21 = { class: "preview-header" };
const _hoisted_22 = { class: "preview-version" };
const _hoisted_23 = { class: "preview-author" };
const _hoisted_24 = { class: "preview-grid" };
const _hoisted_25 = { class: "preview-item" };
const _hoisted_26 = { class: "preview-val green" };
const _hoisted_27 = { class: "preview-item" };
const _hoisted_28 = { class: "preview-val" };
const _hoisted_29 = { class: "preview-desc" };
const _hoisted_30 = { class: "preview-actions" };
const _hoisted_31 = {
  key: 3,
  class: "config-card"
};
const _hoisted_32 = { class: "playbook-info" };
const _hoisted_33 = { class: "pi-row" };
const _hoisted_34 = { class: "pi-row" };
const _hoisted_35 = { class: "pi-row" };
const _hoisted_36 = { class: "green" };
const _hoisted_37 = { class: "pi-row" };
const _hoisted_38 = { class: "pi-desc" };
const _hoisted_39 = {
  key: 0,
  class: "no-options"
};
const _hoisted_40 = { class: "fp-summary" };
const _hoisted_41 = ["type", "name", "checked", "onChange"];
const _hoisted_42 = { class: "config-actions" };
const _hoisted_43 = ["disabled"];
const _hoisted_44 = ["disabled"];
const _hoisted_45 = {
  key: 1,
  class: "check-result-card"
};
const _hoisted_46 = { class: "ci-name" };
const _hoisted_47 = { class: "ci-current" };
const _hoisted_48 = {
  key: 0,
  class: "check-hint"
};
const _hoisted_49 = {
  key: 4,
  class: "progress-card"
};
const _hoisted_50 = { class: "progress-bar-wrap" };
const _hoisted_51 = { class: "progress-pct" };
const _hoisted_52 = { class: "progress-status" };
const _hoisted_53 = {
  key: 1,
  class: "stall-warning",
  role: "alert"
};
const _hoisted_54 = {
  key: 2,
  class: "elapsed"
};
const _hoisted_55 = { class: "log-icon" };
const _hoisted_56 = { class: "log-time" };
const _hoisted_57 = { class: "log-msg" };
const _hoisted_58 = {
  key: 4,
  class: "confirm-overlay"
};
const _hoisted_59 = { class: "confirm-box" };
const _hoisted_60 = { class: "confirm-msg" };
const _hoisted_61 = {
  key: 0,
  class: "error-text",
  role: "alert"
};
const _hoisted_62 = {
  key: 5,
  class: "complete-card"
};
const _hoisted_63 = { class: "complete-summary" };
const _hoisted_64 = {
  key: 0,
  class: "log-path-box"
};
const _hoisted_65 = { class: "complete-actions" };
const MAX_LOG_LINES = 300;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SystemDeployer",
  setup(__props) {
    const stage = ref("idle");
    const presets = [
      { label: "zztsos", name: "ZztsOS Free", version: "2.0.0", author: "ZztsOS", file: "ZztsOS-Free-v2.0.0.zzts" },
      { label: "ryan", name: "RyanOS 公益版", version: "0.0.2", author: "XLST", file: "RyanOS公益版 0.0.2.zzts" },
      { label: "atlas", name: "AtlasOS", version: "0.5.0", author: "Atlas", file: "AtlasPlaybook-v0.5.0.zzts" }
    ];
    const selectedPreset = ref(null);
    const error = ref("");
    const meta = ref(null);
    const deploying = ref(false);
    const startingDeploy = ref(false);
    const checking = ref(false);
    const checkResult = ref(null);
    const done = ref(false);
    const progressPct = ref(0);
    const statusText = ref("准备中...");
    const stallWarning = ref("");
    const deployMode = ref("");
    const elapsed = ref("");
    const logLines = ref([]);
    const logPanel = ref(null);
    const confirmPrompt = ref("");
    let unsubProgress = null;
    let elapsedTimer = null;
    let startTime = 0;
    let disposed = false;
    let logBatch = [];
    let flushScheduled = false;
    function flushLogBatch() {
      flushScheduled = false;
      if (logBatch.length === 0) return;
      const batch = logBatch;
      logBatch = [];
      const total = logLines.value.length + batch.length;
      if (total > MAX_LOG_LINES) {
        logLines.value.splice(0, total - MAX_LOG_LINES);
      }
      logLines.value.push(...batch);
      if (logPanel.value) logPanel.value.scrollTop = logPanel.value.scrollHeight;
    }
    const resultOk = ref(true);
    const resultTitle = ref("");
    const resultErrorCount = ref(0);
    const resultActionCount = ref(0);
    const resultDuration = ref("");
    const resultLogFolder = ref("");
    const stageDesc = computed(() => {
      switch (stage.value) {
        case "idle":
          return "拖入 .zzts 文件或点击选择";
        case "loading":
          return "读取中...";
        case "preview":
          return meta.value ? `${meta.value.name} v${meta.value.version}` : "";
        case "config":
          return "选择部署选项";
        case "deploying":
          return done.value ? "处理中..." : "执行中...";
        case "done":
          return resultOk.value ? "部署完成" : "部署未成功完成";
        default:
          return "";
      }
    });
    function pad(n) {
      return n.toString().padStart(2, "0");
    }
    function fmtElapsed(sec) {
      const h = Math.floor(sec / 3600), m = Math.floor(sec % 3600 / 60), s = sec % 60;
      return `${pad(h)}:${pad(m)}:${pad(s)}`;
    }
    function timeStr() {
      return (/* @__PURE__ */ new Date()).toLocaleTimeString("zh-CN", { hour12: false });
    }
    function reset() {
      if (elapsedTimer) {
        clearInterval(elapsedTimer);
        elapsedTimer = null;
      }
      if (unsubProgress) {
        unsubProgress();
        unsubProgress = null;
      }
      stage.value = "idle";
      confirmPrompt.value = "";
      meta.value = null;
      error.value = "";
      deploying.value = false;
      done.value = false;
      progressPct.value = 0;
      statusText.value = "准备中...";
      stallWarning.value = "";
      deployMode.value = "";
      elapsed.value = "";
      logLines.value = [];
      resultOk.value = true;
      resultErrorCount.value = 0;
      resultActionCount.value = 0;
      resultDuration.value = "";
      resultLogFolder.value = "";
    }
    function loadPreset(label) {
      const pb = presets.find((p) => p.label === label);
      if (!pb || !window.deployerApi?.resolvePlaybookPath) return;
      window.deployerApi.resolvePlaybookPath(pb.file).then((absPath) => {
        if (absPath) loadFile(absPath);
        else error.value = "找不到 playbook 文件: " + pb.file;
      });
    }
    function selectFile() {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".zzts,.apbx";
      input.onchange = () => {
        if (input.files?.[0]) loadFile(input.files[0].path);
      };
      input.click();
    }
    async function onDrop(e) {
      const file = e.dataTransfer?.files?.[0];
      if (file) await loadFile(file.path);
    }
    async function loadFile(filePath) {
      if (stage.value === "loading" || deploying.value || startingDeploy.value) return;
      if (!window.deployerApi) {
        error.value = "deployerApi 不可用";
        return;
      }
      stage.value = "loading";
      error.value = "";
      try {
        const r = await window.deployerApi.extract(filePath);
        if (r?.success && r.data) {
          meta.value = r.data;
          stage.value = "preview";
        } else {
          error.value = r?.error || "无法读取 playbook 文件";
          stage.value = "idle";
        }
      } catch (e) {
        error.value = e?.message || "读取部署包失败，请重试";
        stage.value = "idle";
      }
    }
    function onOptionToggle(fp, opt, event) {
      const checked = event.target.checked;
      if (fp.pageType === "RadioPage" || fp.pageType === "RadioImagePage") {
        fp.options.forEach((o) => {
          o.isChecked = o === opt;
        });
      } else {
        opt.isChecked = checked;
      }
    }
    function getSelectedLabel(fp) {
      const sel = fp.options?.find((o) => o.isChecked);
      return sel?.text || "未选";
    }
    function countSelected(fp) {
      return fp.options?.filter((o) => o.isChecked).length ?? 0;
    }
    async function runCheck() {
      if (!meta.value || !window.deployerApi) return;
      checking.value = true;
      checkResult.value = null;
      const selectedOptions = [];
      if (meta.value.featurePages) {
        for (const fp of meta.value.featurePages) {
          if (fp.options) {
            for (const opt of fp.options) {
              if (opt.isChecked) selectedOptions.push(opt.name);
            }
          }
        }
      }
      try {
        const r = await window.deployerApi.check(meta.value.extractedPath, selectedOptions);
        checkResult.value = r;
      } catch (e) {
        checkResult.value = { success: false, allMet: false, items: [], message: e?.message || "预检失败" };
      } finally {
        checking.value = false;
      }
    }
    async function startDeploy() {
      if (disposed || !meta.value || !window.deployerApi || deploying.value || startingDeploy.value) return;
      startingDeploy.value = true;
      try {
        const s = await window.deployerApi.status();
        if (disposed || !meta.value) return;
        if (s?.deploying) {
          error.value = "已有部署进程在运行";
          return;
        }
        if (!confirm(`确认开始部署「${meta.value.name} v${meta.value.version}」？

⚠ 部署将修改注册表、调整系统服务，并可能安装内核驱动（KProcessHacker2）。
请确认你了解该 playbook 的内容且已备份重要数据。`)) return;
      } catch (e) {
        error.value = e?.message || "无法查询部署状态，请重试";
        return;
      } finally {
        startingDeploy.value = false;
      }
      deploying.value = true;
      done.value = false;
      stage.value = "deploying";
      progressPct.value = 0;
      statusText.value = "准备中...";
      stallWarning.value = "";
      deployMode.value = "";
      elapsed.value = "00:00:00";
      logLines.value = [];
      error.value = "";
      startTime = Date.now();
      elapsedTimer = setInterval(() => {
        elapsed.value = fmtElapsed(Math.floor((Date.now() - startTime) / 1e3));
      }, 1e3);
      const selectedOptions = [];
      if (meta.value.featurePages) {
        for (const fp of meta.value.featurePages) {
          if (fp.options) {
            for (const opt of fp.options) {
              if (opt.isChecked) selectedOptions.push(opt.name);
            }
          }
        }
      }
      unsubProgress = window.deployerApi.onProgress((msg) => {
        if (msg.stalled === true) stallWarning.value = msg.message || "部署进度长时间未推进，请查看日志。";
        else if (msg.stalled === false) stallWarning.value = "";
        if (msg.type === "progress" && Number.isFinite(msg.percent)) {
          progressPct.value = Math.max(progressPct.value, Math.min(99, Math.max(0, msg.percent)));
        }
        if (msg.type === "status") {
          statusText.value = msg.message || statusText.value;
          if (msg.message?.includes("TrustedInstaller") || msg.message?.includes("TI 令牌")) {
            deployMode.value = "ti";
          } else if (msg.message?.includes("Administrator") || msg.message?.includes("TIRunner 未找到")) {
            deployMode.value = "admin";
          }
        }
        if (msg.type === "needs_user_confirm") {
          confirmPrompt.value = msg.message || "";
        }
        if (msg.type === "status" || msg.type === "log") {
          logBatch.push({ text: msg.message || "", level: msg.level || "info", time: timeStr() });
          if (!flushScheduled) {
            flushScheduled = true;
            requestAnimationFrame(() => flushLogBatch());
          }
        }
      });
      let r;
      try {
        r = await window.deployerApi.deploy(meta.value.extractedPath, selectedOptions);
      } catch (e) {
        r = { success: false, error: e?.message || "部署进程异常退出" };
      } finally {
        if (elapsedTimer) {
          clearInterval(elapsedTimer);
          elapsedTimer = null;
        }
        if (unsubProgress) {
          unsubProgress();
          unsubProgress = null;
        }
        done.value = true;
        deploying.value = false;
        confirmPrompt.value = "";
      }
      resultOk.value = r.success === true && r.hasErrors !== true;
      resultErrorCount.value = r.errorCount ?? (r.success === false ? 1 : 0);
      resultActionCount.value = r.actionCount ?? 0;
      resultDuration.value = r.duration || "";
      resultLogFolder.value = r.logFolder || "";
      if (resultOk.value) {
        resultTitle.value = "部署成功";
      } else if (r.error) {
        resultTitle.value = r.error.length > 80 ? "部署失败" : r.error;
      } else {
        resultTitle.value = "部署完成（有错误）";
      }
      if (resultOk.value) progressPct.value = 100;
      stage.value = "done";
    }
    async function cancelDeploy() {
      if (window.deployerApi) await window.deployerApi.cancel();
      statusText.value = "已请求中止...";
    }
    async function confirmContinue() {
      try {
        const result = await window.deployerApi?.confirm();
        if (!result?.success) {
          error.value = "未能通知部署器继续，请重试或中止部署。";
          return;
        }
        error.value = "";
        confirmPrompt.value = "";
      } catch (e) {
        error.value = e?.message || "继续部署失败，请重试。";
      }
    }
    function openLogs() {
      if (resultLogFolder.value && window.sysApi) {
        window.sysApi.openExternal("file:///" + resultLogFolder.value);
      }
    }
    async function restartSystem() {
      if (!confirm("确认重启电脑？\n\n请确认已保存所有未完成的工作。")) return;
      if (window.sysApi) await window.sysApi.shutdown();
    }
    onBeforeUnmount(() => {
      disposed = true;
      if (elapsedTimer) clearInterval(elapsedTimer);
      if (unsubProgress) unsubProgress();
      if (deploying.value && window.deployerApi) {
        window.deployerApi.cancel();
      }
      if (window.deployerApi) window.deployerApi.cleanup();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          _cache[5] || (_cache[5] = createStaticVNode('<div class="page-icon" data-v-0ed546cc><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="1.5" data-v-0ed546cc><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" data-v-0ed546cc></path><polyline points="7 10 12 15 17 10" data-v-0ed546cc></polyline><line x1="12" y1="15" x2="12" y2="3" data-v-0ed546cc></line></svg></div>', 1)),
          createBaseVNode("div", null, [
            _cache[4] || (_cache[4] = createBaseVNode("h2", { class: "page-title" }, "系统部署", -1)),
            createBaseVNode("p", _hoisted_3, toDisplayString(stageDesc.value), 1)
          ])
        ]),
        error.value && stage.value !== "idle" && stage.value !== "loading" && !(stage.value === "deploying" && confirmPrompt.value) ? (openBlock(), createElementBlock("p", _hoisted_4, toDisplayString(error.value), 1)) : createCommentVNode("", true),
        stage.value === "idle" || stage.value === "loading" ? (openBlock(), createElementBlock("div", _hoisted_5, [
          stage.value === "idle" ? (openBlock(), createElementBlock("div", _hoisted_6, [
            _cache[7] || (_cache[7] = createBaseVNode("h3", { class: "preset-title" }, "快速部署", -1)),
            _cache[8] || (_cache[8] = createBaseVNode("p", { class: "preset-sub" }, "选择预置版本开始系统优化", -1)),
            createBaseVNode("div", _hoisted_7, [
              (openBlock(), createElementBlock(Fragment, null, renderList(presets, (pb) => {
                return createBaseVNode("div", {
                  key: pb.label,
                  class: normalizeClass(["preset-card", { selected: selectedPreset.value === pb.label }]),
                  onClick: ($event) => selectedPreset.value = pb.label
                }, [
                  createBaseVNode("div", _hoisted_9, toDisplayString(pb.label === "zztsos" ? "01" : pb.label === "ryan" ? "02" : "03"), 1),
                  createBaseVNode("div", _hoisted_10, [
                    createBaseVNode("h4", null, toDisplayString(pb.name), 1),
                    createBaseVNode("p", _hoisted_11, toDisplayString(pb.author) + " · v" + toDisplayString(pb.version), 1)
                  ]),
                  selectedPreset.value === pb.label ? (openBlock(), createElementBlock("div", _hoisted_12)) : createCommentVNode("", true)
                ], 10, _hoisted_8);
              }), 64))
            ]),
            createBaseVNode("button", {
              class: "preset-go",
              disabled: !selectedPreset.value,
              onClick: _cache[0] || (_cache[0] = ($event) => loadPreset(selectedPreset.value))
            }, [
              createBaseVNode("span", null, toDisplayString(selectedPreset.value ? presets.find((p) => p.label === selectedPreset.value).name : "选择一个版本"), 1),
              _cache[6] || (_cache[6] = createBaseVNode("svg", {
                width: "16",
                height: "16",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                createBaseVNode("line", {
                  x1: "5",
                  y1: "12",
                  x2: "19",
                  y2: "12"
                }),
                createBaseVNode("polyline", { points: "12 5 19 12 12 19" })
              ], -1))
            ], 8, _hoisted_13)
          ])) : createCommentVNode("", true),
          stage.value === "idle" ? (openBlock(), createElementBlock("div", _hoisted_14, [..._cache[9] || (_cache[9] = [
            createBaseVNode("span", null, "或导入自定义文件", -1)
          ])])) : createCommentVNode("", true),
          createBaseVNode("div", {
            class: normalizeClass(["drop-zone", { loading: stage.value === "loading" }]),
            onDragover: _cache[1] || (_cache[1] = withModifiers(() => {
            }, ["prevent"])),
            onDrop: withModifiers(onDrop, ["prevent"]),
            onClick: selectFile
          }, [
            stage.value !== "loading" ? (openBlock(), createElementBlock("svg", _hoisted_15, [..._cache[10] || (_cache[10] = [
              createBaseVNode("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }, null, -1),
              createBaseVNode("polyline", { points: "17 8 12 3 7 8" }, null, -1),
              createBaseVNode("line", {
                x1: "12",
                y1: "3",
                x2: "12",
                y2: "15"
              }, null, -1)
            ])])) : createCommentVNode("", true),
            stage.value === "loading" ? (openBlock(), createElementBlock("div", _hoisted_16)) : createCommentVNode("", true),
            createBaseVNode("p", _hoisted_17, toDisplayString(stage.value === "loading" ? "正在读取 playbook..." : "拖入 .zzts 文件到此处"), 1),
            stage.value !== "loading" ? (openBlock(), createElementBlock("p", _hoisted_18, "或点击选择文件")) : createCommentVNode("", true),
            error.value ? (openBlock(), createElementBlock("p", _hoisted_19, toDisplayString(error.value), 1)) : createCommentVNode("", true)
          ], 34)
        ])) : createCommentVNode("", true),
        stage.value === "preview" && meta.value ? (openBlock(), createElementBlock("div", _hoisted_20, [
          createBaseVNode("div", _hoisted_21, [
            _cache[11] || (_cache[11] = createBaseVNode("span", { class: "preview-icon" }, "📦", -1)),
            createBaseVNode("div", null, [
              createBaseVNode("h3", null, [
                createTextVNode(toDisplayString(meta.value.name) + " ", 1),
                createBaseVNode("span", _hoisted_22, "v" + toDisplayString(meta.value.version), 1)
              ]),
              createBaseVNode("p", _hoisted_23, "by " + toDisplayString(meta.value.author), 1)
            ])
          ]),
          createBaseVNode("div", _hoisted_24, [
            createBaseVNode("div", _hoisted_25, [
              _cache[12] || (_cache[12] = createBaseVNode("span", { class: "preview-label" }, "预计耗时", -1)),
              createBaseVNode("span", _hoisted_26, toDisplayString(meta.value.estimatedMinutes) + " 分钟", 1)
            ]),
            createBaseVNode("div", _hoisted_27, [
              _cache[13] || (_cache[13] = createBaseVNode("span", { class: "preview-label" }, "支持版本", -1)),
              createBaseVNode("span", _hoisted_28, toDisplayString(meta.value.supportedBuilds?.join(", ") || "全部"), 1)
            ])
          ]),
          createBaseVNode("p", _hoisted_29, toDisplayString(meta.value.shortDescription || meta.value.description), 1),
          createBaseVNode("div", _hoisted_30, [
            createBaseVNode("button", {
              class: "btn back",
              onClick: reset
            }, "重新选择"),
            createBaseVNode("button", {
              class: "btn deploy",
              onClick: _cache[2] || (_cache[2] = ($event) => stage.value = "config")
            }, "下一步 →")
          ])
        ])) : createCommentVNode("", true),
        stage.value === "config" && meta.value ? (openBlock(), createElementBlock("div", _hoisted_31, [
          createBaseVNode("div", _hoisted_32, [
            createBaseVNode("div", _hoisted_33, [
              _cache[14] || (_cache[14] = createBaseVNode("span", null, "名称", -1)),
              createBaseVNode("strong", null, toDisplayString(meta.value.name), 1)
            ]),
            createBaseVNode("div", _hoisted_34, [
              _cache[15] || (_cache[15] = createBaseVNode("span", null, "版本", -1)),
              createBaseVNode("strong", null, toDisplayString(meta.value.version), 1)
            ]),
            createBaseVNode("div", _hoisted_35, [
              _cache[16] || (_cache[16] = createBaseVNode("span", null, "预计耗时", -1)),
              createBaseVNode("strong", _hoisted_36, toDisplayString(meta.value.estimatedMinutes) + " 分钟", 1)
            ]),
            createBaseVNode("div", _hoisted_37, [
              _cache[17] || (_cache[17] = createBaseVNode("span", null, "支持版本", -1)),
              createBaseVNode("strong", null, toDisplayString(meta.value.supportedBuilds?.join(", ") || "全部"), 1)
            ])
          ]),
          createBaseVNode("p", _hoisted_38, toDisplayString(meta.value.shortDescription || meta.value.description), 1),
          !meta.value.featurePages || meta.value.featurePages.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_39, " 此 playbook 无可配置选项，将使用默认设置部署。 ")) : createCommentVNode("", true),
          (openBlock(true), createElementBlock(Fragment, null, renderList(meta.value.featurePages, (fp, i) => {
            return openBlock(), createElementBlock("div", {
              key: i,
              class: "feature-section"
            }, [
              createBaseVNode("h4", null, [
                createTextVNode(toDisplayString(fp.description) + " ", 1),
                createBaseVNode("span", _hoisted_40, toDisplayString(fp.pageType === "RadioPage" || fp.pageType === "RadioImagePage" ? `(单选: ${getSelectedLabel(fp)})` : `(已选 ${countSelected(fp)}/${fp.options.length})`), 1)
              ]),
              (openBlock(true), createElementBlock(Fragment, null, renderList(fp.options, (opt) => {
                return openBlock(), createElementBlock("label", {
                  key: opt.name,
                  class: "feature-option"
                }, [
                  createBaseVNode("input", {
                    type: fp.pageType === "RadioPage" || fp.pageType === "RadioImagePage" ? "radio" : "checkbox",
                    name: "fp_" + i,
                    checked: opt.isChecked,
                    onChange: ($event) => onOptionToggle(fp, opt, $event)
                  }, null, 40, _hoisted_41),
                  createBaseVNode("span", null, toDisplayString(opt.text), 1)
                ]);
              }), 128))
            ]);
          }), 128)),
          createBaseVNode("div", _hoisted_42, [
            createBaseVNode("button", {
              class: "btn back",
              onClick: _cache[3] || (_cache[3] = ($event) => stage.value = "preview")
            }, "返回"),
            createBaseVNode("button", {
              class: "btn check",
              onClick: runCheck,
              disabled: checking.value
            }, toDisplayString(checking.value ? "检查中…" : "环境检查"), 9, _hoisted_43),
            createBaseVNode("button", {
              class: "btn deploy",
              onClick: startDeploy,
              disabled: deploying.value || startingDeploy.value
            }, "开始部署", 8, _hoisted_44)
          ]),
          checkResult.value ? (openBlock(), createElementBlock("div", _hoisted_45, [
            createBaseVNode("div", {
              class: normalizeClass(["check-summary", { ok: checkResult.value.allMet, bad: !checkResult.value.allMet }])
            }, toDisplayString(checkResult.value.allMet ? "✓ 所有检查项已满足，可以部署" : "✗ 存在未满足的检查项"), 3),
            (openBlock(true), createElementBlock(Fragment, null, renderList(checkResult.value.items, (item) => {
              return openBlock(), createElementBlock("div", {
                key: item.key,
                class: normalizeClass(["check-item", { met: item.met, unmet: !item.met }])
              }, [
                createBaseVNode("span", _hoisted_46, toDisplayString(item.name), 1),
                createBaseVNode("span", _hoisted_47, toDisplayString(item.met ? "✓" : "✗") + " " + toDisplayString(item.current), 1)
              ], 2);
            }), 128)),
            !checkResult.value.allMet && checkResult.value.message ? (openBlock(), createElementBlock("p", _hoisted_48, toDisplayString(checkResult.value.message), 1)) : createCommentVNode("", true)
          ])) : createCommentVNode("", true)
        ])) : createCommentVNode("", true),
        stage.value === "deploying" ? (openBlock(), createElementBlock("div", _hoisted_49, [
          createBaseVNode("div", _hoisted_50, [
            createBaseVNode("div", {
              class: "progress-fill",
              style: normalizeStyle({ width: progressPct.value + "%" })
            }, null, 4)
          ]),
          createBaseVNode("div", _hoisted_51, toDisplayString(progressPct.value) + "%", 1),
          deployMode.value ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(["mode-badge", deployMode.value])
          }, toDisplayString(deployMode.value === "ti" ? "TI 模式" : "Admin 模式"), 3)) : createCommentVNode("", true),
          createBaseVNode("div", _hoisted_52, toDisplayString(statusText.value), 1),
          stallWarning.value ? (openBlock(), createElementBlock("div", _hoisted_53, toDisplayString(stallWarning.value), 1)) : createCommentVNode("", true),
          elapsed.value ? (openBlock(), createElementBlock("div", _hoisted_54, "已用时: " + toDisplayString(elapsed.value), 1)) : createCommentVNode("", true),
          createBaseVNode("div", {
            class: "log-panel",
            ref_key: "logPanel",
            ref: logPanel
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(logLines.value, (l, i) => {
              return openBlock(), createElementBlock("div", {
                key: i,
                class: normalizeClass(["log-line", l.level])
              }, [
                createBaseVNode("span", _hoisted_55, toDisplayString(l.level === "error" ? "✗" : l.level === "warning" ? "⚠" : "✓"), 1),
                createBaseVNode("span", _hoisted_56, toDisplayString(l.time), 1),
                createBaseVNode("span", _hoisted_57, toDisplayString(l.text), 1)
              ], 2);
            }), 128))
          ], 512),
          !done.value ? (openBlock(), createElementBlock("button", {
            key: 3,
            class: "btn cancel",
            onClick: cancelDeploy
          }, "中止部署")) : createCommentVNode("", true),
          confirmPrompt.value ? (openBlock(), createElementBlock("div", _hoisted_58, [
            createBaseVNode("div", _hoisted_59, [
              _cache[18] || (_cache[18] = createBaseVNode("div", { class: "confirm-icon" }, "⚠", -1)),
              _cache[19] || (_cache[19] = createBaseVNode("h3", null, "需要您手动操作", -1)),
              createBaseVNode("p", _hoisted_60, toDisplayString(confirmPrompt.value), 1),
              _cache[20] || (_cache[20] = createBaseVNode("p", { class: "confirm-hint" }, "完成上述操作后，重新检测实际状态，通过后继续部署。", -1)),
              error.value ? (openBlock(), createElementBlock("p", _hoisted_61, toDisplayString(error.value), 1)) : createCommentVNode("", true),
              createBaseVNode("button", {
                class: "btn deploy",
                onClick: confirmContinue
              }, "重新检测并继续")
            ])
          ])) : createCommentVNode("", true)
        ])) : createCommentVNode("", true),
        stage.value === "done" ? (openBlock(), createElementBlock("div", _hoisted_62, [
          createBaseVNode("div", {
            class: normalizeClass(["complete-icon", resultOk.value ? "success" : "error"])
          }, toDisplayString(resultOk.value ? "✓" : "⚠"), 3),
          createBaseVNode("h3", null, toDisplayString(resultTitle.value), 1),
          createBaseVNode("p", _hoisted_63, [
            resultOk.value ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              _cache[21] || (_cache[21] = createTextVNode(" 部署成功", -1)),
              _cache[22] || (_cache[22] = createBaseVNode("br", null, null, -1)),
              createTextVNode(toDisplayString(resultActionCount.value) + " 个操作，耗时 " + toDisplayString(resultDuration.value), 1)
            ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              createTextVNode(toDisplayString(resultErrorCount.value) + " 个错误", 1),
              _cache[23] || (_cache[23] = createBaseVNode("br", null, null, -1)),
              createTextVNode("耗时 " + toDisplayString(resultDuration.value), 1)
            ], 64))
          ]),
          resultLogFolder.value ? (openBlock(), createElementBlock("div", _hoisted_64, [
            createBaseVNode("span", null, "日志: " + toDisplayString(resultLogFolder.value), 1)
          ])) : createCommentVNode("", true),
          createBaseVNode("div", _hoisted_65, [
            resultLogFolder.value ? (openBlock(), createElementBlock("button", {
              key: 0,
              class: "btn secondary",
              onClick: openLogs
            }, " 查看日志")) : createCommentVNode("", true),
            createBaseVNode("button", {
              class: "btn warn",
              onClick: restartSystem
            }, "重启系统"),
            createBaseVNode("button", {
              class: "btn primary",
              onClick: reset
            }, "✓ 完成")
          ])
        ])) : createCommentVNode("", true)
      ]);
    };
  }
});
const SystemDeployer = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-0ed546cc"]]);
export {
  SystemDeployer as default
};
