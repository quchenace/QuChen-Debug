import { t as defineComponent, a1 as onMounted, l as createElementBlock, p as createStaticVNode, r as createVNode, aF as withCtx, as as unref, i as createBaseVNode, aG as withDirectives, az as vModelSelect, q as createTextVNode, ak as toDisplayString, k as createCommentVNode, S as normalizeClass, F as Fragment, ab as renderList, b as Transition, a9 as ref, D as inject, a5 as openBlock, ay as vModelRadio, V as normalizeStyle, _ as _export_sfc } from "./main-DAqTdO6U.js";
import { l as _imports_0, m as clearAllTutorialRecords } from "./index-CL4m76NE.js";
import { S as SupportDiagnosticsPanel } from "./embeddedTools-CnGo9MNI.js";
import { E as EmbeddedSection } from "./EmbeddedSection-SxpWnTdG.js";
const _hoisted_1 = {
  "data-tour": "settings",
  class: "page"
};
const _hoisted_2 = { class: "section" };
const _hoisted_3 = { class: "section-row" };
const _hoisted_4 = { class: "section" };
const _hoisted_5 = { class: "section-row" };
const _hoisted_6 = { style: { "display": "flex", "align-items": "center", "gap": "8px" } };
const _hoisted_7 = ["value"];
const _hoisted_8 = { class: "section" };
const _hoisted_9 = { class: "section-row" };
const _hoisted_10 = { class: "section-info" };
const _hoisted_11 = { class: "section-hint" };
const _hoisted_12 = {
  key: 0,
  class: "auto-start-detail"
};
const _hoisted_13 = ["disabled"];
const _hoisted_14 = { class: "section" };
const _hoisted_15 = { class: "radio-group" };
const _hoisted_16 = ["value"];
const _hoisted_17 = { class: "radio-text" };
const _hoisted_18 = { class: "radio-label" };
const _hoisted_19 = { class: "radio-desc" };
const _hoisted_20 = { class: "section" };
const _hoisted_21 = { class: "theme-grid" };
const _hoisted_22 = ["data-id", "onClick"];
const _hoisted_23 = { class: "theme-meta" };
const _hoisted_24 = { class: "theme-name" };
const _hoisted_25 = {
  key: 0,
  class: "theme-check"
};
const _hoisted_26 = { class: "section" };
const _hoisted_27 = { class: "section-row" };
const _hoisted_28 = ["disabled"];
const _hoisted_29 = { class: "section" };
const _hoisted_30 = { class: "about-box" };
const _hoisted_31 = { class: "about-row" };
const _hoisted_32 = {
  key: 0,
  class: "toast"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Settings",
  setup(__props) {
    const locale = ref("zh-CN");
    const autoStart = ref(false);
    const autoStartStatus = ref({ task: false, lnk: false });
    const customAccent = ref("#38bdf8");
    const closeBehavior = ref("tray");
    const toast = ref("");
    const pageLoading = ref(true);
    const autoStartLoading = ref(false);
    const checkingUpdate = ref(false);
    const appVersion = ref("6.2.0");
    const theme = ref("cyber-blue");
    const setThemeFn = inject("setTheme");
    const themes = [
      {
        id: "cyber-blue",
        name: "赛博青蓝",
        accent: "#38bdf8",
        previewStyle: {
          background: "radial-gradient(circle at 30% 30%, #1e3a5f 0%, #050608 70%)"
        }
      },
      {
        id: "neon-purple",
        name: "霓虹紫",
        accent: "#a855f7",
        previewStyle: {
          background: "radial-gradient(circle at 30% 30%, #3a1a5f 0%, #0a0518 70%)"
        }
      },
      {
        id: "matrix-green",
        name: "矩阵绿",
        accent: "#22c55e",
        previewStyle: {
          background: "radial-gradient(circle at 30% 30%, #1a3a2a 0%, #03110a 70%)"
        }
      },
      {
        id: "amber-orange",
        name: "琥珀橙",
        accent: "#f59e0b",
        previewStyle: {
          background: "radial-gradient(circle at 30% 30%, #3a2a10 0%, #110805 70%)"
        }
      }
    ];
    function selectTheme(t) {
      theme.value = t;
      setThemeFn?.(t);
      try {
        window.sysApi?.saveSettings?.({ theme: t });
      } catch {
      }
      showToast("✓ 已切换深色主题: " + themes.find((x) => x.id === t)?.name);
    }
    async function checkUpdate() {
      if (!window.sysApi || checkingUpdate.value) return;
      checkingUpdate.value = true;
      try {
        await window.sysApi.checkForUpdates();
      } catch {
        showToast("⚠ 检查更新失败，请检查网络后重试");
      } finally {
        setTimeout(() => {
          checkingUpdate.value = false;
        }, 8e3);
      }
    }
    const closeOptions = [
      { value: "ask", label: "每次询问", desc: "关闭前弹出确认对话框" },
      { value: "tray", label: "最小化到托盘", desc: "隐藏窗口到系统托盘图标" },
      { value: "exit", label: "直接退出", desc: "立即关闭程序" }
    ];
    onMounted(async () => {
      try {
        const cfg = await window.platformApi?.getConfig?.();
        if (cfg?.appVersion) appVersion.value = cfg.appVersion;
      } catch {
      }
      if (!window.sysApi) {
        pageLoading.value = false;
        return;
      }
      try {
        const [settings, autoStartRes] = await Promise.all([
          window.sysApi.getSettings(),
          window.sysApi.getAutoStart()
        ]);
        if (settings) {
          const saved = settings.closeBehavior;
          if (saved === "ask" || saved === "tray" || saved === "quit" || saved === "exit") {
            closeBehavior.value = saved;
          } else {
            closeBehavior.value = "tray";
          }
        }
        if (autoStartRes) {
          autoStart.value = autoStartRes.enabled;
          autoStartStatus.value = { task: autoStartRes.task, lnk: autoStartRes.lnk };
        }
        try {
          const saved = localStorage.getItem("zzt-theme");
          if (saved) theme.value = saved;
          else {
            const t = settings?.theme;
            if (t && themes.some((x) => x.id === t)) {
              theme.value = t;
              setThemeFn?.(t);
            }
          }
        } catch {
        }
        try {
          const savedLocale = localStorage.getItem("zzt-locale");
          if (savedLocale) locale.value = savedLocale;
        } catch {
        }
        try {
          const savedAccent = localStorage.getItem("zzt-accent");
          if (savedAccent) {
            customAccent.value = savedAccent;
            applyAccent(savedAccent);
          }
        } catch {
        }
      } catch (e) {
        showToast("✗ 加载设置失败: " + (e?.message || "未知错误"));
      } finally {
        pageLoading.value = false;
      }
    });
    function applyAccent(hex) {
      document.documentElement.style.setProperty("--accent", hex);
      document.documentElement.style.setProperty("--accent-rgb", hexToRgb(hex));
      document.documentElement.style.setProperty("--accent-strong", hex);
    }
    function hexToRgb(hex) {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `${r}, ${g}, ${b}`;
    }
    function onLocaleChange() {
      try {
        localStorage.setItem("zzt-locale", locale.value);
      } catch {
      }
      window.dispatchEvent(new Event("zzt:locale-changed"));
      showToast("✓ 语言已切换，部分页面需要刷新后生效");
    }
    function onAccentChange(e) {
      const hex = e.target.value;
      customAccent.value = hex;
      applyAccent(hex);
      try {
        localStorage.setItem("zzt-accent", hex);
      } catch {
      }
    }
    function resetAccent() {
      customAccent.value = "#38bdf8";
      const st = document.documentElement.style;
      st.removeProperty("--accent");
      st.removeProperty("--accent-rgb");
      st.removeProperty("--accent-strong");
      try {
        localStorage.removeItem("zzt-accent");
      } catch {
      }
    }
    async function toggleAutoStart() {
      if (!window.sysApi?.setAutoStart) return;
      autoStartLoading.value = true;
      try {
        const target = !autoStart.value;
        const r = await window.sysApi.setAutoStart(target);
        if (r && r.success === false) {
          showToast("✗ 设置失败: " + (r.error || "未知错误"));
        } else {
          showToast(target ? "✓ 已开启开机自启动" : "✓ 已关闭开机自启动");
        }
        const s = await window.sysApi.getAutoStart?.();
        if (s) {
          autoStart.value = !!s.enabled;
          autoStartStatus.value = { task: !!s.task, lnk: !!s.lnk };
        }
      } catch (e) {
        showToast("✗ 设置失败: " + (e?.message || "未知错误"));
      } finally {
        autoStartLoading.value = false;
      }
    }
    async function saveCloseBehavior() {
      if (!window.sysApi?.saveSettings) return;
      try {
        await window.sysApi.saveSettings({ closeBehavior: closeBehavior.value });
        showToast("✓ 关闭行为已更新");
      } catch (e) {
        showToast("✗ 保存失败: " + (e?.message || "未知错误"));
      }
    }
    function showToast(msg) {
      toast.value = msg;
      setTimeout(() => {
        toast.value = "";
      }, 2e3);
    }
    function openGuide() {
      window.dispatchEvent(new Event("zzt:open-guide"));
    }
    function resetTutorials() {
      clearAllTutorialRecords();
      openGuide();
      showToast("✓ 所有教程引导已重置，下次进入功能页面时将重新显示。");
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        _cache[20] || (_cache[20] = createStaticVNode('<div class="page-header" data-v-7e62e854><div class="page-icon" data-v-7e62e854><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="1.5" data-v-7e62e854><circle cx="12" cy="12" r="3" data-v-7e62e854></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" data-v-7e62e854></path></svg></div><div data-v-7e62e854><h2 class="page-title" data-v-7e62e854>软件设置</h2><p class="page-desc" data-v-7e62e854>自定义QuChen调试的行为与外观</p></div></div>', 1)),
        createVNode(unref(EmbeddedSection), {
          id: "support",
          title: "故障报告",
          description: "在本地预览脱敏诊断信息，按需导出用于排查问题"
        }, {
          default: withCtx(() => [
            createVNode(unref(SupportDiagnosticsPanel), { mode: "report" })
          ]),
          _: 1
        }),
        createBaseVNode("section", _hoisted_2, [
          createBaseVNode("div", _hoisted_3, [
            _cache[3] || (_cache[3] = createBaseVNode("div", { class: "section-info" }, [
              createBaseVNode("span", { class: "section-label" }, "界面语言"),
              createBaseVNode("span", { class: "section-hint" }, "切换显示语言（更多语言持续添加）")
            ], -1)),
            withDirectives(createBaseVNode("select", {
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => locale.value = $event),
              onChange: onLocaleChange,
              class: "locale-select"
            }, [..._cache[2] || (_cache[2] = [
              createBaseVNode("option", { value: "zh-CN" }, "中文", -1),
              createBaseVNode("option", { value: "en" }, "English", -1)
            ])], 544), [
              [vModelSelect, locale.value]
            ])
          ])
        ]),
        createBaseVNode("section", _hoisted_4, [
          createBaseVNode("div", _hoisted_5, [
            _cache[4] || (_cache[4] = createBaseVNode("div", { class: "section-info" }, [
              createBaseVNode("span", { class: "section-label" }, "自定义主题色"),
              createBaseVNode("span", { class: "section-hint" }, "选择你喜欢的强调色，立即生效")
            ], -1)),
            createBaseVNode("div", _hoisted_6, [
              createBaseVNode("input", {
                type: "color",
                value: customAccent.value,
                onInput: onAccentChange,
                class: "color-picker"
              }, null, 40, _hoisted_7),
              createBaseVNode("button", {
                class: "chip-mini",
                onClick: resetAccent,
                style: { "padding": "4px 10px", "border": "1px solid rgba(148,163,184,0.15)", "border-radius": "6px", "font-size": "10px", "cursor": "pointer", "background": "transparent", "color": "rgba(226,232,240,0.4)" }
              }, "重置")
            ])
          ])
        ]),
        createBaseVNode("section", _hoisted_8, [
          createBaseVNode("div", _hoisted_9, [
            createBaseVNode("div", _hoisted_10, [
              _cache[6] || (_cache[6] = createBaseVNode("span", { class: "section-label" }, "开机自启动", -1)),
              createBaseVNode("span", _hoisted_11, [
                _cache[5] || (_cache[5] = createTextVNode(" 系统启动时自动运行QuChen调试 ", -1)),
                autoStart.value ? (openBlock(), createElementBlock("span", _hoisted_12, " · 计划任务" + toDisplayString(autoStartStatus.value.task ? "✓" : "✗") + " · 启动目录" + toDisplayString(autoStartStatus.value.lnk ? "✓" : "✗"), 1)) : createCommentVNode("", true)
              ])
            ]),
            createBaseVNode("button", {
              class: normalizeClass(["toggle", { on: autoStart.value }]),
              onClick: toggleAutoStart,
              disabled: autoStartLoading.value
            }, [..._cache[7] || (_cache[7] = [
              createBaseVNode("div", { class: "toggle-knob" }, null, -1)
            ])], 10, _hoisted_13)
          ])
        ]),
        createBaseVNode("section", _hoisted_14, [
          _cache[9] || (_cache[9] = createBaseVNode("h3", { class: "section-title" }, "点击关闭按钮时", -1)),
          createBaseVNode("div", _hoisted_15, [
            (openBlock(), createElementBlock(Fragment, null, renderList(closeOptions, (opt) => {
              return createBaseVNode("label", {
                class: "radio-item",
                key: opt.value
              }, [
                withDirectives(createBaseVNode("input", {
                  type: "radio",
                  "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => closeBehavior.value = $event),
                  value: opt.value,
                  onChange: saveCloseBehavior
                }, null, 40, _hoisted_16), [
                  [vModelRadio, closeBehavior.value]
                ]),
                _cache[8] || (_cache[8] = createBaseVNode("span", { class: "radio-mark" }, null, -1)),
                createBaseVNode("div", _hoisted_17, [
                  createBaseVNode("span", _hoisted_18, toDisplayString(opt.label), 1),
                  createBaseVNode("span", _hoisted_19, toDisplayString(opt.desc), 1)
                ])
              ]);
            }), 64))
          ])
        ]),
        createBaseVNode("section", _hoisted_20, [
          _cache[11] || (_cache[11] = createBaseVNode("h3", { class: "section-title" }, "主题颜色", -1)),
          _cache[12] || (_cache[12] = createBaseVNode("p", {
            class: "section-hint",
            style: { "margin-bottom": "14px" }
          }, "选择一个主题来改变界面与背景色调。立即生效，无需重启。", -1)),
          createBaseVNode("div", _hoisted_21, [
            (openBlock(), createElementBlock(Fragment, null, renderList(themes, (t) => {
              return createBaseVNode("label", {
                key: t.id,
                class: normalizeClass(["theme-card", { active: theme.value === t.id, [t.id]: true }]),
                "data-id": t.id,
                onClick: ($event) => selectTheme(t.id)
              }, [
                createBaseVNode("div", {
                  class: "theme-preview",
                  style: normalizeStyle(t.previewStyle)
                }, [..._cache[10] || (_cache[10] = [
                  createBaseVNode("div", { class: "tp-bar" }, null, -1),
                  createBaseVNode("div", { class: "tp-dot" }, null, -1)
                ])], 4),
                createBaseVNode("div", _hoisted_23, [
                  createBaseVNode("span", _hoisted_24, toDisplayString(t.name), 1),
                  createBaseVNode("span", {
                    class: "theme-swatch",
                    style: normalizeStyle({ background: t.accent })
                  }, null, 4)
                ]),
                theme.value === t.id ? (openBlock(), createElementBlock("span", _hoisted_25, "✓")) : createCommentVNode("", true)
              ], 10, _hoisted_22);
            }), 64))
          ])
        ]),
        createBaseVNode("section", { class: "section" }, [
          createBaseVNode("div", { class: "section-row" }, [
            _cache[13] || (_cache[13] = createBaseVNode("div", { class: "section-info" }, [
              createBaseVNode("span", { class: "section-label" }, "功能引导"),
              createBaseVNode("span", { class: "section-hint" }, "查看新手入门，或重置首次使用记录，重新显示各功能的操作提示。")
            ], -1)),
            createBaseVNode("div", { style: { "display": "flex", "gap": "8px", "flex-wrap": "wrap" } }, [
              createBaseVNode("button", {
                class: "restart-btn",
                onClick: openGuide
              }, "新手入门"),
              createBaseVNode("button", {
                class: "restart-btn",
                onClick: resetTutorials
              }, "重置教程提示")
            ])
          ])
        ]),
        _cache[21] || (_cache[21] = createBaseVNode("section", { class: "section" }, [
          createBaseVNode("h3", { class: "section-title" }, "论坛社区平台"),
          createBaseVNode("p", {
            class: "section-hint",
            style: { "margin-bottom": "14px" }
          }, " 云端平台已集成，平台在云端更新，无需升级本软件。 ")
        ], -1)),
        createBaseVNode("section", _hoisted_26, [
          createBaseVNode("div", _hoisted_27, [
            _cache[14] || (_cache[14] = createBaseVNode("div", { class: "section-info" }, [
              createBaseVNode("span", { class: "section-label" }, "软件更新"),
              createBaseVNode("span", { class: "section-hint" }, "检查新版本（启动时也会自动检查一次），有新版本会提示前往官网下载")
            ], -1)),
            createBaseVNode("button", {
              class: "restart-btn",
              onClick: checkUpdate,
              disabled: checkingUpdate.value
            }, toDisplayString(checkingUpdate.value ? "正在检查…" : "检查更新"), 9, _hoisted_28)
          ])
        ]),
        createBaseVNode("section", _hoisted_29, [
          _cache[18] || (_cache[18] = createBaseVNode("h3", { class: "section-title" }, "关于", -1)),
          createBaseVNode("div", _hoisted_30, [
            _cache[16] || (_cache[16] = createBaseVNode("div", { class: "about-row" }, [
              createBaseVNode("span", null, "软件名称"),
              createBaseVNode("span", null, "QuChen调试 QuChen Debugger")
            ], -1)),
            createBaseVNode("div", _hoisted_31, [
              _cache[15] || (_cache[15] = createBaseVNode("span", null, "版本", -1)),
              createBaseVNode("span", null, "v" + toDisplayString(appVersion.value), 1)
            ]),
            _cache[17] || (_cache[17] = createBaseVNode("div", { class: "about-row" }, [
              createBaseVNode("span", null, "官网"),
              createBaseVNode("span", null, "zztsos.com")
            ], -1))
          ]),
          _cache[19] || (_cache[19] = createBaseVNode("div", { class: "qrcode-box" }, [
            createBaseVNode("img", {
              src: _imports_0,
              alt: "公众号",
              class: "qrcode-img"
            }),
            createBaseVNode("span", { class: "qrcode-label" }, "关注公众号 · 获取最新资讯")
          ], -1))
        ]),
        createVNode(Transition, { name: "toast" }, {
          default: withCtx(() => [
            toast.value ? (openBlock(), createElementBlock("div", _hoisted_32, toDisplayString(toast.value), 1)) : createCommentVNode("", true)
          ]),
          _: 1
        })
      ]);
    };
  }
});
const Settings = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7e62e854"]]);
export {
  Settings as default
};
