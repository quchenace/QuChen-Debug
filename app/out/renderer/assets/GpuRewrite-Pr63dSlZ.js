import { t as defineComponent, a1 as onMounted, l as createElementBlock, p as createStaticVNode, i as createBaseVNode, q as createTextVNode, ak as toDisplayString, F as Fragment, ab as renderList, k as createCommentVNode, aG as withDirectives, az as vModelSelect, aA as vModelText, S as normalizeClass, a9 as ref, g as computed, a5 as openBlock, _ as _export_sfc } from "./main-DAqTdO6U.js";
const _hoisted_1 = {
  "data-tour": "gpu-rewrite",
  class: "page"
};
const _hoisted_2 = { class: "content-grid" };
const _hoisted_3 = { class: "main-panel" };
const _hoisted_4 = { class: "scan-section" };
const _hoisted_5 = ["disabled"];
const _hoisted_6 = {
  key: 0,
  class: "device-list"
};
const _hoisted_7 = ["onClick"];
const _hoisted_8 = { class: "dev-row" };
const _hoisted_9 = { class: "dev-name" };
const _hoisted_10 = {
  key: 0,
  class: "badge backup-badge"
};
const _hoisted_11 = {
  key: 1,
  class: "badge mod-badge"
};
const _hoisted_12 = { class: "dev-path" };
const _hoisted_13 = {
  key: 1,
  class: "empty"
};
const _hoisted_14 = {
  key: 2,
  class: "edit-panel"
};
const _hoisted_15 = { class: "current-name" };
const _hoisted_16 = { class: "action-row" };
const _hoisted_17 = ["disabled"];
const _hoisted_18 = ["disabled"];
const _hoisted_19 = ["disabled"];
const _hoisted_20 = { class: "result-title" };
const _hoisted_21 = {
  key: 3,
  class: "backup-bar"
};
const _hoisted_22 = { class: "side-panel" };
const _hoisted_23 = { class: "gpu-stats" };
const _hoisted_24 = { class: "stat-row" };
const _hoisted_25 = { class: "stat-value" };
const _hoisted_26 = { class: "stat-row" };
const _hoisted_27 = { class: "stat-value hl" };
const _hoisted_28 = { class: "stat-row" };
const _hoisted_29 = { class: "stat-value hl" };
const _hoisted_30 = { class: "stat-row" };
const _hoisted_31 = { class: "stat-value" };
const _hoisted_32 = { class: "stat-row" };
const _hoisted_33 = { class: "stat-value" };
const _hoisted_34 = { class: "stat-row" };
const _hoisted_35 = { class: "stat-value" };
const _hoisted_36 = { class: "stat-row" };
const _hoisted_37 = { class: "stat-value small" };
const _hoisted_38 = {
  key: 1,
  class: "smi-empty"
};
const _hoisted_39 = {
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5",
  style: { "opacity": "0.3" }
};
const _hoisted_40 = ["disabled"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "GpuRewrite",
  setup(__props) {
    const loading = ref(false);
    const scanned = ref(false);
    const rewriting = ref(false);
    const restoring = ref(false);
    const restarting = ref(false);
    const refreshingGpu = ref(false);
    const devices = ref([]);
    const selectedPath = ref("");
    const selectedDevice = computed(() => devices.value.find((d) => d.regPath === selectedPath.value));
    const selectedBackedUp = computed(() => selectedDevice.value?.backedUp ?? false);
    const preset = ref("");
    const customName = ref("");
    const result = ref(null);
    const gpuDetail = ref({ available: false });
    const backupStore = ref({});
    const hasBackups = computed(() => Object.keys(backupStore.value).length > 0);
    function selectDevice(dev) {
      selectedPath.value = dev.regPath;
      preset.value = "";
      customName.value = "";
      result.value = null;
    }
    async function scanDevices() {
      loading.value = true;
      scanned.value = true;
      selectedPath.value = "";
      result.value = null;
      devices.value = [];
      backupStore.value = {};
      if (!window.sysApi) {
        loading.value = false;
        return;
      }
      let r;
      try {
        r = await window.sysApi.getGPUs();
      } catch (e) {
        loading.value = false;
        result.value = { type: "error", title: "✗ 扫描失败", logs: [e?.message || "GPU 扫描 IPC 异常"] };
        return;
      }
      loading.value = false;
      if (!r?.devices) return;
      if (r.backups) {
        for (const key of Object.keys(r.backups)) {
          backupStore.value[key] = r.backups[key].originalName;
        }
      }
      devices.value = r.devices.map((d) => {
        const regPath = d.regPath || d.instanceId;
        const origName = backupStore.value[d.instanceId] || backupStore.value[regPath] || "";
        return {
          name: origName || d.name,
          regPath,
          instanceId: d.instanceId || regPath,
          backedUp: !!origName,
          modified: !!origName && origName !== d.name
        };
      });
    }
    async function doRewrite() {
      const targetName = preset.value || customName.value.trim();
      if (!selectedPath.value || !targetName || !window.sysApi) return;
      rewriting.value = true;
      result.value = null;
      let r;
      try {
        r = await window.sysApi.rewriteGPU(selectedPath.value, targetName);
      } catch (e) {
        r = { success: false, error: e?.message || "IPC 异常" };
      } finally {
        rewriting.value = false;
      }
      result.value = {
        type: r.success ? "success" : "error",
        title: r.success ? `✓ 改写成功: ${r.originalName} → ${r.newName}` : "✗ 改写失败",
        logs: r.logs || [r.error || ""]
      };
      if (r.success) {
        backupStore.value[selectedPath.value] = r.originalName || "";
        const dev = devices.value.find((d) => d.regPath === selectedPath.value);
        if (dev) {
          dev.backedUp = true;
          dev.modified = true;
          dev.name = r.newName || dev.name;
        }
      }
    }
    async function doRestore() {
      if (!selectedPath.value || !window.sysApi) return;
      restoring.value = true;
      result.value = null;
      let r;
      try {
        r = await window.sysApi.restoreGPU(selectedPath.value);
      } catch (e) {
        r = { success: false, error: e?.message || "IPC 异常" };
      } finally {
        restoring.value = false;
      }
      result.value = {
        type: r.success ? "success" : "error",
        title: r.success ? `✓ 已恢复: ${r.originalName}` : "✗ 恢复失败",
        logs: r.logs || [r.error || ""]
      };
      if (r.success) {
        delete backupStore.value[selectedPath.value];
        const dev = devices.value.find((d) => d.regPath === selectedPath.value);
        if (dev) {
          dev.backedUp = false;
          dev.modified = false;
          dev.name = r.originalName || dev.name;
        }
      }
    }
    async function doRestart() {
      if (!selectedPath.value || !window.sysApi) return;
      restarting.value = true;
      result.value = null;
      let r;
      try {
        r = await window.sysApi.restartGPUDriver(selectedPath.value);
      } catch (e) {
        r = { success: false, error: e?.message || "IPC 异常" };
      } finally {
        restarting.value = false;
      }
      result.value = {
        type: r.success ? "success" : "error",
        title: r.success ? "✓ GPU 驱动已重启" : "✗ 驱动重启失败",
        logs: r.logs || [r.error || ""]
      };
    }
    onMounted(() => {
      scanDevices();
      refreshGpu();
    });
    async function refreshGpu() {
      refreshingGpu.value = true;
      try {
        if (window.sysApi) gpuDetail.value = await window.sysApi.getGpuDetail();
      } catch {
      } finally {
        refreshingGpu.value = false;
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        _cache[20] || (_cache[20] = createStaticVNode('<div class="page-header" data-v-2af2bece><div class="page-icon" style="background:rgba(168,85,247,0.08);" data-v-2af2bece><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#a855f7" stroke-width="1.5" data-v-2af2bece><rect x="2" y="3" width="20" height="14" rx="2" data-v-2af2bece></rect><line x1="8" y1="21" x2="16" y2="21" data-v-2af2bece></line><line x1="12" y1="17" x2="12" y2="21" data-v-2af2bece></line></svg></div><div data-v-2af2bece><h2 class="page-title" data-v-2af2bece>GPU 改写</h2><p class="page-desc" data-v-2af2bece>注册表 DeviceDesc 劫持 · 重启生效</p></div></div><div class="warning-card" data-v-2af2bece><span class="warn-icon" data-v-2af2bece>⚠</span><span data-v-2af2bece><strong data-v-2af2bece>需要管理员权限</strong> · 修改 HKLM\\SYSTEM\\ControlSet001\\Enum\\PCI 下的 DeviceDesc 键值。修改前自动备份，支持一键恢复。</span></div>', 2)),
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("div", _hoisted_4, [
              createBaseVNode("button", {
                class: "scan-btn",
                onClick: scanDevices,
                disabled: loading.value
              }, [
                _cache[4] || (_cache[4] = createBaseVNode("svg", {
                  width: "14",
                  height: "14",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "2"
                }, [
                  createBaseVNode("circle", {
                    cx: "11",
                    cy: "11",
                    r: "8"
                  }),
                  createBaseVNode("line", {
                    x1: "21",
                    y1: "21",
                    x2: "16.65",
                    y2: "16.65"
                  })
                ], -1)),
                createTextVNode(" " + toDisplayString(loading.value ? "正在扫描..." : "扫描显卡设备"), 1)
              ], 8, _hoisted_5)
            ]),
            devices.value.length ? (openBlock(), createElementBlock("div", _hoisted_6, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(devices.value, (dev) => {
                return openBlock(), createElementBlock("div", {
                  key: dev.regPath,
                  class: normalizeClass(["device-item", { selected: selectedPath.value === dev.regPath }]),
                  onClick: ($event) => selectDevice(dev)
                }, [
                  createBaseVNode("div", _hoisted_8, [
                    createBaseVNode("span", _hoisted_9, toDisplayString(dev.name), 1),
                    dev.backedUp ? (openBlock(), createElementBlock("span", _hoisted_10, "已备份")) : createCommentVNode("", true),
                    dev.modified ? (openBlock(), createElementBlock("span", _hoisted_11, "已改写")) : createCommentVNode("", true)
                  ]),
                  createBaseVNode("div", _hoisted_12, toDisplayString(dev.regPath), 1)
                ], 10, _hoisted_7);
              }), 128))
            ])) : createCommentVNode("", true),
            scanned.value && !devices.value.length ? (openBlock(), createElementBlock("div", _hoisted_13, "未检测到 NVIDIA/AMD 显卡设备")) : createCommentVNode("", true),
            selectedPath.value ? (openBlock(), createElementBlock("div", _hoisted_14, [
              _cache[6] || (_cache[6] = createBaseVNode("div", { class: "panel-label" }, "当前型号", -1)),
              createBaseVNode("div", _hoisted_15, toDisplayString(selectedDevice.value?.name), 1),
              _cache[7] || (_cache[7] = createBaseVNode("div", {
                class: "panel-label",
                style: { "margin-top": "16px" }
              }, "改写为", -1)),
              withDirectives(createBaseVNode("select", {
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => preset.value = $event),
                class: "cyber-select",
                onChange: _cache[1] || (_cache[1] = ($event) => customName.value = "")
              }, [..._cache[5] || (_cache[5] = [
                createStaticVNode('<option value="" data-v-2af2bece>-- 选择预设 --</option><option value="NVIDIA GeForce GTX 750 Ti" data-v-2af2bece>NVIDIA GeForce GTX 750 Ti</option><option value="NVIDIA GeForce GTX 650" data-v-2af2bece>NVIDIA GeForce GTX 650</option><option value="NVIDIA GeForce GTX 1050" data-v-2af2bece>NVIDIA GeForce GTX 1050</option><option value="NVIDIA GeForce GTX 1050 Ti" data-v-2af2bece>NVIDIA GeForce GTX 1050 Ti</option><option value="NVIDIA GeForce GT 1030" data-v-2af2bece>NVIDIA GeForce GT 1030</option><option value="AMD Radeon RX 550" data-v-2af2bece>AMD Radeon RX 550</option><option value="AMD Radeon RX 560" data-v-2af2bece>AMD Radeon RX 560</option><option value="Intel UHD Graphics 630" data-v-2af2bece>Intel UHD Graphics 630</option>', 9)
              ])], 544), [
                [vModelSelect, preset.value]
              ]),
              _cache[8] || (_cache[8] = createBaseVNode("div", { class: "or-divider" }, "或", -1)),
              withDirectives(createBaseVNode("input", {
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => customName.value = $event),
                class: "cyber-input",
                placeholder: "输入自定义显卡名称",
                onInput: _cache[3] || (_cache[3] = ($event) => preset.value = "")
              }, null, 544), [
                [vModelText, customName.value]
              ]),
              createBaseVNode("div", _hoisted_16, [
                createBaseVNode("button", {
                  class: "btn btn-rewrite",
                  onClick: doRewrite,
                  disabled: rewriting.value || !(preset.value || customName.value.trim())
                }, toDisplayString(rewriting.value ? "改写中..." : "应用修改"), 9, _hoisted_17),
                createBaseVNode("button", {
                  class: "btn btn-restore",
                  onClick: doRestore,
                  disabled: restoring.value || !selectedBackedUp.value
                }, toDisplayString(restoring.value ? "恢复中..." : "恢复原始名称"), 9, _hoisted_18),
                createBaseVNode("button", {
                  class: "btn btn-restart",
                  onClick: doRestart,
                  disabled: restarting.value
                }, toDisplayString(restarting.value ? "重启中..." : "重启显卡驱动"), 9, _hoisted_19)
              ]),
              result.value ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: normalizeClass(["result-box", result.value.type])
              }, [
                createBaseVNode("div", _hoisted_20, toDisplayString(result.value.title), 1),
                (openBlock(true), createElementBlock(Fragment, null, renderList(result.value.logs, (l, i) => {
                  return openBlock(), createElementBlock("div", {
                    class: "result-log",
                    key: i
                  }, toDisplayString(l), 1);
                }), 128))
              ], 2)) : createCommentVNode("", true)
            ])) : createCommentVNode("", true),
            hasBackups.value ? (openBlock(), createElementBlock("div", _hoisted_21, [..._cache[9] || (_cache[9] = [
              createBaseVNode("svg", {
                width: "14",
                height: "14",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                createBaseVNode("path", { d: "M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" })
              ], -1),
              createBaseVNode("span", null, "已有备份，可随时恢复", -1)
            ])])) : createCommentVNode("", true)
          ]),
          createBaseVNode("div", _hoisted_22, [
            _cache[19] || (_cache[19] = createBaseVNode("div", { class: "panel-label" }, "GPU 实时状态 (nvidia-smi)", -1)),
            createBaseVNode("div", _hoisted_23, [
              gpuDetail.value.available ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                createBaseVNode("div", _hoisted_24, [
                  _cache[10] || (_cache[10] = createBaseVNode("span", { class: "stat-label" }, "型号", -1)),
                  createBaseVNode("span", _hoisted_25, toDisplayString(gpuDetail.value.name || "—"), 1)
                ]),
                createBaseVNode("div", _hoisted_26, [
                  _cache[11] || (_cache[11] = createBaseVNode("span", { class: "stat-label" }, "温度", -1)),
                  createBaseVNode("span", _hoisted_27, toDisplayString(gpuDetail.value.temp ?? "—") + "°C", 1)
                ]),
                createBaseVNode("div", _hoisted_28, [
                  _cache[12] || (_cache[12] = createBaseVNode("span", { class: "stat-label" }, "GPU 占用", -1)),
                  createBaseVNode("span", _hoisted_29, toDisplayString(gpuDetail.value.gpuUsage ?? "—") + "%", 1)
                ]),
                createBaseVNode("div", _hoisted_30, [
                  _cache[13] || (_cache[13] = createBaseVNode("span", { class: "stat-label" }, "核心频率", -1)),
                  createBaseVNode("span", _hoisted_31, toDisplayString(gpuDetail.value.coreClock || "—") + " MHz", 1)
                ]),
                createBaseVNode("div", _hoisted_32, [
                  _cache[14] || (_cache[14] = createBaseVNode("span", { class: "stat-label" }, "显存频率", -1)),
                  createBaseVNode("span", _hoisted_33, toDisplayString(gpuDetail.value.memClock || "—") + " MHz", 1)
                ]),
                createBaseVNode("div", _hoisted_34, [
                  _cache[15] || (_cache[15] = createBaseVNode("span", { class: "stat-label" }, "功耗", -1)),
                  createBaseVNode("span", _hoisted_35, toDisplayString(gpuDetail.value.powerDraw || "—") + " / " + toDisplayString(gpuDetail.value.powerLimit || "—") + " W", 1)
                ]),
                createBaseVNode("div", _hoisted_36, [
                  _cache[16] || (_cache[16] = createBaseVNode("span", { class: "stat-label" }, "驱动版本", -1)),
                  createBaseVNode("span", _hoisted_37, toDisplayString(gpuDetail.value.driver || "—"), 1)
                ])
              ], 64)) : (openBlock(), createElementBlock("div", _hoisted_38, [
                (openBlock(), createElementBlock("svg", _hoisted_39, [..._cache[17] || (_cache[17] = [
                  createBaseVNode("rect", {
                    x: "2",
                    y: "3",
                    width: "20",
                    height: "14",
                    rx: "2"
                  }, null, -1),
                  createBaseVNode("line", {
                    x1: "8",
                    y1: "21",
                    x2: "16",
                    y2: "21"
                  }, null, -1)
                ])])),
                _cache[18] || (_cache[18] = createBaseVNode("span", null, "nvidia-smi 未响应", -1))
              ]))
            ]),
            createBaseVNode("button", {
              class: "sm-refresh",
              onClick: refreshGpu,
              disabled: refreshingGpu.value
            }, toDisplayString(refreshingGpu.value ? "刷新中..." : "刷新状态"), 9, _hoisted_40)
          ])
        ])
      ]);
    };
  }
});
const GpuRewrite = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2af2bece"]]);
export {
  GpuRewrite as default
};
