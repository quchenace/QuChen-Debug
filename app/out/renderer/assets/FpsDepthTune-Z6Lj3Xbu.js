import { t as defineComponent, aD as watch, a1 as onMounted, a3 as onUnmounted, a5 as openBlock, l as createElementBlock, p as createStaticVNode, k as createCommentVNode, q as createTextVNode, ak as toDisplayString, i as createBaseVNode, F as Fragment, ab as renderList, S as normalizeClass, as as unref, aG as withDirectives, ax as vModelCheckbox, V as normalizeStyle, r as createVNode, a9 as ref, g as computed, _ as _export_sfc } from "./main-DAqTdO6U.js";
import { f as fpsPlan, F as FPS_GROUPS, a as fpsSettingGroup } from "./fpsPlan-BV2AClQh.js";
import { T as TweakShelf } from "./TweakShelf-BggrlQpq.js";
import "./index-CL4m76NE.js";
import "./StatusDot-C-XeYEe8.js";
import "./KeywordConfirm-CUMT0nLF.js";
const _hoisted_1 = { class: "page fps-depth-page" };
const _hoisted_2 = {
  key: 0,
  class: "banner warn"
};
const _hoisted_3 = {
  key: 1,
  class: "banner danger"
};
const _hoisted_4 = { class: "selfcheck-actions" };
const _hoisted_5 = ["disabled"];
const _hoisted_6 = { class: "tiers" };
const _hoisted_7 = ["onClick"];
const _hoisted_8 = { class: "tier-name" };
const _hoisted_9 = { class: "tier-desc" };
const _hoisted_10 = { class: "tier-count" };
const _hoisted_11 = { class: "tier-items" };
const _hoisted_12 = {
  key: 0,
  class: "tier-restart"
};
const _hoisted_13 = {
  key: 2,
  class: "extreme-check"
};
const _hoisted_14 = { class: "plan-panel" };
const _hoisted_15 = { class: "plan-head" };
const _hoisted_16 = { class: "plan-note" };
const _hoisted_17 = ["disabled"];
const _hoisted_18 = ["value", "disabled"];
const _hoisted_19 = { class: "plan-copy" };
const _hoisted_20 = { class: "plan-tag" };
const _hoisted_21 = {
  key: 3,
  class: "progress-panel"
};
const _hoisted_22 = { class: "progress-track" };
const _hoisted_23 = { class: "progress-msg" };
const _hoisted_24 = { class: "actions" };
const _hoisted_25 = ["disabled"];
const _hoisted_26 = ["disabled"];
const _hoisted_27 = ["disabled"];
const _hoisted_28 = {
  key: 4,
  class: "banner warn"
};
const _hoisted_29 = {
  key: 5,
  class: "log-panel"
};
const _hoisted_30 = {
  key: 0,
  class: "log-footer"
};
const _hoisted_31 = { class: "depth-zone" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "FpsDepthTune",
  setup(__props) {
    const isAdminUser = ref(false);
    const selected = ref("safe");
    const extremeConfirmed = ref(false);
    const busy = ref(false);
    const pct = ref(0);
    const progressMsg = ref("");
    const logs = ref([]);
    const lastErr = ref(false);
    const needRestart = ref(false);
    const hasBackup = ref(false);
    const backupFileCount = ref(0);
    const legacyBackupCount = ref(0);
    const backupError = ref("");
    const tiers = [
      {
        id: "safe",
        label: "基础电竞",
        badge: "基础",
        desc: "5.7.0 基础方案 · 游戏、网络与后台",
        items: ["Game DVR、MMCSS、TCP 与 RSS", "通知、后台刷新、兼容性与自动维护", "更新下载、错误报告与 USB 节能"],
        needRestart: true,
        safety: "warn",
        safetyText: "会关闭录屏、通知及部分后台功能，调整节能策略；并非无副作用。"
      },
      {
        id: "advanced",
        label: "极致流畅",
        badge: "增强",
        desc: "包含基础方案 · CPU、内存与服务",
        items: ["插电时 CPU 最低 / 最高状态 100%", "SysMain、搜索与多项后台服务", "输入、透明效果、小组件与网络节流"],
        needRestart: true,
        safety: "warn",
        safetyText: "可能增加功耗、温度与噪声；定位、热点、扫描仪和同步等功能可能受影响。"
      },
      {
        id: "extreme",
        label: "极客骨灰级",
        badge: "极客",
        desc: "包含增强方案 · Xbox、同步与休眠",
        items: ["Xbox 登录、云存档、联机与配件服务", "Microsoft 账户设置同步", "关闭休眠，影响混合睡眠与快速启动"],
        needRestart: true,
        safety: "danger",
        safetyText: "使用 Xbox / Game Pass、手柄或休眠时，请取消对应项目；用相同场景验证实际收益。"
      }
    ];
    const previewItems = ref([]);
    const chosen = ref([]);
    const previewLoading = ref(false);
    const previewError = ref("");
    const previewNote = ref("");
    const availableCount = computed(() => previewItems.value.filter((item) => item.available).length);
    const previewGroups = computed(() => FPS_GROUPS.map((name) => ({ name, items: previewItems.value.filter((item) => fpsSettingGroup(item.id) === name) })).filter((group) => group.items.length));
    function selectAllAvailable() {
      chosen.value = previewItems.value.filter((item) => item.available).map((item) => item.id);
    }
    let previewSeq = 0;
    async function loadPreview() {
      const seq = ++previewSeq;
      previewLoading.value = true;
      previewError.value = "";
      extremeConfirmed.value = false;
      try {
        const result = await window.sysApi.fpsPreviewTier(selected.value);
        if (seq !== previewSeq) return;
        if (!result.success) throw Error(result.error || "无法获取执行清单");
        previewItems.value = result.items;
        chosen.value = result.items.filter((i) => i.selected && i.available).map((i) => i.id);
        previewNote.value = result.note || "";
      } catch (e) {
        if (seq === previewSeq) {
          previewError.value = String(e);
          chosen.value = [];
        }
      } finally {
        if (seq === previewSeq) previewLoading.value = false;
      }
    }
    watch(selected, () => {
      void loadPreview();
    });
    const currentTier = computed(() => tiers.find((t) => t.id === selected.value));
    let unsubProgress = null;
    const selfCheckWarning = ref(null);
    async function loadSelfCheck() {
      try {
        const r = await window.sysApi.optimizeSelfCheck();
        selfCheckWarning.value = r?.warning ?? null;
      } catch {
      }
    }
    async function dismissSelfCheck() {
      selfCheckWarning.value = null;
      try {
        await window.sysApi.clearOptimizeMarker();
      } catch {
      }
    }
    onMounted(async () => {
      if (!window.sysApi) return;
      isAdminUser.value = await window.sysApi.fpsIsAdmin();
      void loadPreview();
      loadSelfCheck();
      checkBackup();
      unsubProgress = window.sysApi?.onFpsProgress?.((d) => {
        if (typeof d.percent === "number") pct.value = d.percent;
        if (d.message) progressMsg.value = d.message;
      }) ?? null;
    });
    onUnmounted(() => {
      previewSeq++;
      unsubProgress?.();
    });
    async function checkBackup() {
      if (!window.sysApi) return;
      try {
        const r = await window.sysApi.fpsGetBackupStatus();
        hasBackup.value = !!r?.hasBackup;
        backupFileCount.value = r?.fileCount ?? 0;
        legacyBackupCount.value = r?.legacyCount ?? 0;
        backupError.value = r?.error || "";
      } catch {
        hasBackup.value = false;
      }
    }
    async function run() {
      if (!window.sysApi || busy.value) return;
      busy.value = true;
      logs.value = [];
      lastErr.value = false;
      needRestart.value = false;
      pct.value = 0;
      try {
        const r = await window.sysApi.fpsApplyTier(selected.value, [...chosen.value]);
        logs.value.push(...r.logs || []);
        lastErr.value = !r.success;
        needRestart.value = r.needRestart;
        if (!r.success && r.error) logs.value.push("✗ " + r.error);
      } catch (e) {
        lastErr.value = true;
        logs.value.push("✗ " + (e?.message || "执行异常"));
      } finally {
        busy.value = false;
        if (!lastErr.value) pct.value = 100;
        await checkBackup();
      }
    }
    async function restore(source) {
      if (!window.sysApi || busy.value) return;
      busy.value = true;
      logs.value = [];
      lastErr.value = false;
      needRestart.value = false;
      try {
        const r = await window.sysApi.fpsRestore(source);
        logs.value.push(...r.logs || []);
        lastErr.value = !r.success;
        needRestart.value = !!r.needRestart;
        if (!r.success && r.error) logs.value.push("✗ " + r.error);
      } catch (e) {
        lastErr.value = true;
        logs.value.push("✗ " + (e?.message || "恢复失败"));
      } finally {
        busy.value = false;
        await checkBackup();
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        _cache[9] || (_cache[9] = createStaticVNode('<div class="page-header" data-v-036a00d0><div class="page-icon" data-v-036a00d0><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="1.5" data-v-036a00d0><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" data-v-036a00d0></path></svg></div><div class="page-title-block" data-v-036a00d0><h2 class="page-title" data-v-036a00d0>极限帧率</h2><p class="page-desc" data-v-036a00d0>5.7.0 三档方案 · 默认全选可用项 · 原值持久备份</p></div></div>', 1)),
        !isAdminUser.value ? (openBlock(), createElementBlock("div", _hoisted_2, "⚠ 需要管理员权限 — 请以管理员身份运行")) : createCommentVNode("", true),
        selfCheckWarning.value ? (openBlock(), createElementBlock("div", _hoisted_3, [
          createTextVNode(" ⚠️ " + toDisplayString(selfCheckWarning.value) + " ", 1),
          createBaseVNode("div", _hoisted_4, [
            createBaseVNode("button", {
              class: "btn restore",
              disabled: busy.value,
              onClick: _cache[0] || (_cache[0] = ($event) => restore())
            }, "恢复原值", 8, _hoisted_5),
            createBaseVNode("button", {
              class: "btn restore",
              onClick: dismissSelfCheck
            }, "知道了")
          ])
        ])) : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_6, [
          (openBlock(), createElementBlock(Fragment, null, renderList(tiers, (t) => {
            return createBaseVNode("div", {
              class: normalizeClass(["tier-card", { active: selected.value === t.id }]),
              key: t.id,
              onClick: ($event) => !busy.value && (selected.value = t.id)
            }, [
              createBaseVNode("div", {
                class: normalizeClass(["tier-badge", t.id])
              }, toDisplayString(t.badge), 3),
              createBaseVNode("div", _hoisted_8, toDisplayString(t.label), 1),
              createBaseVNode("div", _hoisted_9, toDisplayString(t.desc), 1),
              createBaseVNode("div", _hoisted_10, toDisplayString(unref(fpsPlan)(t.id).length) + " 项独立操作（包含前档）", 1),
              createBaseVNode("div", {
                class: normalizeClass(["tier-safety", t.safety])
              }, toDisplayString(t.safetyText), 3),
              createBaseVNode("div", _hoisted_11, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(t.items, (item) => {
                  return openBlock(), createElementBlock("div", {
                    class: "tier-item",
                    key: item
                  }, "✓ " + toDisplayString(item), 1);
                }), 128))
              ]),
              t.needRestart ? (openBlock(), createElementBlock("div", _hoisted_12, "部分设置需重新登录或重启后生效")) : createCommentVNode("", true)
            ], 10, _hoisted_7);
          }), 64))
        ]),
        selected.value === "extreme" ? (openBlock(), createElementBlock("div", _hoisted_13, [
          createBaseVNode("label", null, [
            withDirectives(createBaseVNode("input", {
              type: "checkbox",
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => extremeConfirmed.value = $event)
            }, null, 512), [
              [vModelCheckbox, extremeConfirmed.value]
            ]),
            _cache[5] || (_cache[5] = createTextVNode(" 我已了解旧版三档会调整系统功能；极客档包含 Xbox 服务停用、设置同步和休眠关闭", -1))
          ])
        ])) : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_14, [
          createBaseVNode("div", _hoisted_15, [
            _cache[6] || (_cache[6] = createBaseVNode("strong", null, "本次执行清单", -1)),
            createBaseVNode("span", null, toDisplayString(previewLoading.value ? "正在检查适用性…" : `共 ${previewItems.value.length} 项 · 可用 ${availableCount.value} 项 · 已选 ${chosen.value.length} 项`), 1)
          ]),
          createBaseVNode("p", _hoisted_16, toDisplayString(previewError.value || previewNote.value), 1),
          createBaseVNode("button", {
            class: "plan-defaults",
            disabled: busy.value || previewLoading.value || !!previewError.value,
            onClick: selectAllAvailable
          }, "全选可用项目", 8, _hoisted_17),
          (openBlock(true), createElementBlock(Fragment, null, renderList(previewGroups.value, (group) => {
            return openBlock(), createElementBlock("section", {
              key: group.name,
              class: "plan-group"
            }, [
              createBaseVNode("h3", null, [
                createTextVNode(toDisplayString(group.name), 1),
                createBaseVNode("span", null, toDisplayString(group.items.length) + " 项", 1)
              ]),
              (openBlock(true), createElementBlock(Fragment, null, renderList(group.items, (item) => {
                return openBlock(), createElementBlock("label", {
                  key: item.id,
                  class: normalizeClass(["plan-row", { unavailable: !item.available }])
                }, [
                  withDirectives(createBaseVNode("input", {
                    type: "checkbox",
                    "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => chosen.value = $event),
                    value: item.id,
                    disabled: busy.value || previewLoading.value || !item.available
                  }, null, 8, _hoisted_18), [
                    [vModelCheckbox, chosen.value]
                  ]),
                  createBaseVNode("span", _hoisted_19, [
                    createBaseVNode("strong", null, toDisplayString(item.label), 1),
                    createBaseVNode("small", null, toDisplayString(item.reason || item.impact), 1)
                  ]),
                  createBaseVNode("span", _hoisted_20, toDisplayString(!item.available ? "不可用" : chosen.value.includes(item.id) ? "已选" : "未选"), 1)
                ], 2);
              }), 128))
            ]);
          }), 128)),
          _cache[7] || (_cache[7] = createBaseVNode("p", { class: "plan-note" }, "按 5.7.0 执行顺序准备清单，默认全选可用项，可按需求取消。部分服务会立即停止；部分设置需重新登录或重启。仅切换档位或勾选不会修改系统；取消已应用项目后点击「应用」，才会按备份恢复。已有其他三档方案的恢复记录时，请先恢复原值，再应用此方案。", -1))
        ]),
        busy.value ? (openBlock(), createElementBlock("div", _hoisted_21, [
          createBaseVNode("div", _hoisted_22, [
            createBaseVNode("div", {
              class: "progress-fill",
              style: normalizeStyle({ width: pct.value + "%" })
            }, null, 4)
          ]),
          createBaseVNode("div", _hoisted_23, toDisplayString(progressMsg.value), 1)
        ])) : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_24, [
          createBaseVNode("button", {
            class: "btn primary",
            onClick: run,
            disabled: busy.value || previewLoading.value || !!previewError.value || !chosen.value.length || !isAdminUser.value || selected.value === "extreme" && !extremeConfirmed.value
          }, toDisplayString(busy.value ? "执行中..." : "应用「" + (currentTier.value?.label || "") + "」"), 9, _hoisted_25),
          createBaseVNode("button", {
            class: "btn restore",
            onClick: _cache[3] || (_cache[3] = ($event) => restore()),
            disabled: busy.value || !isAdminUser.value || !hasBackup.value
          }, toDisplayString(busy.value ? "处理中..." : "恢复原值"), 9, _hoisted_26),
          legacyBackupCount.value ? (openBlock(), createElementBlock("button", {
            key: 0,
            class: "btn restore",
            onClick: _cache[4] || (_cache[4] = ($event) => restore("legacy")),
            disabled: busy.value || !isAdminUser.value || hasBackup.value
          }, "恢复旧版备份（" + toDisplayString(legacyBackupCount.value) + "）", 9, _hoisted_27)) : createCommentVNode("", true),
          createBaseVNode("span", {
            class: normalizeClass(["backup-status", { empty: !hasBackup.value }])
          }, toDisplayString(hasBackup.value ? `💾 已保存 ${backupFileCount.value} 项恢复记录` : "无可还原的备份"), 3)
        ]),
        backupError.value ? (openBlock(), createElementBlock("div", _hoisted_28, toDisplayString(backupError.value), 1)) : createCommentVNode("", true),
        logs.value.length ? (openBlock(), createElementBlock("div", _hoisted_29, [
          createBaseVNode("div", {
            class: normalizeClass(["log-title", { err: lastErr.value }])
          }, toDisplayString(lastErr.value ? "✗ 执行出错" : "执行结果"), 3),
          (openBlock(true), createElementBlock(Fragment, null, renderList(logs.value, (l, i) => {
            return openBlock(), createElementBlock("div", {
              class: normalizeClass(["log-line", { err: l.startsWith("✗") }]),
              key: i
            }, toDisplayString(l), 3);
          }), 128)),
          needRestart.value && !lastErr.value ? (openBlock(), createElementBlock("div", _hoisted_30, "⚠ 建议重启电脑，使本次设置或还原生效")) : createCommentVNode("", true)
        ])) : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_31, [
          _cache[8] || (_cache[8] = createBaseVNode("div", { class: "depth-head" }, [
            createBaseVNode("span", { class: "depth-title" }, "逐项深度优化"),
            createBaseVNode("span", { class: "depth-hint" }, "逐项开关：危险项(Lv3-4)应用前需确认")
          ], -1)),
          createVNode(TweakShelf, {
            files: ["FpsDepthTweaks.json"],
            title: "性能深度调优",
            dangerNote: "Lv4 项(禁 VBS/防火墙/Defender 类)会降低系统安全防护,请确认了解风险",
            overview: "",
            "device-probe": "gpu"
          })
        ])
      ]);
    };
  }
});
const FpsDepthTune = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-036a00d0"]]);
export {
  FpsDepthTune as default
};
