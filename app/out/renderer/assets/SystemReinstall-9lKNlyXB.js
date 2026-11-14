import { a9 as ref, t as defineComponent, a1 as onMounted, a3 as onUnmounted, l as createElementBlock, i as createBaseVNode, p as createStaticVNode, k as createCommentVNode, q as createTextVNode, F as Fragment, ab as renderList, ak as toDisplayString, S as normalizeClass, aG as withDirectives, aA as vModelText, as as unref, V as normalizeStyle, g as computed, a5 as openBlock, _ as _export_sfc } from "./main-DAqTdO6U.js";
const deploySessionActive = ref(false);
const _hoisted_1 = {
  class: "page",
  "data-tour": "system-reinstall"
};
const _hoisted_2 = { class: "page-header" };
const _hoisted_3 = { style: { "margin-left": "auto", "display": "flex", "gap": "8px" } };
const _hoisted_4 = ["disabled"];
const _hoisted_5 = {
  key: 0,
  class: "empty-hint"
};
const _hoisted_6 = {
  key: 1,
  class: "warn-banner"
};
const _hoisted_7 = {
  key: 2,
  class: "section"
};
const _hoisted_8 = { class: "source-grid" };
const _hoisted_9 = ["onClick"];
const _hoisted_10 = { class: "source-body" };
const _hoisted_11 = { class: "source-title" };
const _hoisted_12 = { class: "source-meta" };
const _hoisted_13 = {
  key: 0,
  class: "meta-text"
};
const _hoisted_14 = { class: "meta-text" };
const _hoisted_15 = {
  key: 0,
  class: "source-path"
};
const _hoisted_16 = { class: "action-row" };
const _hoisted_17 = ["disabled"];
const _hoisted_18 = ["disabled"];
const _hoisted_19 = { class: "rt" };
const _hoisted_20 = {
  key: 0,
  class: "rt-sub"
};
const _hoisted_21 = {
  key: 1,
  class: "rt-sub"
};
const _hoisted_22 = {
  key: 3,
  class: "section"
};
const _hoisted_23 = { class: "machine-groups" };
const _hoisted_24 = { class: "group-subtitle" };
const _hoisted_25 = { class: "machine-grid" };
const _hoisted_26 = { class: "mc-row" };
const _hoisted_27 = { class: "mc-label" };
const _hoisted_28 = { class: "mc-hint" };
const _hoisted_29 = { class: "action-row" };
const _hoisted_30 = ["disabled"];
const _hoisted_31 = { class: "machine-count" };
const _hoisted_32 = {
  key: 4,
  class: "section"
};
const _hoisted_33 = { class: "deploy-card" };
const _hoisted_34 = { class: "deploy-text" };
const _hoisted_35 = { class: "deploy-title" };
const _hoisted_36 = { class: "deploy-desc" };
const _hoisted_37 = { class: "drive-row" };
const _hoisted_38 = ["disabled"];
const _hoisted_39 = ["disabled"];
const _hoisted_40 = {
  key: 0,
  class: "progress-wrap"
};
const _hoisted_41 = { class: "progress-bar" };
const _hoisted_42 = { class: "progress-text" };
const _hoisted_43 = { class: "rt" };
const _hoisted_44 = {
  key: 0,
  class: "rt-sub"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SystemReinstall",
  setup(__props) {
    const isAdmin = ref(true);
    const loading = ref(true);
    const sources = ref([]);
    const selectedSourceId = ref("");
    const customIsoPath = ref("");
    const selectedSource = computed(() => {
      if (selectedSourceId.value === "custom-iso" && customIsoPath.value) {
        return { id: "custom-iso", kind: "custom-iso", displayName: "自定义 ISO", available: true, sizeBytes: 0, version: "", path: customIsoPath.value };
      }
      return sources.value.find((s) => s.id === selectedSourceId.value) || null;
    });
    const isoValidating = ref(false);
    const isoValidation = ref(null);
    const machineId = ref({
      machineGuid: "",
      machineSid: "",
      biosManufacturer: "",
      baseBoardProduct: "",
      systemName: "",
      diskSerial: "",
      memorySerial: "",
      memoryPartNumber: "",
      cpuSerial: "",
      biosSerial: "",
      baseBoardSerial: "",
      uuid: "",
      macAddress: ""
    });
    const machineFields = [
      { key: "biosManufacturer", label: "系统品牌", hint: "HKLMBIOSSystemManufacturer" },
      { key: "baseBoardProduct", label: "主板型号", hint: "BIOSBaseBoardProduct" },
      { key: "systemName", label: "主机名", hint: "Win32_ComputerSystemProduct" },
      { key: "diskSerial", label: "硬盘序列号", hint: "Win32_DiskDrive（首个）" },
      { key: "memorySerial", label: "内存序列号", hint: "Win32_PhysicalMemory（首条）" },
      { key: "memoryPartNumber", label: "内存零件号", hint: "Win32_PhysicalMemory（首条）" },
      { key: "cpuSerial", label: "CPU 序列号", hint: "Win32_Processor" },
      { key: "biosSerial", label: "BIOS 序列号", hint: "Win32_BIOS" },
      { key: "baseBoardSerial", label: "主板序列号", hint: "Win32_BaseBoard" },
      { key: "uuid", label: "UUID", hint: "Win32_ComputerSystemProduct" },
      { key: "macAddress", label: "MAC 地址", hint: "Get-NetAdapter（首个 Up）" },
      { key: "machineGuid", label: "MachineGuid", hint: "HKLMCryptography" },
      { key: "machineSid", label: "机器/域 SID", hint: "whoami /user（去 RID）" }
    ];
    function pick(keys) {
      return machineFields.filter((f) => keys.includes(f.key));
    }
    const machineGroups = [
      { title: "系统标识", fields: pick(["systemName", "uuid", "machineGuid", "machineSid"]) },
      { title: "主板 & BIOS", fields: pick(["biosManufacturer", "baseBoardProduct", "biosSerial", "baseBoardSerial"]) },
      { title: "硬件序列号", fields: pick(["diskSerial", "cpuSerial", "memorySerial", "memoryPartNumber"]) },
      { title: "网络", fields: pick(["macAddress"]) }
    ];
    const machineIdLoading = ref(false);
    const deploying = ref(false);
    const deployProgress = ref(null);
    const targetDrive = ref("D:");
    function normalizeDrive() {
      const m = targetDrive.value.toUpperCase().match(/^([A-Z]):?$/);
      targetDrive.value = m ? `${m[1]}:` : "D:";
    }
    const flashMsg = ref(null);
    function setFlash(type, text, detail) {
      flashMsg.value = { type, text, detail };
      setTimeout(() => {
        flashMsg.value = null;
      }, 5e3);
    }
    function formatSize(bytes) {
      const units = ["B", "KB", "MB", "GB", "TB"];
      const i = Math.floor(Math.log(bytes) / Math.log(1024));
      return (bytes / Math.pow(1024, i)).toFixed(i > 0 ? 1 : 0) + " " + units[i];
    }
    function selectSource(s) {
      if (!s.available && s.kind === "custom-iso") return;
      selectedSourceId.value = s.id;
      isoValidation.value = null;
    }
    async function loadSources() {
      if (!window.reinstallApi) {
        loading.value = false;
        return;
      }
      loading.value = true;
      try {
        const r = await window.reinstallApi.listSources();
        if (r.success) {
          sources.value = (r.sources || []).filter((s) => s.kind !== "custom-iso" || s.available);
          selectedSourceId.value = sources.value.find((s) => s.available)?.id || "";
        } else setFlash("error", "检测镜像来源失败", r.error);
      } catch (e) {
        setFlash("error", "检测镜像来源异常", e.message);
      } finally {
        loading.value = false;
      }
    }
    async function loadMachineId() {
      if (!window.reinstallApi) return;
      machineIdLoading.value = true;
      try {
        const r = await window.reinstallApi.getMachineId();
        if (r.success && r.machine) {
          machineId.value = { ...machineId.value, ...r.machine };
        } else setFlash("error", "读取机器码失败", r.error);
      } catch (e) {
        setFlash("error", "读取机器码异常", e.message);
      } finally {
        machineIdLoading.value = false;
      }
    }
    async function pickAndImportIso() {
      if (!window.reinstallApi || !isAdmin.value || isoValidating.value) return;
      isoValidating.value = true;
      isoValidation.value = null;
      try {
        const r = await window.reinstallApi.importIso("");
        isoValidation.value = { valid: r.valid, bootableVersion: r.bootableVersion, errorMessage: r.errorMessage };
        if (r.valid) {
          customIsoPath.value = r.path || "";
          selectedSourceId.value = "custom-iso";
          setFlash("success", "✅ ISO 校验通过，已选为部署来源", r.bootableVersion);
        } else setFlash("error", "❌ ISO 校验未通过", r.errorMessage);
      } catch (e) {
        isoValidation.value = { valid: false, errorMessage: e.message };
        setFlash("error", "❌ ISO 导入异常", e.message);
      } finally {
        isoValidating.value = false;
      }
    }
    async function validateSelected() {
      if (!window.reinstallApi || !selectedSource.value?.path) return;
      isoValidating.value = true;
      isoValidation.value = null;
      try {
        const r = await window.reinstallApi.importIso(selectedSource.value.path);
        isoValidation.value = { valid: r.valid, bootableVersion: r.bootableVersion, errorMessage: r.errorMessage };
        if (r.valid) setFlash("success", "✅ 镜像校验通过", r.bootableVersion);
        else setFlash("error", "❌ 镜像校验未通过", r.errorMessage);
      } catch (e) {
        isoValidation.value = { valid: false, errorMessage: e.message };
        setFlash("error", "❌ 校验异常", e.message);
      } finally {
        isoValidating.value = false;
      }
    }
    let progressUnsub = null;
    async function startDeploy() {
      if (!window.reinstallApi || !selectedSource.value || deploying.value) return;
      if (deploySessionActive.value) {
        setFlash("info", "检测到部署会话仍在进行，请确认状态", "上一次部署可能仍在进行，请勿重复发起部署");
        return;
      }
      normalizeDrive();
      if (targetDrive.value === "C:") {
        setFlash("error", "目标分区不能是 C:", "C: 是当前系统盘，请选择其他分区（如 D:）");
        return;
      }
      if (!confirm(`确认开始部署「${selectedSource.value.displayName}」？

⚠ 此操作将格式化 ${targetDrive.value} 分区（该分区全部数据将被永久清除）并重装 Windows！
请确认 ${targetDrive.value} 上没有重要数据。

此操作不可逆！`)) return;
      deploying.value = true;
      deploySessionActive.value = true;
      deployProgress.value = { percent: 0, stage: "准备中..." };
      progressUnsub?.();
      if (window.reinstallApi?.onDeployProgress) {
        progressUnsub = window.reinstallApi.onDeployProgress((p) => {
          deployProgress.value = p;
        });
      }
      try {
        const isoPath = selectedSourceId.value === "custom-iso" ? customIsoPath.value : "";
        const r = await window.reinstallApi.deploy(selectedSource.value.id, isoPath, targetDrive.value);
        if (r.success) {
          deployProgress.value = { percent: 100, stage: "部署完成！需重启电脑", done: true };
          setFlash("success", "部署成功，需重启", r.message);
        } else setFlash("error", "部署失败", r.error);
      } catch (e) {
        setFlash("error", "部署异常", e.message);
      } finally {
        deploying.value = false;
        deploySessionActive.value = false;
        progressUnsub?.();
        progressUnsub = null;
      }
    }
    onMounted(async () => {
      isAdmin.value = await window.sysApi?.isAdmin?.() ?? false;
      if (deploySessionActive.value) {
        setFlash("info", "检测到部署会话仍在进行，请确认状态", "上一次部署可能仍在进行，请勿重复发起部署");
      }
      await loadSources();
      await loadMachineId();
    });
    onUnmounted(() => {
      progressUnsub?.();
      progressUnsub = null;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          _cache[1] || (_cache[1] = createStaticVNode('<div class="page-icon" style="background:rgba(56,189,248,0.1);" data-v-f6190407><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="1.5" data-v-f6190407><rect x="2" y="3" width="20" height="14" rx="2" ry="2" data-v-f6190407></rect><line x1="8" y1="21" x2="16" y2="21" data-v-f6190407></line><line x1="12" y1="17" x2="12" y2="21" data-v-f6190407></line></svg></div><div data-v-f6190407><h2 class="page-title" data-v-f6190407>系统重装与初始化</h2><p class="page-desc" data-v-f6190407>镜像来源 · ISO 校验 · 机器码只读展示 · 无人值守部署</p></div>', 2)),
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("button", {
              class: "action-btn silver",
              onClick: loadSources,
              disabled: loading.value
            }, "刷新镜像", 8, _hoisted_4)
          ])
        ]),
        loading.value ? (openBlock(), createElementBlock("div", _hoisted_5, "正在检测可用镜像来源...")) : createCommentVNode("", true),
        !isAdmin.value ? (openBlock(), createElementBlock("div", _hoisted_6, [..._cache[2] || (_cache[2] = [
          createBaseVNode("svg", {
            width: "16",
            height: "16",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": "2"
          }, [
            createBaseVNode("path", { d: "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" }),
            createBaseVNode("line", {
              x1: "12",
              y1: "9",
              x2: "12",
              y2: "13"
            }),
            createBaseVNode("line", {
              x1: "12",
              y1: "17",
              x2: "12.01",
              y2: "17"
            })
          ], -1),
          createTextVNode(" 非管理员模式 — 镜像校验与部署操作不可用 ", -1)
        ])])) : createCommentVNode("", true),
        !loading.value ? (openBlock(), createElementBlock("div", _hoisted_7, [
          _cache[4] || (_cache[4] = createBaseVNode("div", { class: "section-title" }, "镜像来源", -1)),
          createBaseVNode("div", _hoisted_8, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(sources.value, (s) => {
              return openBlock(), createElementBlock("div", {
                class: normalizeClass(["source-card", { available: s.available, selected: selectedSourceId.value === s.id, hidden: !s.available && s.kind === "custom-iso" }]),
                key: s.id,
                onClick: ($event) => selectSource(s)
              }, [
                _cache[3] || (_cache[3] = createStaticVNode('<div class="source-icon" data-v-f6190407><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-v-f6190407><rect x="2" y="2" width="20" height="8" rx="2" data-v-f6190407></rect><rect x="2" y="14" width="20" height="8" rx="2" data-v-f6190407></rect><line x1="6" y1="6" x2="6.01" y2="6" data-v-f6190407></line><line x1="6" y1="18" x2="6.01" y2="18" data-v-f6190407></line></svg></div>', 1)),
                createBaseVNode("div", _hoisted_10, [
                  createBaseVNode("div", _hoisted_11, toDisplayString(s.displayName), 1),
                  createBaseVNode("div", _hoisted_12, [
                    createBaseVNode("span", {
                      class: normalizeClass(["badge", s.available ? "ok" : "warn"])
                    }, toDisplayString(s.available ? "可用" : "未提供"), 3),
                    s.available && s.sizeBytes ? (openBlock(), createElementBlock("span", _hoisted_13, toDisplayString(formatSize(s.sizeBytes)), 1)) : createCommentVNode("", true),
                    createBaseVNode("span", _hoisted_14, toDisplayString(s.version || "未指定版本"), 1)
                  ]),
                  s.available && s.path ? (openBlock(), createElementBlock("div", _hoisted_15, toDisplayString(s.path), 1)) : createCommentVNode("", true)
                ]),
                createBaseVNode("div", {
                  class: normalizeClass(["source-radio", { on: selectedSourceId.value === s.id }])
                }, null, 2)
              ], 10, _hoisted_9);
            }), 128))
          ]),
          createBaseVNode("div", _hoisted_16, [
            createBaseVNode("button", {
              class: "action-btn silver",
              onClick: pickAndImportIso,
              disabled: !isAdmin.value || isoValidating.value
            }, toDisplayString(isoValidating.value ? "校验中..." : "导入自定义 ISO..."), 9, _hoisted_17),
            createBaseVNode("button", {
              class: "action-btn silver",
              onClick: validateSelected,
              disabled: !selectedSource.value?.available || !selectedSource.value?.path || isoValidating.value
            }, " 校验选中镜像 ", 8, _hoisted_18)
          ]),
          isoValidation.value ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(["result-panel", isoValidation.value.valid ? "success" : "error"])
          }, [
            createBaseVNode("div", _hoisted_19, toDisplayString(isoValidation.value.valid ? "✅ ISO 校验通过" : "❌ ISO 校验未通过"), 1),
            isoValidation.value.valid && isoValidation.value.bootableVersion ? (openBlock(), createElementBlock("div", _hoisted_20, "检测版本：" + toDisplayString(isoValidation.value.bootableVersion), 1)) : createCommentVNode("", true),
            !isoValidation.value.valid && isoValidation.value.errorMessage ? (openBlock(), createElementBlock("div", _hoisted_21, toDisplayString(isoValidation.value.errorMessage), 1)) : createCommentVNode("", true)
          ], 2)) : createCommentVNode("", true)
        ])) : createCommentVNode("", true),
        !loading.value ? (openBlock(), createElementBlock("div", _hoisted_22, [
          _cache[5] || (_cache[5] = createBaseVNode("div", { class: "section-title" }, "机器码（只读）", -1)),
          createBaseVNode("div", _hoisted_23, [
            (openBlock(), createElementBlock(Fragment, null, renderList(machineGroups, (g) => {
              return createBaseVNode("div", {
                class: "machine-group",
                key: g.title
              }, [
                createBaseVNode("div", _hoisted_24, toDisplayString(g.title), 1),
                createBaseVNode("div", _hoisted_25, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(g.fields, (f) => {
                    return openBlock(), createElementBlock("div", {
                      class: "machine-card",
                      key: f.key
                    }, [
                      createBaseVNode("div", _hoisted_26, [
                        createBaseVNode("span", _hoisted_27, toDisplayString(f.label), 1),
                        createBaseVNode("span", {
                          class: normalizeClass(["mc-value", { muted: !machineId.value[f.key] }])
                        }, toDisplayString(machineId.value[f.key] || (machineIdLoading.value ? "读取中..." : "—")), 3)
                      ]),
                      createBaseVNode("div", _hoisted_28, toDisplayString(f.hint), 1)
                    ]);
                  }), 128))
                ])
              ]);
            }), 64))
          ]),
          createBaseVNode("div", _hoisted_29, [
            createBaseVNode("button", {
              class: "action-btn silver",
              onClick: loadMachineId,
              disabled: machineIdLoading.value
            }, "刷新机器码", 8, _hoisted_30),
            createBaseVNode("span", _hoisted_31, "共 " + toDisplayString(machineFields.length) + " 项 · 只读展示", 1)
          ])
        ])) : createCommentVNode("", true),
        !loading.value ? (openBlock(), createElementBlock("div", _hoisted_32, [
          _cache[10] || (_cache[10] = createBaseVNode("div", { class: "section-title" }, "无人值守部署", -1)),
          createBaseVNode("div", _hoisted_33, [
            createBaseVNode("div", _hoisted_34, [
              createBaseVNode("div", _hoisted_35, toDisplayString(selectedSource.value?.available ? `准备部署：${selectedSource.value.displayName}` : "请先选择一个可用镜像来源"), 1),
              createBaseVNode("div", _hoisted_36, [
                _cache[6] || (_cache[6] = createTextVNode("⚠ 部署流程会", -1)),
                createBaseVNode("strong", null, "格式化 " + toDisplayString(targetDrive.value) + " 分区", 1),
                _cache[7] || (_cache[7] = createTextVNode("（该分区全部数据将被清除），随后重启进入新系统", -1))
              ]),
              createBaseVNode("div", _hoisted_37, [
                _cache[8] || (_cache[8] = createBaseVNode("label", {
                  class: "drive-label",
                  for: "target-drive"
                }, "目标分区", -1)),
                withDirectives(createBaseVNode("input", {
                  id: "target-drive",
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => targetDrive.value = $event),
                  class: "drive-input",
                  maxlength: "2",
                  disabled: deploying.value,
                  onBlur: normalizeDrive
                }, null, 40, _hoisted_38), [
                  [vModelText, targetDrive.value]
                ]),
                _cache[9] || (_cache[9] = createBaseVNode("span", { class: "drive-hint" }, "不允许 C:（当前系统盘）；分区数据将被格式化，务必先备份", -1))
              ])
            ]),
            createBaseVNode("button", {
              class: "action-btn danger",
              onClick: startDeploy,
              disabled: !selectedSource.value?.available || deploying.value || unref(deploySessionActive)
            }, toDisplayString(deploying.value ? "部署中..." : unref(deploySessionActive) ? "部署会话进行中" : "开始部署"), 9, _hoisted_39)
          ]),
          deployProgress.value ? (openBlock(), createElementBlock("div", _hoisted_40, [
            createBaseVNode("div", _hoisted_41, [
              createBaseVNode("div", {
                class: "progress-fill",
                style: normalizeStyle({ width: deployProgress.value.percent + "%" })
              }, null, 4)
            ]),
            createBaseVNode("div", _hoisted_42, toDisplayString(deployProgress.value.percent) + "% — " + toDisplayString(deployProgress.value.stage), 1)
          ])) : createCommentVNode("", true)
        ])) : createCommentVNode("", true),
        flashMsg.value ? (openBlock(), createElementBlock("div", {
          key: 5,
          class: normalizeClass(["result-panel", flashMsg.value.type])
        }, [
          createBaseVNode("div", _hoisted_43, toDisplayString(flashMsg.value.text), 1),
          flashMsg.value.detail ? (openBlock(), createElementBlock("div", _hoisted_44, toDisplayString(flashMsg.value.detail), 1)) : createCommentVNode("", true)
        ], 2)) : createCommentVNode("", true)
      ]);
    };
  }
});
const SystemReinstall = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f6190407"]]);
export {
  SystemReinstall as default
};
