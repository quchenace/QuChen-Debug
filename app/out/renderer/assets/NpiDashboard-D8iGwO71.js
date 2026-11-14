import { t as defineComponent, a1 as onMounted, l as createElementBlock, i as createBaseVNode, q as createTextVNode, ak as toDisplayString, F as Fragment, ab as renderList, k as createCommentVNode, a9 as ref, a5 as openBlock, _ as _export_sfc, g as computed, aj as shallowRef, Y as onBeforeUnmount, as as unref, aG as withDirectives, az as vModelSelect, L as isRef, S as normalizeClass, p as createStaticVNode, r as createVNode, aA as vModelText } from "./main-DAqTdO6U.js";
import { G as GameExecutableIcon } from "./GameExecutableIcon-D9w_lp9p.js";
function graphicsGameName(exePath, fallback) {
  const exe = exePath.split(/[\\/]/).at(-1) ?? exePath;
  if (/^DeltaForceClient-Win64-Shipping\.exe$/i.test(exe)) return "三角洲行动";
  return fallback || exe.replace(/\.exe$/i, "");
}
function graphicsDraftChanges(settings, draft) {
  const result = {};
  for (const setting of settings) {
    const text = draft[setting.key];
    if (!setting.supported || text === void 0 || text === "keep") continue;
    if (text === "inherit") {
      if (!setting.inherited || setting.key === "dlssPreset" && setting.enableInherited === false) result[setting.key] = null;
      continue;
    }
    const value = Number(text);
    if (!text.trim() || !Number.isInteger(value) || value < 0 || (setting.key === "frameLimit" ? value > 1023 : !setting.options.some((o) => o.value === value))) throw Error(setting.label + "的值无效");
    if (setting.key === "dlssPreset" || setting.inherited || setting.value !== value) result[setting.key] = value;
  }
  return result;
}
function graphicsCurrentLabel(setting) {
  const label = setting.value === null ? "驱动默认" : setting.options.find((o) => o.value === setting.value)?.label ?? (setting.key === "frameLimit" ? setting.value === 0 ? "不限制" : setting.value + " FPS" : "自定义值 " + setting.value);
  const state = setting.key === "dlssPreset" ? setting.enabled === true ? "覆写已开启 · " : setting.enabled === false ? "覆写未开启 · " : "覆写状态未读取 · " : "";
  return state + (setting.inherited ? "继承 · " : "") + label;
}
const names = { "windowed-opt": "窗口化游戏优化", "0x00ac8497": "着色器缓存容量", "0x00ce2691": "纹理过滤质量", "0x1057eb71": "电源管理模式", "0x007ba09e": "预渲染队列", "antilag": "AMD Anti-Lag", "enhanced-sync": "AMD 增强同步", chill: "AMD Chill", sharpening: "AMD 锐化" };
function graphicsRecoveryRows(entries) {
  const rows = entries.global.map((e) => ({ id: "global:" + e.key, type: "global", target: e.key, label: names[e.key.toLowerCase()] ?? e.key, count: 1 }));
  const games = /* @__PURE__ */ new Map();
  for (const item of entries.game) if (item.game) games.set(item.game, (games.get(item.game) ?? 0) + 1);
  for (const [target, count] of games) rows.push({ id: "game:" + target, type: "game", target, label: target.split(/[\\/]/).at(-1) ?? target, count });
  rows.push(...entries.amd.map((e) => ({ id: "amd:" + e.key, type: "amd", target: e.key, label: names[e.key.toLowerCase()] ?? e.key, count: 1 })));
  return rows;
}
function restoreGraphicsRow(api, row) {
  if (row.type === "global") return api.globalRestore(row.target);
  if (row.type === "game") return api.gameRestore(row.target);
  return api.amdRestore(row.target);
}
const _hoisted_1$2 = {
  key: 0,
  class: "legacy-graphics",
  "aria-label": "旧版显卡设置恢复"
};
const _hoisted_2$2 = ["disabled", "onClick"];
const _hoisted_3$2 = ["disabled", "onClick"];
const _hoisted_4$2 = ["disabled"];
const _hoisted_5$2 = {
  key: 0,
  role: "alert",
  class: "error"
};
const _hoisted_6$2 = {
  key: 1,
  role: "status"
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "LegacyGraphicsRecovery",
  props: {
    disabled: { type: Boolean }
  },
  emits: ["restored", "busy"],
  setup(__props, { expose: __expose, emit: __emit }) {
    const emit = __emit;
    const rows = ref([]), error = ref(""), message = ref(""), confirmId = ref(""), busy = ref(false);
    async function reload() {
      try {
        if (!window.driverTuneApi) throw Error("旧版恢复接口不可用，请重启软件");
        rows.value = graphicsRecoveryRows(await window.driverTuneApi.entries());
      } catch (e) {
        error.value = String(e);
      }
    }
    async function restore(row) {
      if (busy.value) return;
      busy.value = true;
      emit("busy", true);
      error.value = "";
      message.value = "";
      try {
        if (!window.driverTuneApi) throw Error("恢复接口不可用");
        const r = await restoreGraphicsRow(window.driverTuneApi, row);
        if (!r.success) throw Error(r.error ?? "恢复未完成，原记录保留，请重试");
        message.value = row.label + " 已恢复";
        confirmId.value = "";
        await reload();
        emit("restored");
      } catch (e) {
        error.value = String(e);
      } finally {
        busy.value = false;
        emit("busy", false);
      }
    }
    onMounted(reload);
    __expose({ reload });
    return (_ctx, _cache) => {
      return rows.value.length || error.value ? (openBlock(), createElementBlock("section", _hoisted_1$2, [
        createBaseVNode("details", null, [
          createBaseVNode("summary", null, [
            _cache[1] || (_cache[1] = createTextVNode("旧版设置恢复 ", -1)),
            createBaseVNode("span", null, toDisplayString(rows.value.length) + " 组记录", 1)
          ]),
          _cache[2] || (_cache[2] = createBaseVNode("p", null, "原来的全局开关已移除。此前应用的设置仍然有效，可在这里恢复；游戏旧记录恢复后再使用新配置。", -1)),
          (openBlock(true), createElementBlock(Fragment, null, renderList(rows.value, (row) => {
            return openBlock(), createElementBlock("div", {
              key: row.id,
              class: "legacy-row"
            }, [
              createBaseVNode("div", null, [
                createBaseVNode("strong", null, toDisplayString(row.label), 1),
                createBaseVNode("small", null, toDisplayString(row.type === "global" ? "全局设置" : row.type === "amd" ? "AMD 设置" : row.target) + " · " + toDisplayString(row.count) + " 项", 1)
              ]),
              confirmId.value !== row.id ? (openBlock(), createElementBlock("button", {
                key: 0,
                disabled: __props.disabled || busy.value,
                onClick: ($event) => confirmId.value = row.id
              }, "恢复原设置", 8, _hoisted_2$2)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                createBaseVNode("button", {
                  disabled: __props.disabled || busy.value,
                  class: "confirm",
                  onClick: ($event) => restore(row)
                }, toDisplayString(busy.value ? "恢复中…" : "确认恢复"), 9, _hoisted_3$2),
                createBaseVNode("button", {
                  disabled: busy.value,
                  onClick: _cache[0] || (_cache[0] = ($event) => confirmId.value = "")
                }, "取消", 8, _hoisted_4$2)
              ], 64))
            ]);
          }), 128)),
          error.value ? (openBlock(), createElementBlock("p", _hoisted_5$2, toDisplayString(error.value), 1)) : createCommentVNode("", true),
          message.value ? (openBlock(), createElementBlock("p", _hoisted_6$2, toDisplayString(message.value), 1)) : createCommentVNode("", true)
        ])
      ])) : createCommentVNode("", true);
    };
  }
});
const LegacyGraphicsRecovery = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-1e841529"]]);
const GPU_POWER_REASONS = [
  { key: "gpuIdle", label: "空闲降频" },
  { key: "softwarePowerCap", label: "功率限制" },
  { key: "softwareThermal", label: "软件温控" },
  { key: "hardwareThermal", label: "硬件温控" },
  { key: "hardwarePowerBrake", label: "供电保护" },
  { key: "applicationClocks", label: "应用时钟限制" },
  { key: "syncBoost", label: "多卡同步限制" }
];
function useGpuPowerSnapshot(getApi) {
  const snapshot = shallowRef(null);
  const selectedId = ref("");
  const loading = ref(false);
  const error = ref("");
  let disposed = false;
  const selectedDevice = computed(() => snapshot.value?.devices.find((device) => device.id === selectedId.value) ?? null);
  async function refresh() {
    if (disposed || loading.value) return;
    loading.value = true;
    error.value = "";
    snapshot.value = null;
    try {
      const api = getApi();
      if (!api) throw Error("显卡功耗检测接口未加载，请重启软件后重试。");
      const next = await api.snapshot();
      if (disposed) return;
      snapshot.value = next;
      if (!next.devices.some((device) => device.id === selectedId.value)) {
        selectedId.value = next.devices[0]?.id ?? "";
      }
    } catch (cause) {
      if (!disposed) error.value = cause instanceof Error ? cause.message : String(cause);
    } finally {
      if (!disposed) loading.value = false;
    }
  }
  function dispose() {
    disposed = true;
  }
  return { snapshot, selectedId, selectedDevice, loading, error, refresh, dispose };
}
const _hoisted_1$1 = ["aria-busy"];
const _hoisted_2$1 = { class: "power-header" };
const _hoisted_3$1 = { class: "power-actions" };
const _hoisted_4$1 = ["datetime"];
const _hoisted_5$1 = ["disabled"];
const _hoisted_6$1 = {
  key: 0,
  class: "power-state",
  "data-testid": "gpu-power-loading",
  role: "status"
};
const _hoisted_7$1 = {
  key: 1,
  class: "power-state power-error",
  "data-testid": "gpu-power-error",
  role: "alert"
};
const _hoisted_8$1 = {
  key: 0,
  class: "power-content"
};
const _hoisted_9$1 = { class: "device-header" };
const _hoisted_10$1 = {
  key: 0,
  class: "device-picker"
};
const _hoisted_11$1 = ["value"];
const _hoisted_12$1 = {
  key: 1,
  class: "device-name"
};
const _hoisted_13$1 = { class: "source-label" };
const _hoisted_14$1 = {
  key: 0,
  class: "support-note",
  "data-testid": "gpu-power-unsupported"
};
const _hoisted_15$1 = { class: "power-metrics" };
const _hoisted_16$1 = { class: "power-metric" };
const _hoisted_17$1 = { "data-testid": "gpu-power-metric-draw" };
const _hoisted_18$1 = { key: 0 };
const _hoisted_19$1 = { class: "power-metric" };
const _hoisted_20$1 = { "data-testid": "gpu-power-metric-temp" };
const _hoisted_21$1 = { key: 0 };
const _hoisted_22$1 = { class: "power-metric" };
const _hoisted_23$1 = { "data-testid": "gpu-power-metric-current" };
const _hoisted_24$1 = { key: 0 };
const _hoisted_25$1 = { class: "power-metric" };
const _hoisted_26$1 = { "data-testid": "gpu-power-metric-enforced" };
const _hoisted_27$1 = { key: 0 };
const _hoisted_28$1 = { class: "reasons-row" };
const _hoisted_29$1 = { class: "reason-list" };
const _hoisted_30$1 = ["data-testid"];
const _hoisted_31$1 = { class: "power-details" };
const _hoisted_32$1 = { "data-testid": "gpu-power-metric-default" };
const _hoisted_33$1 = { "data-testid": "gpu-power-metric-range" };
const _hoisted_34$1 = { class: "device-identity" };
const _hoisted_35$1 = {
  key: 1,
  class: "power-state"
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "GpuPowerPanel",
  setup(__props) {
    const { snapshot, selectedId, selectedDevice: device, loading, error, refresh, dispose } = useGpuPowerSnapshot(() => window.gpuPowerApi);
    const sampledTime = computed(() => {
      const date = new Date(snapshot.value?.sampledAt ?? "");
      return Number.isNaN(date.getTime()) ? "时间未知" : date.toLocaleString("zh-CN", { hour12: false });
    });
    const vendorName = computed(() => ({ nvidia: "NVIDIA", amd: "AMD", intel: "Intel", unknown: "当前" })[device.value?.vendor ?? "unknown"]);
    const missingText = computed(() => device.value?.source === "windows-inventory" ? "当前检测通道暂不支持" : "驱动未提供读数");
    const number = (value) => value === null || !Number.isFinite(value) ? "—" : value.toLocaleString("zh-CN", { maximumFractionDigits: 1 });
    const watts = (value) => value === null ? "—" : `${number(value)} W`;
    const range = computed(() => device.value ? `${watts(device.value.minLimitW)} ～ ${watts(device.value.maxLimitW)}` : "—");
    function reasonState(key) {
      const state = device.value?.reasons[key];
      return state === true ? "触发" : state === false ? "未触发" : "未知";
    }
    function reasonClass(key) {
      const state = device.value?.reasons[key];
      return state === true ? key === "gpuIdle" ? "idle" : "active" : state === false ? "inactive" : "unknown";
    }
    onMounted(refresh);
    onBeforeUnmount(dispose);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("section", {
        class: "gpu-power",
        "data-testid": "gpu-power-panel",
        "aria-labelledby": "gpu-power-heading",
        "aria-busy": unref(loading)
      }, [
        createBaseVNode("header", _hoisted_2$1, [
          _cache[3] || (_cache[3] = createBaseVNode("div", { class: "power-heading" }, [
            createBaseVNode("h3", { id: "gpu-power-heading" }, "显卡功耗与限制"),
            createBaseVNode("span", { class: "readonly-badge" }, "只读检测")
          ], -1)),
          createBaseVNode("div", _hoisted_3$1, [
            unref(snapshot) ? (openBlock(), createElementBlock("time", {
              key: 0,
              datetime: unref(snapshot).sampledAt
            }, "采样于 " + toDisplayString(sampledTime.value), 9, _hoisted_4$1)) : createCommentVNode("", true),
            createBaseVNode("button", {
              type: "button",
              "data-testid": "gpu-power-refresh",
              disabled: unref(loading),
              onClick: _cache[0] || (_cache[0] = //@ts-ignore
              (...args) => unref(refresh) && unref(refresh)(...args))
            }, [
              _cache[2] || (_cache[2] = createBaseVNode("svg", {
                viewBox: "0 0 20 20",
                "aria-hidden": "true"
              }, [
                createBaseVNode("path", { d: "M16 6a7 7 0 1 0 1 7M16 2v4h-4" })
              ], -1)),
              createTextVNode(" " + toDisplayString(unref(loading) ? "检测中…" : "刷新检测"), 1)
            ], 8, _hoisted_5$1)
          ])
        ]),
        unref(loading) ? (openBlock(), createElementBlock("p", _hoisted_6$1, "正在读取显卡驱动，本次检测不会修改参数…")) : unref(error) ? (openBlock(), createElementBlock("p", _hoisted_7$1, toDisplayString(unref(error)), 1)) : unref(snapshot) ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
          unref(device) ? (openBlock(), createElementBlock("div", _hoisted_8$1, [
            createBaseVNode("div", _hoisted_9$1, [
              unref(snapshot).devices.length > 1 ? (openBlock(), createElementBlock("label", _hoisted_10$1, [
                _cache[4] || (_cache[4] = createBaseVNode("span", null, "检测显卡", -1)),
                withDirectives(createBaseVNode("select", {
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => isRef(selectedId) ? selectedId.value = $event : null),
                  "data-testid": "gpu-power-device-select",
                  "aria-label": "检测显卡"
                }, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(unref(snapshot).devices, (gpu) => {
                    return openBlock(), createElementBlock("option", {
                      key: gpu.id,
                      value: gpu.id
                    }, toDisplayString(gpu.name) + toDisplayString(gpu.pciBusId ? ` · ${gpu.pciBusId}` : ""), 9, _hoisted_11$1);
                  }), 128))
                ], 512), [
                  [vModelSelect, unref(selectedId)]
                ])
              ])) : (openBlock(), createElementBlock("strong", _hoisted_12$1, toDisplayString(unref(device).name), 1)),
              createBaseVNode("span", _hoisted_13$1, toDisplayString(unref(device).source === "nvidia-smi" ? "NVIDIA 驱动读数" : "Windows 设备信息"), 1)
            ]),
            unref(device).source === "windows-inventory" ? (openBlock(), createElementBlock("p", _hoisted_14$1, toDisplayString(vendorName.value) + "设备已识别，当前检测通道未提供功耗、温度和功率限制读数。", 1)) : createCommentVNode("", true),
            createBaseVNode("div", _hoisted_15$1, [
              createBaseVNode("div", _hoisted_16$1, [
                _cache[5] || (_cache[5] = createBaseVNode("span", null, "当前功耗", -1)),
                createBaseVNode("strong", _hoisted_17$1, [
                  createTextVNode(toDisplayString(number(unref(device).powerDrawW)), 1),
                  unref(device).powerDrawW !== null ? (openBlock(), createElementBlock("small", _hoisted_18$1, "W")) : createCommentVNode("", true)
                ]),
                createBaseVNode("p", null, toDisplayString(unref(device).powerDrawW === null ? missingText.value : "本次采样的实际功耗"), 1)
              ]),
              createBaseVNode("div", _hoisted_19$1, [
                _cache[6] || (_cache[6] = createBaseVNode("span", null, "显卡温度", -1)),
                createBaseVNode("strong", _hoisted_20$1, [
                  createTextVNode(toDisplayString(number(unref(device).temperatureC)), 1),
                  unref(device).temperatureC !== null ? (openBlock(), createElementBlock("small", _hoisted_21$1, "°C")) : createCommentVNode("", true)
                ]),
                createBaseVNode("p", null, toDisplayString(unref(device).temperatureC === null ? missingText.value : "本次采样的温度"), 1)
              ]),
              createBaseVNode("div", _hoisted_22$1, [
                _cache[7] || (_cache[7] = createBaseVNode("span", null, "当前功率上限", -1)),
                createBaseVNode("strong", _hoisted_23$1, [
                  createTextVNode(toDisplayString(number(unref(device).currentLimitW)), 1),
                  unref(device).currentLimitW !== null ? (openBlock(), createElementBlock("small", _hoisted_24$1, "W")) : createCommentVNode("", true)
                ]),
                createBaseVNode("p", null, toDisplayString(unref(device).currentLimitW === null ? missingText.value : "驱动报告的配置上限"), 1)
              ]),
              createBaseVNode("div", _hoisted_25$1, [
                _cache[8] || (_cache[8] = createBaseVNode("span", null, "实际生效上限", -1)),
                createBaseVNode("strong", _hoisted_26$1, [
                  createTextVNode(toDisplayString(number(unref(device).enforcedLimitW)), 1),
                  unref(device).enforcedLimitW !== null ? (openBlock(), createElementBlock("small", _hoisted_27$1, "W")) : createCommentVNode("", true)
                ]),
                createBaseVNode("p", null, toDisplayString(unref(device).enforcedLimitW === null ? missingText.value : "当前综合约束后的上限"), 1)
              ])
            ]),
            createBaseVNode("div", _hoisted_28$1, [
              _cache[10] || (_cache[10] = createBaseVNode("span", { class: "reasons-label" }, "本次采样状态", -1)),
              createBaseVNode("div", _hoisted_29$1, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(unref(GPU_POWER_REASONS), (reason) => {
                  return openBlock(), createElementBlock("span", {
                    key: reason.key,
                    "data-testid": `gpu-power-reason-${reason.key}`,
                    class: normalizeClass(["reason", reasonClass(reason.key)])
                  }, [
                    _cache[9] || (_cache[9] = createBaseVNode("i", { "aria-hidden": "true" }, null, -1)),
                    createTextVNode(toDisplayString(reason.label), 1),
                    createBaseVNode("small", null, toDisplayString(reasonState(reason.key)), 1)
                  ], 10, _hoisted_30$1);
                }), 128))
              ])
            ]),
            createBaseVNode("details", _hoisted_31$1, [
              _cache[16] || (_cache[16] = createBaseVNode("summary", null, [
                createTextVNode("驱动范围与设备详情"),
                createBaseVNode("span", null, "驱动报告范围不代表支持修改")
              ], -1)),
              createBaseVNode("dl", null, [
                createBaseVNode("div", null, [
                  _cache[11] || (_cache[11] = createBaseVNode("dt", null, "默认功率上限", -1)),
                  createBaseVNode("dd", _hoisted_32$1, toDisplayString(watts(unref(device).defaultLimitW)), 1)
                ]),
                createBaseVNode("div", null, [
                  _cache[12] || (_cache[12] = createBaseVNode("dt", null, "驱动报告范围", -1)),
                  createBaseVNode("dd", _hoisted_33$1, toDisplayString(range.value), 1)
                ]),
                createBaseVNode("div", null, [
                  _cache[13] || (_cache[13] = createBaseVNode("dt", null, "驱动版本", -1)),
                  createBaseVNode("dd", null, toDisplayString(unref(device).driverVersion || "未提供"), 1)
                ]),
                createBaseVNode("div", null, [
                  _cache[14] || (_cache[14] = createBaseVNode("dt", null, "PCI 总线", -1)),
                  createBaseVNode("dd", null, toDisplayString(unref(device).pciBusId || "未提供"), 1)
                ]),
                createBaseVNode("div", _hoisted_34$1, [
                  _cache[15] || (_cache[15] = createBaseVNode("dt", null, "设备 UUID", -1)),
                  createBaseVNode("dd", null, toDisplayString(unref(device).uuid || "未提供"), 1)
                ])
              ]),
              (openBlock(true), createElementBlock(Fragment, null, renderList(unref(device).notes, (note) => {
                return openBlock(), createElementBlock("p", {
                  key: note,
                  class: "detail-note"
                }, toDisplayString(note), 1);
              }), 128))
            ])
          ])) : (openBlock(), createElementBlock("p", _hoisted_35$1, "未检测到可展示的显卡。可检查驱动状态后刷新。")),
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(snapshot).warnings, (warning) => {
            return openBlock(), createElementBlock("p", {
              key: warning,
              class: "power-warning",
              role: "status"
            }, toDisplayString(warning), 1);
          }), 128))
        ], 64)) : createCommentVNode("", true),
        _cache[17] || (_cache[17] = createBaseVNode("p", { class: "power-footnote" }, "仅显示本次采样，不调整显卡参数。空闲降频通常为正常节能状态；“—”表示当前无法读取。", -1))
      ], 8, _hoisted_1$1);
    };
  }
});
const GpuPowerPanel = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-c7d8bca1"]]);
const _hoisted_1 = {
  "data-tour": "dlss-optimizer",
  class: "graphics-page"
};
const _hoisted_2 = { class: "header" };
const _hoisted_3 = { key: 0 };
const _hoisted_4 = ["disabled"];
const _hoisted_5 = {
  key: 0,
  class: "notice"
};
const _hoisted_6 = ["disabled"];
const _hoisted_7 = {
  key: 1,
  class: "notice error",
  role: "alert"
};
const _hoisted_8 = {
  key: 2,
  class: "notice success",
  role: "status"
};
const _hoisted_9 = { class: "workbench" };
const _hoisted_10 = {
  class: "library",
  "aria-label": "游戏库"
};
const _hoisted_11 = { class: "library-head" };
const _hoisted_12 = ["disabled"];
const _hoisted_13 = { class: "game-list" };
const _hoisted_14 = ["disabled", "onClick"];
const _hoisted_15 = { class: "game-name" };
const _hoisted_16 = {
  key: 0,
  class: "selected-dot"
};
const _hoisted_17 = {
  key: 0,
  class: "library-empty"
};
const _hoisted_18 = ["disabled"];
const _hoisted_19 = {
  key: 0,
  class: "scan-warnings"
};
const _hoisted_20 = {
  class: "editor desc",
  "aria-label": "游戏配置"
};
const _hoisted_21 = {
  key: 0,
  class: "editor-empty"
};
const _hoisted_22 = { class: "editor-head" };
const _hoisted_23 = { class: "eyebrow" };
const _hoisted_24 = { class: "game-path" };
const _hoisted_25 = ["disabled"];
const _hoisted_26 = {
  key: 0,
  class: "loading",
  role: "status"
};
const _hoisted_27 = { class: "profile-meta" };
const _hoisted_28 = {
  key: 0,
  class: "inline-notice"
};
const _hoisted_29 = {
  key: 1,
  class: "inline-notice"
};
const _hoisted_30 = { class: "settings-grid" };
const _hoisted_31 = { class: "setting-info" };
const _hoisted_32 = ["for"];
const _hoisted_33 = {
  key: 0,
  class: "setting-reason"
};
const _hoisted_34 = { class: "setting-control" };
const _hoisted_35 = ["id", "value", "disabled", "onChange"];
const _hoisted_36 = {
  key: 0,
  class: "frame-input"
};
const _hoisted_37 = ["value", "disabled"];
const _hoisted_38 = ["id", "value", "disabled", "onChange"];
const _hoisted_39 = ["value"];
const _hoisted_40 = { class: "dlss-status" };
const _hoisted_41 = { class: "apply-bar" };
const _hoisted_42 = ["disabled"];
const _hoisted_43 = ["disabled"];
const _hoisted_44 = { class: "recovery-bar" };
const _hoisted_45 = ["disabled"];
const _hoisted_46 = ["disabled"];
const _hoisted_47 = ["disabled"];
const _hoisted_48 = {
  key: 2,
  class: "loading"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "NpiDashboard",
  setup(__props) {
    const status = ref(null), games = ref([]), search = ref(""), scanWarnings = ref([]);
    const selectedPath = ref(""), inspection = ref(null), draft = ref({}), error = ref(""), message = ref("");
    const scanning = ref(false), reading = ref(false), applying = ref(false), legacyBusy = ref(false), confirmRestore = ref(false), openingNpi = ref(false);
    const busy = computed(() => reading.value || applying.value || legacyBusy.value), selectedGame = computed(() => games.value.find((g) => g.exePath === selectedPath.value));
    const filteredGames = computed(() => {
      const q = search.value.trim().toLowerCase();
      return games.value.filter((g) => (g.name + " " + g.exePath).toLowerCase().includes(q));
    });
    const canEdit = computed(() => !!status.value?.available && !!inspection.value?.editable && !busy.value && !["pending", "conflict"].includes(inspection.value?.recovery.state ?? ""));
    const changes = computed(() => {
      try {
        return { settings: graphicsDraftChanges(inspection.value?.settings ?? [], draft.value), error: "" };
      } catch (e) {
        return { settings: {}, error: String(e) };
      }
    });
    const changeCount = computed(() => Object.keys(changes.value.settings).length), draftError = computed(() => changes.value.error);
    const recoveryLabel = computed(() => ({ none: "尚无修改", managed: "已保存原值", pending: "有待处理的恢复记录", conflict: "配置已被外部修改" })[inspection.value?.recovery.state ?? "none"]);
    const settingDescriptions = { powerMode: "为此游戏选择显卡电源策略，性能模式可能增加功耗。", frameLimit: "限制此游戏的最高帧率；0 表示不限制。", verticalSync: "管理垂直同步，需结合游戏内设置和显示器使用。", textureQuality: "调整纹理过滤的画质与性能取舍。", dlssPreset: "覆写支持游戏的 DLSS 模型预设，不替换游戏 DLL。" };
    const exeName = (path) => path.split(/[\\/]/).at(-1) ?? path;
    const sourceName = (source) => ({ steam: "Steam", epic: "Epic Games", local: "本机安装", manual: "手动添加 / 恢复记录" })[source] ?? source;
    let alive = true, readGeneration = 0;
    onBeforeUnmount(() => {
      alive = false;
      readGeneration++;
    });
    function api() {
      if (!window.gameGraphicsApi) throw Error("游戏显卡配置接口未加载，请重启软件");
      return window.gameGraphicsApi;
    }
    async function reloadStatus() {
      try {
        const next = await api().status();
        if (alive) status.value = next;
      } catch (e) {
        if (alive) {
          status.value = { available: false, vendor: "unsupported", reason: String(e) };
          error.value = String(e);
        }
      }
    }
    async function scan() {
      if (scanning.value || busy.value) return;
      scanning.value = true;
      error.value = "";
      try {
        const result = await api().discover();
        if (!result.success || !result.data) throw Error(result.error ?? "游戏扫描失败");
        if (!alive) return;
        const merged = new Map(games.value.filter((g) => g.source === "manual" || g.exePath === selectedPath.value).map((g) => [g.exePath.toLowerCase(), g]));
        for (const game of result.data.games) merged.set(game.exePath.toLowerCase(), { ...game, name: graphicsGameName(game.exePath, game.name) });
        games.value = [...merged.values()];
        scanWarnings.value = result.data.warnings;
      } catch (e) {
        if (alive) error.value = String(e);
      } finally {
        scanning.value = false;
      }
    }
    async function inspectPath(path, reset = true) {
      const generation = ++readGeneration;
      reading.value = true;
      inspection.value = null;
      try {
        const result = await api().inspect(path);
        if (!alive || generation !== readGeneration) return;
        if (!result.success || !result.data) throw Error(result.error ?? "配置读取失败");
        inspection.value = result.data;
        if (reset) draft.value = {};
      } catch (e) {
        if (alive && generation === readGeneration) error.value = String(e);
      } finally {
        if (generation === readGeneration) reading.value = false;
      }
    }
    async function selectGame(game) {
      if (busy.value) return;
      selectedPath.value = game.exePath;
      error.value = "";
      message.value = "";
      draft.value = {};
      confirmRestore.value = false;
      await inspectPath(game.exePath);
    }
    async function refreshInspection() {
      if (!selectedPath.value || reading.value || applying.value) return;
      error.value = "";
      await inspectPath(selectedPath.value);
    }
    async function pickGame() {
      if (busy.value) return;
      try {
        if (!window.nvapiApi) throw Error("文件选择接口不可用");
        const path = await window.nvapiApi.openFileDialog();
        if (!path || !alive) return;
        const game = { id: "manual:" + path.toLowerCase(), name: graphicsGameName(path), exePath: path, source: "manual", installPath: path.replace(/[\\/][^\\/]+$/, "") };
        if (!games.value.some((g) => g.exePath.toLowerCase() === path.toLowerCase())) games.value.push(game);
        search.value = "";
        await selectGame(game);
      } catch (e) {
        error.value = String(e);
      }
    }
    function setFrameMode(mode, setting) {
      draft.value.frameLimit = mode === "custom" ? String(setting.value ?? 120) : mode;
    }
    async function launchNPI() {
      if (busy.value || openingNpi.value) return;
      openingNpi.value = true;
      error.value = "";
      message.value = "";
      try {
        if (!window.sysApi?.openExternal) throw Error("工具启动接口未加载，请重启软件");
        const result = await window.sysApi.openExternal("appresource://NVIDIA Profile Inspector/nvidiaProfileInspector.exe");
        if (!result?.success) throw Error(result?.error || "NVIDIA Profile Inspector 启动失败");
        message.value = "NVIDIA Profile Inspector 已启动。修改驱动配置后，返回此页点击“刷新状态”。";
      } catch (e) {
        error.value = String(e);
      } finally {
        openingNpi.value = false;
      }
    }
    async function apply() {
      if (!canEdit.value || !changeCount.value || draftError.value) return;
      applying.value = true;
      error.value = "";
      message.value = "";
      confirmRestore.value = false;
      try {
        const result = await api().apply({ exePath: selectedPath.value, settings: { ...changes.value.settings } });
        if (!result.success) throw Error(result.error ?? "应用未完成，请检查恢复状态");
        inspection.value = result.data ?? null;
        draft.value = {};
        message.value = "配置已应用，并通过驱动回读核验。";
      } catch (e) {
        error.value = String(e);
        const failure = error.value;
        await inspectPath(selectedPath.value, false);
        error.value = failure;
      } finally {
        applying.value = false;
      }
    }
    async function restore() {
      if (busy.value || !confirmRestore.value) return;
      applying.value = true;
      error.value = "";
      message.value = "";
      try {
        const result = await api().restore(selectedPath.value);
        if (!result.success) throw Error(result.error ?? "恢复未完成，记录已保留");
        inspection.value = result.data ?? null;
        draft.value = {};
        confirmRestore.value = false;
        message.value = "此游戏已恢复到首次应用前的设置。";
      } catch (e) {
        error.value = String(e);
        const failure = error.value;
        await inspectPath(selectedPath.value, false);
        error.value = failure;
      } finally {
        applying.value = false;
      }
    }
    onMounted(async () => {
      await reloadStatus();
      if (alive) await scan();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("header", _hoisted_2, [
          _cache[7] || (_cache[7] = createStaticVNode('<div class="heading-icon" data-v-aa142653><svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.5" data-v-aa142653><rect x="3" y="5" width="18" height="13" rx="2" data-v-aa142653></rect><circle cx="10" cy="11.5" r="3" data-v-aa142653></circle><path d="M17 8v7M7 18v3m4-3v3m4-3v3" data-v-aa142653></path></svg></div><div data-v-aa142653><p class="eyebrow" data-v-aa142653>GAME GRAPHICS</p><h2 data-v-aa142653>显卡优化</h2><p class="subtitle" data-v-aa142653>按游戏配置，清楚掌握每一次调整。</p></div>', 2)),
          createBaseVNode("div", {
            class: normalizeClass(["driver-status", { ready: status.value?.available }])
          }, [
            _cache[6] || (_cache[6] = createBaseVNode("i", null, null, -1)),
            createBaseVNode("span", null, [
              createTextVNode(toDisplayString(status.value ? status.value.available ? "NVIDIA 驱动已连接" : "驱动配置不可用" : "正在读取驱动…"), 1),
              status.value?.driverVersion ? (openBlock(), createElementBlock("small", _hoisted_3, toDisplayString(status.value.driverVersion), 1)) : createCommentVNode("", true)
            ])
          ], 2),
          createBaseVNode("button", {
            class: "npi-launch",
            disabled: busy.value || openingNpi.value,
            onClick: launchNPI
          }, toDisplayString(openingNpi.value ? "正在启动…" : "NVIDIA Profile Inspector ↗"), 9, _hoisted_4)
        ]),
        status.value && !status.value.available ? (openBlock(), createElementBlock("div", _hoisted_5, [
          createTextVNode(toDisplayString(status.value.reason || "当前设备无法使用 NVIDIA 游戏配置。仍可浏览游戏和恢复旧版设置。") + " ", 1),
          createBaseVNode("button", {
            disabled: busy.value,
            onClick: reloadStatus
          }, "重新检测", 8, _hoisted_6)
        ])) : createCommentVNode("", true),
        error.value ? (openBlock(), createElementBlock("div", _hoisted_7, toDisplayString(error.value), 1)) : createCommentVNode("", true),
        message.value ? (openBlock(), createElementBlock("div", _hoisted_8, toDisplayString(message.value), 1)) : createCommentVNode("", true),
        createVNode(GpuPowerPanel),
        createBaseVNode("div", _hoisted_9, [
          createBaseVNode("aside", _hoisted_10, [
            createBaseVNode("div", _hoisted_11, [
              createBaseVNode("h3", null, [
                _cache[8] || (_cache[8] = createTextVNode("我的游戏 ", -1)),
                createBaseVNode("span", null, toDisplayString(games.value.length), 1)
              ]),
              createBaseVNode("button", {
                disabled: busy.value || scanning.value,
                onClick: scan
              }, toDisplayString(scanning.value ? "扫描中…" : "扫描游戏"), 9, _hoisted_12)
            ]),
            withDirectives(createBaseVNode("input", {
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => search.value = $event),
              class: "search",
              "aria-label": "搜索游戏",
              placeholder: "搜索游戏或程序名称"
            }, null, 512), [
              [vModelText, search.value]
            ]),
            createBaseVNode("div", _hoisted_13, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(filteredGames.value, (game) => {
                return openBlock(), createElementBlock("button", {
                  key: game.id,
                  class: normalizeClass(["game-row", { selected: game.exePath === selectedPath.value }]),
                  disabled: busy.value,
                  onClick: ($event) => selectGame(game)
                }, [
                  createVNode(GameExecutableIcon, {
                    path: game.exePath
                  }, null, 8, ["path"]),
                  createBaseVNode("span", _hoisted_15, [
                    createBaseVNode("strong", null, toDisplayString(game.name), 1),
                    createBaseVNode("small", null, toDisplayString(sourceName(game.source)) + " · " + toDisplayString(exeName(game.exePath)), 1)
                  ]),
                  game.exePath === selectedPath.value ? (openBlock(), createElementBlock("span", _hoisted_16, "●")) : createCommentVNode("", true)
                ], 10, _hoisted_14);
              }), 128)),
              !filteredGames.value.length ? (openBlock(), createElementBlock("div", _hoisted_17, [
                _cache[9] || (_cache[9] = createBaseVNode("span", null, "＋", -1)),
                createBaseVNode("strong", null, toDisplayString(search.value ? "没有匹配的游戏" : "建立你的游戏配置库"), 1),
                createBaseVNode("p", null, toDisplayString(search.value ? "试试游戏名或 EXE 名称。" : "扫描 Steam、Epic 和官网版三角洲，或手动选择游戏的 EXE。"), 1)
              ])) : createCommentVNode("", true)
            ]),
            createBaseVNode("button", {
              class: "add-game",
              disabled: busy.value || scanning.value,
              onClick: pickGame
            }, "＋ 手动添加游戏", 8, _hoisted_18),
            _cache[10] || (_cache[10] = createBaseVNode("p", { class: "library-note" }, "扫描只读取安装目录，不启动游戏。", -1)),
            scanWarnings.value.length ? (openBlock(), createElementBlock("details", _hoisted_19, [
              createBaseVNode("summary", null, "扫描说明 · " + toDisplayString(scanWarnings.value.length), 1),
              (openBlock(true), createElementBlock(Fragment, null, renderList(scanWarnings.value, (line) => {
                return openBlock(), createElementBlock("p", { key: line }, toDisplayString(line), 1);
              }), 128))
            ])) : createCommentVNode("", true)
          ]),
          createBaseVNode("main", _hoisted_20, [
            !selectedPath.value ? (openBlock(), createElementBlock("div", _hoisted_21, [..._cache[11] || (_cache[11] = [
              createStaticVNode('<div class="empty-chip" data-v-aa142653><svg viewBox="0 0 48 48" width="58" height="58" fill="none" stroke="currentColor" stroke-width="1.3" data-v-aa142653><rect x="11" y="11" width="26" height="26" rx="6" data-v-aa142653></rect><rect x="18" y="18" width="12" height="12" rx="2" data-v-aa142653></rect><path d="M17 4v7m7-7v7m7-7v7M17 37v7m7-7v7m7-7v7M4 17h7m-7 7h7m-7 7h7m26-14h7m-7 7h7m-7 7h7" data-v-aa142653></path></svg></div><p class="eyebrow" data-v-aa142653>ONE GAME. ONE PROFILE.</p><h3 data-v-aa142653>从一款游戏开始</h3><p data-v-aa142653>选择游戏 → 编辑配置 → 应用并核验</p><div class="empty-features" data-v-aa142653><span data-v-aa142653>独立驱动配置</span><span data-v-aa142653>DLSS 模型预设</span><span data-v-aa142653>原值备份与恢复</span></div>', 5)
            ])])) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              createBaseVNode("div", _hoisted_22, [
                createBaseVNode("div", null, [
                  createBaseVNode("p", _hoisted_23, toDisplayString(selectedGame.value ? sourceName(selectedGame.value.source) : "游戏配置"), 1),
                  createBaseVNode("h3", null, toDisplayString(selectedGame.value?.name || exeName(selectedPath.value)), 1),
                  createBaseVNode("p", _hoisted_24, toDisplayString(selectedPath.value), 1)
                ]),
                createBaseVNode("button", {
                  disabled: busy.value,
                  onClick: refreshInspection
                }, "刷新状态", 8, _hoisted_25)
              ]),
              reading.value ? (openBlock(), createElementBlock("div", _hoisted_26, "正在读取游戏配置与恢复记录…")) : inspection.value ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                createBaseVNode("div", _hoisted_27, [
                  createBaseVNode("div", null, [
                    _cache[12] || (_cache[12] = createBaseVNode("small", null, "当前 NVIDIA 配置", -1)),
                    createBaseVNode("strong", null, toDisplayString(inspection.value.profileName || "尚未创建独立配置"), 1)
                  ]),
                  createBaseVNode("div", null, [
                    _cache[13] || (_cache[13] = createBaseVNode("small", null, "恢复记录", -1)),
                    createBaseVNode("strong", {
                      class: normalizeClass({ warning: inspection.value.recovery.state === "conflict" || inspection.value.recovery.state === "pending" })
                    }, toDisplayString(recoveryLabel.value), 3)
                  ])
                ]),
                !inspection.value.editable ? (openBlock(), createElementBlock("p", _hoisted_28, toDisplayString(inspection.value.reason || "此配置当前不可编辑"), 1)) : createCommentVNode("", true),
                inspection.value.recovery.message ? (openBlock(), createElementBlock("p", _hoisted_29, toDisplayString(inspection.value.recovery.message), 1)) : createCommentVNode("", true),
                (openBlock(true), createElementBlock(Fragment, null, renderList(inspection.value.warnings, (warning) => {
                  return openBlock(), createElementBlock("p", {
                    key: warning,
                    class: "inline-notice"
                  }, toDisplayString(warning), 1);
                }), 128)),
                _cache[20] || (_cache[20] = createBaseVNode("div", { class: "settings-title" }, [
                  createBaseVNode("h4", null, "游戏驱动设置"),
                  createBaseVNode("span", null, "选择参数后，点击下方应用")
                ], -1)),
                createBaseVNode("div", _hoisted_30, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(inspection.value.settings, (setting) => {
                    return openBlock(), createElementBlock("div", {
                      key: setting.key,
                      class: normalizeClass(["setting-row", { unsupported: !setting.supported }])
                    }, [
                      createBaseVNode("div", _hoisted_31, [
                        createBaseVNode("label", {
                          for: "graphics-" + setting.key
                        }, toDisplayString(setting.label), 9, _hoisted_32),
                        createBaseVNode("p", null, toDisplayString(settingDescriptions[setting.key]), 1),
                        createBaseVNode("small", null, "当前：" + toDisplayString(unref(graphicsCurrentLabel)(setting)), 1),
                        setting.reason ? (openBlock(), createElementBlock("p", _hoisted_33, toDisplayString(setting.reason), 1)) : createCommentVNode("", true)
                      ]),
                      createBaseVNode("div", _hoisted_34, [
                        setting.key === "frameLimit" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                          createBaseVNode("select", {
                            id: "graphics-" + setting.key,
                            value: draft.value.frameLimit === void 0 || draft.value.frameLimit === "keep" ? "keep" : draft.value.frameLimit === "inherit" ? "inherit" : "custom",
                            disabled: !canEdit.value || !setting.supported,
                            onChange: ($event) => setFrameMode($event.target.value, setting)
                          }, [..._cache[14] || (_cache[14] = [
                            createBaseVNode("option", { value: "keep" }, "保持当前", -1),
                            createBaseVNode("option", { value: "inherit" }, "跟随全局设置", -1),
                            createBaseVNode("option", { value: "custom" }, "指定帧率上限", -1)
                          ])], 40, _hoisted_35),
                          draft.value.frameLimit !== void 0 && draft.value.frameLimit !== "keep" && draft.value.frameLimit !== "inherit" ? (openBlock(), createElementBlock("label", _hoisted_36, [
                            createBaseVNode("input", {
                              value: draft.value.frameLimit,
                              onInput: _cache[1] || (_cache[1] = ($event) => draft.value.frameLimit = $event.target.value),
                              type: "number",
                              min: "0",
                              max: "1023",
                              step: "1",
                              "aria-label": "帧率上限数值",
                              disabled: !canEdit.value
                            }, null, 40, _hoisted_37),
                            _cache[15] || (_cache[15] = createBaseVNode("span", null, "FPS", -1))
                          ])) : createCommentVNode("", true)
                        ], 64)) : (openBlock(), createElementBlock("select", {
                          key: 1,
                          id: "graphics-" + setting.key,
                          value: draft.value[setting.key] ?? "keep",
                          disabled: !canEdit.value || !setting.supported,
                          onChange: ($event) => draft.value[setting.key] = $event.target.value
                        }, [
                          _cache[16] || (_cache[16] = createBaseVNode("option", { value: "keep" }, "保持当前", -1)),
                          _cache[17] || (_cache[17] = createBaseVNode("option", { value: "inherit" }, "跟随全局设置", -1)),
                          (openBlock(true), createElementBlock(Fragment, null, renderList(setting.options, (option) => {
                            return openBlock(), createElementBlock("option", {
                              key: option.value,
                              value: String(option.value)
                            }, toDisplayString(option.label), 9, _hoisted_39);
                          }), 128))
                        ], 40, _hoisted_38))
                      ])
                    ], 2);
                  }), 128))
                ]),
                createBaseVNode("div", _hoisted_40, [
                  createBaseVNode("span", {
                    class: normalizeClass({ detected: inspection.value.dlss.detected })
                  }, toDisplayString(inspection.value.dlss.detected ? "DLSS 模块已发现" : "DLSS 检测"), 3),
                  createBaseVNode("p", null, toDisplayString(inspection.value.dlss.reason), 1)
                ]),
                createBaseVNode("div", _hoisted_41, [
                  createBaseVNode("div", null, [
                    createBaseVNode("strong", null, toDisplayString(draftError.value || (changeCount.value ? changeCount.value + " 项待应用" : "配置未修改")), 1),
                    _cache[18] || (_cache[18] = createBaseVNode("small", null, "先备份原值，再写入并核验。请关闭游戏后调整。", -1))
                  ]),
                  createBaseVNode("button", {
                    disabled: busy.value || !Object.keys(draft.value).length,
                    onClick: _cache[2] || (_cache[2] = ($event) => {
                      draft.value = {};
                      confirmRestore.value = false;
                    })
                  }, "撤销编辑", 8, _hoisted_42),
                  createBaseVNode("button", {
                    class: "primary",
                    disabled: !canEdit.value || !changeCount.value || !!draftError.value,
                    onClick: apply
                  }, toDisplayString(applying.value ? "正在核验…" : "应用到此游戏"), 9, _hoisted_43)
                ]),
                createBaseVNode("div", _hoisted_44, [
                  _cache[19] || (_cache[19] = createBaseVNode("p", null, "配置会保留至手动恢复；驱动覆写效果取决于游戏与驱动支持。", -1)),
                  inspection.value.recovery.state !== "none" && !confirmRestore.value ? (openBlock(), createElementBlock("button", {
                    key: 0,
                    disabled: busy.value,
                    onClick: _cache[3] || (_cache[3] = ($event) => confirmRestore.value = true)
                  }, "恢复此游戏原设置", 8, _hoisted_45)) : confirmRestore.value ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                    createBaseVNode("button", {
                      class: "restore-confirm",
                      disabled: busy.value,
                      onClick: restore
                    }, "确认恢复原值", 8, _hoisted_46),
                    createBaseVNode("button", {
                      disabled: busy.value,
                      onClick: _cache[4] || (_cache[4] = ($event) => confirmRestore.value = false)
                    }, "取消", 8, _hoisted_47)
                  ], 64)) : createCommentVNode("", true)
                ])
              ], 64)) : (openBlock(), createElementBlock("div", _hoisted_48, "未能读取此游戏的配置。可点击“刷新状态”重试。"))
            ], 64))
          ])
        ]),
        createVNode(LegacyGraphicsRecovery, {
          disabled: reading.value || applying.value || scanning.value,
          onBusy: _cache[5] || (_cache[5] = ($event) => legacyBusy.value = $event),
          onRestored: refreshInspection
        }, null, 8, ["disabled"])
      ]);
    };
  }
});
const NpiDashboard = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-aa142653"]]);
export {
  NpiDashboard as default
};
