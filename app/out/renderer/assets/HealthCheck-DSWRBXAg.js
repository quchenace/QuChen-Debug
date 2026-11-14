import { t as defineComponent, a1 as onMounted, a3 as onUnmounted, l as createElementBlock, i as createBaseVNode, p as createStaticVNode, r as createVNode, aF as withCtx, ak as toDisplayString, k as createCommentVNode, F as Fragment, ab as renderList, V as normalizeStyle, q as createTextVNode, a9 as ref, g as computed, ad as resolveComponent, av as useRouter, a5 as openBlock, S as normalizeClass, _ as _export_sfc } from "./main-DAqTdO6U.js";
import { d as ElMessage } from "./index-CL4m76NE.js";
import { K as KeywordConfirm } from "./KeywordConfirm-CUMT0nLF.js";
const _hoisted_1 = { class: "page hc-page" };
const _hoisted_2 = { class: "page-header" };
const _hoisted_3 = { class: "hc-actions" };
const _hoisted_4 = ["disabled"];
const _hoisted_5 = ["disabled", "title"];
const _hoisted_6 = ["disabled"];
const _hoisted_7 = ["disabled"];
const _hoisted_8 = { class: "hc-protection" };
const _hoisted_9 = {
  key: 0,
  role: "status"
};
const _hoisted_10 = {
  key: 0,
  class: "hc-result",
  role: "status"
};
const _hoisted_11 = { key: 0 };
const _hoisted_12 = {
  key: 1,
  class: "hc-result-error"
};
const _hoisted_13 = { key: 0 };
const _hoisted_14 = {
  key: 1,
  class: "hc-selfcheck"
};
const _hoisted_15 = { class: "hc-selfcheck-body" };
const _hoisted_16 = { class: "hc-selfcheck-title" };
const _hoisted_17 = { class: "hc-selfcheck-actions" };
const _hoisted_18 = {
  key: 2,
  class: "hc-progress"
};
const _hoisted_19 = { class: "hc-progress-bar" };
const _hoisted_20 = { class: "hc-progress-label" };
const _hoisted_21 = { class: "hc-top" };
const _hoisted_22 = { class: "hc-score-card" };
const _hoisted_23 = { class: "hc-ring" };
const _hoisted_24 = {
  width: "120",
  height: "120",
  viewBox: "0 0 120 120"
};
const _hoisted_25 = { class: "hc-ring-text" };
const _hoisted_26 = { class: "hc-score-num" };
const _hoisted_27 = {
  key: 1,
  class: "hc-score-num muted"
};
const _hoisted_28 = { class: "hc-score-info" };
const _hoisted_29 = { class: "hc-stat-line" };
const _hoisted_30 = { class: "hc-stat-line sub" };
const _hoisted_31 = {
  key: 0,
  class: "hc-stat-line warn"
};
const _hoisted_32 = { class: "hc-hw-grid" };
const _hoisted_33 = { class: "hc-hw-name" };
const _hoisted_34 = { class: "hc-hw-value" };
const _hoisted_35 = { class: "hc-section" };
const _hoisted_36 = { class: "hc-section-title" };
const _hoisted_37 = {
  key: 0,
  class: "hc-count"
};
const _hoisted_38 = {
  key: 0,
  class: "hc-empty"
};
const _hoisted_39 = {
  key: 1,
  class: "hc-empty ok"
};
const _hoisted_40 = {
  key: 2,
  class: "hc-suggest-list"
};
const _hoisted_41 = ["onClick"];
const _hoisted_42 = { class: "hc-suggest-name" };
const _hoisted_43 = { class: "hc-suggest-cat" };
const _hoisted_44 = {
  key: 0,
  class: "hc-suggest-go"
};
const _hoisted_45 = { class: "hc-section" };
const _hoisted_46 = { class: "hc-matrix" };
const _hoisted_47 = ["onClick"];
const _hoisted_48 = { class: "hc-tile-name" };
const _hoisted_49 = { class: "hc-tile-count" };
const _hoisted_50 = { class: "hc-tile-bar" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "HealthCheck",
  setup(__props) {
    const router = useRouter();
    const scan = ref(null);
    const busy = ref(false);
    const applyPhase = ref("");
    const applyResult = ref(null);
    const resultLabels = { applied: "已应用并核验", unchanged: "已满足", skipped: "已跳过", failed: "未完成", restored: "已恢复" };
    const applySummary = computed(() => {
      const rows = applyResult.value?.items ?? [];
      return `已应用 ${rows.filter((i) => i.status === "applied").length} 项 · 已满足 ${rows.filter((i) => i.status === "unchanged").length} 项 · 跳过 ${rows.filter((i) => i.status === "skipped").length} 项 · 未完成 ${rows.filter((i) => i.status === "failed").length} 项`;
    });
    let unsubApply = null;
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
    async function goFpsRestore() {
      dismissSelfCheck();
      router.push("/deep-tune?tab=fps");
    }
    const progress = ref(0);
    const progressPhase = ref("");
    let timer = null;
    let unsubProgress = null;
    const phaseTextMap = { loading: "加载清单", scanning: "检测中", hardware: "读取硬件", network: "网络延迟", done: "完成" };
    const progressPhaseText = computed(() => phaseTextMap[progressPhase.value] ?? (progressPhase.value || ""));
    const levelMap = {
      excellent: { text: "优秀", color: "#22c55e" },
      good: { text: "良好", color: "#38bdf8" },
      fair: { text: "一般", color: "#f59e0b" },
      poor: { text: "需优化", color: "#ef4444" }
    };
    const levelText = computed(() => scan.value?.level ? levelMap[scan.value.level]?.text ?? scan.value.level : "—");
    const levelColor = computed(() => scan.value?.level ? levelMap[scan.value.level]?.color ?? "#94a3b8" : "#94a3b8");
    const ringDash = computed(() => {
      const s = scan.value;
      if (!s || s.score == null) return "0 326.7";
      return `${s.score / 100 * 326.7} 326.7`;
    });
    const hasApplyable = computed(() => (scan.value?.applyable?.length ?? 0) > 0);
    const applyableCount = computed(() => scan.value?.applyable?.length ?? 0);
    const hwMetrics = computed(() => {
      const h = scan.value?.hw;
      if (!h) return [];
      const tri = (v, warn, danger, suffix = "") => {
        if (v == null) return { value: "—", state: "na" };
        const state = v >= danger ? "danger" : v >= warn ? "warn" : "ok";
        return { value: v + suffix, state };
      };
      return [
        { key: "cpu", label: "CPU", ...tri(h.cpu, 70, 85, "%") },
        { key: "ram", label: "内存", ...tri(h.ram, 75, 90, "%") },
        { key: "disk", label: "磁盘 C", ...tri(h.disk, 80, 90, "%") },
        { key: "gpu", label: "GPU", ...tri(h.gpu, 75, 90, "%") },
        { key: "latency", label: "网络延迟", ...tri(h.latency, 50, 100, "ms") },
        { key: "temp", label: "CPU 温度", ...tri(h.temp, 70, 85, "°C") }
      ];
    });
    const pct = (a, t) => t > 0 ? `${Math.round(a / t * 100)}%` : "0%";
    const go = (page, suggestion) => {
      if (!page) return;
      if (suggestion && page.startsWith("/deep-tune")) {
        router.push(`${page}&focus=${encodeURIComponent(`${suggestion.category}::${suggestion.name}`)}`);
        return;
      }
      router.push(page);
    };
    const kwState = ref(false);
    const kwTitle = ref("");
    const kwDetail = ref("");
    const kwConsequences = ref([]);
    async function askApplyAll() {
      const s = scan.value;
      if (!s || !hasApplyable.value || busy.value) return;
      const skipped = s.suggestions.filter((x) => x.level >= 2);
      if (skipped.length) {
        kwTitle.value = "一键应用推荐确认";
        kwDetail.value = `将检查 ${applyableCount.value} 项基础优化；${skipped.length} 项中高危优化(Lv≥2)已排除。应用前逐项保存原值，系统还原不可用时仍可执行已完整备份的基础项目；脚本及备份失败项会跳过。`;
        kwConsequences.value = skipped.map((x) => `已排除「${x.name}」(Lv${x.level})`);
        kwState.value = true;
        return;
      }
      await doApplyAll();
    }
    async function kwConfirm() {
      kwState.value = false;
      await doApplyAll();
    }
    async function doApplyAll() {
      const s = scan.value;
      if (!s || !s.applyable?.length || busy.value) return;
      busy.value = true;
      applyPhase.value = "正在核对恢复档案…";
      applyResult.value = null;
      try {
        const keys = s.applyable.map((x) => `${x.category}::${x.name}`);
        const r = await window.sysApi.healthApply(keys);
        applyResult.value = r;
        if (r.success && !r.items.some((i) => i.status === "skipped")) ElMessage.success(applySummary.value);
        else ElMessage.warning(r.error || `${applySummary.value}，请查看逐项结果`);
      } catch (e) {
        ElMessage.error(String(e?.message || e));
      } finally {
        busy.value = false;
        applyPhase.value = "";
      }
      await doScan();
    }
    async function createPoint() {
      busy.value = true;
      try {
        const r = await window.sysApi.createRestorePoint();
        if (r.success) ElMessage.success("还原点已创建");
        else ElMessage.warning(r.error || "还原点创建失败");
      } catch (e) {
        ElMessage.error(String(e?.message || e));
      } finally {
        busy.value = false;
      }
    }
    async function doScan() {
      if (busy.value) return;
      busy.value = true;
      try {
        const r = await window.sysApi.healthScan();
        if (r.success) scan.value = r;
        else ElMessage.error(r.error || "体检失败");
      } catch (e) {
        ElMessage.error(String(e?.message || e));
      } finally {
        busy.value = false;
      }
    }
    onMounted(() => {
      unsubApply = window.sysApi.onHealthApplyProgress((text) => {
        if (applyPhase.value) applyPhase.value = text;
      });
      unsubProgress = window.sysApi.onHealthProgress((p) => {
        progress.value = p.percent;
        progressPhase.value = p.phase;
      });
      doScan();
      loadSelfCheck();
      timer = setInterval(doScan, 6e4);
    });
    onUnmounted(() => {
      if (timer) clearInterval(timer);
      unsubProgress?.();
      unsubApply?.();
    });
    return (_ctx, _cache) => {
      const _component_router_link = resolveComponent("router-link");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          _cache[5] || (_cache[5] = createStaticVNode('<div class="page-icon" data-v-441c900e><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="1.5" data-v-441c900e><path d="M22 12h-4l-3 9L9 3l-3 9H2" data-v-441c900e></path><circle cx="12" cy="12" r="10" opacity="0.25" data-v-441c900e></circle></svg></div><div class="page-title-block" data-v-441c900e><h2 class="page-title" data-v-441c900e>系统体检</h2><p class="page-desc" data-v-441c900e>优化项检查 · 评分与优化建议</p></div>', 2)),
          createBaseVNode("div", _hoisted_3, [
            createVNode(_component_router_link, {
              class: "hc-btn",
              to: "/community?publish=system"
            }, {
              default: withCtx(() => [..._cache[3] || (_cache[3] = [
                createTextVNode("分享我的设置", -1)
              ])]),
              _: 1
            }),
            createVNode(_component_router_link, {
              class: "hc-btn",
              to: "/system-diagnostics"
            }, {
              default: withCtx(() => [..._cache[4] || (_cache[4] = [
                createTextVNode("系统诊断与修复", -1)
              ])]),
              _: 1
            }),
            createBaseVNode("button", {
              class: "hc-btn primary",
              disabled: busy.value,
              onClick: _cache[0] || (_cache[0] = ($event) => doScan())
            }, "⟳ 立即体检", 8, _hoisted_4),
            createBaseVNode("button", {
              class: "hc-btn",
              disabled: busy.value || !hasApplyable.value,
              onClick: askApplyAll,
              title: applyableCount.value < (scan.value?.suggestions?.length ?? 0) ? "仅应用最基础的优化项（Lv≥2 需手动逐项应用）" : ""
            }, "⚡ " + toDisplayString(applyPhase.value ? "正在备份与优化…" : "一键应用推荐"), 9, _hoisted_5),
            createBaseVNode("button", {
              class: "hc-btn",
              disabled: busy.value,
              onClick: createPoint
            }, "🛡 创建还原点", 8, _hoisted_6),
            createBaseVNode("button", {
              class: "hc-btn",
              disabled: busy.value,
              onClick: _cache[1] || (_cache[1] = ($event) => doScan())
            }, "刷新状态", 8, _hoisted_7)
          ])
        ]),
        createBaseVNode("div", _hoisted_8, [
          _cache[7] || (_cache[7] = createBaseVNode("p", null, "只读体检无需系统还原点。一键优化会先保存每项设置的原值；系统还原不可用时，只执行可完整备份的基础项目。", -1)),
          createVNode(_component_router_link, { to: "/backup-center?section=health-recovery" }, {
            default: withCtx(() => [..._cache[6] || (_cache[6] = [
              createTextVNode("查看体检备份 / 撤销优化 →", -1)
            ])]),
            _: 1
          }),
          applyPhase.value ? (openBlock(), createElementBlock("p", _hoisted_9, toDisplayString(applyPhase.value), 1)) : createCommentVNode("", true)
        ]),
        applyResult.value ? (openBlock(), createElementBlock("div", _hoisted_10, [
          createBaseVNode("strong", null, toDisplayString(applySummary.value), 1),
          applyResult.value.restorePoint !== void 0 ? (openBlock(), createElementBlock("p", _hoisted_11, toDisplayString(applyResult.value.restorePoint ? "已核验最近的系统还原点，并逐项保存原值。" : "系统还原点不可用，本次使用逐项原值备份；未备份成功的项目不会执行。"), 1)) : createCommentVNode("", true),
          applyResult.value.error ? (openBlock(), createElementBlock("p", _hoisted_12, toDisplayString(applyResult.value.error), 1)) : createCommentVNode("", true),
          _cache[8] || (_cache[8] = createBaseVNode("p", null, "部分设置需重启后生效。服务仅调整启动方式，不强行停止运行中的服务。配置备份仅覆盖本次修改，不等同于整盘镜像。", -1)),
          createBaseVNode("ul", null, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(applyResult.value.items, (item, index) => {
              return openBlock(), createElementBlock("li", { key: index }, [
                createTextVNode(toDisplayString(resultLabels[item.status]) + " · " + toDisplayString(item.name), 1),
                item.detail ? (openBlock(), createElementBlock("span", _hoisted_13, "：" + toDisplayString(item.detail), 1)) : createCommentVNode("", true)
              ]);
            }), 128))
          ])
        ])) : createCommentVNode("", true),
        selfCheckWarning.value ? (openBlock(), createElementBlock("div", _hoisted_14, [
          _cache[10] || (_cache[10] = createBaseVNode("span", { class: "hc-selfcheck-icon" }, "⚠️", -1)),
          createBaseVNode("div", _hoisted_15, [
            createBaseVNode("div", _hoisted_16, toDisplayString(selfCheckWarning.value), 1),
            createBaseVNode("div", _hoisted_17, [
              createVNode(_component_router_link, {
                class: "hc-btn danger",
                to: "/backup-center?section=health-recovery"
              }, {
                default: withCtx(() => [..._cache[9] || (_cache[9] = [
                  createTextVNode("恢复体检优化原值", -1)
                ])]),
                _: 1
              }),
              createBaseVNode("button", {
                class: "hc-btn danger",
                onClick: goFpsRestore
              }, "去「极限帧率」恢复默认"),
              createBaseVNode("button", {
                class: "hc-btn",
                onClick: dismissSelfCheck
              }, "知道了")
            ])
          ])
        ])) : createCommentVNode("", true),
        busy.value ? (openBlock(), createElementBlock("div", _hoisted_18, [
          createBaseVNode("div", _hoisted_19, [
            createBaseVNode("div", {
              class: "hc-progress-fill",
              style: normalizeStyle({ width: progress.value + "%" })
            }, null, 4)
          ]),
          createBaseVNode("span", _hoisted_20, toDisplayString(progressPhaseText.value) + " " + toDisplayString(progress.value) + "%", 1)
        ])) : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_21, [
          createBaseVNode("div", _hoisted_22, [
            createBaseVNode("div", _hoisted_23, [
              (openBlock(), createElementBlock("svg", _hoisted_24, [
                _cache[11] || (_cache[11] = createBaseVNode("circle", {
                  cx: "60",
                  cy: "60",
                  r: "52",
                  class: "hc-ring-bg"
                }, null, -1)),
                createBaseVNode("circle", {
                  cx: "60",
                  cy: "60",
                  r: "52",
                  class: "hc-ring-fg",
                  style: normalizeStyle({ strokeDasharray: ringDash.value, stroke: levelColor.value })
                }, null, 4)
              ])),
              createBaseVNode("div", _hoisted_25, [
                scan.value?.score != null ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                  createBaseVNode("b", _hoisted_26, toDisplayString(scan.value.score), 1),
                  _cache[12] || (_cache[12] = createBaseVNode("span", { class: "hc-score-max" }, "/100", -1))
                ], 64)) : (openBlock(), createElementBlock("b", _hoisted_27, "—"))
              ])
            ]),
            createBaseVNode("div", _hoisted_28, [
              createBaseVNode("span", {
                class: "hc-level-badge",
                style: normalizeStyle({ color: levelColor.value, borderColor: levelColor.value })
              }, toDisplayString(levelText.value), 5),
              createBaseVNode("div", _hoisted_29, [
                _cache[13] || (_cache[13] = createTextVNode("符合目标 ", -1)),
                createBaseVNode("b", null, toDisplayString(scan.value?.atTarget ?? "…") + "/" + toDisplayString(scan.value?.total ?? "…"), 1),
                _cache[14] || (_cache[14] = createTextVNode(" 项", -1))
              ]),
              createBaseVNode("div", _hoisted_30, "已确认 " + toDisplayString(scan.value?.confirmed ?? "…") + "/" + toDisplayString(scan.value?.total ?? "…") + " · 待确认 " + toDisplayString(scan.value?.pending ?? "…") + " 项", 1),
              scan.value?.score == null ? (openBlock(), createElementBlock("div", _hoisted_31, "暂无法确认（存在未检测项）")) : createCommentVNode("", true)
            ])
          ]),
          createBaseVNode("div", _hoisted_32, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(hwMetrics.value, (m) => {
              return openBlock(), createElementBlock("div", {
                key: m.key,
                class: normalizeClass(["hc-hw-card", m.state])
              }, [
                createBaseVNode("div", _hoisted_33, toDisplayString(m.label), 1),
                createBaseVNode("div", _hoisted_34, toDisplayString(m.value), 1)
              ], 2);
            }), 128))
          ])
        ]),
        createBaseVNode("div", _hoisted_35, [
          createBaseVNode("div", _hoisted_36, [
            _cache[15] || (_cache[15] = createTextVNode("建议优化 ", -1)),
            scan.value?.suggestions?.length ? (openBlock(), createElementBlock("span", _hoisted_37, "(" + toDisplayString(scan.value.suggestions.length) + ")", 1)) : createCommentVNode("", true)
          ]),
          !scan.value ? (openBlock(), createElementBlock("div", _hoisted_38, "体检数据采集中…")) : !scan.value.suggestions.length ? (openBlock(), createElementBlock("div", _hoisted_39, "✓ 全部可确认项均符合目标")) : (openBlock(), createElementBlock("div", _hoisted_40, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(scan.value.suggestions, (s) => {
              return openBlock(), createElementBlock("div", {
                key: s.category + "::" + s.name,
                class: "hc-suggest-row",
                onClick: ($event) => go(s.page, s)
              }, [
                _cache[16] || (_cache[16] = createBaseVNode("span", { class: "hc-suggest-dot" }, null, -1)),
                createBaseVNode("span", _hoisted_42, toDisplayString(s.name), 1),
                createBaseVNode("span", _hoisted_43, toDisplayString(s.categoryName), 1),
                createBaseVNode("span", {
                  class: normalizeClass(["level-badge", "lv" + (s.level || 1)])
                }, "Lv" + toDisplayString(s.level || 1), 3),
                s.page ? (openBlock(), createElementBlock("span", _hoisted_44, "→")) : createCommentVNode("", true)
              ], 8, _hoisted_41);
            }), 128))
          ]))
        ]),
        createBaseVNode("div", _hoisted_45, [
          _cache[17] || (_cache[17] = createBaseVNode("div", { class: "hc-section-title" }, "优化清单", -1)),
          createBaseVNode("div", _hoisted_46, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(scan.value?.matrix || [], (g) => {
              return openBlock(), createElementBlock("div", {
                key: g.id,
                class: normalizeClass(["hc-tile", { clickable: !!g.page }]),
                onClick: ($event) => go(g.page)
              }, [
                createBaseVNode("div", _hoisted_48, toDisplayString(g.name), 1),
                createBaseVNode("div", _hoisted_49, toDisplayString(g.applied) + "/" + toDisplayString(g.total), 1),
                createBaseVNode("div", _hoisted_50, [
                  createBaseVNode("div", {
                    class: "hc-tile-fill",
                    style: normalizeStyle({ width: pct(g.applied, g.total) })
                  }, null, 4)
                ])
              ], 10, _hoisted_47);
            }), 128))
          ])
        ]),
        createVNode(KeywordConfirm, {
          visible: kwState.value,
          title: kwTitle.value,
          detail: kwDetail.value,
          consequences: kwConsequences.value,
          keyword: "确认应用",
          onConfirm: kwConfirm,
          onCancel: _cache[2] || (_cache[2] = ($event) => kwState.value = false)
        }, null, 8, ["visible", "title", "detail", "consequences"])
      ]);
    };
  }
});
const HealthCheck = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-441c900e"]]);
export {
  HealthCheck as default
};
