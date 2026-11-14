import { t as defineComponent, a1 as onMounted, a5 as openBlock, l as createElementBlock, i as createBaseVNode, k as createCommentVNode, S as normalizeClass, ak as toDisplayString, aG as withDirectives, aA as vModelText, F as Fragment, q as createTextVNode, ab as renderList, a9 as ref, g as computed, _ as _export_sfc } from "./main-DAqTdO6U.js";
const _hoisted_1 = { class: "page-header" };
const _hoisted_2 = {
  key: 0,
  class: "page-icon",
  style: { "background": "rgba(244,63,94,0.08)" }
};
const _hoisted_3 = { key: 1 };
const _hoisted_4 = { class: "mode-switch" };
const _hoisted_5 = { class: "toolbar" };
const _hoisted_6 = ["placeholder"];
const _hoisted_7 = {
  key: 0,
  class: "copy-error",
  role: "alert"
};
const _hoisted_8 = {
  key: 1,
  class: "panel"
};
const _hoisted_9 = { class: "form-row" };
const _hoisted_10 = { class: "form-row" };
const _hoisted_11 = ["disabled"];
const _hoisted_12 = {
  key: 2,
  class: "panel"
};
const _hoisted_13 = ["disabled"];
const _hoisted_14 = {
  key: 3,
  class: "chips"
};
const _hoisted_15 = ["onClick"];
const _hoisted_16 = {
  key: 4,
  class: "card-grid"
};
const _hoisted_17 = { class: "card-top" };
const _hoisted_18 = { class: "weapon" };
const _hoisted_19 = {
  key: 0,
  class: "tag"
};
const _hoisted_20 = ["onClick"];
const _hoisted_21 = { class: "card-actions" };
const _hoisted_22 = ["onClick"];
const _hoisted_23 = ["onClick"];
const _hoisted_24 = {
  key: 5,
  class: "card-grid"
};
const _hoisted_25 = { class: "card-top" };
const _hoisted_26 = { class: "weapon" };
const _hoisted_27 = ["onClick"];
const _hoisted_28 = { class: "name" };
const _hoisted_29 = ["onClick"];
const _hoisted_30 = {
  key: 0,
  class: "note"
};
const _hoisted_31 = ["onClick"];
const _hoisted_32 = {
  key: 6,
  class: "empty"
};
const _hoisted_33 = {
  key: 7,
  class: "empty"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "GunCodes",
  props: {
    embedded: { type: Boolean, default: false }
  },
  setup(__props) {
    const mode = ref("preset");
    const presets = ref([]);
    const list = ref([]);
    const search = ref("");
    const activeWeapon = ref("");
    const showAdd = ref(false);
    const showImport = ref(false);
    const form = ref({ weapon: "", name: "", code: "", note: "" });
    const importText = ref("");
    const formMsg = ref("");
    const formMsgErr = ref(false);
    const copied = ref("");
    const copyError = ref("");
    const favAdded = ref("");
    onMounted(async () => {
      await Promise.all([refresh(), loadPresets()]);
    });
    async function loadPresets() {
      if (!window.sysApi) return;
      const r = await window.sysApi.gunCodesPresets();
      if (r?.success) presets.value = r.presets || [];
    }
    async function refresh() {
      if (!window.sysApi) return;
      const r = await window.sysApi.gunCodesList();
      if (r?.success) list.value = r.list || [];
    }
    const sourceCount = computed(() => mode.value === "preset" ? presets.value.length : list.value.length);
    const weapons = computed(() => {
      const src = mode.value === "preset" ? presets.value : list.value;
      const m = /* @__PURE__ */ new Map();
      for (const e of src) m.set(e.weapon, (m.get(e.weapon) || 0) + 1);
      return [...m.entries()].map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);
    });
    function matchQuery(fields) {
      const q = search.value.trim().toLowerCase();
      if (!q) return true;
      return fields.some((f) => f.toLowerCase().includes(q));
    }
    const filteredPresets = computed(
      () => presets.value.filter(
        (e) => (!activeWeapon.value || e.weapon === activeWeapon.value) && matchQuery([e.weapon, e.tag, e.code])
      )
    );
    const filteredMine = computed(
      () => list.value.filter(
        (e) => (!activeWeapon.value || e.weapon === activeWeapon.value) && matchQuery([e.weapon, e.name, e.code, e.note])
      )
    );
    function msg(text, isErr = false) {
      formMsg.value = text;
      formMsgErr.value = isErr;
      if (text) setTimeout(() => {
        formMsg.value = "";
      }, 3e3);
    }
    async function add() {
      if (!window.sysApi) return;
      const r = await window.sysApi.gunCodesAdd({ ...form.value });
      if (r?.success) {
        msg("✓ 已保存");
        form.value = { weapon: "", name: "", code: "", note: "" };
        showAdd.value = false;
        await refresh();
      } else msg(r?.error || "保存失败", true);
    }
    async function remove(id) {
      if (!window.sysApi) return;
      const r = await window.sysApi.gunCodesRemove(id);
      if (r?.success) await refresh();
    }
    async function doImport() {
      if (!window.sysApi) return;
      const r = await window.sysApi.gunCodesImport(importText.value);
      if (r?.success) {
        msg(`✓ 导入 ${r.added} 条${r.skipped ? `，跳过 ${r.skipped} 条（重复或超限）` : ""}`);
        importText.value = "";
        showImport.value = false;
        await refresh();
      } else msg(r?.error || "导入失败", true);
    }
    async function fav(e) {
      if (!window.sysApi) return;
      const r = await window.sysApi.gunCodesAdd({ weapon: e.weapon, name: e.tag || e.weapon, code: e.code, note: "来自预设库" });
      if (r?.success) {
        favAdded.value = e.code;
        setTimeout(() => {
          favAdded.value = "";
        }, 1500);
        await refresh();
      } else if (r?.error?.includes("已存在")) {
        favAdded.value = e.code;
        setTimeout(() => {
          favAdded.value = "";
        }, 1500);
      }
    }
    async function copy(code, id) {
      copied.value = "";
      copyError.value = "";
      try {
        await navigator.clipboard.writeText(code);
      } catch {
        copyError.value = "复制失败，请手动选中改枪码复制。";
        return;
      }
      copied.value = id || code;
      setTimeout(() => {
        copied.value = "";
      }, 1500);
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        "data-tour": "gun-codes",
        class: normalizeClass(["page", { embedded: __props.embedded }])
      }, [
        createBaseVNode("div", _hoisted_1, [
          !__props.embedded ? (openBlock(), createElementBlock("div", _hoisted_2, [..._cache[11] || (_cache[11] = [
            createBaseVNode("svg", {
              width: "28",
              height: "28",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "#f43f5e",
              "stroke-width": "1.5"
            }, [
              createBaseVNode("circle", {
                cx: "12",
                cy: "12",
                r: "10"
              }),
              createBaseVNode("circle", {
                cx: "12",
                cy: "12",
                r: "6"
              }),
              createBaseVNode("circle", {
                cx: "12",
                cy: "12",
                r: "2"
              })
            ], -1)
          ])])) : createCommentVNode("", true),
          !__props.embedded ? (openBlock(), createElementBlock("div", _hoisted_3, [..._cache[12] || (_cache[12] = [
            createBaseVNode("h2", { class: "page-title" }, "改枪码管理器", -1),
            createBaseVNode("p", { class: "page-desc" }, "三角洲行动武器改装码 — 预设库直接用，自己的码本地存", -1)
          ])])) : createCommentVNode("", true),
          createBaseVNode("div", _hoisted_4, [
            createBaseVNode("span", {
              class: normalizeClass({ active: mode.value === "preset" }),
              onClick: _cache[0] || (_cache[0] = ($event) => mode.value = "preset")
            }, "预设库 (" + toDisplayString(presets.value.length) + ")", 3),
            createBaseVNode("span", {
              class: normalizeClass({ active: mode.value === "mine" }),
              onClick: _cache[1] || (_cache[1] = ($event) => mode.value = "mine")
            }, "我的收藏 (" + toDisplayString(list.value.length) + ")", 3)
          ])
        ]),
        createBaseVNode("div", _hoisted_5, [
          withDirectives(createBaseVNode("input", {
            "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => search.value = $event),
            class: "search-input",
            placeholder: mode.value === "preset" ? "搜索武器 / 标签 / 码…" : "搜索武器 / 方案名 / 码…"
          }, null, 8, _hoisted_6), [
            [vModelText, search.value]
          ]),
          mode.value === "mine" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
            createBaseVNode("button", {
              class: "btn primary",
              onClick: _cache[3] || (_cache[3] = ($event) => showAdd.value = !showAdd.value)
            }, toDisplayString(showAdd.value ? "收起" : "+ 添加"), 1),
            createBaseVNode("button", {
              class: "btn ghost",
              onClick: _cache[4] || (_cache[4] = ($event) => showImport.value = !showImport.value)
            }, toDisplayString(showImport.value ? "收起" : "批量导入"), 1)
          ], 64)) : createCommentVNode("", true)
        ]),
        copyError.value ? (openBlock(), createElementBlock("p", _hoisted_7, toDisplayString(copyError.value), 1)) : createCommentVNode("", true),
        mode.value === "mine" && showAdd.value ? (openBlock(), createElementBlock("div", _hoisted_8, [
          createBaseVNode("div", _hoisted_9, [
            withDirectives(createBaseVNode("input", {
              "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => form.value.weapon = $event),
              placeholder: "武器名（如 K416）*"
            }, null, 512), [
              [vModelText, form.value.weapon]
            ]),
            withDirectives(createBaseVNode("input", {
              "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => form.value.name = $event),
              placeholder: "方案名（可空，默认同武器名）"
            }, null, 512), [
              [vModelText, form.value.name]
            ])
          ]),
          createBaseVNode("div", _hoisted_10, [
            withDirectives(createBaseVNode("input", {
              "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => form.value.code = $event),
              class: "code-input",
              placeholder: "改枪码 *"
            }, null, 512), [
              [vModelText, form.value.code]
            ]),
            withDirectives(createBaseVNode("input", {
              "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => form.value.note = $event),
              placeholder: "备注（可空）"
            }, null, 512), [
              [vModelText, form.value.note]
            ])
          ]),
          createBaseVNode("button", {
            class: "btn primary",
            onClick: add,
            disabled: !form.value.weapon.trim() || !form.value.code.trim()
          }, "保存", 8, _hoisted_11),
          createBaseVNode("span", {
            class: normalizeClass(["form-msg", { err: formMsgErr.value }])
          }, toDisplayString(formMsg.value), 3)
        ])) : createCommentVNode("", true),
        mode.value === "mine" && showImport.value ? (openBlock(), createElementBlock("div", _hoisted_12, [
          _cache[13] || (_cache[13] = createBaseVNode("div", { class: "panel-tip" }, [
            createTextVNode("每行一条，格式："),
            createBaseVNode("code", null, "武器名 改枪码 [方案名]"),
            createTextVNode("；整行只有一个码时归入「未分类」")
          ], -1)),
          withDirectives(createBaseVNode("textarea", {
            "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => importText.value = $event),
            rows: "5",
            placeholder: "K416 xxxxxxxx 全面战场红点流\nM4A1 yyyyyyyy"
          }, null, 512), [
            [vModelText, importText.value]
          ]),
          createBaseVNode("button", {
            class: "btn primary",
            onClick: doImport,
            disabled: !importText.value.trim()
          }, "导入", 8, _hoisted_13),
          createBaseVNode("span", {
            class: normalizeClass(["form-msg", { err: formMsgErr.value }])
          }, toDisplayString(formMsg.value), 3)
        ])) : createCommentVNode("", true),
        weapons.value.length ? (openBlock(), createElementBlock("div", _hoisted_14, [
          createBaseVNode("span", {
            class: normalizeClass(["chip", { active: activeWeapon.value === "" }]),
            onClick: _cache[10] || (_cache[10] = ($event) => activeWeapon.value = "")
          }, "全部 (" + toDisplayString(sourceCount.value) + ")", 3),
          (openBlock(true), createElementBlock(Fragment, null, renderList(weapons.value, (w) => {
            return openBlock(), createElementBlock("span", {
              class: normalizeClass(["chip", { active: activeWeapon.value === w.name }]),
              key: w.name,
              onClick: ($event) => activeWeapon.value = w.name
            }, toDisplayString(w.name) + " (" + toDisplayString(w.count) + ") ", 11, _hoisted_15);
          }), 128))
        ])) : createCommentVNode("", true),
        mode.value === "preset" && filteredPresets.value.length ? (openBlock(), createElementBlock("div", _hoisted_16, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(filteredPresets.value, (e) => {
            return openBlock(), createElementBlock("div", {
              class: "code-card",
              key: e.weapon + e.code
            }, [
              createBaseVNode("div", _hoisted_17, [
                createBaseVNode("span", _hoisted_18, toDisplayString(e.weapon), 1),
                e.tag ? (openBlock(), createElementBlock("span", _hoisted_19, toDisplayString(e.tag), 1)) : createCommentVNode("", true)
              ]),
              createBaseVNode("div", {
                class: "code",
                onClick: ($event) => copy(e.code),
                title: "点击复制"
              }, toDisplayString(e.code), 9, _hoisted_20),
              createBaseVNode("div", _hoisted_21, [
                createBaseVNode("button", {
                  class: "copy-btn",
                  onClick: ($event) => copy(e.code)
                }, toDisplayString(copied.value === e.code ? "✓ 已复制" : "复制改枪码"), 9, _hoisted_22),
                createBaseVNode("button", {
                  class: "fav-btn",
                  onClick: ($event) => fav(e),
                  title: "收藏到我的"
                }, toDisplayString(favAdded.value === e.code ? "✓" : "＋"), 9, _hoisted_23)
              ])
            ]);
          }), 128))
        ])) : createCommentVNode("", true),
        mode.value === "mine" && filteredMine.value.length ? (openBlock(), createElementBlock("div", _hoisted_24, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(filteredMine.value, (e) => {
            return openBlock(), createElementBlock("div", {
              class: "code-card",
              key: e.id
            }, [
              createBaseVNode("div", _hoisted_25, [
                createBaseVNode("span", _hoisted_26, toDisplayString(e.weapon), 1),
                createBaseVNode("button", {
                  class: "del",
                  title: "删除",
                  onClick: ($event) => remove(e.id)
                }, "×", 8, _hoisted_27)
              ]),
              createBaseVNode("div", _hoisted_28, toDisplayString(e.name), 1),
              createBaseVNode("div", {
                class: "code",
                onClick: ($event) => copy(e.code),
                title: "点击复制"
              }, toDisplayString(e.code), 9, _hoisted_29),
              e.note ? (openBlock(), createElementBlock("div", _hoisted_30, toDisplayString(e.note), 1)) : createCommentVNode("", true),
              createBaseVNode("button", {
                class: "copy-btn",
                onClick: ($event) => copy(e.code, e.id)
              }, toDisplayString(copied.value === e.id ? "✓ 已复制" : "复制改枪码"), 9, _hoisted_31)
            ]);
          }), 128))
        ])) : createCommentVNode("", true),
        mode.value === "preset" && !filteredPresets.value.length ? (openBlock(), createElementBlock("div", _hoisted_32, toDisplayString(presets.value.length ? "没有匹配的预设" : "预设库为空"), 1)) : createCommentVNode("", true),
        mode.value === "mine" && !filteredMine.value.length ? (openBlock(), createElementBlock("div", _hoisted_33, toDisplayString(list.value.length ? "没有匹配的改枪码" : "还没有收藏 — 去预设库点「＋」，或右上角自己添加"), 1)) : createCommentVNode("", true)
      ], 2);
    };
  }
});
const GunCodes = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-aa28a885"]]);
export {
  GunCodes as default
};
