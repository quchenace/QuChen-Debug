import { t as defineComponent, aD as watch, a1 as onMounted, a3 as onUnmounted, l as createElementBlock, i as createBaseVNode, r as createVNode, aF as withCtx, as as unref, F as Fragment, ak as toDisplayString, k as createCommentVNode, q as createTextVNode, ab as renderList, j as createBlock, aG as withDirectives, az as vModelSelect, aI as withModifiers, aA as vModelText, a9 as ref, ad as resolveComponent, a5 as openBlock } from "./main-DAqTdO6U.js";
import { x as useCommunityAccount, n as communityApi, p as communityError, q as communityKindLabel, r as communityKinds, o as communityDate, b as ElDialog } from "./index-CL4m76NE.js";
import { C as CommunityPresetPreview } from "./CommunityPresetPreview-BYw6-IhH.js";
/* empty css                   */
import "./lutMath-Du8bBTzw.js";
import "./fpsPlan-BV2AClQh.js";
import "./LegacyCrosshairPreview-DwpWYNlI.js";
const _hoisted_1 = { class: "community-page" };
const _hoisted_2 = { class: "community-heading" };
const _hoisted_3 = {
  key: 0,
  class: "community-empty"
};
const _hoisted_4 = {
  key: 0,
  class: "community-result",
  role: "status"
};
const _hoisted_5 = ["disabled"];
const _hoisted_6 = {
  key: 1,
  class: "community-recoveries"
};
const _hoisted_7 = {
  key: 0,
  class: "community-alert",
  role: "alert"
};
const _hoisted_8 = ["disabled", "onClick"];
const _hoisted_9 = {
  key: 2,
  class: "community-notice",
  role: "status"
};
const _hoisted_10 = {
  key: 3,
  class: "community-alert",
  role: "alert"
};
const _hoisted_11 = { class: "community-toolbar" };
const _hoisted_12 = { class: "community-select-label" };
const _hoisted_13 = ["value"];
const _hoisted_14 = ["disabled"];
const _hoisted_15 = {
  key: 4,
  class: "community-empty",
  role: "status"
};
const _hoisted_16 = {
  key: 5,
  class: "community-grid"
};
const _hoisted_17 = { class: "community-card-copy" };
const _hoisted_18 = { class: "community-tag" };
const _hoisted_19 = { class: "community-card-meta" };
const _hoisted_20 = { class: "community-actions" };
const _hoisted_21 = ["disabled", "onClick"];
const _hoisted_22 = ["disabled", "onClick"];
const _hoisted_23 = ["disabled", "onClick"];
const _hoisted_24 = {
  key: 0,
  class: "community-muted"
};
const _hoisted_25 = {
  key: 6,
  class: "community-empty"
};
const _hoisted_26 = {
  key: 7,
  class: "community-pagination",
  "aria-label": "我的方案分页"
};
const _hoisted_27 = ["disabled"];
const _hoisted_28 = ["disabled"];
const _hoisted_29 = {
  key: 0,
  class: "community-warning"
};
const _hoisted_30 = {
  key: 1,
  role: "status"
};
const _hoisted_31 = {
  key: 2,
  class: "community-alert",
  role: "alert"
};
const _hoisted_32 = { class: "community-impact-list" };
const _hoisted_33 = {
  key: 0,
  class: "community-warning"
};
const _hoisted_34 = {
  key: 1,
  class: "community-warning"
};
const _hoisted_35 = { class: "community-actions" };
const _hoisted_36 = ["disabled"];
const _hoisted_37 = ["disabled"];
const _hoisted_38 = { class: "community-actions" };
const _hoisted_39 = ["disabled"];
const _hoisted_40 = ["disabled"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "MyPlans",
  setup(__props) {
    const { user, accountEpoch, refreshAccount } = useCommunityAccount();
    const rows = ref([]), loading = ref(false), busy = ref(false), error = ref(""), notice = ref("");
    const eqImported = ref(false);
    const query = ref(""), kind = ref(""), page = ref(1), totalPages = ref(0);
    const selected = ref(null), preview = ref(null), previewOpen = ref(false), previewLoading = ref(false), previewError = ref(""), isAdmin = ref(false);
    const result = ref(null), removeTarget = ref(null), removeOpen = ref(false);
    const recoveries = ref([]), recoveryError = ref("");
    let active = true, listRequest = 0, previewRequest = 0, recoveryRequest = 0;
    const current = (epoch) => active && accountEpoch.value === epoch && !!user.value;
    async function loadRecoveries() {
      const epoch = accountEpoch.value, request = ++recoveryRequest;
      if (!user.value) return;
      try {
        const response = await communityApi().recoveryList();
        if (request === recoveryRequest && current(epoch)) {
          recoveries.value = response;
          recoveryError.value = "";
        }
      } catch (err) {
        if (request === recoveryRequest && current(epoch)) recoveryError.value = communityError(err);
      }
    }
    async function load() {
      const request = ++listRequest, epoch = accountEpoch.value;
      rows.value = [];
      error.value = "";
      loading.value = false;
      if (!user.value) return;
      loading.value = true;
      try {
        const response = await communityApi().library({ kind: kind.value || void 0, q: query.value.trim(), page: page.value });
        if (request === listRequest && current(epoch)) {
          rows.value = response.list;
          totalPages.value = response.totalPages;
        }
      } catch (err) {
        if (request === listRequest && current(epoch)) error.value = communityError(err);
      } finally {
        if (request === listRequest && current(epoch)) loading.value = false;
      }
    }
    function search() {
      page.value = 1;
      void load();
    }
    function paginate(next) {
      page.value = next;
      void load();
    }
    watch(kind, search);
    async function importEq(row) {
      if (busy.value || row.plan.kind !== "eq") return;
      const epoch = accountEpoch.value;
      busy.value = true;
      error.value = "";
      notice.value = "";
      eqImported.value = false;
      try {
        const imported = await communityApi().importSavedEq(row.id);
        if (current(epoch)) {
          notice.value = imported.message;
          eqImported.value = true;
        }
      } catch (err) {
        if (current(epoch)) error.value = communityError(err);
      } finally {
        if (current(epoch)) busy.value = false;
      }
    }
    async function openPreview(row) {
      if (busy.value) return;
      const request = ++previewRequest, epoch = accountEpoch.value;
      selected.value = row;
      preview.value = null;
      previewOpen.value = true;
      previewLoading.value = true;
      previewError.value = "";
      isAdmin.value = false;
      try {
        const response = await communityApi().previewSaved(row.id);
        const elevated = response.requiresAdmin ? await window.sysApi?.isAdmin?.().catch(() => false) : true;
        if (request === previewRequest && current(epoch)) {
          preview.value = response;
          isAdmin.value = elevated === true;
        }
      } catch (err) {
        if (request === previewRequest && current(epoch)) previewError.value = communityError(err);
      } finally {
        if (request === previewRequest && current(epoch)) previewLoading.value = false;
      }
    }
    watch(previewOpen, (open) => {
      if (!open) {
        previewRequest++;
        selected.value = null;
        preview.value = null;
        previewError.value = "";
      }
    });
    async function apply() {
      if (!selected.value || !preview.value || busy.value || preview.value.requiresAdmin && !isAdmin.value) return;
      const epoch = accountEpoch.value, id = selected.value.id, fingerprint = preview.value.fingerprint;
      busy.value = true;
      previewError.value = "";
      result.value = null;
      try {
        const applied = await communityApi().applySaved(id, fingerprint);
        if (current(epoch)) {
          result.value = applied;
          previewOpen.value = false;
          void loadRecoveries();
        }
      } catch (err) {
        if (current(epoch)) {
          previewError.value = communityError(err);
          preview.value = null;
          void loadRecoveries();
        }
      } finally {
        if (current(epoch)) busy.value = false;
      }
    }
    async function restore(id) {
      if (!id || busy.value) return;
      const epoch = accountEpoch.value;
      busy.value = true;
      error.value = "";
      try {
        const restored = await communityApi().restoreApplication(id);
        if (current(epoch)) {
          if (result.value?.restoreId === id) result.value = { message: restored.message };
          else notice.value = restored.message;
          recoveries.value = recoveries.value.filter((row) => row.id !== id);
          void loadRecoveries();
        }
      } catch (err) {
        if (current(epoch)) error.value = communityError(err);
      } finally {
        if (current(epoch)) busy.value = false;
      }
    }
    function askRemove(row) {
      removeTarget.value = row;
      removeOpen.value = true;
    }
    async function remove() {
      if (!removeTarget.value || busy.value) return;
      const epoch = accountEpoch.value, id = removeTarget.value.id;
      busy.value = true;
      error.value = "";
      try {
        await communityApi().removeSaved(id);
        if (current(epoch)) {
          removeOpen.value = false;
          removeTarget.value = null;
          notice.value = "已移除收藏。";
          await load();
        }
      } catch (err) {
        if (current(epoch)) {
          error.value = communityError(err);
          removeOpen.value = false;
        }
      } finally {
        if (current(epoch)) busy.value = false;
      }
    }
    watch(accountEpoch, () => {
      eqImported.value = false;
      listRequest++;
      previewRequest++;
      recoveryRequest++;
      rows.value = [];
      selected.value = null;
      preview.value = null;
      result.value = null;
      removeTarget.value = null;
      previewOpen.value = false;
      removeOpen.value = false;
      query.value = "";
      page.value = 1;
      busy.value = false;
      notice.value = "";
      error.value = "";
      recoveries.value = [];
      recoveryError.value = "";
      void load();
      void loadRecoveries();
    });
    onMounted(async () => {
      await refreshAccount();
      if (active) {
        void loadRecoveries();
        await load();
      }
    });
    onUnmounted(() => {
      active = false;
      listRequest++;
      previewRequest++;
      recoveryRequest++;
    });
    return (_ctx, _cache) => {
      const _component_router_link = resolveComponent("router-link");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("header", _hoisted_2, [
          _cache[12] || (_cache[12] = createBaseVNode("div", null, [
            createBaseVNode("span", { class: "community-eyebrow" }, "YOUR COLLECTION"),
            createBaseVNode("h1", null, "我的方案"),
            createBaseVNode("p", null, "保存的版本独立保留。先查看具体修改，再决定是否应用。")
          ], -1)),
          createVNode(_component_router_link, {
            class: "community-btn",
            to: "/community"
          }, {
            default: withCtx(() => [..._cache[11] || (_cache[11] = [
              createTextVNode("发现社区方案", -1)
            ])]),
            _: 1
          })
        ]),
        !unref(user) ? (openBlock(), createElementBlock("section", _hoisted_3, [
          _cache[14] || (_cache[14] = createBaseVNode("h2", null, "登录后查看我的方案", -1)),
          _cache[15] || (_cache[15] = createBaseVNode("p", null, "收藏和应用记录属于你的账号，本地工具可继续使用。", -1)),
          createVNode(_component_router_link, {
            class: "community-btn primary",
            to: "/account"
          }, {
            default: withCtx(() => [..._cache[13] || (_cache[13] = [
              createTextVNode("去登录", -1)
            ])]),
            _: 1
          })
        ])) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          result.value ? (openBlock(), createElementBlock("div", _hoisted_4, [
            createBaseVNode("div", null, [
              _cache[16] || (_cache[16] = createBaseVNode("strong", null, "操作结果", -1)),
              createBaseVNode("p", null, toDisplayString(result.value.message), 1)
            ]),
            result.value.restoreId ? (openBlock(), createElementBlock("button", {
              key: 0,
              class: "community-btn",
              disabled: busy.value,
              onClick: _cache[0] || (_cache[0] = ($event) => restore(result.value.restoreId))
            }, toDisplayString(busy.value ? "正在恢复…" : "恢复应用前设置"), 9, _hoisted_5)) : createCommentVNode("", true)
          ])) : createCommentVNode("", true),
          recoveries.value.length || recoveryError.value ? (openBlock(), createElementBlock("details", _hoisted_6, [
            createBaseVNode("summary", null, [
              _cache[17] || (_cache[17] = createTextVNode("本机恢复记录 ", -1)),
              createBaseVNode("span", null, toDisplayString(recoveries.value.length) + " 项", 1)
            ]),
            _cache[18] || (_cache[18] = createBaseVNode("p", { class: "community-muted" }, "重启软件后仍可从这里恢复应用前的设置。", -1)),
            recoveryError.value ? (openBlock(), createElementBlock("p", _hoisted_7, toDisplayString(recoveryError.value), 1)) : createCommentVNode("", true),
            (openBlock(true), createElementBlock(Fragment, null, renderList(recoveries.value, (recovery) => {
              return openBlock(), createElementBlock("div", {
                key: recovery.id,
                class: "community-recovery-row"
              }, [
                createBaseVNode("div", null, [
                  createBaseVNode("strong", null, toDisplayString(unref(communityKindLabel)(recovery.kind)), 1),
                  createBaseVNode("span", null, toDisplayString(new Date(recovery.at).toLocaleString("zh-CN")) + " · " + toDisplayString(recovery.state === "pending" ? "应用未完成" : "已保存恢复档案"), 1)
                ]),
                createBaseVNode("button", {
                  class: "community-btn",
                  disabled: busy.value,
                  onClick: ($event) => restore(recovery.id)
                }, "恢复此记录", 8, _hoisted_8)
              ]);
            }), 128))
          ])) : createCommentVNode("", true),
          notice.value ? (openBlock(), createElementBlock("p", _hoisted_9, [
            createTextVNode(toDisplayString(notice.value) + " ", 1),
            eqImported.value ? (openBlock(), createBlock(_component_router_link, {
              key: 0,
              class: "community-text-btn",
              to: "/audio-eq"
            }, {
              default: withCtx(() => [..._cache[19] || (_cache[19] = [
                createTextVNode("打开音频均衡器", -1)
              ])]),
              _: 1
            })) : createCommentVNode("", true)
          ])) : createCommentVNode("", true),
          error.value ? (openBlock(), createElementBlock("div", _hoisted_10, [
            createTextVNode(toDisplayString(error.value) + " ", 1),
            createBaseVNode("button", {
              class: "community-text-btn",
              onClick: load
            }, "重新加载")
          ])) : createCommentVNode("", true),
          createBaseVNode("div", _hoisted_11, [
            createBaseVNode("label", _hoisted_12, [
              _cache[21] || (_cache[21] = createTextVNode("方案类型", -1)),
              withDirectives(createBaseVNode("select", {
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => kind.value = $event),
                "aria-label": "筛选我的方案类型"
              }, [
                _cache[20] || (_cache[20] = createBaseVNode("option", { value: "" }, "全部类型", -1)),
                (openBlock(true), createElementBlock(Fragment, null, renderList(unref(communityKinds), (item) => {
                  return openBlock(), createElementBlock("option", {
                    key: item.value,
                    value: item.value
                  }, toDisplayString(item.label), 9, _hoisted_13);
                }), 128))
              ], 512), [
                [vModelSelect, kind.value]
              ])
            ]),
            createBaseVNode("form", {
              class: "community-search",
              onSubmit: withModifiers(search, ["prevent"])
            }, [
              withDirectives(createBaseVNode("input", {
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => query.value = $event),
                maxlength: "100",
                "aria-label": "搜索我的方案",
                placeholder: "搜索已保存的方案"
              }, null, 512), [
                [vModelText, query.value]
              ]),
              createBaseVNode("button", {
                class: "community-btn",
                disabled: loading.value
              }, "搜索", 8, _hoisted_14)
            ], 32)
          ]),
          loading.value ? (openBlock(), createElementBlock("div", _hoisted_15, "正在加载我的方案…")) : rows.value.length ? (openBlock(), createElementBlock("div", _hoisted_16, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(rows.value, (row) => {
              return openBlock(), createElementBlock("article", {
                key: row.id,
                class: "community-plan-card"
              }, [
                createVNode(CommunityPresetPreview, {
                  payload: row.plan.payload,
                  compact: ""
                }, null, 8, ["payload"]),
                createBaseVNode("div", _hoisted_17, [
                  createBaseVNode("span", _hoisted_18, toDisplayString(unref(communityKindLabel)(row.plan.kind)) + " · 保存版本 " + toDisplayString(row.sourceVersion), 1),
                  createBaseVNode("h2", null, toDisplayString(row.plan.title), 1),
                  createBaseVNode("p", null, toDisplayString(row.plan.description || "作者暂未补充说明。"), 1),
                  createBaseVNode("div", _hoisted_19, [
                    createBaseVNode("span", null, toDisplayString(row.plan.author.nickname || row.plan.author.username), 1),
                    createBaseVNode("span", null, toDisplayString(unref(communityDate)(row.savedAt)) + " 保存", 1)
                  ]),
                  createBaseVNode("div", _hoisted_20, [
                    row.plan.kind === "eq" ? (openBlock(), createElementBlock("button", {
                      key: 0,
                      class: "community-btn",
                      disabled: busy.value,
                      onClick: ($event) => importEq(row)
                    }, "导入音频均衡器", 8, _hoisted_21)) : createCommentVNode("", true),
                    createBaseVNode("button", {
                      class: "community-btn primary",
                      disabled: busy.value,
                      onClick: ($event) => openPreview(row)
                    }, "预览与应用", 8, _hoisted_22),
                    createBaseVNode("button", {
                      class: "community-text-btn",
                      disabled: busy.value,
                      onClick: ($event) => askRemove(row)
                    }, "移除收藏", 8, _hoisted_23)
                  ]),
                  row.plan.kind === "eq" ? (openBlock(), createElementBlock("p", _hoisted_24, "导入后在均衡器「我的预设」中载入；导入不会改变当前声音。")) : createCommentVNode("", true)
                ])
              ]);
            }), 128))
          ])) : !error.value ? (openBlock(), createElementBlock("div", _hoisted_25, [
            _cache[23] || (_cache[23] = createBaseVNode("h2", null, "还没有保存的方案", -1)),
            createBaseVNode("p", null, toDisplayString(query.value ? "换个关键词试试。" : "去社区发现喜欢的方案，保存后会出现在这里。"), 1),
            createVNode(_component_router_link, {
              class: "community-btn",
              to: "/community"
            }, {
              default: withCtx(() => [..._cache[22] || (_cache[22] = [
                createTextVNode("浏览社区", -1)
              ])]),
              _: 1
            })
          ])) : createCommentVNode("", true),
          totalPages.value > 1 ? (openBlock(), createElementBlock("nav", _hoisted_26, [
            createBaseVNode("button", {
              class: "community-btn",
              disabled: page.value <= 1 || loading.value,
              onClick: _cache[3] || (_cache[3] = ($event) => paginate(page.value - 1))
            }, "上一页", 8, _hoisted_27),
            createBaseVNode("span", null, toDisplayString(page.value) + " / " + toDisplayString(totalPages.value), 1),
            createBaseVNode("button", {
              class: "community-btn",
              disabled: page.value >= totalPages.value || loading.value,
              onClick: _cache[4] || (_cache[4] = ($event) => paginate(page.value + 1))
            }, "下一页", 8, _hoisted_28)
          ])) : createCommentVNode("", true)
        ], 64)),
        createVNode(unref(ElDialog), {
          modelValue: previewOpen.value,
          "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => previewOpen.value = $event),
          title: "应用前确认",
          class: "community-dialog",
          width: "min(820px, calc(100vw - 32px))",
          "append-to-body": "",
          "close-on-click-modal": !busy.value,
          "close-on-press-escape": !busy.value,
          "show-close": !busy.value
        }, {
          default: withCtx(() => [
            selected.value ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              createBaseVNode("h2", null, toDisplayString(selected.value.plan.title), 1),
              createVNode(CommunityPresetPreview, {
                payload: selected.value.plan.payload
              }, null, 8, ["payload"]),
              selected.value.plan.kind === "eq" ? (openBlock(), createElementBlock("div", _hoisted_29, [
                _cache[25] || (_cache[25] = createBaseVNode("p", null, "直接应用音频方案前，请先在音频均衡器中选择输出设备并启动引擎。也可以先导入，稍后从「我的预设」载入。", -1)),
                !busy.value ? (openBlock(), createBlock(_component_router_link, {
                  key: 0,
                  class: "community-text-btn",
                  to: "/audio-eq",
                  onClick: _cache[5] || (_cache[5] = ($event) => previewOpen.value = false)
                }, {
                  default: withCtx(() => [..._cache[24] || (_cache[24] = [
                    createTextVNode("打开音频均衡器", -1)
                  ])]),
                  _: 1
                })) : createCommentVNode("", true)
              ])) : createCommentVNode("", true),
              previewLoading.value ? (openBlock(), createElementBlock("p", _hoisted_30, "正在核对具体修改与恢复条件…")) : createCommentVNode("", true),
              previewError.value ? (openBlock(), createElementBlock("p", _hoisted_31, toDisplayString(previewError.value), 1)) : createCommentVNode("", true),
              previewError.value && !busy.value ? (openBlock(), createElementBlock("button", {
                key: 3,
                class: "community-btn",
                onClick: _cache[6] || (_cache[6] = ($event) => openPreview(selected.value))
              }, "重新核对方案")) : createCommentVNode("", true),
              preview.value ? (openBlock(), createElementBlock(Fragment, { key: 4 }, [
                _cache[27] || (_cache[27] = createBaseVNode("h3", { class: "community-section-title" }, "将要修改的项目", -1)),
                createBaseVNode("ul", _hoisted_32, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(preview.value.items, (item, index) => {
                    return openBlock(), createElementBlock("li", { key: index }, toDisplayString(item), 1);
                  }), 128))
                ]),
                preview.value.warnings.length ? (openBlock(), createElementBlock("div", _hoisted_33, [
                  _cache[26] || (_cache[26] = createBaseVNode("strong", null, "应用前请确认", -1)),
                  createBaseVNode("ul", null, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(preview.value.warnings, (warning, index) => {
                      return openBlock(), createElementBlock("li", { key: index }, toDisplayString(warning), 1);
                    }), 128))
                  ])
                ])) : createCommentVNode("", true),
                preview.value.requiresAdmin ? (openBlock(), createElementBlock("p", _hoisted_34, "此方案需要管理员权限。" + toDisplayString(isAdmin.value ? "当前软件已取得管理员权限。" : "请以管理员身份重新运行软件后再应用。"), 1)) : createCommentVNode("", true),
                createBaseVNode("div", _hoisted_35, [
                  createBaseVNode("button", {
                    class: "community-btn",
                    disabled: busy.value,
                    onClick: _cache[7] || (_cache[7] = ($event) => previewOpen.value = false)
                  }, "暂不应用", 8, _hoisted_36),
                  createBaseVNode("button", {
                    class: "community-btn primary",
                    disabled: busy.value || preview.value.requiresAdmin && !isAdmin.value,
                    onClick: apply
                  }, toDisplayString(busy.value ? "正在应用…" : "确认应用方案"), 9, _hoisted_37)
                ])
              ], 64)) : createCommentVNode("", true)
            ], 64)) : createCommentVNode("", true)
          ]),
          _: 1
        }, 8, ["modelValue", "close-on-click-modal", "close-on-press-escape", "show-close"]),
        createVNode(unref(ElDialog), {
          modelValue: removeOpen.value,
          "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => removeOpen.value = $event),
          title: "移除收藏",
          class: "community-dialog",
          width: "min(480px, calc(100vw - 32px))",
          "append-to-body": "",
          "close-on-click-modal": !busy.value,
          "close-on-press-escape": !busy.value,
          "show-close": !busy.value
        }, {
          default: withCtx(() => [
            createBaseVNode("p", null, "从我的方案中移除「" + toDisplayString(removeTarget.value?.plan.title) + "」？此操作不会恢复或更改已应用的设置。", 1),
            createBaseVNode("div", _hoisted_38, [
              createBaseVNode("button", {
                class: "community-btn",
                disabled: busy.value,
                onClick: _cache[9] || (_cache[9] = ($event) => removeOpen.value = false)
              }, "保留收藏", 8, _hoisted_39),
              createBaseVNode("button", {
                class: "community-btn danger",
                disabled: busy.value,
                onClick: remove
              }, "确认移除", 8, _hoisted_40)
            ])
          ]),
          _: 1
        }, 8, ["modelValue", "close-on-click-modal", "close-on-press-escape", "show-close"])
      ]);
    };
  }
});
export {
  _sfc_main as default
};
