import { t as defineComponent, av as useRouter, aD as watch, a1 as onMounted, Y as onBeforeUnmount, a5 as openBlock, l as createElementBlock, i as createBaseVNode, F as Fragment, ab as renderList, S as normalizeClass, ak as toDisplayString, q as createTextVNode, aG as withDirectives, az as vModelSelect, aA as vModelText, aH as withKeys, k as createCommentVNode, as as unref, a9 as ref, g as computed, _ as _export_sfc, a3 as onUnmounted, r as createVNode, V as normalizeStyle, aI as withModifiers, au as useRoute } from "./main-DAqTdO6U.js";
/* empty css                     */
import { w as toolKey, t as matchesTool, v as selectTools } from "./index-CL4m76NE.js";
const _hoisted_1$3 = {
  class: "input-tool software-panel",
  "aria-labelledby": "software-title"
};
const _hoisted_2$3 = {
  class: "tool-actions",
  "aria-label": "应用管理分类"
};
const _hoisted_3$2 = ["aria-pressed", "disabled", "onClick"];
const _hoisted_4$2 = {
  key: 0,
  class: "tool-fields software-fields"
};
const _hoisted_5$2 = ["disabled"];
const _hoisted_6$2 = { key: 0 };
const _hoisted_7$2 = ["disabled"];
const _hoisted_8$2 = { class: "tool-actions" };
const _hoisted_9$2 = ["disabled"];
const _hoisted_10$2 = ["disabled"];
const _hoisted_11$2 = {
  class: "tool-status",
  role: "status"
};
const _hoisted_12$2 = {
  key: 1,
  class: "tool-error",
  role: "alert"
};
const _hoisted_13$2 = {
  key: 2,
  class: "software-progress",
  role: "status"
};
const _hoisted_14$2 = {
  key: 0,
  class: "tool-error"
};
const _hoisted_15$2 = { key: 3 };
const _hoisted_16$2 = {
  key: 0,
  class: "tool-error"
};
const _hoisted_17$2 = { class: "tool-fields software-fields" };
const _hoisted_18$2 = ["data-software-id"];
const _hoisted_19$2 = { class: "software-copy" };
const _hoisted_20$2 = { key: 0 };
const _hoisted_21$2 = { key: 1 };
const _hoisted_22$2 = { key: 0 };
const _hoisted_23$2 = { key: 1 };
const _hoisted_24$2 = {
  key: 2,
  class: "software-path"
};
const _hoisted_25$2 = { key: 3 };
const _hoisted_26$2 = {
  key: 4,
  class: "tool-error"
};
const _hoisted_27$2 = { class: "software-row-actions" };
const _hoisted_28$2 = ["disabled", "onClick"];
const _hoisted_29$2 = ["disabled", "onClick"];
const _hoisted_30$2 = { key: 1 };
const _hoisted_31$2 = {
  key: 2,
  class: "tool-actions"
};
const _hoisted_32$2 = ["disabled"];
const _hoisted_33$2 = ["disabled"];
const _hoisted_34$2 = { class: "tool-actions software-links" };
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "SoftwareManagementPanel",
  setup(__props) {
    const router = useRouter(), kind = ref("win32"), source = ref("winget"), query = ref(""), filter = ref(""), scope = ref("all"), page = ref(1), loading = ref(false), invoking = ref(false), error = ref(""), feedback = ref(""), report = ref(null), now = ref(Date.now());
    const status = ref({ busy: false, phase: "idle", message: "", startedAt: 0 });
    const tabs = [{ id: "win32", name: "桌面应用" }, { id: "appx", name: "AppX 应用" }, { id: "upgrades", name: "WinGet 更新" }, { id: "search", name: "搜索安装" }];
    const isPackage = computed(() => kind.value === "upgrades" || kind.value === "search"), blocked = computed(() => loading.value || invoking.value || status.value.busy), elapsed = computed(() => Math.max(0, Math.floor((now.value - status.value.startedAt) / 1e3)));
    const filtered = computed(() => (report.value?.items || []).filter((item) => (scope.value === "all" || item.scope === scope.value) && [item.name, item.version, item.publisher, item.packageId, item.location].join(" ").toLowerCase().includes(filter.value.trim().toLowerCase())));
    const pages = computed(() => Math.max(1, Math.ceil(filtered.value.length / 20))), visible = computed(() => filtered.value.slice((page.value - 1) * 20, page.value * 20));
    let disposed = false, unsubscribe, timer;
    watch([kind, source], () => {
      report.value = null;
      filter.value = "";
      scope.value = "all";
      error.value = "";
      feedback.value = "";
      page.value = 1;
    });
    watch([filter, scope], () => {
      page.value = 1;
    });
    function formatSize(bytes) {
      return bytes >= 1024 ** 3 ? `${(bytes / 1024 ** 3).toFixed(2)} GB` : `${(bytes / 1024 ** 2).toFixed(1)} MB`;
    }
    function receive(value) {
      if (disposed) return;
      status.value = value;
      now.value = Date.now();
      if (value.result?.report) {
        const r = value.result.report;
        if (kind.value !== r.kind) kind.value = r.kind;
        if (r.source) source.value = r.source;
        if (r.query !== void 0) query.value = r.query;
        queueMicrotask(() => {
          if (!disposed) {
            report.value = r;
            page.value = 1;
          }
        });
      }
    }
    async function scan() {
      if (blocked.value) return;
      loading.value = true;
      error.value = "";
      feedback.value = "";
      report.value = null;
      try {
        const r = await window.toolboxApi.querySoftware(kind.value, source.value, query.value);
        if (disposed) return;
        if (!r.success || !r.report) throw Error(r.error || "读取失败");
        report.value = r.report;
        page.value = 1;
      } catch (e) {
        if (!disposed) error.value = e.message;
      } finally {
        loading.value = false;
      }
    }
    async function act(item) {
      if (blocked.value) return;
      invoking.value = true;
      error.value = "";
      feedback.value = "";
      try {
        const r = await window.toolboxApi.actOnSoftware(item.kind === "win32" || item.kind === "appx" ? "uninstall" : item.kind === "upgrades" ? "upgrade" : "install", item.id);
        if (disposed) return;
        if (!r.success && !r.cancelled) error.value = r.message;
        else feedback.value = r.message;
        receive(await window.toolboxApi.softwareStatus());
      } catch (e) {
        if (!disposed) error.value = e.message;
      } finally {
        invoking.value = false;
      }
    }
    async function copy() {
      try {
        await navigator.clipboard.writeText(JSON.stringify(report.value, null, 2));
        feedback.value = "清单已复制";
      } catch {
        feedback.value = "复制失败，请重试";
      }
    }
    async function openLocation(id) {
      try {
        const r = await window.toolboxApi.openSoftwareLocation(id);
        if (!r.success) throw Error(r.error || "打开位置失败");
      } catch (e) {
        error.value = e.message;
      }
    }
    async function openSystem(id) {
      try {
        const r = await window.toolboxApi.openSoftwareSystem(id);
        if (!r.success) throw Error(r.error || "无法打开系统入口");
      } catch (e) {
        error.value = e.message;
      }
    }
    onMounted(async () => {
      unsubscribe = window.toolboxApi?.onSoftwareProgress?.(receive);
      timer = setInterval(() => {
        if (status.value.busy) now.value = Date.now();
      }, 1e3);
      try {
        const current = await window.toolboxApi?.softwareStatus?.();
        if (current) receive(current);
      } catch (e) {
        if (!disposed) error.value = e.message;
      }
    });
    onBeforeUnmount(() => {
      disposed = true;
      unsubscribe?.();
      if (timer) clearInterval(timer);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("section", _hoisted_1$3, [
        _cache[16] || (_cache[16] = createBaseVNode("div", { class: "tool-heading" }, [
          createBaseVNode("div", null, [
            createBaseVNode("h3", { id: "software-title" }, "应用管理"),
            createBaseVNode("p", null, "按需读取应用、AppX 和 WinGet 软件包。操作前会显示具体项目与范围。")
          ]),
          createBaseVNode("span", { class: "tool-badge" }, "逐项操作 · 结果复查")
        ], -1)),
        createBaseVNode("div", _hoisted_2$3, [
          (openBlock(), createElementBlock(Fragment, null, renderList(tabs, (tab) => {
            return createBaseVNode("button", {
              key: tab.id,
              class: normalizeClass({ primary: kind.value === tab.id }),
              "aria-pressed": kind.value === tab.id,
              disabled: blocked.value,
              onClick: ($event) => kind.value = tab.id
            }, toDisplayString(tab.name), 11, _hoisted_3$2);
          }), 64))
        ]),
        isPackage.value ? (openBlock(), createElementBlock("div", _hoisted_4$2, [
          createBaseVNode("label", null, [
            _cache[11] || (_cache[11] = createTextVNode("软件源", -1)),
            withDirectives(createBaseVNode("select", {
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => source.value = $event),
              disabled: blocked.value,
              "aria-label": "软件源"
            }, [..._cache[10] || (_cache[10] = [
              createBaseVNode("option", { value: "winget" }, "WinGet 社区源", -1),
              createBaseVNode("option", { value: "msstore" }, "Microsoft Store", -1)
            ])], 8, _hoisted_5$2), [
              [vModelSelect, source.value]
            ])
          ]),
          kind.value === "search" ? (openBlock(), createElementBlock("label", _hoisted_6$2, [
            _cache[12] || (_cache[12] = createTextVNode("搜索安装", -1)),
            withDirectives(createBaseVNode("input", {
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => query.value = $event),
              disabled: blocked.value,
              "aria-label": "搜索软件包",
              placeholder: "例如 7zip、PowerToys",
              onKeydown: withKeys(scan, ["enter"])
            }, null, 40, _hoisted_7$2), [
              [vModelText, query.value]
            ])
          ])) : createCommentVNode("", true)
        ])) : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_8$2, [
          createBaseVNode("button", {
            class: "primary",
            disabled: blocked.value || kind.value === "search" && query.value.trim().length < 2,
            onClick: scan
          }, toDisplayString(loading.value ? "正在读取应用…" : kind.value === "search" ? "搜索软件包" : "读取应用列表"), 9, _hoisted_9$2),
          createBaseVNode("button", {
            disabled: !report.value || blocked.value,
            onClick: copy
          }, "复制应用清单", 8, _hoisted_10$2),
          createBaseVNode("span", _hoisted_11$2, toDisplayString(feedback.value), 1)
        ]),
        error.value ? (openBlock(), createElementBlock("p", _hoisted_12$2, toDisplayString(error.value), 1)) : createCommentVNode("", true),
        status.value.busy || status.value.result ? (openBlock(), createElementBlock("div", _hoisted_13$2, [
          createBaseVNode("strong", null, toDisplayString(status.value.busy ? "正在执行 · 已用 " + elapsed.value + " 秒" : "上次操作结果"), 1),
          createBaseVNode("p", null, toDisplayString(status.value.message), 1),
          status.value.result?.restartRequired ? (openBlock(), createElementBlock("p", _hoisted_14$2, "需要保存工作后手动重启，再读取列表确认。")) : createCommentVNode("", true)
        ])) : createCommentVNode("", true),
        !report.value && !loading.value ? (openBlock(), createElementBlock("p", _hoisted_15$2, "尚未读取。桌面应用来自卸载注册信息，AppX 仅查看当前用户；WinGet 查询需要联网。")) : createCommentVNode("", true),
        report.value ? (openBlock(), createElementBlock(Fragment, { key: 4 }, [
          createBaseVNode("p", null, "读取于 " + toDisplayString(new Date(report.value.checkedAt).toLocaleString()) + " · " + toDisplayString(report.value.items.length) + " 项", 1),
          report.value.partial ? (openBlock(), createElementBlock("p", _hoisted_16$2, "本次列表存在未知或未完整读取的项目，不能据此判断全部应用状态。")) : createCommentVNode("", true),
          (openBlock(true), createElementBlock(Fragment, null, renderList(report.value.notes, (note) => {
            return openBlock(), createElementBlock("p", {
              key: note,
              class: "tool-note"
            }, toDisplayString(note), 1);
          }), 128)),
          createBaseVNode("div", _hoisted_17$2, [
            createBaseVNode("label", null, [
              _cache[13] || (_cache[13] = createTextVNode("筛选已读取项目", -1)),
              withDirectives(createBaseVNode("input", {
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => filter.value = $event),
                type: "search",
                "aria-label": "筛选应用列表",
                placeholder: "名称、发布者、版本或包 ID"
              }, null, 512), [
                [vModelText, filter.value]
              ])
            ]),
            createBaseVNode("label", null, [
              _cache[15] || (_cache[15] = createTextVNode("安装范围", -1)),
              withDirectives(createBaseVNode("select", {
                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => scope.value = $event),
                "aria-label": "应用范围"
              }, [..._cache[14] || (_cache[14] = [
                createBaseVNode("option", { value: "all" }, "全部范围", -1),
                createBaseVNode("option", { value: "当前用户" }, "当前用户", -1),
                createBaseVNode("option", { value: "所有用户" }, "所有用户", -1)
              ])], 512), [
                [vModelSelect, scope.value]
              ])
            ])
          ]),
          createBaseVNode("p", null, "匹配 " + toDisplayString(filtered.value.length) + " 项 · 第 " + toDisplayString(page.value) + " / " + toDisplayString(pages.value) + " 页", 1),
          (openBlock(true), createElementBlock(Fragment, null, renderList(visible.value, (item) => {
            return openBlock(), createElementBlock("article", {
              key: item.id,
              class: "software-row",
              "data-software-id": item.id
            }, [
              createBaseVNode("div", _hoisted_19$2, [
                createBaseVNode("strong", null, toDisplayString(item.name), 1),
                createBaseVNode("p", null, [
                  createTextVNode(toDisplayString(item.version || "版本未知"), 1),
                  item.availableVersion ? (openBlock(), createElementBlock("span", _hoisted_20$2, " → " + toDisplayString(item.availableVersion), 1)) : createCommentVNode("", true),
                  createTextVNode(" · " + toDisplayString(item.scope), 1),
                  item.architecture ? (openBlock(), createElementBlock("span", _hoisted_21$2, " · " + toDisplayString(item.architecture), 1)) : createCommentVNode("", true)
                ]),
                item.publisher ? (openBlock(), createElementBlock("p", _hoisted_22$2, toDisplayString(item.publisher), 1)) : createCommentVNode("", true),
                item.packageId ? (openBlock(), createElementBlock("p", _hoisted_23$2, toDisplayString(item.packageId) + " · " + toDisplayString(item.source), 1)) : createCommentVNode("", true),
                item.location ? (openBlock(), createElementBlock("p", _hoisted_24$2, toDisplayString(item.location), 1)) : createCommentVNode("", true),
                item.sizeBytes !== null ? (openBlock(), createElementBlock("p", _hoisted_25$2, "注册大小 " + toDisplayString(formatSize(item.sizeBytes)) + "（可能不等于当前磁盘占用）", 1)) : createCommentVNode("", true),
                !item.actionable ? (openBlock(), createElementBlock("p", _hoisted_26$2, toDisplayString(item.reason), 1)) : createCommentVNode("", true)
              ]),
              createBaseVNode("div", _hoisted_27$2, [
                item.location ? (openBlock(), createElementBlock("button", {
                  key: 0,
                  disabled: blocked.value,
                  onClick: ($event) => openLocation(item.id)
                }, "打开位置", 8, _hoisted_28$2)) : createCommentVNode("", true),
                createBaseVNode("button", {
                  disabled: blocked.value || !item.actionable,
                  onClick: ($event) => act(item)
                }, toDisplayString(item.kind === "win32" || item.kind === "appx" ? "卸载" : item.kind === "upgrades" ? "更新" : "安装"), 9, _hoisted_29$2)
              ])
            ], 8, _hoisted_18$2);
          }), 128)),
          !filtered.value.length ? (openBlock(), createElementBlock("p", _hoisted_30$2, "本次查询或筛选没有匹配项。")) : createCommentVNode("", true),
          pages.value > 1 ? (openBlock(), createElementBlock("div", _hoisted_31$2, [
            createBaseVNode("button", {
              disabled: page.value === 1,
              onClick: _cache[4] || (_cache[4] = ($event) => page.value--)
            }, "上一页", 8, _hoisted_32$2),
            createBaseVNode("span", null, toDisplayString(page.value) + " / " + toDisplayString(pages.value), 1),
            createBaseVNode("button", {
              disabled: page.value === pages.value,
              onClick: _cache[5] || (_cache[5] = ($event) => page.value++)
            }, "下一页", 8, _hoisted_33$2)
          ])) : createCommentVNode("", true)
        ], 64)) : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_34$2, [
          createBaseVNode("button", {
            onClick: _cache[6] || (_cache[6] = ($event) => openSystem("settings"))
          }, "Windows 应用设置"),
          createBaseVNode("button", {
            onClick: _cache[7] || (_cache[7] = ($event) => openSystem("store"))
          }, "Microsoft Store"),
          isPackage.value ? (openBlock(), createElementBlock("button", {
            key: 0,
            onClick: _cache[8] || (_cache[8] = ($event) => openSystem("winget"))
          }, "获取 WinGet 应用安装程序")) : createCommentVNode("", true),
          createBaseVNode("button", {
            onClick: _cache[9] || (_cache[9] = ($event) => unref(router).push("/startup-manager"))
          }, "管理启动项")
        ]),
        _cache[17] || (_cache[17] = createBaseVNode("p", { class: "tool-note" }, "注册信息未提供的大小、版本或发布者保持未知。WinGet 更新不会强制处理未知版本或被锁定的包；框架和系统关键 AppX 不提供直接卸载。", -1))
      ]);
    };
  }
});
const SoftwareManagementPanel = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-96754274"]]);
const _hoisted_1$2 = { class: "obs-panel" };
const _hoisted_2$2 = { class: "obs-heading" };
const _hoisted_3$1 = ["disabled"];
const _hoisted_4$1 = { class: "obs-box" };
const _hoisted_5$1 = { class: "obs-row" };
const _hoisted_6$1 = { class: "badge" };
const _hoisted_7$1 = { class: "path" };
const _hoisted_8$1 = { class: "obs-row" };
const _hoisted_9$1 = ["disabled"];
const _hoisted_10$1 = { class: "hint" };
const _hoisted_11$1 = { class: "obs-box" };
const _hoisted_12$1 = { class: "obs-row" };
const _hoisted_13$1 = { class: "badge" };
const _hoisted_14$1 = { class: "hint" };
const _hoisted_15$1 = { class: "obs-row" };
const _hoisted_16$1 = ["disabled"];
const _hoisted_17$1 = ["disabled"];
const _hoisted_18$1 = ["disabled"];
const _hoisted_19$1 = ["disabled"];
const _hoisted_20$1 = {
  key: 0,
  class: "path"
};
const _hoisted_21$1 = {
  key: 1,
  class: "lut-grid"
};
const _hoisted_22$1 = { class: "obs-box" };
const _hoisted_23$1 = { class: "obs-form" };
const _hoisted_24$1 = ["disabled"];
const _hoisted_25$1 = ["value"];
const _hoisted_26$1 = ["disabled"];
const _hoisted_27$1 = ["disabled"];
const _hoisted_28$1 = ["disabled"];
const _hoisted_29$1 = { class: "path" };
const _hoisted_30$1 = { class: "obs-row" };
const _hoisted_31$1 = ["disabled"];
const _hoisted_32$1 = ["disabled"];
const _hoisted_33$1 = ["disabled"];
const _hoisted_34$1 = {
  key: 0,
  class: "lut-grid"
};
const _hoisted_35$1 = ["disabled", "onClick"];
const _hoisted_36$1 = {
  key: 1,
  class: "hint"
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ObsLivePanel",
  setup(__props) {
    const api = window.obsApi;
    const state = ref(null);
    const busy = ref(false), failed = ref(false), feedback = ref("");
    const preset = ref(""), name = ref("我的直播滤镜");
    async function perform(action) {
      if (busy.value) return;
      busy.value = true;
      feedback.value = "";
      failed.value = false;
      try {
        const result = await action();
        if (!result.success) throw Error(result.error || "操作失败");
        if (result.status) state.value = result.status;
        if (!result.canceled) feedback.value = result.message || "";
      } catch (e) {
        failed.value = true;
        feedback.value = e instanceof Error ? e.message : String(e);
      } finally {
        busy.value = false;
      }
    }
    onMounted(() => perform(() => api.status()));
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("section", _hoisted_1$2, [
        createBaseVNode("div", _hoisted_2$2, [
          _cache[13] || (_cache[13] = createBaseVNode("div", null, [
            createBaseVNode("h3", null, "OBS 直播与 LUT 滤镜"),
            createBaseVNode("p", null, "检测直播环境 · 安装调色预设 · ICC 转 CUBE")
          ], -1)),
          createBaseVNode("button", {
            disabled: busy.value,
            onClick: _cache[0] || (_cache[0] = ($event) => perform(() => unref(api).status()))
          }, toDisplayString(busy.value ? "处理中…" : "刷新环境"), 9, _hoisted_3$1)
        ]),
        feedback.value ? (openBlock(), createElementBlock("p", {
          key: 0,
          class: normalizeClass(["obs-feedback", { error: failed.value }]),
          role: "status"
        }, toDisplayString(feedback.value), 3)) : createCommentVNode("", true),
        state.value ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          createBaseVNode("div", _hoisted_4$1, [
            createBaseVNode("div", _hoisted_5$1, [
              _cache[14] || (_cache[14] = createBaseVNode("strong", null, "OBS Studio", -1)),
              createBaseVNode("span", _hoisted_6$1, toDisplayString(state.value.root ? state.value.version || "版本未知" : "未检测到"), 1),
              createBaseVNode("span", {
                class: normalizeClass(["badge", { warning: state.value.running }])
              }, toDisplayString(state.value.running ? "正在运行，请退出后修改滤镜" : "未运行"), 3)
            ]),
            createBaseVNode("p", _hoisted_7$1, toDisplayString(state.value.root || "选择 OBS 安装文件夹，或为其他直播软件指定自定义 LUT 保存位置。"), 1),
            createBaseVNode("div", _hoisted_8$1, [
              createBaseVNode("button", {
                disabled: busy.value,
                onClick: _cache[1] || (_cache[1] = ($event) => perform(() => unref(api).pickRoot()))
              }, "选择 OBS 目录", 8, _hoisted_9$1),
              createBaseVNode("span", _hoisted_10$1, toDisplayString(state.value.root ? `检测来源：${state.value.source} · 内置虚拟摄像头组件：${state.value.virtualCamera ? "已检测到" : "未检测到"}` : ""), 1)
            ])
          ]),
          createBaseVNode("div", _hoisted_11$1, [
            createBaseVNode("div", _hoisted_12$1, [
              _cache[15] || (_cache[15] = createBaseVNode("strong", null, "曲线预设包", -1)),
              createBaseVNode("span", _hoisted_13$1, toDisplayString(state.value.presets.length) + " 组预设", 1),
              createBaseVNode("span", _hoisted_14$1, "已安装 " + toDisplayString(state.value.packageItems.filter((f) => f.managed).length) + " 个", 1)
            ]),
            _cache[16] || (_cache[16] = createBaseVNode("p", { class: "hint" }, "使用内置 ICC 曲线生成调色 LUT，也可导入已有 CUBE / PNG 滤镜文件夹。", -1)),
            createBaseVNode("div", _hoisted_15$1, [
              createBaseVNode("button", {
                disabled: busy.value || !state.value.root || state.value.running,
                class: "primary",
                onClick: _cache[2] || (_cache[2] = ($event) => perform(() => unref(api).installPack("builtin")))
              }, "安装曲线预设包", 8, _hoisted_16$1),
              createBaseVNode("button", {
                disabled: busy.value || !state.value.root || state.value.running,
                onClick: _cache[3] || (_cache[3] = ($event) => perform(() => unref(api).installPack("folder")))
              }, "导入本地 LUT 包", 8, _hoisted_17$1),
              createBaseVNode("button", {
                disabled: busy.value || !state.value.root,
                onClick: _cache[4] || (_cache[4] = ($event) => perform(() => unref(api).openFolder("package")))
              }, "打开目录", 8, _hoisted_18$1),
              createBaseVNode("button", {
                disabled: busy.value || state.value.running || !state.value.packageItems.some((f) => f.managed),
                onClick: _cache[5] || (_cache[5] = ($event) => perform(() => unref(api).removePack()))
              }, "移除并恢复", 8, _hoisted_19$1)
            ]),
            state.value.packageDir ? (openBlock(), createElementBlock("p", _hoisted_20$1, toDisplayString(state.value.packageDir), 1)) : createCommentVNode("", true),
            state.value.packageItems.length ? (openBlock(), createElementBlock("div", _hoisted_21$1, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(state.value.packageItems, (item) => {
                return openBlock(), createElementBlock("div", {
                  key: item.name,
                  class: "lut-item"
                }, [
                  createBaseVNode("span", null, toDisplayString(item.name), 1),
                  createBaseVNode("small", null, toDisplayString(item.managed ? "本工具安装" : "原有文件"), 1)
                ]);
              }), 128))
            ])) : createCommentVNode("", true)
          ]),
          createBaseVNode("div", _hoisted_22$1, [
            _cache[20] || (_cache[20] = createBaseVNode("strong", null, "自定义滤镜", -1)),
            _cache[21] || (_cache[21] = createBaseVNode("p", { class: "hint" }, "选择原版曲线预设，或从本地 ICC 的 vcgt / RGB TRC 曲线生成 CUBE。转换不包含显卡数字鲜艳度、完整色彩空间变换和 HDR 映射。", -1)),
            createBaseVNode("div", _hoisted_23$1, [
              createBaseVNode("label", null, [
                _cache[18] || (_cache[18] = createTextVNode("颜色来源", -1)),
                withDirectives(createBaseVNode("select", {
                  "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => preset.value = $event),
                  disabled: busy.value
                }, [
                  _cache[17] || (_cache[17] = createBaseVNode("option", { value: "" }, "选择本地 ICC 文件…", -1)),
                  (openBlock(true), createElementBlock(Fragment, null, renderList(state.value.presets, (name2) => {
                    return openBlock(), createElementBlock("option", {
                      key: name2,
                      value: name2
                    }, toDisplayString(name2), 9, _hoisted_25$1);
                  }), 128))
                ], 8, _hoisted_24$1), [
                  [vModelSelect, preset.value]
                ])
              ]),
              createBaseVNode("label", null, [
                _cache[19] || (_cache[19] = createTextVNode("滤镜名称", -1)),
                withDirectives(createBaseVNode("input", {
                  "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => name.value = $event),
                  maxlength: "90",
                  placeholder: "我的直播滤镜",
                  disabled: busy.value
                }, null, 8, _hoisted_26$1), [
                  [vModelText, name.value]
                ])
              ]),
              createBaseVNode("button", {
                class: "primary",
                disabled: busy.value || !name.value.trim() || !state.value.customDir || state.value.running,
                onClick: _cache[8] || (_cache[8] = ($event) => perform(() => unref(api).generate(name.value.trim(), preset.value)))
              }, "生成滤镜", 8, _hoisted_27$1),
              createBaseVNode("button", {
                disabled: busy.value || !state.value.customDir || state.value.running,
                onClick: _cache[9] || (_cache[9] = ($event) => perform(() => unref(api).importCube()))
              }, "导入 CUBE", 8, _hoisted_28$1)
            ]),
            createBaseVNode("p", _hoisted_29$1, "保存位置：" + toDisplayString(state.value.customDir || "尚未指定"), 1),
            createBaseVNode("div", _hoisted_30$1, [
              createBaseVNode("button", {
                disabled: busy.value,
                onClick: _cache[10] || (_cache[10] = ($event) => perform(() => unref(api).pickCustomDir()))
              }, "更改保存位置", 8, _hoisted_31$1),
              createBaseVNode("button", {
                disabled: busy.value || !state.value.customOverride,
                onClick: _cache[11] || (_cache[11] = ($event) => perform(() => unref(api).resetCustomDir()))
              }, "恢复 OBS 默认位置", 8, _hoisted_32$1),
              createBaseVNode("button", {
                disabled: busy.value || !state.value.customDir,
                onClick: _cache[12] || (_cache[12] = ($event) => perform(() => unref(api).openFolder("custom")))
              }, "打开文件夹", 8, _hoisted_33$1)
            ]),
            state.value.customItems.length ? (openBlock(), createElementBlock("div", _hoisted_34$1, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(state.value.customItems, (item) => {
                return openBlock(), createElementBlock("div", {
                  key: item.name,
                  class: "lut-item"
                }, [
                  createBaseVNode("span", null, toDisplayString(item.name), 1),
                  createBaseVNode("small", null, toDisplayString((item.size / 1024).toFixed(0)) + " KB · " + toDisplayString(item.managed ? "本工具安装" : "原有文件"), 1),
                  item.managed ? (openBlock(), createElementBlock("button", {
                    key: 0,
                    disabled: busy.value || state.value.running,
                    onClick: ($event) => perform(() => unref(api).removeCustom(item.name))
                  }, "移除并恢复", 8, _hoisted_35$1)) : createCommentVNode("", true)
                ]);
              }), 128))
            ])) : (openBlock(), createElementBlock("p", _hoisted_36$1, "尚无自定义滤镜。没有 OBS 时，也可指定其他直播软件的 LUT 目录。"))
          ]),
          _cache[22] || (_cache[22] = createBaseVNode("p", { class: "obs-help" }, "OBS 使用方式：来源 → 滤镜 → 添加「应用 LUT」→ 浏览选择生成的文件。调整「数量」控制强度。同名文件会先备份；移除仅处理本工具安装且未被其他程序改动的文件，并恢复原文件。", -1))
        ], 64)) : createCommentVNode("", true)
      ]);
    };
  }
});
const ObsLivePanel = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-845504ec"]]);
const _hoisted_1$1 = ["src"];
const _hoisted_2$1 = {
  key: 1,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "1.5"
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ToolboxIcon",
  props: {
    path: {}
  },
  setup(__props) {
    const props = __props;
    const host = ref(), icon = ref(null);
    let observer, visible = false, generation = 0, alive = true;
    async function load() {
      const version = ++generation;
      icon.value = null;
      if (!visible || !window.toolboxApi?.icon) return;
      try {
        const value = await window.toolboxApi.icon(props.path);
        if (alive && version === generation && value?.startsWith("data:image/png;base64,")) icon.value = value;
      } catch {
      }
    }
    watch(() => props.path, load);
    onMounted(() => {
      if (typeof IntersectionObserver === "undefined") {
        visible = true;
        void load();
        return;
      }
      observer = new IntersectionObserver((entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          visible = true;
          observer?.disconnect();
          void load();
        }
      }, { rootMargin: "100px" });
      if (host.value) observer.observe(host.value);
    });
    onBeforeUnmount(() => {
      alive = false;
      generation++;
      observer?.disconnect();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("span", {
        ref_key: "host",
        ref: host,
        class: "toolbox-icon",
        "aria-hidden": "true"
      }, [
        icon.value ? (openBlock(), createElementBlock("img", {
          key: 0,
          src: icon.value,
          alt: "",
          onError: _cache[0] || (_cache[0] = ($event) => icon.value = null)
        }, null, 40, _hoisted_1$1)) : (openBlock(), createElementBlock("svg", _hoisted_2$1, [..._cache[1] || (_cache[1] = [
          createBaseVNode("rect", {
            x: "3",
            y: "4",
            width: "18",
            height: "15",
            rx: "3"
          }, null, -1),
          createBaseVNode("path", { d: "M3 9h18M8 22h8" }, null, -1)
        ])]))
      ], 512);
    };
  }
});
const ToolboxIcon = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-997c8288"]]);
const _hoisted_1 = ["data-tutorial-tab"];
const _hoisted_2 = { class: "page-header" };
const _hoisted_3 = { class: "page-desc" };
const _hoisted_4 = { style: { "margin-left": "auto", "display": "flex", "gap": "8px" } };
const _hoisted_5 = ["disabled"];
const _hoisted_6 = { class: "tab-bar" };
const _hoisted_7 = {
  key: 0,
  class: "app-manager-host"
};
const _hoisted_8 = {
  key: 1,
  class: "app-manager-host"
};
const _hoisted_9 = { class: "search-wrap" };
const _hoisted_10 = {
  key: 0,
  class: "loading-state"
};
const _hoisted_11 = {
  key: 1,
  class: "tool-layout"
};
const _hoisted_12 = { class: "tool-sidebar" };
const _hoisted_13 = ["onClick"];
const _hoisted_14 = { class: "sidebar-name" };
const _hoisted_15 = { class: "sidebar-count" };
const _hoisted_16 = ["onClick"];
const _hoisted_17 = { class: "sidebar-name" };
const _hoisted_18 = { class: "sidebar-count" };
const _hoisted_19 = {
  key: 0,
  class: "sidebar-empty"
};
const _hoisted_20 = { class: "tool-content" };
const _hoisted_21 = { class: "catalog-summary" };
const _hoisted_22 = {
  key: 0,
  role: "alert",
  class: "library-error"
};
const _hoisted_23 = {
  key: 1,
  class: "empty-state"
};
const _hoisted_24 = { class: "card-grid" };
const _hoisted_25 = ["title"];
const _hoisted_26 = ["onClick", "disabled", "aria-label"];
const _hoisted_27 = { class: "card-body" };
const _hoisted_28 = { class: "card-name" };
const _hoisted_29 = { class: "card-exe" };
const _hoisted_30 = ["disabled", "aria-pressed", "aria-label", "onClick"];
const _hoisted_31 = {
  key: 2,
  class: "builtin-wrap"
};
const _hoisted_32 = { class: "card-grid builtin-grid" };
const _hoisted_33 = ["onClick"];
const _hoisted_34 = { class: "card-body" };
const _hoisted_35 = { class: "card-name" };
const _hoisted_36 = { class: "card-desc" };
const _hoisted_37 = { class: "card-tag" };
const _hoisted_38 = {
  key: 3,
  class: "install-page"
};
const _hoisted_39 = {
  key: 0,
  class: "dropzone-icon"
};
const _hoisted_40 = {
  key: 1,
  class: "dropzone-text"
};
const _hoisted_41 = {
  key: 2,
  class: "dropzone-progress"
};
const _hoisted_42 = { class: "dropzone-title" };
const _hoisted_43 = { class: "progress-bar-wrap" };
const _hoisted_44 = { class: "install-actions" };
const _hoisted_45 = ["disabled"];
const _hoisted_46 = ["disabled"];
const _hoisted_47 = { class: "modal-box" };
const _hoisted_48 = { class: "modal-header" };
const _hoisted_49 = { class: "modal-content" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Toolbox",
  setup(__props) {
    const loading = ref(true);
    const searchQuery = ref("");
    const route = useRoute(), router = useRouter();
    const activeTab = computed({
      get: () => typeof route.query.tab === "string" && ["thirdparty", "builtin", "apps", "obs"].includes(route.query.tab) ? route.query.tab : "thirdparty",
      set: (tab) => {
        void router.replace({ query: { ...route.query, tab } });
      }
    });
    const selectedCategory = ref("all");
    const library = ref({ favorites: [], recent: [] });
    const libraryError = ref(""), savingFavorite = ref(false), launching = ref("");
    watch(() => route.query.search, (value) => {
      searchQuery.value = typeof value === "string" ? value : "";
      selectedCategory.value = "all";
    }, { immediate: true });
    const categories = ref([]);
    const builtinTools = ref([]);
    const builtinResult = ref(null);
    const installed = ref(false);
    const installing = ref(false);
    const progressMsg = ref("准备中...");
    const progressPercent = ref(0);
    const canRedownload = ref(false);
    let unsubProgress = null;
    function catColor(o) {
      const colors = ["#38bdf8", "#a855f7", "#f59e0b", "#22c55e", "#ef4444", "#ec4899", "#14b8a6", "#6366f1", "#f97316"];
      return colors[o] || "#94a3b8";
    }
    function iconClass(icon) {
      const map = { port: "cyan", wifi: "green", hosts: "purple", clean: "orange", bsod: "red", battery: "yellow", keyboard: "pink", menu: "slate", shield: "indigo", speed: "teal", key: "amber" };
      return map[icon] || "slate";
    }
    const filteredCategories = computed(() => {
      const q = searchQuery.value.toLowerCase().trim();
      return categories.value.map((cat) => ({
        ...cat,
        tools: cat.tools.filter((t) => matchesTool(t, q))
      })).filter((cat) => cat.tools.length > 0);
    });
    const filteredBuiltin = computed(() => {
      const q = searchQuery.value.toLowerCase().trim();
      if (!q) return builtinTools.value;
      return builtinTools.value.filter((t) => t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q));
    });
    const allTools = computed(() => categories.value.flatMap((cat) => cat.tools));
    const quickViews = computed(() => [
      { id: "all", name: "全部工具", count: allTools.value.length },
      { id: "favorites", name: "★ 我的收藏", count: allTools.value.filter(isFavorite).length },
      { id: "recent", name: "最近使用", count: allTools.value.filter((tool) => library.value.recent.includes(toolKey(tool))).length }
    ]);
    const currentViewName = computed(() => quickViews.value.find((view) => view.id === selectedCategory.value)?.name || selectedCategory.value);
    const currentTools = computed(() => selectTools(allTools.value, selectedCategory.value, searchQuery.value, library.value));
    const emptyMessage = computed(() => searchQuery.value.trim() ? "没有找到匹配工具，请尝试工具名或硬件类别。" : selectedCategory.value === "favorites" ? "点击工具右侧的星标，将常用工具收藏到这里。" : selectedCategory.value === "recent" ? "成功启动过的工具会出现在这里，最多保留 20 个。" : "该分类下暂无工具");
    function isFavorite(tool) {
      return library.value.favorites.includes(toolKey(tool));
    }
    async function loadLibrary() {
      try {
        if (window.toolboxApi) library.value = await window.toolboxApi.library();
        libraryError.value = "";
      } catch {
        libraryError.value = "收藏与最近使用暂时无法读取，请刷新重试；仍可正常启动工具。";
      }
    }
    async function toggleFavorite(tool) {
      if (!window.toolboxApi || savingFavorite.value) return;
      savingFavorite.value = true;
      try {
        library.value = await window.toolboxApi.favorite(toolKey(tool), !isFavorite(tool));
        libraryError.value = "";
      } catch (e) {
        libraryError.value = e.message || "收藏保存失败，请重试";
      } finally {
        savingFavorite.value = false;
      }
    }
    function setupProgress() {
      if (!window.toolboxApi) return;
      unsubProgress = window.toolboxApi.onProgress((p) => {
        progressMsg.value = p.message;
        progressPercent.value = p.percent;
      });
    }
    async function scanAgain() {
      loading.value = true;
      if (window.toolboxApi) {
        try {
          categories.value = await window.toolboxApi.scan();
          builtinTools.value = await window.toolboxApi.getBuiltinTools();
          if (!["all", "favorites", "recent"].includes(selectedCategory.value) && !categories.value.some((cat) => cat.name === selectedCategory.value)) selectedCategory.value = "all";
          await loadLibrary();
          installed.value = categories.value.length > 0;
          canRedownload.value = true;
        } catch (e) {
          builtinResult.value = `扫描失败：${e.message || e}`;
        }
      }
      loading.value = false;
    }
    async function launchTool(tool) {
      if (!window.toolboxApi || launching.value) return;
      launching.value = tool.exePath;
      try {
        const r = await window.toolboxApi.launch(tool.exePath);
        if (!r.success) builtinResult.value = `❌ 启动失败: ${r.error || "未知错误"}`;
        else await loadLibrary();
      } catch (e) {
        builtinResult.value = `❌ 启动失败: ${e.message || e}`;
      } finally {
        launching.value = "";
      }
    }
    async function runBuiltin(tool) {
      if (!window.toolboxApi) return;
      const r = await window.toolboxApi.executeBuiltin(tool.id);
      if (r.success) {
        builtinResult.value = typeof r.data === "object" ? JSON.stringify(r.data, null, 2) : String(r.data || "执行成功");
      } else {
        builtinResult.value = `❌ 执行失败: ${r.error || "未知错误"}`;
      }
    }
    async function installFromZip() {
      if (installing.value || !window.toolboxApi) return;
      installing.value = true;
      progressMsg.value = "请选择 tuba.zip...";
      progressPercent.value = 5;
      try {
        const r = await window.toolboxApi.installZip();
        if (r.canceled) {
        } else if (r.success) {
          installed.value = true;
          canRedownload.value = true;
          scanAgain();
        } else {
          builtinResult.value = `❌ 安装失败: ${r.error || "未知错误"}`;
          installed.value = false;
        }
      } catch (e) {
        builtinResult.value = `❌ 安装失败: ${e.message || e}`;
        installed.value = false;
      }
      installing.value = false;
    }
    function onDrop() {
      builtinResult.value = "ℹ️ 拖拽安装已停用，请点击上方区域选择 tuba.zip";
    }
    async function startDownload() {
      if (!window.toolboxApi) return;
      installing.value = true;
      progressMsg.value = "正在连接...";
      progressPercent.value = 0;
      try {
        const r = await window.toolboxApi.download();
        if (r.success) {
          installed.value = true;
          canRedownload.value = true;
          scanAgain();
        } else {
          builtinResult.value = `❌ 下载失败: ${r.error || "未知错误"}`;
        }
      } catch (e) {
        builtinResult.value = `❌ 下载失败: ${e.message || e}`;
      }
      installing.value = false;
    }
    async function openDownloadPage() {
      if (!window.toolboxApi) return;
      await window.toolboxApi.openDownloadPage();
    }
    function showDownloadPage() {
      installed.value = false;
      canRedownload.value = false;
      categories.value = [];
    }
    onMounted(async () => {
      setupProgress();
      if (!window.toolboxApi) {
        loading.value = false;
        return;
      }
      try {
        categories.value = await window.toolboxApi.scan();
        builtinTools.value = await window.toolboxApi.getBuiltinTools();
        if (categories.value.length > 0) {
          installed.value = true;
          canRedownload.value = true;
        }
        await loadLibrary();
      } catch (e) {
        builtinResult.value = `扫描失败：${e.message || e}`;
      }
      loading.value = false;
    });
    onUnmounted(() => {
      if (unsubProgress) unsubProgress();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "page",
        "data-tour": "toolbox",
        "data-tutorial-tab": activeTab.value
      }, [
        createBaseVNode("div", _hoisted_2, [
          _cache[10] || (_cache[10] = createBaseVNode("div", {
            class: "page-icon",
            style: { "background": "rgba(100,116,139,0.1)" }
          }, [
            createBaseVNode("svg", {
              width: "28",
              height: "28",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "#94a3b8",
              "stroke-width": "1.5"
            }, [
              createBaseVNode("path", { d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" })
            ])
          ], -1)),
          createBaseVNode("div", null, [
            _cache[9] || (_cache[9] = createBaseVNode("h2", { class: "page-title" }, "工具箱", -1)),
            createBaseVNode("p", _hoisted_3, toDisplayString(activeTab.value === "obs" ? "OBS 环境检测 · LUT 调色滤镜" : activeTab.value === "thirdparty" ? "图吧硬件工具箱" : activeTab.value === "builtin" ? "内置实用工具" : "应用卸载 · AppX · WinGet 软件包"), 1)
          ]),
          createBaseVNode("div", _hoisted_4, [
            canRedownload.value && activeTab.value === "thirdparty" ? (openBlock(), createElementBlock("button", {
              key: 0,
              class: "action-btn silver",
              onClick: showDownloadPage
            }, " 重装工具包 ")) : createCommentVNode("", true),
            activeTab.value !== "apps" && activeTab.value !== "obs" ? (openBlock(), createElementBlock("button", {
              key: 1,
              class: "action-btn silver",
              onClick: scanAgain,
              disabled: loading.value
            }, toDisplayString(loading.value ? "扫描中..." : "刷新列表"), 9, _hoisted_5)) : createCommentVNode("", true)
          ])
        ]),
        createBaseVNode("div", _hoisted_6, [
          createBaseVNode("button", {
            class: normalizeClass(["tab-btn", { active: activeTab.value === "thirdparty" }]),
            onClick: _cache[0] || (_cache[0] = ($event) => activeTab.value = "thirdparty")
          }, [..._cache[11] || (_cache[11] = [
            createBaseVNode("svg", {
              width: "14",
              height: "14",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "2"
            }, [
              createBaseVNode("rect", {
                x: "2",
                y: "2",
                width: "20",
                height: "20",
                rx: "2"
              }),
              createBaseVNode("line", {
                x1: "2",
                y1: "8",
                x2: "22",
                y2: "8"
              }),
              createBaseVNode("line", {
                x1: "8",
                y1: "2",
                x2: "8",
                y2: "22"
              })
            ], -1),
            createTextVNode(" 第三方工具 ", -1)
          ])], 2),
          createBaseVNode("button", {
            class: normalizeClass(["tab-btn", { active: activeTab.value === "builtin" }]),
            onClick: _cache[1] || (_cache[1] = ($event) => activeTab.value = "builtin")
          }, [..._cache[12] || (_cache[12] = [
            createBaseVNode("svg", {
              width: "14",
              height: "14",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "2"
            }, [
              createBaseVNode("polyline", { points: "22 12 18 12 15 21 9 3 6 12 2 12" })
            ], -1),
            createTextVNode(" 内置工具 ", -1)
          ])], 2),
          createBaseVNode("button", {
            class: normalizeClass(["tab-btn", { active: activeTab.value === "apps" }]),
            onClick: _cache[2] || (_cache[2] = ($event) => activeTab.value = "apps")
          }, "应用管理", 2),
          createBaseVNode("button", {
            class: normalizeClass(["tab-btn", { active: activeTab.value === "obs" }]),
            onClick: _cache[3] || (_cache[3] = ($event) => activeTab.value = "obs")
          }, "OBS 直播滤镜", 2)
        ]),
        activeTab.value === "obs" ? (openBlock(), createElementBlock("div", _hoisted_7, [
          createVNode(ObsLivePanel)
        ])) : activeTab.value === "apps" ? (openBlock(), createElementBlock("div", _hoisted_8, [
          createVNode(SoftwareManagementPanel)
        ])) : installed.value || activeTab.value === "builtin" ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
          createBaseVNode("div", _hoisted_9, [
            _cache[13] || (_cache[13] = createBaseVNode("svg", {
              class: "search-icon",
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
            withDirectives(createBaseVNode("input", {
              "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => searchQuery.value = $event),
              placeholder: "搜索全部分类：工具名称、程序名、硬件类别…",
              class: "search-input"
            }, null, 512), [
              [vModelText, searchQuery.value]
            ])
          ]),
          loading.value ? (openBlock(), createElementBlock("div", _hoisted_10, [..._cache[14] || (_cache[14] = [
            createBaseVNode("div", { class: "loader" }, null, -1),
            createBaseVNode("span", null, "正在扫描工具目录...", -1)
          ])])) : activeTab.value === "thirdparty" ? (openBlock(), createElementBlock("div", _hoisted_11, [
            createBaseVNode("div", _hoisted_12, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(quickViews.value, (view) => {
                return openBlock(), createElementBlock("button", {
                  key: view.id,
                  class: normalizeClass(["sidebar-item", { active: selectedCategory.value === view.id }]),
                  onClick: ($event) => selectedCategory.value = view.id
                }, [
                  createBaseVNode("span", _hoisted_14, toDisplayString(view.name), 1),
                  createBaseVNode("span", _hoisted_15, toDisplayString(view.count), 1)
                ], 10, _hoisted_13);
              }), 128)),
              _cache[15] || (_cache[15] = createBaseVNode("div", { class: "sidebar-heading" }, "按硬件分类", -1)),
              (openBlock(true), createElementBlock(Fragment, null, renderList(filteredCategories.value, (cat) => {
                return openBlock(), createElementBlock("button", {
                  key: cat.name,
                  class: normalizeClass(["sidebar-item", { active: selectedCategory.value === cat.name }]),
                  onClick: ($event) => selectedCategory.value = cat.name
                }, [
                  createBaseVNode("span", {
                    class: "sidebar-dot",
                    style: normalizeStyle({ background: catColor(cat.order) })
                  }, null, 4),
                  createBaseVNode("span", _hoisted_17, toDisplayString(cat.name), 1),
                  createBaseVNode("span", _hoisted_18, toDisplayString(cat.tools.length), 1)
                ], 10, _hoisted_16);
              }), 128)),
              filteredCategories.value.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_19, "无匹配工具")) : createCommentVNode("", true)
            ]),
            createBaseVNode("div", _hoisted_20, [
              createBaseVNode("div", _hoisted_21, [
                createBaseVNode("span", null, toDisplayString(searchQuery.value.trim() ? "搜索结果" : currentViewName.value) + " · " + toDisplayString(currentTools.value.length) + " 个工具", 1),
                selectedCategory.value !== "all" || searchQuery.value ? (openBlock(), createElementBlock("button", {
                  key: 0,
                  class: "text-button",
                  onClick: _cache[5] || (_cache[5] = ($event) => {
                    selectedCategory.value = "all";
                    searchQuery.value = "";
                  })
                }, "查看全部")) : createCommentVNode("", true)
              ]),
              libraryError.value ? (openBlock(), createElementBlock("p", _hoisted_22, toDisplayString(libraryError.value), 1)) : createCommentVNode("", true),
              currentTools.value.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_23, toDisplayString(emptyMessage.value), 1)) : createCommentVNode("", true),
              createBaseVNode("div", _hoisted_24, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(currentTools.value, (tool) => {
                  return openBlock(), createElementBlock("div", {
                    class: normalizeClass(["tool-card", { "search-target": unref(route).query.tool === unref(toolKey)(tool) }]),
                    key: tool.exePath,
                    title: tool.relativePath
                  }, [
                    createBaseVNode("button", {
                      class: "tool-launch",
                      onClick: ($event) => launchTool(tool),
                      disabled: launching.value === tool.exePath,
                      "aria-label": "启动 " + tool.name
                    }, [
                      createVNode(ToolboxIcon, {
                        path: tool.exePath
                      }, null, 8, ["path"]),
                      createBaseVNode("div", _hoisted_27, [
                        createBaseVNode("div", _hoisted_28, toDisplayString(tool.name), 1),
                        createBaseVNode("div", _hoisted_29, toDisplayString(tool.category) + " · " + toDisplayString(tool.exeName), 1)
                      ])
                    ], 8, _hoisted_26),
                    createBaseVNode("button", {
                      class: normalizeClass(["favorite-button", { saved: isFavorite(tool) }]),
                      disabled: savingFavorite.value,
                      "aria-pressed": isFavorite(tool),
                      "aria-label": (isFavorite(tool) ? "取消收藏 " : "收藏 ") + tool.name,
                      onClick: ($event) => toggleFavorite(tool)
                    }, toDisplayString(isFavorite(tool) ? "★" : "☆"), 11, _hoisted_30)
                  ], 10, _hoisted_25);
                }), 128))
              ])
            ])
          ])) : (openBlock(), createElementBlock("div", _hoisted_31, [
            createBaseVNode("div", _hoisted_32, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(filteredBuiltin.value, (tool) => {
                return openBlock(), createElementBlock("div", {
                  class: "tool-card builtin",
                  key: tool.id,
                  onClick: ($event) => runBuiltin(tool)
                }, [
                  createBaseVNode("div", {
                    class: normalizeClass(["builtin-icon", iconClass(tool.icon)])
                  }, [..._cache[16] || (_cache[16] = [
                    createBaseVNode("svg", {
                      width: "18",
                      height: "18",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      "stroke-width": "1.5"
                    }, [
                      createBaseVNode("circle", {
                        cx: "12",
                        cy: "12",
                        r: "10"
                      }),
                      createBaseVNode("path", { d: "M12 6v6l4 2" })
                    ], -1)
                  ])], 2),
                  createBaseVNode("div", _hoisted_34, [
                    createBaseVNode("div", _hoisted_35, toDisplayString(tool.name), 1),
                    createBaseVNode("div", _hoisted_36, toDisplayString(tool.description), 1)
                  ]),
                  createBaseVNode("span", _hoisted_37, toDisplayString(tool.category), 1)
                ], 8, _hoisted_33);
              }), 128))
            ])
          ]))
        ], 64)) : (openBlock(), createElementBlock("div", _hoisted_38, [
          createBaseVNode("div", {
            class: normalizeClass(["dropzone", { "dropzone-loading": installing.value }]),
            onClick: installFromZip,
            onDragover: _cache[6] || (_cache[6] = withModifiers(() => {
            }, ["prevent"])),
            onDrop: withModifiers(onDrop, ["prevent"])
          }, [
            !installing.value ? (openBlock(), createElementBlock("div", _hoisted_39, [..._cache[17] || (_cache[17] = [
              createBaseVNode("svg", {
                width: "48",
                height: "48",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "1.2"
              }, [
                createBaseVNode("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
                createBaseVNode("polyline", { points: "17 8 12 3 7 8" }),
                createBaseVNode("line", {
                  x1: "12",
                  y1: "3",
                  x2: "12",
                  y2: "15"
                })
              ], -1)
            ])])) : createCommentVNode("", true),
            !installing.value ? (openBlock(), createElementBlock("div", _hoisted_40, [..._cache[18] || (_cache[18] = [
              createBaseVNode("span", { class: "dropzone-title" }, "点击选择 tuba.zip 安装", -1),
              createBaseVNode("span", { class: "dropzone-hint" }, "将弹出文件选择框，由你亲自确认 ZIP 文件", -1)
            ])])) : (openBlock(), createElementBlock("div", _hoisted_41, [
              _cache[19] || (_cache[19] = createBaseVNode("div", { class: "loader" }, null, -1)),
              createBaseVNode("span", _hoisted_42, toDisplayString(progressMsg.value), 1),
              createBaseVNode("div", _hoisted_43, [
                createBaseVNode("div", {
                  class: "progress-bar-fill",
                  style: normalizeStyle({ width: progressPercent.value + "%" })
                }, null, 4)
              ])
            ]))
          ], 34),
          createBaseVNode("div", _hoisted_44, [
            createBaseVNode("button", {
              class: "action-btn primary",
              onClick: startDownload,
              disabled: installing.value
            }, [..._cache[20] || (_cache[20] = [
              createBaseVNode("svg", {
                width: "16",
                height: "16",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                createBaseVNode("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
                createBaseVNode("polyline", { points: "7 10 12 15 17 10" }),
                createBaseVNode("line", {
                  x1: "12",
                  y1: "15",
                  x2: "12",
                  y2: "3"
                })
              ], -1),
              createTextVNode(" 从网盘下载 (292 MB) ", -1)
            ])], 8, _hoisted_45),
            createBaseVNode("button", {
              class: "action-btn silver",
              onClick: openDownloadPage,
              disabled: installing.value
            }, [..._cache[21] || (_cache[21] = [
              createBaseVNode("svg", {
                width: "16",
                height: "16",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "2"
              }, [
                createBaseVNode("circle", {
                  cx: "12",
                  cy: "12",
                  r: "10"
                }),
                createBaseVNode("line", {
                  x1: "2",
                  y1: "12",
                  x2: "22",
                  y2: "12"
                }),
                createBaseVNode("path", { d: "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" })
              ], -1),
              createTextVNode(" 浏览器打开下载页 ", -1)
            ])], 8, _hoisted_46)
          ]),
          _cache[22] || (_cache[22] = createBaseVNode("div", { class: "install-note" }, " 工具箱包含 90+ 硬件检测与调试工具（CPU-Z、GPU-Z、AIDA64、CrystalDiskMark、FurMark 等），下载后自动解压即用。 ", -1))
        ])),
        builtinResult.value ? (openBlock(), createElementBlock("div", {
          key: 4,
          class: "modal-overlay",
          onClick: _cache[8] || (_cache[8] = withModifiers(($event) => builtinResult.value = null, ["self"]))
        }, [
          createBaseVNode("div", _hoisted_47, [
            createBaseVNode("div", _hoisted_48, [
              _cache[23] || (_cache[23] = createBaseVNode("span", null, "工具结果", -1)),
              createBaseVNode("button", {
                class: "modal-close",
                onClick: _cache[7] || (_cache[7] = ($event) => builtinResult.value = null)
              }, "×")
            ]),
            createBaseVNode("pre", _hoisted_49, toDisplayString(builtinResult.value), 1)
          ])
        ])) : createCommentVNode("", true)
      ], 8, _hoisted_1);
    };
  }
});
const Toolbox = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-062a9c0e"]]);
export {
  Toolbox as default
};
