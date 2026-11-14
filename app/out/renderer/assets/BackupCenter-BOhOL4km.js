import { O as OperationHistoryPanel } from "./embeddedTools-CnGo9MNI.js";
/* empty css                     */
import { t as defineComponent, Y as onBeforeUnmount, l as createElementBlock, i as createBaseVNode, ak as toDisplayString, k as createCommentVNode, S as normalizeClass, F as Fragment, a9 as ref, a5 as openBlock, _ as _export_sfc, a1 as onMounted, ab as renderList, q as createTextVNode, g as computed, p as createStaticVNode, r as createVNode, aF as withCtx, as as unref, V as normalizeStyle } from "./main-DAqTdO6U.js";
import { e as ElMessageBox, d as ElMessage } from "./index-CL4m76NE.js";
import { K as KeywordConfirm } from "./KeywordConfirm-CUMT0nLF.js";
import { E as EmbeddedSection } from "./EmbeddedSection-SxpWnTdG.js";
const _hoisted_1$2 = {
  class: "input-tool",
  "aria-labelledby": "driver-backup-title"
};
const _hoisted_2$2 = { class: "tool-actions" };
const _hoisted_3$2 = ["disabled"];
const _hoisted_4$2 = ["disabled"];
const _hoisted_5$2 = {
  key: 0,
  role: "status"
};
const _hoisted_6$2 = { class: "tool-metrics" };
const _hoisted_7$2 = { class: "backup-directory" };
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "DriverBackupPanel",
  props: {
    disabled: { type: Boolean }
  },
  setup(__props) {
    const busy = ref(false), message = ref(""), failed = ref(false), result = ref(null);
    let disposed = false;
    function size(bytes) {
      return bytes === void 0 ? "—" : bytes < 1024 * 1024 ? `${(bytes / 1024).toFixed(1)} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`;
    }
    async function exportBackup() {
      if (busy.value) return;
      busy.value = true;
      message.value = "";
      failed.value = false;
      result.value = null;
      try {
        if (!window.sysApi?.exportDrivers) throw Error("驱动导出接口不可用，请重启更新后的软件");
        const reply = await window.sysApi.exportDrivers();
        if (disposed) return;
        result.value = reply;
        failed.value = !reply.success && !reply.cancelled;
        message.value = reply.cancelled ? "已取消导出" : reply.success ? "驱动导出完成，已核验 INF 文件并保存导出清单" : reply.error || "导出失败";
      } catch (error) {
        if (!disposed) {
          failed.value = true;
          message.value = error.message;
        }
      } finally {
        if (!disposed) busy.value = false;
      }
    }
    async function open() {
      try {
        const reply = await window.sysApi.openDriverExport();
        if (!reply.success) throw Error(reply.error || "打开目录失败");
      } catch (error) {
        message.value = error.message;
        failed.value = true;
      }
    }
    onBeforeUnmount(() => {
      disposed = true;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("section", _hoisted_1$2, [
        _cache[3] || (_cache[3] = createBaseVNode("div", { class: "tool-heading" }, [
          createBaseVNode("div", null, [
            createBaseVNode("h3", { id: "driver-backup-title" }, "第三方驱动备份"),
            createBaseVNode("p", null, "将驱动包导出到独立文件夹，供重装系统后的手动恢复使用。")
          ]),
          createBaseVNode("span", { class: "tool-badge" }, "驱动包导出")
        ], -1)),
        _cache[4] || (_cache[4] = createBaseVNode("p", null, "选择保存位置后会新建备份目录。此操作只复制驱动包，不安装、卸载或更新设备驱动。", -1)),
        createBaseVNode("div", _hoisted_2$2, [
          createBaseVNode("button", {
            class: "primary",
            disabled: busy.value || __props.disabled,
            onClick: exportBackup
          }, toDisplayString(busy.value ? "正在导出驱动…" : "选择位置并导出驱动"), 9, _hoisted_3$2),
          result.value?.directory ? (openBlock(), createElementBlock("button", {
            key: 0,
            disabled: busy.value,
            onClick: open
          }, "打开本次导出目录", 8, _hoisted_4$2)) : createCommentVNode("", true)
        ]),
        busy.value ? (openBlock(), createElementBlock("p", _hoisted_5$2, "正在复制并核验文件，最多等待 10 分钟；请勿关闭软件。")) : createCommentVNode("", true),
        message.value ? (openBlock(), createElementBlock("p", {
          key: 1,
          class: normalizeClass(failed.value ? "tool-error" : "tool-status"),
          role: "status"
        }, toDisplayString(message.value), 3)) : createCommentVNode("", true),
        result.value?.directory ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
          createBaseVNode("div", _hoisted_6$2, [
            createBaseVNode("div", null, [
              _cache[0] || (_cache[0] = createBaseVNode("span", null, "已检测到的 INF", -1)),
              createBaseVNode("strong", null, toDisplayString(result.value.infCount ?? "—"), 1)
            ]),
            createBaseVNode("div", null, [
              _cache[1] || (_cache[1] = createBaseVNode("span", null, "文件数量", -1)),
              createBaseVNode("strong", null, toDisplayString(result.value.files ?? "—"), 1)
            ]),
            createBaseVNode("div", null, [
              _cache[2] || (_cache[2] = createBaseVNode("span", null, "文件大小", -1)),
              createBaseVNode("strong", null, toDisplayString(size(result.value.bytes)), 1)
            ])
          ]),
          createBaseVNode("p", _hoisted_7$2, toDisplayString(result.value.directory), 1)
        ], 64)) : createCommentVNode("", true),
        _cache[5] || (_cache[5] = createBaseVNode("p", { class: "tool-note" }, "需管理员权限和足够磁盘空间。此备份不包含 Windows 内置驱动、厂商控制面板或应用设置；恢复时仍需确认系统版本和硬件兼容性。", -1))
      ]);
    };
  }
});
const DriverBackupPanel = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-47adee64"]]);
const _hoisted_1$1 = {
  class: "input-tool",
  "aria-labelledby": "health-recovery-title"
};
const _hoisted_2$1 = { class: "tool-actions" };
const _hoisted_3$1 = ["disabled"];
const _hoisted_4$1 = ["disabled"];
const _hoisted_5$1 = { key: 0 };
const _hoisted_6$1 = {
  key: 1,
  class: "tool-status",
  role: "status"
};
const _hoisted_7$1 = {
  key: 2,
  class: "tool-error",
  role: "alert"
};
const _hoisted_8$1 = { key: 3 };
const _hoisted_9$1 = { class: "health-runs" };
const _hoisted_10$1 = { class: "health-run-heading" };
const _hoisted_11$1 = ["disabled", "onClick"];
const _hoisted_12$1 = { key: 0 };
const _hoisted_13$1 = {
  key: 4,
  class: "health-undo-result"
};
const _hoisted_14$1 = { key: 0 };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "HealthBackupPanel",
  props: {
    disabled: { type: Boolean }
  },
  emits: ["busy"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const runs = ref([]), busy = ref(false), loading = ref(false), error = ref(""), message = ref(""), activeId = ref("");
    const result = ref(null);
    const labels = { applied: "已应用并核验", unchanged: "已满足", skipped: "已跳过", failed: "未完成", restored: "已恢复" };
    const nextId = computed(() => runs.value.find((r) => r.pending > 0)?.id);
    let unsubscribe;
    async function load() {
      loading.value = true;
      try {
        const reply = await window.sysApi.healthBackups();
        if (!reply.success) throw Error(reply.error || "读取体检备份失败");
        runs.value = reply.runs;
        if (!busy.value) error.value = "";
      } catch (e) {
        error.value = e.message;
      } finally {
        loading.value = false;
      }
    }
    async function undo(run) {
      if (busy.value || props.disabled || run.id !== nextId.value) return;
      try {
        await ElMessageBox.confirm("将恢复这次体检优化修改的原值。检测到后续修改的设置会跳过，并保留恢复记录。", "撤销本次体检优化", { type: "warning", confirmButtonText: "恢复原值", cancelButtonText: "取消" });
      } catch {
        return;
      }
      if (busy.value || props.disabled) return;
      busy.value = true;
      emit("busy", true);
      activeId.value = run.id;
      error.value = "";
      result.value = null;
      message.value = "正在核对当前设置与备份…";
      try {
        const reply = await window.sysApi.healthUndo(run.id);
        result.value = reply;
        message.value = reply.success ? `已恢复并核验 ${reply.items.filter((i) => i.status === "restored").length} 处设置，部分设置需重启生效。` : "撤销未全部完成，未恢复的记录已保留。";
        if (!reply.success) error.value = reply.error || reply.items.filter((i) => i.status === "failed").map((i) => `${i.name}：${i.detail}`).join("；");
        await load();
      } catch (e) {
        error.value = e.message;
      } finally {
        busy.value = false;
        emit("busy", false);
        activeId.value = "";
      }
    }
    async function openFolder() {
      try {
        const r = await window.sysApi.recoveryStorage(true);
        if (!r.success) throw Error(r.error || "打开目录失败");
      } catch (e) {
        error.value = e.message;
      }
    }
    onMounted(() => {
      load();
      unsubscribe = window.sysApi.onHealthApplyProgress((text) => {
        if (busy.value) message.value = text;
      });
    });
    onBeforeUnmount(() => unsubscribe?.());
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("section", _hoisted_1$1, [
        _cache[0] || (_cache[0] = createBaseVNode("div", { class: "tool-heading" }, [
          createBaseVNode("div", null, [
            createBaseVNode("h3", { id: "health-recovery-title" }, "体检优化恢复"),
            createBaseVNode("p", null, "恢复为每次体检优化前的实际设置，包含原本不存在的注册表值。")
          ]),
          createBaseVNode("span", { class: "tool-badge" }, "逐项原值备份")
        ], -1)),
        createBaseVNode("div", _hoisted_2$1, [
          createBaseVNode("button", {
            disabled: busy.value || loading.value,
            onClick: load
          }, "刷新备份", 8, _hoisted_3$1),
          createBaseVNode("button", {
            disabled: busy.value,
            onClick: openFolder
          }, "打开恢复档案", 8, _hoisted_4$1)
        ]),
        loading.value ? (openBlock(), createElementBlock("p", _hoisted_5$1, "正在读取体检备份…")) : createCommentVNode("", true),
        message.value ? (openBlock(), createElementBlock("p", _hoisted_6$1, toDisplayString(message.value), 1)) : createCommentVNode("", true),
        error.value ? (openBlock(), createElementBlock("p", _hoisted_7$1, toDisplayString(error.value), 1)) : createCommentVNode("", true),
        !loading.value && !error.value && !runs.value.length ? (openBlock(), createElementBlock("p", _hoisted_8$1, "暂无新版体检备份。执行「系统体检 → 一键应用推荐」后会自动生成；旧版优化无法补录修改前的原值。")) : createCommentVNode("", true),
        createBaseVNode("div", _hoisted_9$1, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(runs.value, (run) => {
            return openBlock(), createElementBlock("article", {
              key: run.id,
              class: "health-run"
            }, [
              createBaseVNode("div", _hoisted_10$1, [
                createBaseVNode("div", null, [
                  createBaseVNode("strong", null, toDisplayString(new Date(run.createdAt).toLocaleString()), 1),
                  createBaseVNode("p", null, toDisplayString(run.pending ? `${run.pending} 处设置待恢复` : "无待恢复设置") + " · " + toDisplayString(run.restorePoint ? "有最近的系统还原点" : "独立配置备份"), 1)
                ]),
                createBaseVNode("button", {
                  class: "primary",
                  disabled: busy.value || __props.disabled || run.id !== nextId.value || !run.pending,
                  onClick: ($event) => undo(run)
                }, toDisplayString(busy.value && activeId.value === run.id ? "正在恢复…" : "撤销本次优化"), 9, _hoisted_11$1)
              ]),
              createBaseVNode("details", null, [
                createBaseVNode("summary", null, "查看当次执行结果（" + toDisplayString(run.items.length) + " 项）", 1),
                createBaseVNode("ul", null, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(run.items, (item, index) => {
                    return openBlock(), createElementBlock("li", { key: index }, [
                      createTextVNode(toDisplayString(labels[item.status]) + " · " + toDisplayString(item.name), 1),
                      item.detail ? (openBlock(), createElementBlock("span", _hoisted_12$1, "：" + toDisplayString(item.detail), 1)) : createCommentVNode("", true)
                    ]);
                  }), 128))
                ])
              ])
            ]);
          }), 128))
        ]),
        result.value?.items.length ? (openBlock(), createElementBlock("ul", _hoisted_13$1, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(result.value.items, (item, index) => {
            return openBlock(), createElementBlock("li", { key: index }, [
              createTextVNode(toDisplayString(labels[item.status]) + " · " + toDisplayString(item.name), 1),
              item.detail ? (openBlock(), createElementBlock("span", _hoisted_14$1, "：" + toDisplayString(item.detail), 1)) : createCommentVNode("", true)
            ]);
          }), 128))
        ])) : createCommentVNode("", true),
        _cache[1] || (_cache[1] = createBaseVNode("p", { class: "tool-note" }, "按时间倒序撤销。当前设置若已被其他操作修改，会跳过并保留记录。部分恢复需重启后生效。档案独立于安装目录保存，但不等同于系统镜像，仅适用于原电脑、原 Windows 账户；重装系统前请另存备份。", -1))
      ]);
    };
  }
});
const HealthBackupPanel = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-1e2a3759"]]);
const _hoisted_1 = { class: "page backup-page" };
const _hoisted_2 = { class: "page-header" };
const _hoisted_3 = { class: "page-actions" };
const _hoisted_4 = {
  key: 0,
  class: "page-hint"
};
const _hoisted_5 = ["disabled"];
const _hoisted_6 = ["disabled"];
const _hoisted_7 = { class: "glass-card rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl" };
const _hoisted_8 = { class: "mb-3 flex flex-wrap items-center gap-3 border-b border-white/10 pb-2" };
const _hoisted_9 = {
  key: 0,
  class: "flex items-center gap-3 py-2 font-mono text-xs text-sky-300"
};
const _hoisted_10 = { class: "mb-3 flex flex-wrap gap-2" };
const _hoisted_11 = { class: "font-mono text-[10px] self-center text-gray-500" };
const _hoisted_12 = { class: "grid gap-1.5 md:grid-cols-3 xl:grid-cols-4" };
const _hoisted_13 = ["checked", "onChange"];
const _hoisted_14 = { class: "font-mono text-[11px] text-gray-500" };
const _hoisted_15 = { class: "min-w-0 flex-1 truncate font-mono text-xs text-gray-300" };
const _hoisted_16 = { class: "mt-3" };
const _hoisted_17 = ["disabled"];
const _hoisted_18 = {
  key: 2,
  class: "py-1 font-mono text-xs text-gray-500"
};
const _hoisted_19 = { class: "glass-card mt-6 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl" };
const _hoisted_20 = { class: "mb-3 flex items-center justify-between border-b border-white/10 pb-2" };
const _hoisted_21 = { class: "font-mono text-[10px] text-gray-500" };
const _hoisted_22 = {
  key: 0,
  class: "font-mono text-xs text-gray-500"
};
const _hoisted_23 = {
  key: 1,
  class: "font-mono text-xs text-gray-500"
};
const _hoisted_24 = {
  key: 2,
  class: "flex flex-col gap-2"
};
const _hoisted_25 = { class: "flex flex-wrap items-center gap-x-5 gap-y-2 px-4 py-3" };
const _hoisted_26 = { class: "font-mono text-xs text-gray-300 min-w-[150px]" };
const _hoisted_27 = { class: "font-mono text-[11px] text-gray-500" };
const _hoisted_28 = { class: "score-label" };
const _hoisted_29 = ["title"];
const _hoisted_30 = { class: "ml-auto flex items-center gap-2" };
const _hoisted_31 = ["onClick"];
const _hoisted_32 = ["onClick"];
const _hoisted_33 = {
  key: 0,
  class: "border-t border-white/5 px-4 pb-4 pt-3"
};
const _hoisted_34 = {
  key: 0,
  class: "font-mono text-xs text-gray-500"
};
const _hoisted_35 = { class: "mb-4" };
const _hoisted_36 = { class: "mb-1 flex items-center justify-between" };
const _hoisted_37 = { class: "font-mono text-xs text-gray-300" };
const _hoisted_38 = { class: "h-2 w-full overflow-hidden rounded-full bg-white/5" };
const _hoisted_39 = { class: "mb-3 flex items-center justify-between border-b border-white/5 pb-1.5" };
const _hoisted_40 = { class: "font-mono text-xs tracking-widest text-gray-400" };
const _hoisted_41 = { class: "flex items-center gap-2" };
const _hoisted_42 = { class: "font-mono text-[10px] text-gray-500" };
const _hoisted_43 = ["disabled"];
const _hoisted_44 = ["disabled", "onClick"];
const _hoisted_45 = { class: "grid gap-1.5 md:grid-cols-2 xl:grid-cols-3" };
const _hoisted_46 = ["title"];
const _hoisted_47 = ["checked", "disabled", "onChange"];
const _hoisted_48 = { class: "font-mono text-[11px] text-gray-500" };
const _hoisted_49 = { class: "min-w-0 flex-1 truncate font-mono text-xs text-gray-300" };
const _hoisted_50 = {
  key: 0,
  class: "shrink-0 font-mono text-[9px] text-amber-400/80"
};
const _hoisted_51 = {
  key: 0,
  class: "mt-3 rounded-lg border border-white/5 bg-black/30 p-3"
};
const _hoisted_52 = { class: "flex max-h-56 flex-col gap-1 overflow-y-auto pr-1" };
const _hoisted_53 = {
  key: 2,
  class: "font-mono text-xs text-red-400"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "BackupCenter",
  setup(__props) {
    const DOMAIN_NAMES = {
      D01: "应用自身状态",
      D02: "注册表全量",
      D03: "电源方案",
      D04: "启动配置",
      D05: "服务状态",
      D06: "计划任务",
      D07: "系统还原点",
      D08: "启动项",
      D09: "Hosts/WinHTTP/Winsock",
      D10: "虚拟内存",
      D11: "Update 策略",
      D12: "网络配置",
      D13: "显示配置",
      D14: "驱动证据",
      D15: "组策略/安全策略",
      D16: "防火墙/Defender 策略",
      D17: "可选功能",
      D18: "Windows AI 策略",
      D19: "商店/更新策略",
      D20: "用户级任务",
      D21: "第三方服务",
      D22: "环境变量/区域",
      D23: "硬件证据"
    };
    const DOMAIN_ORDER = Object.keys(DOMAIN_NAMES);
    const DANGEROUS_DOMAINS = /* @__PURE__ */ new Set(["D02", "D15"]);
    function domainName(id) {
      return DOMAIN_NAMES[id] || id;
    }
    const baselines = ref([]);
    const backupDir = ref("");
    const loaded = ref(false);
    const busy = ref(false);
    const creating = ref(false);
    const createPhase = ref("");
    const customOpen = ref(false);
    const customSelected = ref(new Set(DOMAIN_ORDER));
    const expanded = ref("");
    const detail = ref(null);
    const detailError = ref("");
    const detailLoading = ref(false);
    let detailSeq = 0;
    const selectedDomains = ref(/* @__PURE__ */ new Set());
    const restoring = ref(false);
    const healthRestoring = ref(false);
    const restoreLogs = ref([]);
    async function openRecoveryFolder() {
      try {
        const result = await window.sysApi.recoveryStorage(true);
        if (!result.success) ElMessage.error(result.error || "打开恢复档案失败");
      } catch (e) {
        ElMessage.error(String(e));
      }
    }
    async function loadList() {
      busy.value = true;
      try {
        const r = await window.sysApi.baselineList();
        if (r.success) {
          baselines.value = r.baselines ?? [];
          backupDir.value = r.backupDir ?? "";
        } else {
          ElMessage.error(r.error || "获取基线列表失败");
        }
      } finally {
        busy.value = false;
        loaded.value = true;
      }
    }
    async function createFull() {
      await doCreate(void 0, "完整基线");
    }
    async function createCustom() {
      const domains = [...customSelected.value];
      if (domains.length === 0) return;
      await doCreate(domains, `自定义(${domains.length} 域)`);
    }
    async function doCreate(domains, label) {
      if (creating.value || healthRestoring.value) return;
      creating.value = true;
      createPhase.value = label;
      try {
        const r = await window.sysApi.baselineCreate(domains);
        if (r.success && r.dir) {
          ElMessage.success(`基线创建完成:${label}`);
          customOpen.value = false;
          await loadList();
          expanded.value = r.dir;
          await openDetail(r.dir);
        } else {
          ElMessage.error(r.error || `基线创建失败(${label}),详见系统日志`);
        }
      } catch (e) {
        ElMessage.error(String(e?.message || e));
      } finally {
        creating.value = false;
      }
    }
    async function toggleDetail(dir) {
      if (expanded.value === dir) {
        expanded.value = "";
        return;
      }
      expanded.value = dir;
      await openDetail(dir);
    }
    async function openDetail(dir) {
      detail.value = null;
      detailError.value = "";
      detailLoading.value = true;
      selectedDomains.value = /* @__PURE__ */ new Set();
      restoreLogs.value = [];
      const seq = ++detailSeq;
      try {
        const r = await window.sysApi.baselineDetail(dir);
        if (seq !== detailSeq || expanded.value !== dir) return;
        if (r.success) {
          detail.value = { score: r.score, details: r.details, fingerprintMatch: r.fingerprintMatch, manifest: r.manifest };
        } else {
          detailError.value = r.error || "详情加载失败";
        }
      } catch (e) {
        if (seq !== detailSeq || expanded.value !== dir) return;
        detailError.value = String(e?.message || e);
      } finally {
        if (seq === detailSeq) detailLoading.value = false;
      }
    }
    const domainStatusList = computed(() => {
      const m = detail.value?.manifest;
      if (!m) return [];
      return Object.entries(m.domains).map(([id, d]) => ({ id, status: d.status }));
    });
    function detailOf(id) {
      return detail.value?.details?.find((x) => x.id === id);
    }
    function statusRowCls(d, dir) {
      if (selectedDomains.value.has(d.id)) return "selected-row";
      if (d.status !== "ok") return "border-white/5 bg-black/20 opacity-60";
      return "border-white/5 bg-black/20 hover:border-white/15";
    }
    function statusIcon(status) {
      return status === "ok" ? "✓" : status === "failed" ? "✗" : "—";
    }
    function toggleSelected(id) {
      const next = new Set(selectedDomains.value);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      selectedDomains.value = next;
    }
    function selectAllOk() {
      selectedDomains.value = new Set(domainStatusList.value.filter((d) => d.status === "ok").map((d) => d.id));
    }
    function customToggle(id) {
      const next = new Set(customSelected.value);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      customSelected.value = next;
    }
    function customAll(v) {
      customSelected.value = new Set(v ? DOMAIN_ORDER : []);
    }
    const kwState = ref(false);
    const kwPayload = ref(null);
    const kwDetail = ref("");
    const kwConsequences = ref([]);
    async function confirmRestore(dir) {
      const ids = [...selectedDomains.value];
      if (ids.length === 0) return;
      const dangerous = ids.filter((id) => DANGEROUS_DOMAINS.has(id));
      const names = dangerous.map((id) => `${id} ${domainName(id)}`).join("、");
      if (dangerous.length) {
        kwPayload.value = { ids, dir };
        kwDetail.value = `以下危险域为注册表类全量证据,恢复需完全手动进行且不可逆:
${names}`;
        kwConsequences.value = ["该域恢复完全手动且不可逆", "恢复前会自动创建系统还原点与当前状态备份"];
        kwState.value = true;
        return;
      }
      try {
        await ElMessageBox.confirm(
          `将按选中的 ${ids.length} 个域执行恢复(D05 服务状态自动恢复,其余域给出手动恢复指引)。确定继续?`,
          "恢复确认",
          { type: "warning", confirmButtonText: "确认恢复", cancelButtonText: "取消" }
        );
      } catch {
        return;
      }
      await doRestore(ids, dir);
    }
    function kwCancel() {
      if (!kwState.value) return;
      kwState.value = false;
    }
    async function kwConfirm() {
      const p = kwPayload.value;
      kwState.value = false;
      if (p) await doRestore(p.ids, p.dir);
    }
    async function doRestore(ids, dir) {
      if (restoring.value || healthRestoring.value) return;
      restoreLogs.value = [];
      restoring.value = true;
      try {
        for (const id of ids) {
          restoreLogs.value.push(`▶ ${id} ${domainName(id)}`);
          const r = await window.sysApi.baselineRestoreDomain(dir, id);
          restoreLogs.value.push(...(r.logs ?? []).map((l) => `  ${l}`));
          if (!r.success) restoreLogs.value.push(`  ⚠ ${r.error || "该域恢复未完成(通常为仅备份证据,需手动恢复)"}`);
        }
        restoreLogs.value.push("══════ 恢复流程结束 ══════");
        ElMessage.info("恢复流程结束,详见日志(多数域为证据型,需按日志指引手动执行)");
      } finally {
        restoring.value = false;
      }
    }
    async function removeBaseline(b) {
      try {
        await ElMessageBox.confirm(
          `确定删除该基线?
${fmtTime(b.createdAt)} · 域 ${b.domainCount} · 目录 ${b.dir}
删除后不可恢复。`,
          "删除基线确认",
          { type: "warning", confirmButtonText: "删除", cancelButtonText: "取消" }
        );
      } catch {
        return;
      }
      const r = await window.sysApi.baselineDelete(b.dir);
      if (r.success) {
        ElMessage.success("基线已删除");
        if (expanded.value === b.dir) expanded.value = "";
        await loadList();
      } else {
        ElMessage.error(r.error || "删除失败");
      }
    }
    function fmtTime(iso) {
      if (!iso) return "未知时间";
      const d = new Date(iso);
      return isNaN(d.getTime()) ? iso : d.toLocaleString();
    }
    function scoreCls(score) {
      if (score === void 0) return "neutral";
      if (score >= 80) return "good";
      if (score >= 50) return "warn";
      return "bad";
    }
    function scoreLabel(score) {
      if (score === void 0) return "不可评";
      if (score >= 80) return "高";
      if (score >= 50) return "中";
      return "低";
    }
    function scoreBarCls(score) {
      if (score === void 0) return "bg-gray-500";
      if (score >= 80) return "bg-green-500";
      if (score >= 50) return "bg-amber-500";
      return "bg-red-500";
    }
    onMounted(loadList);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          _cache[4] || (_cache[4] = createStaticVNode('<div class="page-icon" data-v-f90967ce><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="1.5" data-v-f90967ce><ellipse cx="12" cy="5" rx="9" ry="3" data-v-f90967ce></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" data-v-f90967ce></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" data-v-f90967ce></path></svg></div><div class="page-title-block" data-v-f90967ce><h2 class="page-title" data-v-f90967ce>备份中心</h2><p class="page-desc" data-v-f90967ce>基线快照(23 域) · 系统状态留档 · 可恢复性评分 · 按域恢复</p></div>', 2)),
          createBaseVNode("div", _hoisted_3, [
            backupDir.value ? (openBlock(), createElementBlock("span", _hoisted_4, "默认目录:" + toDisplayString(backupDir.value), 1)) : createCommentVNode("", true),
            createBaseVNode("button", {
              class: "btn-ghost",
              onClick: loadList,
              disabled: busy.value
            }, toDisplayString(busy.value ? "加载中…" : "刷新"), 9, _hoisted_5),
            createBaseVNode("button", {
              class: "btn-primary",
              onClick: createFull,
              disabled: creating.value || healthRestoring.value
            }, toDisplayString(creating.value ? "收集中…" : "新建完整基线"), 9, _hoisted_6)
          ])
        ]),
        createVNode(unref(EmbeddedSection), {
          id: "history",
          title: "操作历史与恢复",
          description: "查看修改结果与实际状态，恢复有完整快照的单次操作"
        }, {
          default: withCtx(() => [
            createVNode(unref(OperationHistoryPanel), { mode: "history" })
          ]),
          _: 1
        }),
        createBaseVNode("div", { class: "glass-card my-4 rounded-xl border border-sky-400/20 bg-sky-400/5 p-4 text-xs text-gray-400" }, [
          createBaseVNode("div", { class: "mb-2 flex items-center justify-between gap-3" }, [
            _cache[5] || (_cache[5] = createBaseVNode("span", { class: "text-sky-300" }, "恢复档案 · 独立于软件安装目录保存", -1)),
            createBaseVNode("button", {
              class: "btn-ghost",
              onClick: openRecoveryFolder
            }, "打开恢复档案")
          ]),
          _cache[6] || (_cache[6] = createTextVNode(" GPU 改名、三档优化、注册表、驱动调校等恢复记录在重装软件后继续读取。旧版备份会自动复制迁移。 重装 Windows 或更换电脑前，请将整个恢复档案文件夹另存到其他磁盘；系统和硬件备份只适用于原来的系统环境。 ", -1))
        ]),
        createVNode(unref(EmbeddedSection), {
          id: "health-recovery",
          title: "体检原值备份",
          description: "按优化批次查看和撤销设置，无需 Windows 系统还原组件",
          "initially-open": ""
        }, {
          default: withCtx(() => [
            createVNode(HealthBackupPanel, {
              disabled: creating.value || restoring.value,
              onBusy: _cache[0] || (_cache[0] = ($event) => healthRestoring.value = $event)
            }, null, 8, ["disabled"])
          ]),
          _: 1
        }),
        createVNode(DriverBackupPanel, {
          disabled: creating.value || restoring.value || healthRestoring.value
        }, null, 8, ["disabled"]),
        createBaseVNode("div", _hoisted_7, [
          createBaseVNode("div", _hoisted_8, [
            _cache[7] || (_cache[7] = createBaseVNode("span", { class: "font-mono text-xs tracking-widest text-gray-400" }, "创建基线", -1)),
            _cache[8] || (_cache[8] = createBaseVNode("span", { class: "font-mono text-[10px] text-gray-500" }, "逐域采集系统状态 → 打包 baseline.zip + manifest.json(全量收集约数分钟)", -1)),
            createBaseVNode("button", {
              class: "btn-ghost ml-auto text-xs",
              onClick: _cache[1] || (_cache[1] = ($event) => customOpen.value = !customOpen.value)
            }, toDisplayString(customOpen.value ? "收起自定义域" : "自定义域…"), 1)
          ]),
          creating.value ? (openBlock(), createElementBlock("div", _hoisted_9, [
            _cache[9] || (_cache[9] = createBaseVNode("span", { class: "spin-dot" }, null, -1)),
            createTextVNode(" 正在收集基线(" + toDisplayString(createPhase.value) + ")…耗时取决于所选域,请勿关闭窗口 ", 1)
          ])) : customOpen.value ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
            createBaseVNode("div", _hoisted_10, [
              createBaseVNode("button", {
                class: "btn-ghost text-xs",
                onClick: _cache[2] || (_cache[2] = ($event) => customAll(true))
              }, "全选"),
              createBaseVNode("button", {
                class: "btn-ghost text-xs",
                onClick: _cache[3] || (_cache[3] = ($event) => customAll(false))
              }, "清空"),
              createBaseVNode("span", _hoisted_11, "已选 " + toDisplayString(customSelected.value.size) + "/23 域", 1)
            ]),
            createBaseVNode("div", _hoisted_12, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(unref(DOMAIN_ORDER), (d) => {
                return openBlock(), createElementBlock("label", {
                  key: d,
                  class: normalizeClass(["flex cursor-pointer items-center gap-2 rounded-lg border border-white/5 bg-black/20 px-2.5 py-1.5 hover:border-white/15", { "selected-row": customSelected.value.has(d) }])
                }, [
                  createBaseVNode("input", {
                    type: "checkbox",
                    class: "check",
                    checked: customSelected.value.has(d),
                    onChange: ($event) => customToggle(d)
                  }, null, 40, _hoisted_13),
                  createBaseVNode("span", _hoisted_14, toDisplayString(d), 1),
                  createBaseVNode("span", _hoisted_15, toDisplayString(domainName(d)), 1)
                ], 2);
              }), 128))
            ]),
            createBaseVNode("div", _hoisted_16, [
              createBaseVNode("button", {
                class: "btn-primary",
                disabled: customSelected.value.size === 0 || healthRestoring.value,
                onClick: createCustom
              }, " 收集所选 " + toDisplayString(customSelected.value.size) + " 个域 ", 9, _hoisted_17)
            ])
          ], 64)) : (openBlock(), createElementBlock("div", _hoisted_18, " 点击「新建完整基线」收集全部 23 域;或展开自定义域选择部分域(D17 可选功能耗时最长) "))
        ]),
        createBaseVNode("div", _hoisted_19, [
          createBaseVNode("div", _hoisted_20, [
            _cache[10] || (_cache[10] = createBaseVNode("span", { class: "font-mono text-xs tracking-widest text-gray-400" }, "基线列表", -1)),
            createBaseVNode("span", _hoisted_21, toDisplayString(baselines.value.length) + " 条(按时间倒序)", 1)
          ]),
          !loaded.value ? (openBlock(), createElementBlock("div", _hoisted_22, "加载中…")) : baselines.value.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_23, " 暂无基线 — 点击上方「新建完整基线」创建第一份系统状态留档 ")) : (openBlock(), createElementBlock("div", _hoisted_24, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(baselines.value, (b) => {
              return openBlock(), createElementBlock("div", {
                key: b.dir,
                class: "rounded-xl border border-white/5 bg-black/20"
              }, [
                createBaseVNode("div", _hoisted_25, [
                  createBaseVNode("span", _hoisted_26, toDisplayString(fmtTime(b.createdAt)), 1),
                  createBaseVNode("span", _hoisted_27, "域 " + toDisplayString(b.domainCount) + " / 成功 " + toDisplayString(b.okCount), 1),
                  createBaseVNode("span", {
                    class: normalizeClass(["score-badge", scoreCls(b.score)])
                  }, [
                    createTextVNode(toDisplayString(b.score === void 0 ? "—" : b.score + "%") + " ", 1),
                    createBaseVNode("span", _hoisted_28, toDisplayString(scoreLabel(b.score)), 1)
                  ], 2),
                  b.fingerprint ? (openBlock(), createElementBlock("span", {
                    key: 0,
                    class: "font-mono text-[10px] text-gray-600",
                    title: "指纹 " + b.fingerprint
                  }, " 指纹 " + toDisplayString(b.fingerprint.slice(0, 8)), 9, _hoisted_29)) : createCommentVNode("", true),
                  createBaseVNode("div", _hoisted_30, [
                    createBaseVNode("button", {
                      class: "btn-ghost text-xs",
                      onClick: ($event) => toggleDetail(b.dir)
                    }, toDisplayString(expanded.value === b.dir ? "收起" : "详情"), 9, _hoisted_31),
                    createBaseVNode("button", {
                      class: "btn-danger text-xs",
                      onClick: ($event) => removeBaseline(b)
                    }, "删除", 8, _hoisted_32)
                  ])
                ]),
                expanded.value === b.dir ? (openBlock(), createElementBlock("div", _hoisted_33, [
                  detailLoading.value ? (openBlock(), createElementBlock("div", _hoisted_34, "详情加载中(指纹评分)…")) : detail.value ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                    createBaseVNode("div", _hoisted_35, [
                      createBaseVNode("div", _hoisted_36, [
                        _cache[11] || (_cache[11] = createBaseVNode("span", { class: "font-mono text-xs tracking-widest text-gray-400" }, "可恢复性评分", -1)),
                        createBaseVNode("span", _hoisted_37, toDisplayString(detail.value.score === void 0 ? "不可评" : detail.value.score + "%") + " · 指纹匹配 " + toDisplayString(detail.value.fingerprintMatch === void 0 ? "—" : Math.round(detail.value.fingerprintMatch * 100) + "%"), 1)
                      ]),
                      createBaseVNode("div", _hoisted_38, [
                        createBaseVNode("div", {
                          class: normalizeClass(["h-full rounded-full transition-all duration-500", scoreBarCls(detail.value.score)]),
                          style: normalizeStyle({ width: (detail.value.score ?? 0) + "%" })
                        }, null, 6)
                      ]),
                      _cache[12] || (_cache[12] = createBaseVNode("div", { class: "mt-1 font-mono text-[10px] text-gray-600" }, " 按当前环境指纹评估:注册表类域(D02/D15/D16/D18/D19)在跨机环境下不可恢复;失败/未收集域同样不计分 ", -1))
                    ]),
                    createBaseVNode("div", _hoisted_39, [
                      createBaseVNode("span", _hoisted_40, "域状态(" + toDisplayString(domainStatusList.value.length) + ")", 1),
                      createBaseVNode("div", _hoisted_41, [
                        createBaseVNode("span", _hoisted_42, "已选 " + toDisplayString(selectedDomains.value.size) + " 域", 1),
                        createBaseVNode("button", {
                          class: "btn-ghost text-xs",
                          disabled: restoring.value,
                          onClick: selectAllOk
                        }, "全选可恢复", 8, _hoisted_43),
                        createBaseVNode("button", {
                          class: "btn-primary text-xs",
                          disabled: restoring.value || healthRestoring.value || selectedDomains.value.size === 0,
                          onClick: ($event) => confirmRestore(b.dir)
                        }, toDisplayString(restoring.value ? "恢复中…" : `恢复选中 ${selectedDomains.value.size} 域`), 9, _hoisted_44)
                      ])
                    ]),
                    createBaseVNode("div", _hoisted_45, [
                      (openBlock(true), createElementBlock(Fragment, null, renderList(domainStatusList.value, (d) => {
                        return openBlock(), createElementBlock("label", {
                          key: d.id,
                          class: normalizeClass(["flex cursor-pointer items-center gap-2 rounded-lg border px-2.5 py-1.5 transition-colors", statusRowCls(d, b.dir)]),
                          title: detailOf(d.id)?.reason
                        }, [
                          createBaseVNode("input", {
                            type: "checkbox",
                            class: "check",
                            checked: selectedDomains.value.has(d.id),
                            disabled: restoring.value || d.status !== "ok",
                            onChange: ($event) => toggleSelected(d.id)
                          }, null, 40, _hoisted_47),
                          createBaseVNode("span", {
                            class: normalizeClass(["status-icon", d.status])
                          }, toDisplayString(statusIcon(d.status)), 3),
                          createBaseVNode("span", _hoisted_48, toDisplayString(d.id), 1),
                          createBaseVNode("span", _hoisted_49, toDisplayString(domainName(d.id)), 1),
                          detailOf(d.id) && !detailOf(d.id).restorable ? (openBlock(), createElementBlock("span", _hoisted_50, "不可恢复")) : createCommentVNode("", true)
                        ], 10, _hoisted_46);
                      }), 128))
                    ]),
                    _cache[14] || (_cache[14] = createBaseVNode("div", { class: "mt-2 font-mono text-[10px] text-gray-600" }, " ✓ 收集成功 · ✗ 收集失败 · — 未收集;域产物打包于 baseline.zip,此处以 manifest 记录状态为准。 D05 服务状态可自动恢复,其余域为备份证据(恢复提示手动步骤)。 ", -1)),
                    restoreLogs.value.length ? (openBlock(), createElementBlock("div", _hoisted_51, [
                      _cache[13] || (_cache[13] = createBaseVNode("div", { class: "mb-1 font-mono text-[10px] tracking-widest text-gray-500" }, "恢复日志", -1)),
                      createBaseVNode("div", _hoisted_52, [
                        (openBlock(true), createElementBlock(Fragment, null, renderList(restoreLogs.value, (l, i) => {
                          return openBlock(), createElementBlock("div", {
                            key: i,
                            class: "font-mono text-[11px] text-gray-400"
                          }, toDisplayString(l), 1);
                        }), 128))
                      ])
                    ])) : createCommentVNode("", true)
                  ], 64)) : (openBlock(), createElementBlock("div", _hoisted_53, toDisplayString(detailError.value), 1))
                ])) : createCommentVNode("", true)
              ]);
            }), 128))
          ]))
        ]),
        createVNode(KeywordConfirm, {
          visible: kwState.value,
          title: "危险域恢复确认",
          detail: kwDetail.value,
          consequences: kwConsequences.value,
          keyword: "确认恢复",
          onConfirm: kwConfirm,
          onCancel: kwCancel
        }, null, 8, ["visible", "detail", "consequences"])
      ]);
    };
  }
});
const BackupCenter = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f90967ce"]]);
export {
  BackupCenter as default
};
