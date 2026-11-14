import { t as defineComponent, aD as watch, a5 as openBlock, l as createElementBlock, i as createBaseVNode, ak as toDisplayString, F as Fragment, ab as renderList, q as createTextVNode, S as normalizeClass, aG as withDirectives, ax as vModelCheckbox, k as createCommentVNode, a9 as ref, g as computed, _ as _export_sfc, r as createVNode, as as unref, aF as withCtx, a3 as onUnmounted, a1 as onMounted, p as createStaticVNode, aI as withModifiers, aA as vModelText, j as createBlock, ad as resolveComponent, av as useRouter, au as useRoute, V as normalizeStyle, az as vModelSelect } from "./main-DAqTdO6U.js";
import { b as ElDialog, x as useCommunityAccount, n as communityApi, p as communityError, o as communityDate, r as communityKinds, q as communityKindLabel } from "./index-CL4m76NE.js";
import { S as SYSTEM_SETTINGS, v as validatePreset, C as CommunityPresetPreview } from "./CommunityPresetPreview-BYw6-IhH.js";
/* empty css                   */
import "./lutMath-Du8bBTzw.js";
import "./fpsPlan-BV2AClQh.js";
import "./LegacyCrosshairPreview-DwpWYNlI.js";
const _hoisted_1$4 = {
  class: "community-system-selection",
  "aria-label": "选择要分享的系统设置"
};
const _hoisted_2$4 = { class: "system-share-heading" };
const _hoisted_3$4 = { class: "system-share-actions" };
const _hoisted_4$4 = ["disabled"];
const _hoisted_5$4 = ["disabled"];
const _hoisted_6$4 = ["disabled"];
const _hoisted_7$4 = { class: "system-share-groups" };
const _hoisted_8$3 = { class: "system-share-group-actions" };
const _hoisted_9$3 = ["disabled", "onClick"];
const _hoisted_10$3 = ["disabled", "onClick"];
const _hoisted_11$3 = ["value", "disabled"];
const _hoisted_12$3 = { class: "system-share-name" };
const _hoisted_13$3 = { key: 0 };
const _hoisted_14$3 = { class: "system-share-value" };
const _hoisted_15$3 = {
  key: 0,
  class: "system-share-empty",
  role: "status"
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "CommunitySystemSelection",
  props: {
    payload: {},
    disabled: { type: Boolean }
  },
  emits: ["change"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const selected = ref([]);
    const rows = computed(() => {
      if (props.payload.kind !== "system" || props.payload.params.catalog !== "system-settings-v1") return [];
      return props.payload.params.settings.flatMap((state) => {
        const definition = SYSTEM_SETTINGS.find((item) => item.id === state.id);
        const option = definition?.options.find((item) => item.id === state.value);
        return definition && option ? [{ ...definition, state, valueLabel: option.label }] : [];
      });
    });
    const groups = computed(() => [...new Set(rows.value.map((item) => item.category))].map((category) => ({
      category,
      rows: rows.value.filter((item) => item.category === category)
    })));
    function update() {
      const settings = rows.value.filter((item) => selected.value.includes(item.id)).map((item) => ({ ...item.state }));
      emit("change", settings.length ? { schemaVersion: 1, kind: "system", params: { catalog: "system-settings-v1", settings } } : null);
    }
    function select(mode) {
      selected.value = rows.value.filter((item) => mode === "all" || mode === "basic" && item.level < 2).map((item) => item.id);
      update();
    }
    function selectGroup(category, enabled) {
      const ids = rows.value.filter((item) => item.category === category).map((item) => item.id);
      selected.value = enabled ? [.../* @__PURE__ */ new Set([...selected.value, ...ids])] : selected.value.filter((id) => !ids.includes(id));
      update();
    }
    watch(() => props.payload, () => select("basic"), { immediate: true });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("section", _hoisted_1$4, [
        createBaseVNode("div", _hoisted_2$4, [
          createBaseVNode("div", null, [
            _cache[4] || (_cache[4] = createBaseVNode("h3", null, "选择要分享的设置", -1)),
            createBaseVNode("p", null, "已读取 " + toDisplayString(rows.value.length) + " 项，已选 " + toDisplayString(selected.value.length) + " 项", 1)
          ]),
          createBaseVNode("div", _hoisted_3$4, [
            createBaseVNode("button", {
              type: "button",
              disabled: __props.disabled,
              onClick: _cache[0] || (_cache[0] = ($event) => select("all"))
            }, "全选", 8, _hoisted_4$4),
            createBaseVNode("button", {
              type: "button",
              disabled: __props.disabled,
              onClick: _cache[1] || (_cache[1] = ($event) => select("basic"))
            }, "仅基础项", 8, _hoisted_5$4),
            createBaseVNode("button", {
              type: "button",
              disabled: __props.disabled,
              onClick: _cache[2] || (_cache[2] = ($event) => select("none"))
            }, "全不选", 8, _hoisted_6$4)
          ])
        ]),
        _cache[5] || (_cache[5] = createBaseVNode("p", { class: "system-share-hint" }, "下方展示当前实际状态。基础项默认选中；进阶项目可逐项选择。「未配置」表示没有显式设置该值，实际行为由 Windows 决定。", -1)),
        createBaseVNode("div", _hoisted_7$4, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(groups.value, (group) => {
            return openBlock(), createElementBlock("details", {
              key: group.category,
              open: "",
              class: "system-share-group"
            }, [
              createBaseVNode("summary", null, [
                createTextVNode(toDisplayString(group.category), 1),
                createBaseVNode("span", null, toDisplayString(group.rows.filter((item) => selected.value.includes(item.id)).length) + " / " + toDisplayString(group.rows.length), 1)
              ]),
              createBaseVNode("div", _hoisted_8$3, [
                createBaseVNode("button", {
                  type: "button",
                  disabled: __props.disabled,
                  onClick: ($event) => selectGroup(group.category, true)
                }, "选择本组", 8, _hoisted_9$3),
                createBaseVNode("button", {
                  type: "button",
                  disabled: __props.disabled,
                  onClick: ($event) => selectGroup(group.category, false)
                }, "清空本组", 8, _hoisted_10$3)
              ]),
              (openBlock(true), createElementBlock(Fragment, null, renderList(group.rows, (item) => {
                return openBlock(), createElementBlock("label", {
                  key: item.id,
                  class: normalizeClass(["system-share-item", { selected: selected.value.includes(item.id) }])
                }, [
                  withDirectives(createBaseVNode("input", {
                    "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => selected.value = $event),
                    type: "checkbox",
                    value: item.id,
                    disabled: __props.disabled,
                    onChange: update
                  }, null, 40, _hoisted_11$3), [
                    [vModelCheckbox, selected.value]
                  ]),
                  createBaseVNode("span", _hoisted_12$3, [
                    createTextVNode(toDisplayString(item.label), 1),
                    item.level >= 2 ? (openBlock(), createElementBlock("small", _hoisted_13$3, "进阶 · 需确认适用范围")) : createCommentVNode("", true)
                  ]),
                  createBaseVNode("span", _hoisted_14$3, toDisplayString(item.valueLabel), 1)
                ], 2);
              }), 128))
            ]);
          }), 128))
        ]),
        !selected.value.length ? (openBlock(), createElementBlock("p", _hoisted_15$3, "请选择至少一项设置后再发布。")) : createCommentVNode("", true)
      ]);
    };
  }
});
const CommunitySystemSelection = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-a66254ed"]]);
function communityImageUrl(value) {
  if (typeof value !== "string" || value.length > 1024) return void 0;
  const match = /^(?:https?:\/\/api\.zztsos\.com)?(\/uploads\/[a-z0-9][a-z0-9._-]*\.(?:jpe?g|png|gif|webp|bmp))$/i.exec(value.trim());
  if (!match || match[1].includes("..")) return void 0;
  return `https://api.zztsos.com${match[1]}`;
}
function communityPostParts(content, coverImage) {
  const parts = [];
  const pattern = /!\[([^\]\r\n]*)\]\(([^)\s]+)\)|^(?:https?:\/\/[^\s]+|\/uploads\/[^\s]+)(?=\r?$)/gm;
  let end = 0;
  for (const match of content.matchAll(pattern)) {
    const url = communityImageUrl(match[2] || match[0]);
    if (!url) continue;
    if (match.index > end) parts.push({ type: "text", text: content.slice(end, match.index) });
    parts.push({ type: "image", url, alt: match[1] || "帖子图片" });
    end = match.index + match[0].length;
  }
  if (end < content.length) parts.push({ type: "text", text: content.slice(end) });
  const cover = communityImageUrl(coverImage);
  if (cover && !parts.some((part) => part.type === "image" && part.url === cover)) parts.push({ type: "image", url: cover, alt: "帖子图片" });
  return parts;
}
const _hoisted_1$3 = { class: "post-content" };
const _hoisted_2$3 = {
  key: 0,
  class: "post-content-text"
};
const _hoisted_3$3 = ["aria-label", "onClick"];
const _hoisted_4$3 = ["src", "alt", "onError"];
const _hoisted_5$3 = {
  key: 1,
  class: "post-content-image-error"
};
const _hoisted_6$3 = { class: "post-content-image-caption" };
const _hoisted_7$3 = ["src", "alt"];
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "CommunityPostContent",
  props: {
    content: {},
    coverImage: {}
  },
  setup(__props) {
    const props = __props;
    const parts = computed(() => communityPostParts(props.content, props.coverImage));
    const previewUrl = ref(""), previewAlt = ref(""), previewOpen = ref(false), failed = ref(/* @__PURE__ */ new Set());
    function preview(url, alt) {
      previewUrl.value = url;
      previewAlt.value = alt;
      previewOpen.value = true;
    }
    function imageFailed(url) {
      failed.value.add(url);
    }
    watch(() => [props.content, props.coverImage], () => {
      previewOpen.value = false;
      previewUrl.value = "";
      failed.value = /* @__PURE__ */ new Set();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$3, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(parts.value, (part, index) => {
          return openBlock(), createElementBlock(Fragment, { key: index }, [
            part.type === "text" ? (openBlock(), createElementBlock("span", _hoisted_2$3, toDisplayString(part.text), 1)) : (openBlock(), createElementBlock("button", {
              key: 1,
              type: "button",
              class: "post-content-image",
              "aria-label": `${part.alt}，查看大图`,
              onClick: ($event) => preview(part.url, part.alt)
            }, [
              !failed.value.has(part.url) ? (openBlock(), createElementBlock("img", {
                key: 0,
                src: part.url,
                alt: part.alt,
                loading: "lazy",
                decoding: "async",
                referrerpolicy: "no-referrer",
                onError: ($event) => imageFailed(part.url)
              }, null, 40, _hoisted_4$3)) : (openBlock(), createElementBlock("span", _hoisted_5$3, "图片暂时加载失败")),
              createBaseVNode("span", _hoisted_6$3, toDisplayString(failed.value.has(part.url) ? "点击重新查看图片" : "点击查看大图"), 1)
            ], 8, _hoisted_3$3))
          ], 64);
        }), 128)),
        createVNode(unref(ElDialog), {
          modelValue: previewOpen.value,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => previewOpen.value = $event),
          title: "图片预览",
          width: "min(960px, calc(100vw - 40px))",
          "append-to-body": "",
          "destroy-on-close": "",
          class: "community-dialog community-image-dialog"
        }, {
          default: withCtx(() => [
            previewUrl.value ? (openBlock(), createElementBlock("img", {
              key: 0,
              class: "post-content-full-image",
              src: previewUrl.value,
              alt: previewAlt.value,
              referrerpolicy: "no-referrer"
            }, null, 8, _hoisted_7$3)) : createCommentVNode("", true)
          ]),
          _: 1
        }, 8, ["modelValue"])
      ]);
    };
  }
});
const CommunityPostContent = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-a735c3a7"]]);
const _hoisted_1$2 = {
  class: "post-images",
  "aria-label": "帖子图片"
};
const _hoisted_2$2 = { class: "post-images-toolbar" };
const _hoisted_3$2 = ["disabled"];
const _hoisted_4$2 = ["disabled"];
const _hoisted_5$2 = ["disabled"];
const _hoisted_6$2 = {
  key: 0,
  class: "post-images-error",
  role: "alert"
};
const _hoisted_7$2 = {
  key: 1,
  class: "post-images-grid"
};
const _hoisted_8$2 = { class: "post-image-preview" };
const _hoisted_9$2 = ["src", "alt"];
const _hoisted_10$2 = {
  key: 0,
  class: "post-image-state",
  role: "status"
};
const _hoisted_11$2 = {
  key: 1,
  class: "post-image-done"
};
const _hoisted_12$2 = ["title"];
const _hoisted_13$2 = {
  key: 0,
  class: "post-images-error",
  role: "alert"
};
const _hoisted_14$2 = ["disabled", "aria-label", "onClick"];
const _hoisted_15$2 = {
  key: 2,
  class: "post-images-hint",
  role: "status"
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "CommunityPostImages",
  props: {
    disabled: { type: Boolean },
    resetKey: {}
  },
  emits: ["uploaded", "remove", "busy"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { accountEpoch } = useCommunityAccount();
    const input = ref(), attachments = ref([]), error = ref(""), uploading = ref(false);
    let alive = true, generation = 0, nextId = 0;
    function setBusy(value) {
      if (uploading.value === value) return;
      uploading.value = value;
      emit("busy", value);
    }
    function reset() {
      generation++;
      attachments.value.forEach((item) => URL.revokeObjectURL(item.preview));
      attachments.value = [];
      error.value = "";
      setBusy(false);
    }
    function removeImage(id) {
      if (props.disabled || uploading.value) return;
      const item = attachments.value.find((attachment) => attachment.id === id);
      if (!item) return;
      URL.revokeObjectURL(item.preview);
      attachments.value = attachments.value.filter((attachment) => attachment.id !== id);
      if (item.url) emit("remove", item.url);
      error.value = "";
    }
    function clearImages() {
      if (props.disabled || uploading.value) return;
      for (const item of attachments.value) if (item.url) emit("remove", item.url);
      reset();
    }
    async function selectImages(event) {
      const target = event.target;
      const files = Array.from(target.files || []);
      target.value = "";
      if (!alive || props.disabled || uploading.value || !files.length) return;
      error.value = "";
      if (attachments.value.length + files.length > 9) {
        error.value = "每篇帖子最多添加 9 张图片，请减少本次选择数量。";
        return;
      }
      for (const file of files) {
        if (!/\.(png|jpe?g|gif|webp|bmp)$/i.test(file.name) || file.type && !/^image\/(png|jpeg|gif|webp|bmp|x-ms-bmp)$/i.test(file.type)) {
          error.value = `${file.name}：仅支持 PNG、JPEG、GIF、WEBP、BMP 图片格式。`;
          return;
        }
        if (!file.size || file.size > 5 * 1024 * 1024) {
          error.value = `${file.name}：图片不能为空，且每张不能超过 5 MB。`;
          return;
        }
      }
      const request = ++generation, epoch = accountEpoch.value;
      const current = () => alive && generation === request && accountEpoch.value === epoch;
      const jobs = files.map((file) => ({ file, id: ++nextId }));
      for (const job of jobs) attachments.value.push({ id: job.id, name: job.file.name, preview: URL.createObjectURL(job.file), status: "uploading" });
      setBusy(true);
      try {
        for (const job of jobs) {
          if (!current()) return;
          const item = attachments.value.find((attachment) => attachment.id === job.id);
          try {
            const bytes = new Uint8Array(await job.file.arrayBuffer());
            if (!current()) return;
            const result = await communityApi().uploadImage({ name: job.file.name, bytes });
            if (!current()) return;
            const url = communityImageUrl(result.url);
            if (!url) throw new Error("服务器返回的图片地址无效，请重新选择图片。");
            item.url = url;
            item.status = "done";
            emit("uploaded", url);
          } catch (err) {
            if (!current()) return;
            item.status = "error";
            item.error = communityError(err);
          }
        }
      } finally {
        if (current()) setBusy(false);
      }
    }
    watch(() => props.resetKey, reset, { flush: "sync" });
    watch(accountEpoch, reset, { flush: "sync" });
    onUnmounted(() => {
      alive = false;
      reset();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("section", _hoisted_1$2, [
        createBaseVNode("div", _hoisted_2$2, [
          createBaseVNode("button", {
            type: "button",
            class: "community-btn secondary post-images-add",
            disabled: __props.disabled || uploading.value || attachments.value.length >= 9,
            onClick: _cache[0] || (_cache[0] = ($event) => input.value?.click())
          }, [
            _cache[1] || (_cache[1] = createBaseVNode("svg", {
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              "stroke-width": "1.6",
              "aria-hidden": "true"
            }, [
              createBaseVNode("rect", {
                x: "3",
                y: "3",
                width: "18",
                height: "18",
                rx: "3"
              }),
              createBaseVNode("circle", {
                cx: "8.5",
                cy: "8.5",
                r: "1.5"
              }),
              createBaseVNode("path", { d: "m4 17 5-5 4 4 3-3 4 4" })
            ], -1)),
            createTextVNode(" " + toDisplayString(uploading.value ? "正在上传…" : "添加图片"), 1)
          ], 8, _hoisted_3$2),
          createBaseVNode("span", null, toDisplayString(attachments.value.length) + "/9 张 · 每张最多 5 MB", 1),
          attachments.value.length ? (openBlock(), createElementBlock("button", {
            key: 0,
            type: "button",
            class: "post-images-clear",
            disabled: __props.disabled || uploading.value,
            onClick: clearImages
          }, "清空", 8, _hoisted_4$2)) : createCommentVNode("", true),
          createBaseVNode("input", {
            ref_key: "input",
            ref: input,
            class: "post-images-input",
            type: "file",
            accept: ".png,.jpg,.jpeg,.gif,.webp,.bmp",
            multiple: "",
            disabled: __props.disabled || uploading.value,
            "aria-label": "选择帖子图片",
            onChange: selectImages
          }, null, 40, _hoisted_5$2)
        ]),
        _cache[4] || (_cache[4] = createBaseVNode("p", { class: "post-images-hint" }, "支持 PNG、JPEG、GIF、WEBP、BMP；上传后会插入正文。", -1)),
        error.value ? (openBlock(), createElementBlock("p", _hoisted_6$2, toDisplayString(error.value), 1)) : createCommentVNode("", true),
        attachments.value.length ? (openBlock(), createElementBlock("div", _hoisted_7$2, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(attachments.value, (item) => {
            return openBlock(), createElementBlock("figure", {
              key: item.id,
              class: normalizeClass(["post-image-tile", { failed: item.status === "error" }])
            }, [
              createBaseVNode("div", _hoisted_8$2, [
                createBaseVNode("img", {
                  src: item.preview,
                  alt: item.name
                }, null, 8, _hoisted_9$2),
                item.status === "uploading" ? (openBlock(), createElementBlock("span", _hoisted_10$2, "上传中…")) : item.status === "done" ? (openBlock(), createElementBlock("span", _hoisted_11$2, "已上传")) : createCommentVNode("", true)
              ]),
              createBaseVNode("figcaption", {
                title: item.name
              }, toDisplayString(item.name), 9, _hoisted_12$2),
              item.error ? (openBlock(), createElementBlock("p", _hoisted_13$2, [
                createTextVNode(toDisplayString(item.error), 1),
                _cache[2] || (_cache[2] = createBaseVNode("br", null, null, -1)),
                _cache[3] || (_cache[3] = createTextVNode("请移除后重新选择。", -1))
              ])) : createCommentVNode("", true),
              createBaseVNode("button", {
                type: "button",
                class: "post-image-remove",
                disabled: __props.disabled || uploading.value,
                "aria-label": `移除图片 ${item.name}`,
                onClick: ($event) => removeImage(item.id)
              }, "×", 8, _hoisted_14$2)
            ], 2);
          }), 128))
        ])) : createCommentVNode("", true),
        uploading.value ? (openBlock(), createElementBlock("p", _hoisted_15$2, "图片正在上传，请稍候再发布。")) : createCommentVNode("", true)
      ]);
    };
  }
});
const CommunityPostImages = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-0bc4ee6a"]]);
const _hoisted_1$1 = {
  class: "community-moderation",
  "aria-label": "社区举报管理"
};
const _hoisted_2$1 = {
  key: 0,
  class: "community-alert",
  role: "alert"
};
const _hoisted_3$1 = { class: "moderation-toolbar" };
const _hoisted_4$1 = {
  class: "community-tabs",
  "aria-label": "举报状态筛选"
};
const _hoisted_5$1 = ["aria-pressed", "disabled", "onClick", "textContent"];
const _hoisted_6$1 = ["disabled"];
const _hoisted_7$1 = ["textContent"];
const _hoisted_8$1 = ["textContent"];
const _hoisted_9$1 = {
  key: 2,
  class: "moderation-loading",
  role: "status"
};
const _hoisted_10$1 = {
  key: 3,
  class: "community-empty moderation-empty"
};
const _hoisted_11$1 = ["aria-busy"];
const _hoisted_12$1 = { class: "moderation-report-heading" };
const _hoisted_13$1 = ["textContent"];
const _hoisted_14$1 = ["textContent"];
const _hoisted_15$1 = { class: "moderation-details" };
const _hoisted_16$1 = ["textContent"];
const _hoisted_17$1 = ["textContent"];
const _hoisted_18$1 = { key: 0 };
const _hoisted_19$1 = {
  key: 2,
  class: "moderation-context-note"
};
const _hoisted_20$1 = {
  key: 3,
  class: "community-warning"
};
const _hoisted_21$1 = { class: "community-actions moderation-actions" };
const _hoisted_22$1 = ["disabled", "onClick"];
const _hoisted_23$1 = ["disabled", "onClick"];
const _hoisted_24$1 = ["disabled", "onClick"];
const _hoisted_25$1 = ["disabled", "onClick"];
const _hoisted_26$1 = {
  key: 4,
  class: "moderation-confirm",
  role: "alert",
  "aria-live": "polite"
};
const _hoisted_27$1 = { key: 0 };
const _hoisted_28$1 = { class: "community-actions" };
const _hoisted_29$1 = ["disabled"];
const _hoisted_30$1 = ["disabled"];
const _hoisted_31$1 = { class: "community-pagination moderation-pagination" };
const _hoisted_32$1 = ["disabled"];
const _hoisted_33$1 = ["disabled"];
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "CommunityModerationPanel",
  emits: ["openPost", "changed", "busy"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const { user, accountEpoch } = useCommunityAccount();
    const isAdmin = computed(() => user.value?.role === "admin");
    const filters = [
      { value: "pending", label: "待处理" },
      { value: "resolved", label: "已处理" },
      { value: "dismissed", label: "已忽略" }
    ];
    const status = ref("pending");
    const reports = ref([]);
    const page = ref(1), total = ref(0), totalPages = ref(1);
    const loading = ref(false), busy = ref(false);
    const error = ref(""), notice = ref("");
    const confirmation = ref(null);
    const deletedTargets = ref(/* @__PURE__ */ new Set());
    let session = 0, request = 0, disposed = false;
    watch(busy, (value) => emit("busy", value), { flush: "sync" });
    function active(current, epoch) {
      return !disposed && isAdmin.value && current === session && epoch === accountEpoch.value;
    }
    function targetKey(report) {
      return `${report.targetType}:${report.targetId}`;
    }
    function isContentDeleted(report) {
      return deletedTargets.value.has(targetKey(report));
    }
    function inspectionPostId(report) {
      const id = report.targetType === "post" ? report.targetId : report.postId;
      return Number.isSafeInteger(id) && Number(id) > 0 ? Number(id) : null;
    }
    function inspectReport(report) {
      if (!isAdmin.value || busy.value || disposed) return;
      const id = inspectionPostId(report);
      if (id !== null) emit("openPost", id);
    }
    async function loadReports(nextPage = page.value) {
      if (!isAdmin.value || disposed) return;
      const current = session, epoch = accountEpoch.value, currentRequest = ++request;
      loading.value = true;
      error.value = "";
      confirmation.value = null;
      try {
        const result = await communityApi().listReports({ status: status.value, page: nextPage });
        if (!active(current, epoch) || currentRequest !== request) return;
        reports.value = result.list;
        page.value = result.page;
        total.value = result.total;
        totalPages.value = Math.max(1, result.totalPages);
      } catch (cause) {
        if (active(current, epoch) && currentRequest === request) error.value = communityError(cause);
      } finally {
        if (active(current, epoch) && currentRequest === request) loading.value = false;
      }
    }
    async function changeStatus(next) {
      if (!isAdmin.value || loading.value || busy.value || disposed || status.value === next) return;
      status.value = next;
      reports.value = [];
      total.value = 0;
      totalPages.value = 1;
      page.value = 1;
      notice.value = "";
      await loadReports(1);
    }
    function requestAction(report, action) {
      if (!isAdmin.value || loading.value || busy.value || disposed || report.status !== "pending") return;
      if (isContentDeleted(report) && action !== "resolved") return;
      error.value = "";
      notice.value = "";
      confirmation.value = { report, action, phase: 1 };
    }
    function cancelAction() {
      if (!busy.value) confirmation.value = null;
    }
    async function confirmAction() {
      const selected = confirmation.value;
      if (!selected || !isAdmin.value || loading.value || busy.value || disposed) return;
      if (selected.action === "delete" && selected.phase === 1) {
        selected.phase = 2;
        return;
      }
      const current = session, epoch = accountEpoch.value;
      const { report, action } = selected;
      busy.value = true;
      error.value = "";
      notice.value = "";
      try {
        if (action === "delete") {
          if (report.targetType === "post") await communityApi().removePost(report.targetId);
          else await communityApi().removeComment(report.targetId);
          if (!active(current, epoch)) return;
          deletedTargets.value = /* @__PURE__ */ new Set([...deletedTargets.value, targetKey(report)]);
          emit("changed");
        }
        if (!active(current, epoch)) return;
        await communityApi().resolveReport(report.id, action === "dismissed" ? "dismissed" : "resolved");
        if (!active(current, epoch)) return;
        confirmation.value = null;
        notice.value = action === "dismissed" ? "举报已忽略，内容保留。" : isContentDeleted(report) ? "内容已删除，举报已标记为已处理。" : "举报已标记为已处理，内容保留。";
        emit("changed");
        const nextPage = reports.value.length === 1 && page.value > 1 ? page.value - 1 : page.value;
        reports.value = reports.value.filter((item) => item.id !== report.id);
        total.value = Math.max(0, total.value - 1);
        await loadReports(nextPage);
      } catch (cause) {
        if (!active(current, epoch)) return;
        confirmation.value = null;
        error.value = isContentDeleted(report) ? `内容已删除，但举报状态更新失败：${communityError(cause)}。请使用“仅标记已处理”重试。` : communityError(cause);
      } finally {
        if (active(current, epoch)) busy.value = false;
      }
    }
    watch([accountEpoch, () => user.value?.id, () => user.value?.role], () => {
      session++;
      request++;
      reports.value = [];
      confirmation.value = null;
      deletedTargets.value = /* @__PURE__ */ new Set();
      loading.value = false;
      busy.value = false;
      error.value = "";
      notice.value = "";
      page.value = 1;
      total.value = 0;
      totalPages.value = 1;
      status.value = "pending";
      const current = session, epoch = accountEpoch.value;
      void Promise.resolve().then(() => {
        if (active(current, epoch)) return loadReports(1);
      });
    }, { immediate: true, flush: "sync" });
    onUnmounted(() => {
      disposed = true;
      session++;
      request++;
      if (busy.value) emit("busy", false);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("section", _hoisted_1$1, [
        !isAdmin.value ? (openBlock(), createElementBlock("p", _hoisted_2$1, "仅管理员可以查看和处理举报。")) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          _cache[7] || (_cache[7] = createBaseVNode("p", { class: "community-muted moderation-intro" }, "核查举报后，可保留内容并结束处理，或删除违规内容。标记已处理和忽略举报都不会自动删除内容。", -1)),
          createBaseVNode("div", _hoisted_3$1, [
            createBaseVNode("div", _hoisted_4$1, [
              (openBlock(), createElementBlock(Fragment, null, renderList(filters, (filter) => {
                return createBaseVNode("button", {
                  key: filter.value,
                  type: "button",
                  class: normalizeClass({ active: status.value === filter.value }),
                  "aria-pressed": status.value === filter.value,
                  disabled: loading.value || busy.value,
                  onClick: ($event) => changeStatus(filter.value),
                  textContent: toDisplayString(filter.label)
                }, null, 10, _hoisted_5$1);
              }), 64))
            ]),
            createBaseVNode("button", {
              type: "button",
              class: "community-btn",
              disabled: loading.value || busy.value,
              onClick: _cache[0] || (_cache[0] = ($event) => loadReports())
            }, "刷新举报", 8, _hoisted_6$1)
          ]),
          error.value ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "community-alert",
            role: "alert",
            textContent: toDisplayString(error.value)
          }, null, 8, _hoisted_7$1)) : createCommentVNode("", true),
          notice.value ? (openBlock(), createElementBlock("div", {
            key: 1,
            class: "community-notice",
            role: "status",
            textContent: toDisplayString(notice.value)
          }, null, 8, _hoisted_8$1)) : createCommentVNode("", true),
          loading.value ? (openBlock(), createElementBlock("p", _hoisted_9$1, "正在加载举报…")) : !reports.value.length ? (openBlock(), createElementBlock("div", _hoisted_10$1, "当前筛选下没有举报。")) : (openBlock(), createElementBlock("div", {
            key: 4,
            class: "moderation-list",
            "aria-busy": busy.value
          }, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(reports.value, (report) => {
              return openBlock(), createElementBlock("article", {
                key: report.id,
                class: "moderation-report"
              }, [
                createBaseVNode("header", _hoisted_12$1, [
                  createBaseVNode("strong", null, toDisplayString(report.targetType === "post" ? "帖子" : "评论") + " #" + toDisplayString(report.targetId), 1),
                  createBaseVNode("span", null, "举报 #" + toDisplayString(report.id) + " · " + toDisplayString(filters.find((filter) => filter.value === report.status)?.label), 1)
                ]),
                report.targetTitle ? (openBlock(), createElementBlock("p", {
                  key: 0,
                  class: "moderation-target-title",
                  textContent: toDisplayString(report.targetTitle)
                }, null, 8, _hoisted_13$1)) : createCommentVNode("", true),
                report.targetContent ? (openBlock(), createElementBlock("p", {
                  key: 1,
                  class: "moderation-target-content",
                  textContent: toDisplayString(report.targetContent)
                }, null, 8, _hoisted_14$1)) : createCommentVNode("", true),
                createBaseVNode("dl", _hoisted_15$1, [
                  createBaseVNode("div", null, [
                    _cache[3] || (_cache[3] = createBaseVNode("dt", null, "举报原因", -1)),
                    createBaseVNode("dd", {
                      class: "moderation-reason",
                      textContent: toDisplayString(report.reason)
                    }, null, 8, _hoisted_16$1)
                  ]),
                  createBaseVNode("div", null, [
                    _cache[4] || (_cache[4] = createBaseVNode("dt", null, "举报人", -1)),
                    createBaseVNode("dd", {
                      textContent: toDisplayString(report.reporterName || "未提供")
                    }, null, 8, _hoisted_17$1)
                  ]),
                  createBaseVNode("div", null, [
                    _cache[5] || (_cache[5] = createBaseVNode("dt", null, "举报时间", -1)),
                    createBaseVNode("dd", null, toDisplayString(unref(communityDate)(report.createdAt)), 1)
                  ]),
                  report.resolvedAt ? (openBlock(), createElementBlock("div", _hoisted_18$1, [
                    _cache[6] || (_cache[6] = createBaseVNode("dt", null, "处理时间", -1)),
                    createBaseVNode("dd", null, toDisplayString(unref(communityDate)(report.resolvedAt)), 1)
                  ])) : createCommentVNode("", true)
                ]),
                report.targetType === "comment" && !inspectionPostId(report) ? (openBlock(), createElementBlock("p", _hoisted_19$1, "该评论未提供所属帖子，可通过评论编号核查。")) : createCommentVNode("", true),
                report.status === "pending" && isContentDeleted(report) ? (openBlock(), createElementBlock("p", _hoisted_20$1, "内容已删除，举报状态尚待更新；可仅重试标记已处理。")) : createCommentVNode("", true),
                createBaseVNode("div", _hoisted_21$1, [
                  inspectionPostId(report) && !isContentDeleted(report) ? (openBlock(), createElementBlock("button", {
                    key: 0,
                    type: "button",
                    class: "community-btn",
                    disabled: loading.value || busy.value,
                    onClick: ($event) => inspectReport(report)
                  }, "查看帖子", 8, _hoisted_22$1)) : createCommentVNode("", true),
                  report.status === "pending" ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                    createBaseVNode("button", {
                      type: "button",
                      class: "community-btn primary",
                      disabled: loading.value || busy.value,
                      onClick: ($event) => requestAction(report, "resolved")
                    }, toDisplayString(isContentDeleted(report) ? "仅标记已处理" : "标记已处理"), 9, _hoisted_23$1),
                    !isContentDeleted(report) ? (openBlock(), createElementBlock("button", {
                      key: 0,
                      type: "button",
                      class: "community-btn",
                      disabled: loading.value || busy.value,
                      onClick: ($event) => requestAction(report, "dismissed")
                    }, "忽略举报", 8, _hoisted_24$1)) : createCommentVNode("", true),
                    !isContentDeleted(report) ? (openBlock(), createElementBlock("button", {
                      key: 1,
                      type: "button",
                      class: "community-btn danger",
                      disabled: loading.value || busy.value,
                      onClick: ($event) => requestAction(report, "delete")
                    }, "删除被举报内容", 8, _hoisted_25$1)) : createCommentVNode("", true)
                  ], 64)) : createCommentVNode("", true)
                ]),
                confirmation.value?.report.id === report.id ? (openBlock(), createElementBlock("div", _hoisted_26$1, [
                  confirmation.value.action === "delete" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                    createBaseVNode("strong", null, toDisplayString(confirmation.value.phase === 1 ? "确认要处理的内容" : "最后确认：删除后无法在此恢复"), 1),
                    createBaseVNode("p", null, "将删除" + toDisplayString(report.targetType === "post" ? "帖子" : "评论") + " #" + toDisplayString(report.targetId) + toDisplayString(report.targetType === "post" ? "及其评论" : "") + "，成功后再将举报 #" + toDisplayString(report.id) + " 标记为已处理。", 1),
                    confirmation.value.phase === 2 ? (openBlock(), createElementBlock("p", _hoisted_27$1, "请确认已核查上述内容。若删除成功但举报状态更新失败，可单独重试标记已处理。")) : createCommentVNode("", true)
                  ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                    createBaseVNode("strong", null, toDisplayString(confirmation.value.action === "dismissed" ? "确认忽略这条举报" : "确认标记为已处理"), 1),
                    createBaseVNode("p", null, toDisplayString(isContentDeleted(report) ? "只更新举报状态，不再执行删除。" : confirmation.value.action === "dismissed" ? "此操作将举报标记为已忽略，保留被举报内容。" : "此操作只结束举报处理，被举报内容将保留。"), 1)
                  ], 64)),
                  createBaseVNode("div", _hoisted_28$1, [
                    createBaseVNode("button", {
                      type: "button",
                      class: "community-btn",
                      disabled: busy.value,
                      onClick: cancelAction
                    }, "取消", 8, _hoisted_29$1),
                    createBaseVNode("button", {
                      type: "button",
                      class: normalizeClass(["community-btn", confirmation.value.action === "delete" ? "danger" : "primary"]),
                      disabled: loading.value || busy.value,
                      onClick: confirmAction
                    }, toDisplayString(busy.value ? "处理中…" : confirmation.value.action === "delete" ? confirmation.value.phase === 1 ? "继续删除确认" : "确认删除并标记已处理" : confirmation.value.action === "dismissed" ? "确认忽略" : "确认标记已处理"), 11, _hoisted_30$1)
                  ])
                ])) : createCommentVNode("", true)
              ]);
            }), 128))
          ], 8, _hoisted_11$1)),
          createBaseVNode("div", _hoisted_31$1, [
            createBaseVNode("button", {
              type: "button",
              class: "community-btn",
              disabled: loading.value || busy.value || page.value <= 1,
              onClick: _cache[1] || (_cache[1] = ($event) => loadReports(page.value - 1))
            }, "上一页", 8, _hoisted_32$1),
            createBaseVNode("span", null, "第 " + toDisplayString(page.value) + " / " + toDisplayString(totalPages.value) + " 页 · 共 " + toDisplayString(total.value) + " 条", 1),
            createBaseVNode("button", {
              type: "button",
              class: "community-btn",
              disabled: loading.value || busy.value || page.value >= totalPages.value,
              onClick: _cache[2] || (_cache[2] = ($event) => loadReports(page.value + 1))
            }, "下一页", 8, _hoisted_33$1)
          ])
        ], 64))
      ]);
    };
  }
});
const CommunityModerationPanel = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-cd6d8dd5"]]);
const _hoisted_1 = { class: "community-page forum-page" };
const _hoisted_2 = {
  class: "forum-main-tabs",
  role: "tablist",
  "aria-label": "社区内容"
};
const _hoisted_3 = ["aria-selected"];
const _hoisted_4 = ["aria-selected"];
const _hoisted_5 = { class: "forum-layout" };
const _hoisted_6 = ["aria-label"];
const _hoisted_7 = {
  class: "forum-avatar",
  "aria-hidden": "true"
};
const _hoisted_8 = { class: "forum-feed-panel" };
const _hoisted_9 = { class: "forum-feed-heading" };
const _hoisted_10 = ["disabled"];
const _hoisted_11 = {
  class: "forum-categories",
  "aria-label": "主题分类"
};
const _hoisted_12 = ["aria-pressed"];
const _hoisted_13 = ["aria-pressed", "onClick"];
const _hoisted_14 = {
  key: 0,
  class: "community-notice",
  role: "status"
};
const _hoisted_15 = {
  key: 1,
  class: "community-alert",
  role: "alert"
};
const _hoisted_16 = {
  key: 2,
  class: "community-empty forum-feed-empty",
  role: "status"
};
const _hoisted_17 = {
  key: 0,
  class: "forum-thread-list"
};
const _hoisted_18 = ["aria-label", "onClick"];
const _hoisted_19 = { class: "forum-thread-copy" };
const _hoisted_20 = { class: "forum-thread-title" };
const _hoisted_21 = {
  key: 0,
  class: "community-tag"
};
const _hoisted_22 = { class: "forum-category-label" };
const _hoisted_23 = ["src"];
const _hoisted_24 = { class: "forum-thread-meta" };
const _hoisted_25 = ["datetime", "title"];
const _hoisted_26 = { class: "forum-thread-stats" };
const _hoisted_27 = ["aria-label"];
const _hoisted_28 = ["aria-label"];
const _hoisted_29 = {
  key: 1,
  class: "community-empty forum-feed-empty"
};
const _hoisted_30 = {
  key: 2,
  class: "community-pagination forum-feed-pagination",
  "aria-label": "帖子分页"
};
const _hoisted_31 = ["disabled"];
const _hoisted_32 = ["disabled"];
const _hoisted_33 = {
  class: "community-tabs forum-plan-tabs",
  role: "tablist",
  "aria-label": "方案类型"
};
const _hoisted_34 = ["aria-selected", "onClick"];
const _hoisted_35 = { class: "community-toolbar forum-plan-toolbar" };
const _hoisted_36 = { class: "community-muted" };
const _hoisted_37 = ["disabled"];
const _hoisted_38 = {
  key: 0,
  class: "community-notice",
  role: "status"
};
const _hoisted_39 = {
  key: 1,
  class: "community-alert",
  role: "alert"
};
const _hoisted_40 = {
  key: 2,
  class: "community-empty",
  role: "status"
};
const _hoisted_41 = {
  key: 0,
  class: "community-grid"
};
const _hoisted_42 = ["aria-label", "onClick"];
const _hoisted_43 = { class: "community-card-copy" };
const _hoisted_44 = { class: "community-tag" };
const _hoisted_45 = { class: "community-card-meta" };
const _hoisted_46 = {
  key: 1,
  class: "community-empty"
};
const _hoisted_47 = {
  key: 2,
  class: "community-pagination",
  "aria-label": "社区方案分页"
};
const _hoisted_48 = ["disabled"];
const _hoisted_49 = ["disabled"];
const _hoisted_50 = {
  class: "forum-sidebar",
  "aria-label": "社区侧栏"
};
const _hoisted_51 = { class: "forum-side-card forum-welcome" };
const _hoisted_52 = {
  key: 0,
  class: "forum-side-card"
};
const _hoisted_53 = { class: "forum-side-card" };
const _hoisted_54 = { class: "forum-plan-shortcuts" };
const _hoisted_55 = ["onClick"];
const _hoisted_56 = {
  class: "forum-shortcut-icon",
  "aria-hidden": "true"
};
const _hoisted_57 = {
  key: 0,
  role: "status"
};
const _hoisted_58 = {
  key: 1,
  class: "community-alert",
  role: "alert"
};
const _hoisted_59 = { class: "community-muted" };
const _hoisted_60 = { class: "community-description" };
const _hoisted_61 = { class: "community-actions" };
const _hoisted_62 = ["disabled"];
const _hoisted_63 = ["disabled"];
const _hoisted_64 = ["disabled"];
const _hoisted_65 = ["disabled"];
const _hoisted_66 = ["value"];
const _hoisted_67 = {
  key: 0,
  class: "community-capture-intro"
};
const _hoisted_68 = ["disabled"];
const _hoisted_69 = {
  key: 1,
  class: "community-muted",
  role: "status"
};
const _hoisted_70 = ["disabled"];
const _hoisted_71 = { value: "" };
const _hoisted_72 = ["value"];
const _hoisted_73 = {
  key: 2,
  class: "community-muted"
};
const _hoisted_74 = {
  key: 3,
  class: "community-muted"
};
const _hoisted_75 = {
  key: 4,
  class: "community-capture-notes",
  open: ""
};
const _hoisted_76 = ["aria-expanded"];
const _hoisted_77 = { class: "community-import-option" };
const _hoisted_78 = { class: "community-file" };
const _hoisted_79 = ["disabled"];
const _hoisted_80 = ["disabled"];
const _hoisted_81 = ["disabled"];
const _hoisted_82 = {
  key: 8,
  class: "community-alert",
  role: "alert"
};
const _hoisted_83 = ["disabled"];
const _hoisted_84 = {
  key: 0,
  role: "status"
};
const _hoisted_85 = {
  key: 1,
  class: "community-alert",
  role: "alert"
};
const _hoisted_86 = {
  key: 0,
  class: "community-tag"
};
const _hoisted_87 = { class: "community-muted" };
const _hoisted_88 = { class: "community-actions" };
const _hoisted_89 = ["disabled"];
const _hoisted_90 = ["disabled"];
const _hoisted_91 = ["disabled"];
const _hoisted_92 = ["disabled"];
const _hoisted_93 = ["disabled"];
const _hoisted_94 = ["disabled"];
const _hoisted_95 = {
  key: 0,
  class: "community-muted"
};
const _hoisted_96 = {
  key: 0,
  class: "community-actions"
};
const _hoisted_97 = ["disabled", "onClick"];
const _hoisted_98 = ["disabled", "onClick"];
const _hoisted_99 = ["disabled", "onClick"];
const _hoisted_100 = ["disabled"];
const _hoisted_101 = {
  key: 1,
  class: "community-pagination",
  "aria-label": "回复分页"
};
const _hoisted_102 = ["disabled"];
const _hoisted_103 = ["disabled"];
const _hoisted_104 = ["disabled"];
const _hoisted_105 = ["disabled"];
const _hoisted_106 = {
  key: 3,
  class: "community-login-hint"
};
const _hoisted_107 = ["disabled"];
const _hoisted_108 = ["disabled"];
const _hoisted_109 = ["value"];
const _hoisted_110 = ["disabled"];
const _hoisted_111 = {
  key: 0,
  class: "community-alert",
  role: "alert"
};
const _hoisted_112 = ["disabled"];
const _hoisted_113 = { class: "community-muted" };
const _hoisted_114 = ["disabled"];
const _hoisted_115 = {
  key: 0,
  class: "community-alert",
  role: "alert"
};
const _hoisted_116 = ["disabled"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Community",
  setup(__props) {
    const router = useRouter(), route = useRoute(), { user, accountEpoch, refreshAccount } = useCommunityAccount();
    const tab = ref("posts"), query = ref(""), page = ref(1), totalPages = ref(0), total = ref(0);
    const plans = ref([]), loading = ref(false), error = ref(""), notice = ref(""), busy = ref(false);
    const detailOpen = ref(false), detailLoading = ref(false), detail = ref(null), detailError = ref(""), deletePlanIntent = ref(false);
    const publishOpen = ref(false), publishKind = ref("system"), localPlans = ref([]), localId = ref(""), localLoading = ref(false);
    const publishPayload = ref(null), publishTitle = ref(""), publishDescription = ref(""), publishError = ref("");
    const systemCapture = ref(null), captureNotes = ref([]), capturedAt = ref(), showPublishPreview = ref(false);
    const posts = ref([]), categories = ref([]), categoryId = ref(), postPage = ref(1), postPages = ref(0);
    const postOpen = ref(false), postDetail = ref(null), comments = ref([]), commentPage = ref(1), commentPages = ref(0), replyText = ref(""), deletePostIntent = ref(false);
    const postComposeOpen = ref(false), postTitle = ref(""), postContent = ref(""), postCategory = ref(), postError = ref("");
    const isAdmin = computed(() => user.value?.role === "admin"), moderationOpen = ref(false), moderationBusy = ref(false);
    const imageBusy = ref(false), imageResetKey = ref(0), postImages = ref([]), deleteCommentIntent = ref(null);
    const reportOpen = ref(false), reportTarget = ref(null), reportReason = ref(""), reportError = ref("");
    let mounted = true, accountReady = false, openingRequestedPublisher = false, catalogRequest = 0, detailRequest = 0, localRequest = 0, commentRequest = 0;
    const currentKind = computed(() => communityKinds.find((item) => item.value === tab.value));
    const categoryName = (id) => categories.value.find((category) => category.id === id)?.name || "社区交流";
    const currentCategory = computed(() => categoryId.value === void 0 ? "最新主题" : categoryName(categoryId.value));
    function forumTime(value) {
      const date = new Date(value);
      return Number.isFinite(date.getTime()) ? date.toLocaleString("zh-CN", { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" }) : "时间未提供";
    }
    function showPlans(kind = "system") {
      tab.value = kind;
    }
    function postExcerpt(post) {
      return communityPostParts(post.content).map((part) => part.type === "text" ? part.text : "[图片]").join("").slice(0, 180);
    }
    const current = (epoch) => mounted && accountEpoch.value === epoch;
    function requireLogin() {
      if (user.value) return true;
      void router.push("/account");
      return false;
    }
    async function loadCatalog() {
      const request = ++catalogRequest, epoch = accountEpoch.value;
      loading.value = true;
      error.value = "";
      plans.value = [];
      posts.value = [];
      try {
        if (tab.value === "posts") {
          const [result, list] = await Promise.all([communityApi().posts({ page: postPage.value, categoryId: categoryId.value }), communityApi().categories()]);
          if (request !== catalogRequest || !current(epoch)) return;
          posts.value = result.list;
          postPages.value = result.totalPages;
          categories.value = list;
        } else {
          const result = await communityApi().listPlans({ kind: tab.value, q: query.value.trim(), page: page.value });
          if (request !== catalogRequest || !current(epoch)) return;
          plans.value = result.list;
          totalPages.value = result.totalPages;
          total.value = result.total;
        }
      } catch (err) {
        if (request === catalogRequest && current(epoch)) error.value = communityError(err);
      } finally {
        if (request === catalogRequest && current(epoch)) loading.value = false;
      }
    }
    watch(tab, () => {
      page.value = 1;
      postPage.value = 1;
      query.value = "";
      notice.value = "";
      void loadCatalog();
    });
    watch(categoryId, () => {
      postPage.value = 1;
      void loadCatalog();
    });
    function search() {
      page.value = 1;
      void loadCatalog();
    }
    function changePage(next) {
      if (tab.value === "posts") postPage.value = next;
      else page.value = next;
      void loadCatalog();
    }
    async function openPlan(plan) {
      const request = ++detailRequest, epoch = accountEpoch.value;
      detailOpen.value = true;
      detailLoading.value = true;
      detail.value = null;
      detailError.value = "";
      deletePlanIntent.value = false;
      try {
        const result = await communityApi().plan(plan.id);
        if (request === detailRequest && current(epoch)) detail.value = result;
      } catch (err) {
        if (request === detailRequest && current(epoch)) detailError.value = communityError(err);
      } finally {
        if (request === detailRequest && current(epoch)) detailLoading.value = false;
      }
    }
    watch(detailOpen, (open) => {
      if (!open) {
        detailRequest++;
        detail.value = null;
        detailError.value = "";
      }
    });
    async function savePlan() {
      if (!detail.value || busy.value || !requireLogin()) return;
      const epoch = accountEpoch.value, plan = detail.value;
      busy.value = true;
      detailError.value = "";
      try {
        await communityApi().savePlan(plan.id);
        if (current(epoch)) {
          notice.value = `已保存「${plan.title}」的当前版本，可在我的方案中预览和应用。`;
          detailOpen.value = false;
        }
      } catch (err) {
        if (current(epoch)) detailError.value = communityError(err);
      } finally {
        if (current(epoch)) busy.value = false;
      }
    }
    async function deletePlan() {
      if (!detail.value || busy.value) return;
      const epoch = accountEpoch.value, id = detail.value.id;
      busy.value = true;
      try {
        await communityApi().removePlan(id);
        if (current(epoch)) {
          detailOpen.value = false;
          notice.value = "已删除你发布的方案。";
          await loadCatalog();
        }
      } catch (err) {
        if (current(epoch)) detailError.value = communityError(err);
      } finally {
        if (current(epoch)) busy.value = false;
      }
    }
    async function loadLocalPlans() {
      const request = ++localRequest, epoch = accountEpoch.value;
      localLoading.value = true;
      localPlans.value = [];
      localId.value = "";
      publishPayload.value = null;
      systemCapture.value = null;
      captureNotes.value = [];
      capturedAt.value = void 0;
      showPublishPreview.value = false;
      publishError.value = "";
      try {
        const result = await communityApi().localPlans(publishKind.value);
        if (request === localRequest && current(epoch)) {
          localPlans.value = result;
          if (publishKind.value === "system" && result.some((item) => item.id === "system-current")) {
            localId.value = "system-current";
            chooseLocal();
          }
        }
      } catch (err) {
        if (request === localRequest && current(epoch)) publishError.value = communityError(err);
      } finally {
        if (request === localRequest && current(epoch)) localLoading.value = false;
      }
    }
    function openPublisher() {
      if (!user.value) {
        void router.push(tab.value === "system" || tab.value === "posts" ? "/account?return=system-share" : "/account");
        return;
      }
      publishKind.value = tab.value === "posts" ? "system" : tab.value;
      publishTitle.value = "";
      publishDescription.value = "";
      publishOpen.value = true;
      void loadLocalPlans();
    }
    async function openRequestedPublisher() {
      if (!mounted || !accountReady || openingRequestedPublisher || route.query.publish !== "system") return;
      openingRequestedPublisher = true;
      try {
        if (!user.value) {
          await router.replace("/account?return=system-share");
          return;
        }
        const query2 = { ...route.query };
        delete query2.publish;
        await router.replace({ path: "/community", query: query2 });
        if (!mounted || !user.value) return;
        tab.value = "system";
        openPublisher();
      } finally {
        openingRequestedPublisher = false;
      }
    }
    function acceptPayload(payload) {
      systemCapture.value = payload?.kind === "system" && payload.params.catalog === "system-settings-v1" ? payload : null;
      publishPayload.value = systemCapture.value ? null : payload;
      showPublishPreview.value = false;
    }
    function chooseLocal() {
      const selected = localPlans.value.find((item) => item.id === localId.value);
      captureNotes.value = selected?.notes || [];
      capturedAt.value = selected?.capturedAt;
      try {
        acceptPayload(selected ? validatePreset(selected.payload) : null);
        if (selected && !publishTitle.value) publishTitle.value = selected.title.slice(0, 80);
        publishError.value = "";
      } catch (err) {
        acceptPayload(null);
        publishError.value = communityError(err);
      }
    }
    async function readPreset(event) {
      const input = event.target, file = input.files?.[0], epoch = accountEpoch.value;
      input.value = "";
      if (!file) return;
      const request = ++localRequest;
      publishError.value = "";
      acceptPayload(null);
      captureNotes.value = [];
      capturedAt.value = void 0;
      localId.value = "";
      localLoading.value = false;
      try {
        if (file.size > 65536) throw new Error("方案 JSON 文件不能超过 64 KB。");
        const payload = validatePreset(JSON.parse((await file.text()).replace(/^\uFEFF/, "")));
        if (!current(epoch) || request !== localRequest) return;
        if (payload.kind !== publishKind.value) throw new Error(`该文件是${communityKindLabel(payload.kind)}方案，请先选择对应的方案类型。`);
        acceptPayload(payload);
        if (!publishTitle.value) publishTitle.value = file.name.replace(/\.json$/i, "").slice(0, 80);
      } catch (err) {
        if (current(epoch) && request === localRequest) publishError.value = communityError(err);
      }
    }
    async function publish() {
      if (!publishPayload.value || busy.value || !requireLogin()) return;
      const epoch = accountEpoch.value;
      busy.value = true;
      publishError.value = "";
      try {
        await communityApi().publishPlan({ title: publishTitle.value.trim(), description: publishDescription.value.trim(), kind: publishKind.value, payload: validatePreset(publishPayload.value) });
        if (current(epoch)) {
          publishOpen.value = false;
          notice.value = "方案已发布。";
          if (tab.value !== publishKind.value) tab.value = publishKind.value;
          else await loadCatalog();
        }
      } catch (err) {
        if (current(epoch)) publishError.value = communityError(err);
      } finally {
        if (current(epoch)) busy.value = false;
      }
    }
    watch(publishOpen, (open) => {
      if (!open) {
        localRequest++;
        acceptPayload(null);
        localPlans.value = [];
        captureNotes.value = [];
        capturedAt.value = void 0;
        publishError.value = "";
      }
    });
    async function openPost(post) {
      const request = ++detailRequest, epoch = accountEpoch.value;
      postOpen.value = true;
      postDetail.value = null;
      comments.value = [];
      detailLoading.value = true;
      postError.value = "";
      deletePostIntent.value = false;
      deleteCommentIntent.value = null;
      replyText.value = "";
      commentPage.value = 1;
      try {
        const [result, replies] = await Promise.all([communityApi().post(post.id), communityApi().comments(post.id, 1)]);
        if (request === detailRequest && current(epoch)) {
          postDetail.value = result;
          comments.value = replies.list;
          commentPages.value = replies.totalPages;
        }
      } catch (err) {
        if (request === detailRequest && current(epoch)) postError.value = communityError(err);
      } finally {
        if (request === detailRequest && current(epoch)) detailLoading.value = false;
      }
    }
    watch(postOpen, (open) => {
      if (!open) {
        detailRequest++;
        commentRequest++;
        postDetail.value = null;
        comments.value = [];
        replyText.value = "";
      }
    });
    async function loadComments(next) {
      if (!postDetail.value) return false;
      const id = postDetail.value.id, request = ++commentRequest, epoch = accountEpoch.value;
      try {
        const result = await communityApi().comments(id, next);
        if (current(epoch) && request === commentRequest && postDetail.value?.id === id) {
          comments.value = result.list;
          commentPage.value = result.page;
          commentPages.value = result.totalPages;
          return true;
        }
      } catch (err) {
        if (current(epoch) && request === commentRequest && postDetail.value?.id === id) postError.value = communityError(err);
      }
      return false;
    }
    async function reply() {
      if (!postDetail.value || !replyText.value.trim() || busy.value || !requireLogin()) return;
      const id = postDetail.value.id, epoch = accountEpoch.value;
      busy.value = true;
      postError.value = "";
      try {
        await communityApi().reply(id, replyText.value.trim());
        if (current(epoch) && postDetail.value?.id === id) {
          replyText.value = "";
          postDetail.value.comments++;
          const listed = posts.value.find((post) => post.id === id);
          if (listed) listed.comments = postDetail.value.comments;
          await loadComments(1);
        }
      } catch (err) {
        if (current(epoch)) postError.value = communityError(err);
      } finally {
        if (current(epoch)) busy.value = false;
      }
    }
    async function like() {
      if (!postDetail.value || busy.value || !requireLogin()) return;
      const post = postDetail.value, epoch = accountEpoch.value;
      busy.value = true;
      try {
        const result = await communityApi().like(post.id);
        if (current(epoch) && postDetail.value?.id === post.id) {
          post.likes = Math.max(0, post.likes + (result.liked ? 1 : 0) - (post.liked ? 1 : 0));
          post.liked = result.liked;
          const listed = posts.value.find((item) => item.id === post.id);
          if (listed) {
            listed.likes = post.likes;
            listed.liked = post.liked;
          }
        }
      } catch (err) {
        if (current(epoch)) postError.value = communityError(err);
      } finally {
        if (current(epoch)) busy.value = false;
      }
    }
    async function deletePost() {
      if (!postDetail.value || busy.value) return;
      const epoch = accountEpoch.value, id = postDetail.value.id;
      busy.value = true;
      try {
        await communityApi().removePost(id);
        if (current(epoch)) {
          postOpen.value = false;
          notice.value = "帖子已删除。";
          await loadCatalog();
        }
      } catch (err) {
        if (current(epoch)) postError.value = communityError(err);
      } finally {
        if (current(epoch)) busy.value = false;
      }
    }
    async function pinPost() {
      if (!postDetail.value || busy.value || !isAdmin.value) return;
      const post = postDetail.value, epoch = accountEpoch.value;
      busy.value = true;
      postError.value = "";
      try {
        const result = await communityApi().pinPost(post.id);
        if (current(epoch) && postDetail.value?.id === post.id) {
          post.pinned = result.pinned;
          notice.value = result.pinned ? "帖子已置顶。" : "已取消置顶。";
          await loadCatalog();
        }
      } catch (err) {
        if (current(epoch)) postError.value = communityError(err);
      } finally {
        if (current(epoch)) busy.value = false;
      }
    }
    async function deleteComment(comment) {
      if (!postDetail.value || busy.value || deleteCommentIntent.value !== comment.id || !(isAdmin.value || user.value?.id === comment.author.id)) return;
      const epoch = accountEpoch.value, post = postDetail.value;
      busy.value = true;
      postError.value = "";
      const nextPage = comments.value.length === 1 ? Math.max(1, commentPage.value - 1) : commentPage.value;
      try {
        await communityApi().removeComment(comment.id);
        if (current(epoch) && postDetail.value?.id === post.id) {
          deleteCommentIntent.value = null;
          comments.value = comments.value.filter((item) => item.id !== comment.id);
          post.comments = Math.max(0, post.comments - 1);
          const listed = posts.value.find((item) => item.id === post.id);
          if (listed) listed.comments = post.comments;
          notice.value = "回复已删除。";
          const refreshed = await loadComments(nextPage);
          if (!current(epoch)) return;
          if (!refreshed && postDetail.value?.id === post.id) postError.value = `回复已删除，但刷新回复列表失败：${postError.value || "请稍后刷新查看。"}`;
          await loadCatalog();
        }
      } catch (err) {
        if (current(epoch)) postError.value = communityError(err);
      } finally {
        if (current(epoch)) busy.value = false;
      }
    }
    function openReport(targetType, targetId) {
      if (!busy.value && requireLogin()) {
        reportTarget.value = { targetType, targetId };
        reportReason.value = "";
        reportError.value = "";
        reportOpen.value = true;
      }
    }
    async function sendReport() {
      if (!reportTarget.value || busy.value || !reportReason.value.trim() || !requireLogin()) return;
      const epoch = accountEpoch.value;
      busy.value = true;
      reportError.value = "";
      try {
        await communityApi().report({ ...reportTarget.value, reason: reportReason.value.trim() });
        if (current(epoch)) {
          reportOpen.value = false;
          notice.value = "举报已提交，管理员会查看处理。";
        }
      } catch (err) {
        if (current(epoch)) reportError.value = communityError(err);
      } finally {
        if (current(epoch)) busy.value = false;
      }
    }
    async function openModeration() {
      await refreshAccount(true);
      if (!mounted) return;
      if (isAdmin.value) moderationOpen.value = true;
      else error.value = "当前账号没有社区管理员权限，请在软件账号页刷新身份。";
    }
    function openReportedPost(id) {
      moderationOpen.value = false;
      void openPost({ id });
    }
    async function openRequestedModeration() {
      if (!accountReady || route.query.manage !== "reports") return;
      const query2 = { ...route.query };
      delete query2.manage;
      await router.replace({ path: "/community", query: query2 });
      if (mounted) void openModeration();
    }
    function uploadedImage(url) {
      postImages.value.push(url);
      postContent.value = [postContent.value.trim(), `![图片](${url})`].filter(Boolean).join("\n\n");
    }
    function removeImage(url) {
      postImages.value = postImages.value.filter((image) => image !== url);
      postContent.value = postContent.value.split(`![图片](${url})`).join("").trim();
    }
    function composePost() {
      if (requireLogin()) {
        postTitle.value = "";
        postContent.value = "";
        postImages.value = [];
        imageResetKey.value++;
        imageBusy.value = false;
        postCategory.value = categoryId.value;
        postError.value = "";
        postComposeOpen.value = true;
      }
    }
    watch(postComposeOpen, (open) => {
      if (!open) {
        imageResetKey.value++;
        imageBusy.value = false;
        postImages.value = [];
      }
    });
    async function publishPost() {
      if (busy.value || imageBusy.value || !requireLogin()) return;
      const epoch = accountEpoch.value;
      busy.value = true;
      postError.value = "";
      try {
        await communityApi().publishPost({ title: postTitle.value.trim(), content: postContent.value.trim(), categoryId: postCategory.value, coverImage: postImages.value[0] });
        if (current(epoch)) {
          postComposeOpen.value = false;
          notice.value = "帖子已发布。";
          if (tab.value !== "posts") tab.value = "posts";
          else await loadCatalog();
        }
      } catch (err) {
        if (current(epoch)) postError.value = communityError(err);
      } finally {
        if (current(epoch)) busy.value = false;
      }
    }
    watch(accountEpoch, () => {
      catalogRequest++;
      detailRequest++;
      localRequest++;
      commentRequest++;
      detailOpen.value = false;
      publishOpen.value = false;
      postOpen.value = false;
      postComposeOpen.value = false;
      moderationOpen.value = false;
      moderationBusy.value = false;
      reportOpen.value = false;
      reportTarget.value = null;
      deleteCommentIntent.value = null;
      postImages.value = [];
      imageResetKey.value++;
      imageBusy.value = false;
      plans.value = [];
      posts.value = [];
      detail.value = null;
      postDetail.value = null;
      comments.value = [];
      localPlans.value = [];
      publishPayload.value = null;
      publishTitle.value = "";
      publishDescription.value = "";
      postTitle.value = "";
      postContent.value = "";
      replyText.value = "";
      busy.value = false;
      notice.value = "";
      error.value = "";
      void loadCatalog();
    });
    watch(() => route.query.publish, () => {
      void openRequestedPublisher();
    });
    watch(() => route.query.manage, () => {
      void openRequestedModeration();
    });
    onMounted(async () => {
      await refreshAccount(true);
      if (!mounted) return;
      accountReady = true;
      void loadCatalog();
      void openRequestedPublisher();
      void openRequestedModeration();
    });
    onUnmounted(() => {
      mounted = false;
      catalogRequest++;
      detailRequest++;
      localRequest++;
      commentRequest++;
    });
    return (_ctx, _cache) => {
      const _component_router_link = resolveComponent("router-link");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        _cache[77] || (_cache[77] = createStaticVNode('<header class="forum-heading" data-v-39df8426><div class="forum-brand-mark" aria-hidden="true" data-v-39df8426><svg viewBox="0 0 32 32" fill="none" data-v-39df8426><path d="M7 7h18v13a3 3 0 0 1-3 3H13l-6 4V7Z" stroke="currentColor" stroke-width="1.7" data-v-39df8426></path><path d="M12 12h8M12 17h6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" data-v-39df8426></path></svg></div><div data-v-39df8426><h1 data-v-39df8426>QuChen调试社区</h1><p data-v-39df8426>交流游戏体验，分享调校心得，发现适合你的方案。</p></div><span class="forum-brand-note" data-v-39df8426>SUPREME COMMUNITY</span></header>', 1)),
        createBaseVNode("nav", _hoisted_2, [
          createBaseVNode("button", {
            role: "tab",
            "aria-selected": tab.value === "posts",
            class: normalizeClass({ active: tab.value === "posts" }),
            onClick: _cache[0] || (_cache[0] = ($event) => tab.value = "posts")
          }, [..._cache[35] || (_cache[35] = [
            createBaseVNode("svg", {
              viewBox: "0 0 20 20",
              fill: "none",
              "aria-hidden": "true"
            }, [
              createBaseVNode("path", {
                d: "M3 3h14v10H8l-5 4V3Z",
                stroke: "currentColor",
                "stroke-width": "1.4"
              })
            ], -1),
            createTextVNode("动态交流", -1)
          ])], 10, _hoisted_3),
          createBaseVNode("button", {
            role: "tab",
            "aria-selected": tab.value !== "posts",
            class: normalizeClass({ active: tab.value !== "posts" }),
            onClick: _cache[1] || (_cache[1] = ($event) => showPlans())
          }, [..._cache[36] || (_cache[36] = [
            createStaticVNode('<svg viewBox="0 0 20 20" fill="none" aria-hidden="true" data-v-39df8426><rect x="3" y="3" width="5" height="5" rx="1" stroke="currentColor" stroke-width="1.4" data-v-39df8426></rect><rect x="12" y="3" width="5" height="5" rx="1" stroke="currentColor" stroke-width="1.4" data-v-39df8426></rect><rect x="3" y="12" width="5" height="5" rx="1" stroke="currentColor" stroke-width="1.4" data-v-39df8426></rect><rect x="12" y="12" width="5" height="5" rx="1" stroke="currentColor" stroke-width="1.4" data-v-39df8426></rect></svg>方案广场', 2)
          ])], 10, _hoisted_4)
        ]),
        createBaseVNode("div", _hoisted_5, [
          createBaseVNode("section", {
            class: "forum-main",
            "aria-label": tab.value === "posts" ? "社区讨论" : "社区方案广场"
          }, [
            tab.value === "posts" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
              createBaseVNode("button", {
                class: "forum-compose-entry",
                onClick: composePost
              }, [
                createBaseVNode("span", _hoisted_7, toDisplayString(unref(user) ? (unref(user).nickname || unref(user).username).slice(0, 1) : "+"), 1),
                createBaseVNode("span", null, toDisplayString(unref(user) ? "分享一个发现，或向大家提个问题…" : "来聊聊你的游戏体验与调校心得…"), 1),
                _cache[37] || (_cache[37] = createBaseVNode("svg", {
                  viewBox: "0 0 20 20",
                  fill: "none",
                  "aria-hidden": "true"
                }, [
                  createBaseVNode("path", {
                    d: "m4 13-1 4 4-1L17 6l-3-3L4 13Z",
                    stroke: "currentColor",
                    "stroke-width": "1.4"
                  })
                ], -1))
              ]),
              createBaseVNode("div", _hoisted_8, [
                createBaseVNode("div", _hoisted_9, [
                  createBaseVNode("h2", null, toDisplayString(currentCategory.value), 1),
                  createBaseVNode("button", {
                    class: "community-text-btn",
                    disabled: loading.value,
                    onClick: loadCatalog
                  }, "刷新主题", 8, _hoisted_10)
                ]),
                createBaseVNode("nav", _hoisted_11, [
                  createBaseVNode("button", {
                    "aria-pressed": categoryId.value === void 0,
                    class: normalizeClass({ active: categoryId.value === void 0 }),
                    onClick: _cache[2] || (_cache[2] = ($event) => categoryId.value = void 0)
                  }, "全部主题", 10, _hoisted_12),
                  (openBlock(true), createElementBlock(Fragment, null, renderList(categories.value, (category) => {
                    return openBlock(), createElementBlock("button", {
                      key: category.id,
                      "aria-pressed": categoryId.value === category.id,
                      class: normalizeClass({ active: categoryId.value === category.id }),
                      onClick: ($event) => categoryId.value = category.id
                    }, toDisplayString(category.name), 11, _hoisted_13);
                  }), 128))
                ]),
                notice.value ? (openBlock(), createElementBlock("p", _hoisted_14, toDisplayString(notice.value), 1)) : createCommentVNode("", true),
                error.value ? (openBlock(), createElementBlock("div", _hoisted_15, [
                  createTextVNode(toDisplayString(error.value) + " ", 1),
                  createBaseVNode("button", {
                    class: "community-text-btn",
                    onClick: loadCatalog
                  }, "重新加载")
                ])) : createCommentVNode("", true),
                loading.value ? (openBlock(), createElementBlock("div", _hoisted_16, "正在加载帖子…")) : !error.value ? (openBlock(), createElementBlock(Fragment, { key: 3 }, [
                  posts.value.length ? (openBlock(), createElementBlock("div", _hoisted_17, [
                    (openBlock(true), createElementBlock(Fragment, null, renderList(posts.value, (post) => {
                      return openBlock(), createElementBlock("button", {
                        key: post.id,
                        class: "forum-thread-row",
                        "aria-label": "查看帖子 " + post.title,
                        onClick: ($event) => openPost(post)
                      }, [
                        createBaseVNode("span", {
                          class: "forum-avatar",
                          style: normalizeStyle({ "--avatar-hue": String((post.author.id * 47 + 180) % 360) }),
                          "aria-hidden": "true"
                        }, toDisplayString((post.author.nickname || post.author.username).slice(0, 1)), 5),
                        createBaseVNode("div", _hoisted_19, [
                          createBaseVNode("div", _hoisted_20, [
                            post.pinned ? (openBlock(), createElementBlock("span", _hoisted_21, "置顶")) : createCommentVNode("", true),
                            createBaseVNode("span", _hoisted_22, toDisplayString(categoryName(post.categoryId)), 1),
                            createBaseVNode("h3", null, toDisplayString(post.title), 1)
                          ]),
                          createBaseVNode("p", null, toDisplayString(postExcerpt(post)), 1),
                          post.coverImage ? (openBlock(), createElementBlock("img", {
                            key: 0,
                            src: post.coverImage,
                            alt: "帖子图片",
                            class: "community-feed-image",
                            loading: "lazy",
                            referrerpolicy: "no-referrer"
                          }, null, 8, _hoisted_23)) : createCommentVNode("", true),
                          createBaseVNode("div", _hoisted_24, [
                            createBaseVNode("span", null, toDisplayString(post.author.nickname || post.author.username), 1),
                            _cache[38] || (_cache[38] = createBaseVNode("span", { class: "forum-meta-dot" }, "·", -1)),
                            createBaseVNode("time", {
                              datetime: post.createdAt,
                              title: post.createdAt
                            }, toDisplayString(forumTime(post.createdAt)), 9, _hoisted_25)
                          ])
                        ]),
                        createBaseVNode("div", _hoisted_26, [
                          createBaseVNode("span", {
                            "aria-label": post.comments + " 条回复"
                          }, [
                            _cache[39] || (_cache[39] = createBaseVNode("svg", {
                              viewBox: "0 0 20 20",
                              fill: "none",
                              "aria-hidden": "true"
                            }, [
                              createBaseVNode("path", {
                                d: "M3 3h14v10H8l-5 4V3Z",
                                stroke: "currentColor",
                                "stroke-width": "1.3"
                              })
                            ], -1)),
                            createBaseVNode("b", null, toDisplayString(post.comments), 1),
                            _cache[40] || (_cache[40] = createBaseVNode("small", null, "回复", -1))
                          ], 8, _hoisted_27),
                          createBaseVNode("span", {
                            "aria-label": post.likes + " 个赞"
                          }, [
                            _cache[41] || (_cache[41] = createBaseVNode("svg", {
                              viewBox: "0 0 20 20",
                              fill: "none",
                              "aria-hidden": "true"
                            }, [
                              createBaseVNode("path", {
                                d: "M7 8l3-6c2 0 2 2 1 5h4a2 2 0 0 1 2 2l-1 6a2 2 0 0 1-2 2H7V8ZM3 8h4v9H3V8Z",
                                stroke: "currentColor",
                                "stroke-width": "1.3",
                                "stroke-linejoin": "round"
                              })
                            ], -1)),
                            createBaseVNode("b", null, toDisplayString(post.likes), 1),
                            _cache[42] || (_cache[42] = createBaseVNode("small", null, "点赞", -1))
                          ], 8, _hoisted_28)
                        ])
                      ], 8, _hoisted_18);
                    }), 128))
                  ])) : (openBlock(), createElementBlock("div", _hoisted_29, [
                    _cache[43] || (_cache[43] = createBaseVNode("h2", null, "暂时没有帖子", -1)),
                    createBaseVNode("p", null, toDisplayString(categoryId.value === void 0 ? "从一个问题或一段心得，开始这里的讨论。" : "这个分类还没有主题，欢迎分享你的经验。"), 1),
                    createBaseVNode("button", {
                      class: "community-btn",
                      onClick: composePost
                    }, "发起一个话题")
                  ])),
                  postPages.value > 1 ? (openBlock(), createElementBlock("nav", _hoisted_30, [
                    createBaseVNode("button", {
                      class: "community-btn",
                      disabled: postPage.value <= 1,
                      onClick: _cache[3] || (_cache[3] = ($event) => changePage(postPage.value - 1))
                    }, "上一页", 8, _hoisted_31),
                    createBaseVNode("span", null, toDisplayString(postPage.value) + " / " + toDisplayString(postPages.value), 1),
                    createBaseVNode("button", {
                      class: "community-btn",
                      disabled: postPage.value >= postPages.value,
                      onClick: _cache[4] || (_cache[4] = ($event) => changePage(postPage.value + 1))
                    }, "下一页", 8, _hoisted_32)
                  ])) : createCommentVNode("", true)
                ], 64)) : createCommentVNode("", true)
              ])
            ], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
              createBaseVNode("div", { class: "forum-plans-heading" }, [
                _cache[44] || (_cache[44] = createBaseVNode("div", null, [
                  createBaseVNode("h2", null, "发现好用的游戏方案"),
                  createBaseVNode("p", null, "看看大家的设置，预览后保存到自己的方案库。")
                ], -1)),
                createBaseVNode("button", {
                  class: "community-btn primary",
                  onClick: openPublisher
                }, "发布方案")
              ]),
              createBaseVNode("div", _hoisted_33, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(unref(communityKinds), (kind) => {
                  return openBlock(), createElementBlock("button", {
                    key: kind.value,
                    role: "tab",
                    "aria-selected": tab.value === kind.value,
                    class: normalizeClass({ active: tab.value === kind.value }),
                    onClick: ($event) => tab.value = kind.value
                  }, toDisplayString(kind.label), 11, _hoisted_34);
                }), 128))
              ]),
              createBaseVNode("div", _hoisted_35, [
                createBaseVNode("span", _hoisted_36, toDisplayString(currentKind.value?.hint), 1),
                createBaseVNode("form", {
                  class: "community-search",
                  onSubmit: withModifiers(search, ["prevent"])
                }, [
                  withDirectives(createBaseVNode("input", {
                    "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => query.value = $event),
                    maxlength: "100",
                    "aria-label": "搜索社区方案",
                    placeholder: "搜索方案"
                  }, null, 512), [
                    [vModelText, query.value]
                  ]),
                  createBaseVNode("button", {
                    class: "community-btn",
                    disabled: loading.value
                  }, "搜索", 8, _hoisted_37)
                ], 32)
              ]),
              notice.value ? (openBlock(), createElementBlock("p", _hoisted_38, toDisplayString(notice.value), 1)) : createCommentVNode("", true),
              error.value ? (openBlock(), createElementBlock("div", _hoisted_39, [
                createTextVNode(toDisplayString(error.value) + " ", 1),
                createBaseVNode("button", {
                  class: "community-text-btn",
                  onClick: loadCatalog
                }, "重新加载")
              ])) : createCommentVNode("", true),
              loading.value ? (openBlock(), createElementBlock("div", _hoisted_40, "正在加载方案…")) : !error.value ? (openBlock(), createElementBlock(Fragment, { key: 3 }, [
                plans.value.length ? (openBlock(), createElementBlock("div", _hoisted_41, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(plans.value, (plan) => {
                    return openBlock(), createElementBlock("article", {
                      key: plan.id,
                      class: "community-plan-card"
                    }, [
                      createBaseVNode("button", {
                        class: "community-card-open",
                        "aria-label": "查看方案 " + plan.title,
                        onClick: ($event) => openPlan(plan)
                      }, [
                        createVNode(CommunityPresetPreview, {
                          payload: plan.payload,
                          compact: ""
                        }, null, 8, ["payload"]),
                        createBaseVNode("div", _hoisted_43, [
                          createBaseVNode("span", _hoisted_44, toDisplayString(unref(communityKindLabel)(plan.kind)) + " · v" + toDisplayString(plan.version), 1),
                          createBaseVNode("h2", null, toDisplayString(plan.title), 1),
                          createBaseVNode("p", null, toDisplayString(plan.description || "作者暂未补充说明。"), 1),
                          createBaseVNode("div", _hoisted_45, [
                            createBaseVNode("span", null, toDisplayString(plan.author.nickname || plan.author.username), 1),
                            createBaseVNode("span", null, toDisplayString(plan.savedCount) + " 次保存", 1)
                          ])
                        ])
                      ], 8, _hoisted_42)
                    ]);
                  }), 128))
                ])) : (openBlock(), createElementBlock("div", _hoisted_46, [
                  _cache[45] || (_cache[45] = createBaseVNode("h2", null, "暂时没有方案", -1)),
                  createBaseVNode("p", null, toDisplayString(query.value ? "换个关键词试试。" : "分享你的设置，让更多玩家发现。"), 1)
                ])),
                totalPages.value > 1 ? (openBlock(), createElementBlock("nav", _hoisted_47, [
                  createBaseVNode("button", {
                    class: "community-btn",
                    disabled: page.value <= 1,
                    onClick: _cache[6] || (_cache[6] = ($event) => changePage(page.value - 1))
                  }, "上一页", 8, _hoisted_48),
                  createBaseVNode("span", null, toDisplayString(page.value) + " / " + toDisplayString(totalPages.value) + " · " + toDisplayString(total.value) + " 个方案", 1),
                  createBaseVNode("button", {
                    class: "community-btn",
                    disabled: page.value >= totalPages.value,
                    onClick: _cache[7] || (_cache[7] = ($event) => changePage(page.value + 1))
                  }, "下一页", 8, _hoisted_49)
                ])) : createCommentVNode("", true)
              ], 64)) : createCommentVNode("", true)
            ], 64))
          ], 8, _hoisted_6),
          createBaseVNode("aside", _hoisted_50, [
            createBaseVNode("section", _hoisted_51, [
              _cache[49] || (_cache[49] = createBaseVNode("span", { class: "forum-side-eyebrow" }, "PLAYER TO PLAYER", -1)),
              createBaseVNode("h2", null, toDisplayString(unref(user) ? "你好，" + (unref(user).nickname || unref(user).username) : "欢迎来到社区"), 1),
              _cache[50] || (_cache[50] = createBaseVNode("p", null, "遇到了问题，或找到一组好用的设置？在这里和大家聊聊。", -1)),
              createBaseVNode("button", {
                class: "community-btn primary forum-post-action",
                onClick: composePost
              }, [..._cache[46] || (_cache[46] = [
                createBaseVNode("span", { "aria-hidden": "true" }, "＋", -1),
                createTextVNode("发布帖子", -1)
              ])]),
              !unref(user) ? (openBlock(), createBlock(_component_router_link, {
                key: 0,
                class: "forum-account-link",
                to: "/account"
              }, {
                default: withCtx(() => [..._cache[47] || (_cache[47] = [
                  createTextVNode("登录账号，加入讨论 ", -1),
                  createBaseVNode("span", { "aria-hidden": "true" }, "→", -1)
                ])]),
                _: 1
              })) : (openBlock(), createBlock(_component_router_link, {
                key: 1,
                class: "forum-account-link",
                to: "/account"
              }, {
                default: withCtx(() => [..._cache[48] || (_cache[48] = [
                  createTextVNode("我的社区账号 ", -1),
                  createBaseVNode("span", { "aria-hidden": "true" }, "→", -1)
                ])]),
                _: 1
              }))
            ]),
            isAdmin.value ? (openBlock(), createElementBlock("section", _hoisted_52, [
              _cache[51] || (_cache[51] = createBaseVNode("h2", null, "社区管理员", -1)),
              _cache[52] || (_cache[52] = createBaseVNode("p", { class: "community-muted" }, "置顶和删除入口在帖子详情，集中处理用户举报。", -1)),
              createBaseVNode("button", {
                class: "community-btn",
                onClick: openModeration
              }, "社区管理")
            ])) : createCommentVNode("", true),
            createVNode(_component_router_link, {
              class: "forum-library-link",
              to: "/my-plans"
            }, {
              default: withCtx(() => [..._cache[53] || (_cache[53] = [
                createBaseVNode("span", {
                  class: "forum-library-icon",
                  "aria-hidden": "true"
                }, [
                  createBaseVNode("svg", {
                    viewBox: "0 0 24 24",
                    fill: "none"
                  }, [
                    createBaseVNode("path", {
                      d: "M6 3h12v18l-6-4-6 4V3Z",
                      stroke: "currentColor",
                      "stroke-width": "1.5"
                    })
                  ])
                ], -1),
                createBaseVNode("span", null, [
                  createBaseVNode("strong", null, "我的方案"),
                  createBaseVNode("small", null, "收藏、应用与恢复")
                ], -1),
                createBaseVNode("span", { "aria-hidden": "true" }, "→", -1)
              ])]),
              _: 1
            }),
            createBaseVNode("section", _hoisted_53, [
              _cache[55] || (_cache[55] = createBaseVNode("h2", null, "方案快捷入口", -1)),
              createBaseVNode("div", _hoisted_54, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(unref(communityKinds), (kind) => {
                  return openBlock(), createElementBlock("button", {
                    key: kind.value,
                    onClick: ($event) => showPlans(kind.value)
                  }, [
                    createBaseVNode("span", _hoisted_56, toDisplayString(kind.value === "system" ? "⌘" : kind.value === "filter" ? "◐" : kind.value === "eq" ? "≋" : "⌖"), 1),
                    createBaseVNode("span", null, toDisplayString(kind.label), 1),
                    _cache[54] || (_cache[54] = createBaseVNode("span", {
                      class: "forum-shortcut-arrow",
                      "aria-hidden": "true"
                    }, "↗", -1))
                  ], 8, _hoisted_55);
                }), 128))
              ])
            ]),
            _cache[56] || (_cache[56] = createBaseVNode("section", { class: "forum-side-card forum-about" }, [
              createBaseVNode("h2", null, "关于这个社区"),
              createBaseVNode("p", null, "分享实测体验，交流使用心得。提问时带上硬件配置、游戏名称和遇到的现象，让讨论更有帮助。"),
              createBaseVNode("div", { class: "forum-about-note" }, "尊重不同配置与习惯，友善交流。")
            ], -1))
          ])
        ]),
        createVNode(unref(ElDialog), {
          modelValue: detailOpen.value,
          "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => detailOpen.value = $event),
          title: "方案详情",
          class: "community-dialog",
          width: "min(820px, calc(100vw - 32px))",
          "append-to-body": "",
          "close-on-click-modal": !busy.value,
          "close-on-press-escape": !busy.value,
          "show-close": !busy.value
        }, {
          default: withCtx(() => [
            detailLoading.value ? (openBlock(), createElementBlock("p", _hoisted_57, "正在读取方案…")) : createCommentVNode("", true),
            detailError.value ? (openBlock(), createElementBlock("p", _hoisted_58, toDisplayString(detailError.value), 1)) : createCommentVNode("", true),
            detail.value ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
              createBaseVNode("h2", null, toDisplayString(detail.value.title), 1),
              createBaseVNode("p", _hoisted_59, toDisplayString(detail.value.author.nickname || detail.value.author.username) + " · " + toDisplayString(unref(communityDate)(detail.value.updatedAt)) + " · 版本 " + toDisplayString(detail.value.version), 1),
              createVNode(CommunityPresetPreview, {
                payload: detail.value.payload
              }, null, 8, ["payload"]),
              createBaseVNode("p", _hoisted_60, toDisplayString(detail.value.description || "作者暂未补充说明。"), 1),
              _cache[57] || (_cache[57] = createBaseVNode("p", { class: "community-muted" }, "保存的是当前版本副本。应用前会显示具体修改与恢复提示。", -1)),
              createBaseVNode("div", _hoisted_61, [
                createBaseVNode("button", {
                  class: "community-btn primary",
                  disabled: busy.value,
                  onClick: savePlan
                }, toDisplayString(busy.value ? "处理中…" : unref(user) ? "保存到我的方案" : "登录后保存"), 9, _hoisted_62),
                unref(user)?.id === detail.value.author.id ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                  !deletePlanIntent.value ? (openBlock(), createElementBlock("button", {
                    key: 0,
                    class: "community-text-btn danger",
                    disabled: busy.value,
                    onClick: _cache[8] || (_cache[8] = ($event) => deletePlanIntent.value = true)
                  }, "删除我发布的方案", 8, _hoisted_63)) : (openBlock(), createElementBlock("button", {
                    key: 1,
                    class: "community-btn danger",
                    disabled: busy.value,
                    onClick: deletePlan
                  }, "确认删除方案", 8, _hoisted_64))
                ], 64)) : createCommentVNode("", true)
              ])
            ], 64)) : createCommentVNode("", true)
          ]),
          _: 1
        }, 8, ["modelValue", "close-on-click-modal", "close-on-press-escape", "show-close"]),
        createVNode(unref(ElDialog), {
          modelValue: publishOpen.value,
          "onUpdate:modelValue": _cache[16] || (_cache[16] = ($event) => publishOpen.value = $event),
          title: "发布方案",
          class: "community-dialog",
          width: "min(820px, calc(100vw - 32px))",
          "append-to-body": "",
          "close-on-click-modal": !busy.value,
          "close-on-press-escape": !busy.value,
          "show-close": !busy.value
        }, {
          default: withCtx(() => [
            createBaseVNode("form", {
              class: "community-form",
              onSubmit: withModifiers(publish, ["prevent"])
            }, [
              createBaseVNode("label", null, [
                _cache[58] || (_cache[58] = createTextVNode("方案类型", -1)),
                withDirectives(createBaseVNode("select", {
                  "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => publishKind.value = $event),
                  disabled: busy.value,
                  onChange: loadLocalPlans
                }, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(unref(communityKinds), (kind) => {
                    return openBlock(), createElementBlock("option", {
                      key: kind.value,
                      value: kind.value
                    }, toDisplayString(kind.label), 9, _hoisted_66);
                  }), 128))
                ], 40, _hoisted_65), [
                  [vModelSelect, publishKind.value]
                ])
              ]),
              publishKind.value === "system" ? (openBlock(), createElementBlock("div", _hoisted_67, [
                _cache[59] || (_cache[59] = createBaseVNode("p", null, "读取系统体检与深度优化支持分享的当前设置，选择项目后发布到社区。", -1)),
                createBaseVNode("button", {
                  type: "button",
                  class: "community-btn",
                  disabled: busy.value || localLoading.value,
                  onClick: loadLocalPlans
                }, "重新读取当前设置", 8, _hoisted_68)
              ])) : createCommentVNode("", true),
              localLoading.value ? (openBlock(), createElementBlock("p", _hoisted_69, toDisplayString(publishKind.value === "system" ? "正在读取电脑当前设置…" : "正在读取本地方案…"), 1)) : createCommentVNode("", true),
              createBaseVNode("label", null, [
                _cache[60] || (_cache[60] = createTextVNode("本地存档或当前状态", -1)),
                withDirectives(createBaseVNode("select", {
                  "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => localId.value = $event),
                  disabled: localLoading.value || busy.value,
                  onChange: chooseLocal
                }, [
                  createBaseVNode("option", _hoisted_71, toDisplayString(localLoading.value ? "正在读取本地方案…" : "选择一份本地方案"), 1),
                  (openBlock(true), createElementBlock(Fragment, null, renderList(localPlans.value, (plan) => {
                    return openBlock(), createElementBlock("option", {
                      key: plan.id,
                      value: plan.id
                    }, toDisplayString(plan.title), 9, _hoisted_72);
                  }), 128))
                ], 40, _hoisted_70), [
                  [vModelSelect, localId.value]
                ])
              ]),
              !localLoading.value && !localPlans.value.length ? (openBlock(), createElementBlock("p", _hoisted_73, toDisplayString(publishKind.value === "system" ? "本次未取得可分享的设置。可以重新读取，或导入已有方案文件。" : "当前类型没有可发布的本地方案，也可以读取已导出的方案文件。"), 1)) : createCommentVNode("", true),
              capturedAt.value ? (openBlock(), createElementBlock("p", _hoisted_74, "读取时间：" + toDisplayString(new Date(capturedAt.value).toLocaleString("zh-CN")), 1)) : createCommentVNode("", true),
              captureNotes.value.length ? (openBlock(), createElementBlock("details", _hoisted_75, [
                createBaseVNode("summary", null, "本次读取说明（" + toDisplayString(captureNotes.value.length) + "）", 1),
                createBaseVNode("ul", null, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(captureNotes.value, (note, index) => {
                    return openBlock(), createElementBlock("li", { key: index }, toDisplayString(note), 1);
                  }), 128))
                ])
              ])) : createCommentVNode("", true),
              systemCapture.value ? (openBlock(), createBlock(CommunitySystemSelection, {
                key: 5,
                payload: systemCapture.value,
                disabled: busy.value,
                onChange: _cache[12] || (_cache[12] = ($event) => publishPayload.value = $event)
              }, null, 8, ["payload", "disabled"])) : createCommentVNode("", true),
              systemCapture.value && publishPayload.value ? (openBlock(), createElementBlock(Fragment, { key: 6 }, [
                createBaseVNode("button", {
                  type: "button",
                  class: "community-text-btn",
                  "aria-expanded": showPublishPreview.value,
                  onClick: _cache[13] || (_cache[13] = ($event) => showPublishPreview.value = !showPublishPreview.value)
                }, toDisplayString(showPublishPreview.value ? "收起发布预览" : "查看发布预览"), 9, _hoisted_76),
                showPublishPreview.value ? (openBlock(), createBlock(CommunityPresetPreview, {
                  key: 0,
                  payload: publishPayload.value
                }, null, 8, ["payload"])) : createCommentVNode("", true)
              ], 64)) : publishPayload.value ? (openBlock(), createBlock(CommunityPresetPreview, {
                key: 7,
                payload: publishPayload.value
              }, null, 8, ["payload"])) : createCommentVNode("", true),
              createBaseVNode("details", _hoisted_77, [
                _cache[62] || (_cache[62] = createBaseVNode("summary", null, "从方案文件导入", -1)),
                createBaseVNode("label", _hoisted_78, [
                  _cache[61] || (_cache[61] = createTextVNode("读取方案 JSON（最多 64 KB）", -1)),
                  createBaseVNode("input", {
                    type: "file",
                    accept: ".json,application/json",
                    disabled: busy.value,
                    onChange: readPreset
                  }, null, 40, _hoisted_79)
                ])
              ]),
              _cache[65] || (_cache[65] = createBaseVNode("p", { class: "community-muted" }, "读取和预览不会改变当前设置，确认发布后才会上传所选项目。", -1)),
              createBaseVNode("label", null, [
                _cache[63] || (_cache[63] = createTextVNode("方案标题", -1)),
                withDirectives(createBaseVNode("input", {
                  "onUpdate:modelValue": _cache[14] || (_cache[14] = ($event) => publishTitle.value = $event),
                  required: "",
                  maxlength: "80",
                  disabled: busy.value
                }, null, 8, _hoisted_80), [
                  [vModelText, publishTitle.value]
                ])
              ]),
              createBaseVNode("label", null, [
                _cache[64] || (_cache[64] = createTextVNode("使用说明", -1)),
                withDirectives(createBaseVNode("textarea", {
                  "onUpdate:modelValue": _cache[15] || (_cache[15] = ($event) => publishDescription.value = $event),
                  rows: "3",
                  maxlength: "2000",
                  disabled: busy.value,
                  placeholder: "适用场景、调节思路与注意事项"
                }, null, 8, _hoisted_81), [
                  [vModelText, publishDescription.value]
                ])
              ]),
              publishError.value ? (openBlock(), createElementBlock("p", _hoisted_82, toDisplayString(publishError.value), 1)) : createCommentVNode("", true),
              createBaseVNode("button", {
                class: "community-btn primary",
                type: "submit",
                disabled: busy.value || !publishPayload.value || localLoading.value
              }, toDisplayString(busy.value ? "正在发布…" : "确认发布方案"), 9, _hoisted_83)
            ], 32)
          ]),
          _: 1
        }, 8, ["modelValue", "close-on-click-modal", "close-on-press-escape", "show-close"]),
        createVNode(unref(ElDialog), {
          modelValue: postOpen.value,
          "onUpdate:modelValue": _cache[25] || (_cache[25] = ($event) => postOpen.value = $event),
          title: "帖子详情",
          class: "community-dialog",
          width: "min(820px, calc(100vw - 32px))",
          "append-to-body": "",
          "close-on-click-modal": !busy.value,
          "close-on-press-escape": !busy.value,
          "show-close": !busy.value
        }, {
          default: withCtx(() => [
            detailLoading.value ? (openBlock(), createElementBlock("p", _hoisted_84, "正在读取帖子…")) : createCommentVNode("", true),
            postError.value ? (openBlock(), createElementBlock("p", _hoisted_85, toDisplayString(postError.value), 1)) : createCommentVNode("", true),
            postDetail.value ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
              createBaseVNode("h2", null, [
                postDetail.value.pinned ? (openBlock(), createElementBlock("span", _hoisted_86, "置顶")) : createCommentVNode("", true),
                createTextVNode(" " + toDisplayString(postDetail.value.title), 1)
              ]),
              createBaseVNode("p", _hoisted_87, toDisplayString(postDetail.value.author.nickname || postDetail.value.author.username) + " · " + toDisplayString(unref(communityDate)(postDetail.value.createdAt)), 1),
              createVNode(CommunityPostContent, {
                content: postDetail.value.content,
                "cover-image": postDetail.value.coverImage
              }, null, 8, ["content", "cover-image"]),
              createBaseVNode("div", _hoisted_88, [
                createBaseVNode("button", {
                  class: "community-btn",
                  disabled: busy.value,
                  onClick: like
                }, toDisplayString(postDetail.value.liked ? "取消点赞" : "点赞") + " · " + toDisplayString(postDetail.value.likes), 9, _hoisted_89),
                unref(user) ? (openBlock(), createElementBlock("button", {
                  key: 0,
                  class: "community-text-btn",
                  disabled: busy.value,
                  onClick: _cache[17] || (_cache[17] = ($event) => openReport("post", postDetail.value.id))
                }, "举报帖子", 8, _hoisted_90)) : createCommentVNode("", true),
                isAdmin.value ? (openBlock(), createElementBlock("button", {
                  key: 1,
                  class: "community-btn",
                  disabled: busy.value,
                  onClick: pinPost
                }, toDisplayString(postDetail.value.pinned ? "取消置顶" : "置顶"), 9, _hoisted_91)) : createCommentVNode("", true),
                isAdmin.value || unref(user)?.id === postDetail.value.author.id ? (openBlock(), createElementBlock(Fragment, { key: 2 }, [
                  !deletePostIntent.value ? (openBlock(), createElementBlock("button", {
                    key: 0,
                    class: "community-text-btn danger",
                    disabled: busy.value,
                    onClick: _cache[18] || (_cache[18] = ($event) => deletePostIntent.value = true)
                  }, toDisplayString(isAdmin.value ? "删除帖子" : "删除我的帖子"), 9, _hoisted_92)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                    _cache[66] || (_cache[66] = createBaseVNode("span", { class: "community-muted" }, "确认删除这篇帖子及其回复？", -1)),
                    createBaseVNode("button", {
                      class: "community-btn danger",
                      disabled: busy.value,
                      onClick: deletePost
                    }, "确认删除帖子", 8, _hoisted_93),
                    createBaseVNode("button", {
                      class: "community-text-btn",
                      disabled: busy.value,
                      onClick: _cache[19] || (_cache[19] = ($event) => deletePostIntent.value = false)
                    }, "取消", 8, _hoisted_94)
                  ], 64))
                ], 64)) : createCommentVNode("", true)
              ]),
              _cache[70] || (_cache[70] = createBaseVNode("h3", { class: "community-section-title" }, "回复", -1)),
              !comments.value.length ? (openBlock(), createElementBlock("div", _hoisted_95, "还没有回复。")) : createCommentVNode("", true),
              (openBlock(true), createElementBlock(Fragment, null, renderList(comments.value, (comment) => {
                return openBlock(), createElementBlock("article", {
                  key: comment.id,
                  class: "community-comment"
                }, [
                  createBaseVNode("strong", null, toDisplayString(comment.author.nickname || comment.author.username), 1),
                  createBaseVNode("span", null, toDisplayString(unref(communityDate)(comment.createdAt)), 1),
                  createBaseVNode("p", null, toDisplayString(comment.content), 1),
                  unref(user) ? (openBlock(), createElementBlock("div", _hoisted_96, [
                    createBaseVNode("button", {
                      class: "community-text-btn",
                      disabled: busy.value,
                      onClick: ($event) => openReport("comment", comment.id)
                    }, "举报回复", 8, _hoisted_97),
                    isAdmin.value || unref(user).id === comment.author.id ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
                      deleteCommentIntent.value !== comment.id ? (openBlock(), createElementBlock("button", {
                        key: 0,
                        class: "community-text-btn danger",
                        disabled: busy.value,
                        onClick: ($event) => deleteCommentIntent.value = comment.id
                      }, "删除回复", 8, _hoisted_98)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
                        createBaseVNode("button", {
                          class: "community-btn danger",
                          disabled: busy.value,
                          onClick: ($event) => deleteComment(comment)
                        }, "确认删除回复", 8, _hoisted_99),
                        createBaseVNode("button", {
                          class: "community-text-btn",
                          disabled: busy.value,
                          onClick: _cache[20] || (_cache[20] = ($event) => deleteCommentIntent.value = null)
                        }, "取消", 8, _hoisted_100)
                      ], 64))
                    ], 64)) : createCommentVNode("", true)
                  ])) : createCommentVNode("", true)
                ]);
              }), 128)),
              commentPages.value > 1 ? (openBlock(), createElementBlock("nav", _hoisted_101, [
                createBaseVNode("button", {
                  class: "community-btn",
                  disabled: commentPage.value <= 1 || busy.value,
                  onClick: _cache[21] || (_cache[21] = ($event) => loadComments(commentPage.value - 1))
                }, "上一页回复", 8, _hoisted_102),
                createBaseVNode("span", null, toDisplayString(commentPage.value) + " / " + toDisplayString(commentPages.value), 1),
                createBaseVNode("button", {
                  class: "community-btn",
                  disabled: commentPage.value >= commentPages.value || busy.value,
                  onClick: _cache[22] || (_cache[22] = ($event) => loadComments(commentPage.value + 1))
                }, "下一页回复", 8, _hoisted_103)
              ])) : createCommentVNode("", true),
              unref(user) ? (openBlock(), createElementBlock("form", {
                key: 2,
                class: "community-form",
                onSubmit: withModifiers(reply, ["prevent"])
              }, [
                createBaseVNode("label", null, [
                  _cache[67] || (_cache[67] = createTextVNode("回复内容", -1)),
                  withDirectives(createBaseVNode("textarea", {
                    "onUpdate:modelValue": _cache[23] || (_cache[23] = ($event) => replyText.value = $event),
                    required: "",
                    rows: "3",
                    maxlength: "2000",
                    disabled: busy.value
                  }, null, 8, _hoisted_104), [
                    [vModelText, replyText.value]
                  ])
                ]),
                createBaseVNode("button", {
                  class: "community-btn primary",
                  disabled: busy.value || !replyText.value.trim()
                }, "发送回复", 8, _hoisted_105)
              ], 32)) : (openBlock(), createElementBlock("p", _hoisted_106, [
                createVNode(_component_router_link, {
                  to: "/account",
                  onClick: _cache[24] || (_cache[24] = ($event) => postOpen.value = false)
                }, {
                  default: withCtx(() => [..._cache[68] || (_cache[68] = [
                    createTextVNode("登录账号", -1)
                  ])]),
                  _: 1
                }),
                _cache[69] || (_cache[69] = createTextVNode("后参与讨论。", -1))
              ]))
            ], 64)) : createCommentVNode("", true)
          ]),
          _: 1
        }, 8, ["modelValue", "close-on-click-modal", "close-on-press-escape", "show-close"]),
        createVNode(unref(ElDialog), {
          modelValue: postComposeOpen.value,
          "onUpdate:modelValue": _cache[30] || (_cache[30] = ($event) => postComposeOpen.value = $event),
          title: "发布帖子",
          class: "community-dialog",
          width: "min(720px, calc(100vw - 32px))",
          "append-to-body": "",
          "close-on-click-modal": !busy.value && !imageBusy.value,
          "close-on-press-escape": !busy.value && !imageBusy.value,
          "show-close": !busy.value && !imageBusy.value
        }, {
          default: withCtx(() => [
            createBaseVNode("form", {
              class: "community-form",
              onSubmit: withModifiers(publishPost, ["prevent"])
            }, [
              createBaseVNode("label", null, [
                _cache[71] || (_cache[71] = createTextVNode("帖子标题", -1)),
                withDirectives(createBaseVNode("input", {
                  "onUpdate:modelValue": _cache[26] || (_cache[26] = ($event) => postTitle.value = $event),
                  required: "",
                  maxlength: "100",
                  disabled: busy.value
                }, null, 8, _hoisted_107), [
                  [vModelText, postTitle.value]
                ])
              ]),
              createBaseVNode("label", null, [
                _cache[73] || (_cache[73] = createTextVNode("发布分类", -1)),
                withDirectives(createBaseVNode("select", {
                  "onUpdate:modelValue": _cache[27] || (_cache[27] = ($event) => postCategory.value = $event),
                  disabled: busy.value
                }, [
                  _cache[72] || (_cache[72] = createBaseVNode("option", { value: void 0 }, "未分类", -1)),
                  (openBlock(true), createElementBlock(Fragment, null, renderList(categories.value, (category) => {
                    return openBlock(), createElementBlock("option", {
                      key: category.id,
                      value: category.id
                    }, toDisplayString(category.name), 9, _hoisted_109);
                  }), 128))
                ], 8, _hoisted_108), [
                  [vModelSelect, postCategory.value]
                ])
              ]),
              createBaseVNode("label", null, [
                _cache[74] || (_cache[74] = createTextVNode("帖子内容", -1)),
                withDirectives(createBaseVNode("textarea", {
                  "onUpdate:modelValue": _cache[28] || (_cache[28] = ($event) => postContent.value = $event),
                  required: "",
                  rows: "7",
                  maxlength: "20000",
                  disabled: busy.value
                }, null, 8, _hoisted_110), [
                  [vModelText, postContent.value]
                ])
              ]),
              createVNode(CommunityPostImages, {
                disabled: busy.value,
                "reset-key": imageResetKey.value,
                onUploaded: uploadedImage,
                onRemove: removeImage,
                onBusy: _cache[29] || (_cache[29] = ($event) => imageBusy.value = $event)
              }, null, 8, ["disabled", "reset-key"]),
              _cache[75] || (_cache[75] = createBaseVNode("p", { class: "community-muted" }, "上传完成后点击发布。第一张图片会作为帖子封面；正文中的图片可以在详情中点击放大。", -1)),
              postError.value ? (openBlock(), createElementBlock("p", _hoisted_111, toDisplayString(postError.value), 1)) : createCommentVNode("", true),
              createBaseVNode("button", {
                class: "community-btn primary",
                disabled: busy.value || imageBusy.value || !postTitle.value.trim() || !postContent.value.trim()
              }, toDisplayString(imageBusy.value ? "图片上传中…" : busy.value ? "正在发布…" : "确认发布帖子"), 9, _hoisted_112)
            ], 32)
          ]),
          _: 1
        }, 8, ["modelValue", "close-on-click-modal", "close-on-press-escape", "show-close"]),
        createVNode(unref(ElDialog), {
          modelValue: reportOpen.value,
          "onUpdate:modelValue": _cache[32] || (_cache[32] = ($event) => reportOpen.value = $event),
          title: "举报内容",
          class: "community-dialog",
          width: "min(520px, calc(100vw - 32px))",
          "append-to-body": "",
          "close-on-click-modal": !busy.value,
          "close-on-press-escape": !busy.value,
          "show-close": !busy.value
        }, {
          default: withCtx(() => [
            createBaseVNode("form", {
              class: "community-form",
              onSubmit: withModifiers(sendReport, ["prevent"])
            }, [
              createBaseVNode("p", _hoisted_113, toDisplayString(reportTarget.value?.targetType === "comment" ? "回复" : "帖子") + " #" + toDisplayString(reportTarget.value?.targetId), 1),
              createBaseVNode("label", null, [
                _cache[76] || (_cache[76] = createTextVNode("举报原因", -1)),
                withDirectives(createBaseVNode("textarea", {
                  "onUpdate:modelValue": _cache[31] || (_cache[31] = ($event) => reportReason.value = $event),
                  required: "",
                  maxlength: "200",
                  rows: "4",
                  disabled: busy.value,
                  placeholder: "说明需要管理员处理的原因"
                }, null, 8, _hoisted_114), [
                  [vModelText, reportReason.value]
                ])
              ]),
              reportError.value ? (openBlock(), createElementBlock("p", _hoisted_115, toDisplayString(reportError.value), 1)) : createCommentVNode("", true),
              createBaseVNode("button", {
                class: "community-btn primary",
                disabled: busy.value || !reportReason.value.trim()
              }, toDisplayString(busy.value ? "正在提交…" : "提交举报"), 9, _hoisted_116)
            ], 32)
          ]),
          _: 1
        }, 8, ["modelValue", "close-on-click-modal", "close-on-press-escape", "show-close"]),
        createVNode(unref(ElDialog), {
          modelValue: moderationOpen.value,
          "onUpdate:modelValue": _cache[34] || (_cache[34] = ($event) => moderationOpen.value = $event),
          title: "社区管理",
          class: "community-dialog",
          width: "min(960px, calc(100vw - 32px))",
          "append-to-body": "",
          "destroy-on-close": "",
          "close-on-click-modal": !moderationBusy.value,
          "close-on-press-escape": !moderationBusy.value,
          "show-close": !moderationBusy.value
        }, {
          default: withCtx(() => [
            moderationOpen.value && isAdmin.value ? (openBlock(), createBlock(CommunityModerationPanel, {
              key: 0,
              onOpenPost: openReportedPost,
              onChanged: loadCatalog,
              onBusy: _cache[33] || (_cache[33] = ($event) => moderationBusy.value = $event)
            })) : createCommentVNode("", true)
          ]),
          _: 1
        }, 8, ["modelValue", "close-on-click-modal", "close-on-press-escape", "show-close"])
      ]);
    };
  }
});
const Community = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-39df8426"]]);
export {
  Community as default
};
