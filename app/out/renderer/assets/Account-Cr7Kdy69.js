import { t as defineComponent, a1 as onMounted, l as createElementBlock, i as createBaseVNode, r as createVNode, aF as withCtx, ak as toDisplayString, k as createCommentVNode, as as unref, j as createBlock, S as normalizeClass, q as createTextVNode, aG as withDirectives, aA as vModelText, ax as vModelCheckbox, aI as withModifiers, a9 as ref, a7 as reactive, ad as resolveComponent, au as useRoute, av as useRouter, a5 as openBlock } from "./main-DAqTdO6U.js";
import { x as useCommunityAccount, p as communityError } from "./index-CL4m76NE.js";
/* empty css                   */
const _hoisted_1 = { class: "community-page account-page" };
const _hoisted_2 = { class: "community-heading" };
const _hoisted_3 = {
  key: 0,
  class: "community-alert",
  role: "alert"
};
const _hoisted_4 = {
  key: 1,
  class: "community-notice",
  role: "status"
};
const _hoisted_5 = {
  key: 2,
  class: "community-notice"
};
const _hoisted_6 = {
  key: 3,
  class: "community-muted",
  role: "status"
};
const _hoisted_7 = {
  key: 4,
  class: "community-alert"
};
const _hoisted_8 = {
  key: 5,
  class: "community-panel account-card"
};
const _hoisted_9 = {
  class: "account-avatar",
  "aria-hidden": "true"
};
const _hoisted_10 = { class: "community-muted" };
const _hoisted_11 = {
  key: 0,
  class: "community-muted"
};
const _hoisted_12 = { class: "community-actions" };
const _hoisted_13 = ["disabled"];
const _hoisted_14 = ["disabled"];
const _hoisted_15 = {
  key: 6,
  class: "community-panel account-card"
};
const _hoisted_16 = {
  class: "community-tabs",
  role: "tablist",
  "aria-label": "账号操作"
};
const _hoisted_17 = ["aria-selected"];
const _hoisted_18 = ["aria-selected"];
const _hoisted_19 = ["disabled"];
const _hoisted_20 = { key: 0 };
const _hoisted_21 = ["disabled"];
const _hoisted_22 = ["minlength", "maxlength", "autocomplete", "disabled"];
const _hoisted_23 = { class: "community-checkbox" };
const _hoisted_24 = ["disabled"];
const _hoisted_25 = ["disabled"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Account",
  setup(__props) {
    const { account, user, accountLoading, refreshAccount, login, register, logout } = useCommunityAccount();
    const route = useRoute(), router = useRouter();
    const mode = ref("login"), busy = ref(false), error = ref(""), message = ref("");
    const form = reactive({ username: "", nickname: "", password: "", remember: false });
    onMounted(() => {
      void refreshAccount(true);
    });
    async function refreshIdentity() {
      if (busy.value || accountLoading.value) return;
      error.value = "";
      message.value = "";
      await refreshAccount(true);
      if (account.value.online && !account.value.message && user.value) message.value = user.value.role === "admin" ? "身份已刷新：社区管理员。" : "身份已刷新：普通社区用户。";
    }
    async function submit() {
      if (busy.value) return;
      busy.value = true;
      error.value = "";
      message.value = "";
      try {
        const input = { username: form.username.trim(), password: form.password, remember: form.remember };
        if (mode.value === "register") await register({ ...input, nickname: form.nickname.trim() || input.username });
        else await login(input);
        form.password = "";
        message.value = mode.value === "register" ? "账号已创建，可以保存和分享方案了。" : "登录成功。";
        if (route.query.return === "system-share") await router.replace("/community?publish=system");
      } catch (err) {
        error.value = communityError(err);
      } finally {
        busy.value = false;
      }
    }
    async function signOut() {
      busy.value = true;
      error.value = "";
      message.value = "";
      try {
        await logout();
        form.password = "";
        message.value = "已退出账号。";
      } catch (err) {
        error.value = communityError(err);
      } finally {
        busy.value = false;
      }
    }
    return (_ctx, _cache) => {
      const _component_router_link = resolveComponent("router-link");
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("header", _hoisted_2, [
          _cache[7] || (_cache[7] = createBaseVNode("div", null, [
            createBaseVNode("span", { class: "community-eyebrow" }, "SUPREME ACCOUNT"),
            createBaseVNode("h1", null, "软件账号"),
            createBaseVNode("p", null, "沿用社区账号，收藏方案、分享设置与交流心得。")
          ], -1)),
          createVNode(_component_router_link, {
            class: "community-btn",
            to: "/community"
          }, {
            default: withCtx(() => [..._cache[6] || (_cache[6] = [
              createTextVNode("浏览社区", -1)
            ])]),
            _: 1
          })
        ]),
        error.value ? (openBlock(), createElementBlock("p", _hoisted_3, toDisplayString(error.value), 1)) : createCommentVNode("", true),
        message.value ? (openBlock(), createElementBlock("p", _hoisted_4, toDisplayString(message.value), 1)) : createCommentVNode("", true),
        unref(route).query.return === "system-share" && !unref(user) ? (openBlock(), createElementBlock("p", _hoisted_5, "登录后继续分享我的系统设置。")) : createCommentVNode("", true),
        unref(accountLoading) ? (openBlock(), createElementBlock("p", _hoisted_6, "正在检查账号状态…")) : unref(account).message ? (openBlock(), createElementBlock("p", _hoisted_7, toDisplayString(unref(account).message), 1)) : createCommentVNode("", true),
        unref(user) ? (openBlock(), createElementBlock("section", _hoisted_8, [
          createBaseVNode("div", _hoisted_9, toDisplayString((unref(user).nickname || unref(user).username).slice(0, 1)), 1),
          createBaseVNode("h2", null, toDisplayString(unref(user).nickname || unref(user).username), 1),
          createBaseVNode("p", _hoisted_10, "@" + toDisplayString(unref(user).username), 1),
          createBaseVNode("p", null, [
            createBaseVNode("strong", null, toDisplayString(unref(user).role === "admin" ? "社区管理员" : "普通社区用户"), 1),
            !unref(account).online ? (openBlock(), createElementBlock("span", _hoisted_11, " · 离线缓存身份")) : createCommentVNode("", true)
          ]),
          createBaseVNode("p", null, toDisplayString(unref(account).online ? "账号已连接" : "暂时离线，联网后可继续使用社区") + " · " + toDisplayString(unref(account).remembered ? "已记住此账号" : "仅本次登录"), 1),
          createBaseVNode("div", _hoisted_12, [
            createVNode(_component_router_link, {
              class: "community-btn primary",
              to: "/my-plans"
            }, {
              default: withCtx(() => [..._cache[8] || (_cache[8] = [
                createTextVNode("打开我的方案", -1)
              ])]),
              _: 1
            }),
            unref(user).role === "admin" ? (openBlock(), createBlock(_component_router_link, {
              key: 0,
              class: "community-btn",
              to: "/community?manage=reports"
            }, {
              default: withCtx(() => [..._cache[9] || (_cache[9] = [
                createTextVNode("社区管理", -1)
              ])]),
              _: 1
            })) : createCommentVNode("", true),
            createBaseVNode("button", {
              class: "community-btn",
              disabled: busy.value || unref(accountLoading),
              onClick: refreshIdentity
            }, "刷新账号权限", 8, _hoisted_13),
            createBaseVNode("button", {
              class: "community-btn",
              disabled: busy.value,
              onClick: signOut
            }, toDisplayString(busy.value ? "正在退出…" : "退出登录"), 9, _hoisted_14)
          ]),
          unref(route).query.return === "system-share" ? (openBlock(), createBlock(_component_router_link, {
            key: 0,
            class: "community-btn",
            to: "/community?publish=system"
          }, {
            default: withCtx(() => [..._cache[10] || (_cache[10] = [
              createTextVNode("继续分享我的设置", -1)
            ])]),
            _: 1
          })) : createCommentVNode("", true)
        ])) : (openBlock(), createElementBlock("section", _hoisted_15, [
          createBaseVNode("div", _hoisted_16, [
            createBaseVNode("button", {
              role: "tab",
              "aria-selected": mode.value === "login",
              class: normalizeClass({ active: mode.value === "login" }),
              onClick: _cache[0] || (_cache[0] = ($event) => {
                mode.value = "login";
                error.value = "";
              })
            }, "登录账号", 10, _hoisted_17),
            createBaseVNode("button", {
              role: "tab",
              "aria-selected": mode.value === "register",
              class: normalizeClass({ active: mode.value === "register" }),
              onClick: _cache[1] || (_cache[1] = ($event) => {
                mode.value = "register";
                error.value = "";
              })
            }, "注册账号", 10, _hoisted_18)
          ]),
          createBaseVNode("form", {
            class: "community-form",
            onSubmit: withModifiers(submit, ["prevent"])
          }, [
            createBaseVNode("label", null, [
              _cache[11] || (_cache[11] = createTextVNode("用户名", -1)),
              withDirectives(createBaseVNode("input", {
                "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => form.username = $event),
                required: "",
                minlength: "2",
                maxlength: "50",
                autocomplete: "username",
                disabled: busy.value,
                placeholder: "原社区用户名"
              }, null, 8, _hoisted_19), [
                [vModelText, form.username]
              ])
            ]),
            mode.value === "register" ? (openBlock(), createElementBlock("label", _hoisted_20, [
              _cache[12] || (_cache[12] = createTextVNode("昵称", -1)),
              withDirectives(createBaseVNode("input", {
                "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => form.nickname = $event),
                maxlength: "30",
                autocomplete: "nickname",
                disabled: busy.value,
                placeholder: "在社区展示的名字"
              }, null, 8, _hoisted_21), [
                [vModelText, form.nickname]
              ])
            ])) : createCommentVNode("", true),
            createBaseVNode("label", null, [
              _cache[13] || (_cache[13] = createTextVNode("密码", -1)),
              withDirectives(createBaseVNode("input", {
                "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => form.password = $event),
                type: "password",
                required: "",
                minlength: mode.value === "register" ? 6 : 1,
                maxlength: mode.value === "register" ? 72 : 1024,
                autocomplete: mode.value === "register" ? "new-password" : "current-password",
                disabled: busy.value
              }, null, 8, _hoisted_22), [
                [vModelText, form.password]
              ])
            ]),
            createBaseVNode("label", _hoisted_23, [
              withDirectives(createBaseVNode("input", {
                "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => form.remember = $event),
                type: "checkbox",
                disabled: busy.value
              }, null, 8, _hoisted_24), [
                [vModelCheckbox, form.remember]
              ]),
              _cache[14] || (_cache[14] = createTextVNode("在这台电脑记住登录", -1))
            ]),
            createBaseVNode("button", {
              class: "community-btn primary",
              type: "submit",
              disabled: busy.value
            }, toDisplayString(busy.value ? "正在连接…" : mode.value === "register" ? "创建账号" : "登录"), 9, _hoisted_25)
          ], 32),
          _cache[15] || (_cache[15] = createBaseVNode("p", { class: "community-muted account-local-note" }, "不登录也能使用本地优化工具和浏览公开方案。", -1))
        ]))
      ]);
    };
  }
});
export {
  _sfc_main as default
};
