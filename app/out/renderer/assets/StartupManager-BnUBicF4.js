import { t as defineComponent, aD as watch, a1 as onMounted, l as createElementBlock, i as createBaseVNode, p as createStaticVNode, k as createCommentVNode, q as createTextVNode, ak as toDisplayString, aG as withDirectives, aA as vModelText, S as normalizeClass, F as Fragment, ab as renderList, r as createVNode, a9 as ref, g as computed, ad as resolveComponent, a5 as openBlock, aF as withCtx, aI as withModifiers, j as createBlock, R as nextTick, _ as _export_sfc } from "./main-DAqTdO6U.js";
import { d as ElMessage, e as ElMessageBox } from "./index-CL4m76NE.js";
import { S as StatusDot } from "./StatusDot-C-XeYEe8.js";
import { K as KeywordConfirm } from "./KeywordConfirm-CUMT0nLF.js";
const _hoisted_1 = { class: "page startup-page" };
const _hoisted_2 = { class: "page-header" };
const _hoisted_3 = { class: "page-actions" };
const _hoisted_4 = ["disabled"];
const _hoisted_5 = {
  key: 0,
  class: "spin-dot"
};
const _hoisted_6 = ["disabled"];
const _hoisted_7 = ["disabled"];
const _hoisted_8 = { class: "glass-card rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl" };
const _hoisted_9 = { class: "flex flex-wrap items-center gap-x-6 gap-y-3" };
const _hoisted_10 = { class: "stat-block" };
const _hoisted_11 = { class: "stat-num" };
const _hoisted_12 = { class: "stat-block" };
const _hoisted_13 = { class: "stat-num text-green-400" };
const _hoisted_14 = { class: "stat-block" };
const _hoisted_15 = { class: "stat-num text-red-400" };
const _hoisted_16 = { class: "mt-3 flex flex-wrap items-center gap-2" };
const _hoisted_17 = {
  key: 0,
  class: "scan-notice",
  role: "status"
};
const _hoisted_18 = { class: "glass-card mt-4 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl" };
const _hoisted_19 = { class: "mb-3 flex items-center justify-between border-b border-white/10 pb-2" };
const _hoisted_20 = { class: "font-mono text-[10px] text-gray-500" };
const _hoisted_21 = {
  key: 0,
  class: "scan-loading"
};
const _hoisted_22 = {
  key: 1,
  class: "font-mono text-xs text-red-400"
};
const _hoisted_23 = {
  key: 2,
  class: "font-mono text-xs text-gray-500"
};
const _hoisted_24 = {
  key: 3,
  class: "font-mono text-xs text-gray-500"
};
const _hoisted_25 = {
  key: 4,
  class: "flex flex-col gap-2"
};
const _hoisted_26 = { class: "flex flex-wrap items-center gap-2" };
const _hoisted_27 = ["title"];
const _hoisted_28 = {
  key: 0,
  class: "hive-tag",
  title: "注册表位置"
};
const _hoisted_29 = ["title"];
const _hoisted_30 = {
  key: 1,
  class: "protect-mark",
  title: "受保护项:系统或安全软件启动项,操作需强确认"
};
const _hoisted_31 = {
  key: 2,
  class: "wl-tag",
  title: "白名单项:可被「一键禁用白名单项」批量禁用"
};
const _hoisted_32 = {
  key: 0,
  class: "task-facts"
};
const _hoisted_33 = { class: "flex items-center gap-3" };
const _hoisted_34 = ["title"];
const _hoisted_35 = ["title"];
const _hoisted_36 = ["checked", "disabled", "onChange"];
const _hoisted_37 = {
  key: 0,
  class: "flex justify-center items-center gap-3"
};
const _hoisted_38 = ["disabled"];
const _hoisted_39 = { class: "task-facts" };
const _hoisted_40 = ["disabled"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "StartupManager",
  setup(__props) {
    const items = ref([]);
    const loaded = ref(false);
    const scanning = ref(false);
    const refreshing = ref(false);
    const error = ref("");
    const warnings = ref([]);
    const cancelling = ref(false);
    const search = ref("");
    const sourceFilter = ref("all");
    const stateFilter = ref("all");
    const page = ref(1);
    watch([search, sourceFilter, stateFilter, items], () => {
      page.value = 1;
    });
    const busyIds = ref(/* @__PURE__ */ new Set());
    const opBusy = ref(false);
    async function refresh() {
      if (scanning.value || opBusy.value || busyIds.value.size) return;
      scanning.value = true;
      refreshing.value = items.value.length > 0;
      try {
        const r = await window.sysApi.startupScan();
        warnings.value = r.warnings ?? [];
        if (r.items) items.value = r.items;
        error.value = r.error || (!r.success ? "扫描未完成" : "");
      } catch (e) {
        error.value = String(e?.message || e) + (items.value.length ? "（仍显示上次结果）" : "");
      } finally {
        cancelling.value = false;
        scanning.value = false;
        refreshing.value = false;
        loaded.value = true;
      }
    }
    async function cancelScan() {
      cancelling.value = true;
      try {
        await window.sysApi.startupCancel();
      } catch (e) {
        cancelling.value = false;
        ElMessage.error(String(e));
      }
    }
    const stats = computed(() => ({
      total: items.value.length,
      disabled: items.value.filter((i) => i.state === "disabled").length,
      high: items.value.filter((i) => i.impact === "high").length
    }));
    const filteredItems = computed(() => {
      const q = search.value.trim().toLowerCase();
      return items.value.filter((it) => {
        if (sourceFilter.value === "registry") {
          if (it.source !== "run" && it.source !== "runonce") return false;
        } else if (sourceFilter.value !== "all" && it.source !== sourceFilter.value) {
          return false;
        }
        if (stateFilter.value === "enabled" && it.state !== "enabled") return false;
        if (stateFilter.value === "disabled" && it.state !== "disabled") return false;
        if (q) {
          const hay = (it.name + " " + (it.command || "")).toLowerCase();
          if (!hay.includes(q)) return false;
        }
        return true;
      });
    });
    const visibleItems = computed(() => filteredItems.value.slice((page.value - 1) * 40, page.value * 40));
    function sourceLabel(s) {
      if (s === "run" || s === "runonce") return "注册表";
      if (s === "startup-folder") return "启动文件夹";
      return "计划任务";
    }
    function sigLabel(s) {
      return s === "valid" ? "✓ 有效" : s === "invalid" ? "✗ 无效" : s === "none" ? "— 无签名" : "待核实";
    }
    function sigTitle(item) {
      if (item.signature === "valid" || item.signature === "invalid") return `签名:${item.publisher || "未知发布者"}`;
      return item.signature === "none" ? "已查询：无数字签名；不等同于恶意程序" : "未能核实文件签名（文件不可访问、未支持、读取失败或已取消）";
    }
    function impactLabel(i) {
      return i === "high" ? "高" : i === "medium" ? "中" : "低";
    }
    function switchTitle(item) {
      if (item.source === "runonce") return "RunOnce 一次性项,不支持切换(只能删除)";
      if (item.state === "unknown") return "状态未核实，可能没有 StartupApproved 记录；不能据此认定启用或禁用";
      return item.state === "disabled" ? "当前禁用,点击启用" : "当前启用,点击禁用";
    }
    async function confirmBox(text, title = "操作确认") {
      try {
        await ElMessageBox.confirm(text, title, { type: "warning", confirmButtonText: "确定", cancelButtonText: "取消" });
        return true;
      } catch {
        return false;
      }
    }
    function syncCheckbox(el, item) {
      if (!el) return;
      const on = item.state !== "disabled";
      nextTick(() => {
        if (el.checked !== on) el.checked = on;
      });
    }
    function ipcItem(item) {
      return { ...item, triggers: item.triggers ? [...item.triggers] : void 0 };
    }
    async function onToggle(item, e) {
      if (busyIds.value.has(item.id) || scanning.value || item.source === "runonce") return;
      const el = e?.target instanceof HTMLInputElement ? e.target : null;
      const enabled = el ? el.checked : item.state !== "disabled";
      if (item.protected) {
        const ok = await confirmBox(
          `「${item.name}」为受保护项(系统或安全软件启动项)。
确定${enabled ? "启用" : "禁用"}?`,
          "受保护项确认"
        );
        if (!ok) {
          syncCheckbox(el, item);
          return;
        }
      }
      busyIds.value.add(item.id);
      try {
        const r = await window.sysApi.startupToggle(ipcItem(item), enabled);
        if (r.success && r.state) {
          item.state = r.state;
          ElMessage.success(enabled ? `已启用「${item.name}」` : `已禁用「${item.name}」`);
        } else {
          ElMessage.error(r.error || "切换失败");
        }
      } catch (err) {
        ElMessage.error(String(err?.message || err));
      } finally {
        busyIds.value.delete(item.id);
        await refresh();
        const fresh = items.value.find((i) => i.id === item.id);
        syncCheckbox(el, fresh ?? item);
      }
    }
    async function onMenu(item, cmd) {
      if (cmd === "delay") await onDelay(item);
      else if (cmd === "delete") await onDelete(item);
    }
    async function onDelay(item) {
      let value;
      try {
        const res = await ElMessageBox.prompt(
          "输入延迟秒数,将注册为计划任务(登录后按秒数延迟启动,向上取整到分钟)。\n原 Run 项会被移除,任务可在此列表「计划任务」中管理。",
          `延迟启动:${item.name}`,
          {
            confirmButtonText: "确认延迟",
            cancelButtonText: "取消",
            inputPattern: /^[1-9]\d*$/,
            inputErrorMessage: "请输入正整数秒数",
            inputPlaceholder: "例如 300 = 5 分钟后启动"
          }
        );
        value = res.value;
      } catch {
        return;
      }
      const secs = Number(value);
      if (!secs) return;
      try {
        const r = await window.sysApi.startupDelay(ipcItem(item), secs);
        if (r.success) {
          ElMessage.success(r.message || `已为「${item.name}」注册延迟启动(${secs} 秒)`);
          refresh();
        } else {
          ElMessage.error(r.error || "延迟启动失败");
        }
      } catch (e) {
        ElMessage.error(String(e?.message || e));
      }
    }
    const kwState = ref(false);
    const kwPayload = ref(null);
    const kwDetail = ref("");
    const kwConsequences = ref([]);
    function onDelete(item) {
      kwPayload.value = item;
      kwDetail.value = `确定删除启动项「${item.name}」?`;
      kwConsequences.value = ["将删除该启动项,且不可恢复"];
      if (item.source === "task") kwConsequences.value.push("若为计划任务将同时删除");
      kwState.value = true;
    }
    function kwCancel() {
      if (!kwState.value) return;
      kwState.value = false;
    }
    async function kwConfirm() {
      const item = kwPayload.value;
      kwState.value = false;
      if (!item) return;
      try {
        const r = await window.sysApi.startupDelete(ipcItem(item));
        if (r.success) {
          ElMessage.success(`已删除「${item.name}」`);
          refresh();
        } else {
          ElMessage.error(r.error || "删除失败");
        }
      } catch (e) {
        ElMessage.error(String(e?.message || e));
      }
    }
    async function onWhitelistDisable() {
      const targets = items.value.filter((i) => i.whitelisted && !i.protected && i.state !== "disabled" && i.source !== "runonce");
      if (targets.length === 0) {
        ElMessage.info("没有已启用的白名单项");
        return;
      }
      const names = targets.map((t) => t.name).slice(0, 8).join("\n");
      const ok = await confirmBox(
        `将一键禁用 ${targets.length} 个白名单启动项(预装/非必要项):
${names}${targets.length > 8 ? "\n…" : ""}

确定继续?`,
        "一键禁用白名单项"
      );
      if (!ok) return;
      opBusy.value = true;
      try {
        const r = await window.sysApi.startupWhitelistDisable(targets.map((t) => t.id));
        if (r.success) {
          if (r.errors?.length) {
            ElMessage.warning(`已禁用 ${r.disabled ?? 0} 项,${r.errors.length} 项失败:${r.errors[0]}`);
          } else if (r.disabled) {
            ElMessage.success(`已禁用 ${r.disabled} 个白名单启动项`);
          } else {
            ElMessage.info("没有需要禁用的白名单项");
          }
        } else {
          ElMessage.error(r.error || "批量禁用失败");
        }
      } catch (e) {
        ElMessage.error(String(e?.message || e));
      } finally {
        opBusy.value = false;
        refresh();
      }
    }
    onMounted(refresh);
    return (_ctx, _cache) => {
      const _component_el_dropdown_item = resolveComponent("el-dropdown-item");
      const _component_el_dropdown_menu = resolveComponent("el-dropdown-menu");
      const _component_el_dropdown = resolveComponent("el-dropdown");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          _cache[14] || (_cache[14] = createStaticVNode('<div class="page-icon" data-v-45c6b795><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="1.5" data-v-45c6b795><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" data-v-45c6b795></path></svg></div><div class="page-title-block" data-v-45c6b795><h2 class="page-title" data-v-45c6b795>启动项管理</h2><p class="page-desc" data-v-45c6b795>注册表 Run/RunOnce · 启动文件夹 · 计划任务 · 签名校验与关注提示</p></div>', 2)),
          createBaseVNode("div", _hoisted_3, [
            _cache[13] || (_cache[13] = createBaseVNode("span", { class: "page-hint" }, "操作后自动重扫；签名与状态未核实的条目会明确标出", -1)),
            createBaseVNode("button", {
              class: "btn-ghost",
              onClick: _cache[0] || (_cache[0] = ($event) => refresh()),
              disabled: scanning.value
            }, [
              refreshing.value ? (openBlock(), createElementBlock("span", _hoisted_5)) : createCommentVNode("", true),
              createTextVNode(toDisplayString(refreshing.value ? "扫描中…" : "刷新"), 1)
            ], 8, _hoisted_4),
            scanning.value ? (openBlock(), createElementBlock("button", {
              key: 0,
              class: "btn-ghost",
              onClick: cancelScan,
              disabled: cancelling.value
            }, toDisplayString(cancelling.value ? "正在取消…" : "取消扫描"), 9, _hoisted_6)) : createCommentVNode("", true),
            createBaseVNode("button", {
              class: "btn-warn",
              onClick: onWhitelistDisable,
              disabled: scanning.value || opBusy.value
            }, " 一键禁用白名单项 ", 8, _hoisted_7)
          ])
        ]),
        createBaseVNode("div", _hoisted_8, [
          createBaseVNode("div", _hoisted_9, [
            createBaseVNode("div", _hoisted_10, [
              createBaseVNode("span", _hoisted_11, toDisplayString(stats.value.total), 1),
              _cache[15] || (_cache[15] = createBaseVNode("span", { class: "stat-label" }, "条目总数", -1))
            ]),
            createBaseVNode("div", _hoisted_12, [
              createBaseVNode("span", _hoisted_13, toDisplayString(stats.value.disabled), 1),
              _cache[16] || (_cache[16] = createBaseVNode("span", { class: "stat-label" }, "已禁用", -1))
            ]),
            createBaseVNode("div", _hoisted_14, [
              createBaseVNode("span", _hoisted_15, toDisplayString(stats.value.high), 1),
              _cache[17] || (_cache[17] = createBaseVNode("span", { class: "stat-label" }, "需关注项", -1))
            ]),
            _cache[18] || (_cache[18] = createBaseVNode("div", { class: "h-6 w-px bg-white/10" }, null, -1)),
            withDirectives(createBaseVNode("input", {
              class: "search-input",
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => search.value = $event),
              placeholder: "搜索名称或命令…"
            }, null, 512), [
              [vModelText, search.value]
            ])
          ]),
          createBaseVNode("div", _hoisted_16, [
            _cache[19] || (_cache[19] = createBaseVNode("span", { class: "filter-label" }, "来源", -1)),
            createBaseVNode("button", {
              class: normalizeClass(["chip", { on: sourceFilter.value === "all" }]),
              onClick: _cache[2] || (_cache[2] = ($event) => sourceFilter.value = "all")
            }, "全部", 2),
            createBaseVNode("button", {
              class: normalizeClass(["chip", { on: sourceFilter.value === "registry" }]),
              onClick: _cache[3] || (_cache[3] = ($event) => sourceFilter.value = "registry")
            }, "注册表", 2),
            createBaseVNode("button", {
              class: normalizeClass(["chip", { on: sourceFilter.value === "startup-folder" }]),
              onClick: _cache[4] || (_cache[4] = ($event) => sourceFilter.value = "startup-folder")
            }, "启动文件夹", 2),
            createBaseVNode("button", {
              class: normalizeClass(["chip", { on: sourceFilter.value === "task" }]),
              onClick: _cache[5] || (_cache[5] = ($event) => sourceFilter.value = "task")
            }, "计划任务", 2),
            _cache[20] || (_cache[20] = createBaseVNode("span", { class: "filter-label ml-4" }, "状态", -1)),
            createBaseVNode("button", {
              class: normalizeClass(["chip", { on: stateFilter.value === "all" }]),
              onClick: _cache[6] || (_cache[6] = ($event) => stateFilter.value = "all")
            }, "全部", 2),
            createBaseVNode("button", {
              class: normalizeClass(["chip", { on: stateFilter.value === "enabled" }]),
              onClick: _cache[7] || (_cache[7] = ($event) => stateFilter.value = "enabled")
            }, "启用", 2),
            createBaseVNode("button", {
              class: normalizeClass(["chip", { on: stateFilter.value === "disabled" }]),
              onClick: _cache[8] || (_cache[8] = ($event) => stateFilter.value = "disabled")
            }, "禁用", 2)
          ])
        ]),
        warnings.value.length || error.value ? (openBlock(), createElementBlock("div", _hoisted_17, [
          createBaseVNode("strong", null, toDisplayString(error.value || "部分信息未能核实，以下结果仍可查看"), 1),
          (openBlock(true), createElementBlock(Fragment, null, renderList(warnings.value, (warning, i) => {
            return openBlock(), createElementBlock("div", { key: i }, toDisplayString(warning), 1);
          }), 128))
        ])) : createCommentVNode("", true),
        _cache[26] || (_cache[26] = createBaseVNode("p", { class: "task-facts mt-3" }, "计划任务也包含定时维护项目，请结合触发条件判断；签名与关注提示不代表实际开机耗时或恶意程序判定。", -1)),
        createBaseVNode("div", _hoisted_18, [
          createBaseVNode("div", _hoisted_19, [
            _cache[21] || (_cache[21] = createBaseVNode("span", { class: "font-mono text-xs tracking-widest text-gray-400" }, "启动项列表", -1)),
            createBaseVNode("span", _hoisted_20, [
              createTextVNode(toDisplayString(filteredItems.value.length) + "/" + toDisplayString(items.value.length) + " 条 ", 1),
              scanning.value ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                createTextVNode(" · 扫描中…")
              ], 64)) : createCommentVNode("", true)
            ])
          ]),
          !loaded.value ? (openBlock(), createElementBlock("div", _hoisted_21, [..._cache[22] || (_cache[22] = [
            createBaseVNode("div", { class: "spin-dot lg" }, null, -1),
            createBaseVNode("div", { class: "font-mono text-xs text-gray-400" }, "正在读取注册表、启动文件夹与计划任务，并核实文件签名…", -1)
          ])])) : error.value && items.value.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_22, [
            createTextVNode(toDisplayString(error.value) + " ", 1),
            createBaseVNode("button", {
              class: "btn-ghost ml-3 text-xs",
              onClick: _cache[9] || (_cache[9] = ($event) => refresh())
            }, "重试")
          ])) : items.value.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_23, toDisplayString(warnings.value.length ? "部分来源没有返回条目，不能据此认定没有启动项" : "本次完整查询没有返回启动项"), 1)) : filteredItems.value.length === 0 ? (openBlock(), createElementBlock("div", _hoisted_24, " 没有符合筛选条件的启动项 ")) : (openBlock(), createElementBlock("div", _hoisted_25, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(visibleItems.value, (item) => {
              return openBlock(), createElementBlock("div", {
                key: item.id,
                class: normalizeClass(["item-row", { dim: item.state === "disabled" }])
              }, [
                createBaseVNode("div", _hoisted_26, [
                  createBaseVNode("span", {
                    class: "item-name",
                    title: item.name
                  }, toDisplayString(item.name), 9, _hoisted_27),
                  createVNode(StatusDot, {
                    size: 7,
                    status: item.state === "enabled" ? "done" : "idle",
                    label: item.state === "enabled" ? "已启用" : item.state === "unknown" ? "状态未知" : "已禁用"
                  }, null, 8, ["status", "label"]),
                  createBaseVNode("span", {
                    class: normalizeClass(["source-badge", item.source])
                  }, toDisplayString(sourceLabel(item.source)), 3),
                  item.hive && item.source !== "startup-folder" ? (openBlock(), createElementBlock("span", _hoisted_28, toDisplayString(item.hive) + " / " + toDisplayString(item.bitness) + "位 ", 1)) : createCommentVNode("", true),
                  createBaseVNode("span", {
                    class: normalizeClass(["sig-badge", item.signature]),
                    title: sigTitle(item)
                  }, toDisplayString(sigLabel(item.signature)), 11, _hoisted_29),
                  createBaseVNode("span", {
                    class: normalizeClass(["impact-badge", item.impact])
                  }, toDisplayString(impactLabel(item.impact)), 3),
                  item.protected ? (openBlock(), createElementBlock("span", _hoisted_30, "⛨ 受保护")) : createCommentVNode("", true),
                  item.whitelisted ? (openBlock(), createElementBlock("span", _hoisted_31, "白名单")) : createCommentVNode("", true)
                ]),
                item.source === "task" ? (openBlock(), createElementBlock("div", _hoisted_32, " 触发：" + toDisplayString(item.triggers?.join("、") || "未配置或未读取") + " · 运行身份：" + toDisplayString(item.principal || "未读取"), 1)) : createCommentVNode("", true),
                createBaseVNode("div", _hoisted_33, [
                  createBaseVNode("span", {
                    class: "item-cmd",
                    title: item.command
                  }, toDisplayString(item.command || "(无命令)"), 9, _hoisted_34),
                  createBaseVNode("label", {
                    class: normalizeClass(["toggle-switch", { loading: busyIds.value.has(item.id), unknown: item.state === "unknown" }]),
                    title: switchTitle(item)
                  }, [
                    createBaseVNode("input", {
                      type: "checkbox",
                      checked: item.state !== "disabled",
                      disabled: busyIds.value.has(item.id) || scanning.value || item.source === "runonce",
                      onChange: ($event) => onToggle(item, $event)
                    }, null, 40, _hoisted_36),
                    _cache[23] || (_cache[23] = createBaseVNode("span", { class: "toggle-slider" }, null, -1))
                  ], 10, _hoisted_35),
                  createVNode(_component_el_dropdown, {
                    trigger: "click",
                    "popper-class": "cyber-popper",
                    onCommand: (c) => onMenu(item, String(c))
                  }, {
                    dropdown: withCtx(() => [
                      createVNode(_component_el_dropdown_menu, null, {
                        default: withCtx(() => [
                          item.source === "run" ? (openBlock(), createBlock(_component_el_dropdown_item, {
                            key: 0,
                            command: "delay",
                            disabled: scanning.value
                          }, {
                            default: withCtx(() => [..._cache[24] || (_cache[24] = [
                              createTextVNode("延迟启动…", -1)
                            ])]),
                            _: 1
                          }, 8, ["disabled"])) : createCommentVNode("", true),
                          createVNode(_component_el_dropdown_item, {
                            command: "delete",
                            disabled: scanning.value
                          }, {
                            default: withCtx(() => [..._cache[25] || (_cache[25] = [
                              createTextVNode("删除", -1)
                            ])]),
                            _: 1
                          }, 8, ["disabled"])
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    default: withCtx(() => [
                      createBaseVNode("button", {
                        class: "menu-btn",
                        onClick: _cache[10] || (_cache[10] = withModifiers(() => {
                        }, ["stop"])),
                        title: "操作菜单"
                      }, "···")
                    ]),
                    _: 2
                  }, 1032, ["onCommand"])
                ])
              ], 2);
            }), 128)),
            filteredItems.value.length > 40 ? (openBlock(), createElementBlock("div", _hoisted_37, [
              createBaseVNode("button", {
                class: "btn-ghost",
                disabled: page.value <= 1,
                onClick: _cache[11] || (_cache[11] = ($event) => page.value--)
              }, "上一页", 8, _hoisted_38),
              createBaseVNode("span", _hoisted_39, toDisplayString(page.value) + " / " + toDisplayString(Math.ceil(filteredItems.value.length / 40)), 1),
              createBaseVNode("button", {
                class: "btn-ghost",
                disabled: page.value * 40 >= filteredItems.value.length,
                onClick: _cache[12] || (_cache[12] = ($event) => page.value++)
              }, "下一页", 8, _hoisted_40)
            ])) : createCommentVNode("", true)
          ]))
        ]),
        createVNode(KeywordConfirm, {
          visible: kwState.value,
          title: "删除确认",
          detail: kwDetail.value,
          consequences: kwConsequences.value,
          keyword: "删除",
          onConfirm: kwConfirm,
          onCancel: kwCancel
        }, null, 8, ["visible", "detail", "consequences"])
      ]);
    };
  }
});
const StartupManager = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-45c6b795"]]);
export {
  StartupManager as default
};
