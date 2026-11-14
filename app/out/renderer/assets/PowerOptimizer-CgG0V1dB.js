import { t as defineComponent, a1 as onMounted, l as createElementBlock, i as createBaseVNode, p as createStaticVNode, ak as toDisplayString, F as Fragment, ab as renderList, k as createCommentVNode, aG as withDirectives, aA as vModelText, ax as vModelCheckbox, az as vModelSelect, q as createTextVNode, S as normalizeClass, a9 as ref, a7 as reactive, g as computed, a5 as openBlock, V as normalizeStyle, _ as _export_sfc } from "./main-DAqTdO6U.js";
const _hoisted_1 = {
  "data-tour": "power-optimizer",
  class: "page"
};
const _hoisted_2 = { class: "page-header" };
const _hoisted_3 = { style: { "margin-left": "auto", "display": "flex", "gap": "8px" } };
const _hoisted_4 = ["disabled"];
const _hoisted_5 = { class: "plan-grid" };
const _hoisted_6 = ["onClick"];
const _hoisted_7 = { class: "plan-info" };
const _hoisted_8 = { class: "plan-name" };
const _hoisted_9 = { class: "plan-guid" };
const _hoisted_10 = {
  key: 0,
  class: "plan-badge"
};
const _hoisted_11 = {
  key: 0,
  class: "rec-section"
};
const _hoisted_12 = { class: "plan-grid" };
const _hoisted_13 = ["onClick"];
const _hoisted_14 = { class: "plan-info" };
const _hoisted_15 = { class: "plan-name" };
const _hoisted_16 = {
  key: 1,
  class: "plan-grid"
};
const _hoisted_17 = ["onClick"];
const _hoisted_18 = { class: "plan-info" };
const _hoisted_19 = { class: "plan-name" };
const _hoisted_20 = { class: "plan-guid" };
const _hoisted_21 = {
  key: 2,
  class: "empty-hint"
};
const _hoisted_22 = { class: "content-grid" };
const _hoisted_23 = { class: "card" };
const _hoisted_24 = { class: "slider-list" };
const _hoisted_25 = { class: "slider-row" };
const _hoisted_26 = { class: "slider-ctrl" };
const _hoisted_27 = { class: "val" };
const _hoisted_28 = { class: "slider-row" };
const _hoisted_29 = { class: "slider-ctrl" };
const _hoisted_30 = {
  class: "toggle-list",
  style: { "margin-top": "12px" }
};
const _hoisted_31 = { class: "toggle-row" };
const _hoisted_32 = { class: "switch" };
const _hoisted_33 = { class: "toggle-row" };
const _hoisted_34 = { class: "switch" };
const _hoisted_35 = { class: "toggle-row" };
const _hoisted_36 = { class: "switch" };
const _hoisted_37 = { class: "toggle-row" };
const _hoisted_38 = { class: "switch" };
const _hoisted_39 = { class: "toggle-row" };
const _hoisted_40 = { class: "switch" };
const _hoisted_41 = { class: "timeout-grid" };
const _hoisted_42 = { class: "timeout-item" };
const _hoisted_43 = { class: "timeout-item" };
const _hoisted_44 = { class: "btn-row" };
const _hoisted_45 = ["disabled"];
const _hoisted_46 = ["disabled"];
const _hoisted_47 = { class: "card" };
const _hoisted_48 = { class: "status-list" };
const _hoisted_49 = { class: "status-item" };
const _hoisted_50 = { class: "si-value gold" };
const _hoisted_51 = { class: "status-item" };
const _hoisted_52 = { class: "si-value mono" };
const _hoisted_53 = { class: "status-item" };
const _hoisted_54 = { class: "si-value" };
const _hoisted_55 = { class: "log-header" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PowerOptimizer",
  setup(__props) {
    const refreshing = ref(false);
    const busy = ref(false);
    const lastOk = ref(true);
    const resultLogs = ref([]);
    const monitorTimeoutTouched = ref(false);
    const standbyTimeoutTouched = ref(false);
    const systemPlans = ref([]);
    const customPlans = ref([]);
    const status = reactive({
      cpuModel: "检测中...",
      cpuCores: 0,
      activePlanName: "检测中...",
      activeGuid: ""
    });
    const osIsWin11 = ref(false);
    const isLaptop = ref(false);
    async function detectPlatform() {
      try {
        if (!window.sysApi) return;
        const info = await window.sysApi.getSystemInfo();
        const release = String(info.sysRelease ?? "").trim();
        const version = release.match(/(?:^|[^\d.])\d+\.\d+\.(\d+)(?:\.\d+)?(?:$|[^\d.])/);
        const build = version ? Number(version[1]) : /^\d+$/.test(release) ? Number(release) : NaN;
        osIsWin11.value = Number.isFinite(build) ? build >= 22e3 : /\bWindows\s+11\b/i.test(release);
        isLaptop.value = await window.sysApi.powerHasBattery();
      } catch {
      }
    }
    function isIntelBigLittle() {
      const m = status.cpuModel;
      return /1[2-9](?:th|代)|大小核|Alder|Raptor|Meteor/i.test(m);
    }
    const recommendedPlans = computed(() => {
      const cpu = status.cpuModel;
      const isIntel = /Intel/i.test(cpu);
      const isAMD = /AMD|Ryzen/i.test(cpu);
      const plat = isLaptop.value ? "笔记本" : "台式机";
      const win = osIsWin11.value ? "Win11" : "Win10";
      const result = [];
      if (isIntel) {
        if (isIntelBigLittle()) {
          const target = customPlans.value.find(
            (p) => p.name.includes("Intel") && p.name.includes("大小核") && p.name.includes(plat) && p.name.includes(win)
          );
          if (target) result.push(target);
        } else {
          const target = customPlans.value.find(
            (p) => p.name.includes("Intel") && p.name.includes("i系列") && p.name.includes(plat)
          );
          if (target) result.push(target);
        }
      } else if (isAMD) {
        const target = customPlans.value.find(
          (p) => p.name.includes("AMD") && p.name.includes(plat)
        );
        if (target) result.push(target);
      }
      const universal = customPlans.value.find((p) => p.name.includes("通用版"));
      if (universal) result.push(universal);
      return result;
    });
    const otherPlans = computed(() => {
      const recFiles = new Set(recommendedPlans.value.map((p) => p.file));
      return customPlans.value.filter((p) => !recFiles.has(p.file));
    });
    const adv = reactive({
      cpuMin: 5,
      cpuMax: 100,
      cpuBoost: true,
      usbSuspend: true,
      pcieASPM: true,
      diskNeverOff: true,
      disableHibernate: false,
      monitorTimeout: 30,
      standbyTimeout: 0
    });
    function planColor(name) {
      if (name.includes("卓越")) return "#f59e0b";
      if (name.includes("高性能")) return "#38bdf8";
      if (name.includes("平衡")) return "#22c55e";
      return "#94a3b8";
    }
    async function refreshAll() {
      refreshing.value = true;
      try {
        if (!window.sysApi) return;
        const [plans, customs, st] = await Promise.all([
          window.sysApi.powerGetPlans(),
          window.sysApi.powerGetCustomPlans(),
          window.sysApi.powerGetStatus()
        ]);
        systemPlans.value = plans;
        customPlans.value = customs;
        Object.assign(status, st);
        await detectPlatform();
      } catch (e) {
        console.error(e);
      }
      refreshing.value = false;
    }
    async function switchPlan(guid) {
      busy.value = true;
      resultLogs.value = [];
      try {
        if (!window.sysApi) return;
        const r = await window.sysApi.powerApplyPlan(guid);
        if (r.success) {
          resultLogs.value = ["✓ 电源计划已切换"];
          await refreshAll();
        } else {
          resultLogs.value = ["✗ 切换失败 (需管理员权限)"];
        }
        lastOk.value = r.success;
      } catch (e) {
        resultLogs.value = [`✗ ${e.message}`];
        lastOk.value = false;
      } finally {
        busy.value = false;
      }
    }
    async function importAndApply(p) {
      busy.value = true;
      resultLogs.value = [];
      try {
        if (!window.sysApi) return;
        const imp = await window.sysApi.powerImportPlan(p.path);
        if (!imp.success) {
          resultLogs.value = ["✗ 导入失败"];
          lastOk.value = false;
          return;
        }
        resultLogs.value = [`✓ 已导入: ${imp.name || p.name}`];
        if (imp.guid) {
          const r = await window.sysApi.powerApplyPlan(imp.guid);
          if (r.success) resultLogs.value.push("✓ 已激活导入的方案");
          else resultLogs.value.push("✗ 激活失败");
          lastOk.value = r.success;
        }
        await refreshAll();
      } catch (e) {
        resultLogs.value = [`✗ ${e.message}`];
        lastOk.value = false;
      } finally {
        busy.value = false;
      }
    }
    async function applyTweaks() {
      busy.value = true;
      resultLogs.value = [];
      lastOk.value = true;
      try {
        if (!window.sysApi) return;
        const r = await window.sysApi.powerApplyTweaks({
          cpuMin: adv.cpuMin,
          cpuMax: adv.cpuMax,
          cpuBoost: adv.cpuBoost,
          usbSuspend: adv.usbSuspend,
          pcieASPM: adv.pcieASPM,
          diskNeverOff: adv.diskNeverOff,
          ...adv.disableHibernate ? { disableHibernate: true, hibernateFile: true } : {},
          ...monitorTimeoutTouched.value ? { monitorTimeout: adv.monitorTimeout } : {},
          ...standbyTimeoutTouched.value ? { standbyTimeout: adv.standbyTimeout } : {}
        });
        resultLogs.value = r.logs;
        lastOk.value = r.success;
        if (r.success) await refreshAll();
      } catch (e) {
        resultLogs.value = [`✗ ${e.message}`];
        lastOk.value = false;
      } finally {
        busy.value = false;
      }
    }
    async function restoreDynamic() {
      busy.value = true;
      resultLogs.value = [];
      lastOk.value = true;
      try {
        if (!window.sysApi) return;
        const r = await window.sysApi.powerRestoreDynamic();
        resultLogs.value = r.logs;
        lastOk.value = r.success;
      } catch (e) {
        resultLogs.value = [`✗ ${e.message}`];
        lastOk.value = false;
      } finally {
        busy.value = false;
      }
    }
    onMounted(() => {
      refreshAll();
      detectPlatform();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          _cache[11] || (_cache[11] = createStaticVNode('<div class="page-icon" style="background:rgba(245,158,11,0.08);" data-v-3121e0a8><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="1.5" data-v-3121e0a8><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" data-v-3121e0a8></path></svg></div><div data-v-3121e0a8><h2 class="page-title" data-v-3121e0a8>电源优化</h2><p class="page-desc" data-v-3121e0a8>按使用场景选择电源计划 · 兼顾性能、温度与续航</p></div>', 2)),
          createBaseVNode("div", _hoisted_3, [
            createBaseVNode("button", {
              class: "action-btn silver",
              onClick: refreshAll,
              disabled: refreshing.value
            }, toDisplayString(refreshing.value ? "刷新中..." : " 刷新状态"), 9, _hoisted_4)
          ])
        ]),
        _cache[44] || (_cache[44] = createBaseVNode("p", { class: "choice-hint" }, "不知道怎么选？先用 Windows「平衡」或电脑厂商默认计划。插电玩游戏时，再对照帧率、温度和风扇噪音选择；计划名称不能保证性能提升。", -1)),
        _cache[45] || (_cache[45] = createBaseVNode("div", { class: "section-label" }, "系统电源计划", -1)),
        createBaseVNode("div", _hoisted_5, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(systemPlans.value, (p) => {
            return openBlock(), createElementBlock("div", {
              class: normalizeClass(["plan-card", { active: p.isActive }]),
              key: p.guid,
              onClick: ($event) => switchPlan(p.guid)
            }, [
              createBaseVNode("div", {
                class: "plan-dot",
                style: normalizeStyle({ background: planColor(p.name) })
              }, null, 4),
              createBaseVNode("div", _hoisted_7, [
                createBaseVNode("span", _hoisted_8, toDisplayString(p.name), 1),
                createBaseVNode("span", _hoisted_9, toDisplayString(p.isActive ? "● 当前使用中" : p.guid.slice(0, 8) + "..."), 1)
              ]),
              p.isActive ? (openBlock(), createElementBlock("span", _hoisted_10, "活动")) : createCommentVNode("", true)
            ], 10, _hoisted_6);
          }), 128))
        ]),
        _cache[46] || (_cache[46] = createBaseVNode("div", {
          class: "section-label",
          style: { "margin-top": "16px" }
        }, "自定义电源方案", -1)),
        recommendedPlans.value.length ? (openBlock(), createElementBlock("div", _hoisted_11, [
          _cache[15] || (_cache[15] = createBaseVNode("div", { class: "rec-label" }, "按型号和方案名称初筛的候选 · 导入前请核对设备类型与系统版本，尚未验证本机性能", -1)),
          createBaseVNode("div", _hoisted_12, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(recommendedPlans.value, (p) => {
              return openBlock(), createElementBlock("div", {
                class: "plan-card recommended",
                key: p.file,
                onClick: ($event) => importAndApply(p)
              }, [
                _cache[13] || (_cache[13] = createBaseVNode("div", {
                  class: "plan-dot",
                  style: { background: "#f59e0b" }
                }, null, -1)),
                createBaseVNode("div", _hoisted_14, [
                  createBaseVNode("span", _hoisted_15, toDisplayString(p.name), 1),
                  _cache[12] || (_cache[12] = createBaseVNode("span", { class: "plan-guid" }, " 点击导入并激活", -1))
                ]),
                _cache[14] || (_cache[14] = createBaseVNode("span", { class: "plan-badge rec-badge" }, "候选", -1))
              ], 8, _hoisted_13);
            }), 128))
          ])
        ])) : createCommentVNode("", true),
        customPlans.value.length ? (openBlock(), createElementBlock("div", _hoisted_16, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(otherPlans.value, (p) => {
            return openBlock(), createElementBlock("div", {
              class: "plan-card custom",
              key: p.file,
              onClick: ($event) => importAndApply(p)
            }, [
              _cache[16] || (_cache[16] = createBaseVNode("div", {
                class: "plan-dot",
                style: { background: "#a855f7" }
              }, null, -1)),
              createBaseVNode("div", _hoisted_18, [
                createBaseVNode("span", _hoisted_19, toDisplayString(p.name), 1),
                createBaseVNode("span", _hoisted_20, toDisplayString(p.file), 1)
              ]),
              _cache[17] || (_cache[17] = createBaseVNode("span", { class: "plan-badge custom-badge" }, "导入并激活", -1))
            ], 8, _hoisted_17);
          }), 128))
        ])) : (openBlock(), createElementBlock("div", _hoisted_21, "未检测到自定义电源方案文件")),
        createBaseVNode("div", _hoisted_22, [
          createBaseVNode("div", _hoisted_23, [
            _cache[36] || (_cache[36] = createBaseVNode("div", { class: "section-title" }, "⚙ 高级电源设置", -1)),
            createBaseVNode("div", _hoisted_24, [
              createBaseVNode("div", _hoisted_25, [
                _cache[18] || (_cache[18] = createBaseVNode("div", { class: "slider-info" }, [
                  createBaseVNode("span", { class: "lbl" }, "最小处理器状态"),
                  createBaseVNode("span", { class: "desc" }, "处理器性能状态下限；调高可能增加空闲功耗")
                ], -1)),
                createBaseVNode("div", _hoisted_26, [
                  withDirectives(createBaseVNode("input", {
                    type: "range",
                    min: "0",
                    max: "90",
                    step: "5",
                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => adv.cpuMin = $event)
                  }, null, 512), [
                    [
                      vModelText,
                      adv.cpuMin,
                      void 0,
                      { number: true }
                    ]
                  ]),
                  createBaseVNode("span", _hoisted_27, toDisplayString(adv.cpuMin) + "%", 1)
                ])
              ]),
              createBaseVNode("div", _hoisted_28, [
                _cache[20] || (_cache[20] = createBaseVNode("div", { class: "slider-info" }, [
                  createBaseVNode("span", { class: "lbl" }, "最大处理器状态"),
                  createBaseVNode("span", { class: "desc" }, "本页保持 100%；实际频率仍由硬件、温度和功耗限制决定")
                ], -1)),
                createBaseVNode("div", _hoisted_29, [
                  withDirectives(createBaseVNode("input", {
                    type: "range",
                    min: "100",
                    max: "100",
                    "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => adv.cpuMax = $event),
                    disabled: ""
                  }, null, 512), [
                    [
                      vModelText,
                      adv.cpuMax,
                      void 0,
                      { number: true }
                    ]
                  ]),
                  _cache[19] || (_cache[19] = createBaseVNode("span", { class: "val" }, "100% 🔒", -1))
                ])
              ])
            ]),
            createBaseVNode("div", _hoisted_30, [
              createBaseVNode("div", _hoisted_31, [
                _cache[22] || (_cache[22] = createBaseVNode("div", { class: "toggle-info" }, [
                  createBaseVNode("span", { class: "tl" }, "CPU 性能增强"),
                  createBaseVNode("span", { class: "td" }, "开启使用积极提升策略，关闭仍允许提升；能否睿频取决于硬件与散热")
                ], -1)),
                createBaseVNode("label", _hoisted_32, [
                  withDirectives(createBaseVNode("input", {
                    type: "checkbox",
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => adv.cpuBoost = $event)
                  }, null, 512), [
                    [vModelCheckbox, adv.cpuBoost]
                  ]),
                  _cache[21] || (_cache[21] = createBaseVNode("span", { class: "slider" }, null, -1))
                ])
              ]),
              createBaseVNode("div", _hoisted_33, [
                _cache[24] || (_cache[24] = createBaseVNode("div", { class: "toggle-info" }, [
                  createBaseVNode("span", { class: "tl" }, "禁用 USB 选择性暂停"),
                  createBaseVNode("span", { class: "td" }, "用于排查外设休眠兼容问题；关闭节能可能增加功耗")
                ], -1)),
                createBaseVNode("label", _hoisted_34, [
                  withDirectives(createBaseVNode("input", {
                    type: "checkbox",
                    "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => adv.usbSuspend = $event)
                  }, null, 512), [
                    [vModelCheckbox, adv.usbSuspend]
                  ]),
                  _cache[23] || (_cache[23] = createBaseVNode("span", { class: "slider" }, null, -1))
                ])
              ]),
              createBaseVNode("div", _hoisted_35, [
                _cache[26] || (_cache[26] = createBaseVNode("div", { class: "toggle-info" }, [
                  createBaseVNode("span", { class: "tl" }, "关闭 PCIe 链路节能"),
                  createBaseVNode("span", { class: "td" }, "减少链路节能状态切换，可能增加功耗；不保证帧率提升")
                ], -1)),
                createBaseVNode("label", _hoisted_36, [
                  withDirectives(createBaseVNode("input", {
                    type: "checkbox",
                    "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => adv.pcieASPM = $event)
                  }, null, 512), [
                    [vModelCheckbox, adv.pcieASPM]
                  ]),
                  _cache[25] || (_cache[25] = createBaseVNode("span", { class: "slider" }, null, -1))
                ])
              ]),
              createBaseVNode("div", _hoisted_37, [
                _cache[28] || (_cache[28] = createBaseVNode("div", { class: "toggle-info" }, [
                  createBaseVNode("span", { class: "tl" }, "硬盘永不关闭"),
                  createBaseVNode("span", { class: "td" }, "消除硬盘唤醒延迟")
                ], -1)),
                createBaseVNode("label", _hoisted_38, [
                  withDirectives(createBaseVNode("input", {
                    type: "checkbox",
                    "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => adv.diskNeverOff = $event)
                  }, null, 512), [
                    [vModelCheckbox, adv.diskNeverOff]
                  ]),
                  _cache[27] || (_cache[27] = createBaseVNode("span", { class: "slider" }, null, -1))
                ])
              ]),
              createBaseVNode("div", _hoisted_39, [
                _cache[30] || (_cache[30] = createBaseVNode("div", { class: "toggle-info" }, [
                  createBaseVNode("span", { class: "tl" }, "禁用系统休眠"),
                  createBaseVNode("span", { class: "td" }, "明确选中后才删除 hiberfil.sys；休眠与混合睡眠不可用、快速启动受影响，意外断电可能丢失未保存数据；当前版本不能自动恢复原文件类型和大小")
                ], -1)),
                createBaseVNode("label", _hoisted_40, [
                  withDirectives(createBaseVNode("input", {
                    type: "checkbox",
                    "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => adv.disableHibernate = $event)
                  }, null, 512), [
                    [vModelCheckbox, adv.disableHibernate]
                  ]),
                  _cache[29] || (_cache[29] = createBaseVNode("span", { class: "slider" }, null, -1))
                ])
              ])
            ]),
            _cache[37] || (_cache[37] = createBaseVNode("div", {
              class: "section-title",
              style: { "margin-top": "14px" }
            }, " 超时设置", -1)),
            createBaseVNode("div", _hoisted_41, [
              createBaseVNode("div", _hoisted_42, [
                _cache[32] || (_cache[32] = createBaseVNode("span", { class: "lbl" }, "显示器关闭", -1)),
                withDirectives(createBaseVNode("select", {
                  "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => adv.monitorTimeout = $event),
                  class: "mini-select",
                  onChange: _cache[8] || (_cache[8] = ($event) => monitorTimeoutTouched.value = true)
                }, [..._cache[31] || (_cache[31] = [
                  createBaseVNode("option", { value: 1 }, "1 分钟", -1),
                  createBaseVNode("option", { value: 5 }, "5 分钟", -1),
                  createBaseVNode("option", { value: 10 }, "10 分钟", -1),
                  createBaseVNode("option", { value: 15 }, "15 分钟", -1),
                  createBaseVNode("option", { value: 30 }, "30 分钟", -1),
                  createBaseVNode("option", { value: 0 }, "永不", -1)
                ])], 544), [
                  [
                    vModelSelect,
                    adv.monitorTimeout,
                    void 0,
                    { number: true }
                  ]
                ])
              ]),
              createBaseVNode("div", _hoisted_43, [
                _cache[34] || (_cache[34] = createBaseVNode("span", { class: "lbl" }, "系统待机", -1)),
                withDirectives(createBaseVNode("select", {
                  "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => adv.standbyTimeout = $event),
                  class: "mini-select",
                  onChange: _cache[10] || (_cache[10] = ($event) => standbyTimeoutTouched.value = true)
                }, [..._cache[33] || (_cache[33] = [
                  createBaseVNode("option", { value: 0 }, "永不", -1),
                  createBaseVNode("option", { value: 15 }, "15 分钟", -1),
                  createBaseVNode("option", { value: 30 }, "30 分钟", -1),
                  createBaseVNode("option", { value: 60 }, "1 小时", -1)
                ])], 544), [
                  [
                    vModelSelect,
                    adv.standbyTimeout,
                    void 0,
                    { number: true }
                  ]
                ])
              ])
            ]),
            createBaseVNode("div", _hoisted_44, [
              createBaseVNode("button", {
                class: "apply-btn",
                onClick: applyTweaks,
                disabled: busy.value
              }, toDisplayString(busy.value ? "⚙ 应用中..." : " 应用高级电源设置"), 9, _hoisted_45),
              createBaseVNode("button", {
                class: "apply-btn restore-btn",
                onClick: restoreDynamic,
                disabled: busy.value
              }, [..._cache[35] || (_cache[35] = [
                createBaseVNode("svg", {
                  width: "14",
                  height: "14",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "2"
                }, [
                  createBaseVNode("path", { d: "M3 12a9 9 0 1 0 3-6.7L3 8" }),
                  createBaseVNode("path", { d: "M3 3v5h5" })
                ], -1),
                createTextVNode(" 恢复动态调频 ", -1)
              ])], 8, _hoisted_46)
            ]),
            _cache[38] || (_cache[38] = createBaseVNode("div", { class: "lock-hint" }, "超时设置仅在手动更改后写入；其他待应用参数会同时写入接电和电池供电设置。恢复动态调频会写入预设参数，不等于还原所有出厂电源设置，也不能解除硬件温度或功耗限制。", -1))
          ]),
          createBaseVNode("div", _hoisted_47, [
            _cache[42] || (_cache[42] = createBaseVNode("div", { class: "section-title" }, " 实时电源状态", -1)),
            createBaseVNode("div", _hoisted_48, [
              createBaseVNode("div", _hoisted_49, [
                _cache[39] || (_cache[39] = createBaseVNode("span", { class: "si-label" }, "当前计划", -1)),
                createBaseVNode("span", _hoisted_50, toDisplayString(status.activePlanName), 1)
              ]),
              createBaseVNode("div", _hoisted_51, [
                _cache[40] || (_cache[40] = createBaseVNode("span", { class: "si-label" }, "计划 GUID", -1)),
                createBaseVNode("span", _hoisted_52, toDisplayString(status.activeGuid || "—"), 1)
              ]),
              createBaseVNode("div", _hoisted_53, [
                _cache[41] || (_cache[41] = createBaseVNode("span", { class: "si-label" }, "CPU", -1)),
                createBaseVNode("span", _hoisted_54, toDisplayString(status.cpuModel?.slice(0, 40)) + " · " + toDisplayString(status.cpuCores) + " 核", 1)
              ])
            ]),
            _cache[43] || (_cache[43] = createStaticVNode('<div class="section-title" style="margin-top:14px;" data-v-3121e0a8> 怎么选择</div><div class="rec-list" data-v-3121e0a8><div class="rec-item" data-v-3121e0a8><span class="rec-dot" style="background:#f59e0b;" data-v-3121e0a8></span><div data-v-3121e0a8><strong data-v-3121e0a8>日常使用 · 先选平衡</strong><br data-v-3121e0a8>台式机与笔记本都可从 Windows 平衡或厂商默认计划开始。使用电池时，在 Windows 电源模式中优先节能。</div></div><div class="rec-item" data-v-3121e0a8><span class="rec-dot" style="background:#a855f7;" data-v-3121e0a8></span><div data-v-3121e0a8><strong data-v-3121e0a8>插电玩游戏 · 再比较性能</strong><br data-v-3121e0a8>笔记本接通电源，按需使用厂商性能模式或 Windows「最佳性能」。尽量用同一游戏场景对照帧率与温度；变热、变吵却没有收益时可切回原计划。</div></div><div class="rec-item" data-v-3121e0a8><span class="rec-dot" style="background:#38bdf8;" data-v-3121e0a8></span><div data-v-3121e0a8><strong data-v-3121e0a8>自定义方案 · 按条件试用</strong><br data-v-3121e0a8>仅有 Intel / AMD 型号无法确定最佳设置；大小核、双 CCD 等方案还需核对具体架构和前提。导入前记下当前计划名称，便于切回。</div></div><div class="rec-item" data-v-3121e0a8><span class="rec-dot" style="background:#22c55e;" data-v-3121e0a8></span><div data-v-3121e0a8><strong data-v-3121e0a8>电源计划与电源模式不同</strong><br data-v-3121e0a8>Windows 11 的电源模式位于「设置 → 系统 → 电源和电池」。如果使用自定义计划后不能切换模式，可先在系统电源计划中选择「平衡」。</div></div></div>', 2)),
            resultLogs.value.length ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: normalizeClass(["log-panel", lastOk.value ? "success" : "error"])
            }, [
              createBaseVNode("div", _hoisted_55, toDisplayString(lastOk.value ? " 操作完成" : "⚠ 部分失败"), 1),
              (openBlock(true), createElementBlock(Fragment, null, renderList(resultLogs.value, (l, i) => {
                return openBlock(), createElementBlock("div", {
                  class: normalizeClass(["log-line", { ok: l.startsWith("✓"), err: l.startsWith("✗") }]),
                  key: i
                }, toDisplayString(l), 3);
              }), 128))
            ], 2)) : createCommentVNode("", true)
          ])
        ])
      ]);
    };
  }
});
const PowerOptimizer = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3121e0a8"]]);
export {
  PowerOptimizer as default
};
