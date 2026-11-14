import { t as defineComponent, l as createElementBlock, i as createBaseVNode, ak as toDisplayString, aG as withDirectives, aA as vModelText, F as Fragment, ab as renderList, a9 as ref, a5 as openBlock, _ as _export_sfc } from "./main-DAqTdO6U.js";
import { c as convertSensitivity } from "./legacyInputTools-Cx_Or_Ch.js";
const PRESET_LIMIT = 12;
const PRESET_FILE_LIMIT = 128 * 1024;
function object(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("预设内容必须是对象。");
  return value;
}
function sensitivityProfile(value) {
  const input = object(value);
  const sourceGame = String(input.fromId ?? input.game ?? "cs2"), targetGame = String(input.toId ?? "valorant");
  const fromId = sourceGame === "csgo" ? "cs2" : sourceGame, toId = targetGame === "csgo" ? "cs2" : targetGame;
  const fromDpi = Number(input.fromDpi ?? input.dpi), toDpi = Number(input.toDpi ?? input.dpi ?? input.fromDpi);
  const sensitivity = Number(input.sensitivity);
  if (!convertSensitivity(fromId, toId, sensitivity, fromDpi, toDpi)) throw new Error("游戏、DPI 或灵敏度超出有效范围。");
  return { fromId, toId, fromDpi, toDpi, sensitivity };
}
function presetName(value) {
  const name = typeof value === "string" ? value.trim().slice(0, 40) : "";
  if (!name) throw new Error("请填写预设名称。");
  return name;
}
function importPresets(text, kind, validate) {
  if (text.length > PRESET_FILE_LIMIT) throw new Error("预设文件不能超过 128 KB。");
  const data = object(JSON.parse(text));
  if (data.kind !== kind || data.version !== 1 || !Array.isArray(data.presets)) throw new Error("预设类型或版本不匹配。");
  if (!data.presets.length || data.presets.length > PRESET_LIMIT) throw new Error("预设文件应包含 1–12 条记录。");
  return data.presets.map((entry) => {
    const item = object(entry);
    return { id: crypto.randomUUID(), name: presetName(item.name), params: validate(item.params), createdAt: Date.now() };
  });
}
function exportPresets(kind, presets) {
  return JSON.stringify({ kind, version: 1, exportedAt: (/* @__PURE__ */ new Date()).toISOString(), presets }, null, 2);
}
const _hoisted_1 = { class: "local-presets" };
const _hoisted_2 = { class: "preset-actions" };
const _hoisted_3 = ["aria-label"];
const _hoisted_4 = ["disabled"];
const _hoisted_5 = { key: 0 };
const _hoisted_6 = ["onClick"];
const _hoisted_7 = ["onClick"];
const _hoisted_8 = { key: 1 };
const _hoisted_9 = { role: "status" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "LocalInputPresets",
  props: {
    title: {},
    kind: {},
    value: {},
    validate: { type: Function }
  },
  emits: ["load"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const name = ref(""), feedback = ref(""), presets = ref([]), fileInput = ref();
    const key = `supreme-${props.kind}-v1`;
    try {
      const saved = localStorage.getItem(key);
      if (saved) presets.value = importPresets(saved, props.kind, props.validate);
    } catch {
      feedback.value = "本地预设无法读取；可以重新导入备份。";
    }
    function persist(next) {
      if (next.length) localStorage.setItem(key, exportPresets(props.kind, next));
      else localStorage.removeItem(key);
      presets.value = next;
    }
    function save() {
      try {
        if (presets.value.length >= PRESET_LIMIT) throw new Error("已达到 12 条上限，请先删除不需要的预设。");
        persist([...presets.value, { id: crypto.randomUUID(), name: presetName(name.value), params: props.validate(props.value), createdAt: Date.now() }]);
        feedback.value = "预设已保存在本机。";
        name.value = "";
      } catch (e) {
        feedback.value = e instanceof Error ? e.message : String(e);
      }
    }
    function load(preset) {
      try {
        emit("load", props.validate(preset.params));
        feedback.value = `已载入「${preset.name}」。`;
      } catch (e) {
        feedback.value = String(e);
      }
    }
    function remove(id) {
      try {
        persist(presets.value.filter((item) => item.id !== id));
        feedback.value = "预设已删除。";
      } catch {
        feedback.value = "无法保存变更，请检查磁盘空间。";
      }
    }
    async function upload(event) {
      const input = event.target, file = input.files?.[0];
      try {
        if (!file) return;
        if (file.size > PRESET_FILE_LIMIT) throw new Error("预设文件不能超过 128 KB。");
        const additions = importPresets(await file.text(), props.kind, props.validate);
        if (presets.value.length + additions.length > PRESET_LIMIT) throw new Error("导入后超过 12 条上限，请先删除不需要的预设。");
        persist([...presets.value, ...additions]);
        feedback.value = `已导入 ${additions.length} 条预设。`;
      } catch (e) {
        feedback.value = e instanceof Error ? e.message : String(e);
      } finally {
        input.value = "";
      }
    }
    function download() {
      const url = URL.createObjectURL(new Blob([exportPresets(props.kind, presets.value)], { type: "application/json" }));
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `${props.kind}.json`;
      anchor.click();
      setTimeout(() => URL.revokeObjectURL(url), 1e3);
      feedback.value = "已导出本地预设备份。";
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("h4", null, toDisplayString(__props.title) + "本地预设", 1),
        createBaseVNode("div", _hoisted_2, [
          withDirectives(createBaseVNode("input", {
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => name.value = $event),
            "aria-label": `${__props.title}预设名称`,
            placeholder: "预设名称",
            maxlength: "40"
          }, null, 8, _hoisted_3), [
            [vModelText, name.value]
          ]),
          createBaseVNode("button", { onClick: save }, "保存当前参数"),
          createBaseVNode("button", {
            onClick: _cache[1] || (_cache[1] = ($event) => fileInput.value?.click())
          }, "导入 JSON"),
          createBaseVNode("button", {
            disabled: !presets.value.length,
            onClick: download
          }, "导出全部", 8, _hoisted_4),
          createBaseVNode("input", {
            ref_key: "fileInput",
            ref: fileInput,
            type: "file",
            accept: ".json,application/json",
            hidden: "",
            onChange: upload
          }, null, 544)
        ]),
        presets.value.length ? (openBlock(), createElementBlock("ul", _hoisted_5, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(presets.value, (preset) => {
            return openBlock(), createElementBlock("li", {
              key: preset.id
            }, [
              createBaseVNode("span", null, toDisplayString(preset.name), 1),
              createBaseVNode("button", {
                onClick: ($event) => load(preset)
              }, "载入", 8, _hoisted_6),
              createBaseVNode("button", {
                onClick: ($event) => remove(preset.id)
              }, "删除", 8, _hoisted_7)
            ]);
          }), 128))
        ])) : (openBlock(), createElementBlock("p", _hoisted_8, "尚无保存的预设，最多保存 12 条。")),
        createBaseVNode("p", _hoisted_9, toDisplayString(feedback.value), 1)
      ]);
    };
  }
});
const LocalInputPresets = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8c8c8200"]]);
export {
  LocalInputPresets as L,
  object as o,
  sensitivityProfile as s
};
